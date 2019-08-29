import wx from 'weixin-js-sdk'
import base from 'request/api/base'
import axios from 'axios'
import store from '../../store'
import { ISIOS } from 'api/config'
import WxAudio from 'common/js/wx-audio/wx-audio'
let isAudio
export default function wxShare({
  title,
  desc,
  imgUrl,
  shareUrl,
  article
} = {}) {
  var _this = this
  // console.warn('wxShare shareUrl', shareUrl)
  // console.warn('wxShare store.state.wxJsUrl', store.state.wxJsUrl)
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
          jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'getLocation'
          ]
        })
        wx.ready(() => {
          wx.showOptionMenu()
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success() {
              const roleId = _this.vUserInfo.roleId
              if (roleId === '1') {
                _this.isDialogComSelf = false // 去掉之前会员开通弹窗
                if (article === 'homeShare') {
                  _this._showPopisSelfHomeShare()
                } else if (article === 'newsShare') {
                  _this._showPopisSelfNewsShare()
                }
              }
            }
          })
          if (ISIOS) {
            if (article === 'homeShare') {
              // console.warn(_this.oUserInfo)
              _this._getMusicPlay()
            }
          }
          // 文章页面 音乐播放
          if (article === 'newsShare') {
            if (_this.htmlData.vido_type === '3') {
              // let audio = document.getElementById('audio')
              // audio.src = _this.htmlData.vcode
              // audio.play()
              // _this.isRotate = true
              const audioData = this.htmlData.vcode
              isAudio = new WxAudio({
                ele: '#textaudio1',
                title: '',
                disc: '',
                src: audioData,
                width: '375px',
                loop: true,
                ended: function() {}
              })
              isAudio.audioPlay()
              _this.isRotate = true
            }
            if (_this.htmlData.audio) {
              let audio = document.getElementById('audio')
              audio.src = _this.htmlData.audio[0]
              audio.play()
              _this.isRotate = true
            }
          }
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success() {
              // console.log('---this---', _this)
            }
          })
        })
        wx.error(res => {})
      }
    })
}
// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
// Vue.prototype.$wxShare = wxShare
