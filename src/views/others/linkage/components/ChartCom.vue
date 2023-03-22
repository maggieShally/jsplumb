<!--
 * @Description: 
 * @Date: 2022-07-15 16:43:48
 * @LastEditTime: 2022-12-02 17:29:53
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\components\ChartCom.vue
-->
<template>
  <ScreenFullCom @onExit="handleExit" :unitKey="unitKey">
    <BaseChart ref="chartRef" :name="`A_${Date.now()}`" :seriesData="seriesData" />
  </ScreenFullCom>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'

import BaseChart from '@/components/BaseChart'
import ScreenFullCom from '@/components/screenFull'

import { countOption } from './ApiChart.data.js'
export default {
  name: 'ChartCom',
  components: {
    BaseChart,
    ScreenFullCom,
  },
  props: {
    unitKey: String
  },
  setup() {
    const chartRef = ref(null)
    const state = reactive({
      seriesData: countOption(),
    })

    const handleExit = () => {
      console.log('handleExit')
      
      chartRef.value.chartRef.chartResize()
    }

    return {
      chartRef,
      ...toRefs(state),
      handleExit
    }
  },
}
</script>

<style>
</style>