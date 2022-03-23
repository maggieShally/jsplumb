<!--
 * @Description: 
 * @Date: 2021-09-13 16:02:38
 * @LastEditTime: 2021-09-14 14:15:45
 * @FilePath: \jsplumb-test\src\views\gantt\Edit.modal.vue
-->
<template>
  <el-dialog v-model="visible" :before-close="handleCancel" width="600px" destroy-on-close>
    <template #title>
      <b>修改名字</b>
    </template>
    <el-form ref="addFormRef" :model="addForm" label-width="130px" class="add-from">
      <el-form-item label="名称	" prop="name">
        <el-input v-model.trim="addForm.name" placeholder="名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="default" @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, toRefs, getCurrentInstance, onMounted } from 'vue'

export default {
  name: 'EditModal',
  props: {
    dataSource: Object,
    title: String,
  },
  emits: ['onCancel', 'onOk'],
  setup(props, context) {
    const addFormRef = ref(null)
    const { proxy } = getCurrentInstance()

    const state = reactive({
      visible: true,
      addForm: {
        name: props.title
      },
    })

    const handleCancel = () => {
      state.visible = false
      context.emit('onCancel')
    }

    const handleSubmit = () => {
      console.log(props.dataSource)
      context.emit('onOk', state.addForm.name)
    }


    onMounted(() => {
     
    })

    return {
      addFormRef,
      ...toRefs(state),
      handleCancel,
      handleSubmit,
    }
  },
}
</script>

<style lang="less" scoped>
.add-from.el-form {
  width: 380px;
}
</style>