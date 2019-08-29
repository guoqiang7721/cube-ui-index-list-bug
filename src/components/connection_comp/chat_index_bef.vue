<template>
  <div>
    <header-com :title="headerTitle" @back="back" />
    <ul class="rm_list" v-show="noChat">
      <li class="item" @click="_getChatAi">
        <img
          class="upic"
          src="https://zfile.bxwh002.cn/img/common/msg_icon_upic.png"
          alt=""
        />
        <div class="item-right">
          <div class="top">
            <span class="name fl">大咖AI小助手</span>
            <span class="time fr">{{ ChatAi.add_time }}</span>
          </div>
          <div class="bot">{{ ChatAi.desc }}</div>
        </div>
      </li>
      <li
        class="item"
        @click="_getChatDetail(item, index)"
        v-for="(item, index) in chatList"
        :key="item.vid"
      >
        <i class="unread" v-show="item.UnreadMsgCount > 0">{{
          item.UnreadMsgCount
        }}</i>
        <img class="upic" :src="item.C2cImage" v-if="item.C2cImage" alt="" />
        <img
          class="upic"
          src="https://zfile.bxwh002.cn/img/common/msg_icon_upic.png"
          v-else
          alt=""
        />
        <div class="item-right">
          <div class="top">
            <span class="name fl">{{ item.C2cNick }}</span>
            <span class="time fr">{{ item.newTime }}</span>
          </div>
          <div class="bot one-txt-cut">{{ item.MsgShow }}</div>
        </div>
      </li>
    </ul>
    <div v-show="isChat">
      <div class="Chat_box">
        <div
          class="Chat-item"
          v-for="item in chatDetailList"
          :key="item.C2cAccount"
        >
          <div :class="[item.self ? 'isself' : 'noself']" @click="_gHome(item)">
            <img class="Chat-item-l" :src="item.upic" alt="" />
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
    </div>
    <!-- loading加载 -->
    <div v-show="isLoading" class="loading-container">
      <loading />
    </div>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import Loading from 'base/loading/loading'
// import { getWebImLogin, onMsgNotify } from 'common/js/getWebImLogin'
var loginInfo
var listeners
var options
// eslint-disable-next-line no-unused-vars
var reqRecentSessCount = 50
var selType // 当前聊天类型
var selToID = null // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var selSess = null // 当前聊天会话对象
// eslint-disable-next-line no-unused-vars
var recentSessMap = {} // 保存最近会话列表
// eslint-disable-next-line no-unused-vars
var friendHeadUrl = 'img/friend.jpg'
// eslint-disable-next-line no-unused-vars
var maxNameLen = 12 // 我的好友或群组列表中名称显示最大长度，仅demo用得到
// eslint-disable-next-line no-unused-vars
var reqMsgCount = 15 // 每次请求的历史消息(c2c获取群)条数，仅demo用得到
// eslint-disable-next-line no-unused-vars
var infoMap = {} // 初始化时，可以先拉取我的好友和我的群组信息
var chatDetail = {}
var lastMsgTime = 0 // 第一次拉取好友历史消息时，必须传0
var getPrePageC2CHistroyMsgInfoMap = {} // 保留下一次拉取好友历史消息的信息
var msgKey = ''
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      headerTitle: '消息',
      ChatAi: {}, // ai最后一消息
      chatList: [], // 聊天列表
      chatDetailList: [], // 聊天详情
      webimUser: {},
      selToID: '',
      accountId: '',
      otherNick: '',
      otherUpic: '',
      chatId: '',
      otherAccount: '', // 其他人账户Id
      chatContent: '',
      chatHolder: '请输入聊天内容...',
      noChat: false,
      isChat: false,
      backUrl: false,
      isLoading: false
    }
  },
  activated() {
    if (this.isgetUserSig) {
      console.log('act')
      this.getUserSig()
    }
    console.log('activated', this.chatId)
    if (this.backUrl) {
      this.noChat = true
      this.isChat = false
    }
    if (!this.chatId) {
      this.noChat = true
      this.isChat = false
    } else {
      this.noChat = false
      this.isChat = true
    }
  },
  created() {
    console.log('created', this.chatId)
    this.noChat = true
    this.isChat = false
    this.getLastTraceLog()
    this.getUserSig()
  },
  methods: {
    // 查看其它人名片
    _gHome(i) {},
    // 发送消息
    _sendBtn() {
      // console.log(chatDetail)
      if (!this.chatContent.trim()) return
      // selSess = webim.MsgStore.sessByTypeId(selType, selToID)
      this.onSendMsg()
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
          // this.webLogin()
          console.log(res)
          this.isgetUserSig = true
          const { chatId } = this.getParams()
          this.chatId = chatId
          // console.log(this.chatId)
          if (!this.chatId) {
            this.noChat = true
            this.isChat = false
          } else {
            this.noChat = false
            this.isChat = true
          }
          this.webLogin()
          // getWebImLogin.call(this)
        })
    },
    // 从其他页面跳转进来
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
            console.log(res)
            selToID = res.data.data
            this.getProfilePortrait(selToID)
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    getProfilePortrait(selToID) {
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
            let ChatUser = res.data.data
            if (_this.chatList && _this.chatList.length > 0) {
              for (let i = 0; i < _this.chatList.length; i++) {
                if (selToID == _this.chatList[i].C2cAccount) {
                  // console.log('两边相等', _this.chatList)
                  _this.onMsgReadedNotify(_this.chatList[i])
                  chatDetail = _this.chatList[i]
                  _this.otherNick = chatDetail.C2cNick
                  _this.otherUpic = chatDetail.C2cImage
                  _this.otherAccount = chatDetail.C2cAccount
                  _this.getOtherDetail()
                  break
                } else {
                  let msgItem = {
                    // 'newTime': '',
                    // 'MsgShow': '',
                    C2cNick: ChatUser.name,
                    C2cAccount: selToID,
                    C2cImage: ChatUser.upic,
                    vid: ChatUser.uid,
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
              // console.log('新消息', _this.chatList)
              // console.log('新消息res_Chat', res_Chat)
              let msgItem = {
                UnreadMsgCount: 0,
                C2cNick: ChatUser.name,
                C2cAccount: selToID,
                C2cImage: ChatUser.upic,
                vid: ChatUser.uid,
                Type: 1
              }
              _this.onMsgReadedNotify(msgItem)
              chatDetail = msgItem
              _this.otherNick = msgItem.C2cNick
              _this.otherUpic = msgItem.C2cImage
              _this.otherAccount = msgItem.C2cAccount
              _this.getOtherDetail()
            }

            console.log(res)
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    // 获取与他人聊天详情
    getOtherDetail() {
      var _this = this
      this.isChat = true
      _this.isLoading = true
      selToID = chatDetail.C2cAccount
      console.log(selToID)
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
        console.log('resp', resp)
        // eslint-disable-next-line no-unused-vars
        var complete = resp.Complete // 是否还有历史消息可以拉取，1-表示没有，0-表示有
        // eslint-disable-next-line eqeqeq
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
        _this.isLoading = false
        _this.chatDetailList = resp.MsgList
      })
    },
    onSendMsg() {
      var _this = this
      // loginInfo = _this.vWebImUser
      console.log(loginInfo)
      selToID = chatDetail.C2cAccount
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
        // webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        // webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        // webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        // webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
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
          // console.log('resp')
          _this.chatDetailList.push(msg)
          _this.chatContent = ''
          // 发送成功，把sending清理
          // $("#id_" + msg.random).find(".spinner").remove();
          // eslint-disable-next-line no-undef
          webim.Tool.setCookie('tmpmsg_' + selToID, '', 0)
          // console.log('_this.vChatList', _this.vChatList)
          // _this.newChatList = _this.vChatList.slice(0)
          for (let i = 0; i < _this.chatList.length; i++) {
            if (chatDetail.C2cAccount == _this.chatList[i].C2cAccount) {
              // console.log(_this.chat_list[i])
              _this.chatList[i].UnreadMsgCount = 0
              _this.chatList[i].newTime = webim.Tool.formatTimeStamp(msg.time)
              _this.chatList[i].MsgShow = msg.elems[0].content.text
              break
            } else {
              console.log('不为当前聊天人,需更新chatlist列表')
            }
          }
          // _this.setVchatList(_this.newChatList)
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
    // 跳转聊天详情
    // _getChatDetail (i, index) {
    //   console.log(i, index)
    //   this.noChat = false
    //   chatDetail = this.chatList[index]
    //   this.otherNick = chatDetail.C2cNick
    //   this.otherUpic = chatDetail.C2cImage
    //   this.otherAccount = chatDetail.C2cAccount
    //   this.chatList[index].UnreadMsgCount = 0
    //   this.getOtherDetail()
    //   this.isLoading = true
    //   this.goNext('/chat/room')
    // },
    _getChatDetail(i, index) {
      console.log(i, index)
      chatDetail = this.chatList[index]
      this.otherNick = chatDetail.C2cNick
      this.otherUpic = chatDetail.C2cImage
      this.otherAccount = chatDetail.C2cAccount
      this.chatList[index].UnreadMsgCount = 0
      this.getOtherDetail()
      this.isLoading = true
      this.setVchatOther(i)
      this.goNext('/chat/room')
    },
    onMsgReadedNotify(data) {
      console.log('onMsgReadedNotify', data)
      if (this.chatId) {
        // eslint-disable-next-line no-undef
        var sessMap = webim.MsgStore.sessMap()[
          webim.SESSION_TYPE.C2C + this.chatId
        ]
      } else {
        // eslint-disable-next-line no-redeclare
        var sessMap = webim.MsgStore.sessMap()[
          webim.SESSION_TYPE.C2C + data.C2cAccount
        ]
        // }
        // console.log('onMsgReadedNotifysessMap', sessMap)
        if (sessMap) {
          var unread = sessMap.unread()
          unread = unread > 0 ? unread : 0
          /// /更新sess的未读数
          sessMap.unread(unread)
          console.debug('更新C2C未读数:', data.C2cAccount, unread)
          // data.UnreadMsgCount = 0
          // this.idotNum = 0
          /// /更新页面的未读数角标
          if (unread > 0) {
            // data.UnreadMsgCount = 0
            // this.idotNum = 0
            // this.setVchatDetail({
            //   IdotMsgShow: false,
            //   IdotNum: 0
            // })
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
      }
    },
    // 获取ai最后一条聊天消息
    getLastTraceLog() {
      var _this = this
      this.$api.connection
        .getLastTraceLog({
          vid: _this.vid,
          token: _this.token
        })
        .then(
          res => {
            const data = res.data.data
            this.ChatAi = data
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    // 登录
    webLogin() {
      var _this = this
      // 帐号模式，0-表示独立模式，1-表示托管模式
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
          case webim.CONNECTION_STATUS.ON:
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo)
            break
          case webim.CONNECTION_STATUS.OFF:
            info =
              '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' +
              resp.ErrorInfo
            // alert(info);
            webim.Log.warn(info)
            break
          case webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo
            // alert(info);
            webim.Log.warn(info)
            break
          default:
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
      // webimLogin();
      webim.login(loginInfo, listeners, options, function(resp) {
        // loginInfo.identifierNick = resp.identifierNick // 设置当前用户昵称
        // loginInfo.headurl = resp.headurl // 设置当前用户头像
        webim.getRecentContactList(
          {
            Count: 50 // 最近的会话数 ,最大为 100
          },
          function(res) {
            console.log('webim.login', res.SessionItem)
            _this.isLoading = false
            if (res.SessionItem) {
              for (let i = 0; i < res.SessionItem.length; i++) {
                res.SessionItem[i].C2cAccount = res.SessionItem[i].To_Account
              }
              // _this.$api.webim.formatMsgs({
              //   vid: _this.vid,
              //   token: _this.token,
              //   msgs: JSON.stringify(res.SessionItem)
              // }).then(res => {
              //   console.log(res)
              //   const data = res.data.data
              // })
              const data = [
                {
                  To_Account: 'wmp_dev1816',
                  Type: 1,
                  LastMsg: {
                    MsgBody: [
                      { MsgType: 'TIMTextElem', MsgContent: { Text: '1235' } }
                    ]
                  },
                  ToAccount: '144115213046698679',
                  C2cNick: '\u7f3a\u5c11\u4f60\u7ed9\u7684\u60b2\u4f24',
                  C2cImage:
                    'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epiaoLTEN0zccApdA9k6eyanDPm526BZ1eqJ9Df8ptHTwedeFpNNExbEabO9cibRa5SiajpVLhd8FkaQ/132',
                  GroupNick: '',
                  GroupImage: '',
                  UnreadMsgCount: 0,
                  MsgSeq: 9532209,
                  MsgRandom: 228782472,
                  MsgTimeStamp: 1554700902,
                  MsgShow: '1235',
                  MsgGroupFrom_Account: '',
                  MsgGroupFromNickName: '',
                  MsgGroupFromCardName: '',
                  MsgGroupReadedSeq: 0,
                  LastC2cMsgFrom_Account: 'wmp_dev1816',
                  C2cAccount: 'wmp_dev1816',
                  SessionImage:
                    'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epiaoLTEN0zccApdA9k6eyanDPm526BZ1eqJ9Df8ptHTwedeFpNNExbEabO9cibRa5SiajpVLhd8FkaQ/132',
                  SessionNick: '\u7f3a\u5c11\u4f60\u7ed9\u7684\u60b2\u4f24',
                  vid: '1816'
                },
                {
                  To_Account: 'wmp_dev1841',
                  Type: 1,
                  LastMsg: {
                    MsgBody: [
                      { MsgType: 'TIMTextElem', MsgContent: { Text: '1234' } }
                    ]
                  },
                  ToAccount: '144115213131473311',
                  C2cNick: '\u7a7a\u57ce',
                  C2cImage:
                    'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjytHOnIMAZOrJtKkiaTb0WRxqhwB5Nxy0NoI8aLTnzLeW0KTLj137ebZCibcKicIx2wE8qtlJDC2Hw/132',
                  GroupNick: '',
                  GroupImage: '',
                  UnreadMsgCount: 0,
                  MsgSeq: 3126284,
                  MsgRandom: 3944668893,
                  MsgTimeStamp: 1554700416,
                  MsgShow: '1234',
                  MsgGroupFrom_Account: '',
                  MsgGroupFromNickName: '',
                  MsgGroupFromCardName: '',
                  MsgGroupReadedSeq: 0,
                  LastC2cMsgFrom_Account: 'wmp_dev1841',
                  C2cAccount: 'wmp_dev1841',
                  SessionImage:
                    'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjytHOnIMAZOrJtKkiaTb0WRxqhwB5Nxy0NoI8aLTnzLeW0KTLj137ebZCibcKicIx2wE8qtlJDC2Hw/132',
                  SessionNick: '\u7a7a\u57ce',
                  vid: '1841'
                },
                {
                  To_Account: 'wmp_dev1838',
                  Type: 1,
                  LastMsg: {
                    MsgBody: [
                      { MsgType: 'TIMTextElem', MsgContent: { Text: '1234' } }
                    ]
                  },
                  ToAccount: '144115213115393668',
                  C2cNick: '\u604d\u7136\u5982\u68a6',
                  C2cImage:
                    'http://thirdwx.qlogo.cn/mmopen/vi_32/uyGL3aRZDU0aSpK9P6LaEVJVnyzcqehGZ9jJGuoamwSF3oRJYKiazauwm6toTWkJlYSMHPUhgiabaRUIE8Cx4GZw/132',
                  GroupNick: '',
                  GroupImage: '',
                  UnreadMsgCount: 0,
                  MsgSeq: 3667978,
                  MsgRandom: 184469865,
                  MsgTimeStamp: 1554449827,
                  MsgShow: '1234',
                  MsgGroupFrom_Account: '',
                  MsgGroupFromNickName: '',
                  MsgGroupFromCardName: '',
                  MsgGroupReadedSeq: 0,
                  LastC2cMsgFrom_Account: 'wmp_dev1838',
                  C2cAccount: 'wmp_dev1838',
                  SessionImage:
                    'https://zfile.zx89.cn/wmp_upload_photo_14181554282611.png',
                  SessionNick: '\u604d\u7136\u5982\u68a6',
                  vid: '1838'
                }
              ]
              _this.chatList = data
              // _this.setVchatList(data)
              console.log('新chatList', data)
              for (let i = 0; i < _this.chatList.length; i++) {
                _this.chatList[i].newTime = webim.Tool.formatTimeStamp(
                  _this.chatList[i].MsgTimeStamp
                )
              }
              if (_this.chatId) {
                _this.getIdentifier(_this.chatId)
              }
            } else {
              if (_this.chatId) {
                _this.getIdentifier(_this.chatId)
              }
            }
          },
          function(resp) {
            // console.log(resp)
            // 错误回调
          }
        )
      })
    },
    // 监听新消息事件
    onMsgNotify(newMsgList) {
      var _this = this
      // var _this = this
      console.log('onMsgNotify', _this)
      // 监听新消息事件
      // newMsgList 为新消息数组，结构为[Msg]
      var sess, newMsg
      // 获取所有聊天会话
      var sessMap = webim.MsgStore.sessMap()
      let unread = 0
      console.log('onMsgNotify监听新消息事件', sessMap)
      for (i in sessMap) {
        // 聊天消息未读全部
        unread += sessMap[i]._impl.unread
        // console.log(sessMap[i]._impl.unread)
      }
      _this.setVchatDetail({
        IdotMsgShow: true,
        IdotNum: unread > 99 ? '99+' : unread
      })
      // _this.idotMsg = true
      // _this.idotNum = unread > 99 ? '99+' : unread
      for (let j in newMsgList) {
        // 遍历新消息
        var isNew = true
        newMsg = newMsgList[j]
        console.log(_this.chatList)
        if (_this.chatList && _this.chatList.length > 0) {
          for (let i = 0; i < _this.chatList.length; i++) {
            if (newMsg.fromAccount == _this.chatList[i].C2cAccount) {
              _this.chatList[i].UnreadMsgCount = newMsg.sess._impl.unread
              _this.setVchatDetail({
                IdotMsgShow: true,
                IdotNum: newMsg.sess._impl.unread
              })
              _this.chatList[i].newTime = webim.Tool.formatTimeStamp(
                newMsg.sess._impl.time
              )
              _this.chatList[i].MsgShow = newMsg.elems[0].content.text
              isNew = false
            }
          }
          if (isNew) {
            // 新增聊天内容时候
            console.log(selToID)
            if (!selToID) {
              selToID = newMsg.getSession().id()
              selType = newMsg.getSession().type()
              selSess = newMsg.getSession()
            }
            let newselToID = newMsg.getSession().id()
            console.log(newselToID)
            _this.$api.webim
              .getProfilePortrait({
                vid: _this.vid,
                token: _this.token,
                account: newselToID
              })
              .then(res => {
                console.log(res)
                console.log('新增聊天', res)
                const data = res.data.data
                let msgItem = {
                  // 'UnreadMsgCount': 1,
                  newTime: webim.Tool.formatTimeStamp(newMsg.time),
                  MsgShow: newMsg.elems[0].content.text,
                  C2cNick: data.name,
                  C2cAccount: newselToID,
                  C2cImage: data.upic,
                  vid: data.uid
                }
                // console.log('新添加内容', msgItem);
                _this.chatList.push(msgItem)
              })
          }
        } else {
          console.log('elseSElfToID')
          if (!selToID) {
            selToID = newMsg.getSession().id()
            selType = newMsg.getSession().type()
            selSess = newMsg.getSession()
          }
          let newselToID = newMsg.getSession().id()
          console.log(newselToID)
          _this.$api.webim
            .getProfilePortrait({
              vid: _this.vid,
              token: _this.token,
              account: newselToID
            })
            .then(res => {
              console.log(res)
              console.log('没有聊天对象selToID', selToID)
              const data = res.data.data
              let msgItem = {
                C2cAccount: newselToID,
                UnreadMsgCount: 1,
                newTime: webim.Tool.formatTimeStamp(newMsg.time),
                MsgShow: newMsg.elems[0].content.text,
                C2cNick: data.name,
                C2cImage: data.upic,
                vid: data.uid
              }
              _this.chatList = [msgItem]
              // _this.setVchatDetail({
              //   vChatList: _this.chatList
              // })
              console.log('this.chatList.length<0', this.chatList)
            })
          // console.log('没有聊天对象selToID', selToID)
          // console.log('selSess', selSess)
        }
      }
      console.log(newMsg.getSession().id(), selToID)
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
      // 消息已读上报，以及设置会话自动已读标记
      // eslint-disable-next-line no-undef
      webim.setAutoRead(selSess, true, true)
      for (var i in sessMap) {
        sess = sessMap[i]
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
    // 进入ai消息页面
    _getChatAi() {
      this.goNext('/chat/ai')
    },
    back() {
      // console.log(this.backUrl)
      // if (this.backUrl) {
      //   this.noChat = true
      //   this.isChat = false
      // } else {
      this.goBack()
      // }
    }
  },
  watch: {
    // $route (val, bef) {
    //   console.log(val, bef)
    //   if (bef.fullPath === '/connection') {
    //     this.backUrl = true
    //   } else {
    //     this.backUrl = false
    //   }
    // }
  },
  components: {
    HeaderCom,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.rm_list {
  width: 100%;
  margin-top: 56px;
  padding-bottom: 20px;

  .item {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
    position: relative;

    .unread {
      position: absolute;
      font-size: 11px;
      left: 45px;
      top: 8px;
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 15px;
      border-radius: 50%;
      color: #fff;
      background-color: #ff0000;
    }

    .upic {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin: 0 10px;
    }

    .item-right {
      overflow: hidden;
      flex: 1;
      margin-right: 10px;
      flex_column();
      color: #999;
      font-size: 13px;

      .top {
        .name {
          font-size: 15px;
          color: #252525;
        }
      }

      .bot {
        width: 90%;
        margin-top: 10px;
        one_txt_cut();
      }
    }

    &:last-child {
      border: none;
    }
  }
}

.Chat_box {
  // margin-top: 110px;
  // padding-bottom: 120px;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  top: 55px;
  bottom: 80px;
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
  z-index: 999;
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
    // margin 30px auto
    bg_linear();
  }
}
</style>
