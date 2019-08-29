<template>
  <swiper :options="swiperOption_" class="recommend_container" ref="mySwiper">
    <swiper-slide
      v-for="(item, index) in famousList"
      :key="index"
      ref="slide"
      :class="{ actCls: famousList.length === 1 }"
    >
      <p v-show="false">{{ getNowTime }}</p>
      <div class="item">
        <div class="recomment_top">
          <div class="recomment_top_inner">
            <div class="recomment_pic" @click="_gHome(item)">
              <img
                class="rpic"
                src="https://zfile.bxwh002.cn/img/default/fair_famous_crown.png"
              />
              <img :src="item.upic" class="recomment_upic" />
              <span>查看名片</span>
            </div>
            <div class="recomment_center">
              <b>{{ item.brand }}{{ item.title }}</b>
              <span>{{ item.name }}</span>
              <p>
                <i class="iconpersonal_icon_fujinren"></i>
                {{ item.province }} {{ item.city }}
              </p>
            </div>
            <div class="recomment_ewm">
              <img :src="item.ad_pic" />
              <span>长按扫码 了解项目</span>
            </div>
          </div>
          <div class="textshadow_box" @click="_gPutUrl(item.put_url)">
            <p>{{ item.ad_sign }}</p>
          </div>
          <img
            v-if="item.put_url"
            src="https://zfile.bxwh002.cn/img/default/fair_famous_look.png"
            class="right_look"
            @click="_gPutUrl(item.put_url)"
          />
        </div>
        <div class="recomment_bottom">
          <img src="https://zfile.bxwh002.cn/img/default/fair_famous_mrt.png" />
          <p class="recomment_time">
            <span>{{ _getTimeComputed(item.expire_time)[0] }}</span> 天
            <span>{{ _getTimeComputed(item.expire_time)[1] }}</span> 时
            <span>{{ _getTimeComputed(item.expire_time)[2] }}</span> 分
            <span>{{ _getTimeComputed(item.expire_time)[3] }}</span> 秒
          </p>
          <router-link to="/train/index">我也申请</router-link>
        </div>
      </div>
    </swiper-slide>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
  </swiper>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const GHome = 'gHome'
const PutUrl = 'gPutUrl'
// const GetSwiperData = 'getSwiperData'
export default {
  data() {
    return {
      getNowTime: ''
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    if (this.famousList) {
      this._getNowTime()
      setTimeout(this._getTimeComputed, 1000)
    }
  },
  methods: {
    _gPutUrl(url) {
      alert(url)
      this.$emit(PutUrl, url)
    },
    _gHome(item) {
      this.$emit(GHome, item)
    },
    _getNowTime() {
      setInterval(() => {
        this.getNowTime = new Date().getTime()
      }, 1000)
    },
    // 计算时间
    _getTimeComputed(itemEnd) {
      var showTime
      // var endItem=new Date(itemEnd).getTime();//获取列表传的截止时间
      var endItem = itemEnd * 1000
      var nowItem = new Date().getTime() // 获取当前时间
      var rightTime = endItem - nowItem // 截止时间减去当前时间
      if (rightTime > 0) {
        var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24)
        var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24)
        var mm = Math.floor((rightTime / 1000 / 60) % 60)
        var ss = Math.floor((rightTime / 1000) % 60)
        showTime = [dd, hh, mm, ss]
        // this.MerchantDemandList.status=1
      } else {
        showTime = ['00', '00', '00', '00']
        // this.MerchantDemandList.status=0
      }
      return showTime
    }
  },
  props: {
    swiperOption_: {
      type: Object
    },
    famousList: {
      type: Array
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

.actCls {
  width: 100% !important;
}

.recommend_container {
  width: 170%;
  height: 182px;
  margin: 15px auto 18px auto;
  overflow: visible;
  position: relative;
  left: -35%;

  .swiper-slide {
    transform: scale(0.94);

    .item {
      margin: 0 auto;
      border-radius: 4px;
      box-shadow: 0 3px 6px #e6e6e6;
      overflow: hidden;
    }
  }

  .swiper-slide-active {
    transform: scale(1);
    margin-top: 0;
  }
}

.swiper-inner {
  width: 100%;
  overflow: hidden;
  height: 182px;
  padding: 5px 0 20px;

  .swiper-slide {
    width: 319px;
    height: 182px;

    .item {
      margin: 0 auto;
      border-radius: 4px;
      box-shadow: 0 3px 6px #e6e6e6;
      overflow: hidden;

      .recomment_top {
        background: linear-gradient(to bottom, #ffffff, #fff6e6);
        padding: 18px 28px 12px 12px;
        position: relative;

        .recomment_top_inner {
          display: flex;
        }

        .textshadow_box {
          width: 100%;
          margin-top: 5px;
          font-size: 12px;
          color: #ff802b;
          overflow: hidden;
          line-height: 18px;
          height: 18px;
          position: relative;

          p {
            white-space: nowrap;
            position: absolute;
            text-shadow: 0 1px 3px #ffbc90;
            -webkit-animation: marquee 15s linear infinite;
            animation: marquee 15s linear infinite;
          }

          .copy {
            margin-left: 4px;
          }
        }

        .right_look {
          position: absolute;
          right: 0;
          top: 0;
          width: 52.5px;
        }

        .recomment_pic {
          position: relative;
          width: 75px;
          height: 75px;
          padding-top: 10px;

          .recomment_upic {
            width: 73px;
            height: 73px;
            border: 2px solid #ffae36;
            border-radius: 50%;
            overflow: hidden;
          }

          .rpic {
            width: 30px;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: -4px;
          }

          span {
            display: inline-block;
            width: 100%;
            line-height: 18px;
            background: linear-gradient(to right, #ffdc65, #ffc24b);
            border-radius: 9px;
            position: absolute;
            left: 0;
            bottom: -5px;
            font-size: 12px;
            color: #97480f;
            text-align: center;
          }
        }

        .recomment_center {
          width: 150px;
          padding: 10px 10px 0 10px;

          b {
            display: block;
            font-size: 15px;
            color: #333333;
            line-height: 25px;
          }

          span {
            display: block;
            font-size: 13px;
            color: #999999;
            line-height: 32.5px;
          }

          p {
            font-size: 13px;
            color: #666666;

            i {
              color: #ff9834;
              font-size: 18px;
              margin-left: -3px;
            }
          }
        }

        .recomment_ewm {
          width: 70px;

          img {
            display: block;
            width: 70px;
            height: 70px;
            margin: 0 auto;
          }

          span {
            display: block;
            width: 130px;
            font-size: 12px;
            color: #999999;
            line-height: 1.6;
            text-align: center;
            position: relative;
            left: -30px;
            transform: scale(0.8);
          }
        }
      }

      .recomment_bottom {
        padding: 7.5px;
        height: 18px;
        background: #fff;

        img {
          width: 55px;
          height: 12px;
          margin-right: 10px;
          margin-top: 3px;
          float: left;
        }

        .recomment_time {
          width: 160px;
          line-height: 18px;
          color: #666666;
          float: left;
          font-size: 11px;

          span {
            display: inline-block;
            background: #f5f5f5;
            width: 18px;
            text-align: center;
            font-size: 11px;
            color: #ff9019;
            border-radius: 2px;
          }
        }

        a {
          font-size: 13px;
          color: #ce620b;
          padding-left: 12.5px;
          border-left: 1px solid #d4d4d4;
          line-height: 13px;
          margin-top: 2.5px;
          float: right;
        }
      }
    }
  }
}
</style>
