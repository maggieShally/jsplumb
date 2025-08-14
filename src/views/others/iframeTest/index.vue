<!--
 * @Description: 
 * @Date: 2024-02-21 14:16:22
 * @LastEditTime: 2024-09-18 15:21:28
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\iframeTest\index.vue
-->
<template>

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
    })

    return {
      ...toRefs(state),
    }
  }

}
</script>

<style>

</style>