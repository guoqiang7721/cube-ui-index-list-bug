import base from 'request/api/base'
import axios from '../../request/http'
import store from '../../store'
import wx from 'weixin-js-sdk'
// 获取gethome接口
export const getHome = function({ token, vid, uid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/home/getHome`, {
        params: {
          token: token,
          vid: vid,
          uid: uid
        }
      })
      .then(response => {
        // console.log('--getHome response--', response)
        const data = response.data.data
        resolve(data)
        store.commit('SET_OUSERINFO', data.userInfo)
      })
  })
}
// 获取uid
export const getUid = function(token, uid) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/NewWeixinInfo/getIds`, {
        params: {
          token: token,
          uid: uid
        }
      })
      .then(response => {
        // console.log('--getUid response--', response)
        const data = response.data.data
        store.commit('SET_IDS', data)
        // store.commit('SET_UID', data.guid)
        resolve(data)
      })
  })
}
// 获取他人信息
export const getOtherInfo = function({ token, vid, uid, bid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/NewWeixinInfo/getOtherInfo`, {
        params: {
          vid: vid,
          token: token,
          uid: uid,
          bid: bid
        }
      })
      .then(response => {
        const ret = response.data
        if (ret && ret.errCode === 0) {
          store.commit('SET_OUSERINFO', ret.data.userInfo)
          resolve(ret.data)
        }
      })
      .catch(err => {
        // alert(`数据加载超时::${err}`)
        reject(err)
      })
  })
}
// 获取banner
export const getBanner = function({ vid, token, uid, bid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/brand/getBanner`, {
        params: {
          vid: vid,
          token: token,
          uid: uid,
          bid: bid
        }
      })
      .then(response => {
        // console.log('--getBanner response--', response)
        const data = response.data.data
        resolve(data)
      })
  })
}
// 添加人脉
export const add = function(token, vid, uid) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/connection/add`, {
        params: {
          token: token,
          vid: vid,
          uid: uid
        }
      })
      .then(response => {
        // console.log('--add--', response)
        const data = response.data
        resolve(data)
      })
  })
}
// 添加人脉
export const addTrace = function(token, vid, uid) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/trace/addTrace`, {
        params: {
          token: token,
          vid: vid,
          uid: uid,
          cate: 12
        }
      })
      .then(response => {
        const data = response.data
        resolve(data)
      })
  })
}
// 取消添加人脉
export const remove = function(token, vid, uid) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/connection/remove`, {
        params: {
          token: token,
          vid: vid,
          uid: uid
        }
      })
      .then(response => {
        const data = response.data
        resolve(data)
      })
  })
}
// 获取客户追踪来源
export const getViewCode = function(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/NewWeixinInfo/getViewCode`, {
        params: {
          token: token
        }
      })
      .then(response => {
        const data = response.data.data
        resolve(data)
      })
  })
}
// 获取客户追踪来源url
export const getUViewCode = function(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/NewWeixinInfo/getUViewCode`, {
        params: {
          token: token
        }
      })
      .then(response => {
        const data = response.data.data
        resolve(data)
      })
  })
}
// 曝光量
export const exposure = function({ token, vid, view, type, nid, fromId } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/NewVisitor/exposure`, {
        params: {
          token: token,
          vid: vid,
          view: view,
          type: type,
          nid: nid,
          from_id: fromId
        }
      })
      .then(response => {
        const data = response.data.data
        resolve(data)
      })
  })
}
// 获取是否关注大咖公众号
export const isSubscribe = function({ token, vid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/NewVisitor/isSubscribe`, {
        params: {
          token: token,
          vid: vid
        }
      })
      .then(response => {
        const ret = response.data
        if (ret && ret.errCode === 0) {
          resolve(ret.data)
        }
      })
  })
}
// 获取是否关注大咖Pro公众号
export const isSubcribePro = function({ token, vid, bid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/NewVisitor/isSubscribePro`, {
        params: {
          vid: vid,
          token: token
        }
      })
      .then(response => {
        const data = response.data.data
        resolve(data)
      })
  })
}

// 判断是否授权pro公众号
export const isAuthDkpro = function({ token, vid, bid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/NewVisitor/isAuthDkpro`, {
        params: {
          token: token
        }
      })
      .then(response => {
        const data = response.data.data
        resolve(data)
      })
  })
}
// 授权获取数据
export const getAuthInfo = function(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/NewWeixinInfo/getAuthInfo`, {
        params: {
          token: token
        }
      })
      .then(response => {
        const data = response.data.data
        const { userInfo } = data
        store.commit('SET_VUSERINFO', userInfo)
        store.commit('SET_VID', userInfo.vid)
        store.commit('SET_BID', userInfo.bid)
        store.commit('SET_MID', userInfo.mid)
        resolve(data)
      })
  })
}
// main5.26.js 授权数据
export const getAuthInfoMain = function(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/NewWeixinInfo/getAuthInfo`, {
        params: {
          token: token
        }
      })
      .then(response => {
        const data = response.data.data
        const { userInfo, token } = data
        store.commit('SET_VUSERINFO', userInfo)
        store.commit('SET_VID', userInfo.vid)
        store.commit('SET_BID', userInfo.bid)
        store.commit('SET_MID', userInfo.mid)
        store.commit('SET_TOKEN', token)
        store.commit('SET_VBRANDINFO', {
          id: userInfo.bid,
          name: userInfo.brand
        })
        resolve(data)
      })
  })
}
// 获取上级信息
export const getProUser = function({ token, vid, bid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/visitor/getProUser`, {
        params: {
          vid: vid,
          token: token,
          bid: bid || 0
        }
      })
      .then(response => {
        const data = response.data.data
        store.commit('SET_PROUSERINFO', data)
        resolve(data)
      })
  })
}
export const deleteToken = function(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/newWeixinInfo/delVid`, {
        params: {
          token: token
        }
      })
      .then(response => {
        const data = response
        resolve(data)
      })
  })
}
// 直通车取消订单
export const cancelApply = function({ token, mid, vid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/vas/cancelApply`, {
        params: {
          token: token,
          mid: mid,
          vid: vid
        }
      })
      .then(response => {
        const data = response
        resolve(data)
      })
  })
}
// 直通车取消订单
export const getSales = function({ token, vid } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.xcx}/user/getSales`, {
        params: {
          token: token,
          vid: vid
        }
      })
      .then(response => {
        const data = response.data.data
        resolve(data)
      })
  })
}
// 获取签名
export const getSign = function(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/Share/getSign`, {
        params: {
          url: url
        }
      })
      .then(res => {
        const errCode = res.data.errCode
        if (errCode === 0) {
          const data = res.data.data
          wx.config({
            debug: true,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
          })
        }
      })
  })
}
// 判断是否关注小程序
export const newGetXcxRole = function(token, vid) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base.h5}/NewWeixinInfo/newGetXcxRole`, {
        params: {
          token: token,
          vid: vid
        }
      })
      .then(response => {
        const data = response.data
        resolve(data)
      })
  })
}
