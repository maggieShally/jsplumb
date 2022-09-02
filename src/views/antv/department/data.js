/*
 * @Description:
 * @Date: 2022-07-12 10:50:47
 * @LastEditTime: 2022-07-25 09:21:16
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\department\data.js
 */

// 事业部  产品线  产品大类  质量等级  产品型号  产品系列  产品等级  产品容量
// CBG     CCARD     Lexar  G1        SD4.0    1667x    NA      128GB
// CBG  CCARD  Lexar  G1  SD4.0  1667x  消费类  128GB
// CBG  CCARD  Lexar  G1  SD4.0  1667x    128GB
// CBG  CCARD  Lexar  G1  SD4.0  1667x  消费类  64GB
// CBG  CCARD  Lexar  S2  MICRO SD3.0  633x    128GB

// SDG  FSSD  FORESEE  S2  mSATA SSD    S423  256GB
// SDG  FSSD  FORESEE  S2  mSATA SSD    S423  64GB
// SDG  FSSD  FORESEE  S2  mSATA SSD    S423  32GB

// MSG  CARD  WYZE  G1  MICRO SD3.0    工规级  32GB
// ISG  INDUSTRIAL PRODUCT  FORESEE  G1  eMMC    A1  128GB

export const initData = {
  nodes: [
    {
      id: '1',
      name: 'CBG',
      index: 0
    },
    {
      id: '2-1',
      name: 'FSSD-1',
      index: 1
    }, {
      id: '2',
      name: 'CCARD-2',
      index: 2
    }, {
      id: '2-2',
      name: 'CARD',
      index: 3
    }, {
      id: '2-3',
      name: 'CINDUSTRIALARD',
      index: 4
    },
    {
      id: '3',
      name: 'Lexar', index: 5
    },{
      id: '3-1',
      name: 'FORESEE', index: 5
    },
    {
      id: '4',
      name: 'G1', index: 5
    },
    {
      id: '5',
      name: 'S2', index: 5
    }, {
      id: '5-1',
      name: 'S2', index: 5
    },
    {
      id: '6',
      name: 'SD4.0', index: 5
    },
    {
      id: '7',
      name: 'MICRO', index: 5,
      value: '3'
    },
    {
      id: '8',
      name: '1667x', index: 5
    },
    {
      id: '9',
      name: '633x', index: 5
    },
    {
      id: '10',
      name: '消费类', index: 5
    },
    {
      id: '11',
      name: 'NA', index: 5
    },
    {
      id: '12',
      name: '128GB', index: 5
    },
    {
      id: '13',
      name: '64GB', index: 5
    }
  ],
  edges: [
    {
      source: '1',
      target: '2'
    }, {
      source: '1',
      target: '2-1'
    }, {
      source: '1',
      target: '2-2'
    }, {
      source: '1',
      target: '2-3'
    }, {
      source: '2-1',
      target: '3-1'
    },
    {
      source: '2',
      target: '3'
    },
    {
      source: '3',
      target: '4'
    },
    {
      source: '3',
      target: '5'
    }, {
      source: '3-1',
      target: '5-1'
    },
    {
      source: '4',
      target: '6'
    },
    {
      source: '5',
      target: '7'
    },
    {
      source: '6',
      target: '8'
    },
    {
      source: '7',
      target: '9'
    },
    {
      source: '8',
      target: '10'
    },
    {
      source: '8',
      target: '11'
    },
    {
      source: '11',
      target: '12'
    },
    {
      source: '11',
      target: '13'
    }
  ]
}
