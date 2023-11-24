<!--
 * @Description: 引用类型 可以直接传参子组件，双向绑定（子组件 computed 即可），基础类型 可以用 v-model, update:modelValue 双向绑定。
 * @Date: 2023-10-07 17:48:21
 * @LastEditTime: 2023-10-08 10:11:20
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\ListScroll\components\TestModel.vue
-->

<template>
  name: {{name}}
  <TestChild v-model="name" :state="state" />
  <div> state.name : {{state.name}}</div>

  <div>
    state.hobby : {{state.hobbies}}
  </div>
</template>

<script>
import { ref } from 'vue'
import TestChild from './TestChild.vue'

export default {
  name: 'TestModel',
  components: {
    TestChild,
  },
  props: {},
  setup() {
    const state = ref({
      name: 'xxx',
      hobbies: [],
    })
    const name = ref(null)

    return {
      state,
      name,
    }
  },
}
</script>

<style>
</style>