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
// import markdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

// // 自定义Markdown解析逻辑
// const md = markdownIt()
// md.use(markdownItContainer, 'custom', {
//   validate: params => {
//     return params.trim().match(/^custom\s*$/)
//   },
//   render: (tokens, idx) => {
//     if (tokens[idx].nesting === 1) {
//       return '<div class="custom-block">\n'
//     } else {
//       return '</div>\n'
//     }
//   }
// })

VueMarkdownEditor.use(vuepressTheme, {
  Prism
}).extendMarkdown(mdParser => {
  mdParser.use(markdownItContainer, 'custom', {
    validate: params => {
      return params.trim().match(/^custom\s*$/)
    },
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        return '<div class="custom-block">\n'
      } else {
        return '</div>\n'
      }
    }
  })
})

const mock = `
# 一级标题

## 二级标题

### 三级标题

User: 培养皿中的细菌每分钟扩增一倍面积，48分钟可以填满，问填满一半要多久？
Assistant: 这个问题可以通过简单的数学逻辑来解决。

假设培养皿的总面积为 ( T )，且我们知道在第 ( 48 ) 分钟时细菌覆盖了整个培养皿。因此，在 ( 48 ) 分钟时，面积是 ( T )。

由于细菌每分钟面积增加一倍，我们可以推导出细菌在任何时间 ( t ) 的面积表达式。设 ( A(t) ) 是在 ( t ) 分钟内细菌所占据的面积，则有：
:::custom
[ A(t) = T/2^{(48-t)} ]
:::

当细菌填满培养皿的一半（即$frac{12}{3} = 4$）时，
$$
frac{12}{3} = 4
$$

$$
2^(t-1) = A * 2^(48 - t)
$$
`

export default {
  name: 'MdEdit1',
  components: { VueMarkdownEditor },
  data() {
    return {
      value1: mock
    }
  },
  methods: {}
}
</script>

<style>
.page {
  height: 100%;
}
.v-md-editor {
  height: 100%;
}
.custom-block {
  background: greenyellow;
  color: blue;
}
</style>
