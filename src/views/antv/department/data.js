/*
 * @Description: 
 * @Date: 2022-07-12 10:50:47
 * @LastEditTime: 2022-07-13 18:24:27
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\department\data.js
 */
 export const initData = {

  nodes: [
    {
      id: '1',
      name: '事业部-2',
      value: '1'
    },{
      id: '2',
      name: 'SSD-5',
      
      value: '5'
    },{
      id: '3',
      name: 'DRAM-2',
      
      value: '2'
    },{
      id: '4',
      name: 'FLASH-3',
      value: '3'
    },{
      id: '5',
      name: 'USB'
    },{
      id: '6',
      name: 'USB2'
    },{
      id: '7',
      name: 'USB3'
    },{
      id: '8',
      name: 'USB4'
    },{
      id: '9',
      name: 'USB5'
    },{
      id: '10',
      name: 'USB5容量'
    },{
      id: '11',
      name: 'USB5等级'
    },{
      id: '12',
      name: 'USB4容量'
    },{
      id: '13',
      name: 'USB4等级'
    },
  ],
  edges: [
    {
      source: '1',
      target: '2'
    },{
      source: '1',
      target: '3'
    },{
      source: '1',
      target: '4'
    },{
      source: '1',
      target: '5'
    },{
      source: '1',
      target: '6'
    },{
      source: '1',
      target: '7'
    },{
      source: '1',
      target: '8'
    },{
      source: '1',
      target: '9'
    },{
      source: '9',
      target: '10'
    },{
      source: '9',
      target: '11'
    },{
      source: '8',
      target: '12'
    },{
      source: '8',
      target: '13'
    }
  ]
 }