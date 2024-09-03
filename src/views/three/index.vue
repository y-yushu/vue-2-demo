<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
    <div style="text-align: center">
      <button @click="huoquweizhi">获取位置</button>
      <br />
      <button @click="animate1">视角移动</button>
      <button @click="animate2">开始动画</button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ParticleSystem, {
  Body,
  Color,
  Emitter,
  Life,
  Mass,
  Position,
  RadialVelocity,
  RandomDrift,
  Rate,
  Scale,
  Span,
  SphereZone,
  SpriteRenderer,
  Vector3D,
  ease
} from 'three-nebula'
import dot from '../../assets/dot.png'

let scene = null,
  camera = null,
  renderer = null,
  models2 = null // 飞机模型
// 位置1
const posi1 = {
  position: new THREE.Vector3(-5, 25, -5),
  rotation: new THREE.Euler(0, -2.16, 0)
}
console.log('起始位置', posi1)
const posi2 = {
  position: new THREE.Vector3(-20, 25, -2),
  rotation: new THREE.Euler(0, -3.28, 0)
  // position: new THREE.Vector3(-18, 25, 0),
  // rotation: new THREE.Euler(0, -3.28, 0)
}
console.log('出库1', posi2)
const posi3 = {
  position: new THREE.Vector3(-50, 25, -5),
  rotation: new THREE.Euler(0, -3.14, 0)
}
console.log('出库2', posi3)
const posi4 = {
  position: new THREE.Vector3(-150, 34, -5),
  rotation: new THREE.Euler(0, -3.14, 0.2)
}
console.log('出甲板', posi4)
const posi5 = {
  position: new THREE.Vector3(-240, 80, -5),
  rotation: new THREE.Euler(0, -3.14, 0.2)
}
console.log('飞行终点', posi5)
// 执行方法
let animateFunc = {}
console.log('animateFunc', animateFunc)

export default {
  name: 'ThreePage',
  data() {
    return {
      isFollowingModel: true,
      isTransitioningToDefault: false,
      transitionStartTime: null
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
      scene.background = new THREE.Color(0x000033)
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      // 设置相机视角
      camera.position.x = -110.85
      camera.position.y = 99.26
      camera.position.z = 133.63
      // camera.position.x = 0
      // camera.position.y = 52.2
      // camera.position.z = 0
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      webglcanvas.appendChild(renderer.domElement)
      // 创建光源
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
      // 创建控制组
      function setupOrbitControls(camera, renderer) {
        const controls = new OrbitControls(camera, renderer.domElement)
        // 设置控制器的一些属性
        controls.enableDamping = true // 添加阻尼效果，使动画更平滑
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = false
        controls.minDistance = 1 // 设置相机距离物体的最小距离
        controls.maxDistance = 2000 // 设置相机距离物体的最大距离
        // controls.maxPolarAngle = Math.PI / 2 // 限制垂直旋转角度
        return controls
      }
      const controls = setupOrbitControls(camera, renderer)
      // 引入元素
      await Promise.all([this.createWaterSurface(), this.creatAircraftCarrier(), this.creatJ16()])
      renderer.render(scene, camera)
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
    // 创建j16飞机
    creatJ16() {
      return new Promise(resolve => {
        // 创建一个组来包含模型和粒子效果
        models2 = new THREE.Group()
        scene.add(models2)
        // 渲染
        const loader = new GLTFLoader()
        loader.load(
          'static/shenyang_j16_hidden_dragon/scene.gltf',
          gltf => {
            models2.add(gltf.scene)
            // 调整位置
            models2.position.copy(posi1.position)
            // 调整旋转
            models2.rotation.copy(posi1.rotation)
            // 调整缩放
            models2.scale.set(0.8, 0.8, 0.8)
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
    // 创建航母
    creatAircraftCarrier() {
      return new Promise(resolve => {
        // 渲染
        const loader = new GLTFLoader()
        loader.load(
          'static/aircraft_carrier/scene.gltf',
          gltf => {
            const model = gltf.scene
            // 调整位置
            // model.position.set(0, -10, -20) // 将模型向下移动10单位，向后移动20单位
            // 调整旋转
            model.rotation.y = Math.PI / 2 // 旋转90度，使模型朝向正面
            scene.add(model)
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
    // 创建水面
    createWaterSurface() {
      return new Promise(resolve => {
        // 创建平面几何体
        const geometry = new THREE.PlaneGeometry(1000, 1000)
        // 创建材质
        const material = new THREE.MeshPhongMaterial({
          color: 0x0077be, // 蓝色
          transparent: true, // 启用透明
          opacity: 0.6, // 设置透明度
          side: THREE.DoubleSide // 双面可见
        })
        // 创建网格
        const waterPlane = new THREE.Mesh(geometry, material)
        waterPlane.position.y = 10
        // 旋转平面使其水平
        waterPlane.rotation.x = -Math.PI / 2
        // 将水面添加到场景
        scene.add(waterPlane)
        resolve()
      })
    },
    huoquweizhi() {
      console.log('获取位置')
      console.log('camera.position', camera.position)
    },
    // 动画1 -- 将视角固定到飞机上
    animate1() {
      this.isFollowingModel = true
      this.isTransitioningToDefault = false
      // 最终的视角及焦点
      let defaultCameraPosition = new THREE.Vector3(-271.18, 81.88, 62.5)
      let defaultLookAt = new THREE.Vector3(0, 0, 0)
      // 最终视角移动需要参数
      let transitionProgress = 0
      let transitionDuration = 4000

      // 新增：用于存储开始过渡时的相机状态
      let startCameraPosition = new THREE.Vector3()
      let startCameraLookAt = new THREE.Vector3()
      const updateCamera = () => {
        if (this.isFollowingModel) {
          // 原有的相机跟踪逻辑
          const offset = new THREE.Vector3(20, 10, 10)
          const targetPosition = models2.position.clone().add(offset)
          camera.position.lerp(targetPosition, 0.1)
          camera.lookAt(models2.position)
          // 保留当前视角
          startCameraPosition = camera.position
          startCameraLookAt = models2.position
        } else if (this.isTransitioningToDefault) {
          const currentTime = Date.now()
          const elapsedTime = currentTime - this.transitionStartTime
          transitionProgress = Math.min(elapsedTime / transitionDuration, 1)

          // 插值计算新的相机位置
          camera.position.lerpVectors(startCameraPosition, defaultCameraPosition, transitionProgress)

          // 插值计算新的观察点
          const newLookAt = new THREE.Vector3().lerpVectors(startCameraLookAt, defaultLookAt, transitionProgress)
          camera.lookAt(newLookAt)

          if (transitionProgress === 1) {
            this.isTransitioningToDefault = false
            delete animateFunc['view_1']
          }
        }
      }
      animateFunc['view_1'] = updateCamera
    },
    // 动画2 -- 飞机出库1
    animate2() {
      // 动画参数
      let animationDuration = 2000 // 动画持续时间（毫秒）
      let startTime
      let isAnimating = false
      const startAnimation = () => {
        startTime = Date.now()
        isAnimating = true
      }
      const updateModelPosition = () => {
        if (!isAnimating) return

        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        let progress = Math.min(elapsedTime / animationDuration, 1)

        // 插值计算新的位置
        const newPosition = new THREE.Vector3().lerpVectors(posi1.position, posi2.position, progress)

        // 插值计算新的旋转
        const newRotation = new THREE.Euler(
          THREE.MathUtils.lerp(posi1.rotation.x, posi2.rotation.x, progress),
          THREE.MathUtils.lerp(posi1.rotation.y, posi2.rotation.y, progress),
          THREE.MathUtils.lerp(posi1.rotation.z, posi2.rotation.z, progress)
        )

        // 更新模型的位置和旋转
        models2.position.copy(newPosition)
        models2.rotation.copy(newRotation)

        // 检查动画是否完成
        if (progress === 1) {
          isAnimating = false
          delete animateFunc['move_1']
          this.animate3()
        }
      }
      startAnimation()
      animateFunc['move_1'] = updateModelPosition
    },
    // 动画3 -- 飞机出库2
    animate3() {
      // 动画参数
      let animationDuration = 3000 // 动画持续时间（毫秒）
      let startTime
      let isAnimating = false
      const startAnimation = () => {
        startTime = Date.now()
        isAnimating = true
      }
      const updateModelPosition = () => {
        if (!isAnimating) return

        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        let progress = Math.min(elapsedTime / animationDuration, 1)

        // 插值计算新的位置
        const newPosition = new THREE.Vector3().lerpVectors(posi2.position, posi3.position, progress)

        // 插值计算新的旋转
        const newRotation = new THREE.Euler(
          THREE.MathUtils.lerp(posi2.rotation.x, posi3.rotation.x, progress),
          THREE.MathUtils.lerp(posi2.rotation.y, posi3.rotation.y, progress),
          THREE.MathUtils.lerp(posi2.rotation.z, posi3.rotation.z, progress)
        )

        // 更新模型的位置和旋转
        models2.position.copy(newPosition)
        models2.rotation.copy(newRotation)

        // 检查动画是否完成
        if (progress === 1) {
          isAnimating = false
          delete animateFunc['move_2']
          this.animate4()
          this.animate5()
        }
      }
      startAnimation()
      animateFunc['move_2'] = updateModelPosition
    },
    // 动画4 -- 点火(粒子效果)
    animate4() {
      const createSprite = () => {
        const map = new THREE.TextureLoader().load(dot)
        const material = new THREE.SpriteMaterial({
          map: map,
          color: 0xffaa00, // 更暖的橙色
          blending: THREE.AdditiveBlending,
          fog: true
        })
        return new THREE.Sprite(material)
      }
      const createEmitter = pos => {
        const emitter = new Emitter()
        return (
          emitter
            // 设置粒子的发射率：每秒发射200-300个粒子，每次发射的时间间隔为0.01-0.02秒
            .setRate(new Rate(new Span(200, 300), new Span(0.01, 0.02)))
            .addInitializers([
              // 设置粒子的外观（使用createSprite函数创建的精灵）
              new Body(createSprite()),
              // 设置粒子的质量（影响某些物理行为）
              new Mass(1),
              // 设置粒子的生命周期为0.1到0.3秒
              new Life(0.1, 0.3),
              // 设置粒子的初始位置在半径为0.5的球体区域内
              new Position(new SphereZone(0.5)),
              // 设置粒子的初始速度：速度大小为10-20，方向为(0,0,-1)，即向后喷射
              new RadialVelocity(new Span(10, 20), new Vector3D(-1, 0, 0), 0)
            ])
            .addBehaviours([
              // 设置粒子的缩放行为：初始大小为0.1-0.3，结束时缩小到0
              new Scale(new Span(0.1, 0.3), 0),
              // 设置粒子的颜色变化：从橙色(#ff9933)渐变到红色(#ff0000)和深红(#cc3300)
              new Color('#ff9933', ['#ff0000', '#cc3300'], Infinity, ease.easeOutQuart),
              // 添加轻微的随机漂移，使运动看起来更自然
              new RandomDrift(0.1, 0.1, 0.1, 0.05)
            ])
            // 设置发射器的位置，这里是相对于粒子系统的本地坐标
            .setPosition(pos)
            .emit()
        )
      }
      const system = new ParticleSystem()
      const position1 = {
        x: -16.8,
        y: 2.1,
        z: -0.3
      }
      const position2 = {
        x: -16.8,
        y: 2.1,
        z: -3.5
      }
      system.addEmitter(createEmitter(position1)).addRenderer(new SpriteRenderer(models2, THREE))
      system.addEmitter(createEmitter(position2)).addRenderer(new SpriteRenderer(models2, THREE))
      // 添加粒子效果动画
      animateFunc['lizi_1'] = () => {
        system.update()
      }
    },
    // 动画5 -- 飞出甲板 / 飞向天空
    animate5() {
      const points = [posi3.position, posi4.position, posi5.position]
      const rotations = [posi3.rotation, posi4.rotation, posi5.rotation]
      const durations = [1000, 1000]
      let startTime
      let currentSegment = 0
      let isAnimating = false
      // 开始动画
      const startAnimation = () => {
        startTime = Date.now()
        isAnimating = true
      }
      // 执行动画
      const updateModelPosition = () => {
        if (!isAnimating) return

        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        let progress = Math.min(elapsedTime / durations[currentSegment], 1)

        // 获取当前段的起始和结束点位
        const startPoint = points[currentSegment]
        const endPoint = points[currentSegment + 1]
        const startRotation = rotations[currentSegment]
        const endRotation = rotations[currentSegment + 1]

        // 插值计算新的位置
        const newPosition = new THREE.Vector3().lerpVectors(startPoint, endPoint, progress)

        // 插值计算新的旋转
        const newRotation = new THREE.Euler(
          THREE.MathUtils.lerp(startRotation.x, endRotation.x, progress),
          THREE.MathUtils.lerp(startRotation.y, endRotation.y, progress),
          THREE.MathUtils.lerp(startRotation.z, endRotation.z, progress)
        )

        // 更新模型的位置和旋转
        models2.position.copy(newPosition)
        models2.rotation.copy(newRotation)

        // 检查当前段动画是否完成
        if (progress === 1) {
          currentSegment++
          // 如果还有下一段，继续动画
          if (currentSegment < points.length - 1) {
            startTime = Date.now()
          } else {
            // 所有段都完成，结束动画
            isAnimating = false
            // 这里可以添加动画完成后的回调
            delete animateFunc['move_3']
            this.animate7()
          }
        }
      }
      startAnimation()
      animateFunc['move_3'] = updateModelPosition
    },
    // 动画7 -- 执行完成 视角移动
    animate7() {
      setTimeout(() => {
        this.transitionStartTime = Date.now()
        this.isFollowingModel = false
        this.isTransitioningToDefault = true
      }, 2000)
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
