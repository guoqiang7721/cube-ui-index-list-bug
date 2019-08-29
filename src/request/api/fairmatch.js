import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const fairMatchApi = {
  // 人脉搜索获取人脉
  getDefault(params) {
    return axios.get(`${base.xcx}/proData/getDefault`, { params: params })
  },
  // 人脉搜索获取推荐人数
  getXCount(params) {
    return axios.get(`${base.xcx}/user/getXCount`, { params: params })
  },
  // 人脉搜索ing
  commend(params) {
    return axios.get(`${base.xcx}/connection/commend2`, { params: params })
  }
}
export default fairMatchApi
