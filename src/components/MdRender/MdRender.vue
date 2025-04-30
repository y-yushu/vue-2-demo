/* eslint-disable */
<template>
  <div ref="mdContainer"></div>
</template>

<script>
import { YsMdRendering } from '../../static/ys-md-rendering'

export default {
  name: 'MdRender',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  watch: {
    content: {
      handler(newContent) {
        if (this.mdContainer) {
          this.mdContainer.content = newContent
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      mdContainer: null
    }
  },
  mounted() {
    const dom = new YsMdRendering()
    this.mdContainer = dom
    this.$refs.mdContainer.appendChild(dom)
  },
  methods: {}
}
</script>
