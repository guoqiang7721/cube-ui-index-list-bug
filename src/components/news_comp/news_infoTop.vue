<template>
  <!-- 个人信息头像 电话等 -->
  <div class="m-info" v-if="isGeneralCard || isVoteId">
    <div class="m-info-pic">
      <img :src="oUserInfo.logo" alt="" />
    </div>
    <span class="info_name">{{ oUserInfo.brand }}</span>
    <p class="general_text">
      今天<span>{{ oUserInfo.brand }}</span
      >家人发爆文展现{{ htmlData.views }}次
    </p>
  </div>
  <div class="m-info" v-else>
    <div class="m-info-pic" @click="_gHome">
      <img :src="oUserInfo.upic" alt="" />
      <div class="m-info-bg" v-if="oUserInfo.show_icon === '1'"></div>
    </div>
    <span class="info_name">{{ oUserInfo.name }}</span>
    <div class="info_sign">
      <span v-if="oUserInfo.title">{{ oUserInfo.title }}</span>
      <span v-else>{{ oUserInfo.brand }}</span>
    </div>
    <div class="change">
      <span v-if="isSelf" @click="_gHome">我的</span>
      <span v-else @click="_changeMine">换成我的</span>
    </div>
    <div class="info_tel" @click="_call"></div>
    <div class="info_wechat" @click="_copyWechat"></div>
  </div>
</template>
<script>
const GHOME = 'gHome'
const CALL = 'call'
const COPYWECHAT = 'copyWechat'
const changeMine = 'changeMine'
export default {
  data() {
    return {}
  },
  methods: {
    _gHome() {
      this.$emit(GHOME)
    },
    _call() {
      this.$emit(CALL)
    },
    _changeMine() {
      this.$emit(changeMine)
    },
    _copyWechat() {
      this.$emit(COPYWECHAT)
    }
  },
  props: {
    oUserInfo: {
      type: Object
    },
    isSelf: {
      type: Boolean
    },
    isGeneralCard: {
      type: Boolean
    },
    isVoteId: {
      type: Boolean
    },
    htmlData: {
      type: Object
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.m-info {
  position: relative;
  flex_column();
  align-items: center;
  border-radius: 2px;
  width: 100%;
  height: 138px;
  margin: -30px auto 0;
  border-radius: 4px;
  bg_image('https://zfile.bxwh002.cn/img/default/news_articleInfoBg.png');

  .info_tel, .info_wechat {
    position: absolute;
    width: 100px;
    height: 25px;
    bottom: 15px;
  }

  .info_tel {
    left: 52.5px;
  }

  .info_wechat {
    right: 52.5px;
  }

  .m-info-pic {
    width: 79px;
    height: 79px;
    background-color: #fff;
    position: absolute;
    border-radius: 50%;
    border: 2px solid rgba(255, 164, 33, 0.5);
    left: 50%;
    top: -49.5px;
    transform: translate(-50%);

    img {
      width: 79px;
      height: 79px;
      border-radius: 50%;
      box-sizing: border-box;
    }

    .m-info-bg {
      width: 101px;
      height: 101px;
      bg_image('https://zfile.bxwh002.cn/img/common/info_active_border.png');
      position: absolute;
      left: 50%;
      margin-left: -50.5px;
      bottom: -10px;
      z-index: 1;
      animation: _rotate_ 2.8s linear infinite;
    }
  }

  .info_name {
    margin-top: 45px;
    font-size: 18px;
    color: #333;
  }

  .info_sign {
    margin-top: 5px;
    padding: 0 12.5px;
    height: 22px;
    line-height: 22px;
    background-color: #ffe2c9;
    border-radius: 2px;
    color: #df5e00;
    font-size: 14px;
    text-align: center;
  }

  .change {
    position: absolute;
    top: 7.5px;
    right: 17.5px;
    width: 75px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #ff9921;
    border-radius: 12px 0px 0px 12px;
    font-size: 14px;
    letter-spacing: 1px;
    color: #fff;
  }

  .general_text {
    width: 80%;
    margin-top: 25px;
    height: 45px;
    color: #333;
    vertical-align: bottom;
    font-size: 13px;
    text-align: center;
    bgc(#fff);
    letter-spacing: 1px;

    span {
      color: rgb(255, 153, 33);
    }
  }
}
</style>
