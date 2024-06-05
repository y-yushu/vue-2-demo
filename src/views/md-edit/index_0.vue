<template>
  <div class="page" id="tt012"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'

let vditor // 编辑器本体

const mock = `
# 一级标题

## 二级标题

### 三级标题

User: 培养皿中的[细菌](https://baike.baidu.com/item/%E7%BB%86%E8%8F%8C/372577)每分钟扩增一倍面积，48分钟可以填满，问填满一半要多久？
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
`

export default {
  name: 'MdEdit0',
  components: {},
  data() {
    return {
      value1: mock
    }
  },
  mounted() {
    this.initVditor()
  },
  methods: {
    initVditor() {
      vditor = new Vditor('tt012', {
        // theme: 'dark',
        mode: 'ir',
        height: '100%',
        toolbar: [
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          '|',
          'upload',
          'record',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'export', // 导出
          'edit-mode' // 编辑模式
        ],
        // 字数统计
        counter: {
          enable: true,
          type: 'text'
        },
        after: () => {
          //   vditor.setTheme('dark', 'dark')
          console.log('编辑器初始化完成', vditor)
          vditor.setValue(mock)
        }
        // customRenderers: {
        //   // 自定义渲染链接
        //   link: (link, linkType) => {
        //     console.log('link-------', link)
        //     console.log('link-------', linkType)
        //     if (linkType === 'link') {
        //       //   return `<a href="${link.href}" target="_blank">${link.content}</a>`
        //       return `<a href="${link.href}" target="_blank">${'自定义标签啊'}</a>`
        //     }
        //     return link.content
        //   },
        //   // 自定义渲染代码块
        //   codeBlock: (code, lang) => {
        //     console.log('code--------', code)
        //     console.log('lang--------', lang)
        //     return `<pre><code class="language-${lang}">${code}</code></pre>`
        //   }
        // }
      })
    }
  }
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
