<!--
 * @Description: 
 * @Date: 2021-07-08 14:34:29
 * @LastEditTime: 2023-10-07 17:54:56
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\ListScroll\index.vue
-->

<template>
  <el-row>
    <el-col :span="4">
      <css-seamless-scroll :datas="itemList" v-model="scroll" hover duration="3" class="scroll">
        <div class="item" v-for="(item, index) in itemList" :key="index">
          <span>{{item.name}}</span>
        </div>
      </css-seamless-scroll>
    </el-col>
    <el-col :span="4">
      <TestModel />
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
 
</template>

<script>
import { computed,ref, reactive, toRefs } from 'vue'
import { jsSeamlessScroll, cssSeamlessScroll } from 'vue3-seamless-scroll'

import TestModel from './components/TestModel.vue'

export default {
  components: {
    TestModel,
    cssSeamlessScroll,
    // jsSeamlessScroll,
  },
  setup() {
    const state = reactive({
      scroll: true,
      itemList: new Array(6).fill('').map((_,index) => {
        return { name: index}
      }),
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