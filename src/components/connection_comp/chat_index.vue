<template>
  <div>
    <header-com :title="headerTitle" @back="back" />
    <ul class="rm_list">
      <li class="item" @click="_getChatAi">
        <img class="upic" src="https://zfile.bxwh002.cn/img/common/msg_icon_upic.png" alt="" />
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
        @click="_getChatDetail(item,index)"
        v-for="(item, index) in chatList"
        :key="item.vid"
      >
        <i class="unread" v-show="item.UnreadMsgCount > 0">{{
          item.UnreadMsgCount
        }}</i>
        <!-- <img class="upic" :src="item.C2cImage" alt="" /> -->
        <img class="upic" :src="item.C2cImage" v-if="item.C2cImage" alt="" />
        <img class="upic" src="https://zfile.bxwh002.cn/img/common/def_upic.png" v-else alt="" />
        <div class="item-right">
          <div class="top">
            <span class="name fl" v-if="item.C2cNick">{{ item.C2cNick }}</span>
            <span class="name fl" v-else>游客</span>
            <span class="time fr">{{ item.newTime }}</span>
          </div>
          <div class="bot one-txt-cut">{{ item.MsgShow }}</div>
        </div>
      </li>
    </ul>
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
// eslint-disable-next-line no-unused-vars
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
export default {
  mixins: [routings, vuexData],
  data () {
    return {
      headerTitle: '消息',
      ChatAi: {}, // ai最后一消息
      chatList: [], // 聊天列表
      chatDetailList: [], // 聊天详情
      webimUser: {},
      isLoading: true
    }
  },
  activated () {
    if (this.isgetUserSig) {
      console.log('act')
      this.getUserSig()
    }
  },
  created () {
    console.log('created', this.chatId)
    this.getLastTraceLog()
    this.getUserSig()
  },
  methods: {
    // 获取自己的聊天信息
    getUserSig () {
      var _this = this
      this.$api.webim.getUserSig({
        vid: _this.vid,
        token: _this.token
      }).then(res => {
        const data = res.data.data
        this.webimUser = data
        console.log(res)
        this.isgetUserSig = true
        this.webLogin()
      })
    },
    _getChatDetail (i, index) {
      console.log(i, index)
      this.chatList[index].UnreadMsgCount = 0
      this.setVchatOther(i)
      this.goNext('/chat/room')
    },
    onMsgReadedNotify (data) {
      console.log('onMsgReadedNotify', data)
      if (this.chatId) {
        // 是否出错
        // var sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + this.chatId]
        // eslint-disable-next-line no-undef
        sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + this.chatId]
      } else {
        // eslint-disable-next-line no-undef
        sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + data.C2cAccount]
        // }
        // console.log('onMsgReadedNotifysessMap', sessMap)
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
    getLastTraceLog () {
      var _this = this
      this.$api.connection.getLastTraceLog({
        vid: _this.vid,
        token: _this.token
      }).then(res => {
        const data = res.data.data
        this.ChatAi = data
      }, (err) => {
        console.log(err, 'err')
      })
    },
    // 登录
    webLogin () {
      var _this = this
      // 帐号模式，0-表示独立模式，1-表示托管模式

      // eslint-disable-next-line no-unused-vars
      var accountMode = 0
      // 当前用户身份
      loginInfo = {
        'sdkAppID': this.webimUser.sdkInfo.sdkappid, // 用户所属应用id,必填
        'identifier': this.webimUser.identifier, // 当前用户ID,必须是否字符串类型，必填
        'accountType': this.webimUser.sdkInfo.accountType, // 用户所属应用帐号类型，必填
        'userSig': this.webimUser.userSig,
        'identifierNick': null, // 当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
        'headurl': '' // 当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
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
      var onConnNotify = function (resp) {
        var info
        switch (resp.ErrorCode) {
          // eslint-disable-next-line no-undef
          case webim.CONNECTION_STATUS.ON:
            // eslint-disable-next-line no-undef
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo)
            break
            // eslint-disable-next-line no-undef
          case webim.CONNECTION_STATUS.OFF:
            info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo
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
        'onConnNotify': onConnNotify, // 监听连接状态回调变化事件,必填
        'onMsgNotify': _this.onMsgNotify, // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        'onC2cEventNotifys': onC2cEventNotifys, // 监听C2C系统消息通道
        'onLongPullingNotify': function (data) {
          console.debug('onLongPullingNotify', data)
        }
      }

      var isAccessFormalEnv = true // 是否访问正式环境

      var isLogOn = false // 是否开启sdk在控制台打印日志
      // 初始化时，其他对象，选填
      options = {
        'isAccessFormalEnv': isAccessFormalEnv, // 是否访问正式环境，默认访问正式，选填
        'isLogOn': isLogOn // 是否开启控制台打印日志,默认开启，选填
      }
      // webimLogin();
      // eslint-disable-next-line no-undef
      webim.login(
        loginInfo, listeners, options,
        function (resp) {
          // loginInfo.identifierNick = resp.identifierNick // 设置当前用户昵称
          // loginInfo.headurl = resp.headurl // 设置当前用户头像
          // eslint-disable-next-line no-undef
          webim.getRecentContactList({
            'Count': 50 // 最近的会话数 ,最大为 100
          }, function (res) {
            console.log('webim.login', res.SessionItem)
            _this.isLoading = false
            if (res.SessionItem) {
              for (let i = 0; i < res.SessionItem.length; i++) {
                res.SessionItem[i].C2cAccount = res.SessionItem[i].To_Account
              }
              _this.$api.webim.formatMsgs({
                vid: _this.vid,
                token: _this.token,
                msgs: JSON.stringify(res.SessionItem)
              }).then(res => {
                console.log(res)
                // const data = res.data.data
                // _this.chatList = data
                const data = res.data.data
                for (let i = 0; i < data.length; i++) {
                // eslint-disable-next-line no-undef
                  // console.log('_this.chatList[i].newTime', _this.chatList[i].newTime)
                  data[i].newTime = webim.Tool.formatTimeStamp(
                    data[i].MsgTimeStamp)
                  _this.chatList = data
                  _this.isLoading = false
                }
              })
            } else {
            }
          }, function (resp) {
            // console.log(resp)
            // 错误回调
          })
        }
      )
    },
    // 监听新消息事件
    onMsgNotify (newMsgList) {
      var _this = this
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
      for (i in sessMap) { // 聊天消息未读全部
        // eslint-disable-next-line no-use-before-define
        unread += sessMap[i]._impl.unread
      // console.log(sessMap[i]._impl.unread)
      }
      _this.setVchatDetail({
        IdotMsgShow: true,
        IdotNum: unread > 99 ? '99+' : unread
      })
      // _this.idotMsg = true
      // _this.idotNum = unread > 99 ? '99+' : unread
      for (let j in newMsgList) { // 遍历新消息
        var isNew = true
        newMsg = newMsgList[j]
        console.log(_this.chatList)
        if (_this.chatList && _this.chatList.length > 0) {
          for (let i = 0; i < _this.chatList.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (newMsg.fromAccount == _this.chatList[i].C2cAccount) {
              _this.chatList[i].UnreadMsgCount = newMsg.sess._impl.unread
              _this.setVchatDetail({
                IdotMsgShow: true,
                IdotNum: newMsg.sess._impl.unread
              })
              // eslint-disable-next-line no-undef
              _this.chatList[i].newTime = webim.Tool.formatTimeStamp(newMsg.sess._impl.time)
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
            _this.$api.webim.getProfilePortrait({
              vid: _this.vid,
              token: _this.token,
              account: newselToID
            }).then(res => {
              console.log(res)
              console.log('新增聊天', res)
              const data = res.data.data
              let msgItem = {
              // 'UnreadMsgCount': 1,
                // eslint-disable-next-line no-undef
                'newTime': webim.Tool.formatTimeStamp(newMsg.time),
                'MsgShow': newMsg.elems[0].content.text,
                'C2cNick': data.name,
                'C2cAccount': newselToID,
                'C2cImage': data.upic,
                'vid': data.uid
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
          _this.$api.webim.getProfilePortrait({
            vid: _this.vid,
            token: _this.token,
            account: newselToID
          }).then(res => {
            console.log(res)
            console.log('没有聊天对象selToID', selToID)
            const data = res.data.data
            let msgItem = {
              'C2cAccount': newselToID,
              'UnreadMsgCount': 1,
              // eslint-disable-next-line no-undef
              'newTime': webim.Tool.formatTimeStamp(newMsg.time),
              'MsgShow': newMsg.elems[0].content.text,
              'C2cNick': data.name,
              'C2cImage': data.upic,
              'vid': data.uid
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
      // eslint-disable-next-line eqeqeq
      if (newMsg.getSession().id() == selToID) { // 为当前聊天对象的消息
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
        // eslint-disable-next-line eqeqeq
        if (selToID != sess.id()) { // 更新其他聊天对象的未读消息数
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
    _getChatAi () {
      this.goNext('/chat/ai')
    },
    back () {
      this.goBack()
    }
  },
  watch: {
  },
  components: {
    HeaderCom,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.loading-container
  position: absolute
  width: 100%
  top: 30%
  transform: translateY(-50%)
.rm_list
  width: 100%;
  margin-top 56px
  padding-bottom: 20px;
  .item
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    .unread
      position: absolute;
      font-size 11px
      left: 45px;
      top: 8px;
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 15px;
      border-radius: 50%;
      color: #fff;
      background-color: #ff0000;
    .upic
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin: 0 10px
    .item-right
      overflow: hidden;
      flex: 1;
      margin-right: 10px;
      flex_column()
      color: #999;
      font-size: 13px;
      .top
        padding 5px 0
        .name
          font-size: 15px;
          color: #252525;
      .bot
        width: 90%;
        margin-top: 3px;
        one_txt_cut()
        padding 3px 0
    &:last-child
      border: none;
.Chat_box {
  // margin-top: 110px;
  // padding-bottom: 120px;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  top: 55px;
  bottom:  80px;
  -webkit-overflow-scrolling: touch;   /*这句是为了滑动更顺畅*/
  .Chat-item {
    width: 100%;
    font-size: 15px;
    margin: 15px 0;
    overflow: hidden;
    .isself {
      float: right;
      .Chat-item-l {
        float: right
      }
      .Chat-item-r{
        background-color: #ffdfa5;
        color #333
        &::after{
          content:'';
          display: block;
          border-top:7px solid transparent;
          border-bottom:7px solid transparent;
          border-left:8px solid #ffdfa5;
          position: absolute;
          right:-7px;
          top:9px;
        }
      }
    }
    .noself {
      float: left;
      .Chat-item-l {
        float: left;
      }
      .Chat-item-r{
        color #333
        &::after{
          content:'';
          display: block;
          border-top:7px solid transparent;
          border-bottom:7px solid transparent;
          border-right:8px solid #fff;
          position: absolute;
          left:-7px;
          top:9px;
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
.Chat_holder
  height auto
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
  >>>.cube-textarea-wrapper
        flex 1
        margin 10px 20px
  .btn
    btn(60px,30px,'','',$color-text,5px)
    // margin 30px auto
    bg_linear()
</style>
