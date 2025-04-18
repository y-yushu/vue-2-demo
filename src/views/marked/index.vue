<template>
  <div class="page">
    <h2>Marked解析</h2>
    <div>
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'

const mock = `**国家层面**  \n1. **权益保障与公平待遇**：国家保障外商投资企业依法平等适用支持政策，参与政府采购、标准制定等活动，严禁行业壁垒和地方保护[[1]](https://test-pctapp.3xmt.com/detail/1900799531931537408?index=31)。修订《外商投资企业投诉工作办法》，建立跨部门协调机制解决外资企业诉求[[2]](https://test-pctapp.3xmt.com/detail/1900810173766438912?index=27)。  \n2. **产业支持与再投资优惠**：鼓励外资投向高新技术、绿色产业等领域，对利润再投资人工智能、生物医药等关键领域的企业提供融资支持，并纳入地方重大项目保障土地、能源等要素[专栏2]。  \n3. **区域开放合作**：支持与共建“一带一路”国家投资合作，引导外资参与区域全面经济伙伴关系协定（RCEP）框架下的农业、跨境电商等领域合作[[1]](https://test-pctapp.3xmt.com/detail/1900799531931537408?index=15)。  \n\n**上海市层面**  \n1. **税收与财政奖励**：落实境外投资者利润再投资暂不征收预提所得税政策，各区可按经济贡献度给予外资企业奖励[[3]](https://test-pctapp.3xmt.com/detail/1906519738394873856?index=11)[[4]](https://test-pctapp.3xmt.com/detail/1906519553627394048?index=12)。对符合产业导向的外资项目优先供应土地，并免征进口设备关税[[3]](https://test-pctapp.3xmt.com/detail/1906519738394873856?index=5)[[4]](https://test-pctapp.3xmt.com/detail/1906519553627394048?index=5)。  \n2. **服务业开放试点**：在浦东试点基因治疗药品临床试验、增值电信业务开放等，推动金融、生物医药等领域扩大开放[[5]](https://test-pctapp.3xmt.com/detail/1900798784980520960?index=3)。  \n3. **便利化服务**：建立外商投资标准化协作平台，优化外籍人员工作居留“单一窗口”服务，推广“五星卡”在沪应用场景[[5]](https://test-pctapp.3xmt.com/detail/1900798784980520960?index=8)[[6]](https://test-pctapp.3xmt.com/detail/1906518201815797760?index=16)。  \n\n**浦东新区层面**  \n1. **专项产业支持**：对存量外资企业实缴资金超1000万美元的按1%给予资助（上限1000万元）；新认定的外资研发中心、跨国公司地区总部分别资助300万元、600万元[[7]](https://test-pctapp.3xmt.com/detail/1906519702772649984?index=3)[[8]](https://test-pctapp.3xmt.com/detail/1906519501953568768?index=2)。  \n2. **营商环境创新**：试点生物医药全产业链优化方案，拓展数字人民币应用，允许涉外商事纠纷自主约定仲裁规则[[6]](https://test-pctapp.3xmt.com/detail/1906518201815797760?index=24)[[9]](https://test-pctapp.3xmt.com/detail/1906519503828422656?index=24)。实施市场准营承诺即入制，信用评价结果挂钩政策扶持[[10]](https://test-pctapp.3xmt.com/detail/1906518202574966784?index=2)。  \n3. **全球营运计划（GOP）**：对符合条件的跨国地区总部给予最高500万元开办资助、1000万元租房补贴，并配套离岸贸易、境外投资奖励[[11]](https://test-pctapp.3xmt.com/detail/1900800858921242624?index=0)。  \n4. **人才与通关便利**：为重点产业外籍人才提供签证、永居便利；优化高新技术产品通关效率，支持保税维修业务[[12]](https://test-pctapp.3xmt.com/detail/1904162073484201984?index=1)[[13]](https://test-pctapp.3xmt.com/detail/1906519466364899328?index=39)。  \n\n（注：各层级政策具体执行以最新官方文件为准。） `

export default {
  name: 'MarkedPage',
  data() {
    return {
      html: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 禁用URL自动检测
      const tokenizer = new marked.Tokenizer()
      tokenizer.url = function () {
        return false
      }
      marked.setOptions({ tokenizer })

      // 渲染Markdown为HTML
      const html1 = marked(mock)

      // 后处理HTML，添加原始序号
      this.html = this.processHTMLWithOriginalNumbers(html1)
    },

    // 根据层级获取无序列表符号
    getUnorderedListBullet(level) {
      // 定义不同层级的无序列表符号
      const bullets = ['★', '◆', '●', '○']

      // 层级从0开始，所以需要减1，同时确保不超过数组范围
      const index = Math.min(level - 1, bullets.length - 1)
      return bullets[Math.max(0, index)] // 确保索引不小于0
    },

    // 检查是否是指定标签的开始 - 使用更高效的方式
    isTagStart(html, pos, tagName) {
      // 如果剩余字符数不足，直接返回false
      if (pos + tagName.length + 1 > html.length) return false

      // 检查"<标签名"
      if (html.charAt(pos) !== '<') return false

      // 避免逐字符比较，直接比较子字符串
      if (html.substring(pos + 1, pos + tagName.length + 1) !== tagName) return false

      // 检查后面的字符
      const nextChar = html.charAt(pos + tagName.length + 1)
      return nextChar === ' ' || nextChar === '>' || nextChar === '/' || nextChar === '\t' || nextChar === '\n' || nextChar === '\r'
    },

    // 查找标签的结束位置 - 优化实现
    findTagEnd(html, startPos) {
      let i = startPos
      let inQuote = false
      let quoteChar = ''
      const htmlLength = html.length

      while (i < htmlLength) {
        const char = html.charAt(i)

        if (!inQuote) {
          if (char === '>') {
            return i
          } else if (char === '"' || char === "'") {
            inQuote = true
            quoteChar = char
          }
        } else if (char === quoteChar) {
          inQuote = false
        }

        i++
      }

      return -1 // 没有找到标签结束
    },

    // 解析标签属性 - 缓存正则表达式和优化实现
    parseTagAttributes(html, startPos, endPos) {
      const tagContent = html.substring(startPos, endPos + 1)
      const attributesMatch = tagContent.match(/\s+([^>]+)/)

      if (!attributesMatch) {
        return {}
      }

      const attributesStr = attributesMatch[1]
      const attributes = {}

      // 解析各种属性 - 使用静态正则表达式避免重复创建
      const attrRegex = /(\w+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]*))|)/g
      let match

      while ((match = attrRegex.exec(attributesStr)) !== null) {
        const name = match[1]
        const value = match[2] || match[3] || match[4] || ''
        attributes[name] = value
      }

      return attributes
    },

    // 处理HTML，添加原始序号 - 优化性能
    processHTMLWithOriginalNumbers(html) {
      let result = ''
      let i = 0
      const htmlLength = html.length
      let contextStack = [] // 用于跟踪当前是在哪种列表环境中
      let olItemCounter = {} // 用于跟踪每层ol的当前项计数
      let indentationLevel = 0 // 当前缩进级别
      let ulNestLevel = 0 // 无序列表嵌套级别

      // 缓存常用的子字符串比较结果
      const olEndTag = '</ol>'
      const ulEndTag = '</ul>'
      const liEndTag = '</li>'
      const pStartTag = '<p>'
      const pEndTag = '</p>'

      // 使用常量存储常用字符串，避免字符串拼接的开销
      const CUSTOM_OL_CLASS = 'custom-ol'
      const CUSTOM_UL_CLASS = 'custom-ul'
      const SPAN_START_OL = '<span class="original-number">'
      const SPAN_START_UL = '<span class="custom-bullet level-'
      const SPAN_MID_UL = '">'
      const SPAN_END = '</span>'

      while (i < htmlLength) {
        // 检查ol开始标签
        if (this.isTagStart(html, i, 'ol')) {
          const tagEndPos = this.findTagEnd(html, i)
          if (tagEndPos === -1) {
            result += html.charAt(i)
            i++
            continue
          }

          // 记录新的缩进级别
          indentationLevel++

          // 解析ol标签的属性
          const tagAttributes = this.parseTagAttributes(html, i, tagEndPos)
          const olId = 'ol_' + indentationLevel + '_' + contextStack.length
          let startValue = parseInt(tagAttributes.start) || 1

          // 添加到环境栈
          contextStack.push({
            type: 'ol',
            id: olId,
            start: startValue,
            level: indentationLevel
          })
          olItemCounter[olId] = 0

          // 保留原始属性，但添加自定义类
          let classAttr = `class="${CUSTOM_OL_CLASS}"`
          if (tagAttributes.class) {
            classAttr = `class="${tagAttributes.class} ${CUSTOM_OL_CLASS}"`
          }

          // 重建ol标签，但忽略start属性
          let olTag = '<ol ' + classAttr
          for (const key in tagAttributes) {
            if (key !== 'class' && key !== 'start') {
              olTag += ` ${key}="${tagAttributes[key]}"`
            }
          }
          olTag += '>'

          result += olTag
          i = tagEndPos + 1
        }
        // 检查ol结束标签
        else if (html.substring(i, i + olEndTag.length) === olEndTag) {
          if (contextStack.length > 0 && contextStack[contextStack.length - 1].type === 'ol') {
            // 减少缩进级别
            if (indentationLevel > 0) indentationLevel--
            contextStack.pop()
          }
          result += olEndTag
          i += olEndTag.length
        }
        // 检查ul开始标签
        else if (this.isTagStart(html, i, 'ul')) {
          const tagEndPos = this.findTagEnd(html, i)
          if (tagEndPos === -1) {
            result += html.charAt(i)
            i++
            continue
          }

          // 增加无序列表嵌套级别
          ulNestLevel++

          // 记录新的缩进级别
          indentationLevel++

          // 添加自定义类和级别类到ul标签
          const tagAttributes = this.parseTagAttributes(html, i, tagEndPos)
          let classAttr = `class="${CUSTOM_UL_CLASS} ul-level-${ulNestLevel}"`
          if (tagAttributes.class) {
            classAttr = `class="${tagAttributes.class} ${CUSTOM_UL_CLASS} ul-level-${ulNestLevel}"`
          }

          // 重建ul标签
          let ulTag = '<ul ' + classAttr
          for (const key in tagAttributes) {
            if (key !== 'class') {
              ulTag += ` ${key}="${tagAttributes[key]}"`
            }
          }
          ulTag += '>'

          contextStack.push({
            type: 'ul',
            id: 'ul_' + indentationLevel + '_' + contextStack.length,
            level: indentationLevel,
            ulLevel: ulNestLevel
          })

          result += ulTag
          i = tagEndPos + 1
        }
        // 检查ul结束标签
        else if (html.substring(i, i + ulEndTag.length) === ulEndTag) {
          if (contextStack.length > 0 && contextStack[contextStack.length - 1].type === 'ul') {
            // 减少无序列表嵌套级别
            ulNestLevel--

            // 减少缩进级别
            if (indentationLevel > 0) indentationLevel--
            contextStack.pop()
          }
          result += ulEndTag
          i += ulEndTag.length
        }
        // 检查li开始标签
        else if (this.isTagStart(html, i, 'li')) {
          const tagEndPos = this.findTagEnd(html, i)
          if (tagEndPos === -1) {
            result += html.charAt(i)
            i++
            continue
          }

          const tagContent = html.substring(i, tagEndPos + 1)

          if (contextStack.length > 0) {
            const currentContext = contextStack[contextStack.length - 1]

            // 添加li标签，不带自定义内容，保存当前位置以检查后续内容
            result += tagContent
            i = tagEndPos + 1

            // 查找li标签后的内容，检查是否有紧接着的<p>标签
            let nextNonWhitespace = i
            // 跳过空白字符
            while (
              nextNonWhitespace < htmlLength &&
              (html.charAt(nextNonWhitespace) === ' ' ||
                html.charAt(nextNonWhitespace) === '\n' ||
                html.charAt(nextNonWhitespace) === '\t' ||
                html.charAt(nextNonWhitespace) === '\r')
            ) {
              nextNonWhitespace++
            }

            // 检查是否是<p>标签
            const hasParagraph = this.isTagStart(html, nextNonWhitespace, 'p')

            if (currentContext.type === 'ol') {
              // 在有序列表中
              olItemCounter[currentContext.id]++
              const itemPosition = olItemCounter[currentContext.id] + currentContext.start - 1
              const originalNumber = itemPosition

              // 添加序号并处理<p>标签情况
              if (hasParagraph) {
                // 跳过<p>标签，直接在<p>内部开头添加序号
                const pTagEndPos = this.findTagEnd(html, nextNonWhitespace)
                if (pTagEndPos !== -1) {
                  // 添加<p>标签开始
                  result += pStartTag
                  // 添加序号
                  result += `${SPAN_START_OL}${originalNumber}. ${SPAN_END}`
                  // 移动到<p>标签后，继续处理<p>标签内的内容
                  i = pTagEndPos + 1
                }
              } else {
                // 没有<p>标签，正常添加序号
                result += `${SPAN_START_OL}${originalNumber}. ${SPAN_END}`
              }
            } else if (currentContext.type === 'ul') {
              // 在无序列表中，处理类似的情况
              const ulLevel = currentContext.ulLevel || 1
              const bullet = this.getUnorderedListBullet(ulLevel)

              if (hasParagraph) {
                // 跳过<p>标签，直接在<p>内部开头添加符号
                const pTagEndPos = this.findTagEnd(html, nextNonWhitespace)
                if (pTagEndPos !== -1) {
                  // 添加<p>标签开始
                  result += pStartTag
                  // 添加符号
                  result += `${SPAN_START_UL}${ulLevel}${SPAN_MID_UL}${bullet}${SPAN_END}`
                  // 移动到<p>标签后，继续处理<p>标签内的内容
                  i = pTagEndPos + 1
                }
              } else {
                // 没有<p>标签，正常添加符号
                result += `${SPAN_START_UL}${ulLevel}${SPAN_MID_UL}${bullet}${SPAN_END}`
              }
            }
          } else {
            // 不在任何列表中
            result += tagContent
            i = tagEndPos + 1
          }
        }
        // 检查li结束标签
        else if (html.substring(i, i + liEndTag.length) === liEndTag) {
          result += liEndTag
          i += liEndTag.length
        }
        // 跳过列表项内部的<p>标签（因为我们已经处理了）
        else if (contextStack.length > 0 && this.isTagStart(html, i, 'p') && i > 0 && html.substring(i - liEndTag.length, i) !== liEndTag) {
          // 如果在列表项内部且不是刚刚处理过li结束标签后的p标签，则跳过这个p标签开始
          // 因为我们已经在li处理部分自己添加了<p>标签
          const pTagEndPos = this.findTagEnd(html, i)
          if (pTagEndPos !== -1) {
            i = pTagEndPos + 1
          } else {
            // 如果找不到标签结束，就添加当前字符并向前移动
            result += html.charAt(i)
            i++
          }
        }
        // 检查p结束标签 - 在列表项内部的情况下需要保留
        else if (html.substring(i, i + pEndTag.length) === pEndTag && contextStack.length > 0) {
          result += pEndTag
          i += pEndTag.length
        }
        // 其他字符
        else {
          result += html.charAt(i)
          i++
        }
      }

      return result
    }
  }
}
</script>

<style scoped>
.page {
  padding: 2rem 4rem;
}

/* 有序列表的原始序号样式 */
::v-deep .original-number {
  color: red;
  margin-right: 0.5em;
}

/* 无序列表的自定义符号样式 - 基本样式 */
::v-deep .custom-bullet {
  margin-right: 0.5em;
}

/* 每个层级的无序列表符号不同颜色 */
::v-deep .custom-bullet.level-1 {
  color: #e91e63; /* 粉红色 - 一级 */
}

::v-deep .custom-bullet.level-2 {
  color: #2196f3; /* 蓝色 - 二级 */
}

::v-deep .custom-bullet.level-3 {
  color: #4caf50; /* 绿色 - 三级 */
}

::v-deep .custom-bullet.level-4 {
  color: #ff9800; /* 橙色 - 四级 */
}

::v-deep .custom-bullet.level-5 {
  color: #9c27b0; /* 紫色 - 五级及以上 */
}

/* 所有列表的通用样式 */
::v-deep ol,
::v-deep ul {
  padding-left: 20px;
}

/* 所有列表项去除默认样式 */
::v-deep li {
  /* list-style-type: none; */
}
</style>
