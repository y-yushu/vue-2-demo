<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<script>
let scriptElement = null
let map = null

export default {
  name: 'GaodeMap',
  data() {
    return {}
  },
  mounted() {
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
          // 添加点
          // const circleMarker = new AMap.CircleMarker({
          //   center: [121.907609, 30.910485],
          //   radius: 5,
          //   fillColor: '#ffffff',
          //   fillOpacity: 1,
          //   strokeColor: '#ff0000',
          //   strokeWeight: 1,
          //   strokeOpacity: 1,
          //   bubble: true
          // })
          // map.add(circleMarker)
          const point = createMarkerWithLabel(AMap, [121.907609, 30.910485], '111')
          map.add(point)
          // const lineArr = [
          //   [121.643394, 31.047499],
          //   [121.762512, 30.891519],
          //   [121.742456, 30.985817],
          //   [121.922228, 30.896026]
          // ]
          // const polyline = new AMap.Polyline({
          //   path: lineArr, //设置线覆盖物路径
          //   strokeColor: '#ffc151', //线颜色
          //   strokeWeight: 5, //线宽
          //   strokeStyle: 'solid', //线样式
          //   cursor: 'pointer',
          //   showDir: true
          // })
          // map.add(polyline)
          // polyline.on('click', e => {
          //   console.log('2222', e)
          // })
          map.on('click', e => {
            console.log('e', e)
          })
          map.on('zoomchange', e => {
            console.log('缩放级别改变', e)
            console.log('当前缩放级别:', map.getZoom())
          })
        })
        .catch(e => {
          console.error(e) //加载错误提示
        })
    }
  }
}

function createMarkerWithLabel(AMap, position, labelText) {
  // 创建覆盖物群组
  const overlayGroup = new AMap.OverlayGroup()

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
