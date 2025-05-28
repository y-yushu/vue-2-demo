<template>
  <div>
    <div class="container">
      <div v-for="(item, i) in list" :key="i" class="item">
        <h3>{{ item.title }}</h3>
        <div class="box">
          <YsSemiring
            :percentage="item.percentage"
            :divider="item.divider"
            :isShowIndicator="item.isShowIndicator"
            :dividerWidth="item.dividerWidth"
            :indicatorSize="item.indicatorSize"
            :indicatorOffset="item.indicatorOffset"
            :backgroundColor="item.backgroundColor"
            :progressColor="item.progressColor"
            :highlightColor="item.highlightColor"
            :intervalColor="item.intervalColor"
          >
            <template v-if="item.hasSlot">
              <div v-if="item.hasSlot === '节点A'" class="aaa">节点A</div>
              <div v-else class="bbb">{{ item.hasSlot }}</div>
            </template>
          </YsSemiring>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YsSemiring from './components/ys-semiring.vue'

export default {
  name: 'SvgRender',
  components: { YsSemiring },
  data() {
    return {
      // 进度
      list: [
        { title: '基础使用', percentage: 0.1 },
        { title: '两段分割', percentage: 0.2, divider: 2 },
        { title: '七段分割', percentage: 0.3, divider: 7, isShowIndicator: true },
        { title: '切换颜色', percentage: 0.4, backgroundColor: '#B6B6B6', progressColor: '#67C23A' },
        { title: '开指示器', percentage: 0.5, isShowIndicator: true },
        { title: '三段分割开指示器', percentage: 0.6, divider: 3, isShowIndicator: true },
        { title: '指示器变色', percentage: 0.6, isShowIndicator: true, highlightColor: '#F56C6C' },
        { title: '分割线变色', percentage: 0.7, isShowIndicator: true, intervalColor: '#000000' },
        { title: '指示器偏移', percentage: 0.8, isShowIndicator: true, indicatorOffset: 40 },
        { title: '分割线加宽', percentage: 0.9, isShowIndicator: true, dividerWidth: 30, intervalColor: '#E6A23C' },
        { title: '指示器大偏', percentage: 0.95, isShowIndicator: true, indicatorOffset: 160 },
        { title: '指示器放大', percentage: 0.5, isShowIndicator: true, indicatorSize: 120 },
        { title: '指示器缩小', percentage: 0.44, isShowIndicator: true, indicatorSize: 60 },
        { title: '添加节点1', percentage: 0.12, hasSlot: '节点A' },
        { title: '添加节点2', percentage: 0.75, hasSlot: '节点B' }
      ]
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped>
.container {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 1rem;
}

.item {
  border: 1px solid #ccc;
}

.box {
  width: 300px;
  height: 200px;
}

.aaa {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: yellowgreen;
}

.bbb {
  font-weight: bold;
  color: red;
}
</style>
