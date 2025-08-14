/*
 * @Description: 
 * @Date: 2024-04-29 14:16:33
 * @LastEditTime: 2024-12-09 11:30:35
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
          '353cebcfebae7556de408dbbead098dc080d63dc6038f049494370b8d304ebe1c9fe4fcc1fe98fd95a018382d3271ee08a8ae6e071c21a186f9c4094f8f3c88bf210611680d54a6cd5969f8fb4228dcbcc6070972f765803bfb1a21816135beed76ca1e1c892f84827d7bc64adf9a8fc5f2df2eabeb81a79b3a39da5f622cf16',
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

  // 获取视图配置
  getViewConfigById(data) {
    return request({
      url: '/dea/view/findById',
      method: 'get',
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

  // 查询 面板配置
  getPanelConfig(data) {
    return request({
      url: '/dea/panel/v2/query',
      method: 'get',
      data,
    })
  }
}
