<!--
 * @Description: 
 * @Date: 2022-03-25 16:28:45
 * @LastEditTime: 2022-03-25 16:35:00
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\JsDrag\components\ComTable.vue
-->
<template>
  <el-table v-bind="$props" :data="tableData" border>
    <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :key="column.prop" />
  </el-table>
</template>

<script>

import { reactive, toRefs } from 'vue'
export default {
  name: 'ComTable',
  props: {
    columns: {
      type: Array,
      default: () => {
        return [
          {
            prop: 'test1',
            label: 'test1'
          },{
            prop: 'test2',
            label: 'test2'
          }
        ]
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            test1: 'test1',
            test2: 'test2',
          }
        ]
      }
    }
  },
  setup() {

    const state = reactive({
      
    })

    return {
      ...toRefs(state)
    }

  }
}
</script>

<style></style>
