<!--
 * @Description: 封装的基础 Chart组件
 * @Date: 2021-10-14 17:05:44
 * @LastEditTime: 2023-04-06 16:37:21
 * @FilePath: \cloud-dop-web\src\components\BaseChart\index.vue
-->
<template>
  <ChartPie v-bind="$props" ref="chartRef">
    <template #tips>
      <slot name="tips"></slot>
    </template>
    <template #menuList>
      <slot name="menuList"></slot>
    </template>
  </ChartPie>
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
