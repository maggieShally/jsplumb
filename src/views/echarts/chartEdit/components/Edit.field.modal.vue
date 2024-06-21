<!--
 * @Description: 编辑 复制
 * @Date: 2024-04-30 16:55:19
 * @LastEditTime: 2024-04-30 17:08:42
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\components\Edit.field.modal.vue
-->


<template>
  <el-dialog v-model="visible" :title="title" width="500" draggable :before-close="handleClose">

    <el-form :model="editForm">
      <el-form-item label="中文名">
        <el-input v-model="editForm.cnName"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="editForm.enName"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
export default {
  name: 'EditFieldModal',
  components: {
  },
  props: {
    editType: String,
    data: Object
  },
  emits: ['onCancel', 'onOk'],
  setup(props, context) {

    const state = reactive({
      visible: true,
      title: props.editType === 'edit' ? '编辑' : '复制',
      editForm: {
        cnName: props.data.cnName + (props.editType === 'copy' ? '(副本)' : ''),
        enName: props.data.enName,
      }
    })

    const handleClose = () => {
      context.emit('onCancel')
    }

    const handleSubmit = () => {
      context.emit('onOk', state.editForm)
      handleClose()
    }
    return {
      ...toRefs(state),
      handleSubmit,
      handleClose
    }
  }
}
</script>

<style lang='less' scoped></style>