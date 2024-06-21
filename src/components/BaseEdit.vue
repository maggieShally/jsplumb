<!--
 * @Description: sql编辑器
 * @Date: 2023-09-08 14:23:08
 * @LastEditTime: 2024-05-17 16:19:37
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\BaseEdit.vue
-->
  
<template>
  <VAceEditor ref="editorRef" :lang="lang" class="ace-editor" :readonly="readonly" :options="editorOptions" />
</template>

<script>
import { reactive, toRefs ,ref} from 'vue'
import { VAceEditor } from 'vue3-ace-editor'


import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-chrome'

import * as ace from 'ace-builds/src-noconflict/ace'
ace.config.set('basePath', '/assets/ui/')
ace.config.set('modePath', '')
ace.config.set('themePath', '')


const editorOptions = {
  enableBasicAutocompletion: true, //启用基本自动完成
  enableSnippets: true, // 启用代码段
  enableLiveAutocompletion: true, // 启用实时自动完成
  fontSize: 18, //设置字号
  tabSize: 4, // 标签大小
  showPrintMargin: false, //去除编辑器里的竖线
  highlightActiveLine: true,
  // 显示行号区域
  showGutter: false,
  // 自动换行
  wrap: true,
}


export default {
  name: 'BaseAceEditor',
  props: {
    jsonStr: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'json',
    },
  },
  components: {
    VAceEditor,
  },
  setup(props) {
    const editorRef =  ref(null)
    const state = reactive({
      json: props.jsonStr,
    })

    return {
      editorRef,
      editorOptions,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.ace-editor {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  border: 1px solid #ddd;
}
</style>

