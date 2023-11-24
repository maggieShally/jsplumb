<!--
 * @Description: 
 * @Date: 2022-07-19 14:57:57
 * @LastEditTime: 2023-11-21 18:27:31
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\index.vue
-->
<template>
  <div class="flex h-20 space-x-4">
    <div class="flex-initial p-2 border-dashed border-2 border-pink-300 rounded-md"> {{ $t("person.name") }} </div>
    <div class="flex-initial p-2 border-dashed border-2 border-pink-300 rounded-md">{{ $t("person.hobby") }}</div>
    <div class="flex-initial p-2 border-dashed border-2 border-pink-300 rounded-md overflow-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ad labore ipsam, aut rem quo repellat esse
      tempore id, quidem</div>
  </div>

  <div>
    {{ count }}
    <el-button type="primary" @click="increment">increment</el-button>
  </div>

  <el-tabs v-model="activeName">
    <el-tab-pane name="1" label="tab">
    </el-tab-pane>
    <el-tab-pane name="2" label="form">
      <el-form :model="searchForm" inline>
        <SearchItem v-show="visible" :initForm="searchForm" v-model:sex="searchForm.sex" />


        <el-form-item label="爱好">
          <el-select v-model="searchForm.hobby">
            <el-option value="eat" label="吃"></el-option>
            <el-option value="drink" label="喝"></el-option>
            <el-option value="play" label="玩"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="visible = !visible">visible</el-button>
        </el-form-item>
      </el-form>

    </el-tab-pane>
  </el-tabs>
</template> 

<script>
import { reactive, toRefs } from 'vue'

import SearchItem from './SearchItem.vue'

import { useGlobalState } from './counter.js'

export default {
  name: 'TailWindCssPage',
  components: {
    SearchItem
  },
  setup() {
    const state = reactive({
      activeName: "1",
      searchForm: {
        name: '',
        sex: '',
        hobby: ''
      },
      sex: '',
      visible: true
    })

    const { count, increment } = useGlobalState()

    const handleSearch = () => {
      console.log(state.searchForm)
    }

    return {
      count,
      increment,
      ...toRefs(state),
      handleSearch,

    }
  }
}
</script>

<style></style>