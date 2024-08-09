<!--
 * @Description: 
 * @Date: 2024-04-17 14:33:49
 * @LastEditTime: 2024-08-07 15:25:30
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\NodeDetail.table.vue
-->
<template>
  
  <el-table :data="tableData" row-key="nodeId" default-expand-all  :tree-props="{ children: 'childrenLevel' }">
    <el-table-column label="维度信息" prop="itemNum"></el-table-column>
    <el-table-column label="工序" prop="jobName"></el-table-column>
    <el-table-column label="所属层级" prop="path"></el-table-column>

    <el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop">
      <template #default="{row, column}">
        <el-text :type="isClickTarget(column.property) ? 'primary' : 'info'" :class="{pointer: isClickTarget(column.property) }" @click="handleShowTarget(row, column)">{{getValueText(row, column)}}</el-text>
      </template>
    </el-table-column>

    <el-table-column label="加工单价" prop="PROCESS_CHARGE">
      <template #default="{row, column}">
        <el-text class="pointer" type="primary">查询</el-text>
      </template>
    </el-table-column>
    <el-table-column label="最新加工单价">
      <template #default="{row}">
        {{row[currency.toLowerCase() + "UnitPrice"] || "N/A"}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { computed, reactive, toRefs, onMounted } from 'vue'
export default {
  name: 'NodeDetailsTable',
  components: {
  },
  props: {
    data: Array,
    currency: {
      type: String,
      default: 'RMB'
    }
  },
  setup(props) {

    const tableData = computed(() => props.data)
    const columns = computed(() => {
      return props.data[0]?.targetValueList.filter(i => i.currency === props.currency).map(item => {
        const { targetName, targetField } = item
        return {
          prop: targetField,
          label: targetName
        }
      })
    })

    const clickTargetList = ['PRODUCT_STOCK']

    const isClickTarget = property => {
      return clickTargetList.includes(property)
    }

    const getValueText = (row, column) => {
      const { targetValue = '', targetUnit = ''} =  row.targetValueList?.find(i => i.currency === props.currency && i.targetField === column.property) || {}
      return targetValue + targetUnit
    }

    const handleShowTarget = (row, column) => {
      if(isClickTarget(column.property)) {
        console.log(row)
      }
    }

    return {
      tableData,
      columns,
      getValueText,
      isClickTarget,
      handleShowTarget
    }
  }
}
</script>

<style lang='less' scoped>
.pointer {
  cursor: pointer;
}
</style>