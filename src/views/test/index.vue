<template>
  <div style="padding: 50px">
    <h1>路由测试{{ id }}</h1>
    <button @click="mockUp">模拟跳转</button>
  </div>
</template>

<script>
export default {
  name: 'TextPage',
  beforeRouteUpdate(to, _, next) {
    const id = to?.params?.id || 1
    this.init(id)
    next()
  },
  data() {
    return {
      id: null
    }
  },
  created() {
    const id = this.$route?.params?.id || 1
    this.init(id)
  },
  methods: {
    init(id) {
      this.id = Number(id)
      console.log('页面加载')
    },
    mockUp() {
      const id = this.id + 1
      console.log('模拟跳转', id)
      this.$router.push({
        path: '/test/' + id
      })
    }
  }
}
</script>
