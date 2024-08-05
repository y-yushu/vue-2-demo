<template>
  <div class="main">
    <div id="container"></div>
    <div
      v-if="showContent"
      class="content-menu"
      :style="{
        top: top + 'px',
        left: left + 'px'
      }"
      @click.stop
    >
      <div class="content-item" @click="addChildNode">添加子级</div>
      <div class="content-item">重命名</div>
      <div class="content-item" @click="deleteNode">删除</div>
    </div>
    <div
      v-if="editingNode"
      class="edit-input"
      :style="{
        top: top2 + 'px',
        left: left2 + 'px'
      }"
    >
      <input ref="editInput" v-model="editingNodeName" @blur="finishEdit" @keyup.enter="finishEdit" />
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import G6 from '@antv/g6'
import { mock1 } from './mock'

export default {
  name: 'AntvG6',
  data() {
    return {
      graph: null,
      showContent: false,
      top: 0,
      left: 0,
      node: null,
      editingNode: false,
      editingNodeName: '',
      top2: 0,
      left2: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const container = document.getElementById('container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            {
              type: 'collapse-expand',
              onChange: function onChange(item, collapsed) {
                const data = item.get('model')
                data.collapsed = collapsed
                return true
              }
            }
          ]
        },
        defaultNode: {
          size: 26,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ]
        },
        defaultEdge: {
          type: 'cubic-horizontal'
        },
        layout: {
          type: 'mindmap',
          direction: 'H',
          getHeight: () => 16,
          getWidth: () => 16,
          getVGap: () => 10,
          getHGap: () => 50
        }
      })

      let centerX = 0
      graph.node(function (node) {
        if (node.id === 'root') {
          centerX = node.x
        }
        return {
          label: node.topic, // 使用 topic 作为标签
          labelCfg: {
            position: node.children && node.children.length > 0 ? 'left' : node.x > centerX ? 'right' : 'left',
            offset: 5
          }
        }
      })

      graph.data(mock1)
      graph.render()
      graph.fitView()

      graph.on('node:dblclick', this.startEdit)

      graph.on('node:contextmenu', evt => {
        const node = evt.item
        const model = node.get('model')
        this.showContextMenu(evt, model)
      })

      this.graph = graph
    },

    addChildNode() {
      this.showContent = false
      const parentNode = this.node
      const newId = `node-${nanoid()}`
      const newNode = {
        id: newId,
        topic: newId
      }
      this.graph.updateChild(newNode, parentNode.id)
      this.graph.layout()
    },

    showContextMenu(evt, node) {
      evt.preventDefault()
      this.node = node

      this.left = evt.clientX
      this.top = evt.clientY
      this.showContent = true

      const removeMenu = () => {
        this.showContent = false
        document.removeEventListener('click', removeMenu)
      }

      setTimeout(() => {
        document.addEventListener('click', removeMenu)
      }, 0)
    },

    renameNode(node, newName) {
      node.topic = newName
      this.graph.updateItem(node.id, { label: newName })
    },

    deleteNode() {
      this.showContent = false
      const node = this.node
      this.graph.removeChild(node.id)
    },

    // 开始编辑
    startEdit(e) {
      const node = e.item
      const model = node.get('model')
      const nodeGroup = node.getContainer()
      const labelShape = nodeGroup.findByClassName('node-label')
      console.log('labelShape', labelShape)
      const { x, y } = this.graph.getCanvasByPoint(model.x, model.y)
      this.editingNode = node
      this.editingNodeName = model.topic
      this.left2 = x
      this.top2 = y
      this.$nextTick(() => {
        this.$refs.editInput.focus()
      })
    },
    // 完成编辑
    finishEdit() {
      if (this.editingNode) {
        const newLabel = this.editingNodeName.trim()
        if (newLabel) {
          this.graph.updateItem(this.editingNode, {
            topic: newLabel
          })
        }
        this.editingNode = null
        this.editingNodeName = ''
      }
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 25px;
}
#container {
  margin: 0 25px;
  height: 640px;
  border: 1px solid red;
}
.content-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.content-item {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border: 1px solid #ffffff;
  cursor: pointer;
}
.content-item:hover {
  color: #409eff;
  border: 1px solid #409eff;
}
.content-item:active {
  color: #f56c6c;
}
.edit-input {
  position: absolute;
}
.edit-input input {
  padding: 2px;
  border: 1px solid #1890ff;
  outline: none;
}
</style>
