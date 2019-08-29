<template>
  <div class="followImg">
    <img src="https://zfile.bxwh002.cn/img/default/follow_pic_1.jpg" alt="">
    <img src="https://zfile.bxwh002.cn/img/default/follow_pic_2.jpg" alt="">
    <img src="https://zfile.bxwh002.cn/img/default/follow_pic_3.jpg" alt="">
    <!-- <img class="btn" :src="follwBtn" @click="_gFollowBtn" alt=""> -->
    <cube-button
      class="btn"
      @click="_gFollowBtn"
      :primary="true"
      >
      {{follwBtn}}
    </cube-button>
  </div>
</template>

<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
export default {
  mixins: [routings, vuexData],
  data () {
    return {

    }
  },
  computed: {
    // 判断是否正式会员
    noRoleId () {
      return this.vUserInfo.roleId === '1'
    },
    follwBtn () {
      return this.noRoleId
        ? '马上开通'
        : '马上使用'
    }
  },
  methods: {
    _gFollowBtn () {
      this.noRoleId ? this.goNext('/pay') : this.goNext('/follow')
    }
  }
}
</script>

<style lang="stylus" scoped>
.followImg
  img
    width 100%
  .btn
    position  fixed
    bottom 5%
    width 293px
    font-size 20px
    padding 0
    height 46px
    border-radius 23px
    left 0
    right 0
    margin  auto
    background-color #ff9834
    letter-spacing 3px
</style>
