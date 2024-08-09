<!--
 * @Description: 查询条件
 * @Date: 2024-08-06 17:40:48
 * @LastEditTime: 2024-08-07 14:05:08
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\searchForm\index.vue
-->

<template>

  <el-form ref="formRef" :rules="rules" :model="searchForm" inline>
    <div>
      <el-form-item label="搜索类型">
        <el-radio-group v-model="searchForm.type">
          <el-radio label="节点搜索" :value="1"></el-radio>
          <el-radio label="终点搜索" :value="2"></el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
    <el-form-item label="币种">
      <el-select v-model="searchForm.currency" style="width: 120px">
        <el-option value="RMB" label="RMB"></el-option>
        <el-option value="USD" label="USD"></el-option>
      </el-select>
    </el-form-item>

    <template v-if="searchForm.type === 1">
      <el-form-item label="资源简称">
        <el-select v-model="searchForm.resNameList" style="width: 190px" placeholder="请选择" filterable collapse-tags multiple clearable @change="getPnListByShortName">
          <el-option v-for="item in shortNameOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="PN">
        <el-select v-model="searchForm.pnList" style="width: 190px" placeholder="请选择" filterable collapse-tags multiple clearable>
          <el-option v-for="item in pnOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="料号">
        <el-input v-model="searchForm.itemNum" placeholder="多个料号用逗号隔开"></el-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="searchForm.isExpand" :true-value="1" :false-value="0">扩展路径</el-checkbox>
      </el-form-item>
    </template>

    <template v-else>
      <el-form-item label="开始节点料号" prop="startItemNum">
        <el-input v-model="searchForm.startItemNum" placeholder="开始节点料号"></el-input>
      </el-form-item>
      <el-form-item label="结束节点料号" prop="endItemNum">
        <el-input v-model="searchForm.endItemNum" placeholder="结束节点料号"></el-input>
      </el-form-item>
    </template>

    <el-form-item>
      <el-space>
        <el-button type="primary" icon="search" @click="handleSearch">搜 索</el-button>
        <slot name="operator"></slot>
      </el-space>
    </el-form-item>

  </el-form>

</template>

<script>
import { ref, reactive, toRefs, onMounted, toRef } from 'vue'
import { useVModel } from '@vueuse/core'

import { processApi } from '@/services'

export default {
  name: 'SearchForm',
  components: {
  },
  props: {
    elForm: Object
  },
  emits: ['onSearch'],
  setup(props, context) {

    const searchForm = useVModel(props, 'elForm', context.emit)

    const formRef = ref(null)
    const state = reactive({
      rules: {
        startItemNum: [
          {
            required: true,
            message: '请填写开始节点',
            trigger: ['change', 'blur']
          }
        ],
        endItemNum: [
          {
            required: true,
            message: '请填写结束节点',
            trigger: ['change', 'blur']
          }
        ]
      },
      shortNameOptions: [],
      pnOptions: []
    })

    // 获取 简称列表
    const getShortNameList = async () => {
      const { data } = await processApi.getShortNameList({})
      state.shortNameOptions = data
    }

    // 通过简称 获取 PNList
    const getPnListByShortName = async () => {
      const { resNameList } = searchForm.value
      const params = {
        keyList: resNameList
      }
      const { data } = await processApi.getPnListByShowName(params)

      state.pnOptions = data.map(i => {
        return {
          label: i,
          value: i
        }
      })
    }

    const handleSearch = () => {
      formRef.value.validate(valid => {
        if (valid) {
          context.emit('onSearch')
        }
      })
    }

    onMounted(() => {
      getShortNameList()
    })


    return {
      formRef,
      searchForm,
      ...toRefs(state),
      getPnListByShortName,
      handleSearch
    }
  }
}
</script>

<style lang='less' scoped></style>