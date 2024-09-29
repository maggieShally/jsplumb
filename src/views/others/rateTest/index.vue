<!--
 * @Description: 
 * @Date: 2024-01-17 11:54:02
 * @LastEditTime: 2024-09-25 10:55:01
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\rateTest\index.vue
-->

<template>



  <div>
    <!--
    <DraggableColumn />
    -->

    <el-button type="primary" @click="handleGetSubmit">点击Test</el-button>


    <span id="form_nav">我是一个terst </span>

    <el-input v-model="name"></el-input>

    <div ref="testRef" style="width: 100px;border: 1px solid rgb(221, 221, 221);">
      <div>ddddddddd</div>
      <div>sccc</div>
    </div>
  </div>

</template>

<script>

// import useGetTableData from './useGetTableData.js'
import { onBeforeUnmount, toRefs, onMounted, reactive, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

import { useEventListener } from '@vueuse/core'


// import DraggableColumn from './DraggableColumn.vue'



export default {
  name: 'RateTest',
  components: {
    // DraggableColumn
  },
  setup() {

    const testRef = ref(null)

    const state = reactive({
      searchForm: {},
      name: '',
    })


    const handleGetSubmit = async () => {
      console.log(2222)
      try {
        const data = await doSumnit()
        console.log(data)
      } catch (err) {
        console.log('err', err)
      }

    }

    const doSumnit = async () => {
      return new Promise((resolev, reject) => {
        try {
          setTimeout(() => {
            reject(false)
          }, 500)
        } catch (err) {
          console.log(err)
        }

      })
    }

    // const getTableFun = async extra => {
    //   const params = {
    //     ...state.searchForm,
    //     ...extra
    //   }
    //   const { data } = await getData(params)
    //   return {
    //     ...data,
    //     rows: data.rows.map(i => {
    //       return {
    //         ...i,
    //         valueKey: i + 'test',
    //       }
    //     })
    //   }
    // }

    // const { tableData, pagination, loading, handleSearch, handleChangeSize, handleChangePage } = useGetTableData(getTableFun, {
    //   onSuccess: result => {
    //     console.log(result)
    //   }
    // })

    const open = () => {
      let result = true
      ElMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
          result = true
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
      return result
    }


    onBeforeRouteLeave(() => {
      return open()
    })

    onBeforeUnmount(() => {
      var a = 3
    
    })


    onMounted(() => {
      // useEventListener(document, 'visibilitychange', (evt) => {
      //   console.log(evt)
      // })

      // document.addEventListener('click', el => {
      //   console.log('是否在testRef内点击', testRef.value.contains(el.target))
      // })

      window.onbeforeunload = function () {
        // return 'ssss';
      }

    })


    return {
      testRef,
      // tableData,
      // pagination,
      // loading,
      // handleSearch,
      // handleChangeSize,
      // handleChangePage,
      ...toRefs(state),
      handleGetSubmit
    }
  }
}
</script>

<style lang="less">
#form_nav {
  display: none
}
</style>