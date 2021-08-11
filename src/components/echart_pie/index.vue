<!--
 * @Description: 
 * @Date: 2021-08-04 14:24:35
 * @LastEditTime: 2021-08-09 11:48:14
 * @FilePath: \jsplumb-test\src\components\echart_pie\index.vue
-->
<template>
    <VueDragResize :w="400" :h="400" :parentH="700" :parentW="1220" :parentLimitation="true" @dragstop="handleDragStop" @clicked="handleOnClick">
      <div class="drag-operate-group">
        <el-button @click="handleDelItem">删除</el-button>
      </div>
      <el-empty v-if="isSeriesEmpty" description="暂无数据" />
      <ChartPie v-else v-bind="$props" />
    </VueDragResize>
</template>

<script>
import { computed } from '@vue/runtime-core'
import ChartPie from './echart_pie.vue'
import { isEmpty } from 'lodash'
import VueDragResize from 'vue-drag-resize'

export default {
  name: 'EchartPie',
  components: {
    ChartPie,
    VueDragResize,
  },
  props: ChartPie.props,
  emits: ['onDragStop', 'onClicked', 'onDelItem'],
  setup(props, context) {
    const isSeriesEmpty = computed(() => {
      return isEmpty(
        props.seriesData.series?.reduce((sum, item) => sum.concat(item.data), [])
      )
    })

    const handleDragStop = obj => {
      context.emit('onDragStop', obj)
    }

    const handleOnClick = () => {
      context.emit('onClicked')
    }

    const handleDelItem = () => {
      context.emit('onDelItem')
    }

    return {
      isSeriesEmpty,
      handleDragStop,
      handleOnClick,
      handleDelItem
    }
  },
}
</script>

<style lang="less" scoped>
  .drag-chart-wrap {
    display: inline-block;
  }
</style>