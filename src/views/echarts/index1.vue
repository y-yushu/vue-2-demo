<template>
  <div class="box">
    <div ref="chart1" class="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'EchartOne',
  data() {
    return {}
  },
  mounted() {
    // color: ['#56948c', '#f1f139', '#ff963c', '#ff613b', '#c31bce']
    const chart1 = this.$refs.chart1
    const chat1 = echarts.init(chart1)
    chat1.setOption({
      tooltip: {
        position: 'top'
      },
      grid: [
        {
          height: '5%',
          width: '90%',
          top: '25%',
          left: '5%'
        },
        {
          height: '5%',
          width: '90%',
          top: '55%',
          left: '5%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: ['A', 'B', 'C', 'D'],
          splitArea: {
            show: true
          },
          gridIndex: 0
        },
        {
          type: 'category',
          data: ['H', 'I', 'J'],
          splitArea: {
            show: true
          },
          gridIndex: 1
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: [''],
          splitArea: {
            show: true
          },
          gridIndex: 0
        },
        {
          type: 'category',
          data: [''],
          splitArea: {
            show: true
          },
          gridIndex: 1
        }
      ],
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        color: ['#56948c', '#f1f139', '#ff963c', '#ff613b', '#c31bce']
      },
      series: [
        {
          name: '1D Heatmap 1',
          type: 'heatmap',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: [
            [0, 0, 10],
            [1, 0, 20],
            [2, 0, 30],
            [3, 0, 40]
          ],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: '1D Heatmap 2',
          type: 'heatmap',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            [0, 0, 100],
            [1, 0, 90],
            [2, 0, 80]
          ],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
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
