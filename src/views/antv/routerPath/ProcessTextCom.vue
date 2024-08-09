<!--
 * @Description: 工序流程节点说明
 * @Date: 2024-04-18 09:40:09
 * @LastEditTime: 2024-06-28 11:38:34
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\ProcessTextCom.vue
-->
<template>
  <div class="process-wrap">
    <span class="toggle-icon" @click="handleToggle">
      <el-icon :size="25">
        <Plus v-if="!isToggle" />
        <Minus v-else />
      </el-icon>
    </span>
    <div class="process-text">
      <div class="process-text-item" v-for="(item, index) in processDataList" :key="item.key">
        <div><span class="process-mark" :style="{ 'background-color': item.color }"></span>{{ index + 1 }} {{ item.value }}</div>
        <div v-if="isToggle" class="item-content">
          <div v-for="(subItem, subIndex) in item.children" :key="subItem.key">
            {{ index + 1 }}.{{ subIndex + 1 }} {{ subItem.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'

import { mockData } from './data.js'
import { processConfig } from './config.js'

import { useGetProcessData } from './hooks/useGetProcessData.js'

export default {
  name: 'ProcessTextCom',
  components: {
  },
  props: {
  },
  setup() {

    const state = reactive({
      isToggle: false,
      // processDataList: mockData.combos.map(item => {
      //   return {
      //     ...item,
      //     color: processConfig.find(i => i.jobType === item.jobType)?.color
      //   }
      // })
    })

    const { processData: processDataList } = useGetProcessData()

    const handleToggle = () => {
      state.isToggle = !state.isToggle
    }

    return {
      processDataList,
      ...toRefs(state),
      handleToggle
    }
  }
}
</script>

<style lang='less' scoped>
.process-wrap {
  display: flex;
  background: #fff;
  font-size: 12px;
  max-width: 90%;
  overflow: auto;

  .toggle-icon {
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: #686767;
    cursor: pointer;

    .el-icon {
      color: #fff;
    }
  }

}

.process-text {
  display: flex;
  min-width: 1020px;

  .process-text-item {
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    

    &>div {
      padding: 3px 10px;
    }
  }

  .item-content {
    border-top: 1px solid #ddd;
    min-width: 130px;
  }

  .process-mark {
    margin-right: 5px;
    display: inline-block;
    width: 30px;
    height: 15px;
    border-radius: 5px;
  }
}
</style>