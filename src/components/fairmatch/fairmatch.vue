<template>
  <div class="fairmatch_container">
    <div class="rm_search">
      <div class="rm_match_list">
        <img :src="rmMatchListChoose.upic" />
        <div>
          <span
            >恭喜{{ rmMatchListChoose.brand }}{{ rmMatchListChoose.name }}</span
          >
          <span>已匹配人脉7人</span>
        </div>
      </div>
      <div
        class="rm_search_pic_box"
        v-for="(item, index) in UserList.fixedUserList"
        :key="index"
        :style="{ left: item.left / 2 + 'px', top: item.top / 2 + 'px' }"
      >
        <img class="rm_pic" :src="item.pic" />
        <div>{{ item.intro }}</div>
      </div>
      <img
        class="rm_search_bg"
        src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_search_rotate.png"
      />
      <img
        class="go_search"
        @click="_gSearch"
        v-if="searchData.count == 0"
        src="https://zfile.bxwh002.cn/img/default/fairmatch/icon_gosearch_gray.png"
      />
      <img
        class="go_search"
        @click="_gSearch"
        v-else
        src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_gosearch.png"
      />
    </div>
    <div class="zh_text">召唤大咖AI小助手智能探索人脉</div>
    <div class="match_info">
      <div class="match_info_top">
        <img :src="vUserInfo.upic" />
        <div class="match_info_top_text">
          <span>你已成功匹配人脉{{ searchData.connection }}人</span>
        </div>
      </div>
      <div class="match_info_center">
        <div class="pic_box">
          <div v-for="(item, index) in recommendData" :key="index">
            <img v-if="!item.id" :src="item.upic" />
          </div>
        </div>
        <img
          class="progress"
          v-if="userslength == 0"
          src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_proOne.png"
        />
        <img
          class="progress"
          v-if="userslength == 1"
          src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_protwo.png"
        />
        <img
          class="progress"
          v-if="userslength == 2"
          src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_prothree.png"
        />
        <img
          class="progress"
          v-if="userslength >= 3"
          src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_profour.png"
        />
        <div class="progress_box">
          <div v-for="(item, index) in recommendData" :key="index">
            <span v-if="!item.text">推荐成功</span>
            <span v-else>{{ item.text }}</span>
          </div>
        </div>
        <div class="search_icon" @click="_gSearch">
          <span
            :class="searchData.count == 0 ? '' : 'search_text'"
            @click="_gSearch"
            >去探索</span
          >
          <img
            v-if="searchData.count == 0"
            src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_searchIcon_no.png"
          />
          <img
            v-else
            src="https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_searchIcon.png"
          />
          <span class="search_text">x{{ searchData.count }}</span>
        </div>
      </div>
      <div class="recommend" @click="goNewsIsDev">推荐好友助力得人脉</div>
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { getViewCode } from 'common/js/getCommonInfo'
import base from 'request/api/base'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      rmMatchList: [], // 匹配
      rmMatchListChoose: {},
      searchData: {
        count: 0
      },
      UserList: {},
      recommendData: [],
      userslength: 0,
      isSelfComBtnText: {},
      viewCode: ''
    }
  },
  async mounted() {
    this.getDefault()
    this.getXCount()
    this.viewCode = await getViewCode(this.token)
  },
  activated() {
    this._changeRm()
  },
  methods: {
    // 去搜索
    _gSearch() {
      // 没有搜索资格的话,跳转到news页面
      if (this.searchData.count === 0) {
        this.goNewsIsDev()
      } else {
        this.goNext('/fairmatch/recommend')
      }
    },
    // 获取推荐人数
    getXCount() {
      var that = this
      this.$api.fairmatch
        .getXCount({
          vid: that.vid,
          token: that.token
        })
        .then(
          res => {
            let data = res.data.data
            that.searchData = data
            that.userslength = data.users.length || 0
            if (that.userslength === 0) {
              let data = [
                {
                  upic:
                    'https://zfile.bxwh002.cn/img/default/fairmatch/rm_searchDefa_Icon.png',
                  text: '未推荐'
                },
                {
                  upic:
                    'https://zfile.bxwh002.cn/img/default/fairmatch/rm_searchDefa_Icon.png',
                  text: '未推荐'
                },
                {
                  upic:
                    'https://zfile.bxwh002.cn/img/default/fairmatch/rm_searchDefa_Icon.png',
                  text: '未推荐'
                }
              ]
              that.recommendData = data
            } else if (that.userslength === 1) {
              console.log(data.users)
              let newDataUsers = data.users
              let newData = newDataUsers.concat(
                {
                  upic:
                    'https://zfile.bxwh002.cn/img/default/fairmatch/rm_searchDefa_Icon.png',
                  text: '未推荐',
                  id: 0
                },
                {
                  upic:
                    'https://zfile.bxwh002.cn/img/default/fairmatch/rm_searchDefa_Icon.png',
                  text: '未推荐',
                  id: 0
                }
              )
              that.recommendData = newData
            } else if (that.userslength === 2) {
              console.log(data.users)
              let newDataUsers = data.users
              let newData = newDataUsers.concat({
                upic:
                  'https://zfile.bxwh002.cn/img/default/fairmatch/rm_searchDefa_Icon.png',
                text: '未推荐',
                id: 0
              })
              that.recommendData = newData
            } else if (that.userslength === 3) {
              that.recommendData = data.users
            }
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    // 获取列表
    getDefault() {
      var that = this
      this.$api.fairmatch
        .getDefault({
          vid: that.vid,
          token: that.token
        })
        .then(
          res => {
            let data = res.data.data
            console.log(data)
            that.UserList = data
            let mat = parseInt(Math.random() * data.slideUserList.length)
            that.rmMatchListChoose = data.slideUserList[mat]
            that._getShareData(this.vUserInfo)
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    // 更换用户显示位置
    _changeRm() {
      setInterval(() => {
        let mate = parseInt(Math.random() * this.UserList.slideUserList.length)
        this.rmMatchListChoose = this.UserList.slideUserList[mate]
      }, 15000)
    },
    // 获取share数据
    _getShareData(data) {
      const title = `${data.name}的${data.brand}微名片请惠存!`
      const desc = `姓名:${data.name} 公司/品牌:${data.brand}`
      const shareUrl = `${base.h5_url}?uid=${this.vUserInfo.vid}&from_id=${this.vUserInfo.vid}&proid=${this.vUserInfo.vid}&bid=${data.bid}&view=${this.viewCode}`
      console.log(shareUrl)
      this.$wxShare({
        title: title,
        desc: desc,
        imgUrl: data.upic,
        shareUrl: shareUrl,
        article: 'fairMatchShare'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

@keyframes rm_match_scrollTop {
  0% {
    /* transform: rotate(0); */
    opacity: 0;
  }

  50% {
    transform: translateY(-240px);
    opacity: 1;
  }

  100% {
    transform: translateY(-600px);
    opacity: 1;
  }
}

@keyframes rm_match_scrollTop {
  0% {
    opacity: 0;
  }

  50% {
    -webkit-transform: translateY(-240px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(-600px);
    opacity: 1;
  }
}

@keyframes rm_pic_trans {
  0% {
    opacity: 0.7;
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    opacity: 0.85;
    transform: translateY(-10px) rotate(-5deg);
  }

  75% {
    transform: translateY(-10px) rotate(5deg);
  }

  100% {
    opacity: 1;
    transform: translateY(0px) rotate(0deg);
  }
}

@keyframes rm_pic_trans {
  0% {
    opacity: 0.7;
    -webkit-transform: translateY(0px);
  }

  50% {
    opacity: 0.85;
    -webkit-transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0px);
  }
}

.fairmatch_container {
  width: 100%;
  background: url('https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_bg.png') no-repeat;
  background-size: 100% 100%;
  padding-bottom: 10px;
  box-sizing: border-box;

  .rm_search {
    width: 100%;
    height: 250px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;

    .rm_search_bg {
      width: 160px;
      height: 160px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -80px;
      margin-top: -80px;
      animation: _rotate_reverse_ 3s linear infinite;
    }

    .go_search {
      height: 91px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -45px;
      margin-top: -45px;
    }

    .rm_match_list {
      position: absolute;
      left: 11px;
      bottom: 5px;
      z-index: 3;
      height: 37px !important;
      padding: 5px 0;
      background-color: #815d33;
      border: solid 2px rgba(255, 255, 255, 0.32);
      box-sizing: border-box;
      border-radius: 18px;
      display: flex;
      align-items: center;
      opacity: 0;
      animation: rm_match_scrollTop 15s infinite;

      img {
        width: 31px;
        height: 31px;
        margin: 0 4px 0 3px;
        border-radius: 50%;
      }

      div {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: #fff;
        margin-right: 5px;

        span {
          margin-top: 3px;
        }
      }
    }

    .rm_search_pic_box {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 2;
      animation: rm_pic_trans 3s linear infinite;

      .rm_pic {
        width: 33px;
        height: 33px;
        box-shadow: 0px 0px 18px 0px rgba(203, 89, 26, 0.64);
        border: solid 2px rgba(255, 255, 255, 0.38);
        border-radius: 50%;
      }

      div {
        width: 100%;
        margin-top: 3px;
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        color: #ff902f;
        text-align: center;
        background-color: #fff;
        border-radius: 6px;
        padding: 3px;
      }
    }
  }

  .zh_text {
    font-size: 14px;
    color: #fff;
    text-align: center;
    margin-top: 10px;
  }

  .match_info {
    width: 95%;
    margin: 25px auto 10px auto;
    background-color: #fff;
    border-radius: 8px;
    padding-bottom: 38px;

    .match_info_top {
      width: 100%;
      height: 100px;
      background-color: #ffedd8;
      border-radius: 8px 8px 0 0;
      display: flex;
      align-items: center;

      img {
        width: 47px;
        height: 47px;
        border-radius: 50%;
        margin: 0 25px 0 18px;
      }

      div {
        flex: 1;
        display: flex;
        flex-direction: column;
        color: #ff722a;
        font-size: 17px;

        span {
          margin-top: 5px;
        }
      }
    }

    .match_info_center {
      width: 261px;
      margin: 24px auto 25px;
      position: relative;

      .search_icon {
        position: absolute;
        right: -36px;
        top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #999;

        .search_text {
          color: #fe542d;
        }

        img {
          width: 24px;
          height: 24px;
          margin-top: 4px;
        }
      }

      .pic_box {
        width: 261px;
        display: flex;
        align-items: center;

        div {
          width: 46px;
          height: 56px;
          position: relative;
          margin-left: 15px;
          background-image: url('https://zfile.bxwh002.cn/img/default/fairmatch/rm_match_recommendbg_.png');
          background-size: 100% 100%;

          img {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            margin: 4px;
          }
        }

        div:nth-child(2) {
          margin-left: 55px;
        }

        div:nth-child(3) {
          margin-left: 46px;
        }
      }

      .progress {
        margin: 3px 0px;
        width: 261px;
        height: 10px;
      }

      .progress_box {
        margin-top: 5px;
        width: 261px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #666;

        div {
          width: 46px;
          text-align: center;
          margin-left: 15px;
        }

        div:nth-child(2) {
          margin-left: 55px;
        }

        div:nth-child(3) {
          margin-left: 46px;
        }
      }
    }

    .recommend {
      display: block;
      width: 277px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      background-image: linear-gradient(90deg, #ff8933 0%, #ffaf60 100%);
      border-radius: 23px;
      font-size: 18px;
      color: #fff;
      margin: 0 auto;
    }

    .attention {
      font-size: 14px;
      color: #ff722a;
      text-align: center;
      margin: 20px auto 0 auto;
    }
  }
}
</style>
