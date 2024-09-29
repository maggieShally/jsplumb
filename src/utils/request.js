import axios from 'axios'

const getPendingKey = config => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

const controllerMap = new Map()

const addPending = config => {
  const controller = new AbortController()
  config.isSignal = controller.signal

  const controllerKey = getPendingKey(config)

  if (controllerMap.has(controllerKey)) {
    controllerMap.get(controllerKey).abort()
    controllerMap.delete(controllerKey)
  } else {
    controllerMap.set(controllerKey, controller)
  }
}

const request = axios.create({
  baseURL: '',
  timeout: 1500, // request timeout
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

request.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = config.data
  }
  addPending(config)
  return config
})

request.interceptors.response.use(
  res => {
    if (res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  e => {
    Promise.reject(e)
  }
)

export default request
