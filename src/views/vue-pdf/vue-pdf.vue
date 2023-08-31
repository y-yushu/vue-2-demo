<template>
    <div>
      <pdf :src="url" ref="pdfViewer" @page-loaded="pageRendered"></pdf>
    </div>
  </template>
  
  <script>
  import pdf from "vue-pdf";
  
  export default {
    name: "vue-pdf",
    components: { pdf },
    data() {
      return {
        url: "",
      };
    },
    created() {
      const url =
        "http://192.168.99.14:7076/policy_rule_old/files/upload/document/1693464611167.pdf";
      this.url = url;
    },
    mounted() {
      // const pdfViewer = this.$refs.pdfViewer;
      // console.log("pdfViewer", pdfViewer);
      // const pdfDocument = pdfViewer.pdfDocument;
      // console.log("pdfDocument", pdfDocument);
      // pdfDocument.promise.then(() => {
      //   this.highlightText(pdfDocument);
      // });
    },
    methods: {
      highlightText(pdfDocument) {
        // 通过循环页面获取文本内容
        for (
          let pageNumber = 1;
          pageNumber <= pdfDocument.numPages;
          pageNumber++
        ) {
          pdfDocument.getPage(pageNumber).then((page) => {
            page.getTextContent().then(() => {
              const canvas = this.$refs.pdfViewer.$refs[`pdf-page-${pageNumber}`];
              const context = canvas.getContext("2d");
              console.log(context);
            });
          });
        }
      },
      pageRendered(e) {
        console.log("e", e);
      },
    },
  };
  </script>
  