<template>
  <div class="m-header">
    <i class="iconpersonal_icon_mpguanli" @click="_gEdit"></i>
    <div class="s-info">
      <img
        class="s-info-pic"
        :src="userInfo.upic"
        @click="_gEdit"
        alt="个人头像"
      />
      <div class="s-info-right">
        <span class="s-info-right-name">{{ userInfo.name }}</span>
        <button :class="isCommonCls">{{ isCommon }}</button>
      </div>
    </div>
    <div class="m-header-bottom" @click="_gPay">
      <img class="m-header-bottom-article" :src="isArticle_icon" alt="" />
      <span class="m-header-bottom-text">{{ isMem_text_l }}</span>
      <i class="iconjiantou"></i>
      <span class="m-header-bottom-tip" v-if="userInfo.eternal != 1">{{
        isMem_text_r
      }}</span>
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
export default {
  mixins: [routings, vuexData],
  data() {
    return {}
  },
  computed: {
    isCommon() {
      return this.userInfo.roleId === '1'
        ? '普通会员'
        : this.userInfo.eternal === '0'
          ? '正式会员'
          : '永久会员'
    },
    isCommonCls() {
      return this.userInfo.roleId === '1'
        ? 'common'
        : this.userInfo.eternal === '0'
          ? 'year'
          : 'extreme'
    },
    isArticle_icon() {
      return this.userInfo.roleId === '1'
        ? 'https://zfile.bxwh002.cn/img/default/memIndex_icon_isCommon.png'
        : 'https://zfile.bxwh002.cn/img/default/memIndex_icon_isYear.png'
    },
    isMem_text_l() {
      return this.userInfo.roleId === '1'
        ? '尚未开通'
        : this.userInfo.eternal === '0'
          ? `有效期至${this.userInfo.lock_time}`
          : '恭喜您成为永久会员'
    },
    isMem_text_r() {
      return this.userInfo.roleId === '1'
        ? '开通'
        : this.userInfo.eternal === '0'
          ? '续费'
          : ''
    }
  },
  methods: {
    _gPay() {
      const eternal = this.userInfo.eternal
      if (eternal === '1') return
      this.goNext('/pay')
    },
    _gEdit() {
      this.goNext('/mine/edit')
      // this.goNext('/home', { uid: this.vid })
    }
  },
  props: {
    userInfo: {
      type: Object,
      default: null
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-header {
  position: relative;
  width: 100%;
  height: 222px;
  bg_image('https://zfile.bxwh002.cn/img/default/memIndex_bg.png');
  overflow: hidden;

  .iconpersonal_icon_mpguanli {
    position: absolute;
    z-index: 2;
    right: 16px;
    top: 35px;
  }

  .m-icon_set {
    width: 20.5px;
    height: 20.5px;
    position: absolute;
    z-index: 2;
    right: 16px;
    top: 35px;
  }

  //
  .m-bg {
    position: absolute;
    width: 100%;
    height: 222px;
    z-index: 1;
    filter: blur(5px);

    img {
      width: 100%;
      height: 222px;
    }
  }

  .s-info {
    z-index: 2;
    width: 80%;
    margin-left: 15px;
    margin-top: 75px;
    display: flex;
    align-items: center;

    .s-info-pic {
      z-index: 3;
      width: 64px;
      height: 64px;
      background-color: #e5e5e5;
      border-radius: 50%;
      border: solid 2px rgba(255, 255, 255, 0.99);
      box-sizing: border-box;
    }

    .s-info-right {
      z-index: 2;
      font-size: 19px;
      color: #fff;
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      button {
        btn(67px, 21px, '', '', 12px, 3px);
        margin-top: 10px;

        &.common {
          background-color: #fee9c7;
          color: #b97111;
        }

        &.year {
          background: linear-gradient(to right, #ff402c, #ff5910);
          color: #fff;
        }

        &.extreme {
          background-color: #fee9c7;
          color: #b97111;
        }
      }
    }
  }

  .m-header-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35px;
    line-height: 35px;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.26);
    font-size: 15px;
    color: #fff;

    .m-header-bottom-article {
      float: left;
      width: 24px;
      height: 23px;
      margin-top: 6px;
      margin-right: 12px;
      margin-left: 20px;
    }

    .m-header-bottom-text {
      float: left;
    }

    .m-header-bottom-tip {
      float: right;
    }

    .iconjiantou {
      float: right;
      margin-right: 8px;
      color: #999;
      font-size: 26px;
    }
  }
}
</style>
