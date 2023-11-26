<template>
  <div class="page">
    <button @click="test1">老版sse发送</button>
    <button @click="test2">新版sse发送</button>
    <button>按钮3</button>
    <button>按钮4</button>
    <br />
    <span>{{ apiData }}</span>
  </div>
</template>

<script>
import { fetchEventSource } from '@microsoft/fetch-event-source'
const userId = '1630870906786025473'
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiV0VCUyJdLCJ1c2VyX25hbWUiOiJzbWFydGNpdHkiLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTcwMDk5OTg5MywiYXV0aG9yaXRpZXMiOlsic3lzZW0tc21hcnQtY2l0eSJdLCJqdGkiOiJNNVdFWDJTV25iZ3RJUi02Zlp5ZkV0a2Z2TGMiLCJjbGllbnRfaWQiOiJrZ3JhcGgiLCJ1c2VybmFtZSI6InNtYXJ0Y2l0eSJ9.HRwaGzxERQOExf2Jx-leYWCvUN_qyVcAW7ywvSe_uvs'

export default {
  name: 'sseApi',
  data() {
    return {
      apiData: '' // api的返回数据
    }
  },
  methods: {
    // 老版发送
    test1() {
      console.log('测试功能1')
      this.oldSend({
        success: data => {
          console.log('data', data)
          this.apiData = data
        }
      })
    },
    oldSend({ success }) {
      const ctrl = new AbortController()
      const data = {
        ingressServiceInfoId: '1669163409247174658',
        clientId: '3e705b74-3970-47af-ae8f-951340d573e2',
        messageId: 'd75b4799-7ceb-4903-b1a4-43cb4ffc2bb2',
        problem: '中国只有唯一一位女皇帝，你觉得这是为什么？',
        extand: {
          memoryFunction: false,
          pluginList: []
        },
        images: [],
        videos: [],
        files: [],
        requestModel: []
      }
      fetchEventSource('/api/service-management/ingress/service/sse/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          'Mcc-User-Id': userId
        },
        heartbeatTimeout: 60 * 60 * 1000,
        body: JSON.stringify(data),
        signal: ctrl.signal,
        onopen() {
          console.log('连接开始')
        },
        onmessage(ev) {
          console.log('接收', '123')
          success && success(ev.data)
          // 接收到结束信息后，中断连接
          if (ev && ev.isEnd) ctrl.abort()
        },
        onerror(err) {
          console.log('返回异常', err)
          throw err
        }
      })
    },
    // 新版发送
    test2() {
      const fetchEventSource = (url, options) => {
        fetch(url, options)
          .then(response => {
            if (response.status === 200) {
              options.onopen && options.onopen()
              return response.body
            }
          })
          .then(rb => {
            const reader = rb.getReader()
            const push = () => {
              // done 为数据流是否接收完成，boolean
              // value 为返回数据，Uint8Array
              return reader.read().then(({ done, value }) => {
                if (done) {
                  options.onclose && options.onclose()
                  return
                }
                options.onmessage && options.onmessage(new TextDecoder().decode(value))
                // 持续读取流信息
                return push()
              })
            }
            // 开始读取流信息
            return push()
          })
          .catch(e => {
            options.error && options.error(e)
          })
      }
      const controller = new AbortController()
      fetchEventSource('/api/service-management/ingress/service/sse/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          'Mcc-User-Id': userId
        },
        body: JSON.stringify({
          ingressServiceInfoId: '1669163409247174658',
          clientId: '3e705b74-3970-47af-ae8f-951340d573e2',
          messageId: 'd75b4799-7ceb-4903-b1a4-43cb4ffc2bb2',
          problem: '中国只有唯一一位女皇帝，你觉得这是为什么？',
          extand: {
            memoryFunction: false,
            pluginList: []
          },
          images: [],
          videos: [],
          files: [],
          requestModel: []
        }),
        signal: controller.signal,
        onopen: () => {
          console.log('开启')
        },
        onclose: () => {
          console.log('关闭')
        },
        onmessage: event => {
          const data = JSON.parse(event)
          console.log('message', data)
        },
        onerror: e => {
          console.log('error', e)
        }
      })
    }
  }
}
</script>

<style>
.page {
  padding: 30px;
}
button {
  margin-right: 20px;
}
</style>
