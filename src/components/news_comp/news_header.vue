<template>
  <!-- 文章头部header背景 -->
  <div class="header" :style="getCover">
    <div class="header-bg">
      <div class="title">{{ htmlData.name }}</div>
      <div class="view" v-if="!isGeneralCard || isVoteId">
        <i class="iconchakan"></i>
        <span>{{ htmlData.views }}</span>
      </div>
      <p class="time">{{ htmlData.add_time }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    getCover: {
      type: String,
      default: ''
    },
    htmlData: {
      type: Object,
      default: null
    },
    isGeneralCard: {
      type: Boolean
    },
    isVoteId: {
      type: Boolean
    }
  }
}
</script>
<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 188px;
  background-size: 100% 100%;
  position: relative;

  .header-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.65);
  }

  .title {
    margin: 25px 15px 0 20px;
    color: #fff;
    font-size: 22px;
    letter-spacing: 1.5px;
    line-height: 32px;
  }

  .time, .view {
    position: absolute;
    letter-spacing: 1px;
    font-size: 12px;
    color: #fefefe;
    bottom: 40px;
    line-height: 24px;
  }

  .time {
    right: 24.5px;
  }

  .view {
    left: 24.5px;
    display: flex;
    align-items: center;

    .iconchakan {
      font-size: 14px;
      margin-right: 3px;
    }
  }
}
</style>
