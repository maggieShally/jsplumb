/*
 * @Description:
 * @Date: 2022-03-22 16:09:20
 * @LastEditTime: 2022-03-23 15:21:22
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Panel\data.js
 */
export const initData = {
  nodes: [
    {
      id: '0',
      name: 'PCBA DDR4,8GB',
      type: 'node'
    },
    {
      id: '-1-0',
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
      type: 'next',
      isLeaf: true
    },
    {
      id: '0-zb-1',
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
      id: '1',
      name: 'PCBA DDR4,16GB',
      type: 'node'
    },
    {
      id: '1-1',
      name: 'SO-DIMM DDR4 16GB 下游1',
      type: 'next',
      isLeaf: true
    },
    {
      id: '1-zb-1',
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
      id: '1-zb-2',
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
        cell: '-1-0',
        port: 'right'
      },
      target: {
        cell: '0',
        port: 'left'
      }
    },
    {
      source: {
        cell: '-1-0',
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
        cell: '0',
        port: 'bottom'
      },
      target: {
        cell: '0-zb-1',
        port: 'left'
      }
    },


    {
      source: {
        cell: '-1-0',
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
        cell: '1-zb-1',
        port: 'left'
      }
    },
    {
      source: {
        cell: '1',
        port: 'bottom'
      },
      target: {
        cell: '1-zb-2',
        port: 'left'
      }
    }
  ]
}
