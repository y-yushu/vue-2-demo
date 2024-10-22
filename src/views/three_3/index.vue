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

let sceneAll = null,
  groupL = null,
  groupR = null,
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
      sceneAll = new THREE.Scene()
      // sceneAll.background = new THREE.Color(0x000000)
      sceneAll.background = new THREE.Color(0xf7fac8)
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      // 添加环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3) // 降低强度
      sceneAll.add(ambientLight)
      // 添加定向光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 增加强度
      directionalLight.position.set(100, 100, 100).normalize()
      sceneAll.add(directionalLight)
      // 创建左右旋翼
      groupL = new THREE.Group()
      groupR = new THREE.Group()
      console.log('groupR', groupR)
      // 设置相机视角
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 0
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
      await Promise.all([this.creatUav()])
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update() // 更新控制器
        // 动画
        for (const key in animateFunc) {
          animateFunc[key] && animateFunc[key]()
        }
        renderer.render(sceneAll, camera)
      }
      animate()
    },
    // 引入模型
    creatUav() {
      return new Promise(resolve => {
        // 渲染
        const loader = new GLTFLoader()
        loader.load(
          'static/uav/scene.gltf',
          gltf => {
            const _scene = gltf.scene
            // 左螺旋
            const _left = _scene.getObjectByName('defaultMaterial_7')
            _left.material = _left.material.clone()
            _left.parent.remove(_left)
            const _left2 = _left.clone()
            groupL.add(_left2)
            sceneAll.add(groupL)
            const rotorBoundingBox1 = new THREE.Box3().setFromObject(_left2) // 获取旋翼的边界框
            const center1 = rotorBoundingBox1.getCenter(new THREE.Vector3())
            _left2.position.x = -center1.x
            _left2.position.y = -center1.y
            _left2.position.z = -center1.z
            groupL.position.x = center1.x
            groupL.position.y = center1.y
            groupL.position.z = center1.z
            // 右螺旋
            const _right = _scene.getObjectByName('defaultMaterial_6')
            _right.material = _right.material.clone()
            _right.parent.remove(_right)
            const _right2 = _right.clone()
            groupR.add(_right2)
            sceneAll.add(groupR)
            const rotorBoundingBox2 = new THREE.Box3().setFromObject(_right2) // 获取旋翼的边界框
            const center2 = rotorBoundingBox2.getCenter(new THREE.Vector3())
            _right2.position.x = -center2.x
            _right2.position.y = -center2.y
            _right2.position.z = -center2.z
            groupR.position.x = center2.x
            groupR.position.y = center2.y
            groupR.position.z = center2.z
            // 旋转动画
            const rotateSpeed = 0.1
            animateFunc['take_off'] = () => {
              if (this.isSpin) {
                groupL.rotation.z += rotateSpeed
                groupR.rotation.z += rotateSpeed
              }
            }
            sceneAll.add(_scene)
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
