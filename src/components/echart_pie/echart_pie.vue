<!--
 * @Description: echart组件封装 学习
 * @Date: 2021-08-04 15:09:25
 * @LastEditTime: 2021-11-19 09:11:32
 * @FilePath: \jsplumb-test\src\components\echart_pie\echart_pie.vue
-->

<template>
  <div :id="`${name}_chart`" class="chart"></div>
</template>

<script>
import { computed, inject, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

import { BASIC_OPTION } from './default_options.js'
import { merge } from 'lodash'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'ChartPie',
  props: {
    name: {
      type: String,
      default: 'ABC'
    },
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
    // const ec = inject('ec')
    // console.log(ec)

    let chart

    const handleWindowResize = () => {
      if (!chart) return false
      chart.resize()
    }

    // merge option配置项
    const assembleDataToOption = () => {
      console.log(props.seriesData)
      return merge(
        {},
        // BASIC_OPTION,
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

    watch(
      () => props.seriesData,
      () => {
        console.log(12)
        updateChartView()
        addChartResizeListener()
      },
      { deep: true }
    )

    onMounted(() => {
      chart = echarts.init(document.querySelector(`#${props.name}_chart`))
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
  min-width: 400px;
  min-height: 400px;
}
</style>