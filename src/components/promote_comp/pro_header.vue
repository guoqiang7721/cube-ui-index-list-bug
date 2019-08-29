<template>
  <div class="header">
    <div class="info">
      <span class="earn hide">我在大咖名片赚了(元)</span>
      <span class="earn_money">{{ walletInfo.total }}</span>
    </div>
    <!-- <div class="profit_money">
      <span class="profit_left" :class="profit">其中分红: {{ walletInfo.bonus }}元</span>
      <span class="profit_right" :class="isRecommend">推荐奖: {{ walletInfo.plus }}元</span>
    </div> -->
    <!-- 金额明细 -->
    <div class="money">
      <div>
        <span>今日收益(元)</span>
        <span class="balance"> {{ walletInfo.today }}</span>
      </div>
      <div>
        <span>冻结中(元)</span>
        <span class="balance">{{ walletInfo.frozen }}</span>
      </div>
      <div>
        <span>可提现(元)</span>
        <span class="balance">{{ walletInfo.balance }}</span>
      </div>
      <div>
        <span>已提现(元)</span>
        <span class="balance">{{ walletInfo.outcome }}</span>
      </div>
    </div>
    <!-- 去推广 -->
    <cube-button class="popularize"  @click="_gPromote">明细</cube-button>
    <!-- <button class="popularize" form-type="submit">
      去推广赚更多
    </button> -->
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
export default {
  mixins: [routings],
  data () {
    return {}
  },
  computed: {
    profit  () { // 分红
      return this.walletInfo.bonus === 0 ? 'hide' : ''
    },
    isRecommend () { // 推荐奖
      return this.walletInfo.plus === 0 ? 'hide' : ''
    }
  },
  props: {
    walletInfo: {
      type: Object,
      default: null
    }
  },
  methods: {
    _gPromote () {
      // this.goNext('/pro_way')
      this.goNext('/promote/pro_num')
    }
  }
}
</script>
<style lang="stylus" scoped>
.header {
  overflow: hidden;
  width: 100%;
  background: linear-gradient(to right, #ffc22f, #ff9d22);
  height: 175px;
  position: relative;
  margin 44px auto 0
}

.header .info {
  width: 50%;
  margin-left: 5%;
  margin-top: 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  color: #fff;
}

.header .info .earn_money {
  font-size: 44px;
  font-weight: bold;
  margin-top: 3%;
}

.header .profit_money {
  position: absolute;
  bottom: 65px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: #d60c0c;
}

.header .profit_money .profit_left {
  width: 40%;
  margin-left: 10%;
  text-align: left;
}

.header .profit_money .profit_right {
  width: 45%;
  margin-left: 5%;
  text-align: left;
}

.header .money {
  position: absolute;
  bottom: 0;
  background: #ffc22f;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.header .money div {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header .money div .balance {
  margin-top: 5px;
  font-size: 18px;
  color: #fff;
}

.header .popularize {
  width: 25%;
  position: absolute;
  right: 12px;
  top: 20%;
  color: #ff522f;
  font-size: 13px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  padding 0
}
</style>
