<template>
  <div class="page" id="tt012"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'

let vditor // 编辑器本体

const mock = `
  # 一级标题
  User: 培养皿中的[细菌](https://baike.baidu.com/item/%E7%BB%86%E8%8F%8C/372577)每分钟扩增一倍面积，48分钟可以填满，问填满一半要多久？
  Assistant: 这个问题可以通过简单的数学逻辑来解决。
  <custom-textarea>123</custom-textarea>
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
        renderers: {
          customTextarea: text => {
            console.log('123123123')
            // 解析自定义标签
            const content = text.replace(/<custom-textarea>(.*?)<\/custom-textarea>/g, (match, p1) => {
              return `<textarea>${p1}</textarea>`
            })
            return content
          }
        },
        after: () => {
          console.log('编辑器初始化完成', vditor)
          console.log('11111111', vditor.vditor.options)
          vditor.setValue(mock)
        }
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
