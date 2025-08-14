<!--
 * @Description: 
 * @Date: 2024-01-17 11:54:02
 * @LastEditTime: 2025-07-21 17:52:32
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\rateTest\testPane2\index.vue
-->

<template>

  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="DraggableColumn" name="draggable">
      <!-- <DraggableColumn :columns="columns"> -->
      <el-table ref="tableRef" :data="tableData" row-key="key">
        <el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"></el-table-column>
      </el-table>
      <!-- </DraggableColumn> -->

    </el-tab-pane>
    <el-tab-pane label="Config" name="second">
      <div>
        <el-button type="primary" @click="handleGetSubmit">{{ $translate('test.btnText') }}</el-button>
        <span id="form_nav" data-text="">我是一个test</span>
        <el-input v-model="name" v-focus:boo.bar="2"></el-input>
        <div ref="testRef" style="width: 100px;border: 1px solid rgb(221, 221, 221);">
          <div>testRef</div>
          <div>ddddddddd</div>
          <div>sccc</div>
        </div>
      </div>
      <BaseSelectAll v-model:modelValue="selectedList" :options="selectOption" filterable multiple />
    </el-tab-pane>
  </el-tabs>

</template>

<script>

// import useGetTableData from './useGetTableData.js'
import { onBeforeUnmount, nextTick, toRefs, onMounted, reactive, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

import { useEventListener } from '@vueuse/core'

import BaseSelectAll from '@/components/BaseSelectAll.vue'

import { useSortable } from '@/hooks/useSortable.js'

import DraggableColumn from './DraggableColumn.vue'


export default {
  name: 'TestPane2',
  components: {
    DraggableColumn,
    BaseSelectAll
  },
  setup() {

    const tableRef = ref(null)
    const testRef = ref(null)

    const state = reactive({
      activeName: 'draggable',
      searchForm: {},
      name: '',

      tableData: [
        {
          name: '1',
          age: 11,
          key: 111,
        },
        {
          name: '2',
          age: 12,
          key: 121
        },
        {
          name: '3',
          age: 13,
          key: 131
        },
        {
          name: '4',
          age: 14,
          key: 141
        },
        {
          name: '5',
          age: 15,
          key: 151
        }
      ],
      columns: [
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: 'key',
          prop: 'key'
        }
      ],


      selectOption: [
        {
          label: '分组1',
          option: [
            {
              label: '男',
              value: 'male'
            },
            {
              label: '女',
              value: 'female'
            }
          ]
        },
        {
          label: '分组2',
          option: [
            {
              label: '男1',
              value: 'male1'
            },
            {
              label: '女1',
              value: 'female1'
            }
          ]
        }
      ],

      selectedList: []
    })


    const handleGetSubmit = async () => {
      try {
        const data = await doSubmit()
        console.log(data)
      } catch (err) {
        console.log('err', err)
      }
    }

    const doSubmit = async () => {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            reject(false)
          }, 500)
        } catch (err) {
          console.log(err)
        }
      })
    }

    const open = () => {
      return new Promise((resolve, reject) => {
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
            resolve(true)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
            resolve(false)
          })
      })
    }

    // // vue-router切换前提醒
    // onBeforeRouteLeave(async (to, from, next) => {
    //   next(await open())
    // })

    onMounted(async () => {
      // useEventListener(document, 'visibilitychange', (evt) => {
      //   console.log(evt)
      // })

      // document.addEventListener('click', el => {
      //   console.log('是否在testRef内点击', testRef.value?.contains(el.target))
      // })


      // 浏览器关闭前
      // window.onbeforeunload = function () {
      //   return '提示'
      // }

 
      await nextTick()
      const tbody = document.querySelector(
        '.el-table__header-wrapper tr'
      )
      const { initSortable } = useSortable(tbody, {
        draggable: '.el-table__cell',
        onEnd({ newIndex, oldIndex }) {
          let currRow = state.columns.splice(oldIndex, 1)[0]
          state.columns.splice(newIndex, 0, currRow)
        },
      }) 

      initSortable()

    })

    return {
      testRef,
      tableRef,
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