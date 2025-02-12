

import request from '@/utils/request.js'

export default {

  // 上传拍照图片
  uploadCameraImg(data) {
    return request({
      url: '/docr/ocr/recognize',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
   )
  },


}
