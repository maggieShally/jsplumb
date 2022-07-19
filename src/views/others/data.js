/*
 * @Description: 
 * @Date: 2022-07-04 10:16:55
 * @LastEditTime: 2022-07-04 14:15:28
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\data.js
 */
const node =  [
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
]