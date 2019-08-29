import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
import qs from 'qs'
const brand = {
  // 获取品牌列表
  newGetallbrand(params) {
    return axios.get(`${base.xcx}/NewVisitor/newGetallbrand`, {
      params: params
    })
  },
  // 获取品牌搜索
  getBrandByName(params) {
    return axios.get(`${base.xcx}/brand/getBrandByName`, { params: params })
  },
  // 自定义获取行业
  getIndustry(params) {
    return axios.get(`${base.xcx}/newVisitor/getIndustry`, {
      params: params
    })
  },
  // 自定义创建品牌
  createBrand(params) {
    return axios.get(`${base.xcx}/newVisitor/createBrand`, {
      params: params
    })
  },
  // 设置上传logo
  setLogo(params) {
    return axios.post(`${base.xcx}/newVisitor/setLogo`, qs.stringify(params))
  },
  // 设置视频
  setVideo(params) {
    return axios.post(`${base.xcx}/newVisitor/setVideo`, qs.stringify(params))
  },
  // 设置荣誉
  setHonor(params) {
    return axios.post(`${base.xcx}/newVisitor/setHonor`, qs.stringify(params))
  },
  // 获取相关logo
  getRelatedLogo(params) {
    return axios.post(
      `${base.xcx}/newVisitor/getRelatedLogo`,
      qs.stringify(params)
    )
  },
  // 获取相关荣誉
  getRelatedHonor(params) {
    return axios.post(
      `${base.xcx}/newVisitor/getRelatedHonor`,
      qs.stringify(params)
    )
  },
  // 删除品牌
  delBrand(params) {
    return axios.get(`${base.xcx}/newVisitor/delBrand`, {
      params: params
    })
  },
  // 获取品牌状态
  getReviewStatus(params) {
    return axios.get(`${base.xcx}/newVisitor/getReviewStatus`, {
      params: params
    })
  },
  getBrand(params) {
    return axios.get(`/easymock/getBrand`, {
      params: params
    })
  }
}
export default brand
