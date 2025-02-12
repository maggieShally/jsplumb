<!--
 * @Description: 
 * @Date: 2025-02-08 16:23:25
 * @LastEditTime: 2025-02-08 17:38:11
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\gridStack\components\SimpleCom.vue
-->

<template>
  <div :id="dataInfo.id">
    <ScatterChartSame />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'

import ScatterChartSame from '../../scatter/Scatter.same.vue'

export default {
  name: 'SimpleCom',
  components: {
    ScatterChartSame
  },
  props: {
    dataInfo: Object
  },
  setup() {
    const state = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'>
</style>