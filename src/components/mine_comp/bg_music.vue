<template>
  <div class="container">
    <header-com :title="title" @back="back" />
    <div class="listBox">
      <list-base>
        <div slot="left" class="m_list_left">
          是否开启
        </div>
        <div slot="main" class="m_list_center">
          <span>是否开启背景音乐</span>
        </div>
        <div slot="right" class="m_list_right">
          <cube-switch v-model="musicSwitch" />
        </div>
      </list-base>
      <list-base>
        <div slot="left" class="m_list_left">
          自动播放
        </div>
        <div slot="main" class="m_list_center">
          <p></p>
          <span>是否自动播放背景音乐</span>
        </div>
        <div slot="right" class="m_list_right">
          <cube-switch v-model="autoSwitch" />
        </div>
      </list-base>
      <split />
      <ul class="radio_box">
        <li v-for="item in musicList" @click="chooseMusic(item)" :key="item.id">
          <span class="left">{{ item.name }}</span>
          <i
            :class="activeId == item.id ? 'icon-radioactive' : 'icon-radio'"
            class="iconradio"
          ></i>
        </li>
      </ul>
      <div style="height:60px"></div>
    </div>
    <div class="saveBtn" @click="updateMusic">保存</div>
    <audio ref="audio" />
    <img
      @click="_gAddMusicUrl"
      class="icon_music"
      src="https://zfile.bxwh002.cn/img/default/general/up_music_icon.png"
      alt=""
    />
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import ListBase from 'base/m_list_base/m_list_base'
import Split from 'base/split/split'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { popToast } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      title: '背景音乐',
      musicSwitch: false,
      autoSwitch: false,
      activeId: -1,
      musicList: []
    }
  },
  created() {
    this._getPlay_Active()
    this._getAllMusic()
  },
  methods: {
    chooseMusic(item) {
      if (this.activeId !== item.id) {
        this.activeId = item.id
        this.$refs.audio.src = item.url
        this.$refs.audio.play()
      }
    },
    // 添加音乐
    _gAddMusicUrl() {
      location.href = 'http://ha4zvtftq0g3b4x1.mikecrm.com/U5LqSH9'
    },
    _getPlay_Active() {
      const play = this.vUserInfo.play
      const auto = this.vUserInfo.autoplay
      play === '1' ? (this.musicSwitch = true) : (this.musicSwitch = false)
      auto === '1' ? (this.autoSwitch = true) : (this.autoSwitch = false)
    },
    updateMusic() {
      var _this = this
      const play = this.musicSwitch ? 1 : 0
      const auto = this.autoSwitch ? 1 : 0
      this.$api.userComp
        .updateMusic({
          vid: _this.vid,
          token: _this.token,
          play: play,
          autoplay: auto,
          musicId: _this.activeId
        })
        .then(res => {
          const data = res.data.data
          const errCode = res.data.errCode
          const { vid, bid } = data
          this.setBid(bid)
          this.setVid(vid)
          this.setVUserInfo(data)
          console.log(res)
          if (errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: '保存成功',
              mask: true
            }
            popToast(popToastObj)
            const timer = setTimeout(() => {
              this.goBack()
            }, 1000)
            this.$once('hook:beforeDestroy', () => {
              clearTimeout(timer)
            })
          }
        })
    },
    _getAllMusic() {
      var _this = this
      this.$api.userComp
        .getAllMusic({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          this.musicList = res.data.data
          this.activeId = this.musicList[0].id
          console.log(this.musicList)
        })
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    ListBase,
    Split
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.cube-switch {
  >>>.cube-switch-ui {
    background-color: #ffc22f !important;
    border-color: #ccc !important;
  }
}

.split {
  height: 20px;
}

.icon_music {
  width: 61px;
  height: 64px;
  position: fixed;
  right: 2%;
  bottom: 16%;
}

.radio_box {
  width: 100%;
  bgc(#fff);

  li {
    height: 44px;
    border-bottom: 1px solid #e6e6e6;
    flex_row();
    align-items: center;
    justify-content: space-between;

    &:last-child {
      border-bottom: none;
    }

    .left {
      flex: 1;
      height: 44px;
      line-height: 44px;
      margin: 0 10px 0 12px;
      color: #333;
      font-size: 16px;
    }

    i {
      font-size: 24px;
      margin-right: 10px;
      color: #ccc;

      &.icon-radio {
        color: #ccc;
      }

      &.icon-radioactive {
        color: #ffc22f;
      }
    }
  }
}

.listBox {
  margin-top: 54px;

  .m_list_outer {
    height: 44px;
    border-bottom: 1px solid #e6e6e6;

    &:last-child {
      border-bottom: none;
    }

    .m_list_left {
      width: 20%;
      height: 44px;
      line-height: 44px;
      margin: 0 10px 0 12px;
    }

    .m_list_center {
      flex: 1;
      text-align: right;
      margin-right: 10px;

      span {
        color: #999;
        font-size: 13px;
      }
    }

    .m_list_right {
      margin-right: 10px;
    }
  }
}

.saveBtn {
  btn(100%, 50px, 18px, '', #fff, '');
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  bg_linear();
}
</style>
