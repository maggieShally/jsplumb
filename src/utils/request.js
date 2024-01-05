import axios from 'axios'

const request = axios.create({
  baseURL: '', 
  timeout: 1500, // request timeout
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

request.interceptors.request.use(config => {
  if(config.method === 'get') {
    config.params = config.data
  }
  return config
})

request.interceptors.response.use(res => {
  if(res.data.code === 0) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data)
  }
}, e => {
  Promise.reject(e)
})  

export default request