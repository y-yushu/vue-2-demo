<template>
  <div class="home">
    <div style="height: 5px"></div>
    <time-line :points="points"></time-line>
  </div>
</template>

<script>
import TimeLine from "vue-timeline-customizable";

export default {
  name: "HomeView",
  components: { TimeLine },
  data() {
    return {
      points: [
        {
          pointColor: "red", // important! the color of every time point and you can use red yellow or green *关键点颜色 可选red yellow green
          img: "http://www.jikexueyuan.com/event/static/images/bootstrap/bootstrap-logo.png", // img url for every time point 图片地址 可留空
          title: "hello world", // important! title *时间点标题
          titleClass: ["text-black"],
          text: "first post", // important! the content you want show *时间点内容
          textClass: ["text-black"],
          linkUrl: "https://www.google.com", // url for read more 链接url 留空则不显示按钮
          linkText: "Read detail", // show what in read for more button 按钮显示内容 默认为Read more
          date: "2017-1-1", // time of the point 时间点,
          dateClass: ["text-black"], //class that will be applied to date container
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: rgba(255, 166, 0, 0.362);
}
</style>
