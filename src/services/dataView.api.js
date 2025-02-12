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
          '77e89faed1395653669ed0b3466bf0b1363fa3c1184a02551b873eeb8d31fcd75805f981a98b352889660a5a552814e628b09a29d6b7d85b202808fc1988ec1213645b35180d77c0b32e61cad5421bfae782064b857affd4760665f8aa6637c8cfa9bc3edbe4c92843815ce6ff100d4bd7824a2be7f52b8aee3277596835d5a7',
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
