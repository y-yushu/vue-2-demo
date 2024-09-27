<template>
  <div>
    <h1>打字机效果展示</h1>
    <button @click="startTyping">开始打字</button>
    <button @click="stopTyping">停止打字</button>
    <!-- 使用 ref 引用 -->
    <div ref="output" style="word-break: normal; word-wrap: break-word"></div>
  </div>
</template>

<script>
const chats = [
  '汉',
  '字',
  '的',
  '随',
  '机',
  '示',
  '例',
  '一',
  '些',
  '常',
  '见',
  '字',
  '符',
  '组',
  '合',
  '而',
  '成',
  '的',
  '数',
  '组',
  '这',
  '里',
  '包',
  '含',
  '了',
  '多',
  '个',
  '不',
  '同',
  '的',
  '汉',
  '字',
  '用',
  '于',
  '演',
  '示',
  '目',
  '的',
  '以',
  '及',
  '展',
  '示',
  '如',
  '何',
  '将',
  '它',
  '们',
  '组',
  '织',
  '成',
  '一',
  '个',
  '有',
  '效',
  '的',
  '数',
  '组',
  '形',
  '式',
  '在',
  'JSON',
  '中',
  '进',
  '行',
  '存',
  '储',
  '和',
  '传',
  '输',
  '。',
  '每',
  '个',
  '汉',
  '字',
  '都',
  '是',
  '中',
  '文',
  '的',
  '一',
  '部',
  '分',
  '，',
  '共',
  '同',
  '构',
  '建',
  '了',
  '丰',
  '富',
  '多',
  '彩',
  '的',
  '语',
  '言',
  '世',
  '界'
]

const getChat = () => {
  const len = chats.length
  const ind = Math.floor(Math.random() * len)
  return chats[ind]
}

export default {
  name: 'TypewriterPage',
  data() {
    return {
      timer: null
    }
  },
  methods: {
    startTyping() {
      this.$refs.output.innerHTML = '' // 清空显示文本
      this.timer = setInterval(() => {
        const textNode = document.createTextNode(getChat()) // 创建文本节点
        this.$refs.output.appendChild(textNode) // 将文本节点添加到输出容器
      }, 100)
    },
    stopTyping() {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
