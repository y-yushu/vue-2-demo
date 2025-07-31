<template>
  <div class="box">
    <div id="map" @mousemove="handleMouseMove"></div>
    <!-- 节点信息提示框 -->
    <div ref="tooltip" class="node-tooltip" v-show="tooltipVisible" :style="tooltipStyle">
      <div class="tooltip-header">
        <strong>{{ tooltipData.topic }}</strong>
      </div>
      <div class="tooltip-body">
        <div><strong>节点ID:</strong> {{ tooltipData.id }}</div>
        <div><strong>子节点数:</strong> {{ tooltipData.childrenCount }}</div>
        <div v-if="tooltipData.tags && tooltipData.tags.length"><strong>标签:</strong> {{ tooltipData.tags.join(', ') }}</div>
        <div v-if="tooltipData.note"><strong>备注:</strong> {{ tooltipData.note }}</div>
      </div>
    </div>

    <div style="margin-top: 20px">
      <button @click="test1">测试1</button>
      <button @click="test2">测试2</button>
      <button @click="test3">测试3</button>
    </div>
  </div>
</template>

<script>
import MindElixir from 'mind-elixir'
import example from 'mind-elixir/example'

const mock = {
  id: 'root',
  topic: '中心主题',
  children: [
    {
      id: 'child1',
      topic: '子主题1',
      children: []
    },
    {
      id: 'child2',
      topic: '子主题2',
      children: []
    }
  ]
}

export default {
  name: 'MindElixir',
  data() {
    return {
      ME: null,
      // 提示框相关数据
      tooltipVisible: false,
      tooltipData: {},
      tooltipStyle: {
        left: '0px',
        top: '0px'
      },
      // 鼠标悬停相关
      hoverTimer: null,
      // 单击双击防抖处理
      clickTimer: null,
      clickCount: 0,
      lastClickedNode: null
    }
  },
  mounted() {
    this.initMindElixir()
    this.bindMindElixirEvents()
  },
  beforeDestroy() {
    // 清理定时器和事件监听
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer)
    }
    if (this.clickTimer) {
      clearTimeout(this.clickTimer)
    }
    // 移除事件监听
    if (this.ME && this.ME.bus) {
      this.ME.bus.removeListener('selectNode', this.handleNodeSelect)
      this.ME.bus.removeListener('editNode', this.handleNodeEdit)
    }
  },
  methods: {
    handleMouseMove(e) {
      // 检查是否存在 me-tpc 标签
      const hasMeTpc = e?.target?.querySelector('me-tpc') !== null
      if (!hasMeTpc) {
        console.log('找到了 me-tpc 标签')
      }
    },
    initMindElixir() {
      const generateMainBranch = ({ pT, pL, pW, pH, cT, cL, cW, cH, direction }) => {
        console.log('111', pT, pL, pW, pH)
        console.log('222', cT, cL, cW, cH)
        console.log('direction', direction)
        const x1 = pW
        const y1 = pT + pH / 2
        const c1 = pW + (cL - pW) / 2
        const c2 = cT + cH / 2
        return `M ${x1} ${y1} H ${c1} V ${c2} H ${cL}`
      }

      console.log('example', example)
      const theme = MindElixir.THEME
      theme.cssVar['--root-bgcolor'] = '#2499f2'
      theme.cssVar['--root-radius'] = '5px'
      theme.cssVar['--main-radius'] = '5px'
      theme.palette = ['#27f25a']

      this.ME = new MindElixir({
        el: '#map',
        locale: 'zh_CN',
        draggable: true,
        editable: true,
        contextMenu: true,
        toolBar: true,
        nodeMenu: true,
        keypress: true,
        generateMainBranch,
        // 自定义before钩子
        before: {
          // 插入节点前的钩子
          insertSibling: (el, obj) => {
            console.log('准备插入兄弟节点:', obj)
            return true
          },
          // 添加子节点前的钩子
          addChild: (el, obj) => {
            console.log('准备添加子节点:', obj)
            return true
          }
        }
      })

      this.ME.init({
        nodeData: mock,
        theme
      })

      // 初始化完成后绑定额外事件
      this.$nextTick(() => {
        this.bindAdditionalEvents()
      })
    },

    bindMindElixirEvents() {
      // 监听mind-elixir内部事件
      this.ME.bus.addListener('operation', operation => {
        console.log('operation事件:', operation)

        // 根据操作类型处理不同事件
        switch (operation.name) {
          case 'selectNode':
            this.handleNodeSelect(operation.obj)
            break
          case 'editNode':
            this.handleNodeEdit(operation.obj)
            break
          case 'finishEdit':
            console.log('完成编辑:', operation.obj)
            break
          case 'addChild':
            console.log('添加子节点:', operation.obj)
            break
          case 'addSibling':
            console.log('添加兄弟节点:', operation.obj)
            break
          case 'removeNode':
            console.log('删除节点:', operation.obj)
            break
          case 'moveNode':
            console.log('移动节点:', operation.obj)
            break
        }
      })

      // 监听节点选择事件（需要防抖处理单击/双击）
      this.ME.bus.addListener('selectNode', this.handleNodeSelect)

      // 监听节点编辑事件（双击触发）
      this.ME.bus.addListener('editNode', this.handleNodeEdit)

      // 使用mind-elixir的容器来监听鼠标悬停事件
      this.bindHoverEvents()
    },

    bindHoverEvents() {
      const container = this.ME.container
      let currentHoveredNode = null

      // 使用事件委托监听节点的mouseenter和mouseleave
      container.addEventListener(
        'mouseenter',
        e => {
          // 检查事件目标是否是节点
          const nodeElement = e.target.closest('.node')
          if (nodeElement) {
            const nodeId = nodeElement.getAttribute('data-nodeid')

            if (nodeId && nodeElement !== currentHoveredNode) {
              console.log('鼠标进入节点:', nodeId)
              currentHoveredNode = nodeElement

              // 清除之前的定时器
              if (this.hoverTimer) {
                clearTimeout(this.hoverTimer)
              }

              // 延迟显示提示框
              this.hoverTimer = setTimeout(() => {
                const nodeData = this.ME.findEle(nodeId)
                if (nodeData && currentHoveredNode === nodeElement) {
                  console.log('触发节点悬停事件:', nodeData.topic)
                  this.handleNodeHover(nodeData, e)
                }
              }, 300)
            }
          }
        },
        true
      ) // 使用捕获阶段

      container.addEventListener(
        'mouseleave',
        e => {
          const nodeElement = e.target.closest('.node')
          if (nodeElement && nodeElement === currentHoveredNode) {
            console.log('鼠标离开节点:', nodeElement.getAttribute('data-nodeid'))
            currentHoveredNode = null

            // 清除定时器
            if (this.hoverTimer) {
              clearTimeout(this.hoverTimer)
            }

            // 延迟隐藏提示框
            setTimeout(() => {
              this.hideTooltip()
            }, 100)
          }
        },
        true
      ) // 使用捕获阶段

      // 也可以尝试直接在节点上绑定事件（备用方案）
      this.bindDirectNodeEvents()
    },

    // 备用方案：直接在节点元素上绑定事件
    bindDirectNodeEvents() {
      // 延迟执行，确保节点已经渲染
      setTimeout(() => {
        const nodes = this.ME.container.querySelectorAll('.node')
        console.log('找到节点数量:', nodes.length)

        nodes.forEach(nodeElement => {
          const nodeId = nodeElement.getAttribute('data-nodeid')
          if (nodeId) {
            // 移除之前的事件监听（避免重复绑定）
            nodeElement.removeEventListener('mouseenter', this.nodeMouseEnter)
            nodeElement.removeEventListener('mouseleave', this.nodeMouseLeave)

            // 绑定新的事件监听
            nodeElement.addEventListener('mouseenter', e => {
              console.log('直接监听：鼠标进入节点', nodeId)
              const nodeData = this.ME.findEle(nodeId)
              if (nodeData) {
                // 清除之前的定时器
                if (this.hoverTimer) {
                  clearTimeout(this.hoverTimer)
                }

                // 延迟显示提示框
                this.hoverTimer = setTimeout(() => {
                  this.handleNodeHover(nodeData, e)
                }, 300)
              }
            })

            nodeElement.addEventListener('mouseleave', e => {
              console.log('🚀 ~ bindDirectNodeEvents ~ e:', e)
              console.log('直接监听：鼠标离开节点', nodeId)
              // 清除定时器
              if (this.hoverTimer) {
                clearTimeout(this.hoverTimer)
              }

              // 延迟隐藏提示框
              setTimeout(() => {
                this.hideTooltip()
              }, 100)
            })
          }
        })
      }, 1000) // 等待1秒确保节点渲染完成
    },

    // 处理节点选择事件（带防抖的单击/双击区分）
    handleNodeSelect(nodeData) {
      // 如果是同一个节点
      if (this.lastClickedNode && this.lastClickedNode.id === nodeData.id) {
        this.clickCount++
      } else {
        // 不同节点，重置计数
        this.clickCount = 1
        this.lastClickedNode = nodeData
      }

      // 清除之前的定时器
      if (this.clickTimer) {
        clearTimeout(this.clickTimer)
      }

      // 设置新的定时器
      this.clickTimer = setTimeout(() => {
        if (this.clickCount === 1) {
          // 单击
          this.handleNodeClick(nodeData)
        } else if (this.clickCount >= 2) {
          // 双击（或多击，都当作双击处理）
          this.handleNodeDoubleClick(nodeData)
        }
        // 重置计数
        this.clickCount = 0
        this.lastClickedNode = null
      }, 300) // 300ms内的多次点击判断为双击
    },

    // 处理节点编辑事件
    handleNodeEdit(nodeData) {
      console.log('节点进入编辑模式:', nodeData)
      // 这个事件通常在双击后自动触发，可以用于监听编辑状态
      // 如果不想要默认的编辑行为，可以在这里处理
    },

    // 实际的节点单击处理
    handleNodeClick(nodeData) {
      console.log('节点被单击:', nodeData)
      this.onNodeClick(nodeData)
    },

    // 实际的节点双击处理
    handleNodeDoubleClick(nodeData) {
      console.log('节点被双击:', nodeData)
      this.onNodeDoubleClick(nodeData)
    },
    handleNodeHover(nodeData, event) {
      console.log('鼠标悬停在节点上:', nodeData)
      this.showTooltip(event, nodeData)
      this.onNodeHover(nodeData, event)
    },

    // 显示提示框
    showTooltip(event, nodeData) {
      console.log('准备显示提示框:', nodeData.topic)

      this.tooltipData = {
        topic: nodeData.topic,
        id: nodeData.id,
        childrenCount: nodeData.children ? nodeData.children.length : 0,
        tags: nodeData.tags || [],
        note: nodeData.note || ''
      }

      this.tooltipVisible = true

      // 等待DOM更新后定位提示框
      this.$nextTick(() => {
        console.log('提示框应该显示了')
        this.positionTooltip(event)
      })
    },

    // 隐藏提示框
    hideTooltip() {
      this.tooltipVisible = false
    },

    // 定位提示框
    positionTooltip(event) {
      const tooltip = this.$refs.tooltip
      if (!tooltip) return

      const rect = event.target.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let left = rect.right + 10
      let top = rect.top

      // 如果右侧空间不够，显示在左侧
      if (left + tooltipRect.width > viewportWidth) {
        left = rect.left - tooltipRect.width - 10
      }

      // 如果下方空间不够，向上调整
      if (top + tooltipRect.height > viewportHeight) {
        top = viewportHeight - tooltipRect.height - 10
      }

      this.tooltipStyle = {
        left: left + 'px',
        top: top + 'px'
      }
    },

    // 自定义事件处理函数
    onNodeClick(nodeData) {
      // 单击节点时的自定义逻辑
      console.log('执行单击节点自定义逻辑:', nodeData.topic)

      // 示例：可以在这里添加自定义业务逻辑
      // 比如：加载节点详细信息、更新侧边栏等
    },

    onNodeDoubleClick(nodeData) {
      // 双击节点时的自定义逻辑
      console.log('执行双击节点自定义逻辑:', nodeData.topic)

      // 示例：可以在这里添加自定义业务逻辑
      // 比如：打开详情对话框、跳转到详情页等

      // 如果不想触发默认的编辑行为，可以在这里返回false
      // return false
    },

    onNodeHover(nodeData, event) {
      // 鼠标悬停时的自定义逻辑
      console.log('执行鼠标悬停自定义逻辑:', nodeData.topic, event)

      // 示例：可以在这里添加自定义业务逻辑
      // 比如：预加载相关数据、显示快捷操作等
    },

    // 扩展：监听其他mind-elixir事件的示例
    bindAdditionalEvents() {
      // 监听节点创建事件
      this.ME.bus.addListener('addChild', nodeData => {
        console.log('创建了子节点:', nodeData)
        // 重新绑定节点事件（因为有新节点）
        this.bindDirectNodeEvents()
      })

      // 监听节点删除事件
      this.ME.bus.addListener('removeNode', nodeData => {
        console.log('删除了节点:', nodeData)
      })

      // 监听节点移动事件
      this.ME.bus.addListener('moveNode', ({ from, to }) => {
        console.log('节点移动:', from, '到', to)
      })

      // 监听编辑完成事件
      this.ME.bus.addListener('finishEdit', nodeData => {
        console.log('编辑完成:', nodeData)
      })

      // 监听数据更新，重新绑定节点事件
      this.ME.bus.addListener('operation', operation => {
        if (['addChild', 'addSibling', 'moveNode'].includes(operation.name)) {
          // 延迟重新绑定，确保DOM更新完成
          setTimeout(() => {
            this.bindDirectNodeEvents()
          }, 100)
        }
      })
    },

    // 原有的测试方法
    test1() {
      const mock2 = {
        id: 'root',
        topic: '中心主题222',
        style: {
          color: 'yellow'
        },
        children: [
          {
            id: 'child3',
            topic: '子主题3',
            children: []
          },
          {
            id: 'child4',
            topic: '子主题4',
            children: []
          }
        ]
      }
      this.ME.refresh({
        nodeData: mock2
      })
    },

    test2() {
      const data1 = this.ME.getData()
      console.log('data1', data1)
      const data2 = this.ME.getDataString()
      console.log('data2', data2)
    },

    test3() {
      this.ME.reshapeNode(MindElixir.E('child1'), { style: { color: 'red', fontWeight: 900 } })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  text-align: center;
  position: relative;
}

#map {
  width: 100%;
  height: 800px;
  overflow: auto;
}

// 提示框样式
.node-tooltip {
  position: fixed;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 12px;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 1000;
  max-width: 280px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.4;

  .tooltip-header {
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 8px;
    margin-bottom: 8px;

    strong {
      color: #2c3e50;
      font-size: 14px;
    }
  }

  .tooltip-body {
    font-size: 12px;

    > div {
      margin-bottom: 6px;

      &:last-child {
        margin-bottom: 0;
      }

      strong {
        color: #7f8c8d;
        font-weight: 500;
      }
    }
  }
}

// 节点悬停效果
:deep(.node:hover) {
  filter: brightness(1.05);
  transform: scale(1.02);
  transition: all 0.2s ease;
}
</style>
