<template>
  <div class="container">
    <div id="map"></div>
    <button @click="test">测试按钮</button>
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
          map.on('click', e => {
            console.log('e', e)
          })
          map.on('zoomchange', e => {
            console.log('缩放级别改变', e)
            console.log('当前缩放级别:', map.getZoom())
          })
          // --------------
          console.log('--------------')
          // 确保 API 加载完成后再使用 LineSearch
          AMap.plugin(['AMap.LineSearch'], function () {
            //实例化公交线路查询类，只取回一条路线
            const linesearch = new AMap.LineSearch({
              pageIndex: 1,
              city: '上海',
              pageSize: 1,
              extensions: 'all'
            })
            const key = '1124路'
            linesearch.search(key, function (status, result) {
              map.clearMap()
              if (status === 'complete' && result.info === 'OK') {
                console.log(key, result)
              } else {
                console.log('result22', result)
              }
            })
          })
        })
        .catch(e => {
          console.error(e) //加载错误提示
        })
    },
    test() {
      console.log('测试方法')
      // // 实例化公交线路查询类，只取回一条路线
      // const linesearch = new Tool.LineSearch({
      //   pageIndex: 1,
      //   city: '上海',
      //   pageSize: 1,
      //   extensions: 'all'
      // })
      // linesearch.search('浦东33路', function (status, result) {
      //   map.clearMap()
      //   if (status === 'complete' && result.info === 'OK') {
      //     console.log('result', result)
      //   } else {
      //     alert(result)
      //   }
      // })
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
