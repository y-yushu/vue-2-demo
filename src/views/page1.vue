<!--
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 14:45:51
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 16:14:18
 * @FilePath: \vue-module-demo\src\views\page1.vue
 * @Description: 组件1--Echart尝试添加缩略图
-->
<template>
  <div class="page1">
    <div class="echart_box">
      <div class="echart_scale" :style="{ top: top, left: left, scale: scale }">
        <div ref="echart" class="echart_class"></div>
      </div>
    </div>
    <div class="buttons">
      <button @click="tttt">测试</button>
      <button @click="add">放大</button>
      <button @click="lessen">缩小</button>
    </div>
    <div class="thumbnail">
      <img
        v-if="thumbnail_image"
        :src="thumbnail_image"
        alt="缩略图"
        class="thumbnail_image"
        :style="{
          wdith: thumbnail_image_wid + 'px',
          height: thumbnail_image_hei + 'px',
        }"
        :draggable="false"
      />
      <div
        class="display_frame"
        :style="{ top: top, left: left, scale: thumbnail_scale }"
      ></div>
    </div>
  </div>
</template>

<script>
import * as echart from "echarts";

export default {
  name: "ViewPage1",
  data() {
    return {
      chart: null, // Echart
      // 缩略图，图片及宽高
      thumbnail_image: null,
      thumbnail_image_wid: 0,
      thumbnail_image_hei: 0,
      scale: 1, // 缩放比例
      left: 0, // 居左
      top: 0, // 居上
    };
  },
  computed: {
    // 缩略图的缩放程度
    thumbnail_scale() {
      const _s = this.scale;
      if (_s <= 0) return 1;
      return 1 / _s;
    },
  },
  mounted() {
    this.initEchart();
  },
  methods: {
    // 初始化
    initEchart() {
      const dom = this.$refs.echart;
      if (dom) {
        // 获取宽高比
        this.getAspectRatio(dom);
        const chart = echart.init(dom);
        this.chart = chart;
        this.setOption();
      }
    },
    // 设置属性
    setOption() {
      this.chart.setOption({
        // 动画更新变化时间
        animationDurationUpdate: 500,
        animationEasingUpdate: "quinticInOut",
        tooltip: {
          show: false,
        },
        series: [
          {
            type: "graph",
            layout: "force",
            legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
            edgeLabel: {
              position: "middle", //边上的文字样式
            },
            edgeSymbol: ["", "arrow"],
            force: {
              edgeLength: 15,
              repulsion: 200,
            },
            roam: true,
            draggable: true, //每个节点的拖拉
            lineStyle: {
              width: 2,
            },
            label: {
              fontSize: 18,
            },
            symbolSize: 24, //节点大小
            links: [
              { source: "2", target: "3", name: "" },
              { source: "3", target: "4", name: "" },
              { source: "3", target: "5", name: "" },
              { source: "5", target: "6", name: "" },
              { source: "5", target: "7", name: "" },
              { source: "5", target: "8", name: "" },
              { source: "9", target: "10", name: "" },
              { source: "10", target: "9", name: "" },
              { source: "1", target: "2", name: "" },
              { source: "1", target: "10", name: "" },
            ],
            data: [
              {
                id: 1,
                name: "测试节点",
                categary: "1",
              },
              {
                id: 2,
                name: "测试节点",
                categary: "1",
              },
              {
                id: 3,
                name: "测试节点",
                categary: "2",
              },
              {
                id: 4,
                name: "测试节点",
                categary: "",
              },
              {
                id: 5,
                name: "测试节点测试节点",
                categary: "",
              },
              {
                id: 6,
                name: "测试节点",
                categary: "2",
              },
              {
                id: 7,
                name: "测试节点",
                categary: "",
              },
              {
                id: 8,
                name: "测试节点",
                categary: "",
              },
              {
                id: 9,
                name: "测试节点",
                categary: "",
              },
              {
                id: 10,
                name: "测试节点",
                categary: "",
              },
            ],
            cursor: "pointer",
          },
        ],
      });
      setTimeout(() => {
        this.tttt();
      }, 300);
    },
    // 获取宽高比
    getAspectRatio(dom) {
      this.thumbnail_image_wid = dom.offsetWidth / 10;
      this.thumbnail_image_hei = dom.offsetHeight / 10;
    },
    // 放大
    add() {
      this.scale += 0.1;
    },
    // 缩小
    lessen() {
      this.scale -= 0.1;
    },
    tttt() {
      console.log("测试方法");
      if (this.chart) {
        const image = this.chart.getDataURL({
          type: "png",
          pixelRatio: 0.5,
          backgroundColor: "#f5f7fa",
        });
        this.thumbnail_image = image;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page1 {
  position: relative;
  height: 100%;
  .echart_box {
    position: relative;
    height: 100%;
    overflow: hidden;
    border: solid 1px saddlebrown;
    box-sizing: border-box;
  }
  .echart_scale {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 192, 203, 0.3);
  }
  .echart_class {
    height: 100%;
  }
  .buttons {
    position: absolute;
    top: 0;
    left: 0;
    background-color: orange;
  }
  .thumbnail {
    position: absolute;
    bottom: 10px;
    right: 10px;
    overflow: hidden;
    .thumbnail_image {
      width: 200px;
      height: 200px;
      user-select: none;
    }
    .display_frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 166, 0, 0.5);
    }
  }
}
</style>
