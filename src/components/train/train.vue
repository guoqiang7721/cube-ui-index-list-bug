<template>
  <div class="train_container">
    <header-com :title="title" @back="back" />
    <train-header :vUserInfo="vUserInfo" :token="token" />
    <train-main :vUserInfo="vUserInfo" />
    <train-foot @ask="_ask" @openTrain="_openTrain" />
    <pop-img
      :popMainImg="popMainImg"
      v-if="isPopGzh"
      @closePopMask="_pop_gzh"
    />
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import vuexData from 'common/js/mixins/vuex_data'
import popImg from 'base/pop_img/pop_img'
import routings from 'common/js/mixins/routings'
import trainHeader from 'components/train_comp/train_header'
import trainMain from 'components/train_comp/train_main'
import trainFoot from 'components/train_comp/train_foot'
import attention from 'common/js/mixins/attention'
export default {
  mixins: [vuexData, routings, attention],
  data() {
    return {
      title: '直通车'
    }
  },
  created() {
    this._getPopComp('train') // 获取公众号弹窗显示
  },
  methods: {
    // 在线咨询
    _ask() {
      this.isPopGzh = true
    },
    // 体验直通车
    _openTrain() {
      this.getStatus()
      this.newCreateApply()
    },
    // 新创建订单
    newCreateApply() {
      var _this = this
      this.$api.train
        .newCreateApply({
          token: _this.token
        })
        .then(res => {})
    },
    // 获取下一步操作状态
    getStatus() {
      var _this = this
      this.$api.train
        .getStatus({
          vid: _this.vUserInfo.vid,
          mid: _this.vUserInfo.mid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          console.log(data)
          if (data === 0) {
            this.goNext('/train/pay_fail')
          } else if (data === 1) {
            this.goNext('/train/city')
          } else if (data === 2) {
            this.goNext('/train/pay_success')
          } else {
          }
        })
    },
    // close pop
    _pop_gzh() {
      this.isPopGzh = false
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    popImg,
    trainHeader,
    trainMain,
    trainFoot
  }
}
</script>
<style lang="stylus" scoped>
.train_container
  background-color #fff2e7 !important
</style>
