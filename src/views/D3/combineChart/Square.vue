<!--
 * @Description: 方型
 * @Date: 2023-02-21 18:13:34
 * @LastEditTime: 2023-02-21 18:32:30
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\Square.vue
-->
<template>
  <div class="shape-wrap">
    {{label}}
  </div>
</template>

<script>
export default {
  name: 'SquareCom',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.shape-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 20%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  z-index: 9999;
  
}
</style>