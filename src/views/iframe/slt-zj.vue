<template>
  <div class="page">
    <div class="iframe-box">
      <iframe :src="src" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IframeSltZj',
  data() {
    return {
      src: 'https://typhoon.slt.zj.gov.cn/#/'
    }
  }
}
</script>

<style scoped>
.page {
  height: 100%;
  background: pink;
}

.iframe-box {
  margin: 50px;
  height: calc(100% - 200px);
}

.page iframe {
  width: 100%;
  height: 100%;
}
</style>
