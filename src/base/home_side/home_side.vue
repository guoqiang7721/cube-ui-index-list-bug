<template>
  <div class="m-brand-title">
    <i></i>
    <div>
      <p :style="isFontCls">{{ BRAND_S }}</p>
      <h5 :style="isFontBrandTipCls">{{ BRAND_A }}</h5>
    </div>
    <!-- <slot/> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    BRAND_S: {
      type: String,
      default: ''
    },
    BRAND_A: {
      type: String,
      default: ''
    },
    isFontCls: {
      type: String
    },
    isFontBrandTipCls: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.m-brand-title {
  width: 89.3%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  margin: 36px auto 12px;
  display: flex;
  align-items: center;

  i {
    width: 4px;
    height: 35px;
    background-color: $color-theme;
    color: $color-theme;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    padding: 2px 0;

    p {
      font-size: 17px;
    }

    h5 {
      margin-top: 5px;
      font-size: 12px;
      opacity: 0.5;
    }
  }
}
</style>
