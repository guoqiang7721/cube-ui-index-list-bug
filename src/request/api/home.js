/**
 * 首页接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const homeApi = {
  // 首页个人信息
  getHome(params) {
    return axios.get(`${base.xcx}/home/getHome`, { params: params })
  },
  newGetHome(params) {
    return axios.get(`${base.xcx}/NewVisitor/newGetHome`, { params: params })
  },
  // 获取新闻页
  getTopNews(params) {
    return axios.get(`${base.xcx}/news/getTopNews`, { params: params })
  },
  // 获取banner图
  getBanner(params) {
    return axios.get(`${base.xcx}/brand/getBanner`, { params: params })
  },
  // 回传名片
  sendCard(params) {
    return axios.get(`${base.xcx}/visitor/sendCard`, { params: params })
  },
  // 判断是否授权
  isSubscribe(params) {
    return axios.get(`${base.h5}/visitor/isSubscribe`, { params: params })
  },
  // 获取他人信息
  getOtherInfo(params) {
    return axios.get(`${base.h5}/NewWeixinInfo/getOtherInfo`, {
      params: params
    })
  },
  // 获取客户追踪来源
  getViewCode(params) {
    return axios.get(`${base.h5}/NewWeixinInfo/getViewCode`, { params: params })
  },
  getUViewCode(params) {
    return axios.get(`${base.h5}/NewWeixinInfo/getUViewCode`, {
      params: params
    })
  },
  newVistor(params) {
    return axios.get(`/easymock/query`, {
      params: params
    })
  },
  getVistor(params) {
    return axios.get(`/easymock/get/vistor`, {
      params: params
    })
  }
}
export default homeApi
