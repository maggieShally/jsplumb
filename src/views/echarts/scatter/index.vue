<!--
 * @Description: echart test
 * @Date: 2022-03-30 09:40:28
 * @LastEditTime: 2024-08-12 15:09:16
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\index.vue
-->

<template>
   <el-tabs v-model="panelName" >
    <el-tab-pane label="散点图分区" name="first">
      <h4>散点图不分区</h4>
      <ScatterChart /> 
    </el-tab-pane>
    <el-tab-pane label="散点图不分区" name="second">
      <h4>散点图不分区</h4>
      <ScatterChartSame />
    </el-tab-pane>

    <el-tab-pane label="图表联动" name="third" lazy>
      <h4>图表联动</h4>
      <ChartGroup v-if="panelName==='third'"/>
    </el-tab-pane>

     <el-tab-pane label="接口图表" name="four" lazy>
      <h4>接口图表</h4>
      <APIChart v-if="panelName==='four'" />
    </el-tab-pane>

     <el-tab-pane label="桑基图表" name="five">
      <h4>桑基图表</h4>
      <TestChart />
    </el-tab-pane>

  </el-tabs>
</template>

<script>
import { reactive, toRefs, computed, provide } from 'vue'
import ScatterChart from './Scatter.vue'
import ScatterChartSame from './Scatter.same.vue'
import ChartGroup from './ChartGroup.vue'
import APIChart from './ApiChart.vue'
import TestChart from './SankeyChart.vue'

export default {
  name: 'EchartTest',
  components: {
    ScatterChart,
    ScatterChartSame,
    ChartGroup,
    APIChart,
    TestChart
  },
  setup() {
    const state = reactive({
      panelName: 'five'
    })

    // const isManual = computed(() => state.panelName === 'second')
    // provide('isManual', isManual)

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style></style>
