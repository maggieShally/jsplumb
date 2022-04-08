<!--
 * @Description: 封装的基础 Chart组件
 * @Date: 2021-10-14 17:05:44
 * @LastEditTime: 2021-11-03 17:42:57
 * @FilePath: \dop-web-project\src\components\BaseChart\index.vue
-->
<template>
  <ChartPie v-bind="$props" ref="chartRef"/>
</template>

<script>
import { ref } from 'vue'
import ChartPie from './ChartPie.vue'
export default {
  name: 'BaseChart',
  components: {
    ChartPie,
  },
  props: ChartPie.props,
  setup() {
    const chartRef = ref(null)

    return {
      chartRef
    }
  }
}
</script>

<style>
</style>
