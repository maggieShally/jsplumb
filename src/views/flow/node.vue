<template>
  <div
    :key="node.id"
    :id="node.id"
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

  setup(props) {
    // 计算node的定位
    console.log(props.node);
    const nodeContainerStyle = computed(() => {
      return {
        left: props.node.left,
        top: props.node.top,
      };
    });
    return {
      nodeContainerStyle,
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