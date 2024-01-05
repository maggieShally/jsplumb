<!--
 * @Description: 
 * @Date: 2023-04-23 15:28:49
 * @LastEditTime: 2023-11-28 17:09:53
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\TestChart.vue
-->

<template>
  <div class="chart">
    <BaseChart ref="chartRef" name="testChart" :seriesData="seriesData" chartType="treemap" :contextMenuMap="new Map([
      [
        'all',
        [
          {
            label: '查明细',
            onClick: handleCopyItemName.bind(null)
          },
        ],

      ]
    ])" />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick } from 'vue'
import lodash from 'lodash'
import BaseChart from '@/components/BaseChart'

import { treeMapOptions, sankeyOptions } from './data.js'

import { getHightData } from './sankey.utils.js'

export default {
  name: 'Scatter',
  components: {
    BaseChart,
  },
  setup() {
    const state = reactive({
      chartRef: null,
      seriesData: sankeyOptions,
      preActiveData: {
        links: [],
        nodes: []
      }
    })



    const initMethods = () => {
      let chartRef = state.chartRef.chartRef.chart

      chartRef.on('click', async params => {

        if (params.dataType === 'edge') return false

        const options = chartRef.getOption()
        console.log(options.series)
        const { links: selectedLinks, nodes } = getHightData({
          options,
          params,
        })
        options.series[0].links = selectedLinks
        options.series[0].data = nodes
        chartRef.setOption(options)
      })

    }

    const handleCopyItemName = () => {
      const nodeInfo = state.chartRef.chartRef.activeClickNodeInfo
      console.log(nodeInfo)
    }


    onMounted(async () => {
      await nextTick()
      initMethods()

    })

    return {
      ...toRefs(state),
      handleCopyItemName
    }
  },
}
</script>

<style lang="less" scoped>
.chart {
  width: 1500px;
  height: 18850px;
}
</style>
