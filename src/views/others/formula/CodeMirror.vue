
<template>
  <div class="operate-wrap">

    <el-form ref="addFormRef" :model="addForm" :rules="addFormRule" label-width="150px" style="width: 40%; min-width: 800px">
      <el-form-item label="新增公式列名" prop="targetName">
        <el-input v-model="addForm.targetName" :maxlength="10" placeholder="新增公式列名" style="width: 465px"></el-input>
      </el-form-item>

      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item prop="desc" label="公式">
            <div class="calculate-wrap">
              <el-space wrap>
                <span class="calculate-item" v-for="item in calculateOptions" :key="item.label" @click="handleAddField(item, 'operator')">{{item.label}}</span>
              </el-space>
            </div>
            <div class="mirror-code" @click="handleGetPos" v-click-outside="handleOutSideMirrorClick">
              <span class="mirror-cursors" :style="{left: cursorPos.left + 'px', top: cursorPos.top + 'px'}">|</span>
              <el-input v-if="inputFouces" ref="inputRef" v-model="inputText" autofocus class="mirror-input" :style="{left: (cursorPos.left + 2) + 'px', top: cursorPos.top + 'px'}" @input="handleChangeInput" />
              <!-- <div class="mirror-list" v-for="item in addFieldList" :key="item.value">
                <span :class="item.type === 'field' ? 'text-success': ''">{{item.label}}</span>
              </div> -->

              <div class="textArea">
                <div class="row-list" v-for="(item, index) in rowList" :key="index">
                  <span :data-set="JSON.stringify({rowIndex: index, subIndex:  subIndex})" v-for="(subItem, subIndex) in item" :key="subIndex">
                    {{subItem.label}}
                  </span>
                </div>
              </div>
            </div>
            <!-- <el-input ref="textareaRef" id="textarea" v-model="addForm.desc" type="textarea" :rows="12" @drop="handleDrop($event)" @dragover="handleDragOver($event)"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-scrollbar min-height="272px">
            <div class="field-list">

              <el-input v-model="searchName" placeholder="搜索" suffix-icon="Search" />
              <div class="field-list">
                <div class="field-item" v-for="item in fieldList.filter(i => i.column?.toLowerCase().indexOf(searchName?.toLowerCase()) !== -1)" :key="item.column" @dblclick="handleAddField(item, 'field')" :draggable="true" @dragstart="handleDragStart($even, item)">
                  <span>{{item.columnType}}</span>
                  <span>{{item.column}}</span>
                </div>
              </div>

              <!-- <div class="field-item" v-for="item in fieldList" :key="item.key" @dblclick="handleAddField(item)" :draggable="item.isPublic === 1 ? true : false" @dragstart="handleDragStart($even, item)">
                {{item.label}}
              </div> -->
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
  unref,
} from 'vue'

const mockField = [
  {
    column: 'A字段',
    columnType: 'number',
  },
  {
    column: 'B字段',
    columnType: 'date',
  },
  {
    column: 'Cl字段',
    columnType: 'string',
  },
  {
    column: 'D字段',
    columnType: 'string',
  },
]

const calculateOptions = [
  {
    label: '+',
    value: '+',
  },
  {
    label: '-',
    value: '-',
  },
  {
    label: 'x',
    value: 'x',
  },
  {
    label: '/',
    value: '/',
  },
  {
    label: '(',
    value: '(',
  },
  {
    label: ')',
    value: ')',
  },
]

export default {
  name: 'CalculateColumnCom',
  props: {
    initData: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  setup(props, context) {
    let myField

    const { proxy } = getCurrentInstance()

    const addFormRef = ref(null)
    const textareaRef = ref(null)
    const inputRef = ref(null)

    const state = reactive({
      visible: true,
      searchName: '',

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

      calculateOptions: calculateOptions,
      addForm: calcInitData(),
      fieldList: [],
      activeKey: '',

      addFieldList: [], // 添加的字段

      inputText: '',
      cursorPos: {
        left: 0,
        top: 0,
      },
      rowList: [
        [
          {
            label: 'test',
            pos: {
              start: 0,
              end: 20,
            },
          },
        ],
      ],
      inputFouces: false,
    })

    watch(
      () => state.addForm.desc,
      async val => {
        // let fieldObj = {}
        // for (let item of state.fieldList) {
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
          for (let item of state.fieldList.concat(state.calculateOptions)) {
            fieldObj[item.label] = item.key || item.value
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
    const handleAddField = (item, type) => {
      // if (item.isPublic === 1) {
      handleInsertParams(`{{${item.label}}}`)
      // }

      state.addFieldList.push({
        ...item,
        type,
      })
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
      // setSelectionRange 控制光标的位置
      myField.setSelectionRange(pos, pos)
    }

    // 添加字段
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
      state.fieldList = mockField.map(i => {
        return {
          ...i,
          label: i.column,
          key: i.column,
        }
      })
    }

    let activeRowColumnData = {}
    let clickLayerX = 0

    // 获取光标输入位置
    const handleGetPos = event => {
      debugger
      state.inputText = ''
      let { layerX, layerY } = event
      console.log(layerX, layerY, event)

      if (event.target.nodeName === 'INPUT') {
        layerX += state.cursorPos.left
      }

      let activeLeft = 0
      let activeTop = 0

      const rowIndex = Math.floor(layerY / 30)

      // const clickDom = document.elementFromPoint(event.clientX, event.clientY)
      // console.log(clickDom)

      let subIndex = -1

      for (let i = 0; i < state.rowList[rowIndex].length; i++) {
        const preStr = state.rowList[rowIndex]
          .slice(0, i)
          .reduce((result, item) => (result += item.label), '')
        const startPos = measureUseCanvas(14, preStr)
        const endPost = measureUseCanvas(
          14,
          preStr + state.rowList[rowIndex][i]?.label
        )
        if (startPos <= layerX && layerX <= endPost) {
          subIndex = i
          break
        }
      }

      console.log(subIndex)

      if (state.rowList.length === 0) {
        activeLeft = 0
        activeTop = 0
      } else {
        if (subIndex >= 0) {
          activeLeft = layerX
        } else {
          const allStr = state.rowList[rowIndex].reduce(
            (result, item) => (result += item.label),
            ''
          )
          activeLeft = measureUseCanvas(14, allStr)
        }

        activeTop = rowIndex * 30
      }

      state.cursorPos = {
        left: activeLeft,
        top: activeTop,
      }

      clickLayerX = activeLeft // 光标点击的位置

      subIndex = subIndex === -1 ? state.rowList[rowIndex].length : subIndex

      activeRowColumnData = {
        rowIndex: rowIndex,
        subIndex: subIndex,
      }

      const activeData = state.rowList[rowIndex][subIndex]

      console.log(activeRowColumnData, activeData)

      if (!activeData) {
        state.rowList[rowIndex][subIndex] = {
          label: '',
        }
      }

      state.rowList[rowIndex][subIndex].originLabel =
        state.rowList[rowIndex][subIndex].label

      state.inputFouces = true
      inputRef.value?.focus()
    }

    // input值改变时，给 rowList
    const handleChangeInput = value => {
      const { rowIndex, subIndex } = activeRowColumnData

      // 点击位置的 内容
      const currentData = state.rowList[rowIndex][subIndex] || {}
      let str = currentData?.label || ''

      const originLabel = currentData.originLabel || ''

      const originLabelWidth = measureUseCanvas(14, originLabel)

      console.log(originLabel, clickLayerX, originLabelWidth)

      const strLength = originLabel.length
      const pos =
        strLength === 0
          ? 0
          : strLength -
            Math.floor(
              (originLabelWidth - clickLayerX) / (originLabelWidth / strLength)
            )

      console.log(pos)

      // if (subIndex === state.rowList[rowIndex].length - 1) {
      //   str = value
      // } else {

      const textWidth = measureUseCanvas(14, value)

      state.cursorPos.left =
        measureUseCanvas(currentData.originLabel.substring(0, pos)) + textWidth

      console.log(pos, textWidth)

      str =
        currentData.originLabel.substring(0, pos) +
        value +
        currentData.originLabel.substring(pos, strLength)
      // }

      state.rowList[rowIndex][subIndex] = {
        ...currentData,
        label: str,
      }
    }

    const handleOutSideMirrorClick = () => {
      state.inputText = ''
      state.inputFouces = false
    }

    onMounted(async () => {
      getAllTargetList()

      await nextTick()
      myField = document.querySelector('#textarea')
    })

    return {
      textareaRef,
      inputRef,
      ...toRefs(state),
      handleCancel,
      handleSubmit,
      addFormRef,
      handleAddField,
      handleDrop,
      handleDragStart,
      handleDragOver,

      handleGetPos,
      handleChangeInput,
      handleOutSideMirrorClick,
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
    const reg = /\{\{([\w()（）+-x/\u4e00-\u9fa5]+)\}\}/
    debugger
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
.operate-wrap {
  padding: 20px;
  height: 100%;
  overflow: auto;
}

.field-list {
  padding: 10px 0;

  .field-item {
    padding: 5px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}

.el-col {
  border: none;
}

.calculate-wrap {
  width: 100%;
  padding-bottom: 5px;
  .calculate-item {
    padding: 0px 15px;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background: #ccc;
    }
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

.mirror-code {
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
  position: relative;

  .mirror-cursors {
    position: absolute;
  }

  .mirror-input {
    position: absolute;
    opacity: 0.1;
  }

  .mirror-list {
    display: inline-block;
  }
}
</style>