<template>
  <div class='head_outer'>
    <div class="head_inner">
      <div class='head_bot'>
        <div class='info_img'>
          <img :src='vUserInfo.upic'/>
          <!-- <div class="m-info-bg"  v-if="vUserInfo.show_icon === '1'"></div> -->
          <div class="m-info-bg" v-if="isFirst"></div>
        </div>
        <span class='name'>{{vUserInfo.name}}</span>
        <span class='info_time' v-if="vUserInfo.lock_time !== '0'">{{vUserInfo.lock_time}}到期</span>
        <span class='info_time' v-else>未开通</span>
        <!-- <span class='tg' v-if="pro_day>0">通过推广已增加{{pro_day}}天</span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    vUserInfo: {
      type: Object
    },
    pro_day: {
      type: Number
    },
    isFirst: {
      type: Boolean
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.head_outer
  width: 100%;
  height: 195.5px;
  margin-top: 45px;
  .head_inner
    position: relative;
    width: 100%;
    height: 131.5px;
    bg_image('https://zfile.bxwh002.cn/img/default/pay_head_inner.png')
    .head_bot
      width: 357px;
      height: 148px;
      position: absolute;
      left: 9px;
      top: 48.5px;
      bg_image('https://zfile.bxwh002.cn/img/default/pay_head_outer.png')
      flex_column()
      align-items: center;
      .info_img
        width: 66px;
        height: 66px;
        border-radius: 50%;
        margin-top: -26.5px;
        position relative
        .m-info-bg
          width: 82px;
          height: 82px;
          bg_image('https://zfile.bxwh002.cn/img/common/info_active_border.png');
          position: absolute;
          left: 50%;
          margin-left -41px
          bottom: -8px;
          z-index: 1;
          animation: _rotate_ 2.8s linear infinite
        img
          width: 100%;
          height: 100%;
          border-radius: 50%;
      .name
        font-size: 17px;
        color: #853d12;
        margin-top: 11px;
      .info_time
        font-size: 14px;
        color: #853d12;
        margin-top: 10px;
      .tg
        font-size: 12px;
        color: #fff;
        margin-top: 4px;
</style>
