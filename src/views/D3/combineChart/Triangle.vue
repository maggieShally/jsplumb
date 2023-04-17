<!--
 * @Description: 
 * @Date: 2023-02-21 18:33:12
 * @LastEditTime: 2023-04-07 13:55:54
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\Triangle.vue
-->
<template>
  <div class="shape-wrap">
    <span class="label-text">{{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'TriangleCom',
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
  width: 0;
  height: 0;
  border-width: 0 40px 70px;
  border-style: solid;
  border-color: transparent transparent #ddd;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .label-text {
    position: absolute;
    top: 0;
    width: 80px;
    height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>