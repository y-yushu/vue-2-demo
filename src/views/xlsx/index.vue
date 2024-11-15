<template>
  <div class="xlsx-box">
    <button @click="test">测试</button>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'XlsxPage',
  data() {
    return {}
  },
  methods: {
    test() {
      console.log('开始测试')
      // 假设你有一个 input 元素用于上传文件
      const fileInput = document.createElement('input')
      fileInput.type = 'file'
      fileInput.addEventListener('change', handleFile, false)

      function handleFile(event) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          // 假设我们读取第一个 sheet
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          // 将 sheet 转换为 JSON 格式
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          console.log(jsonData)
          jsonData.splice(0, 1)
          downloadJsonFile(jsonData, 'excelData.json')
        }

        reader.readAsArrayBuffer(file)
      }

      fileInput.click()
    }
  }
}

function downloadJsonFile(data, filename = 'data.json') {
  const jsonString = JSON.stringify(data)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url) // 释放 URL
}
</script>

<style scoped>
.xlsx-box {
  padding: 2rem;
}
button {
  margin-right: 1rem;
}
</style>
