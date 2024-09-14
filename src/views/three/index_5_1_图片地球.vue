<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let scene = null,
  camera = null,
  renderer = null

export default {
  name: 'ThreePage',
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 操作元素
      const webglcanvas = document.getElementById('webglcanvas')
      const width = webglcanvas.offsetWidth
      const height = webglcanvas.offsetHeight
      // 创建相机、元素、渲染器
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x050505)
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 20
      renderer = new THREE.WebGLRenderer()
      this.renderer = renderer
      renderer.setSize(width, height)
      webglcanvas.appendChild(renderer.domElement)

      function setupOrbitControls(camera, renderer) {
        const controls = new OrbitControls(camera, renderer.domElement)
        // 设置控制器的一些属性
        controls.enableDamping = true // 添加阻尼效果，使动画更平滑
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = false
        controls.minDistance = 1 // 设置相机距离物体的最小距离
        controls.maxDistance = 50 // 设置相机距离物体的最大距离
        return controls
      }

      const controls = setupOrbitControls(camera, renderer)

      // 添加地图 v1.0
      const geometry = new THREE.SphereGeometry(10, 32, 32)
      const textureLoader = new THREE.TextureLoader()
      const earthTexture = textureLoader.load('/static/map.png')
      const material = new THREE.MeshBasicMaterial({ map: earthTexture })
      const earth = new THREE.Mesh(geometry, material)

      scene.add(earth)

      // 渲染
      function animate() {
        requestAnimationFrame(animate)
        controls.update() // 更新控制器
        renderer.render(scene, camera)
      }
      animate()
    }
  }
}
</script>

<style lang="less" scoped>
.three-page {
  position: relative;
  padding: 30px;
}
#webglcanvas {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 1;
}
</style>
