<!--
 * @Description: 计算字段
 * @Date: 2023-02-28 14:30:22
 * @LastEditTime: 2024-06-20 16:46:39
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\formula\DefinedField.vue
-->
<template>
  <!-- <div v-dialogChange="true">
    <el-dialog draggable v-model="visible" :title="`${isEdit ? '编辑' : '新增'}自定义字段`" width="1200px" :before-close="handleCancel" :close-on-click-modal="false"> -->

  <el-form ref="addFormRef" :model="addForm" :rules="addFormRule" label-width="150px" style="min-width: 800px">
    <el-form-item label="字段(中文)" prop="newCnColumn">
      <el-input v-model="addForm.newCnColumn" placeholder="字段(中文)" style="width: 465px"></el-input>
    </el-form-item>

    <el-form-item label="字段(英文)" prop="newEnColumn">
      <el-input v-model="addForm.newEnColumn" placeholder="字段(英文)" style="width: 465px"></el-input>
    </el-form-item>


    <el-row :gutter="24">
      <el-col :span="16">
        <el-form-item prop="descText" label="公式">
          <div style="position: absolute;top: -30px;right: 10px;">
            <el-link href="https://doris.apache.org/zh-CN/docs/sql-manual/sql-functions/window-functions/WINDOW-FUNCTION" target="_blank" type="primary" :underline="false">窗口函数官方文档</el-link>
          </div>
          <div class="editor-wrap">

            <BaseAceEditor ref="aceEditorRef" v-model:value="addForm.descText" lang="sql" />

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
              <el-scrollbar min-height="272px" max-height="400px">
                <div class="field-item" v-for="item in fieldList.filter(i => i.column?.toLowerCase().indexOf(searchName?.toLowerCase()) !== -1)" :key="item.columnId"
                  @click="handleAddField(item, 'field')">
                  <span class="content">{{ item.label }}</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="check-tips-sec">
            <span>公式检测：</span>
            <el-icon v-if="checkStatus === 0" class="is-loading" color="#ccc">
              <Loading />
            </el-icon>
            <el-icon v-else-if="checkStatus === 1" class="check-icon-success">
              <CircleCheck />
            </el-icon>
            <el-icon v-else-if="checkStatus === 2" class="check-icon-error">
              <CircleCloseFilled />
            </el-icon>
            <span v-else>待校验</span>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>


  <el-row justify="end">
    <el-button type="default" @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">保 存</el-button>
  </el-row>
  <!-- <template #footer>
        <el-button type="default" @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">保 存</el-button>
      </template>
<div class="mouse">
  <el-icon>
    <rank />
  </el-icon>
</div>
</el-dialog>
</div> -->
</template>

<script>
import { reactive, getCurrentInstance, unref, toRefs, ref, onMounted, watch } from 'vue'
import BaseAceEditor from '@/components/BaseEdit.vue'

import { dataViewApi } from '@/services'
import { localGet } from '@/utils'
import useGetUuid from '@/hooks/useGetUuid'


export default {
  name: 'CalculateModal',
  components: {
    BaseAceEditor
  },
  props: {
    originFieldList: {
      type: Array,
      default: () => [],
    },

    calculateOptions: Array, // 公式

    initData: {
      type: Object,
      default: () => { },
    },
    dataSetId: {
      type: String,
      default: '',
    },
  },
  emits: ['onCancel', 'onOk'],
  setup(props, context) {
    const { uuid, getUuid } = useGetUuid()

    const { proxy } = getCurrentInstance()

    const addFormRef = ref(null)
    const textareaRef = ref(null)
    const aceEditorRef = ref(null)

    const state = reactive({
      visible: true,
      searchName: '',
      isEdit: !!(props.initData?.columnId || props.initData?.newColumnId),
      checkStatus: 1, // -1待校验，0校验中， 1校验成功，2校验失败

      addFormRule: {
        newCnColumn: [
          {
            required: true,
            message: '请填写公式名',
            trigger: 'blur',
          },
        ],
        descText: [
          {
            required: true,
            message: '请填写公式',
            trigger: 'blur',
          },
        ],
      },

      addForm: calcInitData(),
      fieldList: calcFieldList(props.originFieldList),
      activeKey: '',
      calculateFormula: props.initData?.value, // 校验成功的 公式
    })

    watch(
      () => state.addForm.descText,
      async val => {

        let fieldObj = {}
        for (let item of state.fieldList) {
          fieldObj[item.label] = item.value
        }
        const calculateFormula = getTemplateInfo(val, fieldObj)

        console.log(calculateFormula)
        // state.checkStatus = 0
        // try {
        //   await dataViewApi.checkColumnCustomRule({
        //     customRule: calculateFormula.templateValue,
        //     dataSetId: props.dataSetId,
        //     preSql: props.initData.thisSql,
        //     tableColumnList: state.fieldList,
        //   })
        //   state.checkStatus = 1
        //   state.calculateFormula = calculateFormula.templateValue
        // } catch (err) {
        //   state.checkStatus = 2
        // }
      },
      {
        deep: true,
      }
    )

    // 处理同名相同的 加个数字
    function calcFieldList(originFieldList) {
      return originFieldList.map((item, index, arr) => {
        const len = arr.slice(0, index + 1).filter(i => i.column === item.column)?.length
        return {
          ...item,
          label: len > 1 ? `${item.column}[${len - 1}]` : item.column,
          value: item.columnId,
        }
      })
    }

    function calcInitData() {
      if (props.initData?.columnId || props.initData?.newColumnId) {
        const val = props.initData.value
        let tempArr = val.match(/[a-zA-Z0-9]+/g)
        let valueText = val
        tempArr?.forEach(item => {
          const fieldItem = calcFieldList(props.originFieldList).find(i => i.value === item.trim())
          if (fieldItem) {
            valueText = valueText.replace(item, '{{' + fieldItem.label + '}}')
            console.log('item', valueText)
          }
        });

        return {
          ...props.initData,
          descText: valueText,
        }
      } else {
        return {
          newEnColumn: '',
          newCnColumn: '',
          descText: '',
        }
      }
    }


    // 规换{{}}内容
    function getTemplateInfo(template, data) {
      let resultKey = []

      const templateValue = renderTemplate(template, data)

      return {
        templateValue,
        resultKey: Array.from(new Set(resultKey)).join(','),
      }

      function renderTemplate(template, data) {
        const reg = /\s*\{\{([\w()（）%&#~$——+-x_/\u4e00-\u9fa5\s]+)\}\}\s*/
        if (reg.test(template)) {
          const name = reg.exec(template)[1]
          resultKey.push(data[name])
          template = template.replace(reg, ` ${data[name]} `)
          console.log(template)
          return renderTemplate(template, data)
        }
        return template
      }
    }

    const handleCancel = () => {
      context.emit('onCancel')
    }

    const handleSubmit = () => {
      const { newCnColumn, newEnColumn, descText } = state.addForm
      const { calculateFormula } = state
      addFormRef.value.validate(async valid => {
        if (valid) {
          if (state.checkStatus !== 1) {
            proxy.$resetMessage.warning('请填写正确的公式')
            return false
          }
          let params = {
            newCnColumn,
            newEnColumn,
            value: calculateFormula,
            valueJson: descText,
            valueText: descText.replace(/[\s*{{]/g, ' ').replace(/}}\s*/g, ' '),
            column: localGet('lang') === 'cn' ? newCnColumn : newEnColumn,
          }

          if (!state.isEdit) {
            await getUuid()
            params = {
              ...params,
              newColumnId: unref(uuid),
            }
          } else {
            params = {
              ...params,
              columnId: props.initData.columnId,
              newColumnId: props.initData.newColumnId,
            }
          }
          console.log(params)
          context.emit('onOk', params)
          handleCancel()
        }
      })
    }

    //双击 添加字段
    const handleAddField = async (item, type = 'operator') => {
      if (item.isParent) return false
      const label = type === 'field' ? '{{' + item.label + '}}' : item.content
      if (type === 'operator') {
        aceEditorRef.value.editorRef._editor.setValue('')
      }
      aceEditorRef.value.editorRef._editor.insert(label)
    }

    onMounted(() => { })

    return {
      textareaRef,
      aceEditorRef,
      ...toRefs(state),
      handleCancel,
      handleSubmit,
      addFormRef,
      handleAddField,
    }
  },
}


</script>

<style lang="less" scoped>
.editor-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 300px;

  &>div {
    margin: 0 5px;
    height: 100%;
    flex-grow: 1;
    border: 1px solid #ddd;
    border-radius: 3px;

    &:first-child {
      margin-left: 0;
    }
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

.check-tips-sec {
  display: inline;
  margin-right: 20px;
  color: var(--el-text-color-regular);

  .el-icon {
    vertical-align: middle;
    margin-right: 20px;
    font-size: 30px;
  }

  .check-icon-success {
    color: #67c23a;
  }

  .check-icon-error {
    color: #f56c6c;
  }

  .check-icon-success {
    color: #67c23a;
  }
}

.icon-delete {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>