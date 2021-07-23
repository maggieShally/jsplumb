<!--
 * @Description: 
 * @Date: 2021-07-08 14:34:29
 * @LastEditTime: 2021-07-19 11:37:54
 * @FilePath: \jsplumb-test\src\views\ListScroll\index.vue
-->

<template>
  <css-seamless-scroll :datas="itemList" v-model="scroll" hover duration="3" class="scroll">
    <div class="item" v-for="(item, index) in itemList" :key="index">
      <span>{{item.name}}</span>
    </div>
  </css-seamless-scroll>
  <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button>
  <el-table row-key="date" ref="filterTable" border :data="tableData" style="width: 100%">
    <el-table-column type="selection" fixed="left" :selectable="handleForecastSelect" />
    <el-table-column prop="date" label="日期" sortable width="180" column-key="date" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" :filter-method="filterHandler">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址" :formatter="formatter">
    </el-table-column>
    <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag" filter-placement="bottom-end">
      <template #default="scope">
        <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>

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