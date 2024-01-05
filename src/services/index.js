import request from '@/utils/request.js'

export default {
  getByDictType(data) {
    return request({
      url: '/da/dict/getByDictType',
      method: 'get',
      data
    })
  }
}
