<!--
 * @Description: 
 * @Date: 2024-01-02 10:48:41
 * @LastEditTime: 2024-07-09 17:29:54
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\index.vue
-->
<!--
 * @Description: 
 * @Date: 2024-01-02 10:48:41
 * @LastEditTime: 2024-07-09 17:14:07
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\index.vue
-->
<template>
  <div>
    <el-button type="primary" @click="handleDisjoint">分离路径</el-button>
    <el-button type="primary" @click="handleShowSku(3)">SKU</el-button>
    <el-button type="primary" @click="handleShowSku(2)">容量</el-button>
  </div>

  <div class="graph-flex">
    <div class="main-graph">
      <div class="process-pos">
        <ProcessTextCom />
      </div>
      <div style="height: 400px; overflow: auto">
        <DisjointGraph ref="mainGraphRef" :isMainGraph="true" uKey="main" @onGetTableData="handleGetTableData" @onGetViewData="handleGetViewData" :data="allData" />
      </div>
    </div>

    <div class="disjoint-graph" v-if="disjointType">
      <el-radio-group v-model="disjointType" size="large">
        <el-radio-button label="分离视图" value="view" />
        <el-radio-button label="分离路径" value="path" />
      </el-radio-group>

      <div v-show="disjointType === 'view'" style="height: 400px; overflow: auto">
        <DisjointGraph ref="disjoinViewGraphRef" uKey="subView" @onGetTableData="handleGetTableData" :data="disjointViewData" />
      </div>

      <div v-show="disjointType === 'path'" style="height: 400px; overflow: auto">
        <el-form :model="disjointPathSearchForm" inline style="margin: 10px;">
          <el-form-item label="">
            <el-radio-group v-model="disjointPathSearchForm.isDesc" size="small" >
              <el-radio-button label="升序" value="0" />
              <el-radio-button label="降序" value="1" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDisjointPathData" size="small">查 询</el-button>
          </el-form-item>
        </el-form>
        <DisjointGraph ref="disjointPathGraphRef" uKey="subPath" @onGetTableData="handleGetTableData" :data="disjointPathData" />
      </div>
    </div>
  </div>

  <NodeDetailsTable :data="nodeTableData" />
</template>

<script>
import { reactive, toRefs, ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Markup } from '@antv/x6'

import { processApi } from '@/services'

import ProcessTextCom from './ProcessTextCom.vue'
import NodeDetailsTable from './NodeDetail.table.vue'

import { mockData } from './data.js'

import DisjointGraph from './graph/Disjoint.graph.vue'

import { useGetProcessData } from './hooks/useGetProcessData.js'
import { active } from 'd3'

export default {
  name: 'RouterPath',
  components: {
    NodeDetailsTable,
    ProcessTextCom,
    DisjointGraph
  },
  setup() {

    const mainGraphRef = ref(null)
    const disjoinViewGraphRef = ref(null)
    const disjointPathGraphRef = ref(null)

    const state = reactive({
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

    // 分离路径
    const handleDisjoint = () => {
      state.disjointType = 'path'
    }

    const handleGetTableData = data => {
      state.nodeTableData = data
    }

    // 获取主视图点击 高亮的所有节点，及 当前点击的节点
    const handleGetViewData = (data, activeNode) => {
      console.log(data, activeNode)
      state.disjointViewData = data
      state.activeClickNodeData = activeNode

      if(activeNode.configAttribute === 'itemNum') {
        getDisjointPathData()
      }
    }

    // 主实图节点
    const getMainViewNodeData = async () => {
      const { data } = await processApi.getProcessNodeList()
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
      
      for(let item of data) {
        const { nodeList, edgesList, sortKey, lineTargetValueList } = item
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
            })
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

      // state.disjointPathData = {
      //   nodeList: data.reduce((res, item) => {
      //     const nodes = item.nodeList

      //     return
      //   }, []),
      //   edgesList: 
      // }

    }

    onMounted(() => {
      getMainViewNodeData()
    })

    return {
      mainGraphRef,
      disjoinViewGraphRef,
      disjointPathGraphRef,
      ...toRefs(state),
      handleDisjoint,
      handleGetTableData,
      handleGetViewData,
      handleShowSku,
      getDisjointPathData
    }


  }
}
</script>

<style lang="less" scoped>
.process-pos {
  position: absolute;
  top: 0;
  left: 10%;
  z-index: 99;
}

.graph-flex {
  display: flex;

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
  }

}
</style>