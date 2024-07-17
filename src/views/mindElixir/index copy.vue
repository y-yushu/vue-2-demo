<template>
  <div class="box">
    <div id="map" class="map">123</div>
  </div>
</template>

<script>
import MindElixir from 'mind-elixir'

const data2 = {
  nodeData: {
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
}

export default {
  name: 'MindElixir',
  data() {
    return {
      ME: null
    }
  },
  mounted() {
    const theme = {
      name: 'Latte',
      palette: ['red', '#dd7878', '#ea76cb', '#8839ef', '#e64553', '#fe640b', '#df8e1d', '#40a02b', '#209fb5', '#1e66f5', '#7287fd'],
      cssVar: {
        '--main-color': '#444446',
        '--main-bgcolor': '#ffffff',
        '--color': '#777777',
        '--bgcolor': '#f6f6f6',
        '--panel-color': '#444446',
        '--panel-bgcolor': '#ffffff',
        '--panel-border-color': '#eaeaea'
      }
    }
    this.ME = new MindElixir({
      el: '#map',
      locale: 'zh_CN',
      theme,
      data: data2,
      draggable: false,
      contextMenu: true,
      toolBar: true,
      nodeMenu: true,
      keypress: true
    })
    // this.ME.init(MindElixir.new('思维导图示例2'))
    this.ME.init()
  }
}
</script>

<style>
.box {
  overflow: hidden;
}
.map {
  height: 640px;
  margin: 30px;
  background: #f7f7f7;
}
</style>
