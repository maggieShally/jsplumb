<!--
 * @Description: 
 * @Date: 2023-02-24 17:57:41
 * @LastEditTime: 2023-02-24 17:58:24
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\Circle.vue
-->

<template>
  <div class="shape-wrap">
    {{label}}
  </div>
</template>

<script>
export default {
  name: 'CircleCom',
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
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  z-index: 9999;
  
}
</style>