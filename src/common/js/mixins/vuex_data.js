import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'token',
      'vid',
      'uid',
      'bid',
      'mid',
      'Ids',
      'wxJsUrl',
      'vUserInfo',
      'proUserInfo',
      'vBankInfo',
      'oUserInfo',
      'vBrandInfo',
      'vGoodsId',
      'vWebImUser',
      'vChatDetail',
      'vChatOther',
      'vChatList',
      'industyName',
      'industyChoice'
    ])
  },
  methods: {
    ...mapMutations({
      setToken: 'SET_TOKEN',
      logoutToken: 'LOGOUT_TOKEN',
      setVid: 'SET_VID',
      setUid: 'SET_UID',
      setBid: 'SET_BID',
      setMid: 'SET_MID',
      setIds: 'SET_IDS',
      setWxJsUrl: 'SET_WX_JS_URL',
      setVUserInfo: 'SET_VUSERINFO',
      setProUserInfo: 'SET_PROUSERINFO',
      setBankInfo: 'SET_BANKINFO',
      setOUserInfo: 'SET_OUSERINFO',
      removeOUserInfo: 'REMOVE_OUSERINFO',
      setVBrandInfo: 'SET_VBRANDINFO',
      setGoodsId: 'SET_GOODSID',
      setVWebImUser: 'SET_VWEBIMUSER',
      setVchatDetail: 'SET_VCHATDETAIL',
      setVchatOther: 'SET_VCHATOTHER',
      setVchatList: 'SET_VCHATLIST',
      setIndustyName: 'SET_INDUSTYNAME',
      setIndustyChoice: 'SET_INDUSTYCHOICE'
    }),
    ...mapActions([])
  }
}
