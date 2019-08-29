<template>
  <div>
    <div class="card_text">
      <span>银行卡信息</span>
    </div>
    <div class="card">
      <div class="card_bg" :style="cardBg" v-if="bankInfo">
        <div class="card_main">
          <p>
            <span class="left">卡&nbsp;&nbsp;&nbsp;号:</span>
            <span class="right">{{ bankInfo.cardsn }}</span>
          </p>
          <p>
            <span class="left">持卡人:</span>
            <span class="right">{{ bankInfo.name }}</span>
          </p>
          <p>
            <span class="left">手机号:</span>
            <span class="right">{{ bankInfo.tel }}</span>
          </p>
        </div>
      </div>
      <div class="card_bg" :style="cardBg" v-else>
        <img
          @click="addCard"
          src="https://zfile.bxwh002.cn/wmp/images/add.png"
        />
        <span class="add">点击添加银行卡</span>
      </div>
      <div class="modify_card" v-if="bankInfo" @click="_modifyCard">
        修改银行卡信息
      </div>
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      hasCardBg: 'https://zfile.bxwh002.cn/img/default/bank_card_bg.png',
      noCardBg: 'https://zfile.bxwh002.cn/img/default/bank_card_bg_none.png'
    }
  },
  computed: {
    cardBg() {
      return this.bankInfo
        ? `background-image:url(${this.hasCardBg})`
        : `background-image:url(${this.noCardBg})`
    }
  },
  props: {
    bankInfo: {
      type: Object,
      default: null
    }
  },
  methods: {
    addCard() {
      this.goNext('/promote/pro_edit')
    },
    _modifyCard() {
      this.setBankInfo(this.bankInfo)
      this.goNext('/promote/pro_edit')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.card_text {
  width: 100%;
  background: #fff;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #e6e6e6;

  span {
    margin-left: 12px;
  }
}

.card {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  position: relative;
  margin-top: 0;

  .card_bg {
    width: 95%;
    height: 140px;
    margin: 12px auto;
    position: relative;
    flex_column();
    justify-content: center;
    background-size: 100% 100%;

    img {
      width: 44px;
      height: 44px;
      display: block;
      margin: 0 auto;
      text-align: center;
    }

    .add {
      font-size: 17px;
      color: #fff;
      display: block;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
    }

    .card_main {
      text-align: left;
      margin-left: 5%;
      flex_column();
      justify-content: center;
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);

      p {
        margin-bottom: 10px;
        font-size: 16px;
        flex_row();
        align-items: center;

        .left {
          width: 20%;
        }

        .right {
          color: #fff;
          font-size: 17px;
        }

        &:first-child {
          .right {
            font-weight: bold;
          }
        }
      }
    }
  }

  .modify_card {
    display: block;
    margin: 0 auto;
    width: 95%;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 17px;
    text-align: center;
    margin-bottom: 11px;
    bg_linear();
    border-radius: 5px;
  }
}
</style>
