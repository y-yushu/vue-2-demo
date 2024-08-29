<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

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
      const canvas = document.getElementById('webglcanvas')
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      // 创建相机、元素、渲染器
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x050505)
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 5
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      canvas.appendChild(renderer.domElement)

      // 光源
      const light = new THREE.AmbientLight(0xffffff)
      scene.add(light)

      // 渲染
      const loader = new GLTFLoader()
      console.log('loader', loader)
      loader.load(
        // 资源URL
        'static/duck/duck.gltf',
        // 'static/turbine01/scene.gltf',
        // 当资源加载时调用
        function (gltf) {
          console.log('gltf.scen', gltf.scene)
          scene.add(gltf.scene)
          renderer.render(scene, camera)

          // gltf.animations // Array<THREE.AnimationClip>
          // gltf.scene // THREE.Group
          // gltf.scenes // Array<THREE.Group>
          // gltf.cameras // Array<THREE.Camera>
          // gltf.asset // Object
        },
        // 加载过程中调用
        function (xhr) {
          console.log('加载进度：', xhr.loaded / xhr.total)
        },
        // 当加载有错误时调用
        function (error) {
          console.log('[加载错误]', error)
        }
      )
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
