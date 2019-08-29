import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const promote = {
  // 获取个人推广中心信息
  getPro (params) {
    return axios.get(`${base.h5_s}/user/getPro`, { params: params })
  },
  // 修改银行卡
  updateBankCard (params) {
    return axios.get(`${base.xcx}/bankCard/updateBankCard`, { params: params })
  },
  // 添加银行卡
  addBankCard (params) {
    return axios.get(`${base.xcx}/bankCard/addBankCard`, { params: params })
  },
  // 获取推荐人数
  getTempMembers (params) {
    return axios.get(`${base.h5_s}/promotion/getTempMembers`, { params: params })
  },
  // 获取已开通人数
  getOpenedMembers (params) {
    return axios.get(`${base.h5_s}/promotion/getOpenedMembers`, { params: params })
  },
  // 提现
  withdraw (params) {
    return axios.get(`${base.xcx}/wallet/withdraw`, { params: params })
  }
}
export default promote
