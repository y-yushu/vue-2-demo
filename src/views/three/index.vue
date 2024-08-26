<template>
  <div class="three-page">
    <canvas id="webglcanvas"></canvas>
    <div @mousedown="startTrigger" @mouseup="stopTrigger" @mouseleave="stopTrigger">Hold me</div>
  </div>
</template>

<script>
import * as THREE from 'three'
// import ImageMap from '../../assets/threeImage/map.png'

export default {
  name: 'ThreePage',
  data() {
    return {
      animationFrameId: null,
      isTriggering: false,
      cube: null
    }
  },
  mounted() {
    console.log('THREE', THREE)
    this.init()
  },
  methods: {
    init() {
      const canvas = document.getElementById('webglcanvas')
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)

      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      this.cube = cube
      scene.add(cube)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas
      })
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      const animate = () => {
        requestAnimationFrame(animate)
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.01
        renderer.render(scene, camera)
      }
      animate()
    },
    triggerAction() {
      console.log('Action triggered')
      // 在这里添加你希望持续执行的逻辑
      if (this.cube) {
        this.cube.rotation.x += 0.03
        this.cube.rotation.y += 0.03
      }
      // 继续下一个动画帧
      if (this.isTriggering) {
        this.animationFrameId = requestAnimationFrame(this.triggerAction)
      }
    },
    startTrigger() {
      // 开始持续触发
      this.isTriggering = true
      this.triggerAction() // 启动动画循环
    },
    stopTrigger() {
      // 停止持续触发
      this.isTriggering = false
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
        this.animationFrameId = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.three-page {
  padding: 30px;
}
#webglcanvas {
  width: 100%;
  aspect-ratio: 3 / 1;
  background: pink;
}
</style>
