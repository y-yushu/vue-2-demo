<template>
  <div class="page">
    <VueMarkdownEditor v-model="value1" />
  </div>
</template>

<script>
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// Prism
import Prism from 'prismjs'
import 'prismjs/components/prism-json'

// 定义自定义标签解析器
function customTagParser(md) {
  // 插入解析规则
  md.inline.ruler.before('emphasis', 'custom_tag', (state, silent) => {
    const start = state.pos

    if (state.src.charCodeAt(start) !== 0x3c) return false

    const match = state.src.slice(start).match(/^<custom-tag>(.*?)<\/custom-tag>/)

    if (!match) return false

    if (silent) return false

    const token = state.push('custom_tag', '', 0)
    token.content = match[1]

    state.pos += match[0].length

    return true
  })

  // 定义渲染规则
  md.renderer.rules.custom_tag = (tokens, idx) => {
    const token = tokens[idx]
    return `<span class="custom-block">${token.content}<i></i></span>`
  }
}

// 自定义Markdown解析逻辑
VueMarkdownEditor.use(vuepressTheme, {
  Prism
}).extendMarkdown(mdParser => {
  customTagParser(mdParser)
})

const mock = `
# 一级标题
这是一个自定义标签：<custom-tag>{"id":"tskd02"}</custom-tag>
你好世界
<custom-tag>{"id":"tskd03"}</custom-tag>
`

export default {
  name: 'MdEdit1',
  components: { VueMarkdownEditor },
  data() {
    return {
      value1: ''
    }
  },
  created() {
    this.value1 = mock
  },
  mounted() {
    document.addEventListener('click', this.clickListener)
  },
  destroyed() {
    document.removeEventListener('click', this.clickListener)
  },
  methods: {
    clickListener(event) {
      const dom = event.target
      if (dom.nodeName === 'I') {
        const value = this.value1
        const regex = /<custom-tag>(.*?)<\/custom-tag>/g
        let match
        while ((match = regex.exec(value)) !== null) {
          console.log('-----------------------------')
          console.log(match[0]) // 输出匹配到的整个标签
          const obj = JSON.parse(match[1])
          console.log('obj', obj)
          if (obj?.id === 'tskd02') {
            // 计算起始位置和结束位置
            const startIndex = match.index // 匹配到的字符串在原始字符串中的起始位置
            const endIndex = startIndex + match[0].length - 1 // 结束位置为起始位置加上字符串长度减一（因为索引从0开始）
            console.log(`起始位置: ${startIndex}, 结束位置: ${endIndex}`)
            const long = value.substring(startIndex, endIndex + 1)
            console.log('long', long)
            const resultString = value.substring(0, startIndex) + value.substring(endIndex + 1)
            console.log('resultString', resultString)
            this.value1 = resultString
            return
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.page {
  height: 100%;
}
.v-md-editor {
  height: 100%;
}
.custom-block {
  position: relative;
  background: greenyellow;
  color: blue;
  & > i {
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: aquamarine;
    cursor: pointer;
  }
}
</style>
