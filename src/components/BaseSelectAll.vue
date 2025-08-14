<template>
  <el-select v-model="values" v-bind="$attrs">
    <template #header>
      <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
        全选
      </el-checkbox>
    </template>

    <el-option-group v-for="subItem in options" :key="subItem.label" :label="subItem.label">
      <el-option v-for="item in subItem.option" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { unref, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

// v-mode='xxx' 默认是 名称是modelValue
export default {
  name: 'BaseSelectAll',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: Array
  },
  setup(props, context) {
    const values = useVModel(props, 'modelValue', context.emit)

    const checkAll = ref(false)
    const indeterminate = ref(false)

    watch(values, (val) => {
      if (val.length === 0) {
        checkAll.value = false
        indeterminate.value = false
      } else if (val.length === props.options.map(i => i.option).flat().length) {
        checkAll.value = true
        indeterminate.value = false
      } else {
        indeterminate.value = true
      }
    })

    const handleCheckAll = val => {
      indeterminate.value = false
      if (val) {
        values.value = props.options.map(i => i.option).flat().map((_) => _.value)
      } else {
        values.value = []
      }
    }

    return {
      values,
      checkAll,
      indeterminate,
      handleCheckAll
    }
  }
}
</script>

<style></style>