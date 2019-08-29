<template>
  <!-- 底部名片 -->
  <div class="info_foot">
    <div class="info_card" @click="_gHome">他的名片</div>
    <div class="headline_bg">
      <!-- 品牌logo -->
      <!-- <img class="brand_pic" :src="oUserInfo.logo" /> -->
      <img class="brand_pic" :src="infoLogo" />
      <!-- 个人头像 -->
      <img class="head_pic" :src="oUserInfo.upic" />
      <!-- name 职位 -->
      <div class="info_msg">
        <span class="name">{{ oUserInfo.name }}</span>
        <span class="position">
          <span v-if="oUserInfo.title">
            {{ oUserInfo.title }}
          </span>
          <span v-else> {{ oUserInfo.brand }}</span>
        </span>
      </div>
    </div>
    <!-- 微信 电话展示 -->
    <div class="info_promote_box">
      <div class="wechat" @click="_copyWechat">
        <div class="info_text">
          <span>{{ wechatText }}</span>
        </div>
      </div>
      <div @click="_call">
        <div class="info_text">
          <span>{{ telText }}</span>
        </div>
      </div>
    </div>
    <!-- 个人签名 -->
    <div class="info_sign" v-if="oUserInfo.sign" v-text="oUserInfo.sign"></div>
    <!-- 文章底部二维码展示 -->
    <div class="ewm_all" v-if="isFootEwmshow">
      <div class="ewm_img">
        <!-- ad_pic是推广二维码 -->
        <img
          :src="oUserInfo.ad_pic"
          v-if="oUserInfo.ad_pic"
          class="sign_pic"
          alt=""
          @click="magnifyPromcode"
        />
        <!-- 非会员 -->
        <div
          class="m-bg"
          v-if="oUserInfo.roleId === '1'"
          @click="_handleCommonFootLock"
        >
          <!-- 非会员已经上传推广二维码 -->
          <img
            v-if="oUserInfo.ad_pic"
            src="https://zfile.bxwh002.cn/img/default/news_icon_lock.png"
            alt=""
          />
          <!-- 非会员未上传推广二维码 -->
          <img
            v-else
            src="https://zfile.bxwh002.cn/img/default/news_icon_lock_set.png"
            alt=""
          />
        </div>
        <!-- 正式会员且未上传推广二维码 -->
        <div
          class="m-bg"
          v-if="oUserInfo.roleId === '2' && !oUserInfo.ad_pic"
          @click="_handleMemFootLock"
        >
          <img
            src="https://zfile.bxwh002.cn/img/default/news_icon_pro.png"
            alt=""
          />
        </div>
      </div>
      <div class="ewm_text" :style="isEwmCls">{{ add_sign }}</div>
    </div>
    <!-- 放大图片 -->
    <big-img
      v-if="showImg"
      @hideViewImg="hideViewImg"
      :imgSrc="imgSrc"
    ></big-img>
  </div>
</template>
<script>
import BigImg from 'base/big_img/big_img.vue'
const CopyWechat = 'copyWechat'
const GHOME = 'gHome'
const CALL = 'call'
const HandleCommonFootLock = 'handleCommonFootLock'
const HandleMemFootLock = 'handleMemFootLock'
export default {
  data() {
    return {
      showImg: false, // 默认不显示放大二维码
      imgSrc: '' // 放大二维码路径
    }
  },
  computed: {
    isEwmCls() {
      const len = this.add_sign.length
      return len > 12 ? 'text-align:left' : 'text-align:center'
    }
  },
  methods: {
    hideViewImg() {
      this.showImg = false
    },
    magnifyPromcode(e) {
      // this.imgSrc = e.target.currentSrc
      // this.showImg = true
    },
    _copyWechat() {
      this.$emit(CopyWechat)
    },
    _gHome() {
      this.$emit(GHOME)
    },
    _call() {
      this.$emit(CALL)
    },
    // 底部foot非会员名点击开通后
    _handleCommonFootLock() {
      this.$emit(HandleCommonFootLock)
    },
    // 底部foot会员且未上传推广二维码
    _handleMemFootLock() {
      this.$emit(HandleMemFootLock)
    }
  },
  props: {
    oUserInfo: {
      type: Object
    },
    wechatText: {
      type: String
    },
    telText: {
      type: String
    },
    add_sign: {
      type: String
    },
    isFootEwmshow: {
      type: Boolean
    },
    infoLogo: {
      type: String
    }
  },
  components: {
    BigImg
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.info_foot
  position relative
  padding 7.5px 0
  width 350px
  margin 4% auto 20px
  background-image linear-gradient(-42deg, #ff862d 0%, #ffc039 100%), linear-gradient(#fff, #fff)
  box-shadow 0px 0px 9px 0px rgba(148, 106, 16, 0.23)
  border-radius 3px
  color #fff
  .info_card
    position absolute
    top 0
    right 0
    font-size 14px
    color #fff
    text-align center
    background-image linear-gradient(-42deg, #ff8f2f 0%, #ffab35 100%), linear-gradient(#d9d9d9, #d9d9d9)
    width 77px
    height 29px
    line-height 29px
    border-radius 3px 3px 3px 10px
  .headline_bg
    width 336px
    height 87px
    margin 0 auto
    bg_image('https://zfile.bxwh002.cn/wmp/images/headline_bg.png')
    flex_row()
    align-items center
    .brand_pic
      width 97px
      height 71px
      margin-left 5%
    .head_pic
      width 51px
      height 51px
      border-radius 50%
      margin-left 6%
      margin-right 5%
  .info_msg
    flex_column()
    margin-top 5px
    .name
      font-size 16px
      color #333
      margin-bottom 5px
    .position
      font-size 11px
      color #999
  .info_promote_box
    width 100%
    height 33.5px
    margin 15px auto
    >div
      width 130.5px
      height 33.5px
      float left
      color #b3451e
      font-size 14px
      line-height 33.5px
      &:first-child
        margin-left 30.5px
        bg_image('https://zfile.bxwh002.cn/wmp/images/headline_wechat.png')
      &:last-child
        margin-right 30.5px
        float right
        bg_image('https://zfile.bxwh002.cn/wmp/images/headline_phone.png')
      .info_text
        margin-left 32.5px
        width 97.5px
        height 33.5px
        text-align center
        one_txt_cut()
  .info_sign
    margin-top 2.5px
    text-align center
    font-size 13px
    color rgba(255, 255, 255, 0.91)
  .ewm_all
    width 329px
    margin 0 auto
    border-top 1px solid rgba(255, 255, 255, 0.18)
    padding-top 17.5px
    margin-top 12.5px
    .ewm_img
      width 160px
      height 160px
      bgc(#fff)
      border solid 2px #ffd0a2
      position relative
      margin 0 auto
      .m-bg
        width 100%
        height 100%
        background-color rgba(255, 255, 255, 0.74)
        position absolute
        z-index 2
        left 0
        top 0
        img
          width 160px
          height 160px
          position absolute
          left 0
          top 0
      .sign_pic
        width 100%
        height 100%
    .ewm_text
      width 196px
      margin 25px auto 0
      padding 5px
      background rgba(255, 255, 255, 0.43)
      border-radius 3px
      font-size 16px
      color #b14818
      position relative
      white-space normal
      word-break break-all
      &:after
        content ''
        display block
        width 0
        height 0
        border-left 9px solid transparent
        border-top 9px solid transparent
        border-bottom 9px solid rgba(255, 255, 255, 0.43)
        position absolute
        left 2.5px
        top -18px
</style>
