

//统一封装 getDataList

import { onMounted} from 'vue'

export default function useGetTableData(getTableFun, config = {}) {
  const loading = ref(false)
  const tableData = ref([])
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })

  const getDataList = async extra => {
    try {
      loading.value = true
      const { rows, total, current, size } = await getTableFun(extra)
      tableData.value = data.rows
      pagination.value = {
        size,
        page: current,
        total
      }
      onSuccess && onSuccess()
    } catch(err) {
      onError && onError(err)
    } finally {
      loading.value = false
    }
  }

  const handleSearch = () => {
    getDataList({ page: 1 })
  }

  const handleChangeSize = val => {
    getDataList({ size: val })
  }

  const handleChangePage = val => {
    getDataList({ page: val })
  }

  onMounted(() => {
    if(config.manual) {
      handleSearch({page: 1})
    }
  })

  return {
    tableData,
    pagination,
    loading,
    handleSearch,
    handleChangeSize,
    handleChangePage
  }

}

