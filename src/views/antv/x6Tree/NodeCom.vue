<!--
 * @Description: 
 * @Date: 2022-03-22 16:28:10
 * @LastEditTime: 2023-11-27 10:25:21
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Tree\NodeCom.vue
-->

<template>
  <div class="node-wrap">
    <div class="node-content">
      <!-- <template v-if="nodeInfo.type !== 'zb' && !nodeInfo.isLeaf"> -->
      <span class="node-icon icon-right" @click="handleClick('right')">下{{rightVisible ? '+' : '-'}}</span>
      <!-- <span class="node-icon icon-bottom" @click="handleClick('bottom')">指{{bottomVisible ? '+' : '-'}}</span> -->
      <!-- </template> -->
      <div class="normal-section" v-if="nodeInfo.type !== 'zb'">
        <el-button type="primary" size="small" @click="handleShowZb">指标</el-button>
        <p class="title">{{ nodeInfo.name }}</p>
      </div>
      <!-- <div class="node-section" v-else>

        <p class="node-title">{{ nodeInfo.name }}</p>
        <div class="flex-wrap">
          <div class="flex-item" v-for="item in nodeInfo.data" :key="item.name">
            <p>{{ item.name }}</p>
            <p>{{ item.quantity }}</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, inject } from 'vue'
import { Graph, ObjectExt, Cell } from '@antv/x6'
import { ElButton } from 'element-plus'
export default {
  name: 'NodeCom',
  components: { ElButton },
  emits: ['onShowZb'],
  setup(props, context) {
    const getNode = inject('getNode')
    const getGraph = inject('getGraph')

    const node = getNode()
    const graph = getGraph()
    const state = reactive({
      nodeInfo: getNode().data,
      rightVisible: true,
      bottomVisible: true,
    })

    node.on('change:data', ({ current }) => {
      console.log(current)
      state.nodeInfo = current
    })

    const handleClick = (type = 'right') => {
      const edges = graph.getConnectedEdges(node, { outgoing: true })

      const visible = state[`${type}Visible`]
      console.log(visible)

      edges.forEach(item => {
        if (item.getSourcePortId() === type) {
          const cell = graph.getCellById(item.store.data.target.cell)
          console.log(cell)
          cell.toggleVisible(!visible)

          const allNextNodes = graph.getSuccessors(cell)
          allNextNodes.forEach(node => {
            node.toggleVisible(!visible)
          })

          state[`${type}Visible`] = !visible
        }
      })

      const nodes = graph.getNodes()
      // nodes.forEach(nodeItem => {

      // })
    }

    const handleShowZb = () => {
      console.log(node, context)
      context.emit('onShowZb', node)
    }

    onMounted(() => {})

    return {
      ...toRefs(state),
      handleClick,
      handleShowZb,
    }
  },
}
</script>

<style lang="less" scoped>
.node-wrap {
  padding: 0 22px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 12px;

  .node-content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    background: #fff;
  }

  .node-icon {
    display: flex;
    width: 25px;
    height: 25px;
    align-items: center;

    border: 1px solid #ddd;
    background-color: #fff;
  }

  .icon-right {
    position: absolute;
    right: 0;
    top: 15%;
  }

  .icon-bottom {
    position: absolute;
    right: 0;
    bottom: 15%;
  }

  .normal-section {
    // height: 100%;
    .title {
      margin: 0;
      padding: 10px;
    }
  }

  .node-section {
    .node-title {
      margin: 0;
      padding: 5px;
      border-bottom: 1px solid #ddd;
    }
  }
}

.flex-wrap {
  display: flex;
  align-items: stretch;
  height: calc(100% - 50px);

  .flex-item {
    flex: 1;

    p {
      margin: 0;
      padding: 10px;
    }

    &:first-child {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
