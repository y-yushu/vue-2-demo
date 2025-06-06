<template>
  <div class="three-page">
    <div id="webglcanvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'

// 有水波效果的球

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
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x050505)
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 100
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)

      const uniforms = {
        amplitude: { value: 1.0 },
        color: { value: new THREE.Color(0xff2200) },
        colorTexture: { value: new THREE.TextureLoader().load('static/water.jpg') }
      }
      uniforms['colorTexture'].value.wrapS = uniforms['colorTexture'].value.wrapT = THREE.RepeatWrapping
      const vertexshader = `uniform float amplitude;
attribute float displacement;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
  vNormal = normal;
  vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );
  vec3 newPosition = position + amplitude * normal * vec3( displacement );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}`
      const fragmentshader = `varying vec3 vNormal;
varying vec2 vUv;
uniform vec3 color;
uniform sampler2D colorTexture;
void main() {
  vec3 light = vec3( 0.5, 0.2, 1.0 );
  light = normalize( light );
  float dProd = dot( vNormal, light ) * 0.5 + 0.5;
  vec4 tcolor = texture2D( colorTexture, vUv );
  vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11 ), 1.0 );
  gl_FragColor = gray * vec4( vec3( dProd ) * vec3( color ), 1.0 );
}`
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexshader,
        fragmentShader: fragmentshader
      })
      const radius = 50,
        segments = 128,
        rings = 64
      const geometry = new THREE.SphereGeometry(radius, segments, rings)
      const displacement = new Float32Array(geometry.attributes.position.count)
      let noise = new Float32Array(geometry.attributes.position.count)
      for (let i = 0; i < displacement.length; i++) {
        noise[i] = Math.random() * 5
      }
      geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 1))
      const sphere = new THREE.Mesh(geometry, shaderMaterial)
      scene.add(sphere)
      const render = () => {
        const time = Date.now() * 0.01
        sphere.rotation.y = sphere.rotation.z = 0.01 * time
        uniforms['amplitude'].value = 2.5 * Math.sin(sphere.rotation.y * 0.125)
        uniforms['color'].value.offsetHSL(0.0005, 0, 0)
        for (let i = 0; i < displacement.length; i++) {
          displacement[i] = Math.sin(0.1 * i + time)
          noise[i] += 0.5 * (0.5 - Math.random())
          noise[i] = THREE.MathUtils.clamp(noise[i], -5, 5)
          displacement[i] += noise[i]
        }
        sphere.geometry.attributes.displacement.needsUpdate = true
        renderer.render(scene, camera)
      }
      const animate = () => {
        render()
      }
      renderer.setAnimationLoop(animate)
      canvas.appendChild(renderer.domElement)
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
