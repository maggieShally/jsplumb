<!--
 * @Description: 
 * @Date: 2024-02-21 14:16:22
 * @LastEditTime: 2024-09-18 15:21:28
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
    <el-form-item>
      <el-button type="primary" @click="handleGetParent">xxxx</el-button>
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

    const handleGetParent = () => {
     
    }

    onMounted(() => {
      setTimeout(() => {
        window.parent.document.querySelector('#form_nav').style.display = 'block'
      }, 500)
      

    })

    return {
      approvalElRef,
      ...toRefs(state),
      toggle,
      handleGetParent
    }
  }

}
</script>

<style>

</style>