<template>
  <span class="node-form-title">编辑 </span>
  <div class="node-form-content">
    <el-form :model="node" ref="dataForm" :line="true" label-width="60px" v-if="type === 'node'">
      <el-form-item label="类型" prop="type">
        <el-input v-model="node.type" :disabled="true" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="node.name" />
      </el-form-item>
      <el-form-item label="left坐标" prop="left">
        <el-input v-model="node.left" :disabled="true" />
      </el-form-item>
      <el-form-item label="top坐标" prop="top">
        <el-input v-model="node.top" :disabled="true" />
      </el-form-item>
      <el-form-item label="ico" prop="ico">
        <el-input v-model="node.ico" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleResetForm">重置</el-button>
        <el-button type="primary" @click="handleSaveNode">保存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="line" :line="true" ref="dataForm" label-width="60px" v-if="type === 'line'">
      <el-form-item label="条件" prop="label">
        <el-input v-model="line.label" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleResetForm">重置</el-button>
        <el-button type="primary" @click="handleSaveLine">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import lodash from 'lodash'

export default {
  emits: ['setLineLabel', 'repaintEverything'],
  setup(_, context) {
    const dataForm = ref(null)
    const state = reactive({
      tempData: {},
      node: {
        type: '',
        name: '',
        left: '',
        top: '',
        ico: '',
        xData: '',
      },
      line: {
        from: '',
        label: '',
        to: '',
      },
      type: 'node',
    })

    const lineInit = data => {
      state.line = lodash.cloneDeep(data)
      state.tempData = lodash.cloneDeep(data)
      state.type = 'line'
    }

    const nodeInit = data => {
      state.type = 'node'
      state.tempData = lodash.cloneDeep(data)
      state.node = lodash.cloneDeep(data)
    }

    const handleResetForm = () => {
      state[state.type] = lodash.cloneDeep(state.tempData)
    }

    const handleSaveLine = () => {
      context.emit('setLineLabel', state.line)
    }

    const handleSaveNode = () => {
      context.emit('repaintEverything', state.node)
    }

    return {
      dataForm,
      ...toRefs(state),
      lineInit,
      nodeInit,
      handleSaveNode,
      handleSaveLine,
      handleResetForm,
    }
  },
}
</script>

<style lang="less">
.node-form-content {
  padding: 20px;
}

.node-form-title {
  padding: 0 20px;
  display: inline-block;
  width: 100%;
  text-align: left;
  line-height: 38px;
  background: #eee;
  border-bottom: 1px solid #ddd;
}
</style>