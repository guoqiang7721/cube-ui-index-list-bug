import wx from 'weixin-js-sdk'
import base from 'request/api/base'
import axios from 'axios'
import store from '../../store'
import { ISNODE_ENV, ISIOS } from 'api/config'
export default function wxLocation({ isFrom } = {}) {
  var _this = this
  const url = ISIOS ? store.state.wxJsUrl : location.href
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
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['getLocation']
        })
        wx.ready(() => {
          wx.checkJsApi({
            jsApiList: ['getLocation'],
            success() {
              ISNODE_ENV === 'development'
                ? devLocation(_this, isFrom)
                : proLocation(_this, isFrom)
            }
          })
          wx.error(function(res) {
            // alert('接口调取失败')
          })
        })
        wx.error(res => {})
      }
    })
}
// 测试环境地理位置
function devLocation(_this, isFrom) {
  _this.latitude = '31.56597' // 纬度，浮点数，范围为90 ~ -90
  _this.longitude = '120.30297' // 经度，浮点数，范围为180 ~ -180。
  // 来源
  if (isFrom === 'nearby') {
    _this.updateLocation()
    _this.mescroll.lockDownScroll(true)
    _this.mescrollUp.page.num = 1
    _this.getNear()
    _this.mescrollUp.callback = _this.getNear
  }
}
// 正式环境地理位置
function proLocation(_this, isFrom) {
  wx.getLocation({
    success: function(res) {
      console.warn('res', res)
      console.log(isFrom)
      _this.latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
      _this.longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
      // 来源
      if (isFrom === 'nearby') {
        _this.updateLocation()
        // _this.mescroll.lockDownScroll(true)
        _this.mescrollUp.page.num = 1
        console.warn(_this.getNear())
        _this.mescrollUp.callback = _this.getNear
      }
    },
    cancel: function(res) {
      alert('用户拒绝授权获取地理位置')
    }
  })
}
