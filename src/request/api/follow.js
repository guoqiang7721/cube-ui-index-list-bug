import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const followApi = {
  // 人脉追踪显示数量
  getViewTotal(params) {
    return axios.get(`${base.xcx}/follow/getViewTotal`, { params: params })
  },
  // 获取查看人数
  getAnalysis(params) {
    return axios.get(`${base.xcx}/follow/getAnalysis`, { params: params })
  },
  // 获取人脉追踪列表
  getList(params) {
    return axios.get(`${base.xcx}/follow/getList`, { params: params })
  },
  // 人脉追踪详情
  getClue(params) {
    return axios.get(`${base.xcx}/follow/getClue`, { params: params })
  },
  // 如何找到
  getChain(params) {
    return axios.get(`${base.xcx}/follow/getChain`, { params: params })
  },
  // 获取历史记录
  getViewLog(params) {
    return axios.get(`${base.xcx}/follow/getViewLog`, { params: params })
  },
  // 获取是否显示弹窗
  copyPopShow(params) {
    return axios.get(`${base.xcx}/Member/setFzzd`, {
      params: params
    })
  }
}
export default followApi
