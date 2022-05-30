<!--
 * @Description: 
 * @Date: 2021-11-12 09:15:50
 * @LastEditTime: 2022-04-28 11:22:13
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6\components\BaseChart.vue
-->
<template>
  <div class="chart-node">
    <ChartPie v-bind="$props" ref="chartRef" />
    <span v-if="!isLeaf" class="node-btn" @click="handleClick"> {{isCollapsed ? '收' : '展'}} </span>
  </div>

</template>

<script>
import { onMounted, watch, reactive, toRefs, ref } from 'vue'

import ChartPie from './ChartPie.vue'
export default {
  name: 'BaseChart',
  components: {
    ChartPie,
  },
  props: {
    ...ChartPie.props,
    isLeaf: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onToggle'],
  setup(props, context) {
    const chartRef = ref(null)
    const state = reactive({
      isCollapsed: props.collapsed
    })

    const handleClick = () => {
      state.isCollapsed = !state.isCollapsed
      context.emit('onToggle', chartRef.value.currentNode, state.isCollapsed)
    }

    watch(() => props.collapsed, val => {
      console.log(val)
    })

    return {
      ...toRefs(state),
      chartRef,
      handleClick,
    }
  },
}
</script>

<style scoped lang="less">
.chart-node {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 500px;
  border: 1px solid #ddd;
  .node-btn {
    position: absolute;
    left: 100%;
    top: 50%;
    display: inline-block;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
}

</style>
