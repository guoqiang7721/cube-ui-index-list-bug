<template>
  <div class="intro_container">
    <img
      class="powertip_img"
      src="https://zfile.bxwh002.cn/img/default/train_index_powerTip.jpg"
    />
    <div class="train_power">
      <ul class="item">
        <li>
          <img
            src="https://zfile.bxwh002.cn/img/default/train_index_powerIcon1.jpg"
          />
          <span>人脉置顶</span>
        </li>
        <li>
          <img
            src="https://zfile.bxwh002.cn/img/default/train_index_powerIcon2.jpg"
          />
          <span>永久会员</span>
        </li>
        <li>
          <img
            src="https://zfile.bxwh002.cn/img/default/train_index_powerIcon3.jpg"
          />
          <span>高级代言人</span>
        </li>
        <li>
          <img
            src="https://zfile.bxwh002.cn/img/default/train_index_powerIcon4.jpg"
          />
          <span>无限获客</span>
        </li>
      </ul>
    </div>
    <div class="case_wrap">
      <div class="title">
        <span>每日签单真实案例</span>
      </div>
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide
          class="swiper-item"
          v-for="(item, index) in caseList"
          :key="index"
        >
          <img :src="item" class="pic" @click="_getPreview(index)" alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="point_list">
      <div class="point_item" v-for="item in pointList" :key="item.id">
        <img :src="item.pic" class="point_image" />
        <p class="point_txt">{{ item.text }}</p>
      </div>
    </div>
    <div class="case_wrap">
      <div class="title">
        <span>摆数据 讲事实</span>
      </div>
      <p class="caseshort">
        大咖直通车，自2016年上线以来，共计
        <span class="origen">1896</span>
        位用户，总共获客数
        <span class="origen">72048</span>
        次，每人平均获得达到
        <span class="origen">38</span>人。
      </p>
      <img
        class="trend"
        src="https://zfile.bxwh002.cn/img/default/train_case_trend.jpg"
      />
    </div>
    <div class="case_wrap">
      <div class="title">
        <span>成功销售人经验分享</span>
      </div>
      <div class="caseshort" style="text-align:center">
        <span>讲述他们的签单经验</span>
      </div>
      <div
        class="expirence"
        v-for="(item, index) in expirenceList"
        :key="item.name"
        @click="_getExpirence(index)"
      >
        <img :src="item.pic" class="vasupic" />
        <div class="expirence_txt">
          <span
            ><b>{{ item.name }}</b> {{ item.brand }}</span
          >
          <p>{{ item.city }}</p>
        </div>
        <img
          src="https://zfile.bxwh002.cn/img/default/train_icon_right.jpg"
          class="vasright"
        />
      </div>
      <img
        class="exp_bot_img"
        src="https://zfile.bxwh002.cn/img/default/train_index_exp_bot.jpg"
        alt=""
      />
    </div>
    <div class="case_wrap">
      <div class="title">
        <span>直通车获客流程</span>
      </div>
      <img
        class="flow"
        src="https://zfile.bxwh002.cn/img/default/train_case_flow.jpg"
      />
    </div>
    <div class="case_wrap last_wrap">
      <div class="title">
        <span>三大服务助您获客</span>
      </div>
      <img
        class="service"
        src="https://zfile.bxwh002.cn/img/default/train_case_service.jpg"
      />
    </div>
    <!-- 经验分享预览 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated fadeIn fast"
      leave-active-class="animated fadeOut fast"
    >
      <dialog-img :cname="expCls" v-if="isExpPop" @closePop="_closeExpPop">
        <template v-slot:mainImg>
          <div class="case_wrap">
            <div class="title">
              <span>成功销售人经验分享</span>
            </div>
            <p class="caseshort" style="text-align: center">
              讲述他们的签单经验
            </p>
            <div class="case_exp_pop">
              <img :src="caselistPopList.imgurl" class="ztc_img" />
              <div class="case_cont">
                <span>
                  <b>
                    {{ caselistPopList.name }}
                  </b>
                  {{ caselistPopList.brand }}
                  {{ caselistPopList.address }}
                </span>
                <p>{{ caselistPopList.content }}</p>
              </div>
              <img
                class="case_record_img"
                src="https://zfile.bxwh002.cn/img/default/train_index_hf_record.jpg"
                alt=""
              />
              <swiper :options="swiperOption" class="swiper-box">
                <swiper-slide
                  class="swiper-item"
                  v-for="(item, index) in caselistPopList.imglist"
                  :key="index"
                >
                  <img
                    :src="item"
                    class="pic"
                    @click="_getCasePreview(index)"
                    alt=""
                  />
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </template>
      </dialog-img>
    </transition>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getPreview } from 'common/js/getPreivew'
import dialogImg from 'base/dialog/dialogImg'
export default {
  data() {
    return {
      isExpPop: false, // 预览签单经验
      expCls: 'expCls',
      caselistPopList: [], // 预览
      // 真实案例
      caseList: [
        'https://zfile.bxwh002.cn/img/default/train_case_img1.jpg',
        'https://zfile.bxwh002.cn/img/default/train_case_img2.jpg',
        'https://zfile.bxwh002.cn/img/default/train_case_img3.jpg',
        'https://zfile.bxwh002.cn/img/default/train_case_img4.jpg',
        'https://zfile.bxwh002.cn/img/default/train_case_img5.jpg'
      ],
      // 签单经验
      expirenceList: [
        {
          pic: 'https://zfile.bxwh002.cn/img/default/train_icon_wang.jpg',
          name: '王可唯',
          brand: '铸源',
          city: '上海'
        },
        {
          pic: 'https://zfile.bxwh002.cn/img/default/train_icon_li.jpg',
          name: '李鑫群',
          brand: '康婷',
          city: '江苏-盐城'
        },
        {
          pic: 'https://zfile.bxwh002.cn/img/default/train_icon_yuan.jpg',
          name: '袁媛',
          brand: '中国人寿',
          city: '上海'
        },
        {
          pic: 'https://zfile.bxwh002.cn/img/default/train_icon_guang.jpg',
          name: '邝晴楚',
          brand: '华夏人寿',
          city: '山东-济南'
        }
      ],
      // 预览签单经验
      casePreviewList: [
        {
          name: '王可唯',
          imgurl:
            'https://zfile.bxwh002.cn/Public/default/images/experience/people_wang.jpg',
          brand: '铸源',
          address: '上海',
          content:
            '我是直通车的忠实用户，因为加入较早客户现在已经推送了接近一百多个客户，非常感谢直通车！',
          imglist: [
            'https://zfile.bxwh002.cn/Public/default/images/experience/experiencea1.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experiencea2.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experiencea3.jpg'
          ]
        },
        {
          name: '李鑫群',
          imgurl:
            'https://zfile.bxwh002.cn/Public/default/images/experience/people_guang.jpg',
          brand: '康婷',
          address: '江苏-盐城',
          content:
            '我是2019年5月份加入直通车的，现在平台已经推送给了我超过20位客户。',
          imglist: [
            'https://zfile.bxwh002.cn/Public/default/images/experience/experienceb1.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experienceb2.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experienceb3.jpg'
          ]
        },
        {
          name: '袁媛',
          imgurl:
            'https://zfile.bxwh002.cn/Public/default/images/experience/people_yuan.jpg',
          brand: '中国人寿',
          address: '广东-广州',
          content:
            '我是2019年3月份加入直通车的，现在平台已经推送给了我超过10位客户。',
          imglist: [
            'https://zfile.bxwh002.cn/Public/default/images/experience/experiencec1.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experiencec2.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experiencec3.jpg'
          ]
        },
        {
          name: '邝晴楚',
          imgurl:
            'https://zfile.bxwh002.cn/Public/default/images/experience/people_guang.jpg',
          brand: '华夏人寿',
          address: '山东-济南',
          content:
            '我是2016年5月份加入直通车的，现在平台已经推送给了我超过102位客户。',
          imglist: [
            'https://zfile.bxwh002.cn/Public/default/images/experience/experienced1.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experienced2.jpg',
            'https://zfile.bxwh002.cn/Public/default/images/experience/experienced3.jpg'
          ]
        }
      ],
      // 定位协助
      pointList: [
        {
          pic:
            'https://zfile.bxwh002.cn/img/default/train_index_powerIcon5.jpg',
          text: '精准定位',
          id: '0'
        },
        {
          pic:
            'https://zfile.bxwh002.cn/img/default/train_index_powerIcon6.jpg',
          text: '专家协助',
          id: '1'
        },
        {
          pic:
            'https://zfile.bxwh002.cn/img/default/train_index_powerIcon7.jpg',
          text: '效果计费',
          id: '2'
        },
        {
          pic:
            'https://zfile.bxwh002.cn/img/default/train_index_powerIcon8.jpg',
          text: '灵活可控',
          id: '3'
        }
      ],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 30
      }
    }
  },
  mounted() {
    window.onpopstate = () => {
      this.$createImagePreview().hide()
    }
  },
  methods: {
    // 获取签单经验
    _getExpirence(i) {
      this.caselistPopList = this.casePreviewList[i]
      this.isExpPop = true
    },
    _closeExpPop() {
      this.isExpPop = false
    },
    _getCasePreview(index) {
      getPreview({
        previewList: this.caselistPopList.imglist,
        index: index,
        _this: this
      })
    },
    // 预览
    _getPreview(index) {
      getPreview({
        previewList: this.caseList,
        index: index,
        _this: this
      })
    }
  },
  props: {
    vUserInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    swiper,
    swiperSlide,
    dialogImg
  }
}
</script>
<style scoped>
.cube-scroll-content {
  width: 70% !important;
}
</style>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.expCls
  top 15%
.swiper-box
  width 100%
.swiper-slide
  width 94px
  height 170px
  margin-right 5% !important
  .pic
    width 100%
    height 170px
  &:nth-child(1)
    margin-left 5%
.act
  color #ff8b58
.intro_container
  width 100%
  margin 0 auto
  .powertip_img
    display block
    width 240.5px
    height 35.5px
    margin 0 auto
  .point_list
    width 100%
    display flex
    flex-direction row
    align-items center
    .point_item
      width 25%
      text-align center
      padding 14px 0
      .point_image
        display block
        width 40px
        height 40px
        margin 0 auto
      .point_txt
        display block
        font-family PingFang-SC-Medium
        font-size 14px
        line-height 14px
        height 14px
        color #666666
        text-align center
        margin-top 9px
  .train_power
    padding 10px 0 12.5px 0
    border-top 1px solid #f4f4f4
    .item
      height 80px
      margin-top 17.5px
      flex_row()
      >li
        flex 1
        img
          display block
          width 46px
          margin 0 auto
        span
          display block
          font-size 14px
          color #333333
          text-align center
          line-height 3
  .last_wrap
    margin-bottom 80px !important
  .case_wrap
    width 88%
    margin 20px auto 10px
    background-color #ffd1b0
    border-radius 5px
    padding 10px
    .caseshort
      color #535861
      font-size 17px
      line-height 1.6
      margin-bottom 8px
    .trend
      width 322.5px
      height 469px
    .flow
      width 322.5px
      height 495px
    .service
      width 322.5px
      height 590px
    .title
      display block
      width 75%
      margin -20px auto 10px auto
      background linear-gradient(to right, #ffac4f, #ff892f)
      border-radius 5px
      box-shadow 0 2px 6px #e1936b
      text-align center
      line-height 0
      span
        display inline-block
        font-size 17px
        line-height 2
        position relative
        color #fff
        &:before
          content ''
          display block
          width 8px
          height 8px
          background #fff
          border-radius 50%
          position absolute
          left -20px
          top 50%
          transform translateY(-50%)
        &:after
          content ''
          display block
          width 8px
          height 8px
          background #fff
          border-radius 50%
          position absolute
          right -20px
          top 50%
          transform translateY(-50%)
    .expirence
      width 80%
      margin 0 auto 10px auto
      background #fff
      border-radius 7.5px
      padding 10px 20px
      position relative
      &:after
        content ''
        display block
        clear both
      &:before
        content ''
        display block
        width 16px
        height 80%
        position absolute
        background rgba(255, 255, 255, 0.4)
        top 10%
        left -6px
        border-radius 7.5px
      .vasupic
        width 61px
        float left
      .expirence_txt
        width 175px
        float right
        padding-top 12.5px
        margin-bottom 10px
        span
          display block
          font-size 14px
          color #b3b7bf
          b
            font-size 16px
            color #34312f
        p
          font-size 14px
          color #b3b7bf
          line-height 2
      .vasright
        position absolute
        width 14px
        right 15px
        margin auto
        top 0
        bottom 0
    .exp_bot_img
      width 322.5px
      height 133px
      margin 0 auto
    .case_exp_pop
      width 90%
      margin 0 auto
      padding 4%
      background #fff
      border-radius 5px
      position relative
      &:before
        content ''
        display block
        width 100%
        height 80%
        background rgba(255, 255, 255, 0.5)
        border-radius 6px
        position absolute
        top 10%
        left -6px
        z-index -1
      &:after
        content ''
        display block
        clear both
      .ztc_img
        float left
        display block
        width 24%
      .case_cont
        width 70%
        float right
        span
          display block
          font-size 10px
          color #535861
          b
            font-size 12px
        p
          font-size 10px
          color #535861
          margin-top 4%
          line-height 1.6
      .case_record_img
        display block
        width 279px
        height 30.5px
        margin 5% auto
</style>
