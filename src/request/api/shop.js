import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const Shop = {
  // 获取Tab list
  getShopTab (params) {
    return axios.get(`${base.xcx}/brand/shop`, { params: params })
  },
  // 获取商品
  getGoods (params) {
    return axios.get(`${base.xcx}/brand/getGoods`, { params: params })
  },
  // 指定商品详情
  getGood (params) {
    return axios.get(`${base.xcx}/brand/getGood`, { params: params })
  }
}
export default Shop
