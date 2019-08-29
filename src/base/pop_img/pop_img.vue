<template>
  <div :class="[popBox, cnameOuter]">
    <div class="popup-mask" v-if="isMask" @click="closePopMask"></div>
    <div :class="[popContentCls, cnameP]">
      <img :src="popMainImg" :class="[popMainCls, cnameC]" alt="" />
      <slot name="popText" />
      <!-- <slot name="popText"></slot> -->
      <i class="iconguanbi1" @click="closePopIcon" v-if="popClose"></i>
    </div>
  </div>
</template>
<script>
const ClosePopIcon = 'closePopIcon'
const ClosePopMask = 'closePopMask'
export default {
  data() {
    return {
      popBox: 'popBox',
      popContentCls: 'popup-content',
      popMainCls: 'popImg'
    }
  },
  computed: {},
  props: {
    popMainImg: {
      type: String
    },
    isMask: {
      type: Boolean,
      default: true
    },
    popClose: {
      type: Boolean,
      default: false
    },
    cnameOuter: {
      type: String,
      default: ''
    },
    cnameP: {
      type: String,
      default: ''
    },
    cnameC: {
      type: String,
      default: ''
    }
  },
  methods: {
    closePopIcon() {
      this.$emit(ClosePopIcon)
    },
    closePopMask() {
      this.$emit(ClosePopMask)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.popBox {
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
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .popup-content {
    position: fixed;
    left: 50%;
    top: 15%;
    transform: translate(-50%);
    z-index: 6;
    flex_column();
    justify-content: center;
    align-items: center;

    .popImg {
      border-radius: 10px;
      width: 250px;
      height: 360px;
    }

    i {
      margin-top: 20px;
      font-size: 30px;
      color: #fff;
      z-index: 7;
    }
  }
}
</style>
