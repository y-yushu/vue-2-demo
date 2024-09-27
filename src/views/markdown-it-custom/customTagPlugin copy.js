// flexibleCustomTagsPlugin.js
import HiswEcharts from './plug-in/hisw-echarts'

let defaultRender = null
const Contents = {}

export default function flexibleCustomTagsPlugin(md) {
  // 定义标签配置
  const tags = {
    custom: {
      start: '@hisw_echarts_start',
      end: '@hisw_echarts_end',
      render: content => {
        // 尝试获取已注册的自定义元素
        const hiswEcharts = customElements.get('hisw-echarts')
        if (!hiswEcharts) {
          console.log('注册组件', 'hisw-echarts')
          customElements.define('hisw-echarts', HiswEcharts)
        }
        return `<hisw-echarts class="custom-tag">${content}</hisw-echarts>`
      }
    },
    note: {
      start: '@hisw_map_start',
      end: '@hisw_map_end',
      render: content => `<div class="note-tag"><strong>Note:</strong>${content}</div>`
    }
  }

  function customTagRule(state, silent) {
    const start = state.pos
    // const max = state.posMax

    // 检查是否匹配任何开始标记
    for (const [tagName, tagConfig] of Object.entries(tags)) {
      if (state.src.startsWith(tagConfig.start, start)) {
        const startMarker = tagConfig.start
        const endMarker = tagConfig.end

        // 查找结束标记
        let contentStart = start + startMarker.length
        let contentEnd = state.src.indexOf(endMarker, contentStart)

        if (contentEnd === -1) {
          return false // 没有找到结束标记
        }

        if (!silent) {
          let content = state.src.slice(contentStart, contentEnd)
          let params = ''

          // 检查是否有参数（仅针对代码块）
          if (tagName === 'code' && content.startsWith('\n')) {
            const firstLineEnd = content.indexOf('\n', 1)
            if (firstLineEnd !== -1) {
              params = content.slice(1, firstLineEnd).trim()
              content = content.slice(firstLineEnd + 1)
            }
          }

          content = content.trim()

          let token = state.push('custom_tag', '', 0)
          token.info = params
          token.content = content
          token.meta = { tagName }
        }

        state.pos = contentEnd + endMarker.length
        return true
      }
    }

    return false
  }

  md.inline.ruler.push('custom_tag', customTagRule)

  // 渲染自定义标签
  md.renderer.rules.custom_tag = function (tokens, idx) {
    const token = tokens[idx]
    const { tagName } = token.meta
    const renderFn = tags[tagName].render
    return renderFn(token.content, token.info)
  }

  // 保留默认渲染
  if (!defaultRender) defaultRender = md.renderer.rules.fence
  // 添加自定义围栏代码块的渲染规则
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info === 'mermaid' || token.info === 'svg' || token.info === 'mindmap') {
      const html = defaultRender(tokens, idx, options, env, self)
      const uid = Math.random()
      Contents[uid] = token.content
      return `<div>
            ${html}
            <div class="drawing-line">
              <i class="drawing-button el-icon-view" data-type="${token.info}" data-content="${uid}"></i>
            </div>
          </div>`
    } else {
      return defaultRender(tokens, idx, options, env, self)
    }
  }
}
