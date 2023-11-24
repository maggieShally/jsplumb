/*
 * @Description: 
 * @Date: 2023-08-09 16:05:47
 * @LastEditTime: 2023-08-09 16:07:43
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\utils.js
 */
const mousePosition = ev => {
  if (ev.pageX || ev.pageY) {
    return { x: ev.pageX, y: ev.pageY }
  }
  return {
    x:
      ev.clientX +
      document.documentElement.scrollLeft -
      document.body.clientLeft,
    y: ev.clientY + document.documentElement.scrollTop - document.body.clientTop
  }
}

export const getDom = e => {
  // console.log(mousePosition(e))
  let element = document.elementFromPoint(
    mousePosition(e).x,
    mousePosition(e).y
  )
  return element
}
