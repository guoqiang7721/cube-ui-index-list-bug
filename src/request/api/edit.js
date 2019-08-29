import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
import qs from 'qs'
const Edit = {
  // 更新个人信息
  updateUserInfo(params) {
    return axios.get(`${base.xcx}/visitor/updateUserInfo`, { params: params })
  },
  // 设置推广签名
  setAdSign(params) {
    return axios.get(`${base.xcx}/user/setAdSign`, { params: params })
  },
  // 设置群名称
  setQRName(params) {
    return axios.get(`${base.xcx}/user/setQRName`, { params: params })
  },
  // 设置群二维码
  updateQRInfo(params) {
    return axios.get(`${base.xcx}/NewVisitor/updateQRInfo`, { params: params })
  },
  // 设置推广二维码
  updateAdInfo(params) {
    return axios.get(`${base.xcx}/NewVisitor/updateAdInfo`, { params: params })
  },
  // 上传头像
  upload(params) {
    return axios.post(`${base.xcx}/photo/upload`, qs.stringify(params))
  },
  // 上传推广二维码
  setAdPhoto(params) {
    return axios.post(`${base.xcx}/photo/setAdPhoto`, qs.stringify(params))
  },
  // // 上传群二维码
  // uploadQRCode (params) {
  //   return axios.post(`${base.xcx}/photo/uploadQRCode`, qs.stringify(params))
  // },
  /// / 上传群二维码
  setQrPhoto(params) {
    return axios.post(`${base.xcx}/photo/setQrPhoto`, qs.stringify(params))
  }
}
export default Edit
