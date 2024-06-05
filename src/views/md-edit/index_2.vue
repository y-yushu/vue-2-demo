<template>
  <div>
    <Editor
      v-model="html"
      class="my-editor"
      :default-config="editorConfig"
      mode="default"
      @onCreated="onCreated"
      @onChange="onChange"
      @customPaste="customPaste"
      @keydown.enter.native="keyDown"
    />
  </div>
</template>

<script>
import { Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

export default {
  name: 'MdEdit2',
  components: { Editor },
  data() {
    return {
      html: '',
      editorConfig: {
        placeholder: '请输入您想了解的内容，Shift+Enter换行',
        MENU_CONF: {
          uploadImage: {
            customUpload: this.customUpload
          }
        }
      }
    }
  },
  methods: {
    onCreated() {},
    onChange() {},
    customPaste() {},
    keyDown() {}
  }
}
</script>
