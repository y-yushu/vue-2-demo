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
        controls.minDistance = 5.1 // 设置相机距离物体的最小距离
        controls.maxDistance = 50 // 设置相机距离物体的最大距离
        return controls
      }

      const controls = setupOrbitControls(camera, renderer)

      // 添加地图 v2.0
      // 球体大小和细分数
      const RADIUS = 5
      const SEGMENTS = 64
      const geometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, SEGMENTS)
      // 动态生成瓦片地图纹理
      const tileZoomLevel = 3 // 瓦片缩放级别
      const tilesPerRow = Math.pow(2, tileZoomLevel) // 瓦片每行/每列的数量
      const canvasSize = 512 * tilesPerRow // 最终拼接纹理的大小
      // 创建一个Canvas来拼接瓦片
      const canvas = document.createElement('canvas')
      canvas.width = canvasSize
      canvas.height = canvasSize
      const context = canvas.getContext('2d')
      // 加载瓦片地图
      const textureLoader = new THREE.TextureLoader()
      function loadTile(x, y, z) {
        return new Promise(resolve => {
          const url = `/map/terrain/${z}/${x}/${y}.png` // 替换为您的XYZ瓦片URL
          textureLoader.load(url, texture => {
            // 将瓦片绘制到Canvas上
            context.drawImage(texture.image, x * 512, y * 512, 512, 512)
            resolve(texture)
          })
        })
      }

      // 加载所有瓦片
      async function loadTiles() {
        const promises = []
        for (let x = 0; x < tilesPerRow; x++) {
          for (let y = 0; y < tilesPerRow; y++) {
            promises.push(loadTile(x, y, tileZoomLevel))
          }
        }
        await Promise.all(promises)

        // 将拼接好的Canvas转换为纹理
        const canvasTexture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({ map: canvasTexture })

        // 创建地球球体
        const earth = new THREE.Mesh(geometry, material)
        scene.add(earth)

        // 动画渲染
        function animate() {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()
      }

      loadTiles()
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
