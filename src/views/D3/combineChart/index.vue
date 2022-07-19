<!--
 * @Description: 
 * @Date: 2022-05-30 17:18:20
 * @LastEditTime: 2022-06-16 10:56:17
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\index.vue
-->
<template>
  <div class="box" id="barChart"></div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'


export default {
  name: 'combineChart',

  setup() {
    const { proxy } = getCurrentInstance()

    const d3 = proxy.$d3

   

    onMounted(async () => {
      const svg = d3
        .select('#barChart')
        .append('svg')
        .attr('width', 800)
        .attr('height', 1000)

    
    })

    return {}
  },
}
</script>

<style lang="less" scoped>
.box {
  height: 800px;
  width: 1000px;
  border: 1px solid #ddd;
}
</style>