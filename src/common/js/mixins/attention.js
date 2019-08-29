import {
  isSubscribe,
  isSubcribePro,
  isAuthDkpro
} from 'common/js/getCommonInfo'
import base from 'request/api/base'
export default {
  data() {
    return {
      popMainImg: '', // 公众号弹窗图片
      isPopGzh: false //  微名片公众号弹窗默认关闭
    }
  },
  computed: {
    // 判断是否会员
    noRoleId() {
      return this.oUserInfo.roleId === '1'
    }
  },
  methods: {
    // 获取弹窗
    async _getPopComp(text, isSelf) {
      if (!isSelf && text === 'home') return
      const isSub = await isSubscribe({ token: this.token, vid: this.vid })
      if (text === 'newsIndex' && this.noRoleId && !this.isVoteId) {
        this._showPopisSelfCom()
      }
      // 判断显示公众号弹窗
      if (isSub === 0 && !this.alreadyGetSubs) {
        if (text === 'newsIndex') this.isAttentionGzh = false
        // 文章详情页  非会员促开通弹出
        const isAuthDkProOnce = this.$storage.get('isAuthDkProOnce')
        if (isAuthDkProOnce) {
          this._getIsSubcribePro(text)
        } else {
          const isAuthDP = await isAuthDkpro({ token: this.token })
          if (isAuthDP.isAuth) {
            this.$storage.set('isAuthDkProOnce', true)
            this._getIsSubcribePro(text)
          } else {
            this._getOuthJywOrBx()
          }
        }
      } else {
        if (text === 'fair_index') this._isShowPrivacy()
        if (text === 'mine') {
          // 判断是否授权保险or家园网
          // this.dialogContent()
          this._getBxOrJyw()
        }
        if (text === 'home' && this.noRoleId && !this.isPopGzh) {
          this._showPopisSelfCom()
        }
        if (text === 'train') {
          this.popMainImg =
            'https://zfile.bxwh002.cn/Public/default/images/vas_concat_bg.jpg'
        }
        if (text === 'connection') {
          this.popMainImg =
            'https://zfile.bxwh002.cn/Public/default/images/rm_attention_bg_new5.png'
        }
        console.warn('不显示公众号弹窗')
      }
    },
    // 获取弹窗内容
    async _getIsSubcribePro(text) {
      const isSubPro = await isSubcribePro({ token: this.token, vid: this.vid })
      this.alreadyGetSubs = true
      if (isSubPro.data === 1) {
        this.isPopGzh = false
        if (text === 'home' && this.noRoleId) this._showPopisSelfCom()
        // if (text === 'newsIndex' && this.noRoleId) this._showPopisSelfCom()
      } else if (isSubPro.data === 2) {
        if (text !== 'train') {
          const subImage = isSubPro.sub_image
          this.popMainImg = subImage
        } else {
          const subImage2 = isSubPro.sub_image2
          this.popMainImg = subImage2
        }
        if (text !== 'newsIndex' && text !== 'train') this.isPopGzh = true
      } else {
        console.warn(isSubPro)
      }
    },
    // 去授权
    _getOuthJywOrBx() {
      const url = encodeURIComponent(location.href)
      location.href = `${
        base.xcx
      }/NewVisitor/authDkpro?redirect_url=${url}&token=${this.token}&vid=${
        this.vid
      }`
    }
  }
}
