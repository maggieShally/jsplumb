<!--
 * @Description: 
 * @Date: 2023-04-23 15:28:49
 * @LastEditTime: 2023-05-26 15:49:06
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\TestChart.vue
-->

<template>

  <div class="chart">
    <BaseChart ref="chartRef" name="testChart" :seriesData="seriesData" />
  </div>

</template>

<script>
import { reactive, toRefs, onMounted, nextTick } from 'vue'
import BaseChart from '@/components/BaseChart'

import { treeMapOptions } from './data.js'
export default {
  name: 'Scatter',
  components: {
    BaseChart,
  },
  setup() {
    const state = reactive({
      chartRef: null,
      seriesData: treeMapOptions,
    })



    const initMethods = () => {
      state.chartRef.chartRef.chart.on('click', params => {
        console.log(params)
        console.log(state.chartRef.chartRef.chart.getOption())
      //   state.chartRef.chartRef.chart.dispatchAction({
      //   type: 'highlight',
      //   seriesId: params.seriesId
      // })
      })
    }

    onMounted(async () => {
      await nextTick()
      initMethods()
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.chart {
  width: 1000px;
  height: 600px;
}
</style>
