<!--
 * @Description: 
 * @Date: 2022-04-14 15:19:25
 * @LastEditTime: 2022-04-22 11:25:32
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\gantt\Store.column.modal.vue
-->
<template>
  <el-form :model="addForm">
    <el-form-item>
      <el-transfer v-model="value" :props="{key: 'value',label: 'desc',}" :data="data" target-order="push"/>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'StoreColumnModal',
  props: {
    ids: Array
  },
  setup() {

    const state = reactive({
      data: [
        {

        }
      ]
    })
  }
}
</script>

<style>
</style>