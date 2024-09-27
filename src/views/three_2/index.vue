<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
    <div style="text-align: center; padding-top: 1rem">
      <button @click="huoquweizhi">获取位置</button>
      <br />
      <button @click="isSpin = true">开始旋转</button>
      <button @click="isSpin = false">停止旋转</button>
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
      // 飞机机翼动画
      isSpin: false
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
      camera.position.x = 8.444
      camera.position.y = 7.244
      camera.position.z = -4.588
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
            const groupAll = new THREE.Group()
            const helicopter = gltf.scene
            console.log('---------------------------------\n', '模型', gltf)
            // ------------------------ 旋翼及旋翼动画
            const rotorGroup = new THREE.Group() // 旋翼组
            // 获取旋翼
            const rotorWing = helicopter.getObjectByName('Object_5')
            rotorWing.material = rotorWing.material.clone()
            rotorWing.material.color.set(0x3742fa)
            // 将尾翼从其原始父对象中移除
            rotorWing.parent.remove(rotorWing)
            const rotorWing2 = rotorWing.clone()
            // 设置立方体的位置，以便包裹旋翼
            const rotorBoundingBox = new THREE.Box3().setFromObject(rotorWing2) // 获取旋翼的边界框
            const center = rotorBoundingBox.getCenter(new THREE.Vector3()) // 获取中心点
            rotorWing2.position.set(-center.x + 0.73, -center.y - 0.2, -center.z - 0.4)
            rotorGroup.rotation.x = -Math.PI / 2
            rotorGroup.position.y = center.z
            rotorGroup.position.x = center.x - 0.73
            const rotateSpeed = -0.05
            animateFunc['take_off'] = () => {
              if (this.isSpin) rotorGroup.rotation.z += rotateSpeed
            }
            // 添加模型 -- 旋翼
            rotorGroup.add(rotorWing2)
            groupAll.add(rotorGroup)
            // ------------------------ 尾翼及尾翼动画
            const empennage = helicopter.getObjectByName('Object_9')
            empennage.material = empennage.material.clone()
            empennage.material.color.set(0x00b355)
            // 添加模型 -- 全部
            groupAll.add(helicopter)
            scene.add(groupAll)
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
