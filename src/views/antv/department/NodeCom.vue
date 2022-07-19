<!--
 * @Description: 
 * @Date: 2022-03-22 16:28:10
 * @LastEditTime: 2022-07-12 14:38:22
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\department\NodeCom.vue
-->

<template>
  <div class="node-wrap">
    <div class="node-content">
      <span class="node-icon icon-right" @click="handleClick('right')">{{visible ? '+' : '-'}}</span>
      <div class="normal-section" v-if="nodeInfo.type !== 'zb'">
        <!-- <el-button type="primary" size="small" @click="handleShowZb">指标</el-button> -->
        <p class="title">{{ nodeInfo.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, inject } from 'vue'
import { Graph, ObjectExt, Cell } from '@antv/x6'
import { ElButton } from 'element-plus'
export default {
  name: 'X6Panel',
  // components: { ElButton },
  props: {
    nodes: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['onShowZb'],
  setup(props, context) {
    const getNode = inject('getNode')
    const getGraph = inject('getGraph')

    const node = getNode()
    const graph = getGraph()
    const state = reactive({
      nodeInfo: getNode().data,
      visible: true,
    })

    node.on('change:data', ({ current }) => {
      console.log(current)
      state.nodeInfo = current
    })

    const handleClick = () => {
      const edges = graph.getConnectedEdges(node, { outgoing: true })

      const { visible } = state
      console.log(edges)

      edges.forEach(item => {
        const cell = graph.getCellById(item.store.data.target.cell)
        console.log(cell)
        cell.toggleVisible(!visible)

        const allNextNodes = graph.getSuccessors(cell)
        allNextNodes.forEach(node => {
          node.toggleVisible(!visible)
        })

        state.visible = !visible
      })

      const nodes = graph.getNodes()
      // nodes.forEach(nodeItem => {

      // })
    }

    const handleShowZb = () => {
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
    top: 50%;
    transform: translateY(-50%);
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
