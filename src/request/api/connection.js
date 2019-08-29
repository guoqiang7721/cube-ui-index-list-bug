import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
const ConnectionApi = {
  // 人脉 我的好友显示数量
  newGetCardCnt(params) {
    // return axios.get(`${base.xcx}/MemberCard/getCardCnt`, { params: params })
    return axios.get(`${base.xcx}/NewVisitor/newGetCardCnt`, {
      params: params
    })
  },
  // 人脉市集列表
  fairTab(params) {
    return axios.get(`${base.xcx}/connection/getConnection`, {
      params: params
    })
  },
  // 搜索人脉
  search(params) {
    return axios.get(`${base.xcx}/connection/search`, {
      params: params
    })
  },
  // 修正访客未读数据
  checkReaderData(params) {
    return axios.get(`${base.xcx}/statistic/checkReaderData`, {
      params: params
    })
  },
  // 获取ai最后一条 时间 描述
  getLastTraceLog(params) {
    return axios.get(`${base.xcx}/trace/getLastTraceLog`, {
      params: params
    })
  },
  // ai列表详情
  getTrace(params) {
    return axios.get(`${base.xcx}/trace/getTrace`, {
      params: params
    })
  },
  // 获取人脉轮播图
  getFamous(params) {
    return axios.get(`${base.xcx}/connection/getFamous`, {
      params: params
    })
  },
  // 添加人脉
  add(params) {
    return axios.get(`${base.xcx}/connection/add`, {
      params: params
    })
  },
  // 取消添加人脉
  remove(params) {
    return axios.get(`${base.xcx}/connection/remove`, {
      params: params
    })
  },
  // 通知对方添加人脉
  addTrace(params) {
    return axios.get(`${base.xcx}/trace/addTrace`, {
      params: params
    })
  },
  // 人脉搜索新增用户
  getNew(params) {
    return axios.get(`${base.xcx}/user/getNew`, {
      params: params
    })
  },
  // 获取自己到大咖的距离
  getLoction(params) {
    return axios.get(`${base.xcx}/lbs/update`, {
      params: params
    })
  },
  // 获取附近的人
  getNear(params) {
    return axios.get(`${base.xcx}/lbs/getNear`, {
      params: params
    })
  },
  // 点击查看附近的人次数
  nearAdd(params) {
    return axios.get(`${base.xcx}/connection/canAdd`, {
      params: params
    })
  },
  // 添加查看次数
  addTrace(params) {
    return axios.get(`${base.xcx}/trace/addTrace`, {
      params: params
    })
  }
}
export default ConnectionApi
