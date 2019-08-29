import wx from 'weixin-js-sdk'
import base from 'request/api/base'
import axios from 'axios'
import { ISIOS } from 'api/config'
export default function wxHideShare(authUrl, wxJsUrl) {
  const url = ISIOS ? wxJsUrl : authUrl
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
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
        wx.ready(function() {
          wx.hideOptionMenu()
        })
      }
    })
}
