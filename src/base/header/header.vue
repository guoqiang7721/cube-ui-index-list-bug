<template>
  <header id="header_com">
    <i class="iconfanhui" :class="{ hide: isHide }" @click="back"></i>
    <span class="title">{{ title }}</span>
    <slot />
  </header>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isHide: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$emit('back')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

#header_com {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  font-size: 17px;
  letter-spacing: 1px;
  color: #333;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  .title {
    width: 70%;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .iconfanhui {
    float: left;
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
