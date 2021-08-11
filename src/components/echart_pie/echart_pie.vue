<!--
 * @Description: echart组件封装 学习
 * @Date: 2021-08-04 15:09:25
 * @LastEditTime: 2021-08-09 11:04:44
 * @FilePath: \jsplumb-test\src\components\echart_pie\Echart_pie.vue
-->

<template>
  <div :id="`${name}_chart`" class="chart"></div>
</template>

<script>
import { computed, inject, onMounted, onUnmounted, watch } from 'vue'
import { BASIC_OPTION } from './default_options.js'
import { merge } from 'lodash'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'ChartPie',
  props: {
    name: String,
    seriesData: {
      type: Object,
      requried: true,
      default: () => ({}),
    },
    extraOption: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const ec = inject('ec')

    const propSeriesData = computed(() => props.seriesData)

    let chart

    const handleWindowResize = () => {
      if (!chart) return false
      chart.resize()
    }

    // merge option配置项
    const assembleDataToOption = () => {
      return merge(
        {},
        BASIC_OPTION,
        {
          ...props.seriesData,
        },
        props.extraOption
      )
    }

    // 更新视图
    const updateChartView = () => {
      if (!chart) return false
      const fullOptoin = assembleDataToOption()
      chart.setOption(fullOptoin, true)
    }

    const addChartResizeListener = () => {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true,
      })
      instance.listenTo(document.querySelector(`#${props.name}_chart`), () => {
        if (!chart) return false
        chart.resize()
      })
    }

    watch(propSeriesData, () => {
      console.log(12)
      updateChartView()
    }, {deep: true})

    onMounted(() => {
      console.log(document.querySelector(`#${props.name}_chart`))
      chart = ec.init(document.querySelector(`#${props.name}_chart`))
      updateChartView()
      window.addEventListener('resize', handleWindowResize)
      addChartResizeListener()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowResize)
    })
  },
}
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
  min-width: 40px;
  min-height: 40px;
}
</style>