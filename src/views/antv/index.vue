<!--
 * @Description: 
 * @Date: 2021-08-10 14:03:44
 * @LastEditTime: 2021-08-12 15:36:07
 * @FilePath: \jsplumb-test\src\views\antv\index.vue
-->
<template>
  <div id="mountNode"></div>

</template>

<script>
import { autoChart } from '@antv/chart-advisor'
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'AntvDemo',
  setup() {
    const state = reactive({})

    const data = [
      { f1: '2019-01', f2: 100 },
      { f1: '2019-02', f2: 300 },
      { f1: '2019-03', f2: 340 },
      { f1: '2019-04', f2: 330 },
    ]
    const updateChartView = () => {
      autoChart(document.getElementById('mountNode'), data, {
        toolbar: true,
        development: true,
        // config: {
        //   configs: {
        //     xAxis: {
        //       visible: true,
        //       tickLine: { visible: true },
        //       grid: { visible: true },
        //     },
        //     tooltip: { visible: true },
        //     xField: 'f1',
        //     yField: 'f2',
        //     autoFit: true,
        //     lineStyle: { lineWidth: 3, stroke: '#4e2222', opacity: 0.6 },
        //   },
        //   type: 'Line',
        // },
      })
    }

    onMounted(async () => {
      updateChartView()
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style>
</style>