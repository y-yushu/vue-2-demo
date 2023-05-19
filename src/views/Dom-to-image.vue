<template>
  <div>
    <div ref="dom" class="test">123123</div>
    <button @click="test">点击测试</button>
  </div>
</template>

<script>
// 学习html2canvas组件
import domtoimage from "dom-to-image";

export default {
  data() {
    return {
      src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.V21ZrCyt_n-rB7_C4d86qgHaEo?pid=ImgDet&rs=1",
    };
  },
  methods: {
    test() {
      const dom = this.$refs.dom;
      domtoimage.toPng(dom).then((res) => {
        const img = new Image();
        img.src = res;
        document.body.appendChild(img);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.test {
  background: url("https://tse1-mm.cn.bing.net/th/id/OIP-C.V21ZrCyt_n-rB7_C4d86qgHaEo?pid=ImgDet&rs=1");
}
</style>
