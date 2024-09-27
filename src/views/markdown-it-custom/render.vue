<template>
  <div ref="markdownContainer"></div>
</template>

<script>
import { DiffDOM } from 'diff-dom'
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
    value(newVal) {
      this.updateContent(newVal)
    }
  },
  data() {
    return {
      md: new MarkdownIt(),
      lastRenderedContent: []
    }
  },
  created() {
    this.md.use(customTagPlugin)
  },
  methods: {
    updateContent(newVal) {
      const newContent = this.md.render(newVal)
      this.$nextTick(() => {
        this.updateDOM(newContent)
      })
    },
    updateDOM(newContent) {
      const dd = new DiffDOM()
      const container = this.$refs.markdownContainer
      const html2 = document.createElement('div')
      html2.innerHTML = newContent
      const len2 = html2.children.length
      // 包装内容以确保单一根节点
      const wrapContent = content => `<div>${content?.outerHTML || ''}</div>`
      for (let i = 0; i < len2; i++) {
        if (!container.children[i]) {
          if (html2.children[i]) {
            container.appendChild(html2.children[i])
          }
        } else {
          const diff = dd.diff(wrapContent(container.children[i]), wrapContent(html2.children[i]))
          if (diff.length) {
            if (container.children[i]) {
              container.replaceChild(html2.children[i], container.children[i])
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
