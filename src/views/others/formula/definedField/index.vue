<!--
 * @Description: 公式
 * @Date: 2023-02-28 14:30:22
 * @LastEditTime: 2025-02-21 18:23:23
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\formula\definedField\index.vue
-->
<template>

  <div class="field-wrap">
    <div style="position: absolute;top: -30px;right: 10px;">
      <el-link href="https://doris.apache.org/zh-CN/docs/sql-manual/sql-functions/window-functions/WINDOW-FUNCTION" target="_blank" type="primary" :underline="false">窗口函数官方文档</el-link>
    </div>
    <div class="editor-wrap">
      <BaseAceEditor ref="aceEditorRef" v-model:value="descText" lang="sql" />
      <div>
        <el-scrollbar min-height="272px" max-height="400px">
          <div class="calculate-wrap">
            <div class="calculate-item" v-for="item in calculateOptions" :key="item.label" @click="handleAddField(item, 'operator')">
              <span class="content">{{ item.label }}</span>
              <el-tooltip effect="dark" :content="item.tips" placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <div class="field-list">
        <el-input v-model="searchName" placeholder="搜索" suffix-icon="Search" />
        <el-scrollbar min-height="150px" max-height="400px">
          <div class="field-item" v-for="item in fieldList.filter(i => i.column?.toLowerCase().indexOf(searchName?.toLowerCase()) !== -1)" :key="item.columnId" @click="handleAddField(item, 'field')">
            <span class="content">{{ item.label }}</span>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>

</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { useVModel } from '@vueuse/core'

import BaseAceEditor from '@/components/BaseEdit.vue'

export default {
  name: 'CalculateField',
  components: {
    BaseAceEditor
  },
  props: {
    value: String, // 值
    fieldList: { // 可操作字段
      type: Array,
      default: () => [],
    },
    calculateOptions: Array, // 公式
  },
  setup(props, context) {

    const textareaRef = ref(null)
    const aceEditorRef = ref(null)

    const descText = useVModel(props, 'value', context.emit)
    
    const state = reactive({
      visible: true,
      searchName: '',
      activeKey: '',
    })

    //双击 添加字段
    const handleAddField = async (item, type = 'operator') => {
      if (item.isParent) return false
      const label = type === 'field' ? '{{' + item.label + '}}' : item.content
      if (type === 'operator') {
        aceEditorRef.value.editorRef._editor.setValue('')
      }
      aceEditorRef.value.editorRef._editor.insert(label)
    }
   
    return {
      descText,
      textareaRef,
      aceEditorRef,
      ...toRefs(state),
      handleAddField,
    }
  },
}
</script>

<style lang="less" scoped>
.field-wrap {
  position: relative;
  width: 100%; 
  min-height: 400px; 
}

.editor-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 300px;
  align-items: stretch;

  &>div {
    margin: 0 5px;
    flex-grow: 1;
    border: 1px solid #ddd;
    border-radius: 3px;

    &:first-child {
      margin-left: 0;
    }
  }

  .ace-editor {
    height: auto;
  }
}

.field-list {
  padding: 10px;

  .field-item {
    margin: 5px 0 0 0;
    padding: 3px;
    line-height: 1;

    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}

.el-col {
  border: none;
}

.calculate-wrap {
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;

  .calculate-item {
    padding: 7px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    cursor: pointer;

    &:hover {
      background: #ccc;
    }
  }
}

.icon-delete {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>