import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const login = {
  // 获取个人信息
  getLoginInfo() {
    return axios.get(`${base.h5}/visitor/getLoginInfo`)
  },
  // 获取上级信息
  getProUser(params) {
    return axios.get(`${base.xcx}/visitor/getProUser`, { params: params })
  },
  // 获取验证码
  sendCommonVerifyCode(params) {
    return axios.get(`${base.xcx}/code/sendCommonVerifyCode`, {
      params: params
    })
  },
  // 创建名片
  create(params) {
    return axios.get(`${base.xcx}/visitor/create`, { params: params })
  },
  // 授权
  getAuthInfo(params) {
    return axios.get(`${base.h5}/NewWeixinInfo/getAuthInfo`, { params: params })
  },
  // 获取uid
  getIds(params) {
    return axios.get(`${base.h5}/NewWeixinInfo/getIds`, { params: params })
  },
  isExpire(params) {
    return axios.get(`${base.h5}/NewWeixinInfo/isExpire`, { params: params })
  }
}
export default login
