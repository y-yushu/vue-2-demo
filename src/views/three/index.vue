<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  System,
  SpriteRenderer,
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  RadialVelocity,
  Vector3D,
  Alpha,
  Scale,
  Color,
  BoxZone
} from 'three-nebula'

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
      const canvas = document.getElementById('webglcanvas')
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      // 创建相机、元素、渲染器
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x050505)
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 20
      renderer = new THREE.WebGLRenderer()
      this.renderer = renderer
      renderer.setSize(width, height)
      canvas.appendChild(renderer.domElement)

      // 创建粒子系统
      const particleSystem = new System()

      // 创建发射器
      const emitter = new Emitter()
      // 配置发射器
      emitter
        .setRate(new Rate(new Span(4, 16), new Span(0.01)))
        .setInitializers([
          new Position(new BoxZone(10)),
          new Mass(1),
          new Radius(1, 4),
          new Life(1, 3),
          new RadialVelocity(45, new Vector3D(0, 1, 0), 180)
        ])
        .setBehaviours([new Alpha(1, 0), new Scale(1, 0.5), new Color(new THREE.Color('#4F1500'), new THREE.Color('#0029FF'))])
        .setPosition({ x: 0, y: 0, z: -2 })
      // 将发射器添加到粒子系统
      particleSystem.addEmitter(emitter)
      // 创建渲染器
      const smokeRenderer = new SpriteRenderer(scene, THREE)
      particleSystem.addRenderer(smokeRenderer)

      // 添加光源
      function setupAllAroundLighting(scene) {
        // 添加环境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        scene.add(ambientLight)

        // 添加多个定向光源
        const directions = [new THREE.Vector3(1, 1, 1), new THREE.Vector3(-1, -1, -1), new THREE.Vector3(-1, 1, 1), new THREE.Vector3(1, -1, -1)]

        directions.forEach(direction => {
          const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
          directionalLight.position.copy(direction)
          scene.add(directionalLight)
        })
      }
      setupAllAroundLighting(scene)

      function animate() {
        requestAnimationFrame(animate)
        particleSystem.update() // 更新粒子系统
        renderer.render(scene, camera)
      }
      animate()

      // function setupOrbitControls(camera, renderer) {
      //   const controls = new OrbitControls(camera, renderer.domElement)
      //   // 设置控制器的一些属性
      //   controls.enableDamping = true // 添加阻尼效果，使动画更平滑
      //   controls.dampingFactor = 0.05
      //   controls.screenSpacePanning = false
      //   controls.minDistance = 1 // 设置相机距离物体的最小距离
      //   controls.maxDistance = 50 // 设置相机距离物体的最大距离
      //   // controls.maxPolarAngle = Math.PI / 2 // 限制垂直旋转角度
      //   return controls
      // }
      // const controls = setupOrbitControls(camera, renderer)
      // // 渲染
      // const loader = new GLTFLoader()
      // loader.load(
      //   // 'static/turbine01/scene.gltf',
      //   'static/shenyang_j16_hidden_dragon/scene.gltf',
      //   function (gltf) {
      //     console.log('gltf.scene', gltf.scene)
      //     scene.add(gltf.scene)
      //     renderer.render(scene, camera)
      //     // 在您的动画循环中更新控制器
      //     function animate() {
      //       requestAnimationFrame(animate)
      //       controls.update() // 更新控制器
      //       particleSystem.update() // 更新粒子系统
      //       renderer.render(scene, camera)
      //     }
      //     animate()
      //   },
      //   function (xhr) {
      //     console.log('加载进度：', xhr.loaded / xhr.total)
      //   },
      //   function (error) {
      //     console.log('[加载错误]', error)
      //   }
      // )
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
