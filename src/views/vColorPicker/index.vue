<template>
  <div class="box">
    <colorPicker class="cu-color-picker" v-model="color" />
    <br />
    <button @click="test">测试</button>
  </div>
</template>

<script>
export default {
  name: 'vColorPicker',
  data() {
    return {
      color: '#ff0000'
    }
  },
  methods: {
    test() {
      console.log('this.color', this.color)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  text-align: right;
  padding: 50px;
}
.cu-color-picker {
  width: 30px;
  height: 30px;
  &::v-deep .colorBtn {
    width: 30px;
    height: 30px;
  }
  &::v-deep .box {
    right: 10px;
    // 这里可以设置级别，避免被其他元素遮挡
    // z-index: 100;
  }
}
</style>
