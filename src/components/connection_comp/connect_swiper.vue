<template>
  <div class="slider-content">
    <cube-slide ref="slide">
      <cube-slide-item>
        <a @click="_openPopXcx">
          <img :src="isXcxImg" alt="" />
        </a>
      </cube-slide-item>
      <cube-slide-item>
        <a @click="_gPay">
          <img
            src="https://zfile.bxwh002.cn/img/common/banner_6.18_connect_.jpg"
            alt=""
          />
        </a>
      </cube-slide-item>
      <cube-slide-item>
        <a @click="_gGroupEwm">
          <img
            src="https://zfile.bxwh002.cn/img/common/banner_group_connection.png"
            alt=""
          />
        </a>
      </cube-slide-item>
      <cube-slide-item>
        <a @click="_gChat">
          <img
            src="https://zfile.bxwh002.cn/img/common/banner_chat.png"
            alt=""
          />
        </a>
      </cube-slide-item>
      <cube-slide-item>
        <a @click="_gFollow">
          <img
            src="https://zfile.bxwh002.cn/img/common/banner_lookfor.png"
            alt=""
          />
        </a>
      </cube-slide-item>
      <template slot="dots" slot-scope="props">
        <swiper-slots
          v-show="swiperSlot"
          :key="index"
          class="dot"
          :class="{ active: props.current === index }"
          v-for="(item, index) in props.dots"
        />
      </template>
    </cube-slide>
  </div>
</template>
<script>
import swiperSlots from 'base/swiper/swiper_slots'
export default {
  data() {
    return {}
  },
  methods: {
    _gPay() {
      this.$parent.$parent._gPay()
    },
    _gGroupEwm() {
      this.$parent.$parent._gGroupEwm()
    },
    _gChat() {
      this.$parent.$parent._gChat()
    },
    _gFollow() {
      this.$parent.$parent._gFollow()
    },
    _openPopXcx() {
      this.$parent.$parent._openPopXcx()
    }
  },
  props: {
    isXcxImg: {
      type: String
    },
    interval: {
      type: Number,
      default: 4000
    },
    swiperSlot: {
      type: Boolean,
      default: true
    }
  },
  components: {
    swiperSlots
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.slider-content {
  width: 100%;
  height: 91px;
}
</style>
