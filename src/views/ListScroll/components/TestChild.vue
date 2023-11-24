


<template>
  
  <el-input v-model="value" @change="val => $emit('update:modelValue', val)" />
  <el-input v-model="states.name" />

  <el-input v-model="age" />

  <el-select v-model="states.hobbies" multiple>
    <el-option label="test1" value="test1"></el-option>
    <el-option label="test2" value="test2"></el-option>
    <el-option label="test3" value="test3"></el-option>
  </el-select>

  {{age}}
</template>

<script>
import { computed, onMounted, ref } from 'vue'
export default {
  name: 'TestChild',
  props: {
    modelValue: String,
    state: Object
  },
  setup(props) {

    const value = ref(props.modelValue)
    const states = computed(() => props.state)


    const age = ref(0)

   const numberToThousandth = (value, flag   = '')  => {
      value = value ?? flag
      if (value === flag) return value
      return value.toString().replace(/\d+/, function (n) {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          // 对整数部分添加分隔符
          return $1 + ','
        })
      })
    }

    onMounted(() => {
      let a = 120000
      console.log('numberToThousandth:', numberToThousandth(a, '-'))
    })

    return {
      value,
      age,
      states
    }
  }
}
</script>

<style>

</style>