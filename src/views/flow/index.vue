<template>
  <div class="warp">
    <div class="warp-left">
      <nodeMenu @addNode="addNode" />
    </div>
    <div class="warp-right">
      <div id="container" class="container-warp" ref="container">
        <template v-for="node in nodeList" :key="node.id">
          <flowNode :node="node" :id="node.id" />
        </template>

        <!-- <div
          v-for="node in nodeList"
          :key="node.id"
          :id="node.id"
          class="flow-item"
          :style="nodeContainerStyle(node)"
        >
          <span
            >{{ node.name }}
            <i class="el-icon-position flow-node-drag"></i>
          </span>
        </div> -->
      </div>
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
} from "vue";
import { ElMessage } from "element-plus";
import lodash from "lodash";
import {
  jsplumbSourceOptions,
  jsplumbSetting,
  jsplumbTargetOptions,
  jsplumbConnectOptions,
} from "./jsplumbOptions";

import nodeMenu from "./node-nemu";
import flowNode from "./node";

export default {
  name: "el-flows",
  components: { nodeMenu, flowNode },
  setup() {
    const { proxy } = getCurrentInstance();
    const container = ref(null);

    const state = reactive({
      jsPlumb: "",
      nodeList: [
        {
          id: "nodeA",
          name: "流程A-节点A",
          type: "task",
          left: "26px",
          top: "161px",
          ico: "el-icon-user-solid",
        },
        {
          id: "nodeB",
          name: "流程A-节点B",
          type: "task",
          left: "340px",
          top: "161px",
          ico: "el-icon-goods",
        },
        {
          id: "nodeC",
          name: "流程A-节点C",
          type: "task",
          left: "739px",
          top: "161px",
          ico: "el-icon-present",
        },
      ],
      lineList: [
        {
          from: "nodeA",
          to: "nodeB",
        },
      ],
    });

    let jsPlumb;

    // 加载流程图
    const loadEasyFlow = () => {
      for (let i = 0; i < state.nodeList.length; i++) {
        const node = state.nodeList[i];
        jsPlumb.makeSource(node.id, lodash.merge(jsplumbSourceOptions, {}));
        jsPlumb.makeTarget(node.id, jsplumbTargetOptions);
        if (!node.viewOnly) {
          jsPlumb.draggable(node.id, {
            containment: "parent",
            stop: function (el) {
              // 拖拽节点结束后的对调
              console.log("拖拽结束: ", el);
            },
          });
        }
      }

      for (let i = 0; i < state.lineList.length; i++) {
        let line = state.lineList[i];
        var connParam = {
          source: line.from,
          target: line.to,
          label: line.label ? line.label : "",
          connector: line.connector ? line.connector : "",
          anchors: line.anchors ? line.anchors : undefined,
          paintStyle: line.paintStyle ? line.paintStyle : undefined,
        };
        jsPlumb.connect(connParam, jsplumbConnectOptions);
      }
    };

    const jsPlumbInit = () => {
      jsPlumb.ready(() => {
        jsPlumb.importDefaults(jsplumbSetting);
        jsPlumb.setContainer("container");
        loadEasyFlow();

        // 连线成功后
        jsPlumb.bind("connection", (evt) => {
          console.log(evt);
          const from = evt.sourceId;
          const to = evt.targetId;
          // 存储line数据
          state.lineList.push({ from, to });
          console.log(state.lineList);
        });

        // 连线前的判断
        jsPlumb.bind("beforeDrop", (evt) => {
          const from = evt.sourceId;
          const to = evt.targetId;
          debugger;
          if (from === to) {
            ElMessage.warning("不能连自己");
            return false;
          }
          if (
            state.lineList.some((item) => item.from === from && item.to === to)
          ) {
            ElMessage.warning("同一个不能连两次");
            return false;
          }
          return true;
        });
      });
    };

    const addNode = async (evt, nodeMenu) => {
      const screenX = evt.originalEvent.clientX,
        screenY = evt.originalEvent.clientY;
      const containerRect = container.value.getBoundingClientRect();
      let left = screenX,
        top = screenY;

      (left = left - containerRect.x), (top = top - containerRect.y);
      const nodeId = getUUID();

      // 生成名字
      const originName = nodeMenu.name;
      let nodeName = originName;
      let index = 1;

      while (index < 30) {
        let repeat = false;
        for (let i = 0; i < state.nodeList.length; i++) {
          let node = state.nodeList[i];
          if (node.name === nodeName) {
            nodeName = originName + index;
            repeat = true;
          }
        }
        if (repeat) {
          index++;
          continue;
        }
        break;
      }

      // 定义要添加的 节点
      const node = {
        id: nodeId,
        name: nodeName,
        type: nodeMenu.type,
        left: left + "px",
        top: top + "px",
        ico: nodeMenu.icon,
      };

      state.nodeList.push(node);

      await nextTick();
      jsPlumb.makeSource(nodeId, lodash.merge(jsplumbSourceOptions, {}));
      jsPlumb.makeTarget(nodeId, jsplumbTargetOptions);
      jsPlumb.draggable(nodeId, {
        containment: "parent",
        stop: function (el) {
          console.log(el);
        },
      });
    };

    onMounted(async () => {
      await nextTick();
      jsPlumb = proxy.$jsPlumb.jsPlumb;
      console.log(jsPlumb);
      await nextTick();
      jsPlumbInit();
    });

    // 返回唯一标识
    function getUUID() {
      return Math.random().toString(36).substr(3, 10);
    }

    return {
      ...toRefs(state),
      addNode,
      container,
    };
  },
};
</script>

<style lang="less">
.warp {
  display: flex;
  align-items: stretch;
  border-top: 1px solid #ddd;

  .warp-left {
    width: 200px;
  }

  .warp-right {
    flex: 1;
  }
}

.container-warp {
  min-height: 500px;
  border-left: 1px solid #ddd;
  position: relative;
}

</style>