<template>
  <div :style="audioTopCls">
    <div class="audio_container">
      <button class="btn">爆客电台</button>
      <img class="line" :src="isAnimateLine" alt="" />
      <div class="main">
        <img :src="htmlData.cover" alt="" />
        <p>
          <i class="iconbofangliang1"></i>
          <span>{{ htmlData.views }}</span>
        </p>
      </div>
      <p class="title">{{ htmlData.title }}</p>
      <div id="textaudio1" style="height:auto;width:100%"></div>
      <p class="icon_list">
        <i class="iconshangyishou" @click="prev"></i>
        <i :class="playIcon" @click="_togglePlaying"></i>
        <i class="iconxiayishou" @click="next"></i>
      </p>
    </div>
    <!-- <audio ref="audio" autoplay loop id="audio" /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRotate: true,
      currentTime: 0,
      radius: 32
    }
  },
  computed: {
    isRotateCls() {
      return this.isRotate ? 'music-rotate' : 'music_pause'
    },
    isAnimateLine() {
      return this.isRotate
        ? 'https://zfile.bxwh002.cn/img/default/audio_animate.gif'
        : 'https://zfile.bxwh002.cn/img/default/audio_static.png'
    },
    playIcon() {
      return this.isRotate ? 'iconzanting' : 'iconbofang'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  mounted() {},
  methods: {
    ready() {
      clearTimeout(this.timer)
      // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
      this.songReady = true
    },
    paused() {},
    error() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    format(interval) {
      interval = interval | 0
      const minute = (interval / 60) | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    end() {
      this.currentTime = 0
      this.next()
    },
    prev() {
      this.isRotate = true
      this.$emit('prev')
    },
    next() {
      this.isRotate = true
      this.$emit('next')
    },
    onProgressBarChanging(percent) {
      this.currentTime = this.currentSong.duration * percent
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.currentTime = this.$refs.audio.currentTime = currentTime
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    _getPlay() {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.src = this.htmlData.vcode
        audio.play()
        // }
      })
    },
    // 暂停 播放
    _togglePlaying() {
      const wxauido = document.getElementsByClassName('wx-audio-content')[1]
      console.warn(wxauido)
      this.isRotate = !this.isRotate
      this.isRotate ? wxauido.play() : wxauido.pause()
      // WxAudio.audioPause() // 暂停
      // const audio = this.$refs.audio
      // this.isRotate = !this.isRotate
      // this.isRotate ? audio.play() : audio.pause()
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  },
  props: {
    htmlData: {
      type: Object,
      default: null
    },
    oUserInfo: {
      type: Object
    },
    isAudioPlayInfo: {
      type: String
    },
    audioTopCls: {
      type: String
    },
    isAuidoPlay: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
>>>.wx-audio-right
  padding-left 0
>>>.wx-audio-left
  display none
>>>.wx-audio-title
  display none
>>>.wx-audio-disc
  display none
>>>.wx-audio-origin
  background-color #FF9424 !important
>>>.current-t
  color #FF7F1E !important
>>>.wx-voice-p
  background-color #FF9424 !important
.music-rotate
  animation _rotate_ 2.8s linear infinite
.music_pause
  animation-play-state paused !important
.progress-wrapper
  display flex
  align-items center
  // width: 100%
  margin 0px auto
  padding 10px 5%
  .time
    color $color-text
    font-size $font-size-small
    flex 0 0 30px
    line-height 30px
    width 30px
    &.time-l
      text-align left
      color #ff7f1e
    &.time-r
      text-align right
      color #999
  .progress-bar-wrapper
    flex 1
.audio_container
  // padding-top 10px
  width 100%
  // height 230.5px
  height 255px
  bg_image('https://zfile.bxwh002.cn/img/default/audio_bg.png')
  position relative
  flex_column()
  justify-content center
  align-items center
  .btn
    position absolute
    left 0
    top 22.5px
    height 18px
    padding 0 5px
    font-size 11px
    color #fff
    background-image linear-gradient(
      90deg,
      #ff7e1e 0%,
      #ff9725 100%
    )
    border-radius 0px 2px 2px 0px
  .line
    position absolute
    width 100%
    height 78px
    bottom 30%
    left 0
  .main
    width 115px
    height 115px
    position relative
    border-radius 2px
    img
      width 100%
      height 100%
      -webkit-box-reflect below 5px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.2)))
    p
      flex_row()
      align-items center
      position absolute
      right 5px
      bottom 5px
      i
        margin-right 5px
        font-size 10px
      span
        font-size 12px
        color #fff
  .title
    position relative
    two_txt_cut()
    line-height 22px
    letter-spacing 1px
    color #fff
    font-size 16px
    padding 0 5%
    margin 15px auto 5px
  .icon_list
    margin-top 10px
    flex_row()
    align-items center
    width 75%
    justify-content space-between
</style>
