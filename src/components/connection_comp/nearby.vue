<template>
  <!--附近的人  -->
  <div class="nearbybg">
    <div class="sy_wrap" @touchmove.prevent>
      <div class="sy">
        <div class="add" v-if="vUserInfo.sign">
          <span>{{ vUserInfo.sign }}</span>
        </div>
        <div class="add" v-else @click="addSyqm">
          <span>点击添加</span>
        </div>
      </div>
    </div>
    <div class="sy_text" @touchmove.prevent>
      <span class="top">资源就近交换, 销售人之间的合作更容易!</span>
      <div class="sy_bot">
        <div>
          <img src="https://zfile.bxwh002.cn/wmp/images/map_icon.png" />
          <span>大咖微名片</span>
        </div>
        <span class="line"></span>
        <span class="kilo">{{ fromhome }}</span>
      </div>
    </div>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <li class="infos" v-for="(item, index) in dataList" :key="index">
          <div class="info_list" @click="_gHome(item.vid, item.isAdd)">
            <!-- <img class="info_pic" :src="item.upic" /> -->
            <img
              class="info_pic"
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/cover_square_def.jpg"
            />
            <div class="info_center">
              <div class="top">
                <span class="top_left">{{ item.name }}</span>
                <span class="top_right">{{ item.last_login }}</span>
              </div>
              <div class="center">
                <div class="center_left">
                  <img
                    class="gender"
                    v-if="item.sex == 1"
                    src="https://zfile.bxwh002.cn/wmp/images/nan_icon.png"
                  />
                  <img
                    class="gender"
                    v-if="item.sex == 2"
                    src="https://zfile.bxwh002.cn/wmp/images/nv_icon.png"
                  />
                  <div class="brand">{{ item.brand }}</div>
                </div>
                <div class="center_right">
                  <img
                    class="address"
                    src="https://zfile.bxwh002.cn/wmp/images/map_icon.png"
                  />
                  <span v-if="item.distance < 1000">{{ item.distance }}m</span>
                  <span v-else>{{ item.distan }}km</span>
                </div>
              </div>
              <div class="bot">
                <span class="bot_text" v-if="item.sign">{{ item.sign }}</span>
              </div>
              <img
                class="sy_qm"
                v-if="item.sign"
                src="https://zfile.bxwh002.cn/wmp/images/syqm.png"
              />
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>
    <!-- 正式会员查看满10人 -->
    <dia-log
      v-if="isDialogShow"
      :btnText="btnTxt"
      :popTitle="popTitleCom"
      :popContent="popContentTxt"
      :isIconClose="isIconCloseShow"
      @confirmRight="_confirmOneBtn"
      @closeLeft="_closePopShareSelf"
      @closePop="_closePopShareSelf"
    />
    <div class="dialog" v-if="isNear">
      <div class="popup-mask" @click="closePop"></div>
      <div
        :class="normal_near"
        v-bind:style="{
          background: '#fff url(' + near_bg + ') no-repeat center top',
          backgroundSize: '100% auto'
        }"
      >
        <div @click="nearVip"></div>
      </div>
    </div>
    <!-- loading加载 -->
    <div v-show="isLoading" class="loading-container">
      <loading />
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import MescrollMixin from 'common/js/mixins/mescroll'
import vuexData from 'common/js/mixins/vuex_data'
import base from 'request/api/base'
import diaLog from 'base/dialog/dialog'
import Loading from 'base/loading/loading'
import { ISIOS } from 'api/config'
export default {
  mixins: [routings, vuexData, MescrollMixin],
  data() {
    return {
      fromhome: '未知',
      latitude: '',
      longitude: '',
      pageSize: 10,
      dataList: [],
      mescrollUp: {
        callback: null
      },
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '', // 滑动时的效果,使用v-bind:style="deleteSlider"
      isDialogShow: false, // 正式会员显示弹窗
      isIconCloseShow: true, // 弹窗是否显示叉叉
      btnTxt: {
        l: '取消',
        r: '去分享'
      },
      popTitleCom: '温馨提示',
      popContentTxt:
        '人脉圈外人脉的可见度有限（每日可查看10条），扩大您的影响力，您就可以浏览更多人脉。',
      isNear: false, // 试用会员弹窗
      near_bg: 'https://zfile.bxwh002.cn/wmp/images/nearly_boy.png', // 试用会员弹窗男女图片
      normal_near: '', // 试用会员弹窗样式
      isLoading: false // 显示loading
    }
  },
  computed: {},
  created() {
    this.isLoading = true
    this.$wxLocation({
      isFrom: 'nearby'
    })
  },
  activated() {
    // this.mescrollUp.callback = null
  },
  mounted() {},
  methods: {
    // 正式会员弹窗去分享
    _confirmOneBtn() {
      this.goNewsIsDev()
    },
    // 正式会员关闭弹窗
    _closePopShareSelf() {
      this.isDialogShow = false
    },
    // 试用会员关闭弹窗
    closePop() {
      this.isNear = false
    },
    // 去开通
    nearVip() {
      this.goNext('/pay')
    },
    // 获取小数点后两位
    parseDistance(dist) {
      var distance = parseFloat(dist)
      if (distance < 1000) {
        var ress = distance + 'm'
        return ress
      } else {
        let ress = (distance / 1000).toFixed(2)
        ress = ress + 'km'
        return ress
      }
    },
    // 去编辑
    addSyqm() {
      this.goNext('/mine/edit')
    },
    // 自己到大咖总部距离
    updateLocation() {
      var _this = this
      this.$api.connection
        .getLoction({
          vid: _this.vid,
          token: _this.token,
          lon: _this.longitude,
          lat: _this.latitude
        })
        .then(
          res => {
            const errCode = res.data.errCode
            if (errCode === 0) {
              _this.fromhome = _this.parseDistance(res.data.data)
            }
          },
          err => {
            console.log(err)
          }
        )
    },
    // 获取附近的人的列表
    getNear() {
      var _this = this
      const page = _this.mescrollUp.page.num
      if (this.vUserInfo.roleId === '1') {
        if (page > 1) {
          _this.isNear = true
          _this.normal_near = 'normal_near'
          if (this.vUserInfo.sex === '1') {
            _this.near_bg =
              'https://zfile.bxwh002.cn/wmp/images/nearly_girl.png'
          } else {
            _this.near_bg = 'https://zfile.bxwh002.cn/wmp/images/nearly_boy.png'
          }
          return false
        }
      }

      this.$api.connection
        .getNear({
          vid: _this.vid,
          token: _this.token,
          lon: _this.longitude,
          lat: _this.latitude,
          page: page,
          pageSize: 10
        })
        .then(
          res => {
            this.isLoading = false
            this.asd = true
            let arr = res.data.data || []
            if (page === 1) this.dataList = []
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].distance >= 1000) {
                arr[i].distan = (arr[i].distance / 1000).toFixed(2)
              }
            }
            this.dataList = this.dataList.concat(arr)
            this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
          },
          err => {
            console.log(err, 'err')
            this.mescroll.endErr()
          }
        )
    },
    // 去附近的人的首页
    _gHome(vid, add) {
      console.log()
      var _this = this
      _this.addTrace(vid)
      this.$api.connection
        .nearAdd({
          vid: _this.vid,
          token: _this.token
        })
        .then(
          res => {
            const errCode = res.data.errCode
            if (errCode === 0) {
              this.goNews(vid)
            } else if (errCode === 1004) {
              if (add === 1) {
                this.goNews(vid)
              } else {
                console.log(this.vUserInfo.roleId)
                if (this.vUserInfo.roleId === '1') {
                  _this.isNear = true
                  _this.normal_near = 'normal_near'
                  if (this.vUserInfo.sex === '1') {
                    _this.near_bg =
                      'https://zfile.bxwh002.cn/wmp/images/nearly_girl.png'
                  } else {
                    _this.near_bg =
                      'https://zfile.bxwh002.cn/wmp/images/nearly_boy.png'
                  }
                } else {
                  _this.isDialogShow = true
                }
              }
            } else {
            }
          },
          err => {
            console.log(err)
          }
        )
    },
    addTrace(vid) {
      var _this = this
      this.$api.connection
        .addTrace({
          vid: _this.vid,
          token: _this.token,
          uid: vid,
          cate: 13
        })
        .then(
          res => {},
          err => {
            console.log(err)
          }
        )
    },
    goNews(i) {
      if (ISIOS) {
        location.href = `${base.h5_url}/home?uid=${i}`
      } else {
        this.goNext('/home', { uid: i })
      }
    }
  },
  components: {
    diaLog,
    Loading
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

// 附近的人
body {
  width: 100%;
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
}

@keyframes show_near {
  0% {
    bottom: -60%;
  }

  50% {
    bottom: -30%;
  }

  100% {
    bottom: 0%;
  }
}

@keyframes show_near {
  0% {
    -webkit-bottom: -60%;
  }

  50% {
    -webkit-bottom: -30%;
  }

  100% {
    -webkit-bottom: -60%;
  }
}

>>>.empty-tip {
  color: #ff9125;
}

>>>.mescroll-empty {
  padding-top: 60px;

  >>>.empty-icon {
    width: 149px;
    height: 149px;
  }
}

>>>.empty-btn {
  font-size: 16px;
  width: 214px;
  height: 22px;
  line-height: 22px;
  border: none;
  color: #fff !important;
  bg_linear();
}

.nearbybg {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.mescroll {
  position: fixed;
  top: 210px;
  bottom: 0;
  height: auto;
  // height: calc(100vh - 210px);
}

.loading-container {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.normal_near {
  width: 100%;
  height: calc(100vh - 210px);
  position: fixed;
  bottom: 0;
  z-index: 1001;
  animation: show_near 0.6s linear 1;

  div {
    width: 60%;
    height: 100px;
    position: absolute;
    z-index: 1002;
    left: 20%;
    top: 130px;
  }
}

.sy_wrap {
  padding: 10px 3% 0 3%;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;

  .sy {
    width: 100%;
    height: 130px;
    margin: 0 auto;
    position: relative;
    background: url('https://zfile.bxwh002.cn/wmp/images/sy_icon.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .add {
      text-align: center;
      display: inline-block;
      height: 35px;
      line-height: 35px;
      border-radius: 17px;
      font-size: 16px;
      color: #ff4317;
      font-weight: bold;
      margin-top: 80px;

      span {
        background-color: #fff;
        padding: 5px 10px;
        text-align: center;
        border-radius: 17px;
        font-size: 13px;
      }
    }
  }
}

.sy_text {
  padding-left: 3%;
  background-color: #fff;
  font-size: 17px;
  color: #333;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding-bottom: 10px;
  position: fixed;
  z-index: 2;
  top: 140px;
  left: 0;
  right: 0;

  .top {
    margin: 10px 0;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    color: #999;
  }

  .line {
    color: #e6e6e6;
    background-color: #e6e6e6;
    width: 2px;
    height: 10px;
    margin: 0 10px;
  }

  img {
    width: 6px;
    height: 10px;
    margin-top: 2px;
    margin-right: 6px;
  }
}

.info_list {
  background-color: #fff;
  color: #999;
  font-size: 11px;
  padding: 10px 3%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 3px;

  .info_pic {
    width: 18.5%;
    height: 64px;
    border-radius: 50%;
  }

  .info_center {
    margin-left: 3%;
    width: 80%;
    display: flex;
    flex-direction: column;

    .center {
      margin-top: 5px;

      .gender {
        width: 12px;
        height: 12px;
        margin-right: 3px;
        float: left;
        margin-top: 2px;
      }

      .brand {
        font-size: 12px;
        color: #fff;
        padding: 1px 5px;
        border-radius: 5px;
        background: linear-gradient(to right, #ff7e28, #ffa438);
        float: left;
        line-height: 17px;
      }

      .center_right {
        float: right;
        line-height: 17px;

        img {
          width: 6px;
          height: 10px;
          margin-top: 2px;
          margin-right: 3px;
        }
      }
    }

    .bot {
      margin-top: 10px;
    }
  }

  .top {
    line-height: 1.6;
    padding-top: 5px;

    .top_left {
      float: left;
      font-size: 15px;
      color: #333;
    }

    .top_right {
      float: right;
      font-size: 12px;
    }
  }
}

.sy_qm {
  width: 53px;
  height: 42px;
  position: absolute;
  right: 16%;
  bottom: 10%;
}

.con-box {
  height: auto;
  position: relative;
}
</style>
