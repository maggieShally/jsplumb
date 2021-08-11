<template>
  <div class="warp">
    <div class="warp-left">
      <nodeMenu @addNode="addNode" />
    </div>
    <div class="warp-content">
      <div id="container" class="container-warp" ref="container">
        <template v-for="node in data.nodeList" :key="node.id">
          <flowNode :node="node" :id="node.id" @clickNode="clickNode" />
        </template>
      </div>
    </div>
    <div class="warp-right">
      <nodeFrom ref="nodeFrom" @setLineLabel="setLineLabel" @repaintEverything="repaintEverything" />
    </div>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  nextTick,
  ref,
  inject,
  provide
} from 'vue'
import { ElMessage } from 'element-plus'
import lodash from 'lodash'
import {
  jsplumbSourceOptions,
  jsplumbSetting,
  jsplumbTargetOptions,
  jsplumbConnectOptions,
} from './jsplumbOptions'

import nodeMenu from './node-nemu'
import nodeFrom from './node-from'
import flowNode from './node'
import { getDataA } from './data.js'

export default {
  name: 'el-flows',
  components: { nodeMenu, flowNode, nodeFrom },
  setup() {
    const { proxy } = getCurrentInstance()
    const container = ref(null)
    const nodeFrom = ref(null)

    const state = reactive({
      jsPlumb: '',
      data: {},
      // 是否加载完毕标志位
      loadEasyFlowFinish: false,
      activeElement: {},
    })

    
    let jsPlb = inject('jsPlumb')

    let jsPlumb = jsPlb.jsPlumb



    // 加载流程图
    const loadEasyFlow = async () => {
      const {
        data: { nodeList, lineList },
      } = state
      for (let i = 0; i < nodeList.length; i++) {
        const node = nodeList[i]
        jsPlumb.makeSource(node.id, lodash.merge(jsplumbSourceOptions, {}))
        jsPlumb.makeTarget(node.id, jsplumbTargetOptions)
        if (!node.viewOnly) {
          jsPlumb.draggable(node.id, {
            containment: 'parent',
            stop: function (el) {
              // 拖拽节点结束后的对调
              console.log('拖拽结束: ', el)
            },
          })
        }
      }

      for (let i = 0; i < lineList.length; i++) {
        let line = lineList[i]
        var connParam = {
          source: line.from,
          target: line.to,
          label: line.label ? line.label : '',
          connector: line.connector ? line.connector : '',
          anchors: line.anchors ? line.anchors : undefined,
          paintStyle: line.paintStyle ? line.paintStyle : undefined,
          overlays: [
            ['Label', { label: 'foo', id: 'label', cssClass: 'flowLabel' }],
          ],
        }
        console.log(connParam)
        jsPlumb.connect(connParam, jsplumbConnectOptions)
      }
      await nextTick()
      state.loadEasyFlowFinish = true
    }

    const jsPlumbInit = () => {
      jsPlumb.ready(() => {
        // 修改jsplumb默认配置
        jsPlumb.importDefaults(jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        jsPlumb.setSuspendDrawing(false, true)
        jsPlumb.setContainer('container')
        loadEasyFlow()

        // 点击连接线
        jsPlumb.bind('click', evt => {
          console.log(evt)
          state.activeElement.type = 'line'
          state.activeElement.sourceId = evt.sourceId
          state.activeElement.targetId = evt.targetId

          nodeFrom.value.lineInit({
            from: evt.sourceId,
            to: evt.targetId,
            label: evt.getLabel(),
          })
        })

        // 连线成功后
        jsPlumb.bind('connection', evt => {
          console.log(evt)
          const from = evt.sourceId
          const to = evt.targetId
          // 存储line数据
          if (state.loadEasyFlowFinish) {
            state.data.lineList.push({ from, to })
            console.log(state.data.lineList)
          }
        })

        // 连线前的判断
        jsPlumb.bind('beforeDrop', evt => {
          const from = evt.sourceId
          const to = evt.targetId
          if (from === to) {
            ElMessage.warning('不能连自己')
            return false
          }
          if (
            state.data.lineList.some(
              item => item.from === from && item.to === to
            )
          ) {
            ElMessage.warning('同一个不能连两次')
            return false
          }
          return true
        })
      })
    }

    const clickNode = nodeId => {
      state.activeElement.type = 'node'
      state.activeElement.nodeId = nodeId
      const node = lodash.cloneDeep(
        state.data.nodeList.find(item => item.id === nodeId)
      )
      nodeFrom.value.nodeInit(node)
    }

    // 修改条件
    const setLineLabel = ({ from, to, label }) => {
      let conn = jsPlumb.getConnections({
        source: from,
        target: to,
      })[0]

      console.log(conn.getOverlay('label'))
      conn.getOverlay('label').setLabel(label)

      if (!label || label === '') {
        conn.removeClass('flowLabel')
        conn.addClass('emptyFlowLabel')
      } else {
        conn.removeClass('emptyFlowLabel')
        conn.addClass('flowLabel')
      }

      state.data.lineList.forEach(item => {
        if (item.from === from && item.to === to) {
          item.label = label
        }
      })
    }

    // 修改节点, 后要重绘
    const repaintEverything = async node => {
      state.data.nodeList.forEach(item => {
        if (item.id === node.id) {
          item.name = node.name
          item.ico = node.ico
        }
      })
      // await nextTick();
      // jsPlumb.repaint()
    }

    const addNode = async (evt, nodeMenu) => {
      const screenX = evt.originalEvent.clientX,
        screenY = evt.originalEvent.clientY
      const containerRect = container.value.getBoundingClientRect()
      let left = screenX,
        top = screenY

      ;(left = left - containerRect.x), (top = top - containerRect.y)
      const nodeId = getUUID()

      // 生成名字
      const originName = nodeMenu.name
      let nodeName = originName
      let index = 1

      const {
        data: { nodeList },
      } = state
      while (index < 30) {
        let repeat = false
        for (let i = 0; i < nodeList.length; i++) {
          let node = nodeList[i]
          if (node.name === nodeName) {
            nodeName = originName + index
            repeat = true
          }
        }
        if (repeat) {
          index++
          continue
        }
        break
      }

      // 定义要添加的 节点
      const node = {
        id: nodeId,
        name: nodeName,
        type: nodeMenu.type,
        left: left + 'px',
        top: top + 'px',
        ico: nodeMenu.icon,
      }

      state.data.nodeList.push(node)

      await nextTick()
      jsPlumb.makeSource(nodeId, lodash.merge(jsplumbSourceOptions, {}))
      jsPlumb.makeTarget(nodeId, jsplumbTargetOptions)
      jsPlumb.draggable(nodeId, {
        containment: 'parent',
        stop: function (el) {
          console.log(el)
        },
      })
    }

    const dataReload = async data => {
      state.data = lodash.cloneDeep(data)
      await nextTick()
      jsPlumb = jsPlb.jsPlumb
      console.log(jsPlumb)
      await nextTick()
      jsPlumbInit()
    }

    onMounted(async () => {
      await nextTick()
      dataReload(getDataA())
    })

    // 返回唯一标识
    function getUUID() {
      return Math.random().toString(36).substr(3, 10)
    }

    return {
      ...toRefs(state),
      addNode,
      setLineLabel,
      container,
      nodeFrom,
      clickNode,
      repaintEverything,
    }
  },
}
</script>

<style lang="less" scoped>
.warp {
  display: flex;
  align-items: stretch;
  border-top: 1px solid #ddd;
  height: 100%;

  .warp-left {
    width: 200px;
  }

  .warp-content {
    flex: 1;
  }

  .warp-right {
    width: 300px;
  }
}

.container-warp {
  min-height: 500px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  position: relative;
  overflow: auto;
}

.jtk-overlay.flowLabel:not(.aLabel) {
  padding: 4px 10px;
  background-color: white;
  color: #565758 !important;
  border: 1px solid #e0e3e7;
  border-radius: 5px;
  font-size: 14px;
}

.emptyFlowLabel {
  font-size: 14px;
}
</style>