<template>
  <li :class="[m_list_common, cName]" @click="handleList">
    <img v-if="Data.leftIcon" class="m_left_img" :src="Data.leftIcon" alt="" />
    <slot name="leftImg"></slot>
    <i v-if="Data.leftFont" class="_iconfont" :class="Data.leftFont"> </i>
    <div class="m_right">
      <div>
        <span class="left_text">{{ Data.leftText }}</span>
        <i
          v-if="isIconHotShow"
          class="iconhot animated swing infinite delay-3s"
        ></i>
        <slot name="center"></slot>
      </div>
      <div class="inner_right">
        <slot />
        <span class="inner_tip" v-if="Data.isTip">{{ Data.isTipText }}</span>
        <span class="inner_tip2" v-if="Data.isTipMatch">{{
          Data.isTipMatchText
        }}</span>
        <span class="innner_num" v-if="Data.isNum">{{ Data.isNumText }}</span>
        <i class="iconjiantou"></i>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      m_list_common: 'm_list_common'
    }
  },
  props: {
    Data: {
      type: Object,
      default: null
    },
    cName: {
      type: String
    },
    isIconHotShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleList() {
      this.$emit('_handleList')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.m_list_common {
  width: 100%;
  height: 57px;
  background-color: $color-text;
  color: $color-text-n;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .m_left_img {
    margin: 0 8px 0 10px;
    position: relative;
    z-index: 3;
  }

  .m_right {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-right: 10px;

    .iconhot {
      display: inline-block;
      margin-left: 10px;
      font-size: 30px;
      vertical-align: middle;
      color: #e61111;
    }
  }

  .inner_right {
    display: flex;
    flex-direction: row;
    align-items: center;

    .left_text {
      flex: 1;
    }

    .iconjiantou {
      color: #999;
      font-size: 26px;
    }

    .inner_tip {
      color: #999999;
    }

    .inner_tip2 {
      color: #999999;
      font-size: 12px;
    }

    .innner_num {
      line-height: 15px;
      color: #fff;
      font-size: 11px;
      padding: 0px 4px;
      border-radius: 50%;
      background-color: red;
      margin-left: 10px;
    }
  }
}
</style>
