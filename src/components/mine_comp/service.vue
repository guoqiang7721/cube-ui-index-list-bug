<template>
  <div>
    <img
      class="ser_banner"
      src="https://zfile.bxwh002.cn/img/default//service_banner.png"
      alt=""
    />
    <div class="ser_container">
      <img
        class="ser_lace"
        src="https://zfile.bxwh002.cn/img/default/service_lace.jpg"
      />
      <div class="ser_inner">
        <div class="ser_title">
          <p>您好，{{ vUserInfo.name }}</p>
        </div>
        <i></i>
        <div class="ser_intro">
          <p>
            我是您的专属客服
            <span>{{ serviceData.weixin }}</span
            >, 下面是我的微信二维码，请长按识别添加我！
          </p>
        </div>
        <div class="wechat_outer">
          <img class="wechat_img" :src="serviceData.kf_img" />
          <div class="wechat_text">
            <p>
              微信号：
              <span>
                {{ serviceData.wechat_num }}
              </span>
            </p>
            <div class="copy" @click="_copy(serviceData.wechat_num)">
              复制
            </div>
          </div>
        </div>
        <div class="wechat_intro_list">
          <div class="title">
            <span>
              接下来，我将是您的：
              <img
                src="https://zfile.bxwh002.cn/img/default/service_title.jpg"
                class="left"
              />
              <img
                src="https://zfile.bxwh002.cn/img/default/service_title.jpg"
                class="right"
              />
            </span>
          </div>
          <ul>
            <li>
              <img
                src="https://zfile.bxwh002.cn/img/default/service_icon1.png"
              />
              <span>专属文案</span>
              <p>品牌宣传爆文<br />对接更新服务</p>
            </li>
            <li>
              <img
                src="https://zfile.bxwh002.cn/img/default/service_icon2.png"
              />
              <span>营销专家</span>
              <p>推广方案制定<br />朋友圈形象诊断</p>
            </li>
            <li>
              <img
                src="https://zfile.bxwh002.cn/img/default/service_icon3.png"
              />
              <span>专属设计</span>
              <p>个人形象及产品<br />宣传海报设计服务</p>
            </li>
          </ul>
        </div>
        <div class="brand_inner" v-if="serviceData.eimages">
          <div class="wechat_text">
            <p>
              同时，邀您进入
              <span>
                {{ vUserInfo.brand }}
              </span>
              事业交流群，一起交流
            </p>
          </div>
          <img class="wechat_img" :src="serviceData.eimages" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import { popToast } from 'common/js/cubePop'
import { getSales } from 'common/js/getCommonInfo'
export default {
  mixins: [vuexData, routings],
  data() {
    return {
      serviceData: {}
    }
  },
  async mounted() {
    // 获取服务数据
    this.serviceData = await getSales({ token: this.token, vid: this.vid })
    document.title = '专属客服'
  },
  methods: {
    // 复制微信
    _copy(wechatText) {
      this.$copyText(wechatText).then(
        e => {
          const popToastObj = {
            _this: this,
            txt: '复制成功'
          }
          popToast(popToastObj)
        },
        e => {
          alert('Can not copy')
        }
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.ser_banner
  width 100%
  height 141px
.ser_container
  background #f5f5f5
  padding 0px 15px 15px
  .ser_lace
    width 100%
    height 9px
  .ser_inner
    padding 15px 15px 30px 15px
    margin-top -4px
    background #fff
    .ser_title
      p
        font-size 18px
        color #333333
        line-height 1.6
      i
        display block
        width 17.5px
        height 4px
        background #ffdbac
        border none
    .ser_intro
      bg_image('https://zfile.bxwh002.cn/img/default/service_line.jpg')
      background-size 2px 24px
      margin-top 10px
      p
        font-size 14px
        color #757575
        line-height 24px
        span
          color #ff954e
    .wechat_outer
      padding-bottom 15px
      border-bottom 1px dashed #ffdbac
    .brand_inner
      padding-top 15px
    .brand_inner, .wechat_outer
      .wechat_img
        width 122.5px
        height 122.5px
        display block
        margin 15px auto
        border-radius 5px
      .wechat_text
        flex_row()
        justify-content center
        align-items center
        p
          font-size 14px
          color #333333
          span
            color #ff8e43
        .copy
          display inline-block
          font-size 13px
          color #e07d12
          line-height 19px
          margin-left 17.5px
          padding 0 6px
          background #ffe3bb
          border-radius 8px
    .wechat_intro_list
      padding 15px 0 30px 0
      border-bottom 1px dashed #ffdbac
      .title
        font-size 14px
        color #333333
        text-align center
        span
          display inline-block
          padding 0 10px
          position relative
          .left
            width 50px
            height 2px
            position absolute
            margin auto
            top 0
            bottom 0
            left -60px
          .right
            width 50px
            height 2px
            position absolute
            margin auto
            top 0
            bottom 0
            right -60px
            transform rotateZ(180deg)
      ul
        text-align center
        display flex
        margin-top 25px
        li
          width 33.33%
          img
            width 36px
            height 36px
            margin 0 auto
          span
            display block
            font-size 14px
            color #333333
            line-height 2.2
          p
            font-size 12px
            color #333333
            line-height 1.5
</style>
