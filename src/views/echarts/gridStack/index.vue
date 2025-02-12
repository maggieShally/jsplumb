<!--
 * @Description: GridStack DEMO
 * @Date: 2025-02-08 16:21:31
 * @LastEditTime: 2025-02-11 16:25:49
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\gridStack\index.vue
-->

<template>

  <el-button type="default" @click="handleSave">save</el-button>
  <GridLayout ref="gridRef" :itemList="items" />
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'

import GridLayout from './GridLayout.vue'

export default {
  name: 'GridDemo',
  components: {
    GridLayout
  },
  props: {
  },
  setup() {

    const gridRef = ref(null)
    const state = reactive({
      items: [
        { x: 2, y: 3, h: 4, w: 4, components: 'SimpleCom', id: 1 },
        { x: 3, y: 4, w: 3, h: 4, components: 'SimpleCom', id: 2 },
        { x: 4, y: 2, w: 4, h: 4, components: 'SimpleCom', id: 3 },
        {
          x: 0, y: 1,
          w: 6, h: 5, 
          id: 4,
          components: 'TabCom',
          sizeToContent: true,
          content: '1',
          isMain: true,
          id: 'sub1',
          tabGridOpts: [
            {
              tabKey: 'tab1',
              components: 'SubGrid',
              content: 'SubGrid',
              id: 'sub1_grid1',
                children: [
                  {
                    id: '61',
                    x: 0, y: 1, h: 4, w: 4,
                    components: 'SimpleCom',
                    content: 'SimpleCom',
                  },
                  {
                    id: 62, x: 2, y: 5, h: 4, w: 4,
                    content: 'worssssld',
                    components: 'SimpleCom',
                    tabKey: 'tab1',
                  },
                ]
             
            },
            {
              tabKey: 'tab2',
              components: 'SubGrid',
              content: 'SubGrid',
              id: 'sub1_grid2',
                children: [
                  {
                    content: 'hello',
                    id: 51,
                    components: 'SimpleCom',
                    x: 2, y: 1, h: 4, w: 4,
                  },
                  {
                    id: 52, x: 2, y: 5, h: 4, w: 4,
                    content: 'world',
                    components: 'SimpleCom',
                  }
                ]
             
            }
          ]
        }
      ]
  })


  const handleSave = () => {
    console.log(gridRef.value.save())
  }

    onMounted(() => {

})

return {
  gridRef,
  ...toRefs(state),
  handleSave
}
  },
}

</script>
<style scoped lang='less'></style>