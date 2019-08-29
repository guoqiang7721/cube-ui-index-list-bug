var loginInfo
var listeners
var options
var reqRecentSessCount = 50
var selType // 当前聊天类型
var selToID = null // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var selSess = null // 当前聊天会话对象
var recentSessMap = {} // 保存最近会话列表
var friendHeadUrl = 'img/friend.jpg'
var reqMsgCount = 15 // 每次请求的历史消息(c2c获取群)条数，仅demo用得到
var infoMap = {} // 初始化时，可以先拉取我的好友和我的群组信息
var chatDetail = {}
var lastMsgTime = 0 // 第一次拉取好友历史消息时，必须传0
var getPrePageC2CHistroyMsgInfoMap = {} // 保留下一次拉取好友历史消息的信息
var msgKey = ''
var _this_webim
export function getWebImLogin () {
  _this_webim = this
  // 帐号模式，0-表示独立模式，1-表示托管模式
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
  _this_webim.setVWebImUser(loginInfo)
  //                var AdminAcount = 'qwe101';
  selType = webim.SESSION_TYPE.C2C // 当前聊天类型

  var reqMsgCount = 15 // 每次请求的历史消息(c2c获取群)条数，仅demo用得到

  var pageSize = 15 // 表格的每页条数，bootstrap table 分页时用到

  var defaultSelGroupId = null // 登录默认选中的群id，选填，仅demo用得到

  var onC2cEventNotifys = {
    '92': onMsgReadedNotify // 消息已读通知,
    //                    "96": onMultipleDeviceKickedOut
  }
  // 监听连接状态回调变化事件
  var onConnNotify = function (resp) {
    var info
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        webim.Log.warn('建立连接成功: ' + resp.ErrorInfo)
        break
      case webim.CONNECTION_STATUS.OFF:
        info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo
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
    'onConnNotify': onConnNotify, // 监听连接状态回调变化事件,必填
    'onMsgNotify': onMsgNotify, // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
    'onC2cEventNotifys': onC2cEventNotifys, // 监听C2C系统消息通道
    'onLongPullingNotify': function (data) {
      console.debug('onLongPullingNotify', data)
    }
  }

  var isAccessFormalEnv = true // 是否访问正式环境

  var isLogOn = false // 是否开启sdk在控制台打印日志
  var _this = this
  // 初始化时，其他对象，选填
  options = {
    'isAccessFormalEnv': isAccessFormalEnv, // 是否访问正式环境，默认访问正式，选填
    'isLogOn': isLogOn // 是否开启控制台打印日志,默认开启，选填
  }
  // webimLogin();
  webim.login(
    loginInfo, listeners, options,
    function (resp) {
      // loginInfo.identifierNick = resp.identifierNick // 设置当前用户昵称
      // loginInfo.headurl = resp.headurl // 设置当前用户头像
      webim.getRecentContactList({
        'Count': 50 // 最近的会话数 ,最大为 100
      }, function (res) {
        console.log('webim.login', res.SessionItem)
        if (res.SessionItem) {
          for (let i = 0; i < res.SessionItem.length; i++) {
            res.SessionItem[i].C2cAccount = res.SessionItem[i].To_Account
          }
          // _this.$api.webim.formatMsg({
          //   vid: _this.vid,
          //   token: _this.token,
          //   msgs: JSON.stringify(res.SessionItem)
          // }).then(res => {
          //   console.log(res)
          //   const data = res.data.data
          // })
          const data = [{ 'To_Account': 'wmp_dev1816', 'Type': 1, 'LastMsg': { 'MsgBody': [{ 'MsgType': 'TIMTextElem', 'MsgContent': { 'Text': '1235' } }] }, 'ToAccount': '144115213046698679', 'C2cNick': '\u7f3a\u5c11\u4f60\u7ed9\u7684\u60b2\u4f24', 'C2cImage': 'http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83epiaoLTEN0zccApdA9k6eyanDPm526BZ1eqJ9Df8ptHTwedeFpNNExbEabO9cibRa5SiajpVLhd8FkaQ\/132', 'GroupNick': '', 'GroupImage': '', 'UnreadMsgCount': 0, 'MsgSeq': 9532209, 'MsgRandom': 228782472, 'MsgTimeStamp': 1554700902, 'MsgShow': '1235', 'MsgGroupFrom_Account': '', 'MsgGroupFromNickName': '', 'MsgGroupFromCardName': '', 'MsgGroupReadedSeq': 0, 'LastC2cMsgFrom_Account': 'wmp_dev1816', 'C2cAccount': 'wmp_dev1816', 'SessionImage': 'http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83epiaoLTEN0zccApdA9k6eyanDPm526BZ1eqJ9Df8ptHTwedeFpNNExbEabO9cibRa5SiajpVLhd8FkaQ\/132', 'SessionNick': '\u7f3a\u5c11\u4f60\u7ed9\u7684\u60b2\u4f24', 'vid': '1816' }, { 'To_Account': 'wmp_dev1841', 'Type': 1, 'LastMsg': { 'MsgBody': [{ 'MsgType': 'TIMTextElem', 'MsgContent': { 'Text': '1234' } }] }, 'ToAccount': '144115213131473311', 'C2cNick': '\u7a7a\u57ce', 'C2cImage': 'http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLjytHOnIMAZOrJtKkiaTb0WRxqhwB5Nxy0NoI8aLTnzLeW0KTLj137ebZCibcKicIx2wE8qtlJDC2Hw\/132', 'GroupNick': '', 'GroupImage': '', 'UnreadMsgCount': 0, 'MsgSeq': 3126284, 'MsgRandom': 3944668893, 'MsgTimeStamp': 1554700416, 'MsgShow': '1234', 'MsgGroupFrom_Account': '', 'MsgGroupFromNickName': '', 'MsgGroupFromCardName': '', 'MsgGroupReadedSeq': 0, 'LastC2cMsgFrom_Account': 'wmp_dev1841', 'C2cAccount': 'wmp_dev1841', 'SessionImage': 'http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLjytHOnIMAZOrJtKkiaTb0WRxqhwB5Nxy0NoI8aLTnzLeW0KTLj137ebZCibcKicIx2wE8qtlJDC2Hw\/132', 'SessionNick': '\u7a7a\u57ce', 'vid': '1841' }, { 'To_Account': 'wmp_dev1838', 'Type': 1, 'LastMsg': { 'MsgBody': [{ 'MsgType': 'TIMTextElem', 'MsgContent': { 'Text': '1234' } }] }, 'ToAccount': '144115213115393668', 'C2cNick': '\u604d\u7136\u5982\u68a6', 'C2cImage': 'http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/uyGL3aRZDU0aSpK9P6LaEVJVnyzcqehGZ9jJGuoamwSF3oRJYKiazauwm6toTWkJlYSMHPUhgiabaRUIE8Cx4GZw\/132', 'GroupNick': '', 'GroupImage': '', 'UnreadMsgCount': 0, 'MsgSeq': 3667978, 'MsgRandom': 184469865, 'MsgTimeStamp': 1554449827, 'MsgShow': '1234', 'MsgGroupFrom_Account': '', 'MsgGroupFromNickName': '', 'MsgGroupFromCardName': '', 'MsgGroupReadedSeq': 0, 'LastC2cMsgFrom_Account': 'wmp_dev1838', 'C2cAccount': 'wmp_dev1838', 'SessionImage': 'https:\/\/zfile.zx89.cn\/wmp_upload_photo_14181554282611.png', 'SessionNick': '\u604d\u7136\u5982\u68a6', 'vid': '1838' }]
          _this.chatList = data
          for (let i = 0; i < _this.chatList.length; i++) {
            _this.chatList[i].newTime = webim.Tool.formatTimeStamp(
              _this.chatList[i].MsgTimeStamp)
          }
          // _this.newchatList = _this.chatList.slice(0)
          // console.log(_this.chatList, _this.newchatList)
          // _this.setVchatList(_this.newchatList)
        } else {
          // console.log('else', _this.chatId)
          if (_this.chatId) {
            _this._getIdentifier(_this.chatId)
          }
        }
      }, function (resp) {
        // console.log(resp)
        // 错误回调
      })
    }
  )
}
// 监听新消息事件
export function onMsgNotify (newMsgList) {
  // var _this = this
  console.log('onMsgNotify', _this_webim)
  // 监听新消息事件
  // newMsgList 为新消息数组，结构为[Msg]
  var sess, newMsg
  // 获取所有聊天会话
  var sessMap = webim.MsgStore.sessMap()
  let unread = 0
  console.log('onMsgNotify监听新消息事件', sessMap)
  for (i in sessMap) { // 聊天消息未读全部
    unread += sessMap[i]._impl.unread
    // console.log(sessMap[i]._impl.unread)
  }
  _this_webim.setVchatDetail({
    IdotMsgShow: true,
    IdotNum: unread > 99 ? '99+' : unread
  })
  // _this_webim.idotMsg = true
  // _this_webim.idotNum = unread > 99 ? '99+' : unread
  for (let j in newMsgList) { // 遍历新消息
    var isNew = true
    newMsg = newMsgList[j]
    console.log(_this_webim.chatList)
    if (_this_webim.chatList && _this_webim.chatList.length > 0) {
      for (let i = 0; i < _this_webim.chatList.length; i++) {
        if (newMsg.fromAccount == _this_webim.chatList[i].C2cAccount) {
          _this_webim.chatList[i].UnreadMsgCount = newMsg.sess._impl.unread
          _this_webim.newList[i].newTime = _this_webim.chatList.Tool.formatTimeStamp(newMsg.sess._impl.time)
          _this_webim.chatList[i].MsgShow = newMsg.elems[0].content.text
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
        _this_webim.$api.webim.getProfilePortrait({
          vid: _this_webim.vid,
          token: _this_webim.token,
          account: newselToID
        }).then(res => {
          console.log(res)
          console.log('新增聊天', res)
          const data = res.data.data
          let msgItem = {
            // 'UnreadMsgCount': 1,
            'newTime': webim.Tool.formatTimeStamp(newMsg.time),
            'MsgShow': newMsg.elems[0].content.text,
            'C2cNick': data.name,
            'C2cAccount': newselToID,
            'C2cImage': data.upic,
            'vid': data.uid
          }
          // console.log('新添加内容', msgItem);
          _this_webim.chatList.push(msgItem)
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
      _this_webim.$api.webim.getProfilePortrait({
        vid: _this_webim.vid,
        token: _this_webim.token,
        account: newselToID
      }).then(res => {
        console.log(res)
        console.log('没有聊天对象selToID', selToID)
        const data = res.data.data
        let msgItem = {
          'C2cAccount': newselToID,
          'UnreadMsgCount': 1,
          'newTime': webim.Tool.formatTimeStamp(newMsg.time),
          'MsgShow': newMsg.elems[0].content.text,
          'C2cNick': data.name,
          'C2cImage': data.upic,
          'vid': data.uid
        }
        _this_webim.chatList = [msgItem]
        // _this_webim.setVchatDetail({
        //   vChatList: _this_webim.chatList
        // })
        console.log('this.chatList.length<0', this.chatList)
      })
      // console.log('没有聊天对象selToID', selToID)
      // console.log('selSess', selSess)
    }
  }
  console.log(newMsg.getSession().id(), selToID)
  if (newMsg.getSession().id() == selToID) { // 为当前聊天对象的消息
    // 在聊天窗体中新增一条消息
    console.log('为当前聊天对象的消息newMsg', newMsg)
    addMsg(newMsg)
    newMsg.self = false
    newMsg.name = _this_webim.otherNick
    newMsg.upic = _this_webim.otherUpic
    // _this_webim.chatDetailList.push(newMsg)
    // _this_webim.onMsgReadedNotify(chatDetail)
  }
  // 消息已读上报，以及设置会话自动已读标记
  webim.setAutoRead(selSess, true, true)
  for (var i in sessMap) {
    sess = sessMap[i]
    if (selToID != sess.id()) { // 更新其他聊天对象的未读消息数
      if (!dateStart) {
        dateStart = new Date()
      }
      updateSessDiv(sess.type(), sess.id(), sess.name(), sess.unread())
      console.debug(sess.id(), sess.unread())
      dateEnd = new Date()
    }
  }
}
