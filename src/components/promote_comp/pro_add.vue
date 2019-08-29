<template>
  <!-- <header-com :title="title" @back="back" /> -->
  <transition name="slide">
    <div class="card_box">
      <header-com :title="title" @back="back" />
      <div class="seen_box">
        <div class="seen">
          <span class="syst">银行卡号</span>
          <div class="seen_right">
            <input
              type="number"
              name="cardid"
              v-model="cardnum"
              maxlength="19"
              placeholder="请输入银行卡号"
              class="choose"
            />
          </div>
        </div>
        <div class="seen">
          <span class="syst">持卡人</span>
          <div class="seen_right">
            <input
              placeholder="请输入持卡人姓名"
              v-model="cardman"
              name="cardman"
              class="choose"
            />
          </div>
        </div>
        <div class="seen" style="border-bottom:none">
          <span class="syst">联系号码</span>
          <div class="seen_right">
            <input
              type="number"
              name="cardphone"
              v-model="cardphone"
              maxlength="11"
              placeholder="请输入手机号"
              class="choose"
            />
          </div>
        </div>
        <cube-button
          class="btn"
          @click="save"
          form-type="submit"
          :primary="true"
          >确认绑定</cube-button
        >
      </div>
    </div>
  </transition>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
export default {
  mixins: [routings],
  data() {
    return {
      title: '银行卡',
      cardman: '',
      cardphone: '',
      cardnum: ''
    }
  },
  methods: {
    back() {
      this.goBack()
    },
    save() {}
  },
  components: {
    HeaderCom
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

body, html {
  width: 100%;
  height: 100%;
}

.card_box {
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .seen_box {
    margin-top: 58px;
  }

  .seen {
    width: 100%;
    background: #fff;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    color: #333;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:first-child {
      margin-top: 44px;
    }
  }

  .seen .syst {
    width: 20%;
    margin-left: 3%;
  }

  .seen .seen_right {
    width: 77%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .seen .seen_right .choose {
    width: 90%;
    height: 70%;
  }

  .btn {
    btn(338px, 40px, '', '', $color-text, 5px);
    margin: 30px auto 0;
    bg_linear();
  }
}
</style>
