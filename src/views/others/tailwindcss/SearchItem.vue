<!--
 * @Description: 
 * @Date: 2023-09-25 17:02:40
 * @LastEditTime: 2023-11-21 17:59:02
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\SearchItem.vue
-->
<template>
 <div>
  <el-form-item label="名称">
    <el-input v-model="searchForm.name"></el-input>
  </el-form-item>
  
  <el-form-item label="姓别">
    <el-select v-model="searchForm.sex">
      <el-option value="male" label="男"></el-option>
      <el-option value="female" label="女"></el-option>
    </el-select>
  </el-form-item>
  {{count}}
 </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch, nextTick } from 'vue'

import { useVModel, useDocumentVisibility  } from '@vueuse/core'

import { useGlobalState } from './counter.js'


export default {
  name: 'SearchItem',
  props: {
    initForm: {
      type: Object,
      default: () => {
        
      }
    },
    sex: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit  }) {

    const { count , increment } = useGlobalState()

    const visible  = useDocumentVisibility()    

    const state = reactive({
      searchForm: props.initForm
    })
    const searchSex = useVModel(props, 'sex', emit )

    watch(visible, (newVal,oldVal) => {
      console.log('visible,', newVal,', ', oldVal)
    })

    const handleChange = val => {
      searchSex.value = val
    }
    onMounted( () => {
     
    })

    return {
      count,
      ...toRefs(state),
      searchSex,
      // searchForm,
      handleChange
    }
  }

}
</script>

<style></style>