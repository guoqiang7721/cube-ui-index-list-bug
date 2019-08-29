<template>
  <div class="card">
    <span class="lead"
      >您还没有创建<span v-if="proUser">{{ proUser.brand }}</span
      >名片哦!</span
    >
    <!-- <div class="info_list">
      <div class="info" v-for="(item,index) in introList" :key="index">
        <div class="circle"></div>
        {{item}}
      </div>
    </div> -->
    <img
      class="phone"
      v-if="!proUser"
      src="https://zfile.bxwh002.cn/img/default/reg_def_hasbrand.png"
    />
    <div class="brand_bg" v-else>
      <img :src="proUser.logo" />
    </div>
    <span class="quick">- 高效扩充人脉宝库 迅速抢占市场先机 -</span>
    <div class="readagreement">
      <cube-checkbox v-model="checked" shape="square" :hollow-style="true">
        阅读并接受
      </cube-checkbox>
      <i @click="_gAgreement">《服务协议》</i>
    </div>
    <button
      class="create_btn"
      :class="{ cancelselect: isCancelSelect }"
      @click="_createCard"
    >
      快速创建我的名片
    </button>
    <div class="account_container" v-if="proUser">
      <div @click="_changeBrand">不是我的品牌?</div>
    </div>
    <!-- <span class="recommend_text" v-if="proUser">
      推荐人 : <span>{{ proUser.name }}</span>
    </span> -->
  </div>
  <!-- <button class="creat_card" :class="canselect" @click="createCard"> -->
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { popToast } from 'common/js/cubePop'
import { getProUser, getAuthInfo } from 'common/js/getCommonInfo'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      introList: [
        // 介绍 title
        '获取海量人脉',
        '分享获客爆文',
        '推广赚取佣金'
      ],
      nid: '',
      checked: true, // 默认选中
      isCancelSelect: false, // 是否可创建名片
      proUser: '' // 上级信息
    }
  },
  async created() {
    await getAuthInfo(this.token)
    if (this.mid) await this.$router.replace('/home')
  },
  mounted() {
    const { bid, nid } = this.getParams()
    if (nid) this.nid = nid
    if (bid) this.getData(bid)
  },
  methods: {
    // 不是我的品牌
    _changeBrand() {
      this.goNext('/login', { nid: this.nid })
    },
    // 快速创建名片
    _createCard() {
      if (!this.checked) {
        const popToastObj = {
          _this: this,
          txt: '请勾选服务协议'
        }
        popToast(popToastObj)
        return
      }
      if (this.proUser) {
        this.goNext('/login', {
          brandName: this.proUser.brand,
          brandId: this.proUser.bid,
          nid: this.getParams().nid
        })
      } else {
        this._changeBrand()
      }
    },
    // 服务协议
    _gAgreement() {
      this.goNext('/login/aggrement')
    },
    async getData(_bid) {
      const proUser = await getProUser({
        token: this.token,
        vid: this.vid,
        bid: _bid
      })
      if (proUser) {
        this.proUser = proUser
        document.title = `${proUser.brand}的微名片`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.cube-checkbox {
  padding: 0;
}

.card {
  padding: 40px 0 5px 0;
  width: 100%;
  flex_column();
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #767676;

  .lead {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    letter-spacing: 1.5px;

    span {
      color: #ff7145;
    }
  }

  .info_list {
    margin-top: 20px;
    width: 98%;
    flex_row();
    align-items: center;
    justify-content: space-around;
    position: relative;

    .info {
      flex: 1;
      flex_row();
      align-items: center;
      justify-content: center;
      font-size: 13px;

      .circle {
        width: 8px;
        height: 8px;
        background-color: #ff9d22;
        border-radius: 50%;
        margin-right: 4%;
      }
    }
  }

  .recommend_text {
    font-size: 13px;
    color: #666;
    letter-spacing: 2px;
    line-height: 1.5;

    span {
      color: #ff7145;
    }
  }

  .phone {
    width: 226px;
    height: 248px;
    margin-top: 40px;
  }

  .brand_bg {
    margin-top: 40px;
    width: 226px;
    height: 248px;
    bg_image('https://zfile.bxwh002.cn/img/default/reg_def_nobrand.png');

    img {
      width: 58px;
      height: 44px;
      margin: 68px 0 0 18px;
    }
  }

  .account_container {
    width: 90%;
    height: 44px;
    text-align: center;

    div {
      height: 32.5px;
      line-height: 32.5px;
      text-align: center;
      font-size: 15px;
      color: #666;
      margin: 7.5px 0;
    }

    .old_per {
      font-size: 18px;
    }
  }

  .quick {
    color: #777;
    font-size: 14px;
  }

  .create_btn {
    margin-top: 20px;
    btn(90%, 44px, 18px, '', #fff, 5px);
    bg_linear();
  }

  .cancelselect {
    bgc(#ccc);
  }

  .readagreement {
    color: #333;
    font-size: 13px;
    margin-top: 10px;
    flex_row();
    align-items: center;
    justify-content: center;

    i {
      color: #507dff;
    }
  }
}
</style>
