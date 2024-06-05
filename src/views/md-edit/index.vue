<template>
  <div class="page">
    <div class="buttons">
      <button @click="isEdit = !isEdit">编辑模式：{{ isEdit ? '开' : '关' }}</button>
      <button @click="addComp">插入组件</button>
      <button @click="htmlToMd1">html转md</button>
      <button @click="htmlToMd2">md转html</button>
    </div>
    <div id="cuEdit" class="cu-edit" :contenteditable="isEdit"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import TurndownService from 'turndown'
import MarkdownIt from 'markdown-it'
import MyCustomComponent from './components/MyCustomComponent.vue'

const htmlToMarkdown = html => {
  const turndownService = new TurndownService()
  // 转换成自定义标签
  turndownService.addRule('custom-input', {
    filter: node => {
      return node.nodeName === 'DIV' && node.classList.contains('custom-input')
    },
    replacement: (_, node) => {
      const rootComponent = vueEle[node.id].$children[0]
      const json = rootComponent.getComponentInfo()
      return `<custom-input>${json}</custom-input>`
    }
  })
  return turndownService.turndown(html)
}

const markdownToHtml = markdown => {
  const md = new MarkdownIt()

  // 自定义规则处理行内标签
  md.inline.ruler.push('custom-input', (state, silent) => {
    // 如果当前不是处理中，则返回 false
    if (state.src[state.pos] !== '<') return false

    // 匹配你的自定义行内标签
    const match = state.src.slice(state.pos).match(/^<custom-input>(.*?)<\/custom-input>/)
    if (!match) return false

    // 如果是 silent 模式，则不需要解析，直接返回 true
    if (silent) return true

    // 更新解析状态的位置 pos
    state.pos += match[0].length

    const obj = JSON.parse(match[1])
    vuePros[obj.id] = obj

    // 将匹配到的内容替换为 HTML 标签
    const token = state.push('html_inline', '', 0)
    token.content = `<span id="${obj.id}" class="custom-input"></span>`

    return true
  })

  const result = md.render(markdown)
  return result
}

const vuePros = {}
const vueEle = {}

const mock = `一级标题11
======

二级标题
----

* author: Hisw
  1. 有序1
  1. 有序2
  1. 有序3
* version: 1.0
* language:中文/英文
* description:你是一位软件**开发顾问**,专门为客户提供**JavaWeb**应用程序开发的建议和解决方案你的主要任务是根据客户的具体需求，提出适合的架构和代码设计方案。

1. 有序列表1
1. 有序列表2
1. 有序列表3
1. 有序列表4

姓名：<custom-input>{"id":"ttjdidk1028","title":"这个是测试数据"}</custom-input>必填项

`

export default {
  name: 'MdEdit',
  // components: { MyCustomComponent },
  data() {
    return {
      isEdit: true,
      value1: mock
    }
  },
  mounted() {},
  methods: {
    // 插入自定义标签
    addComp() {
      const selection = window.getSelection()
      if (!selection.rangeCount) return
      const range = selection.getRangeAt(0)
      range.deleteContents() // 删除选中内容
      // 创建 <br> 元素，并插入到光标位置的前面
      // const br = document.createElement('br')
      // range.insertNode(br)
      // range.setStartAfter(br)
      // range.setEndAfter(br)
      const div = document.createElement('span')
      const id = 't' + Math.random()
      div.id = id
      div.classList.add('custom-input')
      range.insertNode(div)
      range.setStartAfter(div)
      range.setEndAfter(div)
      vueEle[id] = new Vue({
        render: h =>
          h(MyCustomComponent, {
            props: {
              id: id
            }
          })
      }).$mount(div)
      selection.removeAllRanges()
      selection.addRange(range)
    },
    // html转markdown
    htmlToMd1() {
      const dom = document.getElementById('cuEdit')
      const text = htmlToMarkdown(dom)
      console.log('MD内容：\n', text)
      this.value1 = text
    },
    // markdown转html
    htmlToMd2() {
      const result = markdownToHtml(this.value1)
      console.log('html内容：\n', result)
      const dom = document.getElementById('cuEdit')
      console.log('dom', dom)
      dom.innerHTML = result
      const customInputs = dom.querySelectorAll('.custom-input')
      customInputs.forEach(placeholderNode => {
        vueEle[placeholderNode.id] = new Vue({
          render: h =>
            h(MyCustomComponent, {
              props: vuePros[placeholderNode.id]
            })
        }).$mount(placeholderNode)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(./cu-edit.css);
.page {
  height: 100%;
}
.buttons {
  padding: 10px;
  button {
    margin-right: 10px;
  }
}
</style>
