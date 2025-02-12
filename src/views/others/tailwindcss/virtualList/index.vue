<!--
 * @Description: 虚拟滚动
 * @Date: 2024-12-09 15:26:11
 * @LastEditTime: 2024-12-31 18:06:57
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\virtualList\index.vue
-->
<template>

  <ul class="scroll-container">
    <div class="actual-height-container">
      <div class="translate-container">
        <li class="item" :class=" i % 2 === 0 ? 'activeItem' : ''" v-for="(item, i) in actualRenderData">
          {{item}}
        </li>
      </div>
    </div>
  </ul>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'

import useVirtualList from './useVirtual.js';

export default {
  name: '',
  components: {
  },
  props: {
  },
  setup() {
    const state = reactive({})

    const dataList = ref([])

    const { actualRenderData } = useVirtualList({
      scrollContainer: '.scroll-container',
      actualHeightContainer: '.actual-height-container',
      translateContainer: '.translate-container',
      itemContainer: '.item',
      actualHeight: 100,
      itemHeight: 24,
      size: 20,
      data: dataList
    })

    onMounted(() => {
      setTimeout(() => {
        for(let i = 0 ; i < 1000; i++) {
        dataList.value.push(i)
      }
      }, 500)
    })

    return {
      ...toRefs(state),
      actualRenderData
    }
  },
}

</script>
<style scoped lang='less'>
.scroll-container {
  width: 300px;
  max-height: 200px;
  border: 1px solid #ddd;
  overflow: auto;
}

.item {
  border-bottom: 1px solid #ddd;
}

.activeItem {
  height: 30px;
}
</style>