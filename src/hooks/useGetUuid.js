import { ref } from 'vue'
import { dataViewApi } from '@/services'

export default function useGetUuid() {
  const uuid = ref(null)
  const getUuid = async () => {
    const { data } = await dataViewApi.getUuid()
    console.log(data)
    uuid.value = data
  }
  return {
    uuid,
    getUuid,
  }
}
