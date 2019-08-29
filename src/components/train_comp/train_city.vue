<template>
  <div class="city_container">
    <header-com :title="title" @back="back" />
    <swiper :data="swiperList">
      <cube-slide-item v-for="(item, index) in swiperList" :key="index">
        <a>
          <img :src="item" />
        </a>
      </cube-slide-item>
    </swiper>
    <div class="attention">
      <p class="attention_title">您好，{{ vUserInfo.name }}</p>
      <div class="line"></div>
      <div class="attention_content">
        <p class="attention_txt">
          为了保证市场资源合理分配和您的推广效果，我们严格制定了每个城市每个品牌仅限<span>3个</span>名额的限制，请您先验证所选<span>品牌</span>和<span>城市</span>是否还有名额。
        </p>
        <p class="attention_txt">
          如遇因满额而无法开通的情况，我们感到非常抱歉，请您隔一段时间后再试。
        </p>
      </div>
      <div class="linebottom"></div>
    </div>
    <div class="dredge_container">
      <p class="title">请选择开通城市</p>
      <div class="dredge_city">
        <div class="city_list">
          <div class="city" v-for="(item, index) in cityList" :key="index">
            <p class="city_choose">开通城市{{ index + 1 }}</p>
            <p>{{ item.province }} {{ item.city }}</p>
            <div class="remove" @click="_removecity(index)">
              <img src="https://zfile.bxwh002.cn/wmp/images/shanchu.png" />
            </div>
          </div>
        </div>
        <s-city
          class="addcity"
          @cancelHandle="cancelHandle"
          @selectHandle="selectHandle"
          >添加地域</s-city
        >
      </div>
    </div>
    <button class="submit_btn" @click="submit">提交验证</button>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import vuexData from 'common/js/mixins/vuex_data'
import Swiper from 'base/swiper/swiper'
import routings from 'common/js/mixins/routings'
import sCity from 'base/city/city'
import { popToast } from 'common/js/cubePop'
import { cancelApply } from 'common/js/getCommonInfo'
export default {
  mixins: [vuexData, routings],
  data() {
    return {
      title: '直通车',
      swiperList: [
        'https://zfile.bxwh002.cn/img/default/train_city_banner1.jpg',
        'https://zfile.bxwh002.cn/img/default/train_city_banner2.png',
        'https://zfile.bxwh002.cn/img/default/train_city_banner3.png',
        'https://zfile.bxwh002.cn/img/default/train_city_banner4.png',
        'https://zfile.bxwh002.cn/img/default/train_city_banner5.png'
      ],
      cityList: []
    }
  },
  activated() {
    this.cityList = []
    cancelApply({
      token: this.token,
      vid: this.vid,
      mid: this.mid
    })
  },
  methods: {
    // 提交
    submit() {
      if (this.cityList.length === 0) {
        const popToastObj = {
          _this: this,
          txt: '请选择开通城市',
          mask: true
        }
        popToast(popToastObj)
        return
      }
      this.createApply()
    },
    // 选择城市提交验证
    createApply() {
      var _this = this
      this.$api.train
        .createApply({
          vid: _this.vUserInfo.vid,
          mid: _this.vUserInfo.mid,
          token: _this.token,
          brand: _this.vUserInfo.brand,
          applyArea: JSON.stringify(_this.cityList)
        })
        .then(res => {
          this.goNext('/train/pay')
        })
    },
    // 选择城市
    selectHandle(val, index, cityText) {
      console.log(cityText[0])
      console.log(cityText[1])
      let cityObj = {
        province: cityText[0],
        city: cityText[1]
      }
      console.log(cityObj)
      this.cityList.push(cityObj)
      console.log(this.cityList)
    },
    // 取消选择
    cancelHandle() {},
    // 取消选中城市
    _removecity(i) {
      this.cityList.splice(i, 1)
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    Swiper,
    sCity
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.city_container {
  bgc(#fff);
}

.slider-content {
  width: 100%;
  height: 200px;
  margin-top: 46px;
}

.attention {
  background: #fff9f0;
  padding: 10px;
  width: 333px;
  height: 182px;
  margin: 12px auto;
  border-radius: 3px;

  .attention_title {
    font-size: 18px;
    line-height: 32px;
    color: #333333;
    font-weight: bold;
  }

  .attention_content {
    .attention_txt {
      display: block;
      font-size: 14px;
      line-height: 28px;
      color: #757575;
      overflow: visible;
      text-indent: 2em;

      span {
        &:first-child {
          color: #fd8935;
        }

        &:nth-child(2) {
          color: #ff882d;
        }

        &:last-child {
          color: #ff6535;
        }
      }
    }
  }
}

.dredge_container {
  .title {
    display: block;
    width: 90%;
    margin: 0 auto;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: #333;
  }

  .dredge_city {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 auto;
    box-shadow: 0 3px 7.5px #ffefe3;
    box-sizing: border-box;
    padding: 15px 0;

    .city_list {
      width: 100%;

      .city {
        padding: 0 12px;
        position: relative;
        margin-bottom: 6px;

        &:first-child {
          .remove {
            display: none;
          }
        }

        p {
          display: inline-block;
          font-size: 15px;
          color: #666;
          margin-right: 25px;
          line-height: 19px;
          height: 19px;

          &.city_choose {
            color: #999999;
            margin-right: 25px;
          }
        }

        .remove {
          width: 19px;
          height: 19px;
          position: absolute;
          right: 12px;
          top: 4px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .cityPicker {
      width: 128px;
      height: 36.5px;
      line-height: 36.5px;
      padding-left: 19px;
      bg_image('https://zfile.bxwh002.cn/wmp/images/summer_tianjiadiyu.png');
      text-align: center;
      margin: 18px auto 0;
      font-size: 18px;
      color: #000;
    }
  }
}

.submit_btn {
  display: block;
  width: 349.5px;
  letter-spacing: 1px;
  color: #fff;
  bgc(#ffa043);
  border-radius: 5px;
  margin: 0 auto;
  box-shadow: 0 2px 8px #ffefe3;
  padding: 11px 0;
  font-size: 17px;
  margin: 14px auto 18px;
}
</style>
