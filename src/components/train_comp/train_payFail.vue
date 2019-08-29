<template>
  <div>
     <header-com :title="title" @back="back" />
     <img src="https://zfile.bxwh002.cn/wmp/images/daifukuan_pic.png" class='need_pay_pic'>
     <span class='tip_text'>您当前存在待付款的订单，您需要先处理该订单,才能进行其他后续操作。</span>
     <div class='btn_container'>
        <button @click='_removeOrder'>取消订单</button>
        <button @click='_pay'>立即支付</button>
     </div>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
export default {
  mixins: [vuexData, routings],
  data () {
    return {
      title: '直通车'
    }
  },
  methods: {
    // 取消订单
    _removeOrder () {
      this.cancelApply()
    },
    // 支付
    _pay () {
      this.goNext('/train/pay')
    },
    // 取消申请
    cancelApply () {
      var _this = this
      this.$api.train.cancelApply({
        vid: _this.vUserInfo.vid,
        mid: _this.vUserInfo.mid,
        token: _this.token
      }).then(res => {
        this.goBack()
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
@import '~common/stylus/mixin'
.need_pay_pic
  display: block;
  width:97px;
  height 97px
  margin:110px auto 0
.tip_text
  display: block;
  width:90%;
  margin:14px auto 0;
  font-size: 18px;
  line-height: 27.5px;
  color: #666
.btn_container
  width:94%;
  margin:39px auto 0;
  flex_row()
  justify-content space-around
  button
    width: 146px;
    height: 44px;
    border-radius:5px;
    border: solid 1px #dfdfdf;
    font-size: 16px;
    bgc(#fff)
    &:last-child
      color #fff
      background-image: linear-gradient(-76deg,
      #ff9046 0%,
      #ffac54 75%,
      #ffc762 100%),
    linear-gradient(
      #ff7437,
      #ff7437);
</style>
