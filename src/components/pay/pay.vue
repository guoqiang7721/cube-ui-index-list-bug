<template>
  <div>
    <header-com :title="headerTitle" @back="back" :isHide="true" />
    <pay-head :vUserInfo="vUserInfo" :pro_day="pro_day" :isFirst="isFirst" />
    <pay-main
      :memberList="memberList"
      :memberChooseId="memberChooseId"
      :payId="payId"
      @chooseMem="_chooseMem"
      @choosePayWay="_choosePayWay"
    />
    <pay-icon />
    <pay-text :payId="payId" />
    <cube-button
      class="btn_mem"
      @click="openMem"
      :primary="true"
      v-if="payId !== 0"
    >
      {{ openMemText }}
    </cube-button>
    <!-- 挽留弹窗 -->
    <dialog-img
      :cname="payCls"
      :cname_animate="payAnimate"
      v-if="isPayWaiting"
      @closePop="refuseBack"
    >
      <template v-slot:mainImg>
        <img
          class="pay_tip_img"
          src="https://zfile.bxwh002.cn/img/default/pay_tip_wait.jpg"
          alt=""
        />
        <div class="pay_tip_text">
          <span class="active">
            95.3%
          </span>
          <span>
            的{{ vUserInfo.brand }}老师开通了{{ vUserInfo.brand }}微名片，拓展{{
              vUserInfo.brand
            }}
          </span>
          <span class="active">
            事业效率平均提升了7.26倍
          </span>
        </div>
        <div class="btnCls">
          <cube-button class="btn_left" @click="refuseBack" :primary="true">
            残忍离去
          </cube-button>
          <cube-button class="btn_right" @click="openMem" :primary="true">
            为了事业花点小钱，值
          </cube-button>
        </div>
      </template>
    </dialog-img>
    <!--联系客服支付弹窗  -->
    <transition
      name="popSer_transition"
      enter-active-class="animated fadeIn animation_time_mid_"
      leave-active-class="animated fadeOut animation_time_mid_"
    >
      <dialog-img
        :cname="serverPayCls"
        v-if="isServerPay"
        @closePop="closeServerPay"
      >
        <template v-slot:mainImg>
          <img :src="serverEwm" class="ewm" alt="" />
          <button>长按识别二维码添加客服开通</button>
          <p>
            注意：<br />添加客服开通可能不会那么及时，建议自己通过微信支付直接开通
          </p>
        </template>
      </dialog-img>
    </transition>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import payHead from 'components/pay_comp/pay_header'
import payMain from 'components/pay_comp/pay_main'
import payIcon from 'components/pay_comp/pay_intro_icon'
import payText from 'components/pay_comp/pay_intro_text'
import base from 'request/api/base'
import dialogImg from 'base/dialog/dialogImg'
import { getSales } from 'common/js/getCommonInfo'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      payCls: 'payCls', // 挽留弹窗cls
      serverPayCls: 'serverPayCls', // 联系客服支付弹窗cls
      memberList: [], // 价格列表
      memberChooseId: '-1', // 未选择ID def
      pro_day: 0, // 推广天数 def
      isPayWaiting: false, // 挽留弹窗
      payId: 2, // 支付方式
      isServerPay: false, // 联系客服支付弹窗展开
      serverEwm: '', // 服务二维码
      isFirstClsId: 0, // 默认首个选中Id  光环
      isFirst: false // 默认首个选中boollean 光环
    }
  },
  computed: {
    headerTitle() {
      return this.vUserInfo.brand
    },
    // 计算开通 or 续费
    openMemText() {
      return this.vUserInfo.roleId === '1' ? '去开通' : ' 去续费'
    },
    // 判断是否正式会员
    isRoleId() {
      return this.vUserInfo.roleId === '2'
    },
    payAnimate() {
      // return 'animated pulse infinite slower'
      return ''
    }
  },
  created() {
    this.isDelond = true
  },
  destroyed() {
    if (!this.isRoleId) {
      window.removeEventListener('popstate', this.isDefBack, false) // false阻止默认事件
    }
  },
  async mounted() {
    document.documentElement.scrollTop = 0
    await this.newGetPriceList()
  },
  activated() {
    var _this = this
    this.isPayWaiting = false
    _this.payId = 2 // 支付方式 def wechat
    if (window.history && window.history.pushState && !this.isPayWaiting) {
      if (!this.isRoleId) {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.isDefBack, false) // false阻止默认事件
      }
    }
  },
  methods: {
    isDefBack() {
      this.isPayWaiting = true
    },
    // 开通会员类别
    _chooseMem(i) {
      this.memberChooseId = i
      this.isFirst = i === this.isFirstClsId // 光环选中
    },
    // 支付方式
    async _choosePayWay(i) {
      this.payId = i
      this.isServerPay = i === 0
      if (i === 0) {
        const { kf_img: serverEwm } = await getSales({
          token: this.token,
          vid: this.vid
        })
        this.serverEwm = serverEwm
      }
    },
    // 开通会员
    openMem() {
      this.createOrder()
    },
    // 创建订单
    createOrder() {
      var _this = this
      this.$api.pay
        .createOrder({
          vid: _this.vid,
          token: _this.token,
          h5: 1,
          payment_id: this.memberChooseId,
          payment: this.payId
        })
        .then(res => {
          const data = res.data.data
          const ordesn = data.order_sn
          let url
          if (this.payId === 2) {
            // 微信支付
            url = `${base.pay}/pay/go?o=${ordesn}`
          } else {
            // 支付宝支付
            url = `${base.pay}/pay/go_zfb?o=${ordesn}`
          }
          window.location.href = url
        })
    },
    // 获取价格列表
    newGetPriceList() {
      var _this = this
      this.$api.pay
        .newGetPriceList({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          this.memberList = data
          let memberId = data.filter(item => item.recommend === '1')
          this.memberChooseId = memberId[0].id
          this.isFirstClsId = memberId[0].id // 默认第一个选中id
          this.isFirst = true
        })
    },
    // 获取推广天数
    getGivenDays() {
      var _this = this
      this.$api.pay
        .getGivenDays({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          this.pro_day = data
        })
    },
    back() {
      if (this.isRoleId) {
        this.goBack()
      } else {
        this.isPayWaiting = true
      }
    },
    // 关闭联系客服开通弹窗
    closeServerPay() {
      this.isServerPay = false
    },
    refuseBack() {
      this.isPayWaiting = false
      this.goBack()
    },
    // 返回操作
    pushHistory() {
      let state = {
        title: 'title',
        url: '#'
      }
      window.history.pushState(state, state.title, state.url)
    },
    // bef Mounted
    isBefM() {
      document.documentElement.scrollTop = 0
      this.newGetPriceList()
      var _this = this
      // bef
      this.pushHistory()
      window.addEventListener(
        'popstate',
        function(e) {
          if (!_this.isPushHistory) {
            _this.isPushHistory = true
            _this.back()
          }
        },
        false
      )
      // new
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.isDefBack, false) // false阻止默认事件
      }
    }
  },
  components: {
    HeaderCom,
    payHead,
    payMain,
    payIcon,
    payText,
    dialogImg
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
>>>.payCls
  width 282px
  overflow hidden
  left 50%
  top 25%
  margin-left -141px
  color #fff
  bd_r(8px)
  img
    width 100%
    height 73px
  .pay_tip_text
    margin-top -5px
    bgc(#fff)
    padding 20px 10px 15px
    color #333
    font-size 15px
    line-height 25px
    letter-spacing 1px
    .active
      font-weight bold
      color #ff9624
  .btnCls
    bgc(#fff)
    overflow hidden
    width 100%
    height 55px
    flex_row()
    justify-content space-around
    .cube-btn
      height 40px
      border-radius 4px
      font-size 13px
      padding 0
      &.btn_left
        width 30%
        bgc(#e6e6e6)
        color #666
      &.btn_right
        width 58%
// 联系客服弹窗
>>>.serverPayCls
  width 224px
  padding-top 25px
  overflow hidden
  bgc(#fff)
  left 50%
  top 25%
  margin-left -112px
  color #fff
  bd_r(8px)
  flex_column()
  align-items center
  .ewm
    width 175px
    height 175px
    margin 0 auto
  button
    // width: 175px;
    padding 0 10px
    height 23px
    font-size 12px
    bg_linear()
    border-radius 11.5px
    margin 15px auto
    letter-spacing 1px
    color #fff
  p
    width 195px
    border-top 1px dotted #ff7e38
    padding 10px 5px
    font-size 11px
    color #ff7e38
    line-height 22px
    position relative
.btn_mem
  position fixed
  bottom 0
  z-index 3
  height 44px
  padding 0
  border-radius 0
  bg_linear()
</style>
