<!--
 * @Description: 网页拍照上传图片
 * @Date: 2024-12-31 14:45:19
 * @LastEditTime: 2025-01-16 15:38:31
 * @FilePath: \jsplumb-test\src\views\others\tailwindcss\camera\index.vue
-->


<template>

  <video ref="videoRef" id="video" autoplay></video>
  <el-button ref="photoRef" @click="handleUploadPhoto">拍照上传</el-button>
  <canvas ref="canvasRef"></canvas>

</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { commonApi } from '@/services'

export default {
  name: 'CameraCom',
  components: {

  },
  props: {
  },
  setup() {
    let context
    const videoRef = ref(null)
    const photoRef = ref(null)
    const canvasRef = ref(null)

    onMounted(() => {
      context  = canvasRef.value.getContext('2d')
      // 请求访问摄像头
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.value.srcObject = stream
        })
        .catch(err => {
          console.error('无法访问摄像头: ', err)
        })
    })
    
    // 拍照上传
    const handleUploadPhoto =  () => {
      // 设置canvas大小与视频一致
      canvasRef.value.width = videoRef.value.videoWidth
      canvasRef.value.height = videoRef.value.videoHeight
      // 在canvas上绘制当前视频帧
      context.drawImage(videoRef.value, 0, 0)
      // 获取图片数据
      const dataUrl = canvasRef.value.toDataURL('image/png')
      console.log(dataUrl) // 可以在控制台查看图片数据
      uploadImage(dataUrl) // 调用上传函数
    }

    function base64ToFile(base64, fileName) {
      let arr = base64.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file  =new File([u8arr], fileName, { type: mime });
      console.log(file)
      return file
    }

    // 上传图片函数
    const uploadImage = async dataUrl => {
      const formData = new FormData()
      formData.append('image', base64ToFile(dataUrl, 'camera.png'))
      // 使用fetch API进行上传
      // await commonApi.uploadCameraImg(formData)
    }

    return {
      videoRef,
      photoRef,
      canvasRef,
      handleUploadPhoto,
    }
  },
}

</script>
<style scoped lang='less'></style>