<!--
 * @Description: 
 * @Date: 2022-05-30 17:18:20
 * @LastEditTime: 2022-05-30 18:20:22
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\index.vue
-->
<template>
  <div class="box" id="container"></div>
</template>

<script>

import { getCurrentInstance } from 'vue'
export default {
  name: 'combineChart',

  setup() {
    const { proxy } = getCurrentInstance()

    const d3 = proxy.$d3



    
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 800px;
  width: 1000px;
  border: 1px solid #ddd;
}

</style>