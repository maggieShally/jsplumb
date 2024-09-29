<template>

  <div ref="draggableColumnRef">

    <el-table :data="tableData" row-key="key">
      <el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"></el-table-column>
    </el-table>

  </div>

</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
import Sortable from 'sortablejs'

export default {
  name: 'DraggableColumn',
  components: {
  },
  props: {
  },
  setup() {

    const draggableColumnRef = ref(null)

    const state = reactive({
      tableData: [
        {
          name: '1',
          age: 11,
          key: 11,
        },
        {
          name: '2',
          age: 12,
          key: 12
        },
        {
          name: '3',
          age: 13,
          key: 13
        },
        {
          name: '4',
          age: 14,
          key: 14
        },
        {
          name: '5',
          age: 15,
          key: 15
        }
      ],
      columns: [
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '年龄',
          prop: 'age'
        }
      ]
    })


    const columnsDrop = async () => {
      const tHeader = draggableColumnRef.value.querySelector(
        '.el-table__header-wrapper tr'
      )
      console.log(tHeader)
      Sortable.create(tHeader, {
        //  指定父元素下可被拖拽的子元素
        draggable: '.el-table__cell',
        async onEnd({ newIndex, oldIndex }) {
          let currRow = state.columns.splice(oldIndex, 1)[0]
          state.columns.splice(newIndex, 0, currRow)
          // state.columns.forEach((item, index) => {
          //   item.key = Date.now() + index
          // })
        },
      })
    }

    onMounted(()=> {
      columnsDrop()
    })

    return {
      draggableColumnRef,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='less' scoped></style>