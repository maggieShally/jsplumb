<!--
 * @Description: JS 移动缩放练习
 * @Date: 2022-03-23 17:36:13
 * @LastEditTime: 2023-08-14 14:39:57
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\posDrag\JSDrag.vue
-->
<template>
  <div class="drag-wrap">
    <div class="drag-sec" id="draggable" v-draggable="true" v-draggableSize="true">
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'JSDrag',
  setup() {
    
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.drag-wrap {
  width: 100%;
  height: 800px;
  position: relative;
}
.drag-sec {
  width: 300px;
  height: 300px;
  border: 1px solid #ddd;
  position: absolute;
  top: 0;
  left: 0;

  .mouse {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
  }
}
</style>
