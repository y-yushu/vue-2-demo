<template>
  <div>
    <div id="map"></div>
    <div style="padding-left: 200px">
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
    console.log('example', example)
    // const theme = {
    //   name: 'Latte',
    //   palette: ['#dd7878', '#ea76cb', '#8839ef', '#e64553', '#fe640b', '#df8e1d', '#40a02b', '#209fb5', '#1e66f5', '#7287fd'],
    //   cssVar: {
    //     '--main-color': '#000000',
    //     '--main-bgcolor': '#ffffff',
    //     '--color': '#777777',
    //     '--bgcolor': '#f6f6f6',
    //     '--panel-color': '#444446',
    //     '--panel-bgcolor': '#ffffff',
    //     '--panel-border-color': '#eaeaea'
    //   }
    // }
    const theme = MindElixir.DARK_THEME
    this.ME = new MindElixir({
      el: '#map',
      locale: 'zh_CN',
      before: {}
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
#map {
  width: 100%;
  height: 800px;
}
</style>
