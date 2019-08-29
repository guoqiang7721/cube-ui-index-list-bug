<template>
  <!-- 交流群 -->
  <div class="chat_group" v-if="isGroupShow || isVoteId">
    <p class="title">
      <span v-if="oUserInfo.qcname && !isGeneralCard && !isVoteId">
        {{ oUserInfo.qcname }}
      </span>
      <span v-else> {{ oUserInfo.brand }}品牌事业交流群 </span>
    </p>
    <div class="tip" v-if="!oUserInfo.qc_url && isSelf">
      <div class="tip-l">温馨提示</div>
      <div class="tip-r">
        <span
          >下方二维码，<span class="tip-r-text">仅本人可见</span
          >，欢迎加群交流！</span
        >
      </div>
    </div>
    <div class="bg_container">
      <div class="bg-filter">
        <img
          src="https://zfile.bxwh002.cn/img/default/news_detail_bg.jpg"
          alt=""
        />
      </div>
      <div class="bg-inner">
        <div class="top">
          <img
            class="chat_icon"
            src="https://zfile.bxwh002.cn/img/default/news_chat_icon.png"
            alt=""
          />
          <span v-if="oUserInfo.qcname && !isGeneralCard && !isVoteId">
            {{ oUserInfo.qcname }}
          </span>
          <span v-else> {{ oUserInfo.brand }}全国事业交流群 </span>
        </div>
        <div class="ewm" v-if="!isGeneralCard || !isVoteId">
          <img
            :src="ewmImage"
            v-if="ewmImage"
            class="sign_pic"
            @click="magnifyQcode"
            alt=""
          />
          <!-- 用户尚未上传群营销二维码 且getErImages接口未返回 -->
          <div class="m-bg" v-else @click="_handleNoUpNoErImg">
            <img
              src="https://zfile.bxwh002.cn/img/default/news_icon_group.png"
              alt=""
            />
          </div>
          <!-- 开通后显示icon -->
          <div
            class="m-bg"
            v-if="oUserInfo.roleId === '1' && oUserInfo.qc_url"
            @click="_handleCommonHasQcUrl"
          >
            <img
              src="https://zfile.bxwh002.cn/img/default/news_icon_lock.png"
              alt=""
            />
          </div>
          <!-- 用户尚未上传群营销二维码 且getErImages接口有返回 -->
          <img
            class="setTextIcon"
            v-if="!oUserInfo.qc_url"
            @click="_handleNoUpHasGetErImg"
            src="https://zfile.bxwh002.cn/img/default/news_icon_uploadText.png"
          />
        </div>
        <div class="ewm" v-else>
          <img
            :src="isGeneralEwmImage"
            @click="magnifyQcode"
            class="sign_pic"
            alt=""
          />
        </div>
      </div>
      <h5>
        该群仅限今日开放，仅剩<span>{{ randomNum }}</span
        >个名额
      </h5>
      <!-- 放大图片 -->
      <big-img
        v-if="showImg"
        @hideViewImg="hideViewImg"
        :imgSrc="imgSrc"
      ></big-img>
    </div>
  </div>
</template>
<script>
import BigImg from 'base/big_img/big_img.vue'
const HandleNoUpNoErImg = 'handleNoUpNoErImg'
const HandleCommonHasQcUrl = 'handleCommonHasQcUrl'
const HandleNoUpHasGetErImg = 'handleNoUpHasGetErImg'
export default {
  data() {
    return {
      showImg: false, // 默认不显示放大二维码
      imgSrc: '' // 放大二维码路径
    }
  },
  methods: {
    hideViewImg() {
      this.showImg = false
    },
    // 放大群二维码
    magnifyQcode(e) {
      // this.imgSrc = e.target.currentSrc
      // this.showImg = true
    },
    // 用户尚未上传群营销二维码 且getErImages接口未返回
    _handleNoUpNoErImg() {
      this.$emit(HandleNoUpNoErImg)
    },
    // 用户已经上传二维码(非会员)
    _handleCommonHasQcUrl() {
      this.$emit(HandleCommonHasQcUrl)
    },
    // 用户尚未上传群营销二维码 且getErImages接口有返回
    _handleNoUpHasGetErImg() {
      this.$emit(HandleNoUpHasGetErImg)
    }
  },
  props: {
    isSelfChatShow: {
      type: Boolean
    },
    oUserInfo: {
      type: Object
    },
    ewmImage: {
      type: String
    },
    randomNum: {
      type: Number
    },
    isSelf: {
      type: Boolean
    },
    isGroupShow: {
      type: Boolean
    },
    isGeneralCard: {
      type: Boolean
    },
    isVoteId: {
      type: Boolean
    },
    isGeneralEwmImage: {
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
.chat_group
  overflow hidden
  width 100%
  margin 20px auto 0
  .title
    font-size 18px
    letter-spacing 1px
    color #ff8f2f
    line-height 30px
    padding-left 15px
  .tip
    margin 12px auto 5px
    width 340px
    height 29px
    line-height 29px
    background-color #fff7f0
    border-radius 3px
    // border: solid 1px #ff8f2f;
    color #fff
    display flex
    align-items center
    .tip-l
      width 70px
      height 29px
      background-color #ffa85e
      text-align center
      font-size 13px
      border-radius 3px
    .tip-r
      width 270px
      height 29px
      background-color #fff7f0
      font-size 13px
      text-align center
      color #df5e00
      .tip-r-text
        font-size 15px
        color #df5e00
  .bg_container
    width 100%
    position relative
    margin-top 10px
    height 331px
    flex_column()
    justify-content center
    align-items center
    .bg-filter
      width 100%
      height 100%
      position absolute
      left 0
      top 0
      z-index 1
      -webkit-filter blur(2px)
      filter blur(2px)
      img
        width 100%
        height 100%
    .bg-inner
      width 210.5px
      padding 13px 0 20px
      position relative
      z-index 2
      background-color #ffffff
      border-radius 6px
      .top
        display flex
        align-items center
        .chat_icon
          width 34px
          height 34px
          margin 0 13.5px
        span
          font-size 15px
          letter-spacing 1px
          line-height 22px
          color #333333
      .ewm
        width 170px
        height 170px
        margin 15px auto 0
        position relative
        .setTextIcon
          position absolute
          width 91.5px
          height auto
          top -30px
          left auto
          right -95px
        .m-bg
          width 100%
          height 100%
          background-color rgba(255, 255, 255, 0.74)
          position absolute
          z-index 2
          left 0
          top 0
          img
            width 100%
            height 100%
            position absolute
            left 0
            top 0
        .sign_pic
          width 100%
          height 100%
    h5
      position relative
      z-index 2
      margin-top 15px
      font-weight bold
      font-size 12px
      letter-spacing 1px
      color #ffffff
      span
        color #ffe63d
</style>
