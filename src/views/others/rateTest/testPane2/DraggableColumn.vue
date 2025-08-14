<!--
 * @Description: 可拖动列用于表格
 * @Date: 2024-09-05 09:25:43
 * @LastEditTime: 2024-10-09 16:49:50
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\rateTest\DraggableColumn.vue
-->
<template>

  <div ref="draggableColumnRef">
    <slot></slot>
  </div>

</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
import Sortable from 'sortablejs'
import { useVModel } from '@vueuse/core'

export default {
  name: 'DraggableColumn',
  components: {
  },
  props: {
    columns: {
      type: Array
    }
  },
  setup(props, context) {

    const draggableColumnRef = ref(null)

    const columnList = useVModel(props, 'columns', context.emit)


    const columnsDrop = async () => {
      const tHeader = draggableColumnRef.value.querySelector(
        '.el-table__header-wrapper tr'
      )
      Sortable.create(tHeader, {
        //  指定父元素下可被拖拽的子元素
        draggable: '.el-table__cell',
        async onEnd({ newIndex, oldIndex }) {
          let currRow = columnList.value.splice(oldIndex, 1)[0]
          columnList.value.splice(newIndex, 0, currRow)
        },
      })
    }

    onMounted(()=> {
      columnsDrop()

    })

    return {
      draggableColumnRef,
    }
  }
}
</script>

<style lang='less' scoped></style>