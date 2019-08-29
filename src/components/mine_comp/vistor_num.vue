<template>
  <div class="visitor_num">
    <div>
      <span>曝光量</span>
      <span class="numlist">{{ vistorData.pv }}</span>
    </div>
    <div>
      <span>点赞数</span>
      <span class="numlist">{{ vistorData.ups }}</span>
    </div>
    <div>
      <span>收藏数</span>
      <span class="numlist">{{ vistorData.likes }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    vistorData: {
      type: Object,
      default() {
        return {
          pv: 0,
          ups: 0,
          likes: 0
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.visitor_num {
  width: 100%;
  background-color: #fff;
  font-size: 12px;
  color: #999;
  position: fixed;
  top: 54px;
  height: 68px;
  flex_row();
  align-items: center;
  bd_bt(#e6e6e6);

  div {
    flex: 1;
    height: 60px;
    flex_column();
    align-items: center;
    justify-content: center;

    .numlist {
      color: #ff7420;
      font-size: 18px;
      margin-top: 10px;
      font-weight: bold;
    }
  }
}
</style>
