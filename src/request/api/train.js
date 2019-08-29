import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const Train = {
  // 获取直通车滚动text
  getBrief(params) {
    return axios.get(`${base.xcx}/vas/getBrief`, { params: params })
  },
  // 选择城市创建订单
  createApply(params) {
    return axios.get(`${base.xcx}/vas/createApply`, { params: params })
  },
  /// vas/cancelApply
  cancelApply(params) {
    return axios.get(`${base.xcx}/vas/cancelApply`, { params: params })
  },
  // 获取直通车开通城市
  getApply(params) {
    return axios.get(`${base.xcx}/vas/getApply`, { params: params })
  },
  // 获取套餐价格
  getPriceList(params) {
    return axios.get(`${base.xcx}/vas/getPriceList`, { params: params })
  },
  // 创建订单
  createOrder(params) {
    return axios.get(`${base.xcx}/vas/createOrder`, { params: params })
  },
  // 获取支付状态
  getStatus(params) {
    return axios.get(`${base.xcx}/vas/getStatus`, { params: params })
  },
  // 直通车新创建订单
  newCreateApply(params) {
    return axios.get(`${base.xcx}/vas/newCreateApply`, { params: params })
  }
}
export default Train
