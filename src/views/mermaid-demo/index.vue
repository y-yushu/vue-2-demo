<template>
  <div>
    <textarea v-model="content" rows="20"></textarea>
    <br />
    <button @click="torender">测试</button>
    <div v-html="html" class="mermaid_01"></div>
  </div>
</template>

<script>
import mermaid from 'mermaid'
const mock = `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit`

export default {
  name: 'MermaidDemo',
  data() {
    return {
      content: mock,
      html: ''
    }
  },
  mounted() {},
  methods: {
    torender() {
      mermaid.render('mermaid_01', this.content).then(res => {
        this.html = res.svg
      })
    }
  }
}
</script>

<style scoped>
.mermaid_01 {
  min-width: 200px;
  min-height: 200px;
  border: 1px solid red;
}
</style>
