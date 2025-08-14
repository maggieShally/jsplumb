/*
 * @Description:
 * @Date: 2025-07-21 14:01:15
 * @LastEditTime: 2025-07-21 14:15:03
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\directive\index.js
 */

export const vFocus = {
  mounted(el, binding, vnode) {
    debugger
    el.querySelector('.el-input__inner').focus()
  },
}
