<template>
  <div class="xlsx-box">
    <div class="content-container">
      <div class="button-grid">
        <button 
          v-for="index in 20" 
          :key="index"
          @click="handleButtonClick(index)"
          @mousemove="handleMouseMove"
          @mouseout="handleMouseOut"
          @click.stop="handleClick"
          :style="buttonStyle"
          :class="[clickAnimationClass, `button-${index}`]"
        >功能 {{index}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'XlsxPage',
  data() {
    return {
      buttonStyle: {},
      clickAnimationClass: '',
      mouseOutTimer: null
    }
  },
  methods: {
    // 按钮点击处理函数
    handleButtonClick(index) {
      // 根据按钮索引调用不同的方法
      const methodName = `method${index}`
      if (this[methodName]) {
        this[methodName]()
      } else {
        console.log(`功能${index}尚未实现`)
      }
    },

    // 20个不同的方法
    method1() {
      console.log('执行方法1')
      this.test() // 原有的Excel处理方法
    },

    method2() {
      console.log('执行方法2')
      // 实现你的方法2逻辑
    },

    method3() {
      console.log('执行方法3')
      // 实现你的方法3逻辑
    },

    method4() {
      console.log('执行方法4')
      // 实现你的方法4逻辑
    },

    method5() {
      console.log('执行方法5')
      // 实现你的方法5逻辑
    },

    // ... 方法6到方法19 ...

    method20() {
      console.log('执行方法20')
      // 实现你的方法20逻辑
    },

    // 原有的Excel处理方法
    test() {
      console.log('开始测试')
      const fileInput = document.createElement('input')
      fileInput.type = 'file'
      fileInput.addEventListener('change', handleFile, false)

      function handleFile(event) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          console.log(jsonData)
          jsonData.splice(0, 1)
          downloadJsonFile(jsonData, 'excelData.json')
        }
        reader.readAsArrayBuffer(file)
      }
      fileInput.click()
    },

    handleMouseMove(e) {
      const rect = e.target.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      this.buttonStyle = {
        '--x': `${x}%`,
        '--y': `${y}%`
      }
    },
    
    handleMouseOut() {
      clearTimeout(this.mouseOutTimer)
      this.mouseOutTimer = setTimeout(() => {
        this.buttonStyle = {}
      }, 200)
    },
    
    handleClick(e) {
      const rect = e.target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // 根据点击位置决定动画效果
      if (y < rect.height / 2) {
        if (x < rect.width / 2) {
          this.clickAnimationClass = 'clicked-top'
        } else {
          this.clickAnimationClass = 'clicked-right'
        }
      } else {
        if (x < rect.width / 2) {
          this.clickAnimationClass = 'clicked-left'
        } else {
          this.clickAnimationClass = 'clicked-bottom'
        }
      }
      
      // 动画结束后移除类名
      setTimeout(() => {
        this.clickAnimationClass = ''
      }, 500)
    },

    handleGridMouseMove(e) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
      e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
    }
  },
  mounted() {
    // 添加鼠标移动跟踪
    const grid = document.querySelector('.button-grid')
    grid.addEventListener('mousemove', this.handleGridMouseMove)
  },
  beforeDestroy() {
    const grid = document.querySelector('.button-grid')
    grid.removeEventListener('mousemove', this.handleGridMouseMove)
  }
}

function downloadJsonFile(data, filename = 'data.json') {
  const jsonString = JSON.stringify(data)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url) // 释放 URL
}
</script>

<style scoped>
.xlsx-box {
  min-height: 100vh;
  width: 100%;
  padding: 0;
  perspective: 1000px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    125deg,
    #1a0f3c,    /* 深紫 */
    #2d0a3c,    /* 深玫瑰红 */
    #1f1f3a,    /* 深蓝紫 */
    #0f2d4a,    /* 深海蓝 */
    #162c2d,    /* 深青 */
    #1c2d0f,    /* 深绿 */
    #2d1f0f,    /* 深橙 */
    #2d0f0f,    /* 深红 */
    #200f2d,    /* 深紫红 */
    #0f1f2d,    /* 深蓝 */
    #1a2d2d,    /* 深青绿 */
    #2d2d0f,    /* 深黄 */
    #2d1a0f,    /* 深橙红 */
    #1f0f2d,    /* 深紫蓝 */
    #0f2d1f,    /* 深绿蓝 */
    #2d1f1f     /* 深红褐 */
  );
  background-size: 400% 400%;
  animation: rgbFlow 20s ease infinite;
  overflow: hidden;
}

@keyframes rgbFlow {
  0% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  25% {
    background-position: 100% 50%;
    filter: hue-rotate(90deg);
  }
  50% {
    background-position: 100% 0%;
    filter: hue-rotate(180deg);
  }
  75% {
    background-position: 0% 100%;
    filter: hue-rotate(270deg);
  }
  100% {
    background-position: 0% 50%;
    filter: hue-rotate(360deg);
  }
}

/* 添加RGB光晕效果 */
.xlsx-box::before,
.xlsx-box::after {
  content: "";
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: 
    radial-gradient(
      circle at center,
      transparent 0%,
      rgba(255, 0, 128, 0.05) 30%,
      rgba(0, 255, 255, 0.05) 60%,
      rgba(128, 0, 255, 0.05) 90%,
      transparent 100%
    );
  animation: rgbSpin 15s linear infinite;
  transform-origin: center center;
  mix-blend-mode: color-dodge;
}

.xlsx-box::after {
  animation: rgbSpin 12s linear infinite reverse;
  background: 
    radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 255, 255, 0.05) 30%,
      rgba(255, 0, 128, 0.05) 60%,
      rgba(128, 255, 0, 0.05) 90%,
      transparent 100%
    );
  mix-blend-mode: screen;
}

@keyframes rgbSpin {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.7;
  }
}

/* 添加RGB扫描线效果 */
.xlsx-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 0, 128, 0.03) 33%,
    rgba(0, 255, 255, 0.03) 66%,
    rgba(128, 0, 255, 0.03) 100%
  );
  background-size: 300% 100%;
  animation: rgbScan 8s linear infinite;
  mix-blend-mode: overlay;
}

@keyframes rgbScan {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: -100% 0%;
  }
}

/* 确保内容容器正确定位并添加玻璃态效果 */
.content-container {
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(2px);
}

/* 更新按钮样式 */
button {
  position: relative;
  z-index: 3;
  margin-right: 1rem;
  padding: 20px 40px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(
    45deg,
    #ff3366,  /* 亮玫红 */
    #ff6b6b,  /* 亮珊瑚 */
    #4ecdc4,  /* 亮青绿 */
    #45b7d1,  /* 亮天蓝 */
    #96c93d,  /* 亮绿 */
    #e5c07b,  /* 亮金 */
    #ff3366   /* 回到起始颜色，形成循环 */
  );
  background-size: 300% 300%;
  animation: buttonGradient 8s ease infinite;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  font-weight: bold;
}

@keyframes buttonGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%), 
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

button:hover {
  transform: scale(1.05) rotate3d(1, 1, 0, 15deg);
  animation: buttonGradient 4s ease infinite, pulse 2s infinite;
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.2),
    0 0 30px rgba(255, 51, 102, 0.4),
    0 0 50px rgba(69, 183, 209, 0.2);
}

button:hover::before {
  opacity: 1;
}

button:active {
  transform: scale(0.95) rotate3d(1, 1, 0, -5deg);
  box-shadow: 
    0 5px 10px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(255, 51, 102, 0.3);
}

button.clicked-top {
  animation: bounce-top 0.5s;
}

button.clicked-bottom {
  animation: bounce-bottom 0.5s;
}

button.clicked-left {
  animation: bounce-left 0.5s;
}

button.clicked-right {
  animation: bounce-right 0.5s;
}

@keyframes bounce-top {
  0%, 100% { 
    transform: translateY(0);
    box-shadow: 0 0 20px rgba(255, 51, 102, 0.3);
  }
  50% { 
    transform: translateY(-10px) rotate3d(1, 0, 0, 20deg);
    box-shadow: 0 20px 30px rgba(255, 51, 102, 0.4);
  }
}

@keyframes bounce-bottom {
  0%, 100% { 
    transform: translateY(0);
    box-shadow: 0 0 20px rgba(69, 183, 209, 0.3);
  }
  50% { 
    transform: translateY(10px) rotate3d(1, 0, 0, -20deg);
    box-shadow: 0 -20px 30px rgba(69, 183, 209, 0.4);
  }
}

@keyframes bounce-left {
  0%, 100% { 
    transform: translateX(0);
    box-shadow: 0 0 20px rgba(150, 201, 61, 0.3);
  }
  50% { 
    transform: translateX(-10px) rotate3d(0, 1, 0, -20deg);
    box-shadow: 20px 0 30px rgba(150, 201, 61, 0.4);
  }
}

@keyframes bounce-right {
  0%, 100% { 
    transform: translateX(0);
    box-shadow: 0 0 20px rgba(229, 192, 123, 0.3);
  }
  50% { 
    transform: translateX(10px) rotate3d(0, 1, 0, 20deg);
    box-shadow: -20px 0 30px rgba(229, 192, 123, 0.4);
  }
}

/* 更新脉冲动画效果 */
@keyframes pulse {
  0% {
    box-shadow: 
      0 0 20px rgba(255, 51, 102, 0.3),
      0 0 40px rgba(69, 183, 209, 0.2);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 51, 102, 0.5),
      0 0 60px rgba(69, 183, 209, 0.3);
  }
  100% {
    box-shadow: 
      0 0 20px rgba(255, 51, 102, 0.3),
      0 0 40px rgba(69, 183, 209, 0.2);
  }
}

/* 保持现有样式不变，添加以下网格布局样式 */

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  width: min(95%, 1400px);
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
  place-items: center;
  perspective: 1000px;
  position: relative;
  overflow: hidden;
}

/* 更新按钮基础样式 */
.button-grid button {
  width: 100%;
  min-width: 160px;
  max-width: 280px;
  height: clamp(50px, 8vh, 70px);
  padding: 0 clamp(10px, 2vw, 20px);
  font-size: clamp(14px, 1.5vw, 16px);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  --wave-delay: calc((var(--row) + var(--col)) * 0.15s);
  animation: 
    buttonAppear 0.5s ease-out backwards,
    waveEffect 3s ease-in-out infinite;
  animation-delay: 
    calc(var(--index) * 0.1s),
    calc(var(--wave-delay) + 0.5s); /* 0.5s是初始延迟 */
}

/* 为不同位置的按钮添加细微的变化 */
.button-grid button:nth-child(4n + 1) {
  --start-color: #ff3366;
  --end-color: #ff6b6b;
}

.button-grid button:nth-child(4n + 2) {
  --start-color: #4ecdc4;
  --end-color: #45b7d1;
}

.button-grid button:nth-child(4n + 3) {
  --start-color: #96c93d;
  --end-color: #e5c07b;
}

.button-grid button:nth-child(4n + 4) {
  --start-color: #45b7d1;
  --end-color: #ff3366;
}

/* 为每个按钮添加稍微不同的动画延迟 */
.button-grid button {
  animation-delay: calc(var(--index) * 0.1s);
}

/* 更新内容容器样式 */
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: clamp(1rem, 3vw, 2rem);
  box-sizing: border-box;
}

/* 添加响应式布局 */
@media (max-width: 600px) {
  .button-grid {
    gap: 1rem;
    padding: 1rem;
  }
  
  .button-grid button {
    font-size: 14px;
    height: 45px;
  }
}

/* 添加按钮出现动画 */
@keyframes buttonAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.button-grid button {
  animation: buttonAppear 0.5s ease-out backwards,
             waveEffect 4s ease-in-out infinite;
  animation-delay: calc(var(--index) * 0.1s);
}

/* 为每个按钮设置不同的初始延迟 */
.button-grid button:nth-child(n) {
  --index: calc(var(--n) - 1);
}

/* 设置20个按钮的具体延迟 */
.button-1 { --n: 1; }
.button-2 { --n: 2; }
.button-3 { --n: 3; }
.button-4 { --n: 4; }
.button-5 { --n: 5; }
.button-6 { --n: 6; }
.button-7 { --n: 7; }
.button-8 { --n: 8; }
.button-9 { --n: 9; }
.button-10 { --n: 10; }
.button-11 { --n: 11; }
.button-12 { --n: 12; }
.button-13 { --n: 13; }
.button-14 { --n: 14; }
.button-15 { --n: 15; }
.button-16 { --n: 16; }
.button-17 { --n: 17; }
.button-18 { --n: 18; }
.button-19 { --n: 19; }
.button-20 { --n: 20; }

/* 添加波浪效果遮罩 */
.button-grid button::before {
  content: '';
  position: absolute;
  top: -150%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 30%,
    transparent 70%
  );
  animation: diagonalWave 4s linear infinite;
  /* 使用新的方式计算动画延迟 */
  animation-delay: calc(var(--index) * 0.1s);
  transform-origin: center;
  pointer-events: none;
}

@keyframes diagonalWave {
  0% {
    transform: translate(-30%, -30%) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(30%, 30%) rotate(360deg);
    opacity: 0;
  }
}

/* 为每个按钮设置行列位置变量 */
.button-grid button:nth-child(5n + 1) { --col: 0; }
.button-grid button:nth-child(5n + 2) { --col: 1; }
.button-grid button:nth-child(5n + 3) { --col: 2; }
.button-grid button:nth-child(5n + 4) { --col: 3; }
.button-grid button:nth-child(5n + 5) { --col: 4; }

.button-grid button:nth-child(-n + 5) { --row: 0; }
.button-grid button:nth-child(n + 6):nth-child(-n + 10) { --row: 1; }
.button-grid button:nth-child(n + 11):nth-child(-n + 15) { --row: 2; }
.button-grid button:nth-child(n + 16):nth-child(-n + 20) { --row: 3; }

/* 添加连续波浪效果 */
.button-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: globalWave 3s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes globalWave {
  0% {
    transform: translate(-100%, -100%) rotate(45deg);
  }
  100% {
    transform: translate(100%, 100%) rotate(45deg);
  }
}

/* 更新按钮悬浮效果 */
.button-grid button:hover {
  transform: scale(1.05) rotate3d(1, 1, 0, 15deg);
  z-index: 10;
  box-shadow: 
    0 clamp(5px, 1vw, 10px) clamp(10px, 2vw, 20px) rgba(0, 0, 0, 0.2),
    0 0 clamp(15px, 3vw, 30px) rgba(255, 255, 255, 0.2);
}

.button-grid button:hover::before {
  animation-play-state: paused;
}

/* 添加自动计算的按钮索引 */
.button-grid button {
  --index: calc(var(--n, 1) - 1);
  animation: buttonAppear 0.5s ease-out backwards,
             waveEffect 4s ease-in-out infinite;
  animation-delay: calc(var(--index) * 0.1s);
}

/* 更新悬浮效果以适应不同尺寸 */
.button-grid button:hover {
  transform: scale(1.05) rotate3d(1, 1, 0, 15deg);
  z-index: 10;
  box-shadow: 
    0 clamp(5px, 1vw, 10px) clamp(10px, 2vw, 20px) rgba(0, 0, 0, 0.2),
    0 0 clamp(15px, 3vw, 30px) rgba(255, 255, 255, 0.2);
}

/* 更新全局波浪效果 */
.button-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: globalWave 3s linear infinite;
  pointer-events: none;
  z-index: 2;
}

/* 添加整体光效 */
.button-grid::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 60%
  );
  animation: rotateLight 8s linear infinite;
  pointer-events: none;
}

@keyframes rotateLight {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 更新波浪效果动画 */
@keyframes waveEffect {
  0% {
    transform: scale(1);
    filter: brightness(1) hue-rotate(0deg);
  }
  50% {
    transform: scale(1.1);
    filter: brightness(1.3) hue-rotate(15deg);
  }
  100% {
    transform: scale(1);
    filter: brightness(1) hue-rotate(0deg);
  }
}

/* 为每个按钮设置位置变量，用于计算波浪延迟 */
.button-grid {
  --total-cols: 5;
  --total-rows: 4;
}

/* 设置按钮的行列位置 */
.button-1 { --row: 0; --col: 4; }  /* 右上角开始 */
.button-2 { --row: 0; --col: 3; }
.button-3 { --row: 0; --col: 2; }
.button-4 { --row: 0; --col: 1; }
.button-5 { --row: 0; --col: 0; }
.button-6 { --row: 1; --col: 4; }
.button-7 { --row: 1; --col: 3; }
.button-8 { --row: 1; --col: 2; }
.button-9 { --row: 1; --col: 1; }
.button-10 { --row: 1; --col: 0; }
.button-11 { --row: 2; --col: 4; }
.button-12 { --row: 2; --col: 3; }
.button-13 { --row: 2; --col: 2; }
.button-14 { --row: 2; --col: 1; }
.button-15 { --row: 2; --col: 0; }
.button-16 { --row: 3; --col: 4; }
.button-17 { --row: 3; --col: 3; }
.button-18 { --row: 3; --col: 2; }
.button-19 { --row: 3; --col: 1; }
.button-20 { --row: 3; --col: 0; }  /* 左下角结束 */

/* 为每个按钮设置不同的基础颜色 */
.button-1 { background: linear-gradient(45deg, #ff3366, #ff6b6b); }
.button-2 { background: linear-gradient(45deg, #ff6b6b, #ffd93d); }
.button-3 { background: linear-gradient(45deg, #ffd93d, #4ecdc4); }
.button-4 { background: linear-gradient(45deg, #4ecdc4, #45b7d1); }
.button-5 { background: linear-gradient(45deg, #45b7d1, #6c5ce7); }
.button-6 { background: linear-gradient(45deg, #6c5ce7, #a8e6cf); }
.button-7 { background: linear-gradient(45deg, #a8e6cf, #ff9a9e); }
.button-8 { background: linear-gradient(45deg, #ff9a9e, #fad0c4); }
.button-9 { background: linear-gradient(45deg, #fad0c4, #f6d365); }
.button-10 { background: linear-gradient(45deg, #f6d365, #fda085); }
.button-11 { background: linear-gradient(45deg, #fda085, #f5576c); }
.button-12 { background: linear-gradient(45deg, #f5576c, #4facfe); }
.button-13 { background: linear-gradient(45deg, #4facfe, #00f2fe); }
.button-14 { background: linear-gradient(45deg, #00f2fe, #43e97b); }
.button-15 { background: linear-gradient(45deg, #43e97b, #38f9d7); }
.button-16 { background: linear-gradient(45deg, #38f9d7, #fa709a); }
.button-17 { background: linear-gradient(45deg, #fa709a, #fee140); }
.button-18 { background: linear-gradient(45deg, #fee140, #30cfd0); }
.button-19 { background: linear-gradient(45deg, #30cfd0, #330867); }
.button-20 { background: linear-gradient(45deg, #330867, #a8edea); }

/* 添加按钮的光效遮罩 */
.button-grid button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.button-grid button:hover::before {
  opacity: 1;
}

/* 添加全局波浪效果 */
.button-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform-origin: top right;
  animation: globalWave 6s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes globalWave {
  0% {
    transform: translate(-100%, -100%) rotate(45deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(100%, 100%) rotate(45deg);
    opacity: 0;
  }
}
</style>
