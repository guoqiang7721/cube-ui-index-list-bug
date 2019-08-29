<template>
  <div v-if="isWelcome">
    <div class="rc_container">
      <div class="welcome">
        <p>{{ vUserInfo.name }},欢迎回来</p>
        <div>
          <span>人工智能</span>
          <span>正在为你推荐人脉...</span>
        </div>
      </div>
    </div>
    <div class="search_cont">
      <div class="scan_box">
        <img
          class="scan"
          src="https://zfile.bxwh002.cn/img/default/fairmatch/regis_scan.png"
        />
        <img
          class="ai_tx"
          src="https://zfile.bxwh002.cn/img/default/fairmatch/AI_pic.png"
        />
      </div>
      <div class="percent">
        <p>{{ percentData }}%</p>
        <span>{{ percentText }}</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="rc_container">
      <div class="rm_text">
        <p>{{ vUserInfo.name }},欢迎回来</p>
        <div>
          <span>忙忙人海中为您发现以下人脉</span>
          <div>
            <span
              >你们或许久别重逢<br />
              或许初次相遇<br />
              不管怎样<br />
              都是一个美妙的开始</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="rec_list">
      <div class="item" v-for="(item, index) in recList" :key="index">
        <img :src="item.upic" />
        <div class="center">
          <p>{{ item.name }}</p>
          <div>
            <img
              class="gender"
              v-if="item.sex == 1"
              src="https://zfile.bxwh002.cn/wmp/images/nan_icon.png"
            />
            <img
              class="gender"
              v-else-if="item.sex == 2"
              src="https://zfile.bxwh002.cn/wmp/images/nv_icon.png"
            />
            <div class="brand">{{ item.brand }}</div>
          </div>
        </div>
        <div class="right">
          <span v-if="item.cat == 1">你们似曾相识</span>
          <span v-else-if="item.cat == 2">你们所处相同行业</span>
          <span v-else-if="item.cat == 3">你们在一个城市打拼</span>
          <span v-else-if="item.cat == 4">你们比较有缘噢</span>
        </div>
      </div>
    </div>
    <div class="btn_list">
      <div class="btn" @click="_gChat">互聊进入</div>
      <div class="back" @click="_gHome">不了, 谢谢</div>
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
      percentData: 10,
      percentText: '正在云端搜索...',
      isWelcome: true, // 欢迎回来字样
      recList: [] // 推荐列表
    }
  },
  activated() {
    this._getCommend()
  },
  methods: {
    // 加载动画
    _getCommend() {
      let interval = setInterval(() => {
        if (this.percentData >= 100) {
          clearTimeout(interval)
          this.commend()
        } else {
          this.percentData = this.percentData + 10
        }
      }, 200)
    },
    // 人脉搜索
    commend() {
      var _this = this
      this.$api.fairmatch
        .commend({
          vid: _this.vid,
          token: _this.token
        })
        .then(
          res => {
            const data = res.data.data
            if (data) {
              _this.percentText = data.desc
              _this.recList = data.data
            }
            setTimeout(() => {
              _this.isWelcome = false
            }, 1500)
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    // 跳转聊天页面
    _gChat() {
      this.goNext('/chat')
    },
    // 去首页
    _gHome() {
      this.goNext('/home')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

@keyframes search_animate {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  50% {
    -webkit-transform: translateY(-180px);
    transform: translateY(-180px);
  }

  100% {
    -webkit-transform: translateY(-360px);
    transform: translateY(-360px);
  }
}

// header
.rc_container {
  width: 100%;
  height: 226px;
  background-image: url('https://zfile.bxwh002.cn/img/default/fairmatch/regis_re_bg.png');
  background-size: 100% 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
  }

  .welcome {
    p {
      font-size: 19px;
      margin-top: 35px;
    }

    div {
      margin-top: 41px;
    }
  }

  .rm_text {
    animation: search_animate 20s linear forwards;

    p {
      font-size: 19px;
      margin-top: 35px;
    }

    &>div {
      margin-top: 20px;

      span {
        margin-top: 10px;
      }

      div {
        font-size: 15px;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        line-height: 2;
        margin-top: 10px;
      }
    }
  }
}

.search_cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  .scan_box {
    width: 151px;
    height: 151px;
    position: relative;
    background-image: url('https://zfile.bxwh002.cn/img/default/fairmatch/regis_scan_bg.png');
    background-size: 100% 100%;

    .scan {
      width: 151px;
      height: 151px;
      animation: _rotate_reverse_ 3s linear infinite;
    }

    .ai_tx {
      width: 44px;
      height: 44px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .percent {
    width: 80%;
    font-size: 15px;
    color: #999;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    text-align: center;

    p {
      color: #ffa21f;
    }

    span {
      margin-top: 15px;
      line-height: 2;
    }
  }
}

.rec_list {
  .item {
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;

    &:last-child {
      border-bottom: none;
    }

    &>img {
      width: 50px;
      height: 50px;
      margin: 0 17px;
      border-radius: 50%;
    }

    .center {
      width: 43%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .center {
      p {
        font-size: 15px;
        margin-bottom: 8px;
        color: #333333;
      }

      div {
        display: flex;
        align-items: center;

        .gender {
          width: 12px;
          height: 12px;
          margin-right: 6px;
        }

        .brand {
          font-size: 10px;
          color: #fff;
          padding: 1px 5px;
          border-radius: 5px;
          background: linear-gradient(to right, #ff7e28, #ffa438);
        }
      }
    }

    .right {
      flex: 1;
      font-size: 12px;
      color: #777777;
      text-align: right;
      margin-right: 16px;
    }
  }
}

// button bottom
.btn_list {
  width: 300px;
  margin: 50px auto 15px;

  .btn {
    width: 300px;
    margin: 0 auto;
    text-align: center;
    height: 39px;
    line-height: 39px;
    background-image: linear-gradient(90deg, #ffa53b 0%, #fc8a45 100%), linear-gradient(#ffb125, #ffb125);
    box-shadow: 0px 3px 0px 0px rgba(255, 92, 88, 0.44);
    border-radius: 5px;
    font-size: 17px;
    color: #f5f5f5;
  }

  .back {
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin: 10px auto 0;
    font-size: 13px;
    color: #ffb125;
  }
}
</style>
