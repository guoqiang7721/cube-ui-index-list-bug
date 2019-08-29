<template>
  <div>
    <div class="audio_container">
      <img
        class="icon_l"
        @click="prev"
        src="./../../assets/audio_icon_left.png"
        alt=""
      />
      <div class="center">
        <img
          src="../../assets/audio_icon_center.png"
          class="bg_img"
          :class="isRotateCls"
          alt=""
        />
        <i :class="playIcon" @click="_togglePlaying"></i>
      </div>
      <img
        class="icon_r"
        @click="next"
        src="./../../assets/audio_icon_right.png"
        alt=""
      />
      <img class="line" src="./../../assets/audio_icon_bg_line.png" alt="" />
    </div>
    <p class="title">{{ htmlData.title }}</p>
    <div class="audio_bot">
      <button>爆客电台</button>
      <div class="audio_bot_r">
        <i class="iconbofangliang"></i>
        <span>{{ htmlData.views }}</span>
      </div>
    </div>
    <div class="progress-wrapper">
      <span class="time time-l">{{ format(currentTime) }}</span>
      <div class="progress-bar-wrapper">
        <progress-bar
          ref="progressBar"
          :percent="percent"
          @percentChange="onProgressBarChange"
          @percentChanging="onProgressBarChanging"
        />
      </div>
      <span class="time time-r">{{ format(currentSong.duration) }}</span>
    </div>
    <!-- <audio ref="audio" autoplay loop id="audio"/> -->
    <audio
      id="audio"
      ref="audio"
      @playing="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
      @pause="paused"
    />
  </div>
</template>
<script>
import ProgressBar from 'base/progress-bar/progress-bar'
import { ISIOS } from 'api/config'
var _this_ = this
function _MusicFunc_() {
  document.addEventListener(
    'WeixinJSBridgeReady',
    function() {
      console.log('微信环境下')
      _this_._getPlay()
    },
    false
  )
}
window.onload = function() {
  if (ISIOS) _MusicFunc_()
}
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
    playIcon() {
      return this.isRotate ? 'iconzanting' : 'iconbofang'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  created() {
    _this_ = this
    this.currentSong = 'https://zfile.bxwh002.cn/wmp/mp3/安然.mp3'
  },
  mounted() {
    if (!ISIOS) this._getPlay()
    this.$nextTick(() => {
      this.$refs.audio.src = 'https://zfile.bxwh002.cn/wmp/mp3/安然.mp3'
      const duration = document.getElementById('audio').duration
      this.$refs.audio.load()
      console.warn(this.$refs.audio)
      this.$refs.audio.oncanplay = function() {
        alert(this.$refs.audio.duration)
      }
      console.warn('this.$refs.audio', duration)
    })
  },
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
      if (!this.songReady) {
      }
    },
    next() {},
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
      console.warn('isAudioPlayInfo', this.isAudioPlayInfo)
      this.$nextTick(() => {
        // if (this.oUserInfo.music) {
        console.warn('this.oUserInfo', this.oUserInfo)
        const audio = this.$refs.audio
        // audio.src = this.oUserInfo.music
        audio.src =
          this.isAudioPlayInfo || 'https://zfile.bxwh002.cn/wmp/mp3/安然.mp3'
        audio.play()
        // }
      })
    },
    // 暂停 播放
    _togglePlaying() {
      const audio = this.$refs.audio
      this.isRotate = !this.isRotate
      this.isRotate ? audio.play() : audio.pause()
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
  components: {
    ProgressBar
  },
  watch: {
    // currentSong (newSong, oldSong) {
    //   this.songReady = false
    //   this.canLyricPlay = false
    //   this.$refs.audio.src = 'https://zfile.bxwh002.cn/wmp/mp3/安然.mp3'
    //   this.$refs.audio.play()
    //   clearTimeout(this.timer)
    //   // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
    //   this.timer = setTimeout(() => {
    //     this.songReady = true
    //   }, 5000)
    // }
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
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.music-rotate {
  animation: _rotate_ 2.8s linear infinite;
}

.music_pause {
  animation-play-state: paused !important;
}

.progress-wrapper {
  display: flex;
  align-items: center;
  // width: 100%
  margin: 0px auto;
  padding: 10px 5%;

  .time {
    color: $color-text;
    font-size: $font-size-small;
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;

    &.time-l {
      text-align: left;
      color: #ff7f1e;
    }

    &.time-r {
      text-align: right;
      color: #999;
    }
  }

  .progress-bar-wrapper {
    flex: 1;
  }
}

.audio_container {
  padding-top: 20px;
  width: 100%;
  position: relative;
  flex_row();
  align-items: center;
  justify-content: space-around;

  .icon_l, .icon_r {
    width: 47.5px;
    height: 47.5px;
  }

  .center {
    width: 122px;
    height: 122px;
    position: relative;

    .bg_img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    i {
      font-size: 30px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .line {
    position: absolute;
    width: 100%;
    height: 39px;
    bottom: 0;
    left: 0;
  }
}

.title {
  two_txt_cut();
  line-height: 22px;
  letter-spacing: 1px;
  color: #333;
  font-size: 16px;
  padding: 0 5%;
  margin: 20px auto;
}

.audio_bot {
  padding: 0 5%;
  flex_row();
  justify-content: space-between;

  button {
    height: 18px;
    padding: 0 5px;
    font-size: 11px;
    color: #fff;
    background-image: linear-gradient(
      90deg,
      #676bea 0%,
      #71c6ff 100%
    );
    border-radius: 2px;
  }

  .audio_bot_r {
    font-size: 11px;
    flex_row();
    align-items: center;
    color: #999;

    i {
      font-size: 9px;
      color: #676bea;
      margin: 0px 5px 0 0;
    }
  }
}
</style>
