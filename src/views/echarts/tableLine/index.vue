<!--
 * @Description: 
 * @Date: 2022-04-02 10:34:27
 * @LastEditTime: 2024-04-28 15:21:37
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\tableLine\index.vue
-->
<template>
  <h3>图</h3>
  <Table />
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import Table from './Table.vue'
import { data } from './data.js'

export default {
  name: 'BarChart',
  components: {
    Table
  },
  setup() {
    const state = reactive({
    })

    onMounted(() => {

    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.bar-chart {
  width: 100%;
  height: 800px;
}
</style>
