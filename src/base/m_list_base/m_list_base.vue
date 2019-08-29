<template>
  <div class="m_list_outer" :class="cname" @click="handleList">
    <slot name="left" />
    <slot name="main" />
    <slot name="right" />
    <slot name="addCont" />
  </div>
</template>
<script>
const handleList = 'handleList'
export default {
  data() {
    return {}
  },
  props: {
    cname: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleList() {
      // e.preventDefault()
      this.$emit(handleList)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m_list_outer {
  width: 100%;
  // height: 70px;
  background-color: $color-text;
  color: $color-text-n;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .m_list_left {
    width: 50px;
    height: 50px;
  }

  .m_list_center {
    // flex 1
  }

  .iconjiantou {
    margin-right: 10px;
    color: #999;
    font-size: 26px;
  }
}
</style>
