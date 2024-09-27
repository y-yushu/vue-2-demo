<template>
  <div class="markdown-typewriter" ref="container">
    <div v-for="(chunk, index) in chunks" :key="index" v-html="chunk" style="display: inline-block"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'MarkdownTypewriter',
  props: {
    content: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      md: new MarkdownIt(),
      chunks: [],
      fullContent: '',
      currentIndex: 0,
      isTyping: false
    }
  },
  mounted() {
    this.startTyping()
  },
  methods: {
    startTyping() {
      this.fullContent = this.md.render(this.content)
      this.isTyping = true
      this.typeNextChar()
    },
    typeNextChar() {
      if (this.currentIndex < this.fullContent.length && this.isTyping) {
        let char = this.fullContent.charAt(this.currentIndex)
        let chunkToAdd = char

        // Handle HTML tags
        if (char === '<') {
          const closingIndex = this.fullContent.indexOf('>', this.currentIndex)
          if (closingIndex !== -1) {
            chunkToAdd = this.fullContent.substring(this.currentIndex, closingIndex + 1)
            this.currentIndex = closingIndex
          }
        }

        this.chunks.push(chunkToAdd)
        this.currentIndex++

        // Scroll to bottom
        this.$nextTick(() => {
          if (this.$refs.container) {
            this.$refs.container.scrollTop = this.$refs.container.scrollHeight
          }
        })

        setTimeout(this.typeNextChar, this.speed)
      } else {
        this.isTyping = false
      }
    }
  }
}
</script>

<style scoped>
.markdown-typewriter {
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 500px;
  overflow-y: auto;
}
</style>
