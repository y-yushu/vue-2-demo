<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'ThreePage',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      tileGroup: null,
      loadedTiles: new Map(),
      currentZoom: 3,
      tileSize: 256 // 假设每个瓦片是256x256像素
    }
  },
  mounted() {
    this.initThree()
    this.animate()
    window.addEventListener('resize', this.onWindowResize, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
    this.controls.removeEventListener('change', this.updateVisibleTiles)
  },
  methods: {
    initThree() {
      const container = document.getElementById('webglcanvas')
      const width = container.clientWidth
      const height = container.clientHeight

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(width, height)
      container.appendChild(this.renderer.domElement)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.25
      this.controls.screenSpacePanning = false
      this.controls.maxPolarAngle = Math.PI / 2
      this.controls.addEventListener('change', this.updateVisibleTiles)

      this.camera.position.set(0, 5, 5)
      this.controls.update()

      this.tileGroup = new THREE.Group()
      this.scene.add(this.tileGroup)

      this.updateVisibleTiles()
    },
    updateVisibleTiles() {
      const frustum = new THREE.Frustum()
      const projScreenMatrix = new THREE.Matrix4()
      projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
      frustum.setFromProjectionMatrix(projScreenMatrix)

      // 计算当前缩放级别
      const distance = this.camera.position.distanceTo(this.controls.target)
      this.currentZoom = Math.floor(Math.log2(29000 / distance)) + 3
      this.currentZoom = Math.max(3, Math.min(3, this.currentZoom))

      const visibleTiles = this.getVisibleTiles(frustum)

      // 移除不可见的瓦片
      for (const [key, tile] of this.loadedTiles) {
        if (!visibleTiles.has(key)) {
          this.tileGroup.remove(tile)
          this.loadedTiles.delete(key)
        }
      }

      // 加载可见的瓦片
      for (const key of visibleTiles) {
        if (!this.loadedTiles.has(key)) {
          const [x, y, zoom] = key.split(',').map(Number)
          this.loadTile(x, y, zoom)
        }
      }
    },
    getVisibleTiles(frustum) {
      const visibleTiles = new Set()
      const tileRange = Math.pow(2, this.currentZoom)

      for (let x = 0; x < tileRange; x++) {
        for (let y = 0; y < tileRange; y++) {
          const worldX = (x / tileRange - 0.5) * 2
          const worldY = (y / tileRange - 0.5) * 2
          const tilePosition = new THREE.Vector3(worldX, 0, -worldY)

          if (frustum.containsPoint(tilePosition)) {
            visibleTiles.add(`${x},${y},${this.currentZoom}`)
          }
        }
      }

      return visibleTiles
    },
    loadTile(x, y, zoom) {
      const tileKey = `${x},${y},${zoom}`
      const loader = new THREE.TextureLoader()
      const tileUrl = `/map/terrain/${zoom}/${x}/${y}.png`

      loader.load(
        tileUrl,
        texture => {
          const size = 1 / Math.pow(2, zoom - 3)
          const geometry = new THREE.PlaneGeometry(size, size)
          const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
          const tile = new THREE.Mesh(geometry, material)

          const worldX = (x / Math.pow(2, zoom) - 0.5) * 2
          const worldY = (y / Math.pow(2, zoom) - 0.5) * 2
          tile.position.set(worldX, 0, -worldY)
          tile.rotation.x = -Math.PI / 2

          this.tileGroup.add(tile)
          this.loadedTiles.set(tileKey, tile)
        },
        undefined,
        error => {
          console.error('An error occurred while loading the tile:', error)
        }
      )
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize() {
      const container = document.getElementById('webglcanvas')
      const width = container.clientWidth
      const height = container.clientHeight

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
      this.updateVisibleTiles()
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
