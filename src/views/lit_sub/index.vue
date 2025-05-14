<template>
  <div class="page">
    <h3>======================</h3>
    <ys-md-rendering :content="content" md-html="false">
      <ys-code-highlight></ys-code-highlight>
      <ys-think></ys-think>
      <ys-mermaid></ys-mermaid>
    </ys-md-rendering>
  </div>
</template>

<script>
import 'ys-md-rendering'
import 'ys-md-rendering/plugin/ys-code-highlight'
import 'ys-md-rendering/plugin/ys-think'
import 'ys-md-rendering/plugin/ys-mermaid'

const mock = `# 测试Mermaid效果

\`\`\`python
def hello_world():
    print("Hello, World!")

hello_world()
\`\`\`

\`\`\`mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
\`\`\`

## <p>123</p>

<think>
暗藏灯带
这个==是思==考的内容这个==是思==考的内容这个==是思==考的内容这个==是思==考的内容这个==是思==考的内容这个==是思==考的内容
151515
</think>
`

export default {
  name: 'LitSub',
  data() {
    return {
      content: mock
    }
  }
}
</script>

<style scoped>
.page {
  padding: 3rem;
}
</style>
