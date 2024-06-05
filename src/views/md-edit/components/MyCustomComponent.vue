<template>
  <div :id="id" class="custom-input" contenteditable="false">
    <input v-model="title2" type="text" />
    <div class="del-button" @click="delSelf">删</div>
  </div>
</template>

<script>
export default {
  name: 'MyCustomComponent',
  props: {
    // 当前组件唯一id
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 编辑模式
      isEdit: true,
      title2: '测试内容'
    }
  },
  created() {
    console.log('------------------', this.title2)
    this.title2 = this.title
  },
  methods: {
    getComponentInfo() {
      const info = {
        id: this.id,
        title: this.title2
      }
      const json = JSON.stringify(info)
      return json
    },
    delSelf() {
      const self = document.getElementById(this.id)
      self.remove()
    }
  }
}
</script>

<style lang="less" scoped>
.custom-input {
  position: relative;
  display: inline-block;
}
.del-button {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  width: 20px;
  background: orange;
}
</style>
