<!--
 * @Description: 
 * @Date: 2024-01-02 10:48:41
 * @LastEditTime: 2024-06-05 15:09:46
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\index.vue
-->
<template>
  <div>
    <el-button type="primary" @click="handleDisjoint">分离路径</el-button>
  </div>

  <div class="graph-flex">
    <div class="main-graph">
      <div class="process-pos">
        <ProcessTextCom />
      </div>
      <div style="height: 400px; overflow: auto">
        <DisjointGraph :isMainGraph="true" uKey="main" @onGetTableData="handleGetTableData" @onGetViewData="handleGetViewData" :data="allData" />
      </div>
    </div>

    <div class="disjoint-graph">
      <div style="height: 400px; overflow: auto">
        <DisjointGraph uKey="sub" @onGetTableData="handleGetTableData" ref="disjoinViewGraphRef" :data="viewPathNode" />
      </div>
    </div>
  </div>

  <NodeDetailsTable :data="nodeTableData" />
</template>

<script>
import { reactive, toRefs, ref, onMounted, nextTick } from 'vue'

import ProcessTextCom from './ProcessTextCom.vue'
import NodeDetailsTable from './NodeDetail.table.vue'

import { mockData } from './data.js'

import DisjointGraph from './Disjoint.graph.vue'

export default {
  name: 'RouterPath',
  components: {
    NodeDetailsTable,
    ProcessTextCom,
    DisjointGraph
  },
  setup() {


    const disjoinViewGraphRef = ref(null)

    const state = reactive({
      allData: [],
      nodeTableData: [],

      
      showDisjoint: false, //显示分离路径
      viewPathNode: [], // 节点分离视图数据
    })


    // 分离路径
    const handleDisjoint = () => {

    }

    const handleGetTableData = data => {
      state.nodeTableData = data
    }

    const handleGetViewData = data => {
      console.log(data)
      state.viewPathNode = data
    }

    onMounted(() => {
      
      state.allData = mockData
    })

    return {
      disjoinViewGraphRef,
      ...toRefs(state),
      handleDisjoint,
      handleGetTableData,
      handleGetViewData
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
    flex: 1;
    width: 50%;
  }

}

</style>