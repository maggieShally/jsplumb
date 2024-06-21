<!--
 * @Description: 设默认条件
 * @Date: 2024-05-21 17:42:38
 * @LastEditTime: 2024-05-24 18:12:48
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\components\SetDefaultField.vue
-->

<template>
  <div class="field-wrap">
    <draggable id="defaultFields" v-model="fieldsList" group="field-item" item-key="columnId" @add="handleAddItem">
      <template #item="{ element }">

        <el-dropdown trigger="click" style="margin: 0 3px; width: 100%">
      
          <el-tag :type="element.condValue ? 'success' : 'danger'"> 
            {{ element.name }}
            <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
         </el-tag>
         
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><span @click="handleDelete(element)">删除</span></el-dropdown-item>
              <el-dropdown-item divided><span @click="handleShowSetting(element)">设置筛选条件</span></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </template>
    </draggable>
  </div>


  <teleport to="body">
    <EditModal v-if="editVisible" :data="activeData" @onOk="handleOk" @onCancel="editVisible = false" />
  </teleport>
  
</template>

<script>
import { ref, reactive, toRefs, unref } from 'vue'
import { useVModel } from '@vueuse/core'
import draggable from 'vuedraggable'

import EditModal from './SetDefaultField.modal.vue'

export default {
  name: 'SetDefaultFieldCom',
  components: {
    draggable,
    EditModal
  },
  props: {
    defaultCondFields: Array
  },

  setup(props, context) {

    const fieldsList = useVModel(props, 'defaultCondFields', context.emit)

    const state = reactive({
      editVisible: false,
      activeData: {}
    })

    const handleDelete = element => {
      fieldsList.value = fieldsList.value.filter(i => i.id !== element.id)
    }

    const handleShowSetting = element => {
      state.activeData = element
      state.editVisible = true
    }

    const handleOk = data => {
      fieldsList.value.forEach(item => {
        if(item.id === state.activeData.id) {
          Object.assign(item, data)
        }
      })
    }

    const handleAddItem = evt => {
      console.log(evt)
      handleShowSetting(unref(fieldsList)[evt.newIndex])
    }

    return {
      fieldsList,
      ...toRefs(state),
      handleDelete,
      handleShowSetting,
      handleOk,
      handleAddItem
    }
  }
}
</script>

<style lang='less' scoped>
.field-wrap {
  min-height: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>