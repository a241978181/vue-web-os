import axios from 'axios'
import router from './router'
import {
  Message
} from 'element-ui';

// 构建请求对象
const http = axios.create({
  baseURL: 'api/v1/',
  timeout: 1000 * 5,
  headers: {},
})

// 请求拦截器
http.interceptors.request.use(config => {
    // 如果本地存储中有token字段， 就为所有请求加上Authorization请求头
    if (localStorage.token) {
      config.headers["Authorization"] = `Bearer ${localStorage.token}`
    }
    return config;
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  })

// 响应拦截器 —— 统一处理业务码和错误
http.interceptors.response.use(response => {
    const res = response.data
    // 业务码不为 0 时，弹出提示并拒绝
    if (res.code !== 0) {
      Message.warning(res.msg || '请求失败')
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
    // 直接返回 data 层，调用方不需要再 .data.data
    return res.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 如果后端返回没有权限
        case 401:
          // 清除token信息并跳转到登录页面
          localStorage.clear()
          router.replace("/signin");
          break;
      }
      Message.error('网络请求异常：' + (error.response.status || '未知错误'))
    } else {
      Message.error('网络连接失败，请检查网络')
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  })

export default http
