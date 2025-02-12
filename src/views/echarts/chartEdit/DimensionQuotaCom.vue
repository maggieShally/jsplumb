<!--
 * @Description: 用户选中的指标维度
 * @Date: 2024-04-28 16:42:50
 * @LastEditTime: 2024-12-09 11:30:53
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\DimensionQuotaCom.vue
-->

<template>
  <div class="tag-wrap">
    <div class="tag-title">维度</div>
    <div class="tag-content">

      <draggable id="dimensionFields" v-model="dimensionFields" :group="{name: 'field-item'}"  item-key="columnId">
        <template #item="{ element }">
          <FieldDropDownCom :data="element" :chartType="chartType" typeKey="dimension" @onEdit="handleEditItem(element, 'dimension')" @onDelete="handleDeleteItem(element, 'dimension')"
            @onSetAttrs="handleSetAttrs" />
        </template>
      </draggable>

    </div>
  </div>

  <div class="tag-wrap">
    <div class="tag-title">指标</div>
    <div class="tag-content">

      <draggable id="quotaFields" v-model="quotaFields" group="field-item" item-key="columnId">
        <template #item="{ element }">
          <FieldDropDownCom :data="element" :chartType="chartType" typeKey="quota" @onEdit="handleEditItem(element, 'quota')" @onDelete="handleDeleteItem(element, 'quota')"
            @onSetAttrs="handleSetAttrs" />
        </template>
      </draggable>
    </div>
  </div>

  <EditFieldModal v-if="editVisible" :editType="editType" :data="activeItem" @onCancel="editVisible = false" @onOk="handleEditFieldOk" />
</template> 

<script>
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useVModel } from '@vueuse/core'
import draggable from 'vuedraggable'

import { getQuotaConfig, getDimensionConfig } from './config.js'

import EditFieldModal from './components/Edit.field.modal.vue'
import FieldDropDownCom from './FieldDropDownCom.vue'

export default {
  name: 'DimensionQuotaCom',
  components: {
    draggable,
    EditFieldModal,
    FieldDropDownCom
  },
  props: {
    dimensionList: Array,
    quotaList: Array,
    chartType: String,
  },
  setup(props, context) {

    const dimensionFields = useVModel(props, 'dimensionList', context.emit)
    const quotaFields = useVModel(props, 'quotaList', context.emit)

    // 指标可操作字段配置
    const quotaConfig = computed(() => getQuotaConfig(props.chartType))

    const state = reactive({
      activeItem: {},
      editType: '',
      editVisible: false,
    })

    const fieldTypeConfig = [{
      label: '维度',
      key: 'dimension',
    },
    {
      label: '指标',
      key: 'quota',
    }]


    const handleDeleteItem = (item, key) => {
      if (key === 'dimension') {
        dimensionFields.value = dimensionFields.value.filter(i => i.id !== item.id)
      } else {
        quotaFields.value = quotaFields.value.filter(i => i.id !== item.id)
      }
    }

    // top自定义
    const handleTopCustom = element => {
      ElMessageBox.prompt('值', '用户自定义', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputErrorMessage: '请输入有效值',
      })
        .then(({ value }) => {
          element.top = value
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '操作失败',
          })
        })
    }


    // 仅支持一个字段排序
    const handleSort = (element, key, value) => {
      if (element[key] === value) {
        element[key] = ''
      } else {
        element[key] = value
        dimensionFields.value.forEach(item => {
          if (element.field !== item.field) {
            item[key] = ''
          }
        })
        quotaFields.value.forEach(item => {
          if (element.field !== item.field) {
            item[key] = ''
          }
        })
      }
    }

    // 配置属性
    const handleSetAttrs = (item, key, value) => {
      if (key === 'top' && value === -1) {
        handleTopCustom(item)
      } else if (key === 'sort') {
        handleSort(item, key, value)
      } else {
        item[key] = item[key] === value ? '' : value
      }
    }


    // 获取选中操作值，显示
    const getShowValue = (item, key, dataType) => {
      if (key === 'top') return item[key]
      if (dataType === 'quota') {
        return unref(quotaConfig).find(i => i.configKey === key)?.children?.find(i => i.value === item[key])?.label
      } else {
        const configData = getDimensionConfig(item.dataType)
        return configData.find(i => i.configKey === key)?.children?.find(i => i.value === item[key])?.label
      }
    }

    const handleEditItem = item => {
      state.activeItem = item
      state.editType = 'edit'
      state.editVisible = true
    }

    const handleEditFieldOk = data => {
      state.activeItem.cnName = data.cnName
      state.activeItem.enName = data.enName
    }

    const handleDimensionPut = (...extra) => {
      // console.log(extra)
    }

    
    return {
      fieldTypeConfig,
      quotaConfig,
      dimensionFields,
      quotaFields,
      ...toRefs(state),
      getDimensionConfig,
      handleEditItem,
      handleDeleteItem,
      handleSetAttrs,
      getShowValue,
      handleEditFieldOk,
      handleDimensionPut
    }
  }
}
</script>

<style lang='less' scoped>
.tag-wrap {
  display: flex;
  align-items: center;

  &:first-of-type {
    margin-bottom: 10px;
  }

  .tag-title {
    width: 60px;
  }

  .tag-content {
    padding: 5px;
    flex: 1;
    height: 38px;
    border: 1px solid #ddd;
    border-radius: 10px;

    &>div {
      height: 100%;
    }
  }
}

:focus-visible {
  outline: none;
}
</style>