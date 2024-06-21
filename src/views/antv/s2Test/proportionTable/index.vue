
<!--
 * @Description: 占比表
 * @Date: 2024-04-26 10:33:26
 * @LastEditTime: 2024-04-26 17:31:51
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\s2Test\ProportionTable\index.vue
-->


<template>
  <SheetComponent :dataCfg="dataCfg" :options="options" />
</template>

<script>
import { ref, shallowRef, reactive, toRefs, onMounted } from 'vue'

import { SheetComponent } from '@antv/s2-vue'

import { s2DataConfig } from '../mockData.js'

export default {
  name: 'ProportionTable',
  components: {
    SheetComponent
  },
  props: {
  },
  setup() {

    const dataCfg = shallowRef(s2DataConfig)

    const state = reactive({
      options: {
        width: 800,
        height: 480,
        // hierarchyType: 'tree',

        totals: {
          row: {
            showGrandTotals: true,
            reverseLayout: true,
          },
        },

        seriesNumber: {
          enable: true,
          text: '序号'
        },

        conditions: {
          text: [
            {
              field: "price",
              mapping(fieldValue, data) {

                return {
                  // fill 是文本字段标记下唯一必须的字段，用于指定文本颜色
                  fill: fieldValue > 10 ? "#FFB6C1" : '#5B8FF9',
                };
              },
            },
          ],
          interval: [
            {
              field: "price",
              mapping(fieldValue, data) {
                return {
                  // fill 是文本字段标记下唯一必须的字段，用于指定文本颜色
                  fill: fieldValue > 10 ? "#FFB6C1" : '#5B8FF9',
                };
              },
            },
          ],
          background: [
            {
              field: "city",
              mapping(fieldValue, data) {
                if (fieldValue === '杭州') {
                  return {
                    fill: "#FFB6C1"
                  }
                }
              },
            },
          ]
        }
      }
    })

    return {
      dataCfg,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='less' scoped></style>