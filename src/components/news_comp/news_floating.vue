<template>
  <div>
    <!-- 看他人名片时 一键换成我的文章 -->
    <div class="floating_window" v-if="!isSelf" @click="_gMine">
      <i class="iconjiantou-copy-copy"></i>
      <span>一键换成我的文章</span>
    </div>
    <!-- 关注大咖公众号 -->
    <div class="attention_header" v-if="!isAttentionGzh && isSelf">
      <p class="day_text">每日获取{{ oUserInfo.brand }}最新头条资讯</p>
      <h3 class="attention_text" @click="_openPopGzh">关注</h3>
    </div>
    <!-- 底部提示开通 -->
    <div class="foot_openMem" v-if="noRoleId && isSelf" @click="_openMem">
      开通VIP会员，使用全部功能
    </div>
    <!-- 人脉追踪显示谁看了我 -->
    <div
      v-if="isSelf"
      class="follow_num animated swing infinite delay-1s"
      @click="_gFollow"
    >
      <span v-if="traceNum > 0">{{ traceNum }}</span>
    </div>
    <!--投票显示按钮  -->
    <div class="vote" @click="_gVote">
      <img src="https://zfile.bxwh002.cn/img/common/vote.gif" alt="" />
    </div>
    <!--  -->
    <!-- 官方 频道按钮 切换 -->
    <div
      class="channel_box animated pulse infinite delay-2s"
      v-if="isGeneral && isSelf"
      @click="_toggleChannel"
    >
      <img class="channel_img" :src="isGeneralImg" alt="" />
    </div>
    <!-- 聊天 -->
    <img
      v-if="!isSelf && !isVoteId"
      class="icon_chat animated swing infinite slower"
      @click="_gChat"
      src="https://zfile.bxwh002.cn/img/common/icon_chat.png"
      alt=""
    />
  </div>
</template>
<script>
const GMINE = 'gMine'
const openPopGzh = 'openPopGzh'
const openMem = 'openMem'
const gFollow = 'gFollow'
const toggleChannel = 'toggleChannel'
const gChat = 'gChat'
const gVote = 'gVote'
export default {
  data() {
    return {}
  },
  methods: {
    _gMine() {
      this.$emit(GMINE)
    },
    _openPopGzh() {
      this.$emit(openPopGzh)
    },
    _openMem() {
      this.$emit(openMem)
    },
    _gFollow() {
      this.$emit(gFollow)
    },
    _toggleChannel() {
      this.$emit(toggleChannel)
    },
    _gChat() {
      this.$emit(gChat)
    },
    _gVote() {
      this.$emit(gVote)
    }
  },
  props: {
    oUserInfo: {
      type: Object
    },
    isSelf: {
      type: Boolean
    },
    // 是否关注公众号
    isAttentionGzh: {
      type: Boolean,
      default: true
    },
    isPopGzh: {
      type: Boolean,
      default: false
    },
    noRoleId: {
      type: Boolean,
      default: false
    },
    isVoteId: {
      type: Boolean
    },
    isShowFollow: {
      type: Boolean,
      default: false
    },
    traceNum: {
      type: String
    },
    // 官方频道显示
    isGeneral: {
      type: Boolean,
      default: false
    },
    isGeneralImg: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

@keyframes breatheb {
  0% {
    box-shadow: 0 0px 5px rgba(255, 255, 255, 0.4);
  }

  100% {
    box-shadow: 0 0px 20px rgba(154, 18, 16, 0.9);
  }
}

@keyframes breatheb {
  0% {
    box-shadow: 0 0px 5px rgba(255, 255, 255, 0.4);
  }

  100% {
    box-shadow: 0 0px 20px rgba(154, 18, 16, 0.9);
  }
}

@keyframes foot_animate {
  0% {
    transform: translateY(41.5px);
  }

  20% {
    transform: translateY(0);
  }

  80% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(41.5px);
  }
}

@keyframes foot_animate {
  0% {
    transform: translateY(41.5px);
  }

  20% {
    transform: translateY(0);
  }

  80% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(41.5px);
  }
}

@keyframes attention_header_animate {
  0% {
    opacity: 1;
  }

  40% {
    opacity: 0.3;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes attention_header_animate {
  0% {
    opacity: 1;
  }

  40% {
    opacity: 0.3;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

.floating_window {
  width: 46%;
  left: 27%;
  height: 38px;
  border-radius: 19px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 10%;
  background-color: #ffb125;
  color: #fff;
  font-size: 14px;
  animation: breatheb 1s linear alternate infinite;
  z-index: 3;

  .iconjiantou-copy-copy {
    margin-left: 5px;
  }

  img {
    width: 13px;
    height: 13px;
    margin-right: 2.5px;
    margin-left: 10.5px;
    display: inline-block;
  }

  span {
    flex: 1;
    letter-spacing: 2px;
    text-align: center;
    // 关注公众号header
  }
}

//
.vote {
  width: 57px;
  height: 61px;
  position: fixed;
  right: 6%;
  top: 66%;
  z-index: 3;

  img {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 57px;
    height: 111px;
  }
}

//
.attention_header {
  position: fixed;
  width: 94%;
  left: 0;
  top: 0;
  z-index: 4;
  background: #fff;
  padding: 0 3%;
  height: 40px;
  flex_row();
  align-items: center;
  justify-content: space-between;
  animation: attention_header_animate 3s infinite;

  p {
    // line-height:27px;
    color: #f87912;
    font-size: 15px;
  }

  .attention_text {
    color: #fff;
    font-size: 15px;
    letter-spacing: 2px;
    // width: 64px;
    padding: 1px 11px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    bgc(#80c420);
    bd_r(5px);
  }
}

// 底部悬浮开通
.foot_openMem {
  width: 350px;
  height: 41.5px;
  line-height: 41.5px;
  text-align: center;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0px;
  animation: foot_animate 9s infinite;
  // transform:translateY(41.5px)
  z-index: 3;
  font-size: 16px;
  color: #fff;
  bg_image('https://zfile.bxwh002.cn/img/default/news_foot_openMemBg.png');
  //
}

.follow_num {
  position: fixed;
  width: 54.4px;
  height: 52px;
  right: 6%;
  top: 80%;
  z-index: 3;
  bg_image('https://zfile.bxwh002.cn/img/default/news_follow.png');

  span {
    position: absolute;
    top: -2px;
    right: -2px;
    font-size: 11px;
    display: block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 50%;
    background: red;
    color: #fff;
  }
}

// 内部人士显示按钮
.channel_box {
  position: fixed;
  width: 60px;
  height: 60px;
  right: 6%;
  top: 52%;
  z-index: 4;

  img {
    width: 100%;
    height: 100%;
  }
}

// 聊天按钮
.icon_chat {
  position: fixed;
  right: 9%;
  top: 82%;
  width: 35px;
  height: 35px;
  z-index: 3;
}
</style>
