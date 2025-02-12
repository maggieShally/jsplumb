<!--
 * @Description: Tab
 * @Date: 2025-02-08 17:47:49
 * @LastEditTime: 2025-02-11 16:26:30
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\gridStack\components\TabCom.vue
-->

<template>

  <template v-for="item in dataInfo.tabGridOpts">
    <el-text :type="activeKey === item.id ? 'primary' : 'info'" @click="handleChange(item)">{{ item.tabKey }}</el-text>
  </template>

  <template v-for="item in dataInfo.tabGridOpts">
    <div v-show="item.id  === activeKey">
      <GridLayout ref="tabGridRef" :itemList="item?.children || []" :idKey="item.id"/>
    </div>
  </template>

</template>

<script>
import { reactive, toRefs, onMounted,ref, defineAsyncComponent } from 'vue'

export default {
  name: 'TabCom',
  components: {
    GridLayout: defineAsyncComponent(() => import('../GridLayout.vue'))
  },
  props: {
    dataInfo: Object
  },
  setup(props, context) {

    const tabGridRef = ref(null)
    const state = reactive({
      activeKey: 'sub1_grid2',
    })

    const handleChange = item => {
      state.activeKey = item.id
    }

    const handleSave = () => {
      const result = []
      tabGridRef.value.forEach(item => {
        result.push(item.getPos())
      })
      return result
    }

    onMounted(() => {

    })
    return {
      tabGridRef,
      ...toRefs(state),
      handleChange,
      handleSave
    }
  },
}

</script>
<style scoped lang='less'></style>