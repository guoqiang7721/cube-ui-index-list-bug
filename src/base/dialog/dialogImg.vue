<template>
  <div :class="[dialogImg, cnameOuter]">
    <div class="popup-mask" v-if="isMask" @click="closePop"></div>
    <div :class="[popup_content, cname, cname_animate]">
      <slot name="mainImg"></slot>
    </div>
  </div>
</template>
<script>
const ClosePop = 'closePop'
export default {
  data() {
    return {
      dialogImg: '_dialogImg',
      popup_content: 'popup_content'
    }
  },
  methods: {
    closePop() {
      this.$emit(ClosePop)
    }
  },
  props: {
    isMask: {
      type: Boolean,
      default: true
    },
    cname: {
      type: String
    },
    cnameOuter: {
      type: String
    },
    cname_animate: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

._dialogImg {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 4;

  .popup-mask {
    z-index: 5;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .popup_content {
    position: fixed;
    z-index: 6;
  }
}
</style>
