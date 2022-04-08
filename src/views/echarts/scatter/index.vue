<!--
 * @Description: echart test
 * @Date: 2022-03-30 09:40:28
 * @LastEditTime: 2022-03-30 17:01:35
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
  </el-tabs>
</template>

<script>
import { reactive, toRefs, computed, provide } from 'vue'
import ScatterChart from './Scatter.vue'
import ScatterChartSame from './Scatter.same.vue'

export default {
  name: 'EchartTest',
  components: {
    ScatterChart,
    ScatterChartSame
  },
  setup() {
    const state = reactive({
      panelName: 'second'
    })

    const isManual = computed(() => state.panelName === 'second')
    provide('isManual', isManual)

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style></style>
