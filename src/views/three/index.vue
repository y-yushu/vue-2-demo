<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
    <button @click="test1">测试1</button>
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
  renderer = null

export default {
  name: 'ThreePage',
  data() {
    return {
      ismove: false
    }
  },
  mounted() {
    this.creatBasics()
  },
  methods: {
    // 创建 场景、相机和渲染器
    creatBasics() {
      // 操作元素
      const webglcanvas = document.getElementById('webglcanvas')
      const width = webglcanvas.offsetWidth
      const height = webglcanvas.offsetHeight
      // 设置场景、相机和渲染器
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000033)
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      webglcanvas.appendChild(renderer.domElement)
      Promise.all([this.creatJ16(), this.creatAircraftCarrier()]).then(funcs => {
        const animate = () => {
          requestAnimationFrame(animate)
          funcs.forEach(func => func && func())
          renderer.render(scene, camera)
        }
        animate()
      })
    },
    // 创建j16飞机
    creatJ16() {
      return new Promise(call => {
        camera.position.z = 200

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
        // 创建一个组来包含模型和粒子效果
        const groupModelAndParticles = new THREE.Group()
        scene.add(groupModelAndParticles)

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

        system.addEmitter(createEmitter(position1)).addRenderer(new SpriteRenderer(groupModelAndParticles, THREE))
        system.addEmitter(createEmitter(position2)).addRenderer(new SpriteRenderer(groupModelAndParticles, THREE))

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

        // 渲染
        const loader = new GLTFLoader()
        loader.load(
          'static/shenyang_j16_hidden_dragon/scene.gltf',
          gltf => {
            console.log('gltf.scene', gltf.scene)
            groupModelAndParticles.add(gltf.scene)
            // scene.add(gltf.scene)
            renderer.render(scene, camera)
            // // 在您的动画循环中更新控制器
            // const animate = () => {
            //   requestAnimationFrame(animate)
            //   // 位置移动
            //   if (this.ismove && groupModelAndParticles.position.x < 200) {
            //     groupModelAndParticles.position.x += 0.5
            //   }
            //   controls.update() // 更新控制器
            //   system.update() // 更新粒子系统
            //   renderer.render(scene, camera)
            // }
            // animate()
            call(() => {
              controls.update() // 更新控制器
              system.update() // 更新粒子系统
            })
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
      return new Promise(call => {
        // 渲染
        const loader = new GLTFLoader()
        loader.load(
          'static/aircraft_carrier/scene.gltf',
          gltf => {
            console.log('gltf.scene', gltf.scene)
            scene.add(gltf.scene)
            renderer.render(scene, camera)
            call()
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
    runAnimate() {},
    test1() {
      // this.ismove = !this.ismove
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
