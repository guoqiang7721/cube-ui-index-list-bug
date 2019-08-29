/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router'
import store from '../store'
import storage from 'storejs'
import base from 'request/api/base'
// import { parseQuery } from 'common/js/util'
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  store.commit('LOGOUT_TOKEN')
  const url = encodeURIComponent(location.href)
  location.href = `${base.h5_news}/NewWeixin/isLogin?redirect_url=${url}`
  // router.push({
  //   path: router.currentRoute.fullPath
  // // query: {
  // //   redirect: router.currentRoute.fullPath
  // // }
  // })
  // return false
}
// token存在且跳转到未允许权限访问的页面
const toLoginHasToken = () => {
  router.currentRoute.path !== '/login/create_card' &&
  router.push({
    path: '/login/create_card'
  })
}
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 })
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const status = response.data.status
    if (status === 401) {
      storage.remove('reloadHome')
      storage.remove('reloadNews')
      storage.remove('reloadShop')
      toLogin()
    } else if (status === 402) {
      toLoginHasToken()
    }
    return response
  },
  // 请求成功
  // res => res.data.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // res => res.data.errCode === 0 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    // res.status !==200的情况下
    console.log('---instance --- error', error)
  })
export default instance
