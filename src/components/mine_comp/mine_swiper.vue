<template>
  <div class="slider-content">
    <cube-slide ref="slide" :initial-index="0">
      <cube-slide-item>
        <a @click="_openPopXcx">
          <img :src="isXcxImg" alt="" />
        </a>
      </cube-slide-item>
      <cube-slide-item>
        <a @click="_gPay">
          <img
            src="https://zfile.bxwh002.cn/img/common/banner_6.18_mine_.png"
            alt=""
          />
        </a>
      </cube-slide-item>
      <cube-slide-item>
        <a @click="_gGroupEwm">
          <img
            src="https://zfile.bxwh002.cn/img/common/banner_group_mine.png"
            alt=""
          />
        </a>
      </cube-slide-item>
      <cube-slide-item>
        <a @click="_gVas">
          <img
            src="https://zfile.bxwh002.cn/img/common/banner_ztc.png"
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
      this.$parent._gPay()
    },
    _gGroupEwm() {
      this.$parent._gGroupEwm()
    },
    _gVas() {
      this.$parent._gVas()
    },
    _openPopXcx() {
      this.$parent._openPopXcx()
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
.slider-content {
  width: 100%;
  height: 91px;
  margin-top: 15px;
}
</style>
