// 留份

let defaultRender = null
const Contents = {}
export default function flexibleCustomTagsPlugin(md) {
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
