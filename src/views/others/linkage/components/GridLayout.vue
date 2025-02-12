<template>
  <grid-layout ref="gridlayoutRef" :layout.sync="gridLayout" responsive :col-num="24" :row-height="30" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true"
    :margin="[10, 10]" :use-css-transforms="true">

    <grid-item :ref="getGridItemRefs" v-for="item in gridLayout" :id="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i"
      @move="(...attrs) => moveEvent(...attrs, $event)" @moved="movedEvent">
      <slot :item=item></slot>
    </grid-item>
  </grid-layout>
</template>

<script>

import { ref, computed, nextTick, onMounted, unref, onUnmounted } from 'vue'

import { useVModel } from '@vueuse/core'
import { GridLayout, GridItem } from 'vue-grid-layout'



import { getDom } from '../utils'


export default {
  name: 'GridLayoutCom',
  props: {
    // dataList: {
    //   type: Array,
    //   default: () => []
    // }
    posList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    GridLayout,
    GridItem,
  },
  setup(props, context) {

    const gridLayout = useVModel(props, 'posList', context.emit)

    let mouseXY = {}
    let dragPos = { x: null, y: null, w: 2, h: 2, i: null }

    const gridlayoutRef = ref(null)
    const gridItemRefs = ref([])

    // const gridLayout = computed(() => props.dataList.map(i => i.pos))

    // const chartList = computed(() => props.dataList)

    const getGridItemRefs = async el => {
      await nextTick()
      if (el) {
        const index = gridItemRefs.value?.findIndex(item => item.i === el.i)
        if (index < 0) {
          gridItemRefs.value.push(el)
        } else {
          gridItemRefs.value[index] = el
        }
      }
    }

    // 从外面拖入 开始
    // const drag = async (e, id, chartPanelRef, { addItem }) => {
    //   await nextTick()

    //   const rectLeft = chartPanelRef.offsetLeft
    //   const rectTop = chartPanelRef.offsetTop

    //   const index = unref(chartList).findIndex(i => i.id === id)
    //   if (index === -1) {
    //     addItem(dragPos)

    //   } else {
    //     const el = gridItemRefs.value[index]
    //     el.dragging = { top: mouseXY.y - rectTop, left: mouseXY.x - rectLeft }
    //     let new_pos = el.calcXY(mouseXY.y - rectTop, mouseXY.x - rectLeft)
    //     // console.log('el',el.i)
    //     console.log('new_pos', new_pos)
    //     dragPos.i = el.i
    //     dragPos.x = unref(chartList)[index].pos.x
    //     dragPos.y = unref(chartList)[index].pos.y
    //     // 控制托入 底色 大小 移动位置
    //     gridlayoutRef.value.dragEvent(
    //       'dragstart',
    //       el.i,
    //       new_pos.x,
    //       new_pos.y,
    //       2,
    //       2
    //     )
    //   }
    // }

    // 从外面拖入  结束
    // const dragend = e => {
    //   // console.log('dragend', dragPos)
    //   gridlayoutRef.value.dragEvent(
    //     'dragend',
    //     dragPos.i,
    //     dragPos.x,
    //     dragPos.y,
    //     2,
    //     2
    //   )
    // }

    const moveEvent = (i, newX, newY, e) => {
      debugger
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY, e);
    }

    const movedEvent = (i, newX, newY) => {
      // console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    }

    let isDragging = false
    const handleMouseDown = e => {

      if (e.target.className !== 'vue-resizable-handle') {
        isDragging = true
      }
    }

    const handleMouseUp = e => {
      isDragging = false
    }

    const handleMouseMove = e => {
      if (isDragging) {
        // debugger
        // console.log(e.clientX, e.clientY)
        let activeElement = getDom(e)
        console.log(activeElement)
      }
    }

    const dragoverFun = e => {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }

    onMounted(() => {
      document.addEventListener('dragover', dragoverFun)
    })

    onUnmounted(() => {
      document.removeEventListener('dragover', dragoverFun)
    })

    return {
      gridLayout,
      moveEvent,
      movedEvent,
      // drag,
      // dragend,
      // chartList,
      // gridLayout,
      gridlayoutRef,
      getGridItemRefs,
      handleMouseDown,
      handleMouseUp,
      handleMouseMove


    }
  }
}
</script>

<style></style>