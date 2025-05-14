<template>
  <div>
    <h1>自定义渲染</h1>
    <div class="grid">
      <div>
        <div v-html="html"></div>
      </div>
      <div>
        <MdRender :content="markdown" />
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import MdRender from '@/components/MdRender/MdRender.vue'
// import { mock } from './mock.js'

const md = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: true
})

export default {
  name: 'MarkdownIt2',
  components: { MdRender },
  data() {
    return {
      html: '',
      markdown: ''
    }
  },
  created() {
    fetch('https://lg-test.3xmt.com/test-api/search/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['1914988716162678786'])
    })
      .then(response => response.json())
      .then(res => {
        console.log('data', res)
        const allTxt = res.data[0].chunks
          .sort((a, b) => a.id - b.id)
          .map(e => e.text)
          .join('')
        console.log('allTxt', allTxt)
        const _html = md.render(allTxt)
        this.html = _html

        this.markdown = allTxt
      })
  },
  methods: {}
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
