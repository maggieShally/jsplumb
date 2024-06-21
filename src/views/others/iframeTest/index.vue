<!--
 * @Description: 
 * @Date: 2024-02-21 14:16:22
 * @LastEditTime: 2024-03-21 11:11:49
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\iframeTest\index.vue
-->
<template>
  <el-form :model="editForm" style="width: 70%">
    <el-form-item label="test">
      <el-input v-model="editForm.test" type="textarea" :rows="5"></el-input>
      <button @click="toggle">
        Fullscreen
      </button>
    </el-form-item>
    <el-form-item label="审批" ref="approvalElRef">
      <el-input v-model="editForm.remarks" type="textarea" :rows="5"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import {ref, reactive, toRefs, onMounted } from 'vue'
import { useFullscreen  } from '@vueuse/core'

export default {
  name: 'IframeTest',
  components: {
  },
  setup() {

    const approvalElRef = ref(null)

    const state = reactive({
      editForm: {
        remarks: '',
        test: ''
      }
    })

    const { isFullscreen, enter, exit, toggle } = useFullscreen(approvalElRef)

    onMounted(() => {})

    return {
      approvalElRef,
      ...toRefs(state),
      toggle
    }
  }

}
</script>

<style>

</style>