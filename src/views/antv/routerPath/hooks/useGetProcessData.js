/*
 * @Description: 过程说明数据
 * @Date: 2024-06-28 11:16:04
 * @LastEditTime: 2024-06-28 11:40:27
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\hooks\useGetProcessData.js
 */

import { onBeforeMount, onMounted, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

import { processApi } from '@/services'

import { processConfig } from '../config.js' 

export const useGetProcessData = createGlobalState(() => {

  const processData = ref([])
  
  const getDataList = async () => {
    const { data } = await processApi.getProcessConfig()
    processData.value = data.map(item => {
      return {
        ...item,
        color: processConfig.find(i => i.key === item.id)?.color
      }
    })
  }

  onBeforeMount(getDataList)

  return {
    processData
  }
})
