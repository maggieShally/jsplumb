/*
 * @Description: 
 * @Date: 2024-04-29 14:16:33
 * @LastEditTime: 2024-06-18 15:14:10
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\services\dataView.api.js
 */
import request from '@/utils/request.js'

export default {
  userLogin() {
    return request({
      url: '/dl/login',
      method: 'post',
      data: {
        userName: 'maggie.hu',
        password:
          '63b442c9fba8143e9a5f88049c08717387c19f9847825cbdb50efc806a6aab4141eb447e50182491399590741477f2b9da1310c2596d761fc1967701f2242188e0743cba90c054bd5a2a82c5c6ad17129728db9e6cb38e5239b78bc7c06dde925ab259ed05d3ebd9b020f06d0097c55e2583cc6ca3ea1b43e28fba7fe568c0f5',
      },
    })
  },
  getDataFields(data) {
    return request({
      url: '/dea/data/api/getDataFields',
      method: 'post',
      data,
    })
  },

  // 查视图数据
  getViewData(data) {
    return request({
      url: '/dea/view/v2/query',
      method: 'post',
      data,
    })
  },

   // 获取uuid
   getUuid() {
    return request({
      url: '/dea/common/getId',
    })
  },

   // 查询数据集 自定义字段  校验
   checkColumnCustomRule(data) {
    return request({
      url: '/dea/dataSetSql/checkColumnCustomRule',
      method: 'post',
      data,
      disableMessageAlert: true,
    })
  },
}
