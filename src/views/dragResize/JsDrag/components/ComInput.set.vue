<!--
 * @Description: 
 * @Date: 2022-03-25 17:16:26
 * @LastEditTime: 2022-03-25 17:39:10
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\JsDrag\components\ComInput.set.vue
-->
<template>

  <p>组件属性</p>
  <el-form :model="setForm" label-width="80px">
    <el-form-item prop="prop" label="字段名">
      <el-input v-model="setForm.prop" @input="handleChange"/>
    </el-form-item>
    <el-form-item prop="label" label="标题">
      <el-input v-model="setForm.label" @input="handleChange"/>
    </el-form-item>
    <el-form-item prop="placeholder" label="占位提示">
      <el-input v-model="setForm.placeholder" @input="handleChange"/>
    </el-form-item>
    <el-form-item prop="value" label="默认值">
      <el-input v-model="setForm.value" @input="handleChange"/>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'ComInputSet',
  emits: ['onChange'],
  setup(props, context) {
    const state = reactive({
      setForm: {
        prop: '',
        label: '',
        placeholder: ''
      }
    })

    const handleChange = () => {
      console.log(state.setForm)
      context.emit('onChange', state.setForm)
    }

    return {
      ...toRefs(state),
      handleChange
    }
  }
}
</script>

<style></style>
