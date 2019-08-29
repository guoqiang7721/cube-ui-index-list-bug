<template>
  <transition name="slide">
    <div class="card_box">
      <header-com :title="title" @back="back" />
      <div class="seen_box">
      <div class="seen">
        <span class="syst">银行卡号</span>
        <div class="seen_right">
          <input
            type="number"
            v-model="bankInfo.cardsn"
            maxlength="19"
            placeholder="请输入银行卡号"
            class="choose"
          />
        </div>
      </div>
        <div class='seen'>
        <span class='syst'>持卡人</span>
        <div class='seen_right'>
        <input placeholder='请输入持卡人姓名' v-model="bankInfo.name"  class='choose'>
        </div>
      </div>
      <div class='seen' style='border-bottom:none'>
        <span class='syst'>联系号码</span>
        <div class='seen_right'>
        <input type='number' v-model="bankInfo.tel" maxlength='11' placeholder='请输入手机号' class='choose'>
        </div>
      </div>
      <cube-button class="btn" @click="save" form-type="submit"  :primary="true">确认绑定</cube-button>
      </div>
    </div>
  </transition>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { popToast } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData],
  data () {
    return {
      title: '银行卡',
      bankInfo: {
        cardsn: '',
        name: '',
        tel: '',
        cardId: ''
      }
    }
  },
  activated () {
    // console.log(this.vBankInfo,this.bankInfo)
    this.bankInfo = Object.assign({}, this.vBankInfo)
  },
  methods: {
    save () {
      if (!this.bankInfo.cardsn || this.bankInfo.cardsn.length < 15) {
        const popToastObj = {
          _this: this,
          txt: '请正确输入银行卡号',
          mask: true
        }
        popToast(popToastObj)
        return false
      }
      if (!this.bankInfo.name || this.bankInfo.name.trim() === '') {
        const popToastObj = {
          _this: this,
          txt: '持卡人不能为空',
          mask: true
        }
        popToast(popToastObj)
        return false
      }
      if (!this.bankInfo.tel || this.bankInfo.tel.length !== 11) {
        const popToastObj = {
          _this: this,
          txt: '请正确输入手机号码',
          mask: true
        }
        popToast(popToastObj)
        return false
      }
      if (this.vBankInfo.cardsn) { // 修改银行卡
        this.updateBankCard()
      } else { // 添加银行卡
        this.addBankCard()
      }
    },
    // 更新bankcard
    updateBankCard () {
      var _this = this
      this.$api.promote.updateBankCard({
        vid: _this.vid,
        token: _this.token,
        cardsn: _this.bankInfo.cardsn,
        name: _this.bankInfo.name,
        tel: _this.bankInfo.tel,
        cardId: _this.bankInfo.cardId
      }).then(res => {
        const msg = res.data.msg
        const errCode = res.data.errCode
        const popToastObj = {
          _this: this,
          txt: msg,
          mask: true
        }
        popToast(popToastObj)
        if (errCode === 0) {
          const timer = setTimeout(() => {
            _this.goNext('/promote')
          }, 1500)
          this.$once('hook:beforeDestroy', () => {
            clearTimeout(timer)
          })
        }
      })
    },
    // 新增bankcard
    addBankCard () {
      var _this = this
      this.$api.promote.addBankCard({
        vid: _this.vid,
        token: _this.token,
        cardsn: _this.bankInfo.cardsn,
        name: _this.bankInfo.name,
        tel: _this.bankInfo.tel
      }).then(res => {
        const msg = res.data.msg
        const popToastObj = {
          _this: this,
          txt: msg,
          mask: true
        }
        popToast(popToastObj)
        if (res.data.errCode === 0) {
          const timer = setTimeout(() => {
            _this.goNext('/promote')
          }, 1500)
          this.$once('hook:beforeDestroy', () => {
            clearTimeout(timer)
          })
        }
      })
    },
    back () {
      this.goBack()
    }
  },
  components: {
    HeaderCom
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
body,html{
  width 100%
  height 100%
}
.card_box {
  height 100%
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .seen_box{
    margin-top 58px
  }
  .seen {
    width: 100%;
    background: #fff;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:first-child{
      margin-top:44px
    }
  }

  .seen .syst {
    width: 23%;
    margin-left: 3%;
  }

  .seen .seen_right {
    width: 74%;
    height 100%
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .seen .seen_right .choose {
    width: 90%;
    height 70%
  }
  .btn{
    btn(338px,40px,18px,'',$color-text,5px)
    margin 30px auto 0
    bg_linear()
  }
}
</style>
