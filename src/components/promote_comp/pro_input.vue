<template>
<div>
 <div class="withdraw">
    <span class="top">提现金额</span>
    <div class="center">
      <span class="article">¥</span>
      <div class="input_box">
        <input
          type="number"
          @input="change_withdraw"
          v-model="withdraw"
        />
      </div>
      <div class="all" @click="total_profit">全提</div>
    </div>
  </div>
   <p-tip />
   <cube-button class="btn" @click="_deposit"  :primary="true">立即提现</cube-button>
   <dia-log
    v-show="isDialogShow"
    :btnText="btnText"
    :popContent="popContent"
    @confirmR="_confirmR"
    @closePop="_closePop"
    />
</div>
</template>
<script>
import pTip from 'components/promote_comp/pro_tip'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import diaLog from 'base/dialog/dialog'
import { popToast, popDiaglogAlert } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData],
  data () {
    return {
      withdraw: '',
      isDialogShow: false,
      btnText: {},
      popContent: ''
    }
  },
  props: {
    walletInfo: {
      type: Object,
      default: null
    },
    bankInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    pTip,
    diaLog
  },
  methods: {
    _confirmR () {
      this.isDialogShow = false
    },
    _closePop () {
      this.isDialogShow = false
    },
    change_withdraw () {
      let walletInfo = parseFloat(this.walletInfo.balance)
      let withdraw = parseFloat(this.withdraw)
      if (withdraw >= walletInfo) {
        this.withdraw = walletInfo
      } else if (withdraw < 0) {
        this.withdraw = 0
      }
    },
    total_profit () {
      this.withdraw = this.walletInfo.balance
    },
    _deposit () {
      if (this.vUserInfo.roleId === '1') {
        // this.rolePop()
        const proEwmObj = {
          _this: this,
          content: '由于您当前尚未开通服务暂不能提现.',
          maskClosable: true,
          confirmBtnText: '去开通'
        }
        popDiaglogAlert(proEwmObj)
        return
      }
      if (!this.bankInfo) {
        const popToastObj = {
          _this: this,
          txt: '请先绑定银行卡',
          mask: true
        }
        popToast(popToastObj)
        return false
      }
      if (this.walletInfo.balance < 100 || this.withdraw < 100) {
        const popToastObj = {
          _this: this,
          txt: '最低提现额需大于100元',
          mask: true
        }
        popToast(popToastObj)
        return false
      }
      // this.getWithdraw()
      this.$emit('getWithdraw', this.withdraw)
    },
    popDiaglogAlertConfirm () {
      this.goNext('/pay')
    },
    // 会员提现弹窗
    rolePop () {
      this.popContent = '由于您当前尚未开通服务暂不能提现!'
      this.btnText = {
        l: '取消',
        r: '确定'
      }
      this.isDialogShow = true
      return false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.cube-dialog-title
  text-align: left
  line-height: 30px
  .cube-dialog-title-def
    overflow visible
.cube-dialog-btns
  border-top 1px solid #e6e6e6
.cube-btn-primary
  position fixed
  bottom 0
  z-index 3
  height 44px
  padding 0
  border-radius 0
  bg_linear()
.withdraw {
  width 100%
  background-color #fff
  padding-top: 10px;
  font-size: 14px;
  color: #666666;
  .top {
    margin-left: 20px;
  }
  .center {
    margin-top: 10px;
    padding-bottom: 15px;
    width: 100%;
    font-size: 25px;
    color: #252525;
    display: flex;
    flex-direction: row;
    align-items: center;
    .article {
      font-size: 28px;
      margin-left: 20px;
    }
    .input_box{
      margin: 0 10px;
      flex 1
      font-size 20px
      input{
        width 100%
        &::after{
          border none
        }
      }
    }
    .all {
      width 60px
      height 100%
      text-align right
      font-size: 16px;
      color: #ffc22f;
      margin-right 20px
    }
  }
}
</style>
