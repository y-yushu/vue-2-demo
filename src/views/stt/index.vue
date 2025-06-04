<template>
  <div class="container">
    <div class="title">语音录入</div>

    <div class="button-group">
      <button class="record-button" @click="startRecord" :disabled="isRecording">开始录音</button>
      <button class="record-button" @click="stopRecord" :disabled="!isRecording">停止录音</button>
    </div>

    <div class="message">
      <h4>消息输出</h4>
      <div class="message-list">
        <div v-for="(item, i) in messages" :key="i" class="message-item">
          <span style="color: red">{{ item.segment + '.' }}</span>
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/// GitHub:
/// https://github.com/k2-fsa/sherpa-onnx
const baseurl = process.env.VUE_APP_STT_URL
let socketManager = null // 长连接控制器
let mediaStream = null // 流媒体控制器
let streamManager = null
let audioCtx = null
let recordSampleRate = null // 音频采样率 对齐16000使用
let recorder = null

function downsampleBuffer(buffer, exportSampleRate) {
  if (exportSampleRate === recordSampleRate) {
    return buffer
  }
  let sampleRateRatio = recordSampleRate / exportSampleRate
  let newLength = Math.round(buffer.length / sampleRateRatio)
  let result = new Float32Array(newLength)
  let offsetResult = 0
  let offsetBuffer = 0
  while (offsetResult < result.length) {
    let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio)
    let accum = 0,
      count = 0
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i]
      count++
    }
    result[offsetResult] = accum / count
    offsetResult++
    offsetBuffer = nextOffsetBuffer
  }
  return result
}

export default {
  name: 'SttPage',
  data() {
    return {
      isRecording: false,
      messages: []
    }
  },
  created() {
    if (!navigator?.mediaDevices?.getUserMedia) {
      console.error('无法调用音频功能')
    }
  },
  methods: {
    // 开始录音
    startRecord() {
      console.log('开始录音')

      // -----------------------------------

      Promise.all([this.openWebSocket(), this.openUserMedia()]).then(() => {
        this.isRecording = true

        setTimeout(() => {
          recorder.onaudioprocess = e => {
            let samples = new Float32Array(e.inputBuffer.getChannelData(0))
            const expectedSampleRate = 16000
            samples = downsampleBuffer(samples, expectedSampleRate)

            let buf = new Int16Array(samples.length)
            for (let i = 0; i < samples.length; ++i) {
              let s = samples[i]
              if (s >= 1) s = 1
              else if (s <= -1) s = -1

              samples[i] = s
              buf[i] = s * 32767
            }

            console.log('samples', samples)
            socketManager.send(samples)
          }
          // 关联输出
          mediaStream.connect(recorder)
          recorder.connect(audioCtx.destination)
        }, 200)
      })
    },

    // 停止录音
    stopRecord() {
      console.log('停止录音')
      this.isRecording = false

      // -----------------------------------
      this.closeWebSocket()
      this.closeUserMedia()
    },

    // 开启连接
    openWebSocket() {
      return new Promise(resolve => {
        this.closeWebSocket()

        socketManager = new WebSocket(baseurl)

        // Listen for messages
        socketManager.onmessage = event => {
          const message = JSON.parse(event.data)
          console.log('接收消息', message)
          const index = this.messages.findIndex(e => e.segment === message.segment)
          if (index !== -1) {
            this.messages.forEach((e, i) => {
              if (i === index) {
                e.text = message.text
              }
            })
            // this.messages[index] = { ...message }
          } else {
            this.messages.push(message)
          }
        }

        // Connection closed
        socketManager.onclose = event => {
          console.log('连接关闭', event)
        }

        // Connection opened
        socketManager.onopen = event => {
          console.log('连接开启', event)
          resolve()
        }

        console.log('socketManager', socketManager)
      })
    },

    // 关闭连接
    closeWebSocket() {
      if (socketManager) {
        socketManager.send('Done')
        socketManager.close()
        socketManager.onmessage = null
        socketManager.onclose = null
        socketManager.onopen = null
        socketManager = null
      }
    },

    // 开启媒体
    openUserMedia() {
      return new Promise(resolve => {
        const constraints = { audio: true }

        const onSuccess = stream => {
          if (!audioCtx) {
            audioCtx = new AudioContext()
          }
          recordSampleRate = audioCtx.sampleRate
          console.log('-------recordSampleRate--------', recordSampleRate)

          mediaStream = audioCtx.createMediaStreamSource(stream)

          const bufferSize = 2048
          const numberOfInputChannels = 2
          const numberOfOutputChannels = 2
          if (audioCtx.createScriptProcessor) {
            recorder = audioCtx.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)
          } else {
            recorder = audioCtx.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)
          }
          console.log('recorder', recorder)

          streamManager = stream
          resolve()
        }

        const onError = err => {
          console.log('The following error occured: ' + err)
        }

        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError)
      })
    },

    // 关闭媒体
    closeUserMedia() {
      // 1. 断开处理链的连接
      if (recorder && audioCtx) {
        recorder.disconnect(audioCtx.destination)
      }

      if (mediaStream && recorder) {
        mediaStream.disconnect(recorder)
      }

      // 2. 停止原始媒体流的所有轨道
      if (streamManager) {
        streamManager.getTracks().forEach(track => track.stop())
        streamManager = null
      }

      // 3. 清空变量引用
      recorder = null
      mediaStream = null

      // 4. 可选：关闭 AudioContext
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx
          .close()
          .then(() => {
            console.log('AudioContext closed')
            audioCtx = null
          })
          .catch(err => console.error('Error closing AudioContext:', err))
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  user-select: none;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.record-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.record-button:hover {
  background-color: #0056b3;
}

.record-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

.message {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.message h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #444;
}

.message-list {
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.message-item {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}
</style>
