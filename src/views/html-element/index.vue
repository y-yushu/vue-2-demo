<template>
  <div style="padding: 50px">
    <button @click="test1">测试1</button>
    <div id="tttt2"></div>
    <div class="custom-select-span">
      <input />
      <ul class="custom-dropdown-list">
        <li class="custom-dropdown-item">选项 1</li>
        <li class="custom-dropdown-item">选项 2</li>
        <li class="custom-dropdown-item">选项 3</li>
      </ul>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

const markdownToHtml = markdown => {
  const md = new MarkdownIt()

  // 自定义规则处理行内标签
  md.inline.ruler.push('custom-textarea', (state, silent) => {
    // 如果当前不是处理中，则返回 false
    if (state.src[state.pos] !== '<') return false

    // 匹配你的自定义行内标签
    const match = state.src.slice(state.pos).match(/^<custom-textarea>(.*?)<\/custom-textarea>/)
    if (!match) return false

    // 如果是 silent 模式，则不需要解析，直接返回 true
    if (silent) return true

    // 更新解析状态的位置 pos
    state.pos += match[0].length

    const obj = JSON.parse(match[1])

    // 将匹配到的内容替换为 HTML 标签
    const token = state.push('html_inline', '', 0)
    token.content = `<textarea id="${obj.id}" class="custom-textarea"></textarea>`

    return true
  })

  const result = md.render(markdown)
  return result
}

export default {
  name: 'HtmlElement',
  data() {
    return {}
  },
  mounted() {
    console.log('123123123')
    document.addEventListener('click', function (event) {
      const target = event.target
      console.log('target', target)
      if (target.classList.contains('acc')) {
        // 在这里执行你想要触发的方法
        console.log('Input with class "acc" got focus!')
      }
    })
  },
  methods: {
    test1() {
      const fff = document.createElement('div')
      const dom = document.createElement('textarea')
      fff.appendChild(dom)

      const tttt2 = document.getElementById('tttt2')
      tttt2.innerHTML = fff.outerHTML

      const mock = '<custom-textarea>{"titlte":"你好"}</custom-textarea>'
      const html = markdownToHtml(mock)
      console.log('html', html)
    }
  }
}
</script>

<style lang="less" scoped>
.custom-select-span {
  position: relative;
}
.custom-dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  height: 200px;
  width: 200px;
  display: none;
}
.custom-select-span:focus-within .custom-dropdown-list {
  display: block;
}
</style>
