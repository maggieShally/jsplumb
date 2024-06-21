<!-- 默认筛选条件设置
 * @Description: 
 * @Date: 2024-05-22 10:44:18
 * @LastEditTime: 2024-05-22 10:44:42
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\components\SetDefaultField.modal.vue
-->

<template>
  <el-dialog v-model="visible" title="设置筛选条件" width="800" draggable :before-close="handleCancel">

    <el-form ref="formRef" :rules="rules" :model="editForm" inline>
      <el-form-item label="">
        <el-input v-model="editForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="" prop="operation">
        <el-select v-model="editForm.operation" style="width: 100px;">
          <el-option value=">" label="大于"></el-option>
          <el-option value="<" label="小于"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="condValue">
        <el-input v-model="editForm.condValue"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
export default {
  name: 'SetDefaultFieldModal',
  components: {
  },
  props: {
    data: Object
  },
  emits: ['onCancel', 'onOk'],
  setup(props, context) {

    const formRef = ref(null)

    const state = reactive({
      visible: true,
      rules: {
        operation: [{
          required: true,
          message: '选择',
          trigger: 'change'
        }],
        condValue: [{
          required: true,
          message: '选择',
          trigger: 'change'
        }]
      },
      editForm: {
        name: props.data.name,
        operation: props.data.operation,
        condValue: props.data.condValue,
      }
    })

    const handleCancel = () => {
      context.emit('onCancel')
    }

    const handleSubmit = () => {

      formRef.value.validate(valid => {
        debugger
        if (valid) {
          context.emit('onOk', state.editForm)
          handleCancel()
        }
      })

    }
    return {
      formRef,
      ...toRefs(state),
      handleSubmit,
      handleCancel
    }
  }
}
</script>

<style lang='less' scoped></style>