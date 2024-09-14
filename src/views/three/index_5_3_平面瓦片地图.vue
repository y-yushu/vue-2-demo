<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let scene, camera, renderer, controls
const tileSize = 256 // 标准瓦片大小
const tilesGroup = new THREE.Group()
let webglcanvas

export default {
  name: 'ThreePage',
  data() {
    return {
      minZoom: 4,
      maxZoom: 5,
      currentZoom: 4,
      centerLat: 24, // 台湾海峡纬度
      centerLon: 120 // 台湾海峡经度
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      webglcanvas = document.getElementById('webglcanvas')
      const width = webglcanvas.offsetWidth
      const height = webglcanvas.offsetHeight

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xf0f0f0)

      camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
      camera.position.set(0, 0, 10)
      camera.lookAt(0, 0, 0)

      renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      webglcanvas.appendChild(renderer.domElement)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableRotate = false
      controls.enableZoom = true
      controls.enablePan = true
      controls.panSpeed = 0.5
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
      }

      controls.addEventListener('change', this.onControlsChange)
      controls.addEventListener('end', this.onControlsEnd)

      scene.add(tilesGroup)

      this.updateTiles()

      window.addEventListener('resize', this.onWindowResize)

      this.animate()
    },
    animate() {
      requestAnimationFrame(this.animate)
      controls.update()
      renderer.render(scene, camera)
    },
    updateTiles() {
      // 清除现有瓦片
      while (tilesGroup.children.length > 0) {
        const tile = tilesGroup.children[0]
        tilesGroup.remove(tile)
        if (tile.material.map) tile.material.map.dispose()
        tile.material.dispose()
        tile.geometry.dispose()
      }

      const [centerX, centerY] = this.latLonToTile(this.centerLat, this.centerLon, this.currentZoom)

      const tilesX = Math.ceil(renderer.domElement.width / tileSize) + 1
      const tilesY = Math.ceil(renderer.domElement.height / tileSize) + 1

      const maxTiles = Math.pow(2, this.currentZoom)

      for (let x = -Math.floor(tilesX / 2); x <= Math.floor(tilesX / 2); x++) {
        for (let y = -Math.floor(tilesY / 2); y <= Math.floor(tilesY / 2); y++) {
          const tileX = (centerX + x + maxTiles) % maxTiles
          const tileY = (centerY + y + maxTiles) % maxTiles
          this.loadTile(tileX, tileY, this.currentZoom, x, y)
        }
      }
    },
    loadTile(x, y, zoom, offsetX, offsetY) {
      const loader = new THREE.TextureLoader()
      const url = `/map/terrain/${zoom}/${x}/${y}.png`

      loader.load(
        url,
        texture => {
          const material = new THREE.MeshBasicMaterial({ map: texture })
          const geometry = new THREE.PlaneGeometry(tileSize, tileSize)
          const tile = new THREE.Mesh(geometry, material)

          tile.position.set(offsetX * tileSize, -offsetY * tileSize, 0)

          tilesGroup.add(tile)
        },
        undefined,
        error => {
          console.error('An error happened while loading the tile:', error)
          // 可以在这里添加加载失败的处理逻辑，比如显示一个占位图片
        }
      )
    },
    latLonToTile(lat, lon, zoom) {
      const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom))
      const y = Math.floor(((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, zoom))
      return [x, y]
    },
    onControlsChange() {
      const newZoom = this.calculateZoom()
      if (newZoom !== this.currentZoom) {
        this.currentZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom))
        this.updateTiles()
      }
    },
    onControlsEnd() {
      this.updateTiles()
    },
    calculateZoom() {
      const width = renderer.domElement.width
      const height = renderer.domElement.height
      const fov = camera.top - camera.bottom
      return Math.max(this.minZoom, Math.min(this.maxZoom, Math.floor(Math.log2((360 * Math.min(width, height)) / fov / tileSize))))
    },
    onWindowResize() {
      const width = webglcanvas.offsetWidth
      const height = webglcanvas.offsetHeight

      camera.left = width / -2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = height / -2
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      this.updateTiles()
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
