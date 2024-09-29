<!--
 * @Description: canvas 时钟
 * @Date: 2021-07-12 09:16:55
 * @LastEditTime: 2021-09-07 14:23:47
 * @FilePath: \jsplumb-test\src\views\canvas\clock\index.vue
-->



<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="clock" name="first">
      <ClockCom />
    </el-tab-pane>
    <el-tab-pane label="Test" name="second">
      <TestCom />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import ClockCom from './components/ClockCom.vue'
import TestCom from './components/TestCom.vue'


export default {
  name: 'ClockPage',
  components: {
    ClockCom,
    TestCom
  },
  props: {
  },
  setup() {
    const state = reactive({
      activeName: 'second'
    })

    onMounted(() => {

    })
    
    return {
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'></style>