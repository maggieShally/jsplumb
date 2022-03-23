<!--
 * @Description: 
 * @Date: 2022-01-12 16:38:33
 * @LastEditTime: 2022-01-12 17:40:55
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Flow\components\ComDataSource.vue
-->

<template>
  <h3>ComDataSrouce</h3>
  <el-form :model="addForm" :rules="addFormRule">
    <el-form-item prop="name"  label="名称">
      <el-input v-model="addForm.name" />
    </el-form-item>
    <el-form-item prop="sourceId" label="数据源">
      <el-input v-model="addForm.sourceId" />
    </el-form-item>
  </el-form>
</template>

<script>

import { onMounted, onUnmounted, reactive, toRefs } from "vue"

export default {
  name: 'ComDataSrouce',
  props: {
    data: {}
  },
  emits: ['onSubmitParams'],
  setup(props, context) {
    const state = reactive({
      addForm: {
        name: props.data.label,
        sourceId: props.data.sourceId
      },
      addFormRule: {
        name: [
          {
            requried: true,
          }
        ]
      }
    })

    onMounted(() => {
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