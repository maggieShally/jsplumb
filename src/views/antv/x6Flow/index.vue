<!--
 * @Description: 流程图
 * @Date: 2022-01-11 17:15:49
 * @LastEditTime: 2022-04-27 14:44:21
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Flow\index.vue
-->
<template>
  <el-row :gutter="24">
    <el-col :span="4">
      <h3>组件库</h3>
      <el-tree :data="comList" :props="defaultProps" default-expand-all>
        <template #default="{ node }">
          <div @mousedown="handleDrag(node, $event)">{{ node.label }}</div>
        </template>
      </el-tree>
    </el-col>
    <el-col :span="16">
      <el-button type="primary" @click="handleToJson">toJSON</el-button>
      <ContextMenu :nodeEvent="nodeEvent" @onRunNode="handleRunNode">
        <div >
          <div id="container"></div>
        </div>
      </ContextMenu>
    </el-col>
    <el-col :span="4">
      <template v-if="currentCom">
        <component :is="currentCom" :data="currentNode.current.data" @onSubmitParams="handleSubmitParams"></component>
      </template>
    </el-col>
  </el-row>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue"
import { Graph, Addon, EdgeView, Vector } from '@antv/x6';
import lodash from 'lodash'
import ContextMenu from './ContextMenu.vue'

import ComDataSource from "./components/ComDataSource.vue";
import ComDataSet from "./components/ComDataSet.vue";

export default {
  name: 'X6FLOWPage',
  components: {
    ContextMenu,
    ComDataSource,
    ComDataSet
  },
  setup() {
    const state = reactive({
      nodeEvent: {
        node: {},
        nodeType: '',
        event: ''
      }, // node edge
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      comList: [{
        label: '读写数据',
        children: [
          {
            label: '算法1',
            sourceId: '3333',
            component: 'ComDataSource',
          }, {
            label: '算法2',
            component: 'ComDataSet'
          },
        ],
      }],

      defaultNode: {
        x: 100,
        y: 200,
        width: 80,
        height: 40,
        attrs: {
          label: {
            text: 'Hello',
            fill: '#000'
          },
        },
        ports: {
          groups: {
            in: {
              position: 'top',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#C2C8D5',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              }
            },
            out: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#C2C8D5',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              }
            }
          },
          items: [
            {
              id: '1',
              group: 'in'
            }, {
              id: '2',
              group: 'out'
            }
          ]
        }
      },

      currentNode: {
        current: '',
        prev: ''
      },
      currentCom: ''
    })


    let graph
    let dnd


  
  



    const initGraph = () => {
      graph = new Graph({
        container: document.getElementById('container'),
        width: 800,
        height: 600,
        scroller: true,
        autoResize: true,
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        selecting: {
          enabled: true,
          showNodeSelectionBox: true,
        },
        connecting: {
          snap: true,
          allowBlank: false,
          allowMulti: false,
          allowLoop: false,
          allowNode: false,
          allowEdge: false,
        }
      });

      // 节点右键
      graph.on('cell:contextmenu', (data) => {
        console.log(data)
        state.nodeEvent = {
          node: data,
          nodeType: data.cell.shape === 'edge' ? 'edge' : 'node',
          event: data.e
        }

      })

      // 节点点击
      graph.on('node:click', ({ e, x, y, node, view }) => {
        console.log({ e, x, y, node, view })
        state.currentCom = node.data.component
        console.log(node.data.component)

        const current = state.currentNode.current
        state.currentNode = {
          current: node,
          prev: current
        }

      })
    }

    // 创建dnd实例 制定拖拽行为
    const ininLeftNode = () => {
      dnd = new Addon.Dnd({
        target: graph,
        getDragNode: node => {
          return graph.createNode(node)
        },
      })

    }

    // 开始拖拽
    const handleDrag = (node, e) => {
      console.log(node)
      const currentNode = lodash.clone(state.defaultNode)
      currentNode.attrs.label.text = node.label
      currentNode.data = {
        ...node.data,
        name: node.data.label
      }
      console.log(currentNode)
      dnd.start(currentNode, e)
    }


    // 保存为 json
    const handleToJson = () => {
      const jsonData = graph.toJSON()
      console.log(jsonData)
      localStorage.setItem('graphJson', JSON.stringify(jsonData))
    }


    const handleRunNode = () => {
      console.log('handleRunNode')
      const cell = state.nodeEvent.node.cell
      const edges = graph.model.getConnectedEdges(cell)
      edges.forEach((edge) => {
        const view = graph.findViewByCell(edge)
        if (view) {
          const token = Vector.create('circle', { r: 6, fill: '#feb662' })
          setTimeout(() => {
            view.sendToken(token.node, 1000)
          }, 300)
        }
      })
    }

    // 把参数加到 node
    const handleSubmitParams = data => {
      console.log(state.currentNode)
        console.log(data)
      state.currentNode.prev?.setData(data)
    }

    onMounted(() => {
      initGraph()
      ininLeftNode()
    })

    return {
      ...toRefs(state),
      handleDrag,
      handleToJson,
      handleRunNode,
      handleSubmitParams
    }


  }

}

</script>
<style>
</style>