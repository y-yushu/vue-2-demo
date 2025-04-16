<template>
  <div class="box">
    <div ref="chart1" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'EchartOne',
  data() {
    return {}
  },
  mounted() {
    const chart1 = this.$refs.chart1
    const chat1 = echarts.init(chart1)

    const option = {
      grid: { left: '20%', right: '20%' },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category',
        show: false,
        axisTick: {
          show: false
        }
      },
      series: [
        {
          type: 'bar',
          name: '标注正确的文本数量',
          data: [23534565464356],
          stack: 'income',
          barWidth: 12,
          itemStyle: {
            normal: {
              color: '#1D6BFF'
            }
          },
          label: {
            show: true,
            position: 'insideTopLeft',
            offset: [-5, -20],
            formatter: e => {
              return `{a|${e.seriesName}}   {c|${e.data}}`
            },
            rich: {
              a: {
                color: '#000'
              },
              c: {
                color: '#1D6BFF'
              }
            }
          }
        },
        {
          type: 'bar',
          name: '标注错误的文本数量',
          data: [12345634563236],
          stack: 'income',
          barWidth: 12,
          itemStyle: {
            normal: {
              color: '#D45F5F'
            }
          },
          label: {
            show: true,
            position: 'insideTopRight',
            offset: [5, -20],
            formatter: e => {
              return `{a|${e.seriesName}}   {c|${e.data}}`
            },
            rich: {
              a: {
                color: '#000'
              },
              c: {
                color: '#D45F5F'
              }
            }
          }
        }
      ]
    }

    // const serialized = echarts.util.serialize(option)
    // console.log('serialized', serialized)

    chat1.setOption(option)
  }
}
</script>

<style>
.box {
  padding: 30px 200px;
}
.chart {
  height: 800px;
  border: 1px solid red;
}
</style>
