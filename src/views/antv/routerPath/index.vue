<!--
 * @Description: 
 * @Date: 2024-01-02 10:48:41
 * @LastEditTime: 2024-10-16 16:29:07
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\index.vue
-->
<template>
  <div style="width: 100%; height: 100%;">
    <SplitBoxT2B :initRatio="0.65">
      <template #top>
        <div class="top-wrap">
          <SearchForm :elForm="searchForm" @onSearch="handleSearch">
            <template #operator>
              <el-tooltip content="分离视图" placement="top">
                <el-icon :class="isDisjoint ? 'isActive' : ''" @click="handleDisjoint">
                  <Switch />
                </el-icon>
              </el-tooltip>
            </template>
          </SearchForm>

          <div class="graph-flex">

            <div class="main-graph" style="display: flex; flex-direction: column;">
              <div class="process-pos">
                <ProcessTextCom />
              </div>
              <!-- <div style="flex: 1; width: 100%; display: flex'" id="mainWrap"> -->
              <div id="mainWrap" style="width: 100%; height: 100%">
                <DisjointGraph ref="mainGraphRef" :isMainGraph="true" uKey="main" @onGetTableData="handleGetTableData" @onGetViewData="handleGetViewData" :data="allData" />
              </div>
            </div>

            <div class="disjoint-graph" v-if="disjointType">
              <el-radio-group v-model="disjointType" size="large">
                <el-radio-button label="分离视图" value="view" />
                <el-radio-button v-if="activeClickNodeData.configAttribute === 'itemNum'" label="分离路径" value="path" />
              </el-radio-group>

              <div v-show="disjointType === 'view'" class="graph-sec">
                <DisjointGraph ref="disjoinViewGraphRef" uKey="subView" @onGetTableData="handleGetTableData" :data="disjointViewData" />
              </div>

              <div v-show="disjointType === 'path'" class="graph-sec">
                <el-form :model="disjointPathSearchForm" inline style="margin: 10px;">
                  <el-form-item label="" style="margin-bottom: 0">
                    <el-radio-group v-model="disjointPathSearchForm.isDesc" size="small">
                      <el-radio-button label="升序" value="0" />
                      <el-radio-button label="降序" value="1" />
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0">
                    <el-button type="primary" @click="getDisjointPathData" size="small">查 询</el-button>
                  </el-form-item>
                </el-form>

                <div style="height: calc(100% - 53px)">
                  <DisjointGraph ref="disjointPathGraphRef" uKey="subPath" @onGetTableData="handleGetTableData" :data="disjointPathData" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </template>

      <template #bottom>
        <NodeDetailsTable :data="nodeTableData" />
      </template>

    </SplitBoxT2B>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

import { processApi } from '@/services'

import SplitBoxT2B from '@/components/SplitBox/SplitBoxT2B.vue'

import ProcessTextCom from './ProcessTextCom.vue'
import NodeDetailsTable from './NodeDetail.table.vue'

import DisjointGraph from './graph/Disjoint.graph.vue'

import SearchForm from './searchForm/index.vue'

import { useGetProcessData } from './hooks/useGetProcessData.js'




export default {
  name: 'RouterPath',
  components: {
    NodeDetailsTable,
    ProcessTextCom,
    DisjointGraph,
    SearchForm,
    SplitBoxT2B
  },
  setup() {

    const mainGraphRef = ref(null)
    const disjoinViewGraphRef = ref(null)
    const disjointPathGraphRef = ref(null)

    const state = reactive({

      searchForm: {
        type: 1,

        currency: 'RMB',
        resNameList: [],
        pnList: [],
        isExpand: 0,
        itemNum: 'ZJC0007X3314',

        // startItemNum: '',
        // endItemNum: '',

        startItemNum: "IFW0001A2258",
        endItemNum: "ZJC0001S1529",
      },

      isDisjoint: false, // 是否视图分离

      allData: [],
      nodeTableData: [],

      showDisjoint: false, //显示分离路径
      disjointType: '', // 分离tab
      disjointViewData: [], // 节点分离视图数据
      disjointPathData: [], // 节点分离路径数据

      activeClickNodeData: {},

      disjointPathSearchForm: {
        sortType: '',
        isDesc: 1
      }
    })

    const { processData } = useGetProcessData()


    const valueToArr = str => {
      return str.replaceAll('，', ',').split(',')
    }

    // 搜索
    const handleSearch = () => {

      getMainViewNodeData()
    }


    // 主实图节点
    const getMainViewNodeData = async () => {
      const { type, endItemNum, startItemNum, itemNum, currency, ...extra } = state.searchForm
      let params = {
        currency
      }
      if (type === 1) {
        params = {
          ...params,
          ...extra,
          itemNumList: valueToArr(itemNum)
        }
      } else {
        params = {
          ...params,
          startItemNumList: valueToArr(startItemNum),
          endItemNumList: valueToArr(endItemNum),
        }
      }
      const { data } = await processApi.getProcessNodeList(params)
      state.allData = {
        ...data,
        nodeList: data.nodeList.map(item => {
          return {
            ...item,
            sort: unref(processData).findIndex(i => i.id === item.processId)
          }
        })
      }
    }


    // 分离路径
    const handleDisjoint = () => {
      state.isDisjoint = !state.isDisjoint

      state.disjointType = state.disjointType === '' ? 'view' : ''
    }

    // 表格明细层级数据
    const handleGetTableData = data => {
      state.nodeTableData = data
    }

    // 获取主视图点击 高亮的所有节点，及 当前点击的节点
    const handleGetViewData = (data, activeNode) => {
      // console.log(data, activeNode)
      state.disjointViewData = data
      state.activeClickNodeData = activeNode

      if (activeNode.configAttribute === 'itemNum') {
        getDisjointPathData()
      } else {
        state.disjointType = 'view' 
      }
    }

    // 展示SKU层
    const handleShowSku = (level) => {
      mainGraphRef.value.handleShowSku(level)
    }


    // 获取 分离视图数据
    const getDisjointPathData = async () => {

      const { activeClickNodeData } = state
      if (activeClickNodeData.configAttribute !== 'itemNum') {
        ElMessage.warning('分离路径请选择SKU')
        return false
      }

      const params = {

        itemNumList: ["ZJC0007X3314"],
        pnList: [],
        resNameList: [],
        isDesc: 1,
        selectItemNum: activeClickNodeData.itemNum,
        sortField: "",
        sortType: "",
        targetType: null
      }

      const { data } = await processApi.getDisjointPathNodeList(params)

      let allNodesList = [], allEdgesList = []

      for (let item of data) {
        const { nodeList, edgesList, sortKey, lineTargetValueList, costDetailList } = item
        const nodes = nodeList.map(item => {
          return {
            ...item,
            origin_nodeId: item.nodeId,
            nodeId: item.nodeId + '_' + sortKey
          }
        })

        const edges = edgesList.map(item => {
          const { sourceId, targetId } = item
          return {
            ...item,
            origin_targetId: targetId,
            origin_sourceId: sourceId,
            targetId: targetId + '_' + sortKey,
            sourceId: sourceId + '_' + sortKey,
            isSubPath: true,
            lineTargetValueList: lineTargetValueList.filter(i => {
              return i.sourceNodeId === sourceId && i.targetNodeId === targetId
            }),
            detailList: costDetailList.find(i => {
              return i.sourceNodeId === sourceId && i.targetNodeId === targetId
            })?.detailList || []
          }
        })

        allNodesList.push(...nodes)
        allEdgesList.push(...edges)

        state.disjointPathData = {
          nodeList: allNodesList,
          edgesList: allEdgesList
        }
        console.log(state.disjointPathData)
      }

    }


    onMounted(() => {
      handleSearch()
    })

    return {
      mainGraphRef,
      disjoinViewGraphRef,
      disjointPathGraphRef,
      ...toRefs(state),
      handleSearch,
      handleDisjoint,
      handleGetTableData,
      handleGetViewData,
      handleShowSku,
      getDisjointPathData,
    }


  }
}
</script>

<style lang="less" scoped>
.top-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.process-pos {
  position: absolute;
  top: 0;
  left: 5%;
  width: 90%;
  z-index: 99;
}

.graph-flex {
  display: flex;
  flex: 1;
  overflow: hidden;

  .main-graph {
    position: relative;
    flex: 1;
    width: 50%;
  }

  .disjoint-graph {
    padding-left: 10px;
    flex: 1;
    width: 50%;
    border-left: 1px solid #ddd;

    .graph-sec {
      height: calc(100% - 40px);
      overflow: auto;
    }
  }

}

.isActive {
  color: var(--el-color-primary);
}
</style>