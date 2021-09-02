<!--
 * @Description: 
 * @Date: 2021-07-08 14:34:29
 * @LastEditTime: 2021-09-01 11:34:48
 * @FilePath: \jsplumb-test\src\views\ListScroll\index.vue
-->

<template>
  <css-seamless-scroll :datas="itemList" v-model="scroll" hover duration="3" class="scroll">
    <div class="item" v-for="(item, index) in itemList" :key="index">
      <span>{{item.name}}</span>
    </div>
  </css-seamless-scroll>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { jsSeamlessScroll, cssSeamlessScroll } from 'vue3-seamless-scroll'

export default {
  components: {
    cssSeamlessScroll,
    // jsSeamlessScroll,
  },
  setup() {
    const state = reactive({
      scroll: true,
      itemList: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 3 },
        { name: 4 },
        { name: 3 },
        { name: 4 },
        { name: 3 },
        { name: 4 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司',
        },
      ],
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style>
.scroll {
  height: 170px;
  width: 300px;
  margin: 100px auto;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>