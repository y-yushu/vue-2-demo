<!--
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 16:15:13
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 17:46:47
 * @FilePath: \vue-module-demo\src\views\page2.vue
 * @Description: 组件2--Merge Images
-->
<template>
  <div class="page_2">
    <h1>{{ title }}</h1>
    <img v-if="image_url" class="iamge" :src="image_url" alt="合成" />
    <br />
    <button @click="drawColorBack">绘制纯色</button>
    <div>
      <canvas
        id="myCanvas"
        ref="canvas"
        width="300"
        height="300"
        style="border: solid 1px red"
      ></canvas>
    </div>
  </div>
</template>

<script>
import { getSymbol } from "@/utils/draw.js";
// import icon_tree from "@/assets/images/tree.png";
import icon_contact from "@/assets/images/contact.png";

export default {
  name: "ViewPage2",
  data() {
    return {
      title: "merge-images",
      image_url: "",
    };
  },
  created() {},
  methods: {
    drawColorBack() {
      getSymbol("#48b8dd", icon_contact).then((b64) => {
        console.log(b64);
        this.image_url = b64;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page_2 {
  height: 100%;
  background-color: rgba(255, 166, 0, 0.451);
  h1 {
    margin-top: 0;
  }
  .iamge {
    width: 64px;
    height: 64px;
  }
}
</style>
