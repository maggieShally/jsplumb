<!--
 * @Description: 
 * @Date: 2023-02-28 14:15:22
 * @LastEditTime: 2025-02-21 17:11:35
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\formula\CalcField.modal.vue
-->

<template>

  <el-form ref="addFormRef" :model="addForm" :rules="addFormRule" label-width="150px" style="min-width: 800px">
    <el-form-item label="字段(中文)" prop="newCnColumn">
      <el-input v-model="addForm.newCnColumn" placeholder="字段(中文)" style="width: 465px"></el-input>
    </el-form-item>

    <el-form-item label="字段(英文)" prop="newEnColumn">
      <el-input v-model="addForm.newEnColumn" placeholder="字段(英文)" style="width: 465px"></el-input>
    </el-form-item>

    <el-form-item prop="descText" label="公式">
      <div style="width: 80%">
        <DefinedField ref="descRef" v-model:value="addForm.descText" :initData="editData" :fieldList="fieldList" :calculateOptions="customFieldConfig" />
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

    <el-form-item label=" ">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import { computed, onMounted, watch, reactive, toRefs, ref, getCurrentInstance } from 'vue'

import { dataViewApi } from '@/services'
import { localGet } from '@/utils'

import useGetUuid from '@/hooks/useGetUuid'

import DefinedField from './definedField/index.vue'
import { customFieldConfig } from './config.js'
import { originFieldList, editData } from './mockData.js'
import { getTemplateInfo, getValueText, calcFieldList } from './utils.js'

import BaseChart from '@/components/BaseChart/ChartPie.vue'

export default {
  name: 'CalcFieldModal',
  components: {
    DefinedField,
  },
  props: {
    initData: {
      type: Object,
      default: () => { },
    },
  },
  emits: ['onOk', 'onCancel'],
  setup(props) {

    const { proxy } = getCurrentInstance()

    const addFormRef = ref(null)
    const descRef = ref(null)

    const addFormRule = {
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
    }

    const state = reactive({
      fieldList: calcFieldList(originFieldList),
      editData,
      isEdit: props.initData?.columnId || props.initData?.newColumnId,
      addForm: {
        newEnColumn: '',
        newCnColumn: '',
        descText: '',
      },
      checkStatus: 2, // -1待校验，0校验中， 1校验成功，2校验失败
    })

    watch(() => state.addForm.descText,
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

    const handleSubmit = () => {
      const { newCnColumn, newEnColumn, descText } = state.addForm
      const { calculateFormula } = state
      addFormRef.value.validate(async valid => {
        if (valid) {
          if (state.checkStatus !== 1) {
            alert('请填写正确的公式')
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
        }
      })
    }

    onMounted(() => {
      if (props.initData.newCnColumn) {
        const descText = getValueText(props.initData.value, state.fieldList)
        state.addForm = {
          ...props.initData,
          descText,
        }
      }
    })

    return {
      descRef,
      addFormRef,
      addFormRule,
      customFieldConfig,
      handleSubmit,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="less" scoped>
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
</style>