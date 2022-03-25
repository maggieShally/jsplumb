<!--
 * @Description: 
 * @Date: 2021-08-06 16:20:39
 * @LastEditTime: 2021-08-06 17:38:08
 * @FilePath: \jsplumb-test\src\views\dragResize\component\VueDragResize_pie.vue
-->

<template>
  <VueDragResize
    :isActive="true"
    :w="200"
    :h="200"
    :parentH="500"
    :parentW="500"
    :parentLimitation="true"
    v-on:resizing="resize"
    v-on:dragging="resize"
  ></VueDragResize>
</template>

<script>
export default {
  name: "DragResizeCom",
  setup() {

  }
}
</script>

<style>
</style>