<!--
 * @Description: 自定义
 * @Date: 2023-02-28 14:30:22
 * @LastEditTime: 2023-09-08 18:28:20
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\formula\DefinedField.vue
-->

<template>
  <div>
    <el-form ref="addFormRef" :model="addForm" :rules="addFormRule" label-width="100px">
      <el-form-item label="指标名" prop="targetName">
        <el-input v-model="addForm.targetName" :maxlength="10" placeholder="指标名" style="width: 465px"></el-input>
      </el-form-item>
      <el-form-item label="指标单位" prop="targetUnit">
        <el-select v-model="addForm.targetUnit" clearable>
          <el-option value="K" label="K"></el-option>
          <el-option value="%" label="%"></el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item prop="desc" label="公式">
            <BaseEdit v-model:value="addForm.desc" />
            <!-- <el-input ref="textareaRef" id="textarea" v-model="addForm.desc" type="textarea" :rows="12" @drop="handleDrop($event)" @dragover="handleDragOver($event)"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-scrollbar height="262px">
            <div class="field-list">
              <div class="field-item" v-for="item in fieldOption" :key="item.key" @dblclick="handleAddField(item)" :draggable="item.isPublic === 1 ? true : false"
                @dragstart="handleDragStart($even, item)">
                {{ item.label }}
              </div>
            </div>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-form>
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
    <el-button type="default" @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">保 存</el-button>

  </div>
</template>

<script>
import {
  reactive,
  getCurrentInstance,
  nextTick,
  toRefs,
  ref,
  onMounted,
  watch,
} from 'vue'
import BaseEdit from '@/components/BaseEdit.vue'

export default {
  name: 'FormulaCom',
  components: {
    BaseEdit
  },
  props: {
    initData: {
      type: Object,
      default: () => { },
    },
  },
  setup(props, context) {
    let myField

    const { proxy } = getCurrentInstance()

    const addFormRef = ref(null)
    const textareaRef = ref(null)

    const state = reactive({
      visible: true,

      checkStatus: 1, // -1待校验，0校验中， 1校验成功，2校验失败

      addFormRule: {
        targetName: [
          {
            required: true,
            message: '请填写指标名',
            trigger: 'blur',
          },
        ],
        desc: [
          {
            required: true,
            message: '请填写指标公式',
            trigger: 'blur',
          },
        ],
      },

      addForm: calcInitData(),
      fieldOption: [
        {
          label: '区域',
          key: '001',
          isPublic: 1
        },
        {
          label: '省份',
          key: '002',
          isPublic: 1
        },
      ],
      activeKey: '',
    })

    watch(
      () => state.addForm.desc,
      async val => {
        // let fieldObj = {}
        // for (let item of state.fieldOption) {
        //   fieldObj[item.label] = item.key
        // }
        // const valueData = getTemplateInfo(val, fieldObj)
        // state.checkStatus = 0
        // try {
        //   await resourceApi.checkTargetFormula({
        //     targetFormula: valueData.templateValue,
        //     targetFormulaVar: valueData.resultKey,
        //   })
        //   state.checkStatus = 1
        // } catch (err) {
        //   state.checkStatus = 2
        // }
      }
    )

    function calcInitData() {
      if (Object.keys(props.initData || {})?.length) {
        return {
          ...props.initData,
          desc: props.initData.targetFormulaOriginal,
        }
      } else {
        return {
          targetName: '',
          desc: '',
          targetUnit: '',
        }
      }
    }

    const handleCancel = () => {
      context.emit('onCancel')
    }

    const handleSubmit = () => {
      const { targetName, desc, targetUnit } = state.addForm

      addFormRef.value.validate(valid => {
        if (valid) {
          if (state.checkStatus !== 1) {
            proxy.$resetMessage.warning('请填写正确的公式')
            return false
          }

          let fieldObj = {}
          for (let item of state.fieldOption) {
            fieldObj[item.label] = item.key
          }
          const valueData = getTemplateInfo(desc, fieldObj)

          const { templateValue, resultKey } = valueData

          const value = templateValue.replace(/\s+/g, '')

          const params = {
            ...props.initData,
            targetName,
            targetFormula: value,
            targetUnit,
            targetFormulaVar: resultKey,
            targetField: 'user' + targetName,
            targetFormulaOriginal: desc,
          }
          console.log(params)
          handleCancel()
        }
      })
    }

    //双击 添加字段
    const handleAddField = item => {
      if (item.isPublic === 1) {
        handleInsertParams(`{{${item.label}}}`)
      }
    }

    //拖动 添加字段
    const handleDrop = event => {
      handleInsertParams(`{{${state.activeKey.label}}}`)
    }

    //拖动 的值
    const handleDragStart = (event, item) => {
      state.activeKey = item
    }

    // 拖动 计算光标位置
    const handleDragOver = async event => {
      event.preventDefault()
      // 获取文本域内容 px 长度
      const textWidth = measureUseCanvas(14, state.addForm.desc)
      const strLength = state.addForm.desc.length
      const layerX = event.layerX
      let pos = 0

      // 计算鼠标位置与 文本域内容 px 长度关系 计算要插入文本的光标位置
      if (layerX >= textWidth) {
        pos = strLength
      } else {
        pos =
          strLength - Math.floor((textWidth - layerX) / (textWidth / strLength))
      }
      await nextTick()
      myField.focus()
      myField.setSelectionRange(pos, pos)
    }

    const handleInsertParams = async myValue => {
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart
        var endPos = myField.selectionEnd
        state.addForm.desc =
          myField.value.substring(0, startPos) +
          myValue +
          myField.value.substring(endPos, myField.value.length)
        await nextTick()
        myField.focus()
        myField.setSelectionRange(
          endPos + myValue.length,
          endPos + myValue.length
        )
      } else {
        state.addForm.desc += myValue
      }
    }

    // 获取字段
    const getAllTargetList = async () => {
      // const { data } = await resourceApi.getAllTargetList()
      // console.log(data)
      // state.fieldOption = data
      //   .filter(item => item.isPublic === 1)
      //   .map(item => {
      //     return {
      //       ...item,
      //       label: item.targetName,
      //       key: item.targetField || item.targetFormula,
      //     }
      //   })
    }

    onMounted(async () => {
      // getAllTargetList()
      console.log('xxxxxxxxxxxxxxxx')
      await nextTick()
      myField = document.querySelector('#textarea')

      sessionStorage.setItem('testtest',111)
    })

    return {
      textareaRef,
      ...toRefs(state),
      handleCancel,
      handleSubmit,
      addFormRef,
      handleAddField,
      handleDrop,
      handleDragStart,
      handleDragOver,
    }
  },
}

// 获取文字宽度
function measureUseCanvas(fontSize, text) {
  const _span = document.createElement('span')
  // 放入文本
  _span.innerText = text
  // 设置文字大小
  _span.style.fontSize = fontSize + 'px'
  // span元素转块级
  _span.style.position = 'absolute'
  // span放入body中
  document.body.appendChild(_span)
  // 获取span的宽度
  let width = _span.offsetWidth
  // 从body中删除该span
  document.body.removeChild(_span)
  // 返回span宽度
  return width
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
    // const reg = /\{\{(.+)\}\}/
    const reg = /\{\{([\w()（）\u4e00-\u9fa5]+)\}\}/
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
</script>

<style lang="less" scoped>
.field-list {
  .field-item {
    padding: 5px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}

.check-tips-sec {
  display: inline;
  margin-right: 20px;
  color: #606266;

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