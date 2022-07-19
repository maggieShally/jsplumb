<!--
 * @Description: 
 * @Date: 2022-07-15 16:43:48
 * @LastEditTime: 2022-07-15 16:48:39
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\components\ChartCom.vue
-->
<template>
  <BaseChart ref="chartRef" :name="`A_${Date.now()}`" :seriesData="seriesData" />
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

<style>
</style>