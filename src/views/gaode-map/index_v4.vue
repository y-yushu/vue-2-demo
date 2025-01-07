<template>
  <div class="container">
    <div>
      <select v-model="key" style="height: 23px">
        <option v-for="item in lines" :key="item.id" :value="item.value">{{ item.label }}</option>
      </select>
      <button @click="use">应用</button>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import SiteData from '@/assets/map/site-data.json'
import { lines } from './data'
import Dot from '@/assets/map/dot.png'
import Begin from '@/assets/map/begin.png'
import End from '@/assets/map/end.png'
// 地图及相关资源
let scriptElement = null
let AMap = null
let map = null
// 地图的点
let massMarks = null
// 地图的线
let polylines = []

export default {
  name: 'GaodeMap',
  data() {
    return {
      lines,
      key: '',
      paths: [],
      path3: {}
    }
  },
  mounted() {
    // 计算公交路线
    let paths = []
    let path1 = []
    SiteData.forEach(e => {
      if (e.STATION_MARK === 'B') {
        path1.push(e)
      } else if (e.STATION_MARK === 'Z') {
        path1.push(e)
      } else if (e.STATION_MARK === 'E') {
        path1.push(e)
        paths.push(path1)
        path1 = []
      }
    })
    this.paths = paths
    let path2 = {}
    let len = 0
    SiteData.forEach(e => {
      if (!path2[e.LINE_CODE]) {
        path2[e.LINE_CODE] = [e]
        len++
      } else {
        path2[e.LINE_CODE].push(e)
      }
    })
    console.log('len', len)
    console.log('路线', path2)
    const path3 = {}
    const keys = []
    for (const key in path2) {
      keys.push(key)
      const list = path2[key]
      path3[`${key}_上行`] = []
      path3[`${key}_下行`] = []
      list.forEach(e => {
        if (e.UP_DOWN === '0') {
          path3[`${key}_上行`].push(e)
        } else {
          path3[`${key}_下行`].push(e)
        }
      })
    }
    console.log('keys', keys)
    console.log('path3', path3)
    // 安全密钥
    window._AMapSecurityConfig = {
      securityJsCode: process.env.VUE_APP_AMAP_CODE
    }
    // 动态加载脚本
    const script = document.createElement('script')
    script.src = `${process.env.BASE_URL}lib/amap/loader.js`
    script.onload = () => {
      // 脚本加载完成后的逻辑（如果有）
      console.log('资源加载')
      this.init()
    }
    document.head.appendChild(script)
    scriptElement = script
  },
  beforeDestroy() {
    // 删除脚本
    if (scriptElement) {
      document.head.removeChild(scriptElement)
      scriptElement = null
      console.log('资源销毁')
    }
  },
  methods: {
    init() {
      // eslint-disable-next-line no-undef
      AMapLoader.load({
        key: process.env.VUE_APP_AMAP_KEY,
        version: '2.0'
      })
        .then(_AMap => {
          AMap = _AMap
          map = new AMap.Map('map', {
            zoom: 14.85,
            center: [121.922228, 30.896026],
            mapStyle: 'amap://styles/darkblue'
          })
          console.log('地图加载完成', map)
        })
        .catch(e => {
          console.error(e) //加载错误提示
        })
    },
    use() {
      const key = this.key
      const list = SiteData.filter(e => e.LINE_CODE === key)
      console.log('list', list)
      this.drawDot(list)
      this.drawLine(list)
    },
    drawDot(list = []) {
      if (massMarks) {
        massMarks.setMap(null)
        massMarks = null
      }
      // 公交站点打点
      const getStyle = type => {
        if (type === 'B') return 1
        if (type === 'E') return 2
        return 0
      }
      const style = [
        {
          url: Dot,
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(12, 12),
          zIndex: 3
        },
        {
          url: Begin,
          anchor: new AMap.Pixel(15, 30),
          size: new AMap.Size(30, 30),
          zIndex: 3
        },
        {
          url: End,
          anchor: new AMap.Pixel(15, 30),
          size: new AMap.Size(30, 30),
          zIndex: 3
        }
      ]
      const data = list.map(e => ({
        lnglat: [e.LON, e.LAT],
        name: e.STATION_NAME,
        style: getStyle(e.STATION_MARK)
      }))
      massMarks = new AMap.MassMarks(data, {
        zIndex: 5,
        zooms: [8, 20],
        style: style
      })
      const infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(20, 0),
        isCustom: true,
        closeWhenClickMap: true,
        autoMove: true,
        showShadow: false
      })
      massMarks.on('mouseover', function (e) {
        const content = `
              <div style="
                padding: 4px 8px;
                background: transparent;
                color: white;
                border: none;
                font-size: 12px;
                white-space: nowrap;
                transform: translate(50%, 100%);
              ">
                ${e.data.name}
              </div>
            `
        infoWindow.setContent(content)
        infoWindow.open(map, e.data.lnglat)
      })
      massMarks.on('mouseout', function () {
        infoWindow.close()
      })
      massMarks.setMap(map)
    },
    drawLine(list = []) {
      if (polylines.length) {
        polylines.forEach(polyline => {
          polyline.setMap(null)
        })
        polylines = []
      }
      for (let i = 1; i < list.length; i++) {
        AMap.plugin('AMap.Driving', () => {
          const start = list[i - 1]
          const end = list[i]
          const driving = new AMap.Driving({
            policy: 0,
            map: map
          })
          const startLngLat = [start.LON, start.LAT]
          const endLngLat = [end.LON, end.LAT]
          const opts = {
            waypoints: []
          }
          driving.search(startLngLat, endLngLat, opts, (status, result) => {
            if (status === 'complete' && result.routes && result.routes.length) {
              console.log('规划结果:', result)
              // 获取路线的第一条结果
              const route = result.routes[0]
              const path = route.steps.flatMap(step => step.path)
              console.log('path', path)
              // 自定义绘制路线
              const polyline = new AMap.Polyline({
                path: path, // 路线坐标点
                strokeWeight: 2,
                strokeColor: 'red',
                lineJoin: 'round',
                map: map // 将线段加载到地图上
              })
              polylines.push(polyline)
              // 调整地图视野以展示路线
              map.setFitView([polyline])
            } else {
              console.log('绘制失败')
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: calc(100% - 4rem);
  padding: 2rem;
  background: #323233;
}
#map {
  height: calc(100% - 50px);
  margin-top: 16px;
}
</style>
