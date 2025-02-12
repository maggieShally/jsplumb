<!--
 * @Description: 下钻维度
 * @Date: 2025-01-20 14:14:05
 * @LastEditTime: 2025-01-20 15:17:47
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\components\DrillCom.vue
-->


<template>
  <div class="drill-sec">
    <div class="drill-title">
      <span>下钻维度</span>
      <span @click="handleCleanDrill"><el-icon><Brush /></el-icon></span>
    </div>

    <draggable class="drill-list" id="drillField" v-model="drillFields" :group="{name: 'field-item'}" item-key="columnId">
      <template #item="{ element }">
        <div class="drill-item">{{element.name}}</div>
      </template>
    </draggable>
  </div>

</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useVModel } from '@vueuse/core'

import draggable from 'vuedraggable'

export default {
  name: 'DrillCom',
  components: {
    draggable
  },
  props: {
    drillList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onCleanDrill'],
  setup(props, context) {

    const drillFields = useVModel(props, 'drillList', context.emit)

    const state = reactive({

      drillField: [
        {
          column: '维度1',
          columnKey: 'dimension1'
        },
        {
          column: '维度2',
          columnKey: 'dimension2'
        }
      ]
    })

    const handleCleanDrill = () => {
      context.emit('onCleanDrill')
    }
    onMounted(() => {
    })
    return {
      drillFields,
      ...toRefs(state),
      handleCleanDrill
      
    }
  },
}

</script>
<style scoped lang='less'>

.flex {
  display: flex
}

.drill-sec {
  font-size: 13px;
  padding: 10px;
  .drill-title {
    display: flex;
    justify-content: space-between;
  }
}

.drill-list {
  border: 1px solid #ddd;
  min-height: 30px;
}

.drill-item {
  padding: 5px 10px;
  color: #777070;
  background-color: rgba(235, 157, 157, 0.411);
  border: 1px solid #fff;
  border-radius: 10px;
}
</style>