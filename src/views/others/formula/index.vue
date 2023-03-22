<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="codeMirror" name="codeMirror">
      <keep-alive>
        <CodeMirrorCom />
      </keep-alive>
    </el-tab-pane>
    <el-tab-pane label="defined" name="defined">

      <layout :showTab="showTab">

        <DefinedField />
      </layout>

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
    Layout,
    CodeMirrorCom,
    DefinedField,
  },

  setup() {
    const state = reactive({
      activeName: 'codeMirror',
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