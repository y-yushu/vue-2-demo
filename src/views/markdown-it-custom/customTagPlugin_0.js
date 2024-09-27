// flexibleCustomTagsPlugin.js
// import HiswEcharts from './plug-in/hisw-echarts'
export default function flexibleCustomTagsPlugin(md) {
  const customCommentRule = (state, startLine, endLine, silent) => {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // 检查是否以 '<!--' 开始
    if (state.src.slice(pos, pos + 4) !== '<!--') {
      return false
    }

    let line = startLine
    let content = ''

    // 查找结束标记 '-->'
    while (line < endLine) {
      pos = state.bMarks[line] + state.tShift[line]
      max = state.eMarks[line]

      if (line > startLine) {
        content += '\n'
      }

      let lineContent = state.src.slice(pos, max)
      let endPos = lineContent.indexOf('-->')

      if (endPos !== -1) {
        content += lineContent.slice(0, endPos)

        if (!silent) {
          let token = state.push('custom_comment', 'div', 0)
          token.markup = 'custom_comment'
          token.content = content.slice(4).trim() // 移除开始的 '<!--'
          token.map = [startLine, line + 1]
        }

        state.line = line + 1
        return true
      }

      content += lineContent
      line++
    }

    // 如果没有找到结束标记，返回 false
    return false
  }

  md.block.ruler.before('fence', 'custom_comment', customCommentRule, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })

  md.renderer.rules.custom_comment = (tokens, idx) => {
    return `<div class="custom-comment">${md.utils.escapeHtml(tokens[idx].content)}</div>`
  }
}
