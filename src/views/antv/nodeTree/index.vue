<!--
 * @Description: 
 * @Date: 2022-07-06 16:35:06
 * @LastEditTime: 2022-08-03 14:53:47
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\nodeTree\index.vue
-->
<template>
  <el-row :gutter="24">
    <el-col :span="3">
      <div v-for="(item, index) in Object.keys(colorObj)" :key="item">
        <span :style="{color: colorObj[item].color}">{{index}}.{{item}}</span>
      </div>
    </el-col>
    <el-col :span="21">
      <el-button type="primary" @click="handleAddCombon">添加到组包</el-button>
      <div id="mountNode" class="node-tree-sec"></div>
    </el-col>
  </el-row>
</template>

<script>
import { nextTick, onMounted, reactive, toRefs } from 'vue'

import G6 from '@antv/g6'
import insertCss from 'insert-css'

import { calcChildrenIds, getRandomPosition } from './utils.js'

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .g6-minimap-container {
    border: 1px solid #e2e2e2;
  }
  .g6-minimap-viewport {
    border: 2px solid rgb(25, 128, 255);
  }
`)

import data from './data.js'

const colors = [
  '#BDD2FD',
  '#BDEFDB',
  '#C2C8D5',
  '#FBE5A2',
  '#F6C3B7',
  '#B6E3F5',
  '#D3C6EA',
  '#FFD8B8',
  '#AAD8D8',
  '#FFD6E7',
]
const strokes = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
]

export default {
  name: 'nodeTree',
  setup() {
    let graph = ''
    let num = 12
    const state = reactive({
      colorObj: {
        组包: {
          color: '#BDD2FD',
          stroke: '#5B8FF9',
        },
        贴片: {
          color: '#BDEFDB',
          stroke: '#5AD8A6',
        },
        封装: {
          color: '#C2C8D5',
          stroke: '#5D7092',
        },
        FT: {
          color: '#FBE5A2',
          stroke: '#F6BD16',
        },
      },
    })

    const menu = new G6.Menu({
      offsetX: 6,
      offsetY: 10,
      itemTypes: ['node'],
      getContent(e) {
        console.log(e)
        const outDiv = document.createElement('div')
        outDiv.style.width = '180px'
        outDiv.innerHTML = `<ul>
        <li data-command="combine">聚合</li>
      </ul>`
        return outDiv
      },
      shouldBegin(evt) {
        return evt.item.getModel().pid
      },
      handleMenuClick(target, item) {
        debugger
        const command = target.dataset.command
        if (command === 'combine') {
          const pid = item.getModel().pid

          const parentNode = graph.findById(pid)
          graph.showItem(parentNode)

          const childrenIds = calcChildrenIds(
            parentNode.getModel().childrenList
          )
          console.log(childrenIds)
          childrenIds.forEach(id => {
            const node = graph.findById(id)
            if (node) {
              graph.hideItem(node)
            }
          })
        }
      },
    })

    const minimap = new G6.Minimap({
      size: [150, 100],
    })

    const registerFn = () => {
      const textXML = cfg => {
        return `
            <group >
              <rect style={{
                width: 80, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
              }}   cursor="pointer">
                <text style={{ marginTop: 2, marginLeft: 40, 
                  textAlign: 'center',
                  fontWeight: 'bold', 
                  fill: '#fff' }}>${cfg.label}</text>
              </rect>
              <rect style={{ width: 80, height: 40, fill: 'rgba(24,144,255,0.15)', radius: [0, 0, 6, 6] }} keyshape="true"   cursor="pointer">
                <text style={{marginTop: 2, marginLeft: 10 ,fill: #708090}}>销售额: ${cfg.saleAmount}</text>
                <text style={{marginTop: 2, marginLeft: 10, fill: #708090}}>销量: ${cfg.saleQuanity}</text>
              </rect>
            </group>
            `
      }

      G6.registerNode('test', {
        jsx: textXML,
      })
    }

    // 绘制树状图
    const rendTree = data => {
      graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        width: 1800,
        height: 700,

        // animate: true,
        // defaultNode: {
        //   size: 20,
        //   style: {
        //     fill: '#C6E5FF',
        //     stroke: '#5B8FF9',
        //   },
        // },
        // defaultEdge: {
        //   size: 1,
        //   color: '#e2e2e2',
        // },
        // modes: {
        //   default: ['drag-canvas'],
        // },

        // layout: { // 树
        //   type: 'dagre',
        //   nodeSize: [80, 40],
        //   nodesep: 20,
        //   ranksep: 20,
        //   rankdir: 'LR',
        // },

        layout: {
          // 随机
          // type: 'random',

          // 聚类
          // type: 'fruchterman',
          // gravity: 5,
          // speed: 15,
          // clustering: true,

          // combo
          type: 'comboForce',
          nodeSpacing: d => 18,
          // nodeSize: 120,
          comboCollideStrength: 1,
          preventOverlap: true,
          comboSpacing: 100,
          comboPadding: 30,
          onTick: () => {
            // 可选
            console.log('ticking')
          },
          onLayoutEnd: () => {
            // 可选
            console.log('combo force layout done')
          },
        },
        // fitView: true,
        defaultNode: {
          size: 50,
          // type: 'rect',
          // anchorPoints: [
          //   [0.5, 0],
          //   [0.5, 1],
          // ],
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2',
            },
            lineDash: [2, 2],
          },
        },
        modes: {
          default: [
            'drag-combo',
            'drag-node',
            'drag-canvas',
            'collapse-expand-combo',
            'zoom-canvas',
          ],
        },
        groupByTypes: false,
        plugins: [minimap, menu],

        animate: true,

        nodeStateStyles: {
          activeStyle: {
            stroke: '#f00',
            lineWidth: 3,
          },
        },
        edgeStateStyles: {
          activeStyle: {
            stroke: '#f00',
            lineWidth: 3,
          },
        },
      })

      graph.node(node => {
        return {
          id: node.id,
          // size: 25,
          // style: {
          //   fill: state.colorObj[node.comboId]?.color,
          //   stroke: state.colorObj[node.comboId]?.stroke,
          // },
          // labelCfg: {
          //   position: 'bottom',
          // },
          ...node,
          type: 'test',
          saleAmount: 124,
          saleQuanity: 23454,
        }
      })

      graph.combo(combo => {
        console.log(state.colorObj[combo.id].color)
        return {
          id: combo.id,
          labelCfg: {
            position: 'top',
            style: {
              fill: state.colorObj[combo.id].color,
              fontSize: 18,
            },
          },
        }
      })

      graph.on('node:click', e => {
        const node = e.item
        const edges = node
          .getEdges()
          .filter(item => item.getModel().source === node.getModel().id)

        if (edges.length) {
          let active = true
          if (node._cfg.states.includes('activeStyle')) {
            active = false
          }
          graph.setItemState(node, 'activeStyle', active)
          edges.forEach(element => {
            graph.setItemState(element, 'activeStyle', active)
          })
        }

        const {
          childrenList,
          id: nodeId,
          x: nodeX,
          y: nodeY,
          comboId,
        } = node.getModel()
        const combo = graph.findById(comboId)

        if (childrenList?.length) {
          // 删除当前节点,展开子节点
          // graph.removeItem(nodeId)
          const childrendEdges = []
          childrenList?.forEach(async (item, index) => {
            const pos = getRandomPosition({ nodeX, nodeY }, graph)
            const node = graph.findById(item.id)
            if (!node) {
              console.log(item.id)
              graph.addItem('node', {
                ...item,
                x: pos.x,
                y: pos.y,
              })
              childrendEdges.push(...item.edges)
            } else {
              graph.showItem(node)
            }
          })

          graph.hideItem(node)
          console.log(childrendEdges)
          childrendEdges?.forEach(item => {
            if (graph.findById(item.target) && graph.findById(item.source)) {
              graph.addItem('edge', {
                ...item,
                id: item.target + item.source,
              })
            }
          })
        }
      })

      // 读取数据
      graph.data(data)
      // 渲染图
      graph.render()
    }

    const handleAddCombon = () => {
      console.log(num)
      const combon = graph.findById('组包')

      const model = combon.getModel()

      graph.addItem('node', {
        id: num + '',
        label: num + '',
        x: model.x + 180,
        y: model.y + 180,
        comboId: '组包',
      })

      // combon.addNode(graph.findById(num+''))

      num++
    }

    onMounted(async () => {
      registerFn()

      rendTree(data.dataList)
      // rendTree(data.dataTemp)
    })

    return {
      ...toRefs(state),
      handleAddCombon,
    }
  },
}
</script>

<style lang="less" scoped>
.node-tree-sec {
  border: 1px solid #ddd;
}
</style>