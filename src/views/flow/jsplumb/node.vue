<!--
 * @Description: 
 * @Date: 2021-05-08 16:54:41
 * @LastEditTime: 2023-04-06 11:48:24
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\flow\jsplumb\node.vue
-->
<template>
  <div :key="node.id" :id="node.id" @click="clickNode" class="flow-item" :style="nodeContainerStyle">
    <el-button type="default">
      <!-- <el-icon :class="node.ico">
        <Search />
      </el-icon> -->
      <span class="flow-node-drag flow-item-icon" >X</span>
      <span>{{ node.name }} sssss</span>
    </el-button>
    
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    node: Object,
  },

  emits: ['clickNode'],

  setup(props, context) {
    // 计算node的定位
    console.log(props.node)
    const nodeContainerStyle = computed(() => {
      return {
        left: props.node.left,
        top: props.node.top,
      }
    })

    const clickNode = () => {
      context.emit('clickNode', props.node.id)
    }

    return {
      nodeContainerStyle,
      clickNode,
    }
  },
}
</script>

<style lang="less">
.flow-item {
  position: absolute;
  display: inline-block;

  .flow-item-icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    &:hover {
      cursor: crosshair;
    }
  }
}
</style>