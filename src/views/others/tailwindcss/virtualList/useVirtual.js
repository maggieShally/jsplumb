/*
 * @Description: 
 * @Date: 2024-12-09 15:26:47
 * @LastEditTime: 2024-12-31 17:57:39
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\virtualList\useVirtual.js
 */
import { active } from 'd3'
import { computed, ref, onMounted, watch, onUnmounted, nextTick } from 'vue'

export default function useVirtualList(config) {

  let actualHeightContainerEl = null, translateContainerEl = null, scrollContainerEl = null

  onMounted(() => {
    actualHeightContainerEl = document.querySelector(config.actualHeightContainer)
    translateContainerEl = document.querySelector(config.translateContainer)
    scrollContainerEl = document.querySelector(config.scrollContainer)

    scrollContainerEl.addEventListener('scroll',handleScroll)

  })
 
  let dataSource = []

  watch(() => config.data.value, newVal => {
    // actualHeightContainerEl.style.height = newVal.length * config.itemHeight + 'px'
    dataSource = newVal
    updateRenderData(0)
  }, {
    deep: true,
  })

  const actualRenderData = ref([])
  const renderedItemsCache = {}
  
  // 更新数据
  const updateRenderData = (scrollTop) => {
    let startIndex = 0, offsetHeight = 0
    for(let i = 0; i < dataSource.length; i++) {
      offsetHeight += getItemHeightFromCache(i)

      if(offsetHeight >= scrollTop) {
        startIndex = i
        break 
      }
    }

    actualRenderData.value = dataSource.slice(startIndex, startIndex + config.size)

    // 缓存最新列表项高度
    updateRenderedItemCache(startIndex)

    // 更新偏移量
    updateOffset(offsetHeight - getItemHeightFromCache(startIndex))
  }

  const updateOffset = (offsetTop ) => {
    translateContainerEl.style.transform = `translateY(${offsetTop}px)`
  }
  
  // 渲染已缓存的列表项高度
  const updateRenderedItemCache = async index => {
    const shouldUpdate = Object.keys(renderedItemsCache).length < dataSource.length
    if(!shouldUpdate) return 

    await nextTick()

    const items = Array.from(document.querySelectorAll(config.itemContainer))

    items.forEach((el) => {
      if(!renderedItemsCache[index]) {
        renderedItemsCache[index] = el.offsetHeight
      }
      index++
    })

    // 更新实际高度
    updateActualHeight()
  }

  // 获取缓存高度
  const getItemHeightFromCache  = startIndex => { 
    return renderedItemsCache[startIndex] || config.itemHeight
  }

  const updateActualHeight = () => {
    const actualHeight = dataSource.reduce((res, item, index) => res += getItemHeightFromCache(index), 0)
    actualHeightContainerEl.style.height =  actualHeight + 'px'
  }

  const handleScroll = (e) => {
    updateRenderData(e.target.scrollTop)
  }
  
  onUnmounted(() => {
    scrollContainerEl.removeEventListener('scroll',handleScroll)
  })
  
  return {
    actualRenderData
  }
}