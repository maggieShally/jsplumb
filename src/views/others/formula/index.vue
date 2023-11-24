<!--
 * @Description: 
 * @Date: 2023-02-28 14:15:22
 * @LastEditTime: 2023-08-03 10:56:03
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\formula\index.vue
-->
<template>
  <el-tabs v-model="activeName">
    <!-- <el-tab-pane label="codeMirror" name="codeMirror">
      <keep-alive>
        <CodeMirrorCom />
      </keep-alive>
    </el-tab-pane> -->
    <el-tab-pane label="defined" name="defined">

      <!-- <layout :showTab="showTab"> -->

        <DefinedField />
      <!-- </layout> -->

    </el-tab-pane>
  </el-tabs>
  <div id="test"></div>
</template>


<script>
import { computed, reactive, toRefs } from 'vue'
import CodeMirrorCom from './CodeMirror.vue'
import DefinedField from './DefinedField.vue'

import Layout from './Layout.vue'

export default {
  name: 'FormulaCom',
  components: {
    // Layout,
    // CodeMirrorCom,
    DefinedField,
  },

  setup() {
    const state = reactive({
      activeName: 'defined',
    })

    const showTab = computed(() => {
      return state.activeName === 'defined'
    })

    return {
      showTab,
      ...toRefs(state),
    }
  },
}
</script>

<style>
</style>