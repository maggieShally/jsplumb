<!--
 * @Description: 
 * @Date: 2021-05-07 09:51:21
 * @LastEditTime: 2021-07-21 15:53:10
 * @FilePath: \jsplumb-test\src\App.vue
-->
<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <router-link to="/flow">Go to Foo</router-link>
  <router-link to="/d3">Go to 3d</router-link>
  <router-link to="/scroll">Go to /scroll</router-link>
  <router-link to="/canvas/clock">canvas clock</router-link>
  <router-link to="/canvas/guaguaka">canvas guaguaka</router-link>
  <router-link to="/canvas/canvasImg">Go to canvasImg</router-link>
  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FlowPanel from './views/ef/panel'
// import FlowPanel from './views/flow/index.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // FlowPanel
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  margin: 0 5px;
}
</style>
