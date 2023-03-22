<!--
 * @Description: 
 * @Date: 2022-04-07 11:39:02
 * @LastEditTime: 2022-04-07 15:01:17
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\barChart\Table.modal.vue
-->

<template>
  <el-dialog
    v-model="visible"
    title="下钻数据"
    :before-close="handleCancel"
  >
    <el-table
      :data="tableData"
      border
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="交易类型" prop="jyType" />
      <el-table-column label="产品大类" prop="category" />
      <el-table-column label="缺省" prop="value" />
      <el-table-column label="周期" prop="week" />
    </el-table>
  </el-dialog>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'

export default {
  name: 'TableNextModal',
  components: {},
  props: {},
  emits: ['onCancel'],
  setup(props, context) {
    const state = reactive({
      visible: true,
      tableData: [
        {
          id: 1,
          jyType: '采购明细',
          category: 'DDR3',
          value: '131',
          week: '周2',
          children: [
            {
              id: 11,
              jyType: '采购明细',
              category: 'DDR3',
              value: '8',
              week: '周5',
              children: [
                {
                  id: 111,
                  jyType: '采购明细',
                  category: 'FLASH',
                  value: '8',
                  week: '周7',
                  children: [
                    {
                      id: 112,
                      jyType: '采购入库',
                      category: 'DDR3',
                      value: '3',
                      week: '周9'
                    },
                    {
                      id: 115,
                      jyType: '采购明细',
                      category: 'DDR4',
                      value: '5',
                      week: '周19'
                    }
                  ]
                },
              ]
            },
            {
              id: 32,
              jyType: '采购入库',
              category: 'DDR3',
              value: '123',
              week: '周18'
            }
          ]
        },
        {
          id: 2,
          jyType: '采购入库',
          category: 'DDR3',
          value: '123',
          week: '周2',
          children: [
            {
              id: 41,
              jyType: '采购入库',
              category: 'DDR3',
              value: '123',
              week: '周2'
            },
            {
              id: 42,
              jyType: '采购入库',
              category: 'DDR3',
              value: '123',
              week: '周2'
            }
          ]
        },
        {
          id: 3,
          jyType: '工单下达',
          category: 'DDR3',
          value: '123',
          week: '周2',
          hasChildren: true
        },
        {
          id: 4,
          jyType: '工单入库',
          category: 'DDR3',
          value: '123',
          week: '周5'
        }
      ]
    })

    const handleCancel = () => {
      state.visible = false
      context.emit('onCancel')
    }

    onMounted(() => {})

    return {
      ...toRefs(state),
      handleCancel
    }
  }
}
</script>

<style lang="less" scoped>
.add-from.el-form {
  width: 380px;
}
</style>
