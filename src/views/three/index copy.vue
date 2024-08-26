<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { WebGLRenderer, PCFShadowMap, Scene, PerspectiveCamera, AmbientLight, HemisphereLight, DirectionalLight } from 'three'

// import ImageMap from '../../assets/threeImage/map.png'

export default {
  name: 'ThreePage',
  data() {
    return {}
  },
  mounted() {
    console.log('THREE', THREE)
    this.init()
  },
  methods: {
    init() {
      const canvas = document.getElementById('webglcanvas')
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      // 渲染器
      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.shadowMap.enabled = false
      renderer.shadowMap.type = PCFShadowMap
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      console.log(width, height)
      // 元素容器
      const scene = new Scene()
      // 相机
      const camera = new PerspectiveCamera(45, width / height, 0.1, 100000)
      camera.position.set(-270, 680, -900)
      camera.lookAt(0, 0, 0)
      // 初始化光源
      // 环境光
      const ambientLight = new AmbientLight(0xcccccc, 0.4)
      scene.add(ambientLight)
      // 平行光1
      const directionalLight = new DirectionalLight(0xffffff, 0.2)
      directionalLight.position.set(1, 0.1, 0).normalize()
      scene.add(directionalLight)
      // 平行光2
      const directionalLight2 = new DirectionalLight(0xff2ffff, 0.2)
      directionalLight2.position.set(1, 0.1, 0.1).normalize()
      scene.add(directionalLight2)
      // 平行光3
      const directionalLight3 = new DirectionalLight(0xffffff)
      directionalLight3.position.set(1, 500, -20)
      directionalLight3.castShadow = true
      directionalLight3.shadow.camera.top = 18
      directionalLight3.shadow.camera.bottom = -10
      directionalLight3.shadow.camera.left = -52
      directionalLight3.shadow.camera.right = 12
      scene.add(directionalLight3)
      // 半球光
      const hemiLight = new HemisphereLight(0xffffff, 0x444444, 0.2)
      hemiLight.position.set(0, 1, 0)
      scene.add(hemiLight)
      // 渲染
      renderer.render(scene, camera)
    }
  }
}
</script>

<style lang="less" scoped>
.three-page {
  padding: 30px;
}
#webglcanvas {
  width: 100%;
  aspect-ratio: 3 / 1;
  background: pink;
}
</style>
