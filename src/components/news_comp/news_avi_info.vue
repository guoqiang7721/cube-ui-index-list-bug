<template>
  <div>
    <div class="info_avi">
      <div class="info_avi_l">
        <img :src="oUserInfo.upic" class="upic" alt="" @click="_gHome" />
        <div class="main">
          <p class="info_name">{{ oUserInfo.name }}</p>
          <button v-if="oUserInfo.title">{{ oUserInfo.title }}</button>
          <button v-else>{{ oUserInfo.brand }}</button>
        </div>
      </div>
      <p class="info_avi_r" @click="_gChat">
        <i class="iconzhongguohangtiantubiaoheji-weizhuanlunkuo-"></i>
        <span>速聊</span>
      </p>
    </div>
    <p class="change">
      <span v-if="isSelf" @click="_gHome">我的>></span>
      <span v-else @click="_changeMine">换成我的>></span>
    </p>
  </div>
</template>
<script>
const GHOME = 'gHome'
const changeMine = 'changeMine'
export default {
  data() {
    return {}
  },
  activated() {},
  created() {},
  methods: {
    _gChat() {
      this.$emit('gChat')
    },
    _gHome() {
      this.$emit(GHOME)
    },
    _changeMine() {
      this.$emit(changeMine)
    }
  },
  props: {
    htmlData: {
      type: Object,
      default: null
    },
    oUserInfo: {
      type: Object
    },
    isSelf: {
      type: Boolean
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.info_avi
  margin 20px 5% 0
  padding 2%
  background-color #ffffff
  box-shadow 0px 0px 9px 0px rgba(232, 145, 94, 0.14), 0px 4px 16px 0px rgba(232, 145, 94, 0.14)
  border-radius 3px
  flex_row()
  align-items center
  justify-content space-between
  .info_avi_l
    flex_row()
    align-items center
    .upic
      width 66px
      height 66px
      border-radius 50%
    .main
      flex_column()
      // align-items: center;
      // justify-content: center;
      margin-left 10px
      .info_name
        font-size 17px
        color #333
        margin-left 1.5px
      button
        margin-top 10px
        height 18px
        padding 0 5px
        font-size 11px
        margin-right auto
        color #df5e00
        background-color #ffe2c9
        border-radius 2px
  .info_avi_r
    margin-right 3%
    padding 0px 3px
    flex_row()
    align-items center
    background-image linear-gradient(
      90deg,
      #ff7d1e 0%,
      #ff9825 100%
    )
    box-shadow 0px 1px 4px 0px rgba(148, 106, 16, 0.23)
    border-radius 3px
    i
      color #fff
      font-size 20px
      margin-top 2px
    span
      font-size 12px
.change
  margin 0 5%
  height 35px
  line-height 35px
  background-image linear-gradient(
    0deg,
    #fbefe6 0%,
    #ffeadb 100%
  )
  text-align center
  font-size 15px
  color #e37222
  border-radius 0 0 3px 3px
</style>
