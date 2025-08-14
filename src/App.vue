<!--
 * @Description: 
 * @Date: 2021-05-07 09:51:21
 * @LastEditTime: 2024-08-07 13:58:04
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\App.vue
-->
<template>

  <div id="app">
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>

</template>


<script>
import { provide, ref, computed } from 'vue'

export default {
  name: 'App',
  components: {
  },
  setup() {


  },
}
</script>

<style>
@import './assets/main.less';

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
