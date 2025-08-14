<!--
 * @Description: 
 * @Date: 2021-11-23 14:25:30
 * @LastEditTime: 2021-11-23 16:36:27
 * @FilePath: \jsplumb-test\src\views\antv\x6\components\TestChart.vue
-->
<template>
  <div ref="chartRef" style="width:300px; height: 200px"></div>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'TestChart',
  props: {
    name: String,
  },
  setup(props) {
    const ec = echarts
    const chartRef = ref(null)
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Evaporation'],
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          name: 'Evaporation',

          smooth: true,
        },
      ],
    }

    onMounted(async () => {
      console.log(props.name)
      await nextTick()
      const myChart = ec.init(
        chartRef.value,
        {},
        {
          renderer: 'svg',
        }
      )
      myChart.setOption(option)
    })
    return {
      chartRef
    }
  },
}
</script>

<style>
</style>