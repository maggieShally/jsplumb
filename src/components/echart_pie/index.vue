<!--
 * @Description: 
 * @Date: 2021-08-04 14:24:35
 * @LastEditTime: 2021-09-02 09:39:07
 * @FilePath: \jsplumb-test\src\components\echart_pie\index.vue
-->
<template>
  <VueDragResize
    :w="pos.width"
    :h="pos.height"
    :x="pos.left"
    :y="pos.top"
    :parentH="parentPos.height"
    :parentW="parentPos.width"
    :parentLimitation="true"
    @dragstop="handleDragStop"
    @clicked="handleOnClick"
  >
    <div class="echart-item">
      <div class="drag-operate-group">
        <el-button @click="handleDelItem">删除</el-button>
      </div>
      <el-empty v-if="isSeriesEmpty" :image="emptyImg" />
      <ChartPie v-else v-bind="$props" />
    </div>
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
  props: {
    ...ChartPie.props,
    position: Object,
    parentPos: {
      type: Object,
      default: () => {}
    },
    emptyImg: String
  },
  emits: ['onDragStop', 'onClicked', 'onDelItem'],
  setup(props, context) {
    const isSeriesEmpty = computed(() => {
      return isEmpty(
        props.seriesData.series?.reduce(
          (sum, item) => sum.concat(item.data),
          []
        )
      )
    })

    const pos = computed(() => props.position)

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
      pos,
      isSeriesEmpty,
      handleDragStop,
      handleOnClick,
      handleDelItem,
    }
  },
}
</script>

<style lang="less" scoped>
.echart-item {
  width: 100%;
  height: 100%;
  border: 1px solid #dedede
}
</style>