/*
 * @Description:
 * @Date: 2022-03-22 16:09:20
 * @LastEditTime: 2022-07-12 14:00:32
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Tree\data.js
 */
export const initData = {
  nodes: [
    {
      id: '0',
      name: 'PCBA DDR4,8GB',
      type: 'node'
    },
    {
      id: '1-0',
      name: 'PCBA DDR4,8GB 上游1',
      type: 'pre'
    },
    {
      id: '-1-0-zb-1',
      name: 'PCBA DDR4,8GB 上游1/销售单',
      type: 'zb',
      data: [
        {
          name: '出货',
          quantity: 223,
          amount: 12344
        },
        {
          name: '未出货',
          quantity: 323,
          amount: 12344
        }
      ]
    },

    {
      id: '-2-0',
      name: 'PCBA DDR4,8GB 上游2',
      type: 'pre'
    },
    {
      id: '0-1',
      name: 'PCBA DDR4,8GB 下游1',
      type: 'next'
    },
    {
      id: '0-1-1',
      name: 'PCBA DDR4,8GB 下游1 下游1',
      type: 'next',
      isLeaf: true
    },
    {
      id: '0-2',
      name: 'PCBA DDR4,8GB 指标1/销售单',
      type: 'zb',
      data: [
        {
          name: '出货',
          quantity: 223,
          amount: 12344
        },
        {
          name: '未出货',
          quantity: 323,
          amount: 12344
        }
      ]
    },
    {
      id: '0-2',
      name: 'PCBA DDR4,8GB 指标1/生产单',
      type: 'zb',
      data: [
        {
          name: '已交货',
          quantity: 223,
          amount: 12344
        },
        {
          name: '生产在途',
          quantity: 323,
          amount: 12344
        }
      ]
    },
    {
      id: '1',
      name: 'PCBA DDR4,16GB',
      type: 'node'
    },
    {
      id: '1-1',
      name: 'SO-DIMM DDR4 16GB 下游1',
      type: 'next'
    },
    {
      id: '1-2',
      name: 'PCBA DDR4,16GB 指标1',
      type: 'zb',
      data: [
        {
          name: '出货',
          quantity: 223,
          amount: 12344
        },
        {
          name: '未出货',
          quantity: 323,
          amount: 12344
        }
      ]
    },
    {
      id: '1-3',
      name: 'PCBA DDR4,16GB 指标2',
      type: 'zb',
      data: [
        {
          name: '出货',
          quantity: 223,
          amount: 12344
        },
        {
          name: '未出货',
          quantity: 323,
          amount: 12344
        }
      ]
    }
  ],
  edges: [
    {
      source: {
        cell: '1-0',
        port: 'right'
      },
      target: {
        cell: '0',
        port: 'left'
      }
    },
    {
      source: {
        cell: '1-0',
        port: 'bottom'
      },
      target: {
        cell: '-1-0-zb-1',
        port: 'left'
      }
    },
    {
      source: {
        cell: '-2-0',
        port: 'right'
      },
      target: {
        cell: '0',
        port: 'left'
      }
    },
    {
      source: {
        cell: '0',
        port: 'right'
      },
      target: {
        cell: '0-1',
        port: 'left'
      }
    },
    {
      source: {
        cell: '0-1',
        port: 'right'
      },
      target: {
        cell: '0-1-1',
        port: 'left'
      }
    },
    {
      source: {
        cell: '0',
        port: 'bottom'
      },
      target: {
        cell: '0-2',
        port: 'left'
      }
    },
    {
      source: {
        cell: '0',
        port: 'bottom'
      },
      target: {
        cell: '0-2',
        port: 'left'
      }
    },
    {
      source: {
        cell: '1-1',
        port: 'right'
      },
      target: {
        cell: '0-1-1',
        port: 'left'
      }
    },
    {
      source: {
        cell: '1-0',
        port: 'right'
      },
      target: {
        cell: '1',
        port: 'left'
      }
    },
    {
      source: {
        cell: '1',
        port: 'right'
      },
      target: {
        cell: '1-1',
        port: 'left'
      }
    },
    {
      source: {
        cell: '1',
        port: 'bottom'
      },
      target: {
        cell: '1-2',
        port: 'left'
      }
    },
    {
      source: {
        cell: '1',
        port: 'bottom'
      },
      target: {
        cell: '1-3',
        port: 'left'
      }
    }
  ]
}

export const data2 = {
  nodes: [
    {
      id: '1',
      label: '事业部',
      name: '事业部'
    },
    {
      id: '2',
      label: 'SSD',
      name: 'SSD'
    },
    {
      id: '3',
      label: 'DRAM',
      name: 'DRAM'
    },
    {
      id: '4',
      label: 'FLASH',
      name: 'FLASH'
    },
    {
      id: '5',
      label: 'USB',
      name: 'USB'
    },
    {
      id: '6',
      label: 'USB2',
      name: 'USB2'
    },
    {
      id: '7',
      label: 'USB3',
      name: 'USB3'
    },
    {
      id: '8',
      label: 'USB4',
      name: 'USB4'
    },
    {
      id: '9',
      label: 'USB5',
      name: 'USB5'
    },
    {
      id: '10',
      label: 'USB5容量',
      name: 'USB5容量'
    },
    {
      id: '11',
      label: 'USB5等级',
      name: 'USB5等级'
    },
    {
      id: '12',
      label: 'USB4容量',
      name: 'USB4容量'
    },
    {
      id: '13',
      label: 'USB4等级',
      name: 'USB4等级'
    }
  ],
  edges: [
    {
      source: '1',
      target: '2'
    },
    {
      source: '1',
      target: '3'
    },
    {
      source: '1',
      target: '4'
    },
    {
      source: '1',
      target: '5'
    },
    {
      source: '1',
      target: '6'
    },
    {
      source: '1',
      target: '7'
    },
    {
      source: '1',
      target: '8'
    },
    {
      source: '1',
      target: '9'
    },
    {
      source: '9',
      target: '10'
    },
    {
      source: '9',
      target: '11'
    },
    {
      source: '8',
      target: '12'
    },
    {
      source: '8',
      target: '13'
    }
  ]
}
