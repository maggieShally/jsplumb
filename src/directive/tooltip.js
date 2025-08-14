/*
 * @Description: 简单 tooltip 显示指令
 * @Date: 2025-08-05 15:53:17
 * @LastEditTime: 2025-08-05 16:30:56
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\directive\tooltip.js
 */


import { h, render, resolveComponent, mergeProps } from 'vue'
import { ElTooltip } from 'element-plus'
import { bind } from 'lodash'

export const tooltip = {
  mounted(el, binding, vnode) {
    const value = typeof binding.value === 'object' ? binding.value : {}
    debugger
    const node = h(
      resolveComponent(ElTooltip),
      mergeProps(
        {
          content:
            typeof binding.value === 'boolean' ? undefined : binding.value,
          placement: binding.arg,
          'virtual-triggering': true,
          'virtual-ref': el,
        }, value,
        () => binding.value?.text ?? bind.value
      ),
      binding.value
    )
    render(node, el)
  },
  unmounted(el, binding) {
    render(null, el)
  },
}
