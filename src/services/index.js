/*
 * @Description:
 * @Date: 2023-12-01 16:35:32
 * @LastEditTime: 2024-01-18 13:33:50
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\services\index.js
 */
import request from '@/utils/request.js'

export { default as dataViewApi } from './dataView.api.js'
export { default as processApi } from './process.api.js'
export { default as commonApi } from './common.api.js'

export default {
  getByDictType(data) {
    return request({
      url: '/da/dict/getByDictType',
      method: 'get',
      data
    })
  },

  getDataFields(data) {
    return request({
      url: '/dea/data/api/getDataFields',
      method: 'get',
      data
    })
  },
}
