import { nextTick, unref } from 'vue'
import Sortable from 'sortablejs'

export const useSortable = (el, options) => {
  const initSortable = async () => {
    if (!el) return
    await nextTick()
    Sortable.create(unref(el), {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      ...options,
    })
  }

  return {
    initSortable,
  }
}
