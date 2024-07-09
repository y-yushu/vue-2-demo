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
        after: () => {
          console.log('编辑器初始化完成', vditor)
          console.log('vditor.options', vditor.options)
          vditor.setValue(mock)
        },
        customRenderers: {
          renderers: {
            note: element => {
              if (element.tagName === 'DIV' && element.classList.contains('custom-note')) {
                const noteElement = document.createElement('div')
                // noteElement.style.backgroundColor = '#e7f3fe'
                noteElement.style.backgroundColor = 'red'
                noteElement.style.borderLeft = '6px solid #2196F3'
                noteElement.style.padding = '10px'
                noteElement.style.margin = '10px 0'

                const strongElement = document.createElement('strong')
                strongElement.innerText = 'Note: '
                noteElement.appendChild(strongElement)

                const spanElement = document.createElement('span')
                spanElement.innerHTML = element.innerHTML
                noteElement.appendChild(spanElement)

                element.replaceWith(noteElement)
              }
            }
          },
          // 使用正则表达式匹配自定义的 note 标签
          custom: [
            {
              // 匹配 `:::note ... :::`
              match: /<custom-textarea>([\s\S]*?)<\/custom-textarea>/g,
              renderer: function (match, p1) {
                return `<div class="custom-note">${p1.trim()}</div>`
              }
            }
          ]
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
