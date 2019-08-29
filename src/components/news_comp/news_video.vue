<template>
  <div class="videoCont" :style="audioTopCls">
    <div class="video_top">
      <iframe
        class="videoIframCls"
        frameborder="0"
        :src="isSource"
        allowFullScreen="true"
      >
      </iframe>
    </div>
    <p class="title">{{ htmlData.name }}</p>
    <div class="video_bot">
      <div class="video_bot_l">
        <button>爆客视频</button>
        <span>{{ htmlData.add_time }}</span>
      </div>
      <p class="video_bot_r">
        <i class="iconbofangliang"></i>
        <span>{{ htmlData.views }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    isSource() {
      console.warn(this.vido_type === '1')
      return this.htmlData.vido_type === '1'
        ? `https://v.qq.com/txp/iframe/player.html?vid=${this.htmlData.vcode}`
        : this.htmlData.vido_type === '2'
        ? `http://player.youku.com/embed/${this.htmlData.vcode}`
        : this.htmlData.vcode
    }
  },
  activated() {},
  created() {},
  methods: {},
  props: {
    htmlData: {
      type: Object,
      default: null
    },
    bgcover: {
      type: String
    },
    audioTopCls: {
      type: String
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.videoCont
  font-size 16px
  color #333
  bgc(#fff)
  min-height 200px
  .video_top
    width 100%
    height 200px
    position relative
    box-shadow 0px 0px 8px rgba(148, 106, 16, 0.23)
    .videoIframCls
      width 100%
      height 100%
    img
      width 100%
      height 100%
      bd_r(5px)
  .title
    padding 0 2%
    two_txt_cut()
    line-height 22px
    letter-spacing 1px
    margin 14px 0 17px 0
  .video_bot
    padding 0 2%
    flex_row()
    justify-content space-between
    .video_bot_l
      flex_row()
      align-items center
      justify-content space-between
      font-size 11px
      button
        height 18px
        padding 0 5px
        font-size 11px
        margin-right 30px
        color #fff
        background-image linear-gradient(
          0deg,
          #ff771c 0%,
          #ffcc31 100%
        )
        border-radius 2px
      span
        color #999
    .video_bot_r
      font-size 11px
      flex_row()
      align-items center
      color #999
      i
        font-size 9px
        color #ffb125
        margin 0px 5px 0 0
</style>
