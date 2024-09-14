<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// let scene = null,
//   camera = null,
//   renderer = null

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
      let camera, scene, renderer
      let isDragging = false
      let previousMousePosition = { x: 0, y: 0 }

      function init() {
        const webglcanvas = document.getElementById('webglcanvas')
        const width = webglcanvas.offsetWidth
        const height = webglcanvas.offsetHeight

        // 创建场景
        scene = new THREE.Scene()

        // 创建相机
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.set(0, 0, 10) // 初始相机位置，固定在 z = 10

        // 创建渲染器
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(width, height)
        webglcanvas.appendChild(renderer.domElement)

        // 添加一个简单的对象
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        // 初始朝向为垂直屏幕，即朝向 z 轴负方向
        camera.lookAt(new THREE.Vector3(0, 0, 0))

        // 添加鼠标拖动事件监听
        setupDragControls()

        animate()
      }

      function setupDragControls() {
        renderer.domElement.addEventListener('mousedown', event => {
          isDragging = true
          previousMousePosition = {
            x: event.clientX,
            y: event.clientY
          }
        })

        renderer.domElement.addEventListener('mousemove', event => {
          if (isDragging) {
            const deltaX = event.clientX - previousMousePosition.x
            const deltaY = event.clientY - previousMousePosition.y

            // 计算相机移动的比例，使移动量和鼠标像素保持一致
            const moveSpeed = camera.position.z / 200
            // 只更新相机的 x 和 y，不改变 z
            camera.position.x -= deltaX * moveSpeed
            camera.position.y += deltaY * moveSpeed

            // 更新上一次的鼠标位置
            previousMousePosition = {
              x: event.clientX,
              y: event.clientY
            }
          }
        })

        renderer.domElement.addEventListener('mouseup', () => {
          isDragging = false
        })

        renderer.domElement.addEventListener('mouseleave', () => {
          isDragging = false
        })
      }

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }

      init()
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
