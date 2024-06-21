<!--
 * @Description: 散点图
 * @Date: 2022-03-30 09:41:18
 * @LastEditTime: 2024-05-15 14:13:24
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\Scatter.vue
-->
<template>
  
  <div class="chart">
    <BaseChart ref="chartRef" name="scatter" :seriesData="seriesData" />
  </div>

</template>

<script>

import { reactive, toRefs, onMounted } from 'vue'
import BaseChart from '@/components/BaseChart'

import {  scatterOption } from './data.js'
export default {
  name: 'Scatter',
  components: {
    BaseChart
  },
  setup() {

    const state = reactive({
      chartRef: null,
      seriesData: scatterOption,
      activeDataIndex: ''
    })  


    const highlight = params => {
      console.log(params)
        const dataIndex = state.activeDataIndex
        dataIndex && state.chartRef.chartRef.chart.dispatchAction({
          type: 'downplay',
          dataIndex: dataIndex,
        })

        state.activeDataIndex = params.dataIndex

        state.chartRef.chartRef.chart.dispatchAction({
          type: 'highlight',
          dataIndex: params.dataIndex,
        })
    }

    const selected = params => {
      console.log('select')
      const currentDataIndex = params.dataIndex
      const oldDataIndex = state.activeDataIndex
      state.activeDataIndex = currentDataIndex === oldDataIndex ? '' : currentDataIndex
     
      state.chartRef.chartRef.chart.dispatchAction({
        type: currentDataIndex === oldDataIndex ? 'unselect' : 'select',
        dataIndex: currentDataIndex,
      })

    }


    const initMethods = () => {
      state.chartRef.chartRef?.chart?.on('click', params => {
        // highlight(params)
        selected(params)

      })
    }

    onMounted(() => {
      initMethods()
    })

    return {
      ...toRefs(state)
    }
    
  }
}
</script>

<style lang="less" scoped>
.chart {
  width: 1000px;
  height: 600px;
}
</style>
