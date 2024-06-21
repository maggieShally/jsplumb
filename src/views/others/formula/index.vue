<!--
 * @Description: 
 * @Date: 2023-02-28 14:15:22
 * @LastEditTime: 2024-05-17 15:27:21
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\formula\index.vue
-->
<template>
  <DefinedField :originFieldList="fieldList" :calculateOptions="customFieldConfig" />
</template>


<script>
import { computed, reactive, toRefs } from 'vue'
import DefinedField from './DefinedField.vue'

import { customFieldConfig, formatOptions } from './config'

export default {
  name: 'FormulaCom',
  components: {

    DefinedField,
  },

  setup() {

    const state = reactive({
      fieldList: [
        {
          "columnId": "a65b07eb7d5de61850bf2750c",
          "column": "料号",
          "columnType": "string",
          "customColumnType": "string",
          "className": "java.lang.String",
          "cnColumn": "料号",
          "enColumn": "料号",
          "fieldPermission": "Y",
          "isHidden": 0,
          "tableName": null
        },
        {
          "columnId": "a65b07eb7d5de61850bf2750d",
          "column": "采购在途数",
          "columnType": "number",
          "customColumnType": "double",
          "className": "java.math.BigDecimal",
          "cnColumn": "采购在途数",
          "enColumn": "采购在途数",
          "fieldPermission": "Y",
          "isHidden": 0,
          "tableName": null
        },
        {
          "columnId": "a65b07eb7d5de61850bf2750e",
          "column": "请购在途数",
          "columnType": "number",
          "customColumnType": "double",
          "className": "java.math.BigDecimal",
          "cnColumn": "请购在途数",
          "enColumn": "请购在途数",
          "fieldPermission": "Y",
          "isHidden": 0,
          "tableName": null
        },
        {
          "columnId": "a65b0d262d5de2bf45941c103",
          "column": "test",
          "columnType": "number",
          "customColumnType": null,
          "className": "java.math.BigDecimal",
          "cnColumn": "test",
          "enColumn": "test",
          "fieldPermission": "Y",
          "isHidden": 0,
          "tableName": null
        },
        {
          "columnId": "a65b1bb81d5dea9fe482d13a2",
          "column": "test2",
          "columnType": "number",
          "customColumnType": null,
          "className": "java.math.BigDecimal",
          "cnColumn": "test2",
          "enColumn": "test2",
          "fieldPermission": "Y",
          "isHidden": 0,
          "tableName": null
        },
        {
          "columnId": "a663c44a4d5de155f091f495c",
          "column": "test",
          "columnType": "string",
          "customColumnType": null,
          "className": "java.lang.String",
          "cnColumn": "test",
          "enColumn": "tes",
          "fieldPermission": "Y",
          "isHidden": 0,
          "tableName": null
        },
        {
          "columnId": "a6642dcedd5debc0f3a42c2ab",
          "column": "采购 在途 数",
          "columnType": "number",
          "customColumnType": "double",
          "className": "java.math.BigDecimal",
          "cnColumn": "采购 在途 数",
          "enColumn": "",
          "fieldPermission": "Y",
          "isHidden": 0,
          "tableName": null
        }
      ]
    })

    return {
      customFieldConfig,
      ...toRefs(state)
    }
  },
}
</script>

<style></style>