<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<script>
import SiteData from '@/assets/map/site-data.json'
// import Dot from '@/assets/map/dot.png'
let scriptElement = null
let map = null

export default {
  name: 'GaodeMap',
  data() {
    return {}
  },
  mounted() {
    console.log('SiteData', SiteData)
    SiteData.forEach(e => {
      if (e.STATION_MARK === 'T') {
        console.log('停车场', e)
      }
    })
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
          SiteData.forEach(item => {
            const point = createMarkerWithLabel(AMap, [item.LON, item.LAT], item.STATION_NAME, item.JH_ID)
            map.add(point)
          })
        })
        .catch(e => {
          console.error(e) //加载错误提示
        })
    }
  }
}

function createMarkerWithLabel(AMap, position, labelText, id) {
  // 创建覆盖物群组
  const overlayGroup = new AMap.OverlayGroup()
  overlayGroup.id = id

  // 创建圆点
  const circleMarker = new AMap.CircleMarker({
    center: position,
    radius: 4,
    fillColor: '#93AE85',
    fillOpacity: 1,
    strokeColor: '#6D8358',
    strokeWeight: 1,
    strokeOpacity: 1,
    bubble: true,
    zIndex: 20,
    cursor: 'pointer'
  })

  // 创建文字
  const text = new AMap.Text({
    text: labelText,
    position: position,
    offset: new AMap.Pixel(10, 0),
    style: {
      color: '#333',
      fontSize: '12px',
      fontWeight: 'normal'
    }
  })

  // 将点和文字添加到组中
  overlayGroup.addOverlays([circleMarker, text])

  // 扩展组的方法
  overlayGroup.setPosition = function (newPosition) {
    circleMarker.setCenter(newPosition)
    text.setPosition(newPosition)
  }

  overlayGroup.setText = function (newText) {
    text.setText(newText)
  }

  return overlayGroup
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
