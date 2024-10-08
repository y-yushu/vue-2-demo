// flexibleCustomTagsPlugin.js
// 正则解析插件
import HiswEcharts from './plug-in/hisw-echarts'
// code解析插件
import HiswMermaid from './plug-in/hisw-mermaid'

let defaultRender = null

export default function flexibleCustomTagsPlugin(md) {
  const customTags = {
    echarts: {
      start: '@hisw_echarts_start',
      end: '@hisw_echarts_end',
      render: content => {
        // 尝试获取已注册的自定义元素
        const hiswEcharts = customElements.get('hisw-echarts')
        if (!hiswEcharts) {
          console.log('注册组件', 'hisw-echarts')
          customElements.define('hisw-echarts', HiswEcharts)
        }
        return `<hisw-echarts data="${content}"></hisw-echarts>`
      }
    },
    map: {
      start: '@hisw_map_start',
      end: '@hisw_map_end',
      render: content => `<div class="note-tag"><strong>Note:</strong>${content}</div>`
    }
  }

  const customTagRule = (state, startLine, endLine, silent) => {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // 检查是否匹配任何自定义标签的开始标记
    let matchedTag = null
    let startTag = ''
    for (const [tagName, tagConfig] of Object.entries(customTags)) {
      if (state.src.slice(pos, pos + tagConfig.start.length) === tagConfig.start) {
        matchedTag = tagConfig
        startTag = tagName
        break
      }
    }

    if (!matchedTag) {
      return false
    }

    let line = startLine
    let content = ''

    // 查找结束标记
    while (line < endLine) {
      pos = state.bMarks[line] + state.tShift[line]
      max = state.eMarks[line]

      if (line > startLine) {
        content += '\n'
      }

      let lineContent = state.src.slice(pos, max)
      let endPos = lineContent.indexOf(matchedTag.end)

      if (endPos !== -1) {
        content += lineContent.slice(0, endPos)

        if (!silent) {
          let token = state.push(`custom_${startTag}`, 'div', 0)
          token.markup = `custom_${startTag}`
          token.content = content.slice(matchedTag.start.length).trim() // 移除开始标记
          token.map = [startLine, line + 1]
          token.info = startTag // 存储标签名称以供渲染使用
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

  md.block.ruler.before('fence', 'custom_tags', customTagRule, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })

  md.renderer.rules.custom_tags = (tokens, idx) => {
    const token = tokens[idx]
    const tagConfig = customTags[token.info]
    if (tagConfig && typeof tagConfig.render === 'function') {
      return tagConfig.render(md.utils.escapeHtml(token.content))
    }
    return md.utils.escapeHtml(token.content)
  }

  // 为每个自定义标签添加渲染规则
  Object.keys(customTags).forEach(tagName => {
    md.renderer.rules[`custom_${tagName}`] = (tokens, idx) => {
      const token = tokens[idx]
      const tagConfig = customTags[tagName]
      if (typeof tagConfig.render === 'function') {
        return tagConfig.render(md.utils.escapeHtml(token.content))
      }
      // 如果没有找到对应的渲染函数，返回原始内容
      return md.utils.escapeHtml(token.content)
    }
  })

  // 保留默认渲染
  if (!defaultRender) defaultRender = md.renderer.rules.fence
  // 添加自定义围栏代码块的渲染规则
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (['mermaid', 'svg', 'mindmap'].includes(token.info)) {
      const name = 'hisw-' + token.info
      // 正常渲染的元素
      const children = defaultRender(tokens, idx, options, env, self)
      // 尝试获取已注册的自定义元素
      const hiswComponent = customElements.get(name)
      if (!hiswComponent) {
        console.log('注册组件', name)
        if (token.info === 'mermaid') {
          customElements.define(name, HiswMermaid)
        }
      }
      return `<${name} markdown="${encodeURIComponent(token.content)}">${children}</${name}>`
    } else {
      return defaultRender(tokens, idx, options, env, self)
    }
  }
}
