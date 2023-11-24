<!--
 * @Description: sql编辑器
 * @Date: 2023-09-08 14:23:08
 * @LastEditTime: 2023-09-08 16:08:14
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\BaseEdit.vue
-->
<template>
  <v-ace-editor class="my-editor" lang="json" />
</template>

<script>
import { VAceEditor } from 'vue3-ace-editor';

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-chrome'

import * as ace from 'ace-builds/src-noconflict/ace'
ace.config.set('basePath', '/assets/ui/')
ace.config.set('modePath', '')
ace.config.set('themePath', '')

export default {
  name: 'BaseEdit',
  components: {
    VAceEditor
  },

}
</script>

<style>
.my-editor {

  height: 300px;
  width: 100%;
  border: 1px solid #ddd;

}
</style>