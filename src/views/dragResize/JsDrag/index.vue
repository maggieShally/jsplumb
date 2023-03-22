<!--
 * @Description: 练习拖拽结构
 * @Date: 2022-03-25 15:08:42
 * @LastEditTime: 2022-12-07 10:46:35
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\JsDrag\index.vue
-->

<template>
  <div class="flex-wrap">
    <div class="flex-left">
      <div>组件</div>

      <div class="node-sec">
        <div class="node-item" v-for="item in formList" :key="item.com">
          <Component
            :is="item.com"
            draggable="true"
            @dragstart="handleDrag"
            disabled
            :data-item="JSON.stringify(item)"
          />
        </div>
      </div>
    </div>
    <div class="flex-content" @drop="handleDrop" @dragover="handleAllowDrop">
      <el-form>
        <template
          v-for="(item, index) in contentList.search.children"
          :key="item.id"
        >
          <el-form-item
            :label="item.properties.label"
          >
            <Component
              :id="index"
              :is="item.com"
              v-bind="item.properties"
              v-model="item.properties.value"
              @click="handleClick(item, index)"
              draggable="true"
              @dragstart="handleComDrag"
            />
          </el-form-item>
        </template>
      </el-form>

      <template v-for="item in contentList.table.children" :key="item.id">
        <Component :is="item.com" :column="item.children" />
      </template>
    </div>
    <div class="flex-right">
      <ComInputSet
        v-if="activeInfo.properties"
        @onChange="handleChange"
        :defaultValue="activeInfo"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import ComInput from './components/ComInput'
import ComTable from './components/ComTable'
import ComInputSet from './components/ComInput.set'

export default {
  name: 'FlexDrag',
  components: {
    ComInput,
    ComTable,
    ComInputSet
  },
  setup() {
    let num = 2
    const state = reactive({
      formList: [
        {
          type: 'input',
          com: 'ComInput',
          label: '',
          classify: 'search',
          value: ''
        },
        {
          type: 'table',
          com: 'ComTable',
          label: '',
          classify: 'table'
        }
      ],

      contentList: {
        search: {
          type: 'search',
          id: '',
          properties: {},
          children: [
            {
              type: 'input',
              com: 'ComInput',
              label: 'hehe',
              classify: 'search',
              value: '',
              properties: {}
            }
          ]
        },
        table: {
          type: 'table',
          id: 'xxx',
          properties: {},
          children: [
            {
              type: 'table',
              com: 'ComTable',
              label: 'hehe',
              classify: 'table',
              properties: {}
            }
          ]
        }
      },

      activeInfo: {}
    })

    const handleDrag = ev => {
      ev.dataTransfer.setData('node', ev.target.dataset.item)
      ev.dataTransfer.effectAllowed = 'copy'
    }

    const addNode = data => {
      data = JSON.parse(data)

      const node = {
        id: num++,
        properties: {},
        ...data
      }

      switch (data.classify) {
        case 'search':
          state.contentList.search.children.push(node)
          break
        case 'table':
          state.contentList.table.children.push(node)
          break
        default:
          break
      }
    }

    // 移动位置
    const moveNode = endIndex => {
      const node = state.contentList.search.children[state.moveStartIndex]
      state.contentList.search.children.splice(state.moveStartIndex, 1)
      state.contentList.search.children.splice(endIndex, 0, node)
    }

    const handleDrop = ev => {
      console.log(ev)
      ev.preventDefault()
      let data = ev.dataTransfer.getData('node')

      if(data) {
        addNode(data)
      } else {
        moveNode(ev.target.id)
      }
    }

    const handleAllowDrop = ev => {
      ev.preventDefault()
    }

    const handleComDrag = ev => {
      console.log(ev)
      state.moveStartIndex = ev.target.id
    }

    const handleComDrop = ev => {
      console.log(ev)
    }

    const handleClick = (node, index) => {
      state.activeInfo = {
        ...node,
        index
      }
    }

    const handleChange = data => {
      debugger
      state.contentList[state.activeInfo.classify].children[
        state.activeInfo.index
      ].properties = data
    }

    return {
      ...toRefs(state),
      handleDrag,
      handleDrop,
      handleAllowDrop,
      handleChange,
      handleClick,
      handleComDrag,
      handleComDrop
    }
  }
}
</script>

<style lang="less" scoped>
.flex-wrap {
  width: 100%;
  min-height: 800px;
  display: flex;
  align-items: stretch;

  .flex-left,
  .flex-right {
    margin: 20px;
    padding: 20px;
    width: 300px;
    border: 1px solid #ddd;
  }

  .flex-content {
    margin: 20px;
    padding: 20px;
    flex: 1;
    border: 1px solid #ddd;
  }

  .node-sec {
    margin: 20px 0 0 0;

    .node-item {
      margin: 20px 0 0 0;
    }
  }
}
</style>
