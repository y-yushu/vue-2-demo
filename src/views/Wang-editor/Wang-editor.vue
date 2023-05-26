<template>
  <div>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :default-config="toolbarConfig"
      mode="default"
    />
    <Editor
      v-model="html"
      class="my-editor"
      :default-config="editorConfig"
      mode="default"
      @onCreated="onCreated"
      @onChange="onChange"
    />
    <button @click="test2">采集音频</button>
    <button @click="test3">结束音频</button>
    <button @click="test4">播放音频</button>
  </div>
</template>

<script>
import { Boot } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import attachmentModule from "@wangeditor/plugin-upload-attachment";
import "@wangeditor/editor/dist/css/style.css";
import Recorder from "js-audio-recorder";
Boot.registerModule(attachmentModule);

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      // 富文本
      editor: null,
      html: "",
      toolbarConfig: {
        toolbarKeys: ["uploadImage", "uploadVideo", "uploadAttachment"],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        hoverbarKeys: {
          attachment: {
            menuKeys: ["downloadAttachment"], // “下载附件”菜单
          },
        },
        MENU_CONF: {
          uploadAttachment: {
            customUpload: (file, insertFn) => {
              this.uploadFile(file).then((res) => {
                insertFn(
                  res.data.publicUrl,
                  res.data.originFileName,
                  res.data.relativePath
                );
              });
            },
          },
          // 自定义图片上传
          uploadImage: {
            customUpload: (file, insertFn) => {
              this.uploadFile(file).then((res) => {
                insertFn(
                  res.data.publicUrl,
                  res.data.originFileName,
                  res.data.relativePath
                );
              });
            },
          },
          // 自定义视频上传
          uploadVideo: {
            customUpload: (file, insertFn) => {
              this.uploadFile(file).then((res) => {
                insertFn(
                  res.data.publicUrl,
                  res.data.originFileName,
                  res.data.relativePath
                );
              });
            },
          },
        },
      },
      // 音频
      recorder: null,
    };
  },
  created() {
    this.recorder = new Recorder({
      sampleBits: 16,
      sampleRate: 16000,
      numChannels: 1,
    });
  },
  methods: {
    // 初始化
    onCreated(editor) {
      this.editor = Object.seal(editor);
      console.log("初始化完成", this.editor);
    },
    onChange(e) {
      console.log("富文本内容改变", e.children);
    },
    // 上传的实现
    uploadFile(file) {
      return new Promise((resolve, reject) => {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("dir", "");
        fd.append("suffix", file.type);
        fetch("https://mcc.3xmt.com/file" + "/oss/upload/file", {
          method: "POST",
          body: fd,
        })
          .then((res) => {
            if (res.ok) return res.json();
            else reject();
          })
          .then((res) => {
            if (res.code == 200) {
              resolve(res);
            } else {
              reject();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    test2() {
      console.log("采集音频测试接口");
      Recorder.getPermission()
        .then(() => {
          this.recorder.start();
        })
        .catch((err) => {
          console.error("麦克风未开启", err);
        });
    },
    test3() {
      console.log("结束录音");
      if (this.recorder) this.recorder.stop();
    },
    test4() {
      if (this.recorder) {
        this.recorder.play();
        const blob = this.recorder.getWAVBlob();
        console.log(161, blob);
        const newbolb = new Blob([blob], { type: "audio/wav" });
        const file = new File([newbolb], new Date().getTime() + ".wav");
        const fd = new FormData();
        fd.append("file", file);
        fd.append("dir", "");
        fd.append("suffix", "wav");
        fetch("https://mcc.3xmt.com/file" + "/oss/upload/file", {
          method: "POST",
          body: fd,
        })
          .then((res) => {
            if (res.ok) return res.json();
            else console.log("未成功", res);
          })
          .then((res) => {
            if (res.code == 200) {
              console.log("成功", res);
            } else {
              console.log("未成功", res);
            }
          })
          .catch((err) => {
            console.log("异常", err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-editor {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
}
</style>
