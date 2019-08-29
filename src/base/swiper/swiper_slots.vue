<template>
  <span class="dot"></span>
</template>
<script>
export default {
  data() {
    return {}
  },
  activated() {},
  created() {},
  methods: {}
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable';

.cube-slide-dots {
  bottom: 12px;

  .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $color-text-l;

    &.active {
      width: 20px;
      border-radius: 5px;
      background: $color-text-ll;
    }
  }
}
</style>
