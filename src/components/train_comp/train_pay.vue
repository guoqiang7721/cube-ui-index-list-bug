<template>
  <div>
    <header-com :title="title" @back="back" />
    <div class="residue_time">
      <p>
        <span>剩余时间</span>
        <img
          src="https://zfile.bxwh002.cn/wmp/images/shalou.png"
          class="residue_icon"
        />
        <span class="bold">{{ min }}:{{ sec }}:{{ mi_sec }}</span>
      </p>
    </div>
    <div class="s_container">
      <div class="s_title">
        <i class="s_line"></i>
        <p>
          经验证，您获得了以下城市直通车的开通资格，请确认开通信息，支付后即可尊享！
        </p>
      </div>
      <div class="msg">
        <button class="modify_btn" @click="_modify">修改</button>
        <div class="msg_outer">
          <div class="msg_item">
            <div class="msg_title">
              姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名
              <!-- <p>姓</p>
              <p>名</p> -->
            </div>
            <p>{{ vUserInfo.name }}</p>
          </div>
          <div class="msg_item">
            <div class="msg_title">开通品牌</div>
            <p>{{ vUserInfo.brand }}</p>
          </div>
          <div class="msg_item">
            <div class="msg_title">联系电话</div>
            <p>{{ vUserInfo.tel }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class='s_container' v-if="cityList.available.length>0"> -->
    <div class="s_container" v-if="cityList.available">
      <div class="s_title">
        <i class="s_line"></i>
        <p>下列城市可开通</p>
      </div>
      <div
        class="city_outer"
        v-for="(item, index) in cityList.available"
        :key="index"
      >
        <div class="city_inner">
          <p class="city_left">{{ index + 1 }}</p>
          <p class="city_right">{{ item.province }} {{ item.city }}</p>
        </div>
      </div>
    </div>
    <div class="s_container">
      <div class="s_title">
        <i class="s_line"></i>
        <p>选择开通类型</p>
      </div>
      <div class="memType">
        <!--菁英套餐  -->
        <div
          class="memType_common"
          :class="{ act: payment_id === commonList.id }"
          @click="_chooseMem(commonList.id)"
        >
          <p class="memType_title">
            菁英套餐
            <span> x{{ availableLength }}</span>
          </p>
          <p class="memType_price">
            {{ commonList.price * availableLength }}
            <span> 元</span>
          </p>
          <p class="memType_extraText">限时赠送</p>
          <p class="memType_extraText">2-12个顾客</p>
        </div>
        <!--领袖套餐  -->
        <div
          class="memType_extreme"
          :class="{ act: payment_id === extremeList.id }"
          @click="_chooseMem(extremeList.id)"
        >
          <div class="memType_extreme_side">
            <p class="side_text_top"><span>4</span>倍</p>
            <p class="side_text_bot">人脉</p>
            <p class="side_text_bot">订单</p>
          </div>
          <div class="triangle"></div>
          <div class="memType_extreme_content leader">
            <p class="memType_title">
              领袖套餐
              <span> x{{ availableLength }}</span>
            </p>
            <p class="memType_price">
              {{ extremeList.price * availableLength }}
              <span> 元</span>
            </p>
            <!-- <p class='memType_extraText'>限时赠送</p> -->
            <p class="memType_extraText"></p>
            <!-- <p class='memType_extraText'>200-1000元红包</p> -->
            <p class="memType_extraText"></p>
          </div>
        </div>
      </div>
      <div class="readagreement" @click="_toggleAggrement">
        <cube-checkbox v-model="checked" shape="square" :hollow-style="true">
          同意
        </cube-checkbox>
        <i @click="_gAgreement">《搜索引擎签约推广服务电子协议》</i>
      </div>
    </div>
    <div class="s_container">
      <div class="s_title">
        <i class="s_line"></i>
        <p>选择支付方式</p>
      </div>
      <ul class="pay_container">
        <li v-for="item in payWayList" :key="item.id" @click="_getPayWay(item)">
          <i :class="item.icon"></i>
          <div>
            <p>{{ item.pay_text }}</p>
            <span>{{ item.pay_choose }}</span>
          </div>
          <i class="icongouxuan" v-if="payId === item.id"></i>
        </li>
      </ul>
    </div>
    <div style="height:65px"></div>
    <button class="submit_btn" @click="_pay">立即支付</button>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import base from 'request/api/base'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      title: '直通车',
      min: '10', // 分钟
      sec: '00', // 秒
      mi_sec: '00', // 毫秒
      cityList: {}, // 选择城市
      availableLength: '', // 选中城市length
      commonList: [], // 菁英套餐
      extremeList: [], // 领袖套餐
      payment_id: '2', // 套餐选中 def
      checked: true, // 协议 def
      micro_second: 600000,
      payWayList: [
        {
          icon: 'iconz-weixin',
          pay_text: '微信支付',
          pay_choose: '选择微信支付',
          id: 2
        },
        {
          icon: 'iconz-alipay',
          pay_text: '支付宝支付',
          pay_choose: '选择支付宝支付',
          id: 1
        }
      ],
      payId: 2
    }
  },
  created() {
    this.getPriceList()
    this._countDown()
  },
  activated() {
    this.getApply()
  },
  beforeDestroy() {
    clearTimeout(this.timeClock)
  },
  methods: {
    // 禁止用户toggle
    _toggleAggrement(e) {
      e.preventDefault()
    },
    // 直通车服务协议
    _gAgreement() {
      this.goNext('/train/aggrement')
    },
    // 修改信息
    _modify() {
      this.goNext('/mine/edit')
    },
    // 切换开通类型
    _chooseMem(i) {
      this.payment_id = i
    },
    _getPayWay(item) {
      this.payId = item.id
    },
    // 立即支付
    _pay() {
      this.createOrder()
    },
    // 创建订单
    createOrder() {
      var _this = this
      this.$api.train
        .createOrder({
          vid: _this.vUserInfo.vid,
          mid: _this.vUserInfo.mid,
          token: _this.token,
          payment_id: _this.payment_id,
          quantity: _this.availableLength,
          payment: _this.payId,
          h5: 1
        })
        .then(res => {
          const data = res.data.data
          const ordesn = data.order_sn
          let url
          if (this.payId === 2) {
            // 微信支付
            url = `${base.pay}/pay/go?o=${ordesn}`
          } else {
            // 支付宝支付
            url = `${base.pay}/pay/go_zfb?o=${ordesn}`
          }
          window.location.href = url
        })
    },
    // 获取直通车开通价格
    getApply() {
      var _this = this
      this.$api.train
        .getApply({
          vid: _this.vUserInfo.vid,
          mid: _this.vUserInfo.mid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          if (data) {
            this.cityList = data
            this.availableLength = data.available.length
          }
        })
    },
    // 获取套餐价格
    getPriceList() {
      var _this = this
      this.$api.train
        .getPriceList({
          vid: _this.vUserInfo.vid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          this.commonList = data[0]
          this.extremeList = data[1]
        })
    },
    // 计算
    _countDown() {
      // 获取当前时间
      // var date = new Date()
      // var now = date.getTime()
      // 时间差
      // eslint-disable-next-line camelcase
      var microSecond = this.micro_second
      // 定义变量 d,h,m,s保存倒计时的时间
      // eslint-disable-next-line camelcase
      if (microSecond >= 0) {
        // 秒数
        // eslint-disable-next-line camelcase
        var second = Math.floor(microSecond / 1000)
        // 分钟位
        var min = this._fill_zero_prefix(Math.floor(second / 60))
        // 秒位
        var sec = this._fill_zero_prefix(second - min * 60) // equal to => var sec = second % 60;
        // 毫秒位，保留2位
        // eslint-disable-next-line camelcase
        var mi_sec = this._fill_zero_prefix(Math.floor((microSecond % 100) / 1))
        this.min = min
        this.sec = sec
        // eslint-disable-next-line camelcase
        this.mi_sec = mi_sec
      } else {
        this.min = '00'
        this.sec = '00'
        this.mi_sec = '00'
      }
      this.micro_second -= 10
      // 递归每秒调用countTime方法，显示动态时间效果
      this.timeClock = setTimeout(this._countDown, 10)
    },
    _fill_zero_prefix(num) {
      return num < 10 ? '0' + num : num
    },
    back() {
      // this.goNext('/train/index')
      this.goBack()
    }
  },
  components: {
    HeaderCom
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.act {
  border: solid 1px #ff541f !important;
  background-color: #ffebda !important;
}

.cube-checkbox {
  padding: 0;
}

.readagreement {
  color: #333;
  font-size: 13px;
  margin-top: 10px;
  flex_row();
  align-items: center;
  justify-content: center;

  i {
    color: #ffa043;
  }
}

.residue_time {
  width: 100%;
  height: 41px;
  background-color: #ffa525;
  text-align: center;
  margin-top: 46px;

  p {
    font-size: 17px;
    color: #fefefe;
    line-height: 41px;

    img {
      width: 12px;
      height: 15.5px;
      margin: 0 11px;
      vertical-align: -2px;
    }

    .bold {
      font-weight: bold;
    }
  }
}

.s_container {
  width: 94%;
  margin: 23px auto 0 auto;
  background-color: #fff;
  border-radius: 4px;
  padding: 12px 22px 16px 22px;
  box-sizing: border-box;

  .s_title {
    font-size: 15px;
    line-height: 22px;
    color: #333;
    position: relative;
  }

  .s_line {
    width: 4px;
    height: 15px;
    background-color: #ffb125;
    position: absolute;
    left: -8px;
    top: 4px;
  }

  .msg {
    width: 100%;
    height: 97px;
    background-color: #fff;
    border-radius: 5px;
    border: solid 1px rgba(255, 230, 194, 0.42);
    overflow: hidden;
    position: relative;
    margin-top: 13px;
    padding-top: 10px;

    .modify_btn {
      width: 34px;
      height: 100%;
      background-color: #ffcb9d;
      position: absolute;
      font-size: 15px;
      line-height: 33px;
      color: #f86e12;
      top: 0;
      right: 0;
      writing-mode: vertical-rl;
      padding: 0;
      text-align: center;
      letter-spacing: 5px;
      border-radius: 0;
      border: 0;
    }

    .msg_outer {
      .msg_item {
        display: flex;
        flex-flow: row;
        font-size: 15px;
        line-height: 30px;
        color: #666666;
        padding: 0 10px;

        .msg_title {
          display: flex;
          // width:61px;
          // padding-right 15px
          flex-direction: row;
          justify-content: space-between;
          margin-right: 25px;
          color: #ff862d;
        }
      }
    }
  }

  .pay_container {
    padding: 12.5px 0;
    overflow: hidden;
    flex_row();
    justify-content: space-between;

    li {
      width: 40%;
      padding: 10px 10px;
      bd(#d6d6d6);
      bd_r(10px);
      font-size: 14px;
      color: #333;
      flex_row();
      align-items: center;
      position: relative;

      i {
        font-size: 32px;

        &.iconz-weixin {
          color: #4fce62;
        }

        &.iconz-alipay {
          color: #01aaef;
        }

        &.icongouxuan {
          position: absolute;
          right: 0;
          bottom: -2px;
          color: #ff9d62;
        }
      }

      div {
        margin-left: 5px;

        p {
          font-size: 13px;
        }

        span {
          font-size: 11px;
          color: #999999;
        }
      }
    }
  }

  .city_outer {
    .city_inner {
      display: flex;
      margin-top: 17.5px;
      color: #333;

      .city_left {
        display: block;
        width: 18px;
        height: 18px;
        background-color: #ffe6c2;
        border-radius: 50%;
        font-size: 14px;
        line-height: 18px;
        color: #f87912;
        text-align: center;
        margin-right: 16.5px;
      }

      .city_right {
        font-size: 15px;
        line-height: 18px;
        color: #333;
      }
    }
  }

  .memType {
    margin-top: 15px;
    display: flex;
  }

  .memType_price {
    display: block;
    font-size: 20px;
    text-align: center;
    line-height: 24px;
    color: #ff7428;
    margin: 14px 0 9px 0;
    font-weight: 600;

    span {
      font-size: 14px;
    }
  }

  .memType_extraText {
    display: block;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    color: #f87912;
  }

  .memType_common {
    width: 115px;
    height: 95px;
    background-color: #fff;
    border-radius: 5px;
    border: solid 1px #d6d6d6;
    padding: 12.5px 0;
  }

  .memType_title {
    display: block;
    font-size: 15px;
    text-align: center;
    line-height: 18px;
    color: #333333;

    span {
      font-size: 14px;
      color: #ff7428;
    }
  }

  .memType_extreme_content {
    width: 110px;
    padding: 12.5px 0;
  }

  .leader {
    >.memType_price {
      margin: 30px 0 19px 0;
    }
  }

  .memType_extreme {
    width: 156px;
    height: 120px;
    position: relative;
    margin-left: 30px;
    border-radius: 5px;
    border: solid 1px #d6d6d6;
    display: flex;

    .triangle {
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-left: 7.5px solid #ff9d62;
      margin-top: 52px;
    }

    .memType_extreme_side {
      width: 45px;
      height: 120px;
      background-color: #ff9d62;
      top: -1px;
      left: -1px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;

      .side_text_top {
        display: block;
        text-align: center;
        font-size: 14px;
        color: #fdff7a;
        line-height: 22px;
        padding-top: 27px;
        margin-bottom: 2.5px;

        span {
          font-size: 22px;
          line-height: 22px;
          font-weight: 600;
        }
      }

      .side_text_bot {
        display: block;
        text-align: center;
        font-size: 15px;
        line-height: 18px;
        color: #fff;
      }
    }
  }
}

.submit_btn {
  display: block;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  letter-spacing: 1px;
  color: #fff;
  bgc(#ffa043);
  margin: 0 auto;
  box-shadow: 0 2px 8px #ffefe3;
  padding: 11px 0;
  font-size: 17px;
  // margin:14px auto 18px ;
}
</style>
