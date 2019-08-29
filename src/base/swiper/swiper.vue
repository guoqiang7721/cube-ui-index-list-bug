<template>
  <div class="slider-content" >
    <cube-slide :interval="interval">
      <slot/>
      <template slot="dots" slot-scope="props">
        <span
          v-show="swiperSlot"
          class="dot"
          :class="{ active: props.current === index }"
          :key="index"
          v-for="(item, index) in props.dots"
        ></span>
      </template>
    </cube-slide>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    interval: {
      type: Number,
      default: 4000
    },
    swiperSlot: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
   .slider-content
      // width:  89.3%
      // height 130px
      // margin:0 auto
      z-index 2
      position relative
      .cube-slide
        position relative
        z-index:2
        .cube-slide-item
            >a
              >img
                  width: 100%;
        .cube-slide-dots
            bottom: 12px
          .dot
            display: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
</style>
