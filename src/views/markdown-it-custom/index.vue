<template>
  <div style="padding: 1rem">
    <b class="blue">markdown-it自定义渲染</b>
    <br />
    <button @click="startTyping">开始加载</button>
    <button @click="stopTyping">停止加载</button>
    <cu-render v-if="show" v-model="mock" />
  </div>
</template>

<script>
import CuRender from './render.vue'

// const mock = `
// 你好
// \`\`\`mermaid
// {"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[150,230,224,218,135,147,260],"type":"line"}]}
// \`\`\`
// {"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[150,230,224,218,135,147,260],"type":"line"}]}
// `
const mock = `# 台湾海峡概览
@hisw_echarts_start{"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[150,230,224,218,135,147,260],"type":"line"}]}@hisw_echarts_end
{"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[150,230,224,218,135,147,260],"type":"line"}]}
`

export default {
  name: 'MarkdownItCustom',
  components: { CuRender },
  data() {
    return {
      mock: '',
      show: true
    }
  },
  methods: {
    startTyping() {
      // this.mock = this.mock ? '' : mock
      this.mock = ''
      let i = 0
      const timer = setInterval(() => {
        this.mock += mock[i]
        i++
        if (i >= mock.length) {
          clearInterval(timer)
        }
      }, 10)
    },
    stopTyping() {
      this.show = false
    }
  }
}
</script>

<style>
.blue {
  color: blue;
}
.custom-comment {
  color: orange;
}
</style>
