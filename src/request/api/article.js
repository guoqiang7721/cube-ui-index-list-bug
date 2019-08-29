/**
 * article模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const article = {
  // 新闻首页Tab栏
  getCates(params) {
    return axios.get(`${base.xcx}/news/getCates`, { params: params })
  },
  // 获取列表页面
  getNewsList(params) {
    return axios.get(`${base.xcx}/news/getNewsList`, { params: params })
  },
  // 获取文章详情
  getNews(params) {
    return axios.get(`${base.xcx}/news/getNews`, { params: params })
  },
  // 文章热门分享
  // getRealted (params) {
  //   return axios.get(`${base.xcx}/News/getRealted`, { params: params })
  // },
  // 文章热门分享
  getRealted(params) {
    return axios.get(`${base.xcx}/newVisitor/getRealted`, { params: params })
  },
  // 文章点赞
  ups(params) {
    return axios.get(`${base.h5}/share/ups`, { params: params })
  },
  // 获取默认品牌二维码
  getErImages(params) {
    return axios.get(`${base.h5}/Marketing/getErImages`, { params: params })
  },
  // 是否关注公众号(存在跨域)
  isSubscribe(params) {
    return axios.get(`${base.xcx}/NewVisitor/isSubscribe`, { params: params })
  },
  // 查看别人名片 (推送)
  visitor(params) {
    return axios.get(`${base.xcx}/visitor/visitor`, { params: params })
  },
  /** 文章列表页 新修改 */

  // 获取头部tab
  newGetCids(params) {
    return axios.get(`${base.xcx}/newVisitor/newGetCids`, { params: params })
  },
  // 如 getCids返回null 请求
  getDefaultCids(params) {
    return axios.get(
      `${base.api_x}/newsV3/getDefaultCids?appid=3&industryid=1`,
      { params: params }
    )
  },
  // 获取头部
  getTyCids(params) {
    return axios.get(
      `${base.api_x}/newsV3/getTyCids?mode=1&appid=3&industryid=1`,
      { params: params }
    )
  },
  // 获取所有类别
  getAllCids(params) {
    return axios.get(
      `${base.api_x}/newsV3/getAllCids?mode=1&appid=3&industryid=1`,
      { params: params }
    )
  },
  setCids(params) {
    return axios.get(`${base.h5_s}/member/setCids`, { params: params })
  },
  // 确定选中
  newSetCids(params) {
    return axios.get(`${base.xcx}/newVisitor/newSetCids`, { params: params })
  },
  // 获取上一首下一首
  getNext(params) {
    // return axios.get(`https://wmpv3.bkbbx.cn/api/news/getNext`, {
    return axios.get(`${base.api_x}/newsV3/next?appid=3&industryid=1`, {
      params: params
    })
  }
}

export default article
