<template>
  <section>
    <div class="m-info-container" :style="isFontCls">
      <div>
        <img
          src="https://zfile.bxwh002.cn/img/default/home_phone_icon.png"
          alt=""
        />
        <div class="tel-right">
          <span>手机</span>
          <p>{{ Mine_Info.show_tel }}</p>
        </div>
      </div>
      <div>
        <img
          src="https://zfile.bxwh002.cn/img/default/home_wexin_icon.png"
          alt=""
        />
        <div>
          <span>微信</span>
          <p v-if="Mine_Info.wechat">{{ Mine_Info.wechat }}</p>
          <p v-else>尚未完善</p>
        </div>
      </div>
      <div>
        <img
          src="https://zfile.bxwh002.cn/img/default/home_dizhi_icon.png"
          alt=""
        />
        <div>
          <span>地址</span>
          <p>{{ exactAddress }}</p>
        </div>
      </div>
    </div>
    <div class="s-line">
      <ul>
        <li @click="transmit">
          <i class="iconhome_icon_huichuan"></i>
          <span>{{ transmitText }}</span>
        </li>
        <li @click="call">
          <i class="iconhome_icon_bodadianhua"></i>
          <span>拨打电话</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
const TransMit = 'transmit'
const Call = 'call'
export default {
  computed: {},
  methods: {
    // 回传名片
    transmit() {
      this.$emit(TransMit)
    },
    // 拨打电话
    call() {
      this.$emit(Call)
    }
  },
  props: {
    Mine_Info: {
      type: Object
    },
    exactAddress: {
      type: String
    },
    transmitText: {
      type: String
    },
    isFontCls: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-info-container {
  width: 89.3%;
  height: 160px;
  margin: 0px auto 0;
  position: relative;
  overflow: hidden;
  z-index: 2;
  bg_image('https://zfile.bxwh002.cn/img/default/home_m_bg3.png');

  >div {
    width: 90%;
    margin: 15px 0 0 18px;
    display: flex;
    align-items: center;

    // color: #333 !important;
    img {
      width: 19px;
      height: 19px;
      margin-right: 8.5px;
    }

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 12px;

      // color: $color-text;
      span {
        opacity: 0.5;
      }

      p {
        font-size: 13px;
        margin-top: 4px;
      }
    }
  }
}

.s-line {
  width: 89.3%;
  height: 55.5px;
  overflow: hidden;
  background-color: $color-text;
  position: relative;
  z-index: 2;
  margin: 0 auto;

  ul {
    width: 302px;
    height: 45.5px;
    margin: 7.5px 16.5px 0;
    bg_image('https://zfile.bxwh002.cn/img/default/home_m_icon_line.png');
    display: flex;
    align-items: center;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 45.5px;

      i {
        color: #333;
        font-size: 26px;
        margin-right: 5px;
      }

      span {
        color: #333333;
        letter-spacing: 1px;
        font-size: 15px;
      }
    }
  }
}
</style>
