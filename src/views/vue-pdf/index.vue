<template>
  <div>
    <div id="pdf-container"></div>
    <div v-html="formattedText"></div>
  </div>
</template>

<script>
const pdfjsLib = require('pdfjs-dist')
pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')

export default {
  name: 'vue-pdf',
  data() {
    return {
      url: '',
      formattedText: ''
    }
  },
  created() {
    const url =
      //   "http://192.168.99.14:7076/policy_rule_old/files/upload/document/1693464611167.pdf";
      // "http://192.168.99.14:7076/policy_rule_old/files/upload/document/1693474075320.pdf";
      'http://127.0.0.1:8080/static/pdf/t2024.pdf'
    this.url = url
  },
  mounted() {
    // const container = document.getElementById("pdf-container");
    let textContent = ''
    pdfjsLib.getDocument(this.url).promise.then(pdfDocument => {
      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        pdfDocument.getPage(pageNum).then(page => {
          const pageText = page.getTextContent()
          pageText
            .then(text => {
              console.log('text', text)
              textContent += text.items.map(item => item.str).join(' ')
            })
            .then(() => {
              console.log('textContent', textContent)
              this.formattedText = textContent
            })
        })
      }
    })
  },
  methods: {}
}
</script>
