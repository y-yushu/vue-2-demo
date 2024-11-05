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
      securityJsCode: 'ea7db74c576e54a1fe7620b242ad6ab5'
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
        key: '2d22582ce88d0608b1e9ba6ef710d7c8', // 申请好的Web端开发者 Key，调用 load 时必填
        version: '2.0' // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      })
        .then(AMap => {
          map = new AMap.Map('map')
          console.log('map', map)
          const marker = new AMap.Marker({
            position: [116.39, 39.9] //位置
          })
          map.add(marker) //添加到地图
          const lineArr = [
            [116.368904, 39.913423],
            [116.382122, 39.901176],
            [116.387271, 39.912501],
            [116.398258, 39.9046]
          ]
          const polyline = new AMap.Polyline({
            path: lineArr, //设置线覆盖物路径
            strokeColor: '#3366FF', //线颜色
            strokeWeight: 5, //线宽
            strokeStyle: 'solid' //线样式
          })
          map.add(polyline)
          polyline.on('click', e => {
            console.log('2222', e)
          })
          map.on('click', e => {
            console.log('e', e)
          })
        })
        .catch(e => {
          console.error(e) //加载错误提示
        })
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
  height: 100%;
}
</style>
