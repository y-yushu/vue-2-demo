<template>
  <div class="box">
    <div id="map"></div>
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
      ME: null
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
}
#map {
  width: 100%;
  height: 800px;
  overflow: auto;
}
</style>
