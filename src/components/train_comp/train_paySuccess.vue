<template>
  <div>
     <header-com :title="title" @back="back" />
     <img src="https://zfile.bxwh002.cn/wmp/images/chenggong_pic.png" class='need_pay_pic'>
     <div class='congra_text'>
        <span class='info_name'>恭喜你，{{vUserInfo.name}}</span>
        <span class='info_title'>您已成功开通直通车！</span>
        <span class='info_wait'>接下来，您的直通车专属客服会与您联系！请您耐心等待！请您确保电话畅通，或者留意微信。</span>
      </div>
     <div class='btn_container'>
        <button @click='_concat'>联系客服</button>
        <button @click='_openOtherCity'>开通其他城市</button>
     </div>
     <pop-img
      :popMainImg="popMainImg"
      v-if="isPopGzh"
      @closePopMask="_closePopGzh"
    />
      <pop-img
      :popMainImg="popPacket"
      v-if="isPopPacket"
      @closePopMask="closePopIcon"
      :popClose="popPacketClose"
      @closePopIcon="closePopIcon"
      :cnameC="cnameP"
    />
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import popImg from 'base/pop_img/pop_img'
import attention from 'common/js/mixins/attention'
export default {
  mixins: [vuexData, routings, attention],
  data () {
    return {
      title: '直通车',
      popPacket: 'https://zfile.bxwh002.cn/img/default/train_packet_200.png', // 红包弹窗图片
      isPopPacket: false, // 红包弹窗默认关闭
      popPacketClose: true, // 红包显示关闭按钮
      cnameP: 'cnameP'
    }
  },
  created () {
    this._getPopComp('train') // 获取公众号弹窗显示
  },
  methods: {
    // 联系客服
    _concat () {
      this.isPopGzh = true
    },
    // 关闭公众号弹窗
    _closePopGzh () {
      this.isPopGzh = false
    },
    // 关闭红包弹窗
    closePopIcon () {
      this.isPopPacket = false
    },
    // 开通其他城市
    _openOtherCity () {
      this.goNext('/train/city')
    },
    back () {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    popImg
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
>>>.cnameP
  width 255px !important
  height 303px !important
.need_pay_pic
  display: block;
  width:97px;
  height 120px
  margin:80px auto 0
.congra_text
  width:94%;
  height:169px;
  margin:39px auto 0
  .info_name
    display: block;
    width:90%;
    margin:0 auto;
    font-size: 17px;
    line-height: 55px;
    color: #ff7437;
  .info_title
    display: block;
    width:90%;
    margin:0 auto;
    font-size: 21px;
    line-height: 25px;
    color: #333
    text-align: center;
  .info_wait
    display: block;
    width:90%;
    margin:14px auto 0
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
    &:first-child
      color: #ff7531;
      border: solid 1px #ff8428;
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
