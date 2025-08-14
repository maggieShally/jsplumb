<!--
 * @Description: 交集并集 关系 
 * @Date: 2022-06-16 11:04:43
 * @LastEditTime: 2024-09-04 13:43:57
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\nodeItem\index.vue
-->
<template>
  <ScreenFullCom>
    <el-button @click="visible = true">sss</el-button>
    <div id="nodeUnit">
      <el-tooltip :teleported="false" content="<span>The content can be <strong>HTML</strong></span>" raw-content>
        <el-button>hover me</el-button>
      </el-tooltip>
      <!-- <NodeUnion :currentNode="nodeTree" :nodeIndex="0" :childrenList="nodeTree.children" :isLast="true" /> -->
    </div>
  </ScreenFullCom>


  <ScreenFullCom>
    <div>testetwetet</div>
  </ScreenFullCom>


  
    <el-dialog v-model="visible" title="22222">
      <el-dropdown :teleported="false">
        <span class="el-dropdown-link">
          Dr<el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>
              Action 2
            </el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
            <el-dropdown-item>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-popover :teleported="false" placement="top-start" title="Title" :width="200" trigger="hover" content="this is content, this is content, this is content">
        <template #reference>
          <el-button class="m-2">Hover to activate</el-button>
        </template>
      </el-popover>
      <el-select :teleported="false">
        <el-option value="1" label="23"></el-option>
      </el-select>
      <el-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start" :teleported="false">
        <el-button>tooltip</el-button>
      </el-tooltip>
    </el-dialog>

</template>


<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import ScreenFullCom from '@/components/screenFull'

import NodeUnion from './NodeUnion.vue'
import { rendTree } from '../utils.js'
export default {
  name: 'NodeItemWrap',
  components: {
    NodeUnion,
    ScreenFullCom,
  },
  setup() {
    const state = reactive({
      visible: false,
      isFullScreen: false,
      node: [
        {
          id: 'x0',
          name: 'x0',
          pid: 0,
        },
        {
          id: 'x0-1',
          pid: 'x0',
          name: 'x0-1',
          unionToParent: {
            type: 'left',
          },
        },
        {
          id: 'x0-1-1',
          pid: 'x0-1',
          name: 'x0-1-1',
          unionToParent: {
            type: 'inner',
          },
        },
        {
          id: 'x0-1-2',
          pid: 'x0-1',
          name: 'x0-1-2',
          unionToParent: {
            type: 'inner',
          },
        },
        {
          id: 'x0-2',
          pid: 'x0',
          name: 'x0-2',
          unionToParent: {
            type: 'right',
          },
        },
        {
          id: 'x0-1-1-1',
          pid: 'x0-1-1',
          name: 'x0-1-1-1',
          unionToParent: {
            type: 'right',
          },
        },
        {
          id: 'x0-1-1-2',
          pid: 'x0-1-1',
          name: 'x0-1-1-2',
          unionToParent: {
            type: 'right',
          },
        },
        {
          id: 'x0-1-1-3',
          pid: 'x0-1-1',
          name: 'x0-1-1-3',
          unionToParent: {
            type: 'right',
          },
        },
      ],
    })

    const nodeTree = computed(() => {
      const treeData = rendTree(state.node)
      console.log(treeData)
      return treeData[0]
    })

    onMounted(() => {
      console.log(12)
    })

    return {
      nodeTree,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped></style>