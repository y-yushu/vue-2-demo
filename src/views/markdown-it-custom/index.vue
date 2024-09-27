<template>
  <div style="padding: 1rem">
    <b class="blue">markdown-it自定义渲染</b>
    <br />
    <button @click="startTyping">开始加载</button>
    <cu-render v-model="mock" />
  </div>
</template>

<script>
import CuRender from './render.vue'

const mock = `
一些普通文本

@start
这是自定义块的内容
可以包含**Markdown**格式
@end
更多普通文本

<!--123123-->

11
`
// const mock = `# 台湾海峡概览
//   ## 引言
//   \`\`\`js
//   你好,世界
//   \`\`\`
//   \`\`\`mermaid
//   你好,世界泥
//   \`\`\`
//   @hisw_echarts_start
//   {"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[150,230,224,218,135,147,260],"type":"line"}]}
//   @hisw_echarts_end

//   @hisw_echarts_start
//   {"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[150,230,224,218,135,147,260],"type":"line"}]}
//   @hisw_echarts_end`

export default {
  name: 'MarkdownItCustom',
  components: { CuRender },
  data() {
    return {
      mock: '',
      html: ''
    }
  },
  methods: {
    startTyping() {
      this.mock = mock
      //   this.mock = ''
      //   let i = 0
      //   const timer = setInterval(() => {
      //     this.mock += mock[i]
      //     i++
      //     if (i >= mock.length) {
      //       clearInterval(timer)
      //     }
      //   }, 10)
    }
  }
}
</script>

<style>
.blue {
  color: blue;
}
</style>
