<!--
 * @Description: 
 * @Date: 2022-05-30 17:18:20
 * @LastEditTime: 2022-06-06 15:57:04
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\index.vue
-->
<template>
  <div class="box" id="barChart"></div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'

import PaintBar from './paintBar.js'

export default {
  name: 'combineChart',

  setup() {
    const { proxy } = getCurrentInstance()

    const d3 = proxy.$d3

   

    const state = reactive({
      dimension: ['日期', '产品大类', '事业部'],
      quato: [
        {
          id: '库存数',
          content: '库存数',
          calcType: 'sum',
        },
        {
          id: '在途数',
          content: '在途数',
          calcType: 'sum',
        },
      ],

      data: [
        {
          ID: 'uuid_01',
          事业部: 'SDG',
          产品大类: '电容',
          库存数量: '1200',
          在途数量: '1300',
          日期: '2022/5/1',
        },
        {
          ID: 'uuid_02',
          事业部: 'SDG',
          产品大类: '电阻',
          库存数量: '1200',
          在途数量: '1100',
          日期: '2022/5/2',
        },
        {
          ID: 'uuid_03',
          事业部: 'SDG',
          产品大类: '电容',
          库存数量: '1200',
          在途数量: '1000',
          日期: '2022/5/3',
        },
        {
          ID: 'uuid_04',
          事业部: 'SDG',
          产品大类: '电阻',
          库存数量: '1200',
          在途数量: '1900',
          日期: '2022/5/4',
        },
        {
          ID: 'uuid_05',
          事业部: 'SDG',
          产品大类: 'FLASH',
          库存数量: '1255',
          在途数量: '1255',
          日期: '2022/5/5',
        },
        {
          ID: 'uuid_06',
          事业部: 'SDG',
          产品大类: 'DRAM',
          库存数量: '1255',
          在途数量: '1255',
          日期: '2022/5/6',
        },
        {
          ID: 'uuid_07',
          事业部: 'ISG',
          产品大类: '电容',
          库存数量: '1255',
          在途数量: '1355',
          日期: '2022/5/1',
        },
        {
          ID: 'uuid_08',
          事业部: 'ISG',
          产品大类: '电阻',
          库存数量: '1255',
          在途数量: '1355',
          日期: '2022/5/2',
        },
        {
          ID: 'uuid_09',
          事业部: 'ISG',
          产品大类: '电容',
          库存数量: '1100',
          在途数量: '1355',
          日期: '2022/5/3',
        },
        {
          ID: 'uuid_10',
          事业部: 'ISG',
          产品大类: '电阻',
          库存数量: '1100',
          在途数量: '1755',
          日期: '2022/5/4',
        },
        {
          ID: 'uuid_11',
          事业部: 'ISG',
          产品大类: 'FLASH',
          库存数量: '1100',
          在途数量: '1755',
          日期: '2022/5/5',
        },
        {
          ID: 'uuid_12',
          事业部: 'ESG',
          产品大类: 'DRAM',
          库存数量: '1450',
          在途数量: '1755',
          日期: '2022/5/6',
        },
        {
          ID: 'uuid_13',
          事业部: 'ESG',
          产品大类: '电容',
          库存数量: '1450',
          在途数量: '1155',
          日期: '2022/5/1',
        },
        {
          ID: 'uuid_14',
          事业部: 'ESG',
          产品大类: '电阻',
          库存数量: '1450',
          在途数量: '1155',
          日期: '2022/5/2',
        },
        {
          ID: 'uuid_15',
          事业部: 'ESG',
          产品大类: '电容',
          库存数量: '1450',
          在途数量: '1155',
          日期: '2022/5/3',
        },
        {
          ID: 'uuid_16',
          事业部: 'ESG',
          产品大类: '电阻',
          库存数量: '1200',
          在途数量: '1155',
          日期: '2022/5/4',
        },
        {
          ID: 'uuid_17',
          事业部: 'ESG',
          产品大类: 'FLASH',
          库存数量: '1200',
          在途数量: '1155',
          日期: '2022/5/5',
        },
        {
          ID: 'uuid_18',
          事业部: 'ESG',
          产品大类: 'DRAM',
          库存数量: '1200',
          在途数量: '1155',
          日期: '2022/5/6',
        },
        {
          ID: 'uuid_19',
          事业部: 'CBG',
          产品大类: '电容',
          库存数量: '1200',
          在途数量: '1155',
          日期: '2022/5/1',
        },
        {
          ID: 'uuid_20',
          事业部: 'CBG',
          产品大类: '电阻',
          库存数量: '1600',
          在途数量: '1155',
          日期: '2022/5/2',
        },
        {
          ID: 'uuid_21',
          事业部: 'CBG',
          产品大类: '电容',
          库存数量: '1600',
          在途数量: '1155',
          日期: '2022/5/3',
        },
        {
          ID: 'uuid_22',
          事业部: 'CBG',
          产品大类: '电阻',
          库存数量: '1600',
          在途数量: '1155',
          日期: '2022/5/4',
        },
        {
          ID: 'uuid_23',
          事业部: 'CBG',
          产品大类: 'FLASH',
          库存数量: '1000',
          在途数量: '1155',
          日期: '2022/5/5',
        },
        {
          ID: 'uuid_24',
          事业部: 'CBG',
          产品大类: 'DRAM',
          库存数量: '1000',
          在途数量: '1155',
          日期: '2022/5/6',
        },
      ],
    })

    onMounted(async () => {
      const svg = d3.select('#barChart').append('svg').attr('width', 800).attr('height', 1000)


      console.log(svg)
      const painter = new PaintBar({
        svg,
        quato: state.quato,
        dimension: state.dimension,
        data: state.data,
      })
    })

    return {}
  },
}
</script>

<style lang="less" scoped>
.box {
  height: 800px;
  width: 1000px;
  border: 1px solid #ddd;
}
</style>