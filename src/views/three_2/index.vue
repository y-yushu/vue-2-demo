<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
    <div style="text-align: center; padding-top: 1rem">
      <button @click="huoquweizhi">获取位置</button>
      <br />
    </div>
  </div>
</template>

<script>
/**
 * 起飞动画基本完成
 */
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import ParticleSystem, {
//   Body,
//   Color,
//   Emitter,
//   Life,
//   Mass,
//   Position,
//   RadialVelocity,
//   RandomDrift,
//   Rate,
//   Scale,
//   Span,
//   SphereZone,
//   SpriteRenderer,
//   Vector3D,
//   ease
// } from 'three-nebula'
// import dot from '../../assets/dot.png'

let scene = null,
  camera = null,
  renderer = null
// 执行方法
let animateFunc = {}

export default {
  name: 'ThreePage2',
  data() {
    return {
      /**
       * 动画视角步骤
       * 1 从甲板起飞
       * 2 平稳飞行
       */
      animateStep: 1,
      step1Time: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 创建 场景、相机和渲染器
    async init() {
      // 操作元素
      const webglcanvas = document.getElementById('webglcanvas')
      const width = webglcanvas.offsetWidth
      const height = webglcanvas.offsetHeight
      // 设置场景、相机和渲染器
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000)
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      // 添加环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3) // 降低强度
      scene.add(ambientLight)
      // 添加定向光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 增加强度
      directionalLight.position.set(100, 100, 100).normalize()
      scene.add(directionalLight)
      // 设置相机视角
      camera.position.x = 15
      camera.position.y = 15
      camera.position.z = 15
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      webglcanvas.appendChild(renderer.domElement)
      // 创建控制组
      function setupOrbitControls(camera, renderer) {
        const controls = new OrbitControls(camera, renderer.domElement)
        // 设置控制器的一些属性
        controls.enableDamping = true // 添加阻尼效果，使动画更平滑
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = false
        controls.minDistance = 1 // 设置相机距离物体的最小距离
        controls.maxDistance = 2000 // 设置相机距离物体的最大距离
        return controls
      }
      const controls = setupOrbitControls(camera, renderer)
      // 定义目标中心
      const target = new THREE.Vector3(0, 0, 0) // 初始目标中心
      // 更新控制器的目标中心
      controls.target.copy(target)
      // 监听键盘事件
      window.addEventListener('keydown', event => {
        const step = 0.05 // 每次移动的步长
        switch (event.key) {
          case 'ArrowUp':
            target.y += step // 向上移动目标中心
            break
          case 'ArrowDown':
            target.y -= step // 向下移动目标中心
            break
          case 'ArrowLeft':
            target.x -= step // 向左移动目标中心
            break
          case 'ArrowRight':
            target.x += step // 向右移动目标中心
            break
          case 'w': // 向前移动目标中心
            target.z -= step
            break
          case 's': // 向后移动目标中心
            target.z += step
            break
        }
        controls.target.copy(target) // 更新控制器的目标中心
      })
      // 引入元素
      await Promise.all([this.creatAircraftCarrier()])
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update() // 更新控制器
        // 动画
        for (const key in animateFunc) {
          animateFunc[key] && animateFunc[key]()
        }
        renderer.render(scene, camera)
      }
      animate()
    },
    // 创建航母
    creatAircraftCarrier() {
      return new Promise(resolve => {
        // 渲染
        const loader = new GLTFLoader()
        loader.load(
          'static/976158476f634c64834353dc28a24228/scene.gltf',
          gltf => {
            // 统一处理的组
            const group = new THREE.Group()
            const helicopter = gltf.scene
            console.log('---------------------------------\n', '模型', gltf)
            // 获取旋翼
            const rotorWing = helicopter.getObjectByName('Object_5')
            rotorWing.material = rotorWing.material.clone()
            rotorWing.material.color.set(0x3742fa)
            // // 创建旋转中心
            // const pivot = new THREE.Object3D()
            // pivot.position.set(0, 0, 1) // 设置旋转中心为 Z=1
            // group.add(pivot) // 将 pivot 添加到 group
            // // 将旋翼添加到空对象
            // pivot.add(rotorWing)
            // 添加旋翼动画
            const rotateSpeed = 0.1
            animateFunc['take_off'] = () => {
              rotorWing.rotation.z += rotateSpeed
            //   if (rotorWing.rotation.z >= 5) delete animateFunc['take_off']
            }
            // 添加模型
            group.add(helicopter)
            scene.add(group)
            resolve()
          },
          function (xhr) {
            console.log('加载进度：', xhr.loaded / xhr.total)
          },
          function (error) {
            console.log('[加载错误]', error)
          }
        )
      })
    },
    huoquweizhi() {
      console.log('获取位置')
      console.log('camera.position', camera.position)
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
