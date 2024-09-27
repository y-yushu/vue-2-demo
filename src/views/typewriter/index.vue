<template>
  <div>
    <markdown-typewriter :content="markdownContent" :speed="50" />
  </div>
</template>

<script>
import MarkdownTypewriter from './MarkdownTypewriter.vue'

const mock = `# 台湾海峡概览
## 引言
> 台湾海峡，作为中国东部沿海的重要水域，自古以来便是连接大陆与台湾的文化与经济桥梁，其战略地位不可小觑。
## 地理位置
- **位置**：位于中国福建省与台湾岛之间，东临东海，西濒南海。
- **长度**：全长约370公里。
- **宽度**：平均宽度约200公里，最窄处仅约130公里。
## 重要性
### 战略意义
1. **军事要地**：作为连接两大海域的咽喉，具有重要的军事战略价值。
2. **国际航道**：是远东地区重要的国际航道之一，对国际贸易和航运具有重要影响。
### 经济作用
- **渔业资源丰富**：海峡内海洋生物种类繁多，是周边渔民的重要渔场。
- **航运枢纽**：连接两岸及东亚各国的海上交通要道，促进区域经济发展。
## 自然环境
- **气候**：受季风影响，夏季多台风，冬季则相对温和。
- **海底地形**：复杂多变，既有浅滩也有深沟，对航行有一定影响。
## 结语
台湾海峡不仅是自然地理上的重要分界，更是连接两岸人民情感与文化的纽带。随着两岸关系的不断发展，其战略与经济价值将进一步凸显。`

export default {
  name: 'TypewriterPage',
  components: {
    MarkdownTypewriter
  },
  data() {
    return {
      markdownContent: mock
    }
  }
}
</script>
