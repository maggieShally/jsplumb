<!--
 * @Description: 图表联动——eacharts connect 图表联动 需求 相同 legend
 * @Date: 2022-04-28 10:47:03
 * @LastEditTime: 2022-05-25 17:46:36
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\ChartGroup.vue
-->

<template>
  <div class="chart">
    <BaseChart ref="chartRef1" name="group1" :seriesData="seriesData1" />
    <BaseChart ref="chartRef2" name="group2" :seriesData="seriesData2" />
  </div>
</template>

<script>
import { nextTick, onMounted, reactive, toRefs, ref, unref, inject } from 'vue'
import * as echarts from 'echarts'

import BaseChart from '@/components/BaseChart'
import { options1, options2 } from './ChartGroup.data'

export default {
  name: 'ChartGroup',
  components: {
    BaseChart,
  },
  setup() {
    const chartRef1 = ref(null)
    const chartRef2 = ref(null)
    const state = reactive({
      seriesData1: options1,
      seriesData2: options2,
    })

    onMounted(async () => {
      await nextTick()

      chartRef1.value.chartRef.chart.on('updateAxisPointer', function (event) {
        
        const xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1
          chartRef1.value.chartRef.chart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)',
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          })
        }
      })

      echarts.connect([
        unref(chartRef1).chartRef.chart,
        unref(chartRef2).chartRef.chart,
      ])
    })

    return {
      chartRef1,
      chartRef2,
      ...toRefs(state),
    }
  },
}
</script>

<style>
</style>