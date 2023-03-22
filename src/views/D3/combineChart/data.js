/*
 * @Description:
 * @Date: 2022-04-02 11:15:50
 * @LastEditTime: 2023-02-21 18:07:13
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\data.js
 */

const weeksData = []

for (let i = 0; i < 46; i++) {
  weeksData.push({
    number: 1789,
    jyType: '采购明细',
    itemCategroy: 'DDR3',
    type: `周${7 + i}`,
    value: 0.25,
    expectedValue: 0.05,
    isExtra: true,
    isProgress: true,
    name: 'XXX'
  })
}

export const data = {
  describe: '标准交叉表数据。',
  fields: {
    rows: ['jyType', 'itemCategroy'],
    values: ['number'],
    columns: ['type'],
    valueInCols: true
  },
  meta: [
    {
      field: 'number',
      name: '值'
    },
    {
      field: 'jyType',
      name: '交易类型'
    },
    {
      field: 'itemCategroy',
      name: '产品大类'
    },
    {
      field: 'type',
      name: '日期'
    }
    // {
    //   "field": "sub_type",
    //   "name": "子类别"
    // }
  ],
  data: [
    {
      id: '1',
      number: 7789,
      jyType: '采购明细',
      itemCategroy: 'DDR3',
      type: '周1',
      value: 0.75,
      expectedValue: 0.8,
      isExtra: true,
      isProgress: true
    },
    {
      number: 1789,
      jyType: '采购明细',
      itemCategroy: 'DDR3',
      type: '周2',
      value: 0.25,
      expectedValue: 0.05,
      isExtra: true,
      isProgress: true
    },
    {
      number: 389,
      jyType: '采购明细',
      itemCategroy: 'DDR3',
      type: '周3'
    },
    {
      number: 589,
      jyType: '采购明细',
      itemCategroy: 'DDR3',
      type: '周4'
    },
    {
      number: 389,
      jyType: '采购明细',
      itemCategroy: 'DDR3',
      type: '周5'
    },
    {
      number: 1289,
      jyType: '采购明细',
      itemCategroy: 'DDR3',
      type: '周6'
    },

    ...weeksData,

    {
      number: 789,
      jyType: '采购明细',
      itemCategroy: 'FLASH',
      type: '周1'
    },
    {
      number: 289,
      jyType: '采购明细',
      itemCategroy: 'FLASH',
      type: '周2'
    },
    {
      number: 329,
      jyType: '采购明细',
      itemCategroy: 'FLASH',
      type: '周3'
    },
    {
      number: 2189,
      jyType: '采购明细',
      itemCategroy: 'FLASH',
      type: '周4'
    },
    {
      number: 889,
      jyType: '采购明细',
      itemCategroy: 'FLASH',
      type: '周5'
    },
    {
      number: 1489,
      jyType: '采购明细',
      itemCategroy: 'FLASH',
      type: '周6'
    },

    {
      number: 7789,
      jyType: '采购入库',
      itemCategroy: 'DDR3',
      type: '周1'
    },
    {
      number: 1789,
      jyType: '采购入库',
      itemCategroy: 'DDR3',
      type: '周2'
    },
    {
      number: 389,
      jyType: '采购入库',
      itemCategroy: 'DDR3',
      type: '周3'
    },
    {
      number: 589,
      jyType: '采购入库',
      itemCategroy: 'DDR3',
      type: '周4'
    },
    {
      number: 389,
      jyType: '采购入库',
      itemCategroy: 'DDR3',
      type: '周5'
    },
    {
      number: 1289,
      jyType: '采购入库',
      itemCategroy: 'DDR3',
      type: '周6'
    },

    {
      number: 889,
      jyType: '采购入库',
      itemCategroy: 'FLASH',
      type: '周1'
    },
    {
      number: 489,
      jyType: '采购入库',
      itemCategroy: 'FLASH',
      type: '周2'
    },
    {
      number: 529,
      jyType: '采购入库',
      itemCategroy: 'FLASH',
      type: '周3'
    },
    {
      number: 6189,
      jyType: '采购入库',
      itemCategroy: 'FLASH',
      type: '周4'
    },
    {
      number: 489,
      jyType: '采购入库',
      itemCategroy: 'FLASH',
      type: '周5'
    },
    {
      number: 3489,
      jyType: '采购入库',
      itemCategroy: 'FLASH',
      type: '周6'
    },

    {
      number: 2789,
      jyType: '工单发料',
      itemCategroy: 'DDR3',
      type: '周1'
    },
    {
      number: 3789,
      jyType: '工单发料',
      itemCategroy: 'DDR3',
      type: '周2'
    },
    {
      number: 1389,
      jyType: '工单发料',
      itemCategroy: 'DDR3',
      type: '周3'
    },
    {
      number: 1589,
      jyType: '工单发料',
      itemCategroy: 'DDR3',
      type: '周4'
    },
    {
      number: 1389,
      jyType: '工单发料',
      itemCategroy: 'DDR3',
      type: '周5'
    },
    {
      number: 3289,
      jyType: '工单发料',
      itemCategroy: 'DDR3',
      type: '周6'
    },

    {
      number: 3489,
      jyType: '工单发料',
      itemCategroy: 'FLASH',
      type: '周1'
    },
    {
      number: 3389,
      jyType: '工单发料',
      itemCategroy: 'FLASH',
      type: '周2'
    },
    {
      number: 5329,
      jyType: '工单发料',
      itemCategroy: 'FLASH',
      type: '周3'
    },
    {
      number: 2189,
      jyType: '工单发料',
      itemCategroy: 'FLASH',
      type: '周4'
    },
    {
      number: 1289,
      jyType: '工单发料',
      itemCategroy: 'FLASH',
      type: '周5'
    },
    {
      number: 1489,
      jyType: '工单发料',
      itemCategroy: 'FLASH',
      type: '周6'
    }
  ],
  totalData: [
    {
      number: 26193
      // "type": "家具",
      // "sub_type": "桌子"
    },

    {
      number: 78868
    }
  ]
}

const columns = [
  {
    key: 'd0',
    label: '0天'
  },
  {
    key: 'd1',
    label: '1天'
  },
  {
    key: 'd2',
    label: '2天'
  },
  {
    key: 'd3',
    label: '3天'
  },
  {
    key: 'd4',
    label: '4天'
  },
  {
    key: 'd5',
    label: '5天'
  }
]

const weeks = {}
for (let i = 1; i < 53; i++) {
  // columns.push({
  //   key: `week${i}`,
  //   label: `周${i}`
  // })

  weeks[`week${i}`] = {
    total: 120,
    percent: 50,
    show: true,
    id: `1${i}`,
    // nextIds: ['64']
    nextIds: ['43', '64', '41']
  }
}

export { weeks, columns }
