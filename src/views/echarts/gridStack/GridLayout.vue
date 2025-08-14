<!--
 * @Description: GridStack DEMO
 * @Date: 2025-02-08 16:21:31
 * @LastEditTime: 2025-03-05 13:52:05
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\gridStack\GridLayout.vue
-->

<template>
  
  <div :class="['grid-stack']" ref="gridRef" :id="idKey">
    <template v-for="(w, index) in items" :key="w.id">
      <div :class="['grid-stack-item']" :gs-x="w.x" :gs-y="w.y" :gs-w="w.w" :gs-h="w.h" :gs-id="w.id" :id="w.id">
        <div class="grid-stack-item-content">
          <Component :is="w.components" :dataInfo="w" :ref="gridRefs.set"  />
        </div> 
      </div>

    </template>
  </div>

</template>

<script>
import { reactive, toRefs, onMounted, ref, nextTick } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'

import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'
import 'gridstack/dist/gridstack-extra.min.css'

import SimpleCom from './components/SimpleCom.vue'
import TabCom from './components/TabCom.vue'
import SubGrid from './components/SubGrid.vue'

export default {
  name: 'GridLayout',
  components: {
    SimpleCom,
    TabCom,
    SubGrid
  },
  props: {
    itemList: Array,
    idKey: {
      type: String,
      default: 'main'
    }
  },
  setup(props) {

    let grid = null

    const gridRef = ref(null)


    const gridRefs = useTemplateRefsList()

    const state = reactive({
      items: props.itemList
    })

    const getPos = (content = true, full = true) => {
      const options = grid.save(content, full)
      return options
    }

    const save = () => {
      let mainPos = getPos()

      let result = []
      gridRefs.value.forEach(item => {
        if(item.handleSave) {
          result.push(...item.handleSave())
        }
      })

      console.log(result)

      mainPos.children.forEach(item => {
        if(item.subGridOpts) {
          item.tabGridOpts = result.filter(i => i.id.split('_')[0] === item.id)
        }
      })
      console.log(mainPos)
    }
   
    onMounted(async () => {
      await nextTick()
      grid = GridStack.init({ // DO NOT use grid.value = GridStack.init(), see above
        float: true,
        minRow: 5,
        cellHeight: 70,
        dragOut: true,
        margin: 8, // 网格里面之间的距离
        acceptWidgets: true, // 接受从其他网格或外部拖动的小部件
        subGridOpts: {},
        id: props.idKey,
      }, gridRef.value)

      grid.on('change', function(event, items) {
        console.log(items)
      })

    })
 
    return {
      gridRefs,
      gridRef,
      ...toRefs(state),
      save,
      getPos
    }
  },
}

</script>
<style lang='less'>
.grid-stack {
  background: rgba(146, 146, 143, 0.103);
}

.grid-stack.grid-stack-static {
  background: #eee;
}

.grid-stack-item-content {
  background-color: #d4e9e5;
}
</style>