import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const Pay = {
  // 获取支付价格列表
  newGetPriceList (params) {
    return axios.get(`${base.xcx}/NewVisitor/newGetPriceList`, { params: params })
  },
  // 通过推广获取的天数
  getGivenDays (params) {
    return axios.get(`${base.xcx}/member/getGivenDays`, { params: params })
  },
  // 创建订单
  createOrder (params) {
    return axios.get(`${base.xcx}/order/createOrder`, { params: params })
  }
}
export default Pay
