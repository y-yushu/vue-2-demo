<!--
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 17:53:00
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 17:56:33
 * @FilePath: \vue-module-demo\src\views\page3.vue
 * @Description: 时间进度条
-->
<template>
  <div class="page_3">
    <div class="page_bottom">
      <div class="time_bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewPage3",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.page_3 {
  position: relative;
  height: 100%;
  background-color: rgba(255, 192, 203, 0.6);
  .page_bottom {
    position: absolute;
    left: 0;
    bottom: 50%;
    width: 100%;
    height: 20px;
  }
  .time_bar {
    width: 100%;
    height: 100%;
    background-color: #272822;
  }
}
</style>
