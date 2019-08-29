import * as types from './mutation-types'
const matutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.LOGOUT_TOKEN](state, token) {
    localStorage.removeItem('token')
    state.token = null
  },
  [types.SET_VID](state, vid) {
    state.vid = vid
  },
  [types.SET_UID](state, uid) {
    state.uid = uid
  },
  [types.SET_BID](state, bid) {
    state.bid = bid
  },
  [types.SET_MID](state, mid) {
    state.mid = mid
  },
  [types.SET_IDS](state, Ids) {
    state.Ids = Ids
  },
  [types.SET_WX_JS_URL](state, wxJsUrl) {
    state.wxJsUrl = wxJsUrl
  },
  [types.SET_BANKINFO](state, vBankInfo) {
    state.vBankInfo = vBankInfo
  },
  [types.SET_VUSERINFO](state, vUserInfo) {
    state.vUserInfo = vUserInfo
    // for (let k in vUserInfo) {
    //   state.vUserInfo[k] = vUserInfo[k]
    // }
  },
  [types.SET_USERLOCATION](state, uSerlocation) {
    state.uSerlocation = uSerlocation
  },
  [types.SET_PROUSERINFO](state, proUserInfo) {
    state.proUserInfo = proUserInfo
  },
  [types.SET_OUSERINFO](state, oUserInfo) {
    state.oUserInfo = oUserInfo
  },
  [types.REMOVE_OUSERINFO](state, oUserInfo) {
    state.oUserInfo = {}
    // for (let k in oUserInfo) {
    //   state.oUserInfo[k] = oUserInfo[k]
    // }
  },
  [types.SET_VBRANDINFO](state, vBrandInfo) {
    state.vBrandInfo = vBrandInfo
  },
  [types.SET_GOODSID](state, vGoodsId) {
    state.vGoodsId = vGoodsId
  },
  [types.SET_VWEBIMUSER](state, vWebImUser) {
    state.vWebImUser = vWebImUser
  },
  [types.SET_VCHATDETAIL](state, vChatDetail) {
    // state.vChatDetail = vChatDetail
    for (let k in vChatDetail) {
      state.vChatDetail[k] = vChatDetail[k]
    }
  },
  [types.SET_VCHATOTHER](state, vChatOther) {
    state.vChatOther = vChatOther
  },
  [types.SET_VCHATLIST](state, vChatList) {
    state.vChatList = vChatList
  },
  [types.SET_INDUSTYNAME](state, industyName) {
    state.industyName = industyName
  },
  [types.SET_INDUSTYCHOICE](state, industyChoice) {
    state.industyChoice = industyChoice
  }
}
export default matutations
