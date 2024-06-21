<!--
 * @Description: 工序流程节点说明
 * @Date: 2024-04-18 09:40:09
 * @LastEditTime: 2024-06-05 15:10:24
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
      <div class="process-text-item" v-for="(item, index) in processDataList" :key="item.jobId">
        <div><span class="process-mark" :style="{ 'background-color': item.color }"></span>{{ index + 1 }} {{ item.jobType }}</div>
        <div v-if="isToggle" class="item-content">
          <div v-for="(subItem, subIndex) in item.childrenCombo" :key="subItem.jobId">
            {{ index + 1 }}.{{ subIndex + 1 }} {{ subItem.jobType }}
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

export default {
  name: 'ProcessTextCom',
  components: {
  },
  props: {
  },
  setup() {

    const state = reactive({
      isToggle: false,
      processDataList: mockData.combos.map(item => {
        return {
          ...item,
          color: processConfig.find(i => i.jobType === item.jobType)?.color
        }
      })
    })

    const handleToggle = () => {
      state.isToggle = !state.isToggle
    }

    return {
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

  .process-text-item {
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;

    &>div {
      padding: 3px 10px;
    }
  }

  .item-content {
    border-top: 1px solid #ddd;
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