/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../../router'
import store from '../../store'
// import base from 'request/api/base'
// import { popToast } from 'common/js/cubePop'
// console.log(this)
// const popToastObj = {
//   this: this,
//   txt: '请上传正确的图片!',
//   time: 2000
// }
// popToast(popToastObj)
// import { Toast } from 'cube-ui'
// Toast.show()
// console.log(Toast)
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  // Toast({
  //   txt: msg,
  //   time: 10000
  //   // forbidClick: true
  // })
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  store.commit('LOGOUT_TOKEN')
  // console.warn('router.currentRoute', router.currentRoute)
  // alert(router.currentRoute)
  router.currentRoute.path !== '/author' &&
  // router.replace({
  router.push({
    path: '/author',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// token存在且跳转到未允许权限访问的页面
const toLoginHasToken = () => {
  router.push({
    path: '/login/create_card'

  })
}
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  console.log('状态码', status)
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      console.log('4101123')
      toLogin()
      break
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
      // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    case 0:
      console.log('未登录')
      break
    default:
      // console.log(status)
  }
}
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
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token
    // console.log('token', token)
    // token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.error(error))

// 响应拦截器
// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     console.log(response)
//     return response
//   },
// instance.interceptors.response.use(
//   res => res.data.status === 200 ? Promise.resolve(res) : Promise.reject(res),
//   error => {
//     console.log('---instance error---', error)
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           store.commit('LOGOUT_TOKEN')
//           router.currentRoute.path !== '/author' &&
//           // router.replace({
//           router.push({
//             path: '/author',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           })
//       }
//     }
//     return Promise.reject(error.response.data) // 返回接口返回的错误信息
//   })

instance.interceptors.response.use(
  response => {
    // console.log('---instance response.data.status ', response.data.status)
    const status = response.data.status
    if (status === 401) {
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
    // toLogin()
    const { response } = error
    // tip('登录过期，请重新登录')
    console.log('拦截器', response)
    // toLogin()
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false)
    }
  })

export default instance
