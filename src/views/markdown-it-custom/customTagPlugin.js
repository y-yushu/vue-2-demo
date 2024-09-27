// flexibleCustomTagsPlugin.js
// import HiswEcharts from './plug-in/hisw-echarts'
export default function flexibleCustomTagsPlugin(md) {
  md.block.ruler.before('paragraph', 'comment_block', function (state, startLine, endLine, silent) {
    const commentStart = '<!--'
    const commentEnd = '-->'

    const startMarker = state.src.indexOf(commentStart, state.bMarks[startLine])
    const endMarker = state.src.indexOf(commentEnd, startMarker)
    
    if (startMarker !== -1 && endMarker !== -1) {
        console.log('startMarker', startMarker)
        console.log('endMarker', endMarker)
      if (silent) return true

      const content = state.src.slice(startMarker + commentStart.length, endMarker).trim()

      const token = state.push('comment_block', 'aside', 0)
      token.content = content
      token.markup = 'comment'

      state.line = endLine
      return true
    }
    return false
  })

  md.renderer.rules.comment_block = function (tokens, idx) {
    return `<aside class="comment-block">${tokens[idx].content}</aside>`
  }
}
