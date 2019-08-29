import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const webImInfo = {
  // 获取自己的聊天信息
  getUserSig (params) {
    return axios.get(`${base.xcx}/tls/getUserSig`, { params: params })
  },
  // 获取聊天列表
  formatMsgs (params) {
    return axios.get(`${base.xcx}/im/formatMsgs`, { params: params })
  },
  // 新增聊天人聊天
  getProfilePortrait (params) {
    return axios.get(`${base.xcx}/visitor/getProfilePortrait`, { params: params })
  },
  /// im/informUnread
  informUnread (params) {
    return axios.get(`${base.xcx}/im/informUnread`, { params: params })
  },
  /// tls/getIdentifier
  getIdentifier (params) {
    return axios.get(`${base.xcx}/tls/getIdentifier`, { params: params })
  },
  /// visitor/getUserInfo
  getUserInfo (params) {
    return axios.get(`${base.xcx}/visitor/getUserInfo`, { params: params })
  }
}
export default webImInfo
