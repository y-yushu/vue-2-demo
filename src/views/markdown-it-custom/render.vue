<template>
  <div ref="markdown_container" v-html="html"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import customTagPlugin from './customTagPlugin'

// markdown 比较算法 渲染
export default {
  name: 'CuRender',
  props: {
    // 渲染内容
    value: {
      type: String,
      default: ''
    },
    // 是否结束
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newVal, oldVal) {
      console.log('oldVal', oldVal)
      const html = this.md.render(newVal)
      this.html = html
      //   // 老数据
      //   const oldHtml = this.md.render(oldVal)
      //   const temp1 = document.createElement('div')
      //   temp1.innerHTML = oldHtml
      //   const coun1 = temp1.children.length
      //   // 新数据
      //   const newHtml = this.md.render(newVal)
      //   const temp2 = document.createElement('div')
      //   temp2.innerHTML = newHtml
      //   const coun2 = temp2.children.length
      //   const outputDiv = this.$refs.markdown_container
      //   if (coun1 === coun2) {
      //     // 更新
      //     const lastChild = outputDiv.lastElementChild
      //     const last = temp2.children[temp2.children.length - 1]
      //     if (lastChild) {
      //       lastChild.innerHTML = last?.innerHTML || ''
      //     }
      //   } else {
      //     // 增加
      //     const lastTwo = temp2.children[temp2.children.length - 2] || null
      //     const last = temp2.children[temp2.children.length - 1]
      //     if (lastTwo) {
      //       const lastChild = outputDiv.lastElementChild
      //       if (lastChild) {
      //         lastChild.innerHTML = lastTwo?.innerHTML || ''
      //       }
      //     }
      //     outputDiv.appendChild(last)
      //   }
    }
  },
  data() {
    return {
      md: new MarkdownIt(),
      html: null
    }
  },
  created() {
    this.md.use(customTagPlugin)
  }
}
</script>

<style scoped></style>
