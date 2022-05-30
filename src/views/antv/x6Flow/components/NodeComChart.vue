<!--
 * @Description: 
 * @Date: 2022-04-28 15:04:22
 * @LastEditTime: 2022-04-28 15:41:12
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Flow\components\NodeComChart.vue
-->
<template>
  <BaseChart ref="chartRef" name="scatterSame" :seriesData="seriesData" />
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import BaseChart from '@/components/BaseChart'

export default {
  name: 'NodeComChart',
  components: {
    BaseChart
  },
  props: {
    editData: Object,
  },
  setup(props) {

    const chartRef = ref(null)

    const state = reactive({
      seriesData: props?.editData?.seriesData
    })

    return {
      chartRef,
      ...toRefs(state),

    }
  }
}
</script>

<style>

</style>