<!--
 * @Description: 
 * @Date: 2024-04-17 14:33:49
 * @LastEditTime: 2024-04-18 13:47:07
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\NodeDetail.table.vue
-->
<template>
  
  <el-table :data="tableData" row-key="nodeId" default-expand-all  :tree-props="{ children: 'childrenLevel' }">
    <el-table-column label="维度信息" prop="itemNum"></el-table-column>
    <el-table-column label="工序" prop="jobName"></el-table-column>
    <el-table-column label="所属层级" prop="path"></el-table-column>
  </el-table>
</template>

<script>
import { computed, reactive, toRefs, onMounted } from 'vue'
export default {
  name: 'NodeDetailsTable',
  components: {
  },
  props: {
    data: Array
  },
  setup(props) {

    const tableData = computed(() => props.data)

    return {
      tableData
    }
  }
}
</script>

<style lang='less' scoped></style>