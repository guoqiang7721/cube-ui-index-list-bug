<template>
  <div>
    <div
      class="pay_outer"
      @click="chooseMem(item.id)"
      v-for="item in memberList"
      :key="item.id"
    >
      <div class="pay_container">
        <div :class="{ activeClass: item.id === memberChooseId }"></div>
        <div class="pay_container_top">
          <div class="sum">
            <div class="sum-left">
              <span class="left">{{ item.comment }}</span>
              <p class="end-text" v-if="item.recommend === '1'">专属旺运事业风火轮光环</p>
            </div>
            <span class="right">{{ item.price }}<span>元</span></span>
          </div>
          <div class="orignal">
            <span class="left">原价：{{ item.original_price }}</span>
            <span class="right"
              ><span>{{ item.original_price - item.price }}元</span>已抵扣</span
            >
          </div>
        </div>
        <div class="pay_container_bot" v-if="item.recommend === '1'">
          每天前50名限送200元话费
        </div>
        <div class="pay_container_bot" v-else></div>
      </div>
    </div>
    <!-- 新增支付方式 -->
    <div class='s_container'>
      <div class='s_title'>
        <i class='s_line'></i>
        <p>选择支付方式</p>
      </div>
      <ul>
        <li
          v-for="item in payWayList"
          :key="item.id"
          @click="choosePayWay(item.id)"
          >
          <i :class="item.icon"></i>
          <p>{{item.pay_text}}</p>
          <i class="icongouxuan" v-if="payId === item.id"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      payWayList: [
        {
          icon: 'iconz-weixin',
          pay_text: '微信支付',
          id: 2
        },
        {
          icon: 'iconz-alipay',
          pay_text: '支付宝支付',
          id: 1
        },
        {
          icon: 'iconlianxikefukaitong',
          pay_text: '联系客服支付',
          id: 0
        }
      ]
    }
  },
  props: {
    memberList: {
      type: Array
    },
    memberChooseId: {
      type: String
    },
    payId: {
      type: Number
    }
  },
  methods: {
    chooseMem (i) {
      this.$emit('chooseMem', i)
    },
    choosePayWay (i) {
      this.$emit('choosePayWay', i)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.activeClass
  position: absolute;
  // left: -6.5px;
  // top:-7.5px;
  // width: 360px;
  // height: 104px;
  // bg_image('https://zfile.bxwh002.cn/img/default/pay_active_border_spring.png')
  width: 350px;
  height: 92px;
  left: -1px;
  top:-1px;
  bg_image('https://zfile.bxwh002.cn/img/default/pay_active_border.png')
.pay_outer
  width: 100%;
  bgc(#fff)
  padding-bottom: 10px
  .pay_container
    width: 347px;
    margin: 0 auto;
    bgc(#fff)
    border-radius: 5px;
    border: solid 1px #d4d4d4;
    position: relative;
    .pay_container_top
      width: 100%
      .sum
        height: 40px;
        padding: 0 4px;
        flex_row()
        justify-content space-around
        .sum-left
          // display: inline-block;
          width: 67%;
          flex_column()
          // height: 36px;
          // margin-top: 2px;
          .left
            font-size: 15px;
            // line-height 18px
            margin-top 8px
            color: #333;
          .end-text
            margin-top  5px
            font-size: 11px;
            line-height 11px
            color: #e84620;
        .right
            // float: right;
            font-size: 23px;
            // margin-right 11.5px;
            color: #e84620;
            margin-top: 10px;
            text
               font-size: 15.5px;
      .orignal
        height: 25px;
        line-height: 25px;
        padding: 0 12px;
        .left
          float: left;
          font-size: 12px;
          color: #999;
          text-decoration: line-through
        .right
          float: right;
          font-size: 12px;
          color: #999;
          text
            color: #e84620;
    .pay_container_bot
        width: 100%;
        height: 24px;
        line-height: 24px;
        background-color: #fff8f3;
        color: #ff6009;
        font-size: 13px;
        text-align: center;
        border-radius:  0 0 5px 5px
//支付方式
.s_container
  width:100%;
  margin:0px auto 0
  background-color: #fff
  // border-radius: 4px;
  padding:12px 0 16px 0
  box-sizing:border-box;
  .s_title
    margin-left 15px
    font-size: 15px;
    line-height: 22px;
    color: #333
    flex_row()
    align-items center
    .s_line
      width: 4px;
      height: 15px;
      background-color: #ffb125;
      color #ffb125
    p
      margin-left 10px
  ul
    margin-top 15px
    padding 0 15px
    flex_row()
    justify-content space-between
    overflow hidden
    li
      width 105px
      padding 10px 0px
      bd(#d6d6d6)
      bd_r(10px)
      font-size 14px
      color #333
      flex_column()
      align-items center
      position relative
      box-sizing border-box
      p
        margin-top 10px
        font-size 13px
      i
        font-size 32px
        &.iconz-weixin
            color #4fce62
        &.iconz-alipay
            color #01aaef
        &.iconlianxikefukaitong
            color #ff9b25
        &.icongouxuan
            position absolute
            right 0
            bottom -2px
            color #ff9d62
</style>
