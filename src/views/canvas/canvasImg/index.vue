<!--
 * @Description: 
 * @Date: 2021-07-21 15:50:58
 * @LastEditTime: 2021-08-25 15:17:42
 * @FilePath: \jsplumb-test\src\views\canvas\canvasImg\index.vue
-->
<template>
  {{info.name}}
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'canvasImg',
  setup() {
    const state = reactive({
      info: {}
    })

    onMounted(() => {
      state.info = {
        name: '123'
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>

</style>