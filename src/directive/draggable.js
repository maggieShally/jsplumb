/*
 * @Description:
 * @Date: 2025-07-21 16:18:10
 * @LastEditTime: 2025-07-21 16:24:14
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\directive\draggable.js
 */

import { nextTick } from 'vue'

export const draggable = async (el, binding, vnode) => {
  await nextTick()
  if (!binding.value) return
  el.onmousedown = function (event) {
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

    document.onmousemove = function (event) {
      event.preventDefault()

      const currentLeft = event.clientX
      const currentTop = event.clientY

      let diffLeft = targetLeft + (currentLeft - originLeft)
      let diffTop = targetTop + (currentTop - originTop)

      diffLeft =
        diffLeft > minLeft ? (diffLeft < maxLeft ? diffLeft : maxLeft) : minLeft
      diffTop =
        diffTop > minTop ? (diffTop < maxTop ? diffTop : maxTop) : minTop

      target.style.cssText += `top: ${diffTop}px ; left: ${diffLeft}px;`
    }

    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }

    return false
  }
}

export const draggableSize = async (el, binding, vnode) => {
  await nextTick()
  if (!binding.value) return
  let mouseNode = document.createElement('span')
  mouseNode.textContent = `X`
  mouseNode.style = `position: absolute; bottom: 0; right: 0; cursor: nwse-resize`
  el.appendChild(mouseNode)
  
  const parentNode = el

  const minWidth = parentNode.offsetWidth * 0.2
  const minHeight = parentNode.offsetHeight * 0.2

  mouseNode.onmousedown = function (event) {
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

    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }

    return false
  }
}
