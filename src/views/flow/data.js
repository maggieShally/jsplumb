/*
 * @Description: 
 * @Date: 2021-05-10 10:03:18
 * @LastEditTime: 2022-03-28 09:21:24
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\flow\data.js
 */
/**
 * @description: 
 * @param {*}
 * @return {*}
 */



export const getDataA = function() {
  return {
    nodeList: [
      {
        id: "nodeA",
        name: "流程A-节点A",
        type: "task",
        left: "26px",
        top: "161px",
        ico: "el-icon-user-solid",
        viewOnly: true,
      },
      {
        id: "nodeB",
        name: "流程A-节点B",
        type: "task",
        left: "340px",
        top: "161px",
        ico: "el-icon-goods",
      },
      {
        id: "nodeC",
        name: "流程A-节点C",
        type: "task",
        left: "739px",
        top: "161px",
        ico: "el-icon-present",
      },
    ],
    lineList: [
      {
        from: "nodeA",
        to: "nodeB",
      },
    ],
  }
}