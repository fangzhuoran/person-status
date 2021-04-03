// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
// import { config } from '@vue/test-utils'
import axios from 'axios'
import router from '@/router'
import { Promise } from 'core-js'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 999999999 // 定义超时时间
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
}) // 创建一个axios的实例

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 只有在有token的情况下 才有必要去检查时间戳是否超时
      if (IsCheckTimeOut()) {
        // 如果它为true表示 过期了
        // token没用了 因为超时了
        store.dispatch('user/logout') // 登出操作
        // 跳转到登录页
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // !这里必须要返回config
  },
  error => {
    return Promise.reject(error)
  }
)
// 请求拦截器

service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // !业务逻辑错了，才会走这一步
      Message.error(message)
      return Message.error(new Error(message))
    }
  },
  error => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      // !如果是200错误状态码意外的错误，要求返回这一段，后面的请求的catch，才会收到错误信息
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
