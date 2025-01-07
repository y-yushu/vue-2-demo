<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<script>
import SiteData from '@/assets/map/site-data.json'
import Dot from '@/assets/map/dot.png'
import Begin from '@/assets/map/begin.png'
import End from '@/assets/map/end.png'
let scriptElement = null
let map = null

export default {
  name: 'GaodeMap',
  data() {
    return {
      paths: []
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
        .then(AMap => {
          map = new AMap.Map('map', {
            zoom: 14.85,
            center: [121.922228, 30.896026],
            mapStyle: 'amap://styles/darkblue'
          })
          console.log('map', map)
          // 公交路线画线
          this.paths.forEach(e => {
            const path = e.map(c => [c.LON, c.LAT])
            const polyline = new AMap.Polyline({
              path: path,
              strokeWeight: 2,
              strokeColor: 'red',
              lineJoin: 'round'
            })
            map.add(polyline)
          })
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
          const data = SiteData.map(e => ({
            lnglat: [e.LON, e.LAT],
            name: e.STATION_NAME,
            style: getStyle(e.STATION_MARK)
          }))
          const massMarks = new AMap.MassMarks(data, {
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
        })
        .catch(e => {
          console.error(e) //加载错误提示
        })
    },
    tttt() {}
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
  height: 100%;
}
</style>
