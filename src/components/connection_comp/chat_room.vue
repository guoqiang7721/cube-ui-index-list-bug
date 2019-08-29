<template>
  <div>
    <header-com :title="headerTitle" @back="back" />
    <div class="Chat_box">
      <div
        class="Chat-item"
        v-for="item in chatDetailList"
        :key="item.C2cAccount"
      >
        <div :class="[item.self ? 'isself' : 'noself']" @click="_gHome(item)">
          <img class="Chat-item-l" :src="item.upic" v-if="item.upic" alt="" />
          <img
            class="Chat-item-l"
            src="https://zfile.bxwh002.cn/img/common/def_upic.png"
            v-else
            alt=""
          />
          <div class="Chat-item-r">{{ item.elems[0].content.text }}</div>
        </div>
      </div>
    </div>
    <div class="Chat_holder">
      <cube-textarea
        v-model="chatContent"
        :autoExpand="true"
        :placeholder="chatHolder"
      />
      <cube-button class="btn" @click="_sendBtn" :primary="true"
        >发送</cube-button
      >
    </div>
    <loading-text :isLoading="isLoading" />
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import loadingText from 'base/loading/loading_text'
import { popToast } from 'common/js/cubePop'
import base from 'request/api/base'
import { ISIOS } from 'api/config'
var selToID // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var lastMsgTime = 0 // 第一次拉取好友历史消息时，必须传0
var msgKey = ''
var options = {}
var selType // 当前聊天类型
var selSess = null
var getPrePageC2CHistroyMsgInfoMap = {} // 保留下一次拉取好友历史消息的信息
var loginInfo
var listeners
var chatDetail = {}
export default {
  mixins: [vuexData, routings],
  data() {
    return {
      headerTitle: '',
      chatDetailList: [], // 聊天详情
      webimUser: {},
      otherNick: '', // 其他人昵称
      otherUpic: '',
      otherAccount: '', // 其他人账户Id
      chatContent: '',
      chatHolder: '请输入聊天内容...',
      chatId: '',
      newChatList: [],
      isLoading: false
    }
  },
  activated() {
    console.warn('activated', this.isgetUserSig)
    if (this.isgetUserSig) {
      this.getUserSig()
      this.isLoading = true
      this.chatDetailList = []
    }
  },
  mounted() {
    this.getUserSig()
    this.chatDetailList = []
    this.isLoading = true
  },
  methods: {
    // 查看其它人名片
    _gHome(i) {
      console.log(i)
      // console.log(chatDetail)
      // console.log(this.vChatOther)
      const uid = this.chatId ? chatDetail.vid : this.vChatOther.vid
      if (!i.self) {
        this.getUserInfo(uid)
      } else {
        if (ISIOS) {
          location.href = `${base.h5_url}/home?uid=${this.vid}`
        } else {
          this.goNext('/home', { uid: this.vid })
        }
      }
    },
    getUserInfo(uid) {
      var _this = this
      this.$api.webim
        .getUserInfo({
          vid: _this.vid,
          token: _this.token,
          uid: uid
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            const mid = res.data.data.mid
            if (mid) {
              // this.goNext('/home', { uid: uid })
              if (ISIOS) {
                location.href = `${base.h5_url}/home?uid=${uid}`
              } else {
                this.goNext('/home', { uid: uid })
              }
            }
          } else {
            const popToastObj = {
              _this: this,
              txt: '该用户未创建名片!'
            }
            popToast(popToastObj)
          }
        })
    },
    // 获取自己的聊天信息
    getUserSig() {
      var _this = this
      this.$api.webim
        .getUserSig({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          this.webimUser = data
          const { chatId } = this.getParams()
          this.chatId = chatId
          this.isgetUserSig = true
          this.webLogin()
        })
    },
    getIdentifier(chatId) {
      var _this = this
      this.$api.webim
        .getIdentifier({
          vid: _this.vid,
          token: _this.token,
          uid: chatId
        })
        .then(
          res => {
            selToID = res.data.data
            this.getProfilePortrait()
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    getProfilePortrait() {
      var _this = this
      this.$api.webim
        .getProfilePortrait({
          vid: _this.vid,
          token: _this.token,
          account: selToID
        })
        .then(
          res => {
            console.log('自己发出的消息', res)
            let resData = res.data.data
            this.headerTitle = resData.name
            if (_this.vChatList && _this.vChatList.length > 0) {
              for (let i = 0; i < _this.vChatList.length; i++) {
                // eslint-disable-next-line eqeqeq
                if (selToID == _this.vChatList[i].C2cAccount) {
                  _this.onMsgReadedNotify(_this.vChatList[i])
                  chatDetail = _this.vChatList[i]
                  _this.otherNick = chatDetail.C2cNick
                  _this.otherUpic = chatDetail.C2cImage
                  _this.otherAccount = chatDetail.C2cAccount
                  _this.getOtherDetail()
                  break
                } else {
                  // console.log('新消息', _this.vChatList)
                  // console.log('新消息resData', resData)
                  let msgItem = {
                    // 'newTime': '',
                    // 'MsgShow': '',
                    C2cNick: resData.name,
                    C2cAccount: selToID,
                    C2cImage: resData.upic,
                    vid: resData.uid,
                    Type: 1
                  }
                  _this.onMsgReadedNotify(msgItem)
                  chatDetail = msgItem
                  _this.otherNick = msgItem.C2cNick
                  _this.otherUpic = msgItem.C2cImage
                  _this.otherAccount = msgItem.C2cAccount
                  _this.getOtherDetail()
                }
              }
            } else {
              // console.log('新消息', _this.vChatList)
              // console.log('新消息resData', resData)
              let msgItem = {
                UnreadMsgCount: 0,
                C2cNick: resData.name,
                C2cAccount: selToID,
                C2cImage: resData.upic,
                vid: resData.uid,
                Type: 1
              }
              _this.onMsgReadedNotify(msgItem)
              chatDetail = msgItem
              _this.otherNick = msgItem.C2cNick
              _this.otherUpic = msgItem.C2cImage
              _this.otherAccount = msgItem.C2cAccount
              _this.getOtherDetail()
            }
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    webLogin() {
      var _this = this
      // 帐号模式，0-表示独立模式，1-表示托管模式
      // eslint-disable-next-line no-unused-vars
      var accountMode = 0
      // 当前用户身份
      loginInfo = {
        sdkAppID: this.webimUser.sdkInfo.sdkappid, // 用户所属应用id,必填
        identifier: this.webimUser.identifier, // 当前用户ID,必须是否字符串类型，必填
        accountType: this.webimUser.sdkInfo.accountType, // 用户所属应用帐号类型，必填
        userSig: this.webimUser.userSig,
        identifierNick: null, // 当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
        headurl: '' // 当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
      }
      console.log(loginInfo)
      // eslint-disable-next-line no-undef
      selType = webim.SESSION_TYPE.C2C // 当前聊天类型
      // var reqMsgCount = 15 // 每次请求的历史消息(c2c获取群)条数，仅demo用得到
      var onC2cEventNotifys = {
        '92': _this.onMsgReadedNotify // 消息已读通知,
        //                    "96": onMultipleDeviceKickedOut
      }
      // 监听连接状态回调变化事件
      var onConnNotify = function(resp) {
        var info
        switch (resp.ErrorCode) {
          // eslint-disable-next-line no-undef
          case webim.CONNECTION_STATUS.ON:
            // eslint-disable-next-line no-undef
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo)
            break
          // eslint-disable-next-line no-undef
          case webim.CONNECTION_STATUS.OFF:
            info =
              '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' +
              resp.ErrorInfo
            // alert(info);
            // eslint-disable-next-line no-undef
            webim.Log.warn(info)
            break
          // eslint-disable-next-line no-undef
          case webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo
            // alert(info);
            // eslint-disable-next-line no-undef
            webim.Log.warn(info)
            break
          default:
            // eslint-disable-next-line no-undef
            webim.Log.error('未知连接状态: =' + resp.ErrorInfo)
            break
        }
      }
      // 监听事件
      listeners = {
        onConnNotify: onConnNotify, // 监听连接状态回调变化事件,必填
        onMsgNotify: _this.onMsgNotify, // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        onC2cEventNotifys: onC2cEventNotifys, // 监听C2C系统消息通道
        onLongPullingNotify: function(data) {
          console.debug('onLongPullingNotify', data)
        }
      }
      var isAccessFormalEnv = true // 是否访问正式环境

      var isLogOn = false // 是否开启sdk在控制台打印日志
      // 初始化时，其他对象，选填
      options = {
        isAccessFormalEnv: isAccessFormalEnv, // 是否访问正式环境，默认访问正式，选填
        isLogOn: isLogOn // 是否开启控制台打印日志,默认开启，选填
      }
      // eslint-disable-next-line no-undef
      webim.login(loginInfo, listeners, options, function(resp) {
        console.log(resp)
        if (_this.chatId) {
          _this.getIdentifier(_this.chatId)
        } else {
          _this.otherNick = _this.vChatOther.C2cNick
          _this.otherUpic = _this.vChatOther.C2cImage
          _this.otherAccount = _this.vChatOther.C2cAccount
          _this.headerTitle = _this.vChatOther.C2cNick
          _this.chatContent = ''
          _this.getOtherDetail()
          _this.onMsgReadedNotify(_this.vChatOther)
        }
      })
    },
    // 监听新消息事件
    onMsgNotify(newMsgList) {
      var _this = this
      console.log(selToID)
      // var _this = this
      console.log('onMsgNotify', _this)
      // 监听新消息事件
      // newMsgList 为新消息数组，结构为[Msg]
      var sess, newMsg
      // 获取所有聊天会话
      // eslint-disable-next-line no-undef
      var sessMap = webim.MsgStore.sessMap()
      let unread = 0
      console.log('onMsgNotify监听新消息事件', sessMap)
      // eslint-disable-next-line no-use-before-define
      for (i in sessMap) {
        // 聊天消息未读全部
        unread += sessMap[i]._impl.unread
        // console.log(sessMap[i]._impl.unread)
      }
      _this.setVchatDetail({
        IdotMsgShow: true,
        IdotNum: unread > 99 ? '99+' : unread
      })
      for (let j in newMsgList) {
        // 遍历新消息
        // var isNew = true
        newMsg = newMsgList[j]
      }
      console.log(newMsg.getSession().id(), selToID)
      // eslint-disable-next-line eqeqeq
      if (newMsg.getSession().id() == selToID) {
        // 为当前聊天对象的消息
        // 在聊天窗体中新增一条消息
        console.log('为当前聊天对象的消息newMsg', newMsg)
        // eslint-disable-next-line no-undef
        addMsg(newMsg)
        newMsg.self = false
        newMsg.name = _this.otherNick
        newMsg.upic = _this.otherUpic
        _this.chatDetailList.push(newMsg)
        // _this.onMsgReadedNotify(chatDetail)
      }
      // eslint-disable-next-line no-undef
      webim.setAutoRead(selSess, true, true)
      for (var i in sessMap) {
        sess = sessMap[i]
        // eslint-disable-next-line eqeqeq
        if (selToID != sess.id()) {
          // 更新其他聊天对象的未读消息数
          // if (!dateStart) {
          //   dateStart = new Date()
          // }
          // eslint-disable-next-line no-undef
          updateSessDiv(sess.type(), sess.id(), sess.name(), sess.unread())
          console.debug(sess.id(), sess.unread())
          // dateEnd = new Date()
        }
      }
    },
    // 发送消息
    _sendBtn() {
      if (!this.chatContent.trim()) return
      // selSess = webim.MsgStore.sessByTypeId(selType, selToID)
      this.onSendMsg()
    },
    // 获取与他人聊天详情
    getOtherDetail() {
      var _this = this
      console.warn('getOtherDetail')
      this.isLoading = false
      _this.isgetUserSig = true
      _this.chatDetailList = []
      if (_this.chatId) {
        selToID = chatDetail.C2cAccount
      } else {
        selToID = this.vChatOther.C2cAccount
      }
      // console.log(selToID)
      options = {
        Peer_Account: selToID, // 好友帐号
        MaxCnt: 15, // 拉取消息条数
        LastMsgTime: lastMsgTime, // 最近的消息时间，即从这个时间点向前拉取历史消息
        MsgKey: msgKey
      }
      // selSess = null;
      // eslint-disable-next-line no-undef
      webim.MsgStore.delSessByTypeId(selType, selToID)
      // eslint-disable-next-line no-undef
      webim.setAutoRead(selSess, true, true)
      // eslint-disable-next-line no-undef
      webim.getC2CHistoryMsgs(options, function(resp) {
        // console.log('resp', resp)
        // eslint-disable-next-line no-unused-vars
        var complete = resp.Complete // 是否还有历史消息可以拉取，1-表示没有，0-表示有
        if (resp.MsgList.length == 0) {
          // eslint-disable-next-line no-undef
          webim.Log.warn('没有历史消息了:data=' + JSON.stringify(options))
          return
        }
        getPrePageC2CHistroyMsgInfoMap[selToID] = {
          // 保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
          LastMsgTime: resp.LastMsgTime,
          MsgKey: resp.MsgKey
        }
        resp.MsgList.forEach((o, i) => {
          // eslint-disable-next-line eqeqeq
          if (o.fromAccount == _this.otherAccount) {
            o.self = false
            o.upic = _this.otherUpic
            o.name = _this.otherNick
          } else {
            o.self = true
            o.name = _this.vUserInfo.name
            o.upic = _this.vUserInfo.upic
          }
        })
        _this.chatDetailList = resp.MsgList
        console.warn(_this.chatDetailList)
        _this.isLoading = false
      })
    },
    onSendMsg() {
      var _this = this
      loginInfo = _this.vWebImUser
      if (!this.chatId) {
        selToID = this.vChatOther.C2cAccount
      }
      let msgContent = this.chatContent
      console.log(msgContent)
      if (!selToID) {
        alert('你还没有选中好友或者群组，暂不能聊天')
        return
      }
      // eslint-disable-next-line no-use-before-define
      if (!selSess) {
        var friendHeadUrl
        var selType = 'C2C'
        // eslint-disable-next-line no-undef
        var selSess = new webim.Session(
          selType,
          selToID,
          selToID,
          friendHeadUrl,
          Math.round(new Date().getTime() / 1000)
        )
      }
      console.log(selSess)
      let isSend = true // 是否为自己发送
      let seq = -1 // 消息序列，-1表示sdk自动生成，用于去重
      let random = Math.round(Math.random() * 4294967296) // 消息随机数，用于去重
      let msgTime = Math.round(new Date().getTime() / 1000) // 消息时间戳
      let subType // 消息子类型
      // eslint-disable-next-line no-undef
      if (selType == webim.SESSION_TYPE.C2C) {
        // eslint-disable-next-line no-undef
        subType = webim.C2C_MSG_SUB_TYPE.COMMON
      } else {
        // eslint-disable-next-line no-undef
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON
      }
      // eslint-disable-next-line no-undef
      var msg = new webim.Msg(
        selSess,
        isSend,
        seq,
        random,
        msgTime,
        loginInfo.identifier,
        subType,
        loginInfo.identifierNick
      )
      console.log('onSendMsg', msg)
      // eslint-disable-next-line camelcase
      let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex
      // 解析文本和表情
      let expr = /\[[^[\]]{1,3}\]/gm
      let emotions = msgContent.match(expr)
      if (!emotions || emotions.length < 1) {
        // eslint-disable-next-line camelcase
        text_obj = new webim.Msg.Elem.Text(msgContent)
        msg.addText(text_obj)
      } else {
        for (let i = 0; i < emotions.length; i++) {
          tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]))
          if (tmsg) {
            // eslint-disable-next-line camelcase
            // eslint-disable-next-line no-undef
            text_obj = new webim.Msg.Elem.Text(tmsg)
            msg.addText(text_obj)
          }
          // eslint-disable-next-line no-undef
          emotionIndex = webim.EmotionDataIndexs[emotions[i]]
          // eslint-disable-next-line no-undef
          emotion = webim.Emotions[emotionIndex]

          if (emotion) {
            // eslint-disable-next-line camelcase
            face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i])
            msg.addFace(face_obj)
          } else {
            // eslint-disable-next-line camelcase
            text_obj = new webim.Msg.Elem.Text(emotions[i])
            msg.addText(text_obj)
          }
          restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length
          msgContent = msgContent.substring(restMsgIndex)
        }
        if (msgContent) {
          // eslint-disable-next-line camelcase
          text_obj = new webim.Msg.Elem.Text(msgContent)
          msg.addText(text_obj)
        }
      }
      msg.PushInfoBoolean = true // 是否开启离线推送push同步
      msg.sending = 1
      msg.originContent = msgContent
      msg.self = true
      msg.name = _this.vUserInfo.name
      msg.upic = _this.vUserInfo.upic
      console.log(msg)
      // eslint-disable-next-line no-undef
      webim.sendMsg(
        msg,
        function(resp) {
          console.log('sendMsg', msg)
          _this.chatDetailList.push(msg)
          _this.chatContent = ''
          // 发送成功，把sending清理
          // $("#id_" + msg.random).find(".spinner").remove();
          // eslint-disable-next-line no-undef
          webim.Tool.setCookie('tmpmsg_' + selToID, '', 0)
          console.log('_this.vChatList', _this.vChatList)
          _this.newChatList = _this.vChatList.slice(0)
          for (let i = 0; i < _this.newChatList.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (
              _this.vChatOther.C2cAccount == _this.newChatList[i].C2cAccount
            ) {
              // console.log(_this.vChatList[i])
              _this.newChatList[i].UnreadMsgCount = 0
              // eslint-disable-next-line no-undef
              _this.newChatList[i].newTime = webim.Tool.formatTimeStamp(
                msg.time
              )
              _this.newChatList[i].MsgShow = msg.elems[0].content.text
              break
            } else {
              console.log('不为当前聊天人,需更新chatlist列表')
            }
          }
          // _this.setVchatList(_this.newChatList)
          // eslint-disable-next-line no-undef
          _this.informUnread(webim.Tool.formatTimeStamp(msg.time))
        },
        function(err) {
          console.log(err)
          // alert(err.ErrorInfo);
          // 提示重发
          // showReSend(msg)
        }
      )
    },
    informUnread(sendTime) {
      var _this = this
      this.$api.webim
        .informUnread({
          vid: _this.vid,
          token: _this.token,
          uid: _this.chatId,
          time: sendTime,
          h5: 1
        })
        .then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    onMsgReadedNotify(data) {
      console.log('onMsgReadedNotify', data)
      var sessMap
      if (this.chatId) {
        // eslint-disable-next-line no-undef
        sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + this.chatId]
      } else {
        // eslint-disable-next-line no-undef
        sessMap = webim.MsgStore.sessMap()[
          webim.SESSION_TYPE.C2C + data.C2cAccount
        ]
      }
      // eslint-disable-next-line no-undef
      if (sessMap) {
        // eslint-disable-next-line no-undef
        var unread = sessMap.unread()
        unread = unread > 0 ? unread : 0
        /// /更新sess的未读数
        // eslint-disable-next-line no-undef
        sessMap.unread(unread)
        console.debug('更新C2C未读数:', data.C2cAccount, unread)
        // data.UnreadMsgCount = 0
        // this.idotNum = 0
        /// /更新页面的未读数角标
        if (unread > 0) {
          data.UnreadMsgCount = unread
          this.setVchatDetail({
            IdotMsgShow: true,
            IdotNum: unread > 99 ? '99+' : unread
          })
        } else {
          data.UnreadMsgCount = 0
          this.idotNum = 0
          this.setVchatDetail({
            IdotMsgShow: false,
            IdotNum: 0
          })
        }
      }
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    loadingText
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.Chat_box {
  // margin-top: 110px;
  // padding-bottom: 120px;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  top: 55px;
  bottom: 60px;
  -webkit-overflow-scrolling: touch; /* 这句是为了滑动更顺畅 */

  .Chat-item {
    width: 100%;
    font-size: 15px;
    margin: 15px 0;
    overflow: hidden;

    .isself {
      float: right;

      .Chat-item-l {
        float: right;
      }

      .Chat-item-r {
        background-color: #ffdfa5;
        color: #333;

        &::after {
          content: '';
          display: block;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 8px solid #ffdfa5;
          position: absolute;
          right: -7px;
          top: 9px;
        }
      }
    }

    .noself {
      float: left;

      .Chat-item-l {
        float: left;
      }

      .Chat-item-r {
        color: #333;

        &::after {
          content: '';
          display: block;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-right: 8px solid #fff;
          position: absolute;
          left: -7px;
          top: 9px;
        }
      }
    }

    .Chat-item-l {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin: 0 15px;
      // display: inline-block
    }

    .Chat-item-r {
      max-width: 218px;
      background-color: #fff;
      padding: 10px 10px;
      float: left;
      border-radius: 0px 4px 4px 4px;
      word-wrap: break-word;
      position: relative;
    }
  }
}

.Chat_holder {
  height: auto;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 9;
  width: 100%;
  background-color: #f5f5f5;
  box-shadow: 0px -1px 0px 0px rgba(222, 222, 222, 0.44);
  bottom: 0;
  display: flex;
  align-items: center;

  >>>.cube-textarea-wrapper {
    flex: 1;
    margin: 10px 20px;
  }

  .btn {
    btn(60px, 30px, '', '', $color-text, 5px);
    margin-right: 10px;
    // margin 30px auto
    bg_linear();
  }
}
</style>
