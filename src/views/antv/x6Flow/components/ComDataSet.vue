<!--
 * @Description: 
 * @Date: 2022-01-12 16:46:00
 * @LastEditTime: 2022-01-12 17:34:55
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Flow\components\ComDataSet.vue
-->

<template>
  <h3>ComDataSet</h3>
  <el-form :model="addForm">
    <el-form-item prop="name">
      <el-input v-model="addForm.name" />
    </el-form-item>
    <el-form-item prop="数据值">
      <el-input v-model="addForm.value" />
    </el-form-item>
  </el-form>
</template>

<script>

import { reactive, toRefs, onUnmounted } from "vue"

export default {
  name: 'ComDataSet',
  props: {
    data: {}
  },
  emits: ['onSubmitParams'],
  setup(props, context) {
    const state = reactive({
      addForm: {
        name: props.data.label,
        value: props.data.value
      }
    })

    onUnmounted(() => {
      console.log(state.addForm)
      context.emit('onSubmitParams', state.addForm)
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
</style>