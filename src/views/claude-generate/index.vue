<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="上海数字产业发展有限公司" />
      </div>
      <h1 class="header-title">浦速·大模型创新应用</h1>
      <nav class="nav">
        <a href="#" class="nav-item active">首页</a>
        <a href="#" class="nav-item">智能问答</a>
      </nav>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 标题区域 -->
      <section class="hero-section">
        <h1 class="main-title">
          <span class="title-line">浦速·大模型创新应用</span>
          <span class="title-line accent">智能·提效</span>
        </h1>
        <div class="feature-tags">
          <span class="tag">
            <i class="icon-qa"></i>
            智能问答
          </span>
          <span class="tag">
            <i class="icon-analysis"></i>
            自动化数据分析
          </span>
          <span class="tag">
            <i class="icon-doc"></i>
            文档生成
          </span>
        </div>
      </section>

      <!-- 功能卡片区域 -->
      <section class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          class="feature-card"
          @click="handleFeatureClick(feature)"
        >
          <div class="feature-icon">
            <img :src="feature.icon" :alt="feature.title" />
          </div>
          <div class="feature-content">
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
          </div>
          <div class="feature-hover-effect"></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ClaudeGenerate',
  data() {
    return {
      features: [
        {
          id: 1,
          title: 'ChatFile',
          description: '基于用户上传的文档进行问答，更灵活、更准确',
          icon: require('@/assets/icons/icon_chatfile.png'),
          route: '/chat-file'
        },
        {
          id: 2,
          title: 'ChatData',
          description: '自定义数据源，按指令要求自动进行数据分析',
          icon: require('@/assets/icons/icon_chatfile.png'),
          route: '/chat-data'
        },
        {
          id: 3,
          title: 'ChatKG',
          description: '大语言模型结合知识图谱，进行关系挖掘、关联关系分析',
          icon: require('@/assets/icons/icon_chatfile.png'),
          route: '/chat-kg'
        },
        {
          id: 4,
          title: '知识库问答',
          description: '基于构建的知识库进行相关问答查询',
          icon: require('@/assets/icons/icon_chatfile.png'),
          route: '/knowledge-base'
        },
        {
          id: 5,
          title: '写作生成',
          description: '按照"主题"、"关键词"等指令要求自动生成符合特定表述习惯的文稿',
          icon: require('@/assets/icons/icon_chatfile.png'),
          route: '/writing'
        },
        {
          id: 6,
          title: '智能问答',
          description: '快速解答常用问题，提供高效便捷的服务',
          icon: require('@/assets/icons/icon_chatfile.png'),
          route: '/qa'
        }
      ]
    }
  },
  methods: {
    handleFeatureClick(feature) {
      this.$router.push(feature.route)
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0A1128 0%, #1B3C73 100%);
  color: #ffffff;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  padding: 0 48px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 32px;
  margin-right: 16px;
}

.header-title {
  color: #333;
  font-size: 18px;
  font-weight: 500;
  margin-right: auto;
}

.nav {
  display: flex;
  gap: 32px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-item {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #1D6BFF;
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #1D6BFF;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item.active {
  color: #1D6BFF;
}

.nav-item.active::after {
  width: 100%;
}

.main-content {
  padding: 48px;
  max-width: 1440px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 64px;
  animation: fadeInUp 1s ease;
}

.main-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: bold;
  margin-bottom: 32px;
}

.title-line {
  display: block;
  line-height: 1.4;
}

.title-line.accent {
  background: linear-gradient(90deg, #4FC3F7, #00B0FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-tags {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.tag {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(79, 195, 247, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(79, 195, 247, 0.2);
  transform: translateY(-2px);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  padding: 0 24px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: fadeInUp 1s ease;
  animation-fill-mode: both;
}

.feature-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.feature-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.feature-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.feature-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.feature-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(79, 195, 247, 0.1) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .feature-hover-effect {
  opacity: 1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 24px;
  }
  
  .header-title {
    font-size: 16px;
  }
  
  .nav {
    gap: 16px;
  }
  
  .nav-item {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .main-content {
    padding: 24px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .feature-card {
    padding: 24px;
  }
}
</style>
