<!--
 * @Description: 
 * @Date: 2023-02-28 14:15:22
 * @LastEditTime: 2025-02-21 16:35:03
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\formula\index.vue
-->
 
<template>
  <el-button type="primary" @click="visible = true">取值</el-button>

  <CalcFieldModal v-if="visible" :initData="editData"  @onCancel="visible = false" @onOk="handleOk"/>

</template>

<script>
import { computed, reactive, toRefs } from 'vue'

import { originFieldList, editData } from './mockData.js'

import CalcFieldModal from './CalcField.modal.vue'


export default {
  name: 'FormulaCom',
  components: {
    CalcFieldModal
  },

  setup() {
    const state = reactive({
      visible: false,
      editData
    })

    const handleOk = res => {
      console.log('res',  res)
    }
    return {
      ...toRefs(state),
      handleOk
    }
  },
}
</script>

<style></style>