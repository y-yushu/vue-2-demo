<!--
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 16:15:13
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 17:06:18
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
import mergeImages from "merge-images";
import icon_back from "@/assets/images/back.png";
import icon_tree from "@/assets/images/tree.png";

export default {
  name: "ViewPage2",
  data() {
    return {
      title: "merge-images",
      image_url: "",
    };
  },
  created() {
    mergeImages([icon_back, icon_tree]).then((b64) => {
      console.log(31, b64);
      this.image_url = b64;
    });
  },
  methods: {
    drawColorBack() {
      console.log("drawColorBack");
      let canvas = document.createElement("canvas");
      canvas.width = "200";
      canvas.height = "200";
      let ctx = canvas.getContext("2d");
      //3.绘制
      ctx.beginPath(); //开始绘制
      ctx.arc(100, 100, 100, 0, 2 * Math.PI); //arc 的意思是“弧”
      ctx.fillStyle = "#ff0"; //设置填充颜色
      ctx.fill(); //开始填充
      ctx.strokeStyle = "blue"; //将线条颜色设置为蓝色
      ctx.stroke(); //stroke() 方法默认颜色是黑色（如果没有上面一行，则会是黑色）。
      console.log("绘制完成");
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
