<template>
  <div
    :key="node.id"
    :id="node.id"
    @click="clickNode"
    class="flow-item"
    :style="nodeContainerStyle"
  >
    <el-button type="default">
      <i class="flow-node-drag flow-item-icon" :class="node.ico"></i>
      <span>{{ node.name }} </span>
    </el-button>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    node: Object,
  },

  emits: ['clickNode'],

  setup(props, context) {
    // 计算node的定位
    console.log(props.node);
    const nodeContainerStyle = computed(() => {
      return {
        left: props.node.left,
        top: props.node.top,
      };
    });

    const clickNode = () => {
      context.emit('clickNode', props.node.id)
    }

    return {
      nodeContainerStyle,
      clickNode
    };
  },
};
</script>

<style lang="less">
.flow-item {
  position: absolute;
  display: inline-block;

  .flow-item-icon {
    &:hover {
      cursor: crosshair;
    }
  }
}
</style>