<template>
  <div>
    <div id="pdf-container"></div>
    <div v-html="formattedText"></div>
  </div>
</template>

<script>
const pdfjsLib = require("pdfjs-dist");
pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

export default {
  name: "vue-pdf",
  data() {
    return {
      url: "",
      formattedText: "",
    };
  },
  created() {
    const url =
      //   "http://192.168.99.14:7076/policy_rule_old/files/upload/document/1693464611167.pdf";
      "http://192.168.99.14:7076/policy_rule_old/files/upload/document/1693474075320.pdf";
    this.url = url;
  },
  mounted() {
    console.log("pdfjsLib", pdfjsLib);
    const container = document.getElementById("pdf-container");
    pdfjsLib.getDocument(this.url).promise.then((pdfDocument) => {
      for (
        let pageNumber = 1;
        pageNumber <= pdfDocument.numPages;
        pageNumber++
      ) {
        pdfDocument.getPage(pageNumber).then((page) => {
          const canvas = document.createElement("canvas");
          container.appendChild(canvas);

          const viewport = page.getViewport({ scale: 1.5 });
          //   page.getTextContent().then((textContent) => {
          //     const textItems = textContent.items;
          //     console.log("textItems", textItems);
          //     // let pageHtml = "";
          //     // for (const item of textItems) {
          //     //   const text = item.str;
          //     //   const highlightedText = text.replace(/年/g, () => {
          //     //     console.log("替换");
          //     //     return '<span style="color: red;">部分需要高亮的文本</span>';
          //     //   });
          //     //   pageHtml += highlightedText + " ";
          //     // }
          //   });

          // 后续操作
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const context = canvas.getContext("2d");
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          console.log("viewport", viewport);
          page.render(renderContext);
        });
      }
    });
  },
  methods: {},
};
</script>
