/*
 * @Description:
 * @Date: 2022-07-12 10:50:47
 * @LastEditTime: 2022-07-21 18:20:38
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
      name: 'CBG'
    },
    {
      id: '2',
      name: 'CCARD'
    }, {
      id: '2-1',
      name: 'FSSD'
    }, {
      id: '2-2',
      name: 'CARD'
    }, {
      id: '2-3',
      name: 'CINDUSTRIALARD'
    },
    {
      id: '3',
      name: 'Lexar'
    },{
      id: '3-1',
      name: 'FORESEE'
    },
    {
      id: '4',
      name: 'G1'
    },
    {
      id: '5',
      name: 'S2'
    }, {
      id: '5-1',
      name: 'S2'
    },
    {
      id: '6',
      name: 'SD4.0'
    },
    {
      id: '7',
      name: 'MICRO',
      value: '3'
    },
    {
      id: '8',
      name: '1667x'
    },
    {
      id: '9',
      name: '633x'
    },
    {
      id: '10',
      name: '消费类'
    },
    {
      id: '11',
      name: 'NA'
    },
    {
      id: '12',
      name: '128GB'
    },
    {
      id: '13',
      name: '64GB'
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
