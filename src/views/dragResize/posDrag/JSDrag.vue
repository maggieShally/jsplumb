<!--
 * @Description: JS 移动缩放练习
 * @Date: 2022-03-23 17:36:13
 * @LastEditTime: 2023-08-14 14:39:57
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\posDrag\JSDrag.vue
-->
<template>
  <div class="drag-wrap">
    <div class="drag-sec" id="draggable">
      <span class="mouse" id="mouse">\</span>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'JSDrag',
  setup() {
    const draggable = function() {
      const target = document.querySelector('#draggable')

      target.onmousedown = function(event) {
        if (event.target.id !== 'draggable') return false

        const target = event.target
        const targetLeft = target.offsetLeft
        const targetTop = target.offsetTop

        let originLeft = event.clientX
        let originTop = event.clientY

        // const parentNode = document.querySelector('.content-wrap')
        const parentNode = target.parentNode

        const minLeft = parentNode.offsetLeft
        const minTop = parentNode.offsetTop

        const maxLeft =
          parentNode.offsetLeft + parentNode.offsetWidth - target.offsetWidth
        const maxTop =
          parentNode.offsetTop + parentNode.offsetHeight - target.offsetHeight

        document.onmousemove = function(event) {
          event.preventDefault()

          const currentLeft = event.clientX
          const currentTop = event.clientY

          let diffLeft = targetLeft + (currentLeft - originLeft)
          let diffTop = targetTop + (currentTop - originTop)

          diffLeft =
            diffLeft > minLeft
              ? diffLeft < maxLeft
                ? diffLeft
                : maxLeft
              : minLeft
          diffTop =
            diffTop > minTop ? (diffTop < maxTop ? diffTop : maxTop) : minTop

          target.style.cssText += `top: ${diffTop}px ; left: ${diffLeft}px;`
        }

        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }

        return false
      }
    }

    const draggableSize = function() {
      const target = document.querySelector('#mouse')
      const parentNode = document.querySelector('#draggable')

      const minWidth = parentNode.offsetWidth * 0.2
      const minHeight = parentNode.offsetHeight * 0.2

      target.onmousedown = function(event) {
        event.preventDefault()

        const disX = event.clientX - parentNode.offsetWidth
        const disY = event.clientY - parentNode.offsetHeight

        document.onmousemove = event => {

          const cLeft =
            event.clientX > disX + parentNode.parentNode.offsetWidth
              ? disX + parentNode.parentNode.offsetWidth
              : event.clientX
          const cTop =
            event.clientY > disY + parentNode.parentNode.offsetHeight
              ? disY + parentNode.parentNode.offsetHeight
              : event.clientY

          console.log(disX + parentNode.offsetWidth)
          let w = cLeft - disX
          let h = cTop - disY
          w = w > minWidth ? w : minWidth
          h = h > minHeight ? h : minHeight

          parentNode.style.cssText += `width: ${w}px; height: ${h}px;`
        }

        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }

        return false
      }
    }

   
    onMounted(() => {
      draggable()
      draggableSize()
    })

    return {
    }
  }
}
</script>

<style lang="less" scoped>
.drag-wrap {
  width: 100%;
  height: 800px;
  position: relative;
}
.drag-sec {
  width: 300px;
  height: 300px;
  border: 1px solid #ddd;
  position: absolute;
  top: 0;
  left: 0;

  .mouse {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
  }
}
</style>
