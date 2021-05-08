<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
   <flow-panel></flow-panel>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FlowPanel from './views/ef/panel'
import FlowPanel from './views/flow/index.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    FlowPanel
  }
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
</style>
