
<template>
  <el-select v-model="values" v-bind="$attrs" @change="handleChange">
    <el-option v-if="modelValue.length === options.length" label="取消全选" :value="-1"></el-option>
    <el-option v-else label="全选" :value="1"></el-option>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { unref } from 'vue'
import { useVModel } from '@vueuse/core'

// v-mode='xxx' 默认是 名称是modelValue
export default {
  name: 'BaseSelectAll',
  props: {
    modelValue: {
      type: [String, Array]
    },
    options: Array
  },
  emits:['update:modelValue', 'onEmitChange'],
  setup(props, context) {
    const values = useVModel(props, 'modelValue',context.emit)

    const handleChange = val => {
      console.log(val)
      const isAll = val.find(i => i === 1)
      const isCancelAll = val.find(i => i === -1)
      values.value = val
      if(isAll) {
        values.value = props.options.filter(i => i.value !== -1).map(i => i.value)
      }
      if(isCancelAll) {
        values.value = []
      }
      context.emit('onEmitChange',values.value)
    }

    return {
      values,
      handleChange
    }
  }
}
</script>

<style>

</style>