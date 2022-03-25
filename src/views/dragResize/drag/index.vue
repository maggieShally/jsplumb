<!--
 * @Description:  拖拽拉伸 vue-drag-resize
 * @Date: 2021-08-06 15:16:16
 * @LastEditTime: 2022-01-13 09:56:28
  
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\index.vue
-->
<template>
  <div id="app">
    <div class="panel-wrap">
      <VueDragResize
        :isActive="true"
        :w="200"
        :h="200"
        :parentH="500"
        :parentW="500"
        :parentLimitation="true"
        v-on:resizing="resize"
        v-on:dragging="resize"
      >
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }}</p>
        <p>{{ width }} х {{ height }}</p>
      </VueDragResize>
    </div>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import { reactive, toRefs } from 'vue'

export default {
  name: 'dragResize',
  components: {
    VueDragResize,
  },
  setup() {
    const state = reactive({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    })

    const resize = newRect => {
      state.width = newRect.width
      state.height = newRect.height
      state.top = newRect.top
      state.left = newRect.left
    }

    return {
      ...toRefs(state),
      resize,
    }
  },
}
</script>
<style lang="less" scoped>
.panel-wrap {
  width: 500px;
  height: 520px;
  border: 1px solid #dddd;
  position: relative;
  margin: auto;
}
</style>
