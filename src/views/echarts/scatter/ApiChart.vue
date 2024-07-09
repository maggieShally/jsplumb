<!--
 * @Description: 
 * @Date: 2022-07-15 11:20:12
 * @LastEditTime: 2022-07-15 11:29:39
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\ApiChart.vue
-->
<template>
  <div class="chart">
    <BaseChart ref="chartRef" name="apiChart" :seriesData="seriesData" />
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'

import BaseChart from '@/components/BaseChart'
import { countOption } from './ApiChart.data.js'

export default {
  name: 'APIChart',
  components: {
    BaseChart,
  },
  setup() {
    const chartRef = ref(null)
    const state = reactive({
      seriesData: countOption(),
    })

    return {
      chartRef,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.chart {
  height: 400px;
}
</style>