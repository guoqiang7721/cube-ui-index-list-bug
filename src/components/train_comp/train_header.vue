<template>
  <div>
    <div class="banner">
      <div class="banner_top">
        <img
          class="ztc_text"
          src="https://zfile.bxwh002.cn/wmp/images/ztc_bg_text.png"
        />
        <p>提升业绩/拓展团队/获取客户怎么做更轻松？</p>
      </div>
      <img
        class="mode_img"
        src="https://zfile.bxwh002.cn/img/default/train_index_mode.png"
        alt="获客新模式"
      />
      <div class="pro_ser">
        <p>
          直通车累计为
          <span class="leiji_amount">{{ Data.total }}</span> 位用户提供了
        </p>
      </div>
      <div class="pro_list">
        <div class="pro_item">
          <p class="pro_title">人脉</p>
          <p class="pro_amount">{{ Data.connection }}</p>
        </div>
        <div class="pro">
          <p class="pro_title">需求</p>
          <p class="pro_amount">{{ Data.need }}</p>
        </div>
        <div class="pro">
          <p class="pro_title">订单</p>
          <p class="pro_amount">{{ Data.order }}</p>
        </div>
      </div>
      <swiper :data="Data.openList" :swiperSlot="swiperSlot" v-if="isFlag">
        <cube-slide-item v-for="item in Data.openList" :key="item.imgurl">
          <a>
            <img :src="item.imgurl" />
            <p>
              {{ item.time }}<span class="act"> {{ item.name }} </span
              >{{ item.content }}
            </p>
          </a>
        </cube-slide-item>
      </swiper>
    </div>
  </div>
</template>
<script>
import Swiper from 'base/swiper/swiper'
export default {
  data() {
    return {
      swiperSlot: false, // slot def
      swiperList: [], // swiper def
      isFlag: false, // 为了加载数据  def
      Data: [] // Brief数据
    }
  },
  props: {
    vUserInfo: {
      type: Object,
      default: null
    },
    token: {
      type: String
    },
    vid: {
      type: String
    }
  },
  created() {
    this.getBrief()
  },
  methods: {
    // 获取swiper数据
    getBrief() {
      var _this = this
      this.$api.train
        .getBrief({
          vid: _this.vUserInfo.vid,
          mid: _this.vUserInfo.mid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          this.Data = data
          this.swiperList = data.openList
          this.isFlag = true
        })
    }
  },
  components: {
    Swiper
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.banner
  width 100%
  margin 46px auto 10px
  height 273px
  bg_image('https://zfile.bxwh002.cn/img/default/train_index_bg.jpg')
  .banner_top
    overflow hidden
    padding-top 10px
    .ztc_text
      width 73.5px
      height 32px
      float left
      margin-left 5px
    p
      display inline-block
      font-size 12px
      margin-left 5px
      color #fff
      vertical-align -2px
  .mode_img
    width 290px
    height 80px
    display block
    margin 5px auto
  .slider-content
    width 92%
    margin 18px auto 0
    height 30px
    line-height 30px
    font-size 13px
    background rgba(24, 24, 24, 0.2)
    border-radius 15px
    overflow hidden
    z-index 1
    img
      width 26px
      height 26px
      border-radius 13px
      margin 3px 5px 0 3px
      float left
    p
      color #fff
      one_txt_cut()
      .act
        color #ff8b58
  .pro_ser
    width 92%
    margin 12.5px auto 0
    text-align center
    p
      font-size 20px
      color #fff
      font-weight bold
      line-height 1
    .leiji_amount
      color #fff720
  .pro_list
    width 95%
    margin 12px auto 0
    flex_row()
    justify-content space-between
    .pro_item
      text-align center
    .pro_title
      text-align center
      display block
      font-size 15px
      color rgba(255, 255, 255, 0.8)
      line-height 1
      color #fff
    .pro_amount
      display block
      font-size 21px
      line-height 1
      color #fff
      margin-top 6px
</style>
