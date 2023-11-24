
import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'



export const useGlobalState = createGlobalState(() => {
  const count = ref(0)

  const increment = function() {
    count.value += 1
  }
  return {
    count,
    increment
  }

})