<template>
  <div class="pro_container">
    <header-com :title="title" @back="back" />
    <p-header :walletInfo="walletInfo" />
    <split />
    <!-- <p-data  :proInfo="proInfo" /> -->
    <split />
    <p-bank :bankInfo="bankInfo" />
    <split />
    <p-input
      :walletInfo="walletInfo"
      :bankInfo="bankInfo"
      @getWithdraw="_getWithdraw"
    />
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import pHeader from 'components/promote_comp/pro_header'
// import pData from 'components/promote_comp/pro_data'
import pBank from 'components/promote_comp/pro_bank'
import pInput from 'components/promote_comp/pro_input'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import Split from 'base/split/split'
import { popToast } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      title: '我的钱包',
      totalNum: {}, // 全部数据
      walletInfo: {}, // 个人账户数据
      proInfo: {}, // 推荐创建人数
      bankInfo: {} // 银行卡信息
    }
  },
  components: {
    HeaderCom,
    pHeader,
    // pData,
    Split,
    pBank,
    pInput
  },
  activated() {
    this.getPro()
  },
  methods: {
    // 获取 数据
    getPro() {
      var _this = this
      this.$api.promote
        .getPro({
          vid: _this.vid,
          token: _this.token
        })
        .then(
          res => {
            const data = res.data.data
            this.totalNum = data
            this.walletInfo = data.walletInfo
            this.proInfo = data.proInfo
            this.bankInfo = data.bankInfo
          },
          err => {
            console.log('err', err)
          }
        )
    },
    // 提现
    _getWithdraw(withdraw) {
      var _this = this
      this.$api.promote
        .withdraw({
          vid: _this.vid,
          token: _this.token,
          tel: _this.bankInfo.tel,
          name: _this.bankInfo.name,
          cardsn: _this.bankInfo.cardsn,
          amount: withdraw
        })
        .then(res => {
          const msg = res.data.msg
          const popToastObj = {
            _this: this,
            txt: msg,
            mask: true
          }
          popToast(popToastObj)
          const errCode = res.data.errCode
          if (errCode === 0) {
            //
            const popToastObj = {
              _this: this,
              txt: '提现成功',
              mask: true
            }
            popToast(popToastObj)
            _this.getPro()
          }
        })
    },
    back() {
      this.goBack()
    }
  }
}
</script>
<style lang="stylus" scoped>
.split {
  width: 100%;
  height: 10px;
}
</style>
