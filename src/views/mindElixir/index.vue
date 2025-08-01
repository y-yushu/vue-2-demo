<template>
  <div class="box">
    <div id="map" @mousemove="handleMouseMove"></div>
    <div style="margin-top: 20px">
      <button @click="test1">测试1</button>
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
      // 单击双击防抖处理
      clickTimer: null,
      clickCount: 0,
      lastClickedNode: null,
      // 鼠标移入id
      hoverId: ''
    }
  },
  mounted() {
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
      draggable: true, // 启用节点拖拽
      editable: true, // 启用编辑功能
      contextMenu: true, // 启用右键菜单
      toolBar: true, // 启用工具栏
      nodeMenu: true, // 启用节点菜单
      keypress: true, // 启用快捷键
      // before: {},
      generateMainBranch
    })
    this.ME.bus.addListener('operation', operation => {
      console.log('operation', operation)
    })
    this.ME.init({
      nodeData: mock,
      theme
    })

    // 监听节点选择事件（需要防抖处理单击/双击）
    this.ME.bus.addListener('selectNode', this.handleNodeSelect)
  },
  methods: {
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

    // 单击双击事件
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
          console.log('触发点击', nodeData)
        } else if (this.clickCount >= 2) {
          // 双击（或多击，都当作双击处理）
          console.log('触发双击', nodeData)
        }
        // 重置计数
        this.clickCount = 0
        this.lastClickedNode = null
      }, 200) // 200ms内的多次点击判断为双击
    },

    // 鼠标移动事件
    handleMouseMove(e) {
      if (e?.target?.tagName === 'ME-TPC') {
        const nodeId = e.target.getAttribute('data-nodeid')
        if (nodeId !== this.hoverId) {
          console.log('鼠标移入', nodeId)
          this.hoverId = nodeId
        }
      } else {
        if (this.hoverId) {
          console.log('鼠标移出', this.hoverId)
          this.hoverId = ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  text-align: center;
}
#map {
  width: 100%;
  height: 800px;
  overflow: auto;
}
</style>
