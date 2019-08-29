// import {playMode} from 'common/js/config'
const state = {
  token: '',
  vid: '',
  bid: '',
  mid: '',
  Ids: {}, // 判断个人信息
  vBankInfo: {}, // 银行卡信息
  vUserInfo: {}, // 自己的数据
  proUserInfo: {}, // 上级的数据
  oUserInfo: {}, // 当前者的数据
  vBrandInfo: {}, // 选择的品牌
  vGoodsId: {}, // shop选择的商品id
  vChatDetail: {
    IdotMsgShow: false, // 是否有聊天显示
    IdotNum: 0 // 聊天未读条数
  },
  vWebImUser: {},
  vChatOther: {}, // 与之聊天人
  vChatList: [],
  wxJsUrl: '', // ios 保存首次url
  industyName: '', // 创建的品牌
  industyChoice: {} // 所选行业
}
export default state
