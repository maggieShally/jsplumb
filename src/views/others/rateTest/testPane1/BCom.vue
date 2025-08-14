<template>
  <div class="b-com">
    <h1>BCom 组件{{count}}</h1>
    <p>当前 count: {{ currentCount }}</p>
    <el-button @click="addCount">+1</el-button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'BCom',
  props: {
    count: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const currentCount = ref(0);

    function addCount() {
      currentCount.value++;
    }

    return {
      currentCount,
      addCount
    };
  }
}
</script>

<style scoped>
.b-com {
  padding: 16px;
}
</style>