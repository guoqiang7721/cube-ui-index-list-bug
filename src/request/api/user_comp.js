/**
 * user接口列表
 */
import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
import qs from 'qs'
const user = {
  // 清除session
  delSessionAndToken(params) {
    return axios.get(`${base.xcx}/newVisitor/delSessionAndToken`, {
      params: params
    })
  },
  // 名片夹列表
  getNameCard(params) {
    return axios.get(`${base.xcx}/memberCard/getMyCard`, { params: params })
  },
  // 访客数据曝光量 点赞数
  getSummary(params) {
    return axios.get(`${base.h5_s}/statistic/getSummary`, { params: params })
  },
  // 访客数据列表页
  getReaders(params) {
    return axios.get(`${base.xcx}/statistic/getReaders`, { params: params })
  },
  // 访客人数显示
  getUcenter(params) {
    return axios.get(`${base.xcx}/user/getUcenter`, { params: params })
  },
  // 获取背景音乐列表
  getAllMusic(params) {
    return axios.get(`${base.xcx}/memberMusic/getAllMusicByBid`, {
      params: params
    })
  },
  // 更新背景音乐列表
  updateMusic(params) {
    return axios.get(`${base.xcx}/memberMusic/updateMusic`, { params: params })
  },
  // 头条switch设置
  setHideNews(params) {
    return axios.get(`${base.xcx}/user/setHideNews`, { params: params })
  },
  // 云店switch设置
  setHideShop(params) {
    return axios.get(`${base.xcx}/user/setHideShop`, { params: params })
  },
  // 图片管理info
  getMyPhoto(params) {
    return axios.get(`${base.xcx}/memberPhoto/getMyPhoto`, { params: params })
  },
  // 是否使用默认图片
  setUseDefault(params) {
    return axios.get(`${base.xcx}/memberPhoto/setUseDefault`, {
      params: params
    })
  },
  // 图片管理页面上传图片
  addPhoto(params) {
    return axios.post(`${base.xcx}/photo/addPhoto`, qs.stringify(params))
  },
  // 图片管理置顶图片
  topPhoto(params) {
    return axios.get(`${base.xcx}/memberPhoto/topPhoto`, { params: params })
  },
  // 图片管理删除图片
  deletePhoto(params) {
    return axios.get(`${base.xcx}/memberPhoto/deletePhoto`, { params: params })
  },
  // 获取服务信息
  getSales(params) {
    return axios.get(`${base.xcx}/user/getSales`, { params: params })
  },
  // 人脉隐私switch设置
  changePrivacyStatus(params) {
    return axios.post(
      `${base.xcx}/newPrivacy/changePrivacyStatus`,
      qs.stringify(params)
    )
  },
  // 人脉隐私市集设置
  changeIsclose(params) {
    return axios.post(
      `${base.xcx}/newPrivacy/changeIsclose`,
      qs.stringify(params)
    )
  },
  // 4G电话
  isFourG(params) {
    return axios.get(`${base.h5_s}/visitor/isFourG`, { params: params })
  },
  // 判断是否授权家园网或者保险
  isAuthJywOrBx(params) {
    return axios.get(`${base.xcx}/NewVisitor/isAuthJywOrBx`, { params: params })
  },
  // 不再弹出客服分配弹窗
  saveFirstvip(params) {
    return axios.get(`${base.xcx}/user/saveFirstvip`, { params: params })
  },
  // 更新日间模式夜间模式
  updateTheme(params) {
    return axios.get(`${base.xcx}/NewVisitor/updateTheme`, {
      params: params
    })
  },
  // 点赞更新数量
  updateUps(params) {
    return axios.get(`${base.xcx}/visitor/updateUps`, {
      params: params
    })
  },
  // 收藏更新数量
  updateLikes(params) {
    return axios.get(`${base.xcx}/visitor/updateLikes`, {
      params: params
    })
  }
}

export default user
