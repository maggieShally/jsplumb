<!--
 * @Description: 不分区
 * @Date: 2022-03-30 14:59:56
 * @LastEditTime: 2022-03-31 09:15:29
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\Scatter.same.vue
-->
<template>
  <div class="chart">
    <BaseChart ref="chartRef" name="scatterSame" :seriesData="seriesData" />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import BaseChart from '@/components/BaseChart'

import { scatterOption, dataAll } from './data.same.js'
export default {
  name: 'ScatterChartSame',
  components: {
    BaseChart
  },
  setup() {
    const state = reactive({
      chartRef: null,
      seriesData: scatterOption,
      activeDataIndex: '',
      activeLastDataIndexList: ''
    })

    const selected = params => {
      console.log(params)
      debugger
      const oldDataIndex = state.activeDataIndex
      const currentDataIndex = params.dataIndex
      const currentItemNo = dataAll[currentDataIndex].itemNo
      state.activeDataIndex =
        currentDataIndex === oldDataIndex ? '' : currentDataIndex

      let dataIndexList = []
      dataAll.forEach((item, index) => {
        if (item.itemNo === currentItemNo) {
          dataIndexList.push(index)
        }
      })
      console.log(dataIndexList)

      state.chartRef.chartRef.chart.dispatchAction({
        type: currentDataIndex === oldDataIndex ? 'unselect' : 'select',
        dataIndex: dataIndexList
      })

      if (!state.activeLastDataIndexList.includes(currentDataIndex)) {
        state.chartRef.chartRef.chart.dispatchAction({
          type: 'unselect',
          dataIndex: state.activeLastDataIndexList
        })
      }

      state.activeLastDataIndexList = dataIndexList
    }

    const initMethods = () => {
      state.chartRef.chartRef.chart.on('click', params => {
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
