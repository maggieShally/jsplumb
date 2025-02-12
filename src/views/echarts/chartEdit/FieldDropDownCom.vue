<!--
 * @Description: 已选维度，指标 字段组件。下拉操作
 * @Date: 2024-05-17 10:54:32
 * @LastEditTime: 2024-12-09 11:38:07
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\FieldDropDownCom.vue
-->
<template>
  <el-dropdown trigger="click" style="margin: 0 3px;">
    <el-tag type="success">
      {{ element.cnName || element.name }}
    </el-tag>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item><span @click="$emit('onEdit')">编辑</span></el-dropdown-item>
        <el-dropdown-item><span @click="$emit('onDelete')">删除</span></el-dropdown-item>
        <el-dropdown-item>复制</el-dropdown-item>

        <template v-for="configItem in opFieldList" :key="configItem.configKey">
          <el-dropdown-item divided v-if="configItem.children">
            <el-dropdown placement="right">

              <span>
                {{ configItem.label }}
                <span style="color: rgb(209, 64, 64)" v-if="element[configItem.configKey]">({{ getShowValue(element, configItem.configKey, typeKey) }})</span>
                <el-icon class="el-icon--right"><arrow-right /></el-icon>
              </span>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="subItem in configItem.children" :key="subItem.value">
                    <span @click="$emit('onSetAttrs', element, subItem.configKey || configItem.configKey, subItem.value)">{{ subItem.label }}</span>
                    <el-icon v-if="element[subItem.configKey || configItem.configKey] === subItem.value"><Select /></el-icon>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-dropdown-item>

          <el-dropdown-item divided v-else>
            <span @click="$emit('onSetAttrs', element, configItem.configKey, configItem.value)">{{ configItem.label }}</span>
            <el-icon v-if="element[configItem.configKey] === configItem.value"><Select /></el-icon>
          </el-dropdown-item>
        </template>

      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'

import { getQuotaConfig, getDimensionConfig } from './config.js'

export default {
  name: 'FieldDropDownCom',
  components: {
  },
  props: {
    data: Object,
    typeKey: String, // dimension,quota
    chartType: String
  },
  emits: ['onEdit', 'onDelete','onSetAttrs'],
  setup(props, context) {
    const element = computed(() => props.data)

    const opFieldList = ref([])

    const getConfig = () => {
      if(props.typeKey === 'dimension') {
        opFieldList.value = getDimensionConfig(props.data.dataType)
      } else {
        opFieldList.value = getQuotaConfig(props.chartType)
      }
    }
    
    // 获取选中操作值，显示
    const getShowValue = (item, key) => {
      if (key === 'top') return item[key]
      return opFieldList.value.find(i => i.configKey === key)?.children?.find(i => i.value === item[key])?.label
    }

    onMounted(() => {
      getConfig()
    })
    
    return {
      element,
      opFieldList,
      getShowValue
    }
  }
}
</script>

<style lang='less' scoped></style>
