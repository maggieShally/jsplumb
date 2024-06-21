<!--
 * @Description: 图表配置
 * @Date: 2024-01-17 17:37:37
 * @LastEditTime: 2024-05-21 17:09:28
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\Chart.config.vue
-->

<template>
  <el-form :model="chartOptions">
    <el-collapse>
      <el-collapse-item title="Consistency" name="1">
        <template #title>
          <el-divider content-position="left">基础配置</el-divider>
        </template>
        <el-collapse>
          <el-collapse-item title="Consistency" name="11">
            <template #title>
              <el-divider content-position="left">标题</el-divider>
            </template>
            <ConfigTitleCom v-model:options="chartOptions" />
          </el-collapse-item>

          <el-collapse-item title="Consistency" name="12">
            <template #title>
              <el-divider content-position="left">图例</el-divider>
            </template>
            <ConfigLegendCom v-model:options="chartOptions" />
          </el-collapse-item>

          <el-collapse-item title="Consistency" name="13">
            <template #title>
              <el-divider content-position="left">类目轴</el-divider>
            </template>
            <ConfigXAxisCom v-model:options="chartOptions" />
          </el-collapse-item>
        </el-collapse>

      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import ConfigTitleCom from './config/Config.title.vue'
import ConfigLegendCom from './config/Config.legend.vue'
import ConfigXAxisCom from './config/Config.xAxis.vue'

export default {
  name: 'ChartOptionConfig',
  components: {
    ConfigTitleCom,
    ConfigLegendCom,
    ConfigXAxisCom
  },
  props: {
    options: {
      type: Object
    }
  },
  emits: ['update:options'],
  setup(props, context) {
    const chartOptions = useVModel(props, 'options', context.emit)

    
    return {
      chartOptions,
    }
  }
}
</script>

<style></style>