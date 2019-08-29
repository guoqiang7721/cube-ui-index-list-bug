<template>
  <div class="follow_top" @touchmove.prevent>
    <div class="item">
      <span>{{ totalCount.today }}</span>
      <p>今天看我</p>
    </div>
    <div class="item">
      <span>{{ totalCount.total }}</span>
      <p>看我总数</p>
    </div>
    <div class="item" @click="_gCourse">
      <i class="iconrenmai_renmaizhuizong_zhuizongjiaocheng"></i>
      <p>追踪教程</p>
    </div>
  </div>
</template>

<script>
const gCourse = 'gCourse'
export default {
  props: {
    totalCount: {
      type: Object
    }
  },
  methods: {
    // 追踪教程
    _gCourse() {
      this.$emit(gCourse)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.follow_top {
  width: 100%;
  position: fixed;
  top: 0;
  height: 70px;
  display: flex;
  bgc(#fff);
  z-index: 2;
  box-shadow: 0px 2px 8px 0px rgba(148, 106, 16, 0.23);

  .item {
    flex: 1;
    height: 100%;
    flex_column();
    align-items: center;
    justify-content: center;

    span {
      font-size: 17px;
      color: #ffb125;
      line-height: 24px;
    }

    p {
      font-size: 15px;
      color: #666666;
      margin-top: 5px;
      line-height: 1.6;
    }

    .iconrenmai_renmaizhuizong_zhuizongjiaocheng {
      height: 24px;
      color: #ff9834;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
