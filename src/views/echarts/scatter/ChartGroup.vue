<!--
 * @Description: 图表联动——eacharts connect 图表联动 需求 相同 legend
 * @Date: 2022-04-28 10:47:03
 * @LastEditTime: 2023-03-21 14:31:58
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\ChartGroup.vue
-->

<template>
  <div>
    <el-button type="primary" @click="handleShowTips">显示</el-button>
    <div class="chart">
      <BaseChart ref="chartRef1" name="group1" :seriesData="seriesData1" />
    </div>
    <div class="chart">
      <BaseChart ref="chartRef2" name="group2" :seriesData="seriesData2" />
    </div>
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

      // chartRef1.value.chartRef.chart
      //   .getZr()
      //   .on('mouseover', { seriesIndex: 0 }, params => {
      //     let pointInPixel = [params.offsetX, params.offsetY]
      //     let xIndex

      //     // 找到当前点击区域 grid Index
      //     if (
      //       chartRef1.value.chartRef.chart.containPixel('grid', pointInPixel)
      //     ) {
      //       xIndex = chartRef1.value.chartRef.chart.convertFromPixel(
      //         { seriesIndex: 0 },
      //         [params.offsetX, params.offsetY]
      //       )[0]

      //       const xAxisName = chartRef1.value.chartRef.chart.getOption().xAxis[0].data[xIndex]
      //       console.log(xIndex, xAxisName)

      //       const nextDataIndex = chartRef2.value.chartRef.chart.getOption().xAxis[0].data.findIndex(item => item === xAxisName)
      //       console.log(nextDataIndex, chartRef2.value.chartRef.chart.getOption().xAxis[0].data)
            
      //       chartRef2.value.chartRef.chart.dispatchAction({
      //         type: 'showTip',
      //         seriesIndex: 0,
      //         dataIndex: nextDataIndex
      //       })
      //     }
      //   })
    })
    const handleShowTips = () => {
      chartRef1.value.chartRef.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 1,
        dataIndex: 2,
      })
    }

    return {
      chartRef1,
      chartRef2,
      ...toRefs(state),
      handleShowTips,
    }
  },
}
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 400px;
  overflow: auto;
}
</style>