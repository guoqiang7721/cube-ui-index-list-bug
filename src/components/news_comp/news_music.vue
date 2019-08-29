<template>
  <!-- 音乐 -->
  <div>
    <!-- <div class="m-music" v-if="htmlData.audio"> -->
    <div class="m-music">
      <div class="m-music-box">
        <div class="m-music-cd" :class="isRotateCls">
          <img class="logo" :src="oUserInfo.logo" alt="" />
        </div>
        <img
          class="circle"
          src="https://zfile.bxwh002.cn/Public/default/images/news_bgm_cd_circle.png"
          alt=""
        />
      </div>
      <div class="m-music-right">
        <div class="name">
          <h3>{{ htmlData.name }}</h3>
          <span>来自{{ oUserInfo.brand }}电台</span>
        </div>
        <div class="icon">
          <i :class="playIcon" @click="_togglePlaying"></i>
        </div>
      </div>
    </div>
    <audio ref="audio" autoplay loop id="audio" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRotate: true
    }
  },
  computed: {
    playIcon() {
      return this.isRotate ? 'iconzanting' : 'iconbofang'
    },
    isRotateCls() {
      return this.isRotate ? 'music-rotate' : 'music-pause'
    }
  },
  methods: {
    _togglePlaying() {
      const audio = this.$refs.audio
      this.isRotate = !this.isRotate
      this.isRotate ? audio.play() : audio.pause()
    }
  },
  props: {
    htmlData: {
      type: Object,
      default: null
    },
    oUserInfo: {
      type: Object
    }
  }
}
</script>
<style lang='stylus' scoped>
.music-rotate {
  animation: _rotate_ 1.8s linear infinite;
}

.music_pause {
  animation-play-state: paused !important;
}

.m-music {
  width: 314px;
  height: 120px;
  margin: 37.5px auto 0;
  display: flex;
  // align-items: center;
  font-size: 13px;
  letter-spacing: 2px;
  color: #666;
  overflow: hidden;
  background-image: url('https://zfile.bxwh002.cn/Public/default/images/news_bgm_bg.png');
  background-size: 100% 100%;
  position: relative;

  .m-music-box {
    position: relative;
    width: 76px;
    height: 76px;
    margin: 15px 2.5px 0 24px;

    .circle {
      position: absolute;
      width: 13px;
      height: 13px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .m-music-cd {
    width: 76px;
    height: 76px;
    background-image: url('https://zfile.bxwh002.cn/Public/default/images/news_bgm_cd.png');
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;

    .logo {
      width: 64px;
      height: 46.7px;
      margin: 6px 0 0 6px;
      border-radius: 50%;
    }
  }

  .m-music-right {
    flex: 1;
    overflow: hidden;

    .name {
      position: relative;
      margin: 10px 25px 0 0;
      overflow: hidden;

      ::after {
        z-index: 1;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 12.5px;
        height: 20px;
        background-image: linear-gradient(90deg, white 70%, rgba(255, 255, 255, 0));
      }

      h3 {
        font-size: 13px;
        line-height: 18px;
        color: #333333;
        // overflow: hidden;
        white-space: nowrap;
        // box-sizing: border-box;
        animation: _moveLeft_ 15s linear infinite;
      }

      span {
        font-size: 12px;
        color: #a5a5a5;
        display: block;
        margin: 4px auto 0;
        text-align: center;
      }
    }

    .icon {
      i {
        position: absolute;
        left: 50%;
        bottom: 25px;
        // margin: 0 auto;
      }
    }
  }
}
</style>
