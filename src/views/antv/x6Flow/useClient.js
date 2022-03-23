/*
 * @Description: 
 * @Date: 2022-01-12 10:20:57
 * @LastEditTime: 2022-01-12 10:20:58
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Flow\useClient.js
 */

import { ref } from 'vue'
export default function useClient() {
  const clientData = ref({
    x: 0,
    y: 0,
  })

  const getClientData = function(event) {
    clientData.value.x = event.clientX
    clientData.value.y = event.clientY
  }

  return {
    clientData,
    getClientData
  }
}
