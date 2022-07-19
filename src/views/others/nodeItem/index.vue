<!--
 * @Description: sss
 * @Date: 2022-06-16 11:04:43
 * @LastEditTime: 2022-07-04 14:06:25
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\nodeItem\index.vue
-->
<template>
  <NodeUnion :currentNode="nodeTree" :nodeIndex="0" :childrenList="nodeTree.children" :isLast="true" />
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import NodeUnion from './NodeUnion.vue'
import { rendTree } from '../utils.js'
export default {
  name: 'NodeItemWrap',
  components: {
    NodeUnion,
  },
  setup() {
    const state = reactive({
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
        }, {
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

<style lang="less" scoped>
</style>