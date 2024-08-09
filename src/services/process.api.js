/*
 * @Description: 
 * @Date: 2024-06-28 11:14:38
 * @LastEditTime: 2024-08-07 13:45:20
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\services\process.api.js
 */
import request from '@/utils/request.js'

export default {

  // 资源简称列表
  getShortNameList(data) {
    return request({
      url: '/dpr/resource/dict/getShortName',
      method: 'post',
      data
    })
  },

  // 获取PN 列表
  getPnListByShowName(data) {
    return request({
      url: '/bub/high/getPNListByResName',
      method: 'post',
      data
    })
  },

  /**
   * @description: 获取过程数据
   * @return {*}
   */
  getProcessConfig() {
    return request({
      url: '/bub/roadMap/getProcessConfig',
    })
  },

  /**
   * @description: 获取主视图节点数据
   * @return {*}
   */  
  getProcessNodeList(data) {
    return request({
      url: '/bub/roadMap/getRoadMap',
      method: 'post',
      data
      // : {
      //   userId: 'maggie.hu',
      //   itemNumList: ['ZJC0007X3314'],
      //   isExpand: 0,
      //   resNameList: [],
      //   pnList: [],
      // },
    })
  },


  // 获取分离路径 节点数据
  getDisjointPathNodeList(data) {
    return request({
      url: '/bub/roadMap/getRoadCost',
      method: 'post',
      data
    })
  },
}
