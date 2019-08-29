<template>
  <div class="connection_container">
    <cube-scroll ref="scroll" class="connection_content">
      <!-- <connect-swiper :isXcxImg="isXcxImg" /> -->
      <swiper :data="swiperList" v-if="swiperFlag">
        <cube-slide-item v-for="(item, index) in swiperList" :key="item.title">
          <a @click="_gSwiper(item, index)">
            <img :src="item.src" />
          </a>
        </cube-slide-item>
      </swiper>
      <mList :Data="listRm" @_handleList="_gRm" />
      <mList :Data="listMsgTrace" @_handleList="_gFollow" />
      <!-- 附近的人 -->
      <connect-near-item @gNearBy="_gNearBy" />
      <!--  -->
      <mList
        :Data="listTrain"
        :cName="trainMemCls"
        :isIconHotShow="isIconHotShow"
        @_handleList="_gTrain"
      />
      <mList :Data="listFriend" @_handleList="_gFriend" />
      <mList :Data="listMsg" :cName="chatCls" @_handleList="_gChat">
        <span class="idotChat" v-if="vChatDetail.IdotMsgShow">
          {{ vChatDetail.IdotNum }}
        </span>
      </mList>
      <mList :Data="listMatch" @_handleList="_gMatch">
        <template v-slot:leftImg>
          <img class="left_rotate" :src="listMatch.rotateImg" alt="" />
        </template>
        <template v-slot:center>
          <div class="upic_outer" v-if="listMatch.isList">
            <div
              class="inner"
              v-for="(item, index) in listMatch.isMatchlist"
              :key="index"
            >
              <img :src="item.upic" />
            </div>
          </div>
        </template>
      </mList>
      <div style="height:10px"></div>
    </cube-scroll>
    <!-- <foot/> -->
    <foot is_tab_act="1" />
    <transition
      name="popGzh_transition"
      enter-active-class="animated fadeIn animation_time_mid_"
      leave-active-class="animated fadeOut animation_time_mid_"
    >
      <pop-img
        :popMainImg="popMainImg"
        v-if="isPopGzh"
        @closePopMask="_closePopGzh"
      />
    </transition>
    <!-- 小程序弹窗 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated fadeIn animation_time_fast"
      leave-active-class="animated fadeOut animation_time_fast"
    >
      <pop-img
        :popMainImg="popXcxImg"
        v-if="isPopXcx"
        :popClose="isPopXcxClose"
        cnameOuter="cnameXcxOuter"
        :cnameP="cnameP"
        :cnameC="cnameC"
        @closePopMask="_closePopXcx"
        @closePopIcon="_closePopXcx"
      >
        <div class="popText" slot="popText">
          <p>扫码即可进行<span>下一步</span></p>
          <p>体验大咖微名片plus全部功能</p>
        </div>
      </pop-img>
    </transition>
  </div>
</template>
<script>
import mList from 'base/m_list/m_list'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import Foot from 'components/footer/footer'
import popImg from 'base/pop_img/pop_img'
import connectNearItem from 'components/connection_comp/connect_near_item'
import attention from 'common/js/mixins/attention'
import { newGetXcxRole, getAuthInfo } from 'common/js/getCommonInfo'
import { imgPathUrl } from 'api/config'
// import connectSwiper from 'components/connection_comp/connect_swiper'
import Swiper from 'base/swiper/swiper'
export default {
  mixins: [routings, vuexData, attention],
  data() {
    return {
      listFriend: {
        leftIcon: `${imgPathUrl}/default/connect_icon_friend.png`,
        leftText: '我的好友'
      },
      listRm: {
        leftIcon: `${imgPathUrl}/default/connect_icon_sj.png`,
        leftText: '人脉市集',
        isTip: true,
        isTipText: '100000+'
      },
      listTrain: {
        leftIcon: `${imgPathUrl}/default/connect_icon_rm.png`,
        leftText: '精准人脉',
        isTip: true,
        isTipText: '直通车'
      },
      listMsg: {
        leftIcon: `${imgPathUrl}/default/connect_icon_chat.png`,
        leftText: '即时消息'
      },
      listMatch: {
        // leftIcon:
        //   `${imgPathUrl}/default/fairmatch/rm_icon_center.png`,
        // rotateImg: `${imgPathUrl}/default/fairmatch/rm_icon.png`,
        leftIcon: `${imgPathUrl}/default/common/fair_icon_search1.png`,
        rotateImg: `${imgPathUrl}/default/common/fair_icon_search2.png`,
        leftText: '人脉探索',
        isTipMatch: true,
        isTipMatchText: ''
      },
      listMsgTrace: {
        leftIcon: `${imgPathUrl}/default/connect_icon_trace.png`,
        leftText: '人脉追踪',
        isTip: true,
        isTipText: '谁看了我'
      },
      isXcxImg: '',
      isPopXcx: false, // 小程序弹窗默认开启
      isPopXcxClose: true, // 小程序显示close按钮
      cnameP: 'cnameP', // 小程序添加父类
      cnameC: 'cnameC', // 小程序添加类
      popXcxImg: `${imgPathUrl}/common/attention_ewm.png`, // 弹窗小程序图片
      swiperFlag: false, // swiper
      swiperList: [
        {
          src: `${imgPathUrl}/common/banner_6.18_connect_.jpg`,
          title: '开通会员'
        },
        {
          src: `${imgPathUrl}/common/banner_group_connection.png`,
          title: '群二维码'
        },
        {
          src: `${imgPathUrl}/common/banner_chat.png`,
          title: '在线聊天'
        },
        {
          src: `${imgPathUrl}/common/banner_lookfor.png`,
          title: '人脉追踪'
        }
      ]
    }
  },
  computed: {
    // 判断是否正式会员
    isRoleId() {
      return this.vUserInfo.roleId === '2'
    },
    // 精准人脉是否正式
    trainMemCls() {
      return this.isRoleId ? 'trainMemCls' : ''
    },
    // 即时消息
    chatCls() {
      return 'chatCls'
    },
    // 精准人脉是否正式
    isIconHotShow() {
      return !!this.isRoleId
    }
  },
  created() {
    this._getPopComp() // 获取弹窗
    this._getXcxImg() // 获取小程序图片
  },
  async activated() {
    const { userInfo } = await getAuthInfo(this.token)
    if (!userInfo.mid) {
      this.$router.replace('/login/create_card')
    }
    this.newGetCardCnt()
    this.getViewTotal()
    this.getNew()
  },
  methods: {
    // swiper跳转
    _gSwiper(item, index) {
      switch (item.title) {
        case '小程序':
          this._openPopXcx()
          break
        case '开通会员':
          this._gPay()
          break
        case '群二维码':
          this._gGroupEwm()
          break
        case '在线聊天':
          this._gChat()
          break
        case '人脉追踪':
          this._gFollow()
          break
        default:
          break
      }
    },
    // 获取小程序swiper图片
    async _getXcxImg() {
      const isXcxRole = await newGetXcxRole(this.token, this.vid)
      this.isXcxImg =
        isXcxRole.data === '1'
          ? `${imgPathUrl}/common/toxcx_c_no.png`
          : `${imgPathUrl}/common/toxcx_c.png`
      this.swiperList.unshift({
        src: this.isXcxImg,
        title: '小程序'
      })
      this.swiperFlag = true
    },
    // 我的好友显示数量
    newGetCardCnt() {
      var _this = this
      this.$api.connection
        .newGetCardCnt({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            const friendNum = res.data.data
            if (friendNum > 0) {
              this.$set(this.listFriend, 'isTip', true)
              this.$set(this.listFriend, 'isTipText', friendNum)
            } else {
              this.$set(this.listFriend, 'isTip', false)
            }
          }
        })
    },
    // 人脉追踪显示条数
    getViewTotal() {
      var _this = this
      this.$api.follow
        .getViewTotal({
          vid: _this.vid,
          token: _this.token
        })
        .then(
          res => {
            const errCode = res.data.errCode
            if (errCode === 0) {
              const traceNum = res.data.data
              if (traceNum > 0) {
                this.$set(this.listMsgTrace, 'isNum', true)
                this.$set(this.listMsgTrace, 'isNumText', traceNum)
              } else {
                this.$set(this.listMsgTrace, 'isNum', false)
              }
            }
          },
          err => {
            console.log(err)
          }
        )
    },
    // 显示人脉探索
    getNew() {
      var _this = this
      _this.$api.connection
        .getNew({
          vid: _this.vid,
          token: _this.token
        })
        .then(
          res => {
            const errCode = res.data.errCode
            if (errCode === 0) {
              const matchList = res.data.data
              _this.$set(
                this.listMatch,
                'isTipMatchText',
                `新增${this.vUserInfo.brand}家人`
              )
              _this.$set(_this.listMatch, 'isList', true)
              _this.$set(_this.listMatch, 'isMatchlist', matchList)
            }
          },
          err => {
            console.log(err)
          }
        )
    },
    // 名片夹
    _gFriend() {
      this.goNext('/mine/name_card')
    },
    // 人脉市集
    _gRm() {
      this.goNext('/connection/fair_index')
    },
    // 直通车
    _gTrain() {
      this.goNext('/train/index')
    },
    // 即时消息
    _gChat() {
      this.setVchatDetail({
        IdotMsgShow: false,
        IdotNum: 0
      })
      this.goNext('/chat')
    },
    // 人脉追踪
    _gFollow() {
      this.goNext('/follow')
    },
    // 附近的人
    _gNearBy() {
      this.goNext('/nearby')
    },
    // 人脉探索
    _gMatch() {
      this.goNext('/fairmatch')
    },
    // 关闭弹窗
    _closePopGzh() {
      this.isPopGzh = false
    },
    // 展开小程序弹窗
    _openPopXcx() {
      this.isPopXcx = true
    },
    // 关闭小程序弹窗
    _closePopXcx() {
      this.isPopXcx = false
    },
    // 去开通
    _gPay() {
      this.goNext('/pay')
    },
    // 去完善群二维码
    _gGroupEwm() {
      this.goNext('/mine/group_ewm')
    }
  },
  components: {
    mList,
    Foot,
    popImg,
    connectNearItem,
    // connectSwiper,
    Swiper
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
@keyframes hightlight
  0%
    left -10%
  100%
    left 110%
@keyframes hightlight
  0%
    left -10%
  100%
    left 110%
.slider-content
  width 100%
  height 91px
  min-height 91px
.connection_container
  overflow-x hidden !important
  padding-bottom 45px
  width 100%
  position fixed
  top 0
  z-index 3
  bottom 0px
// 小程序弹窗
.cnameXcxOuter
  >>>.popup-mask
    background rgba(0, 0, 0, 0.7)
.m_list_common
  margin-top 10px
  >>>.m_left_img
    width 47px
    height 47px
  >>>.left_rotate
    width 47px
    height 47px
    position absolute
    margin 0 8px 0 10px
    transform rotate(0deg)
    animation _rotate_ 3s linear infinite
  // 探索图片
  >>>.upic_outer
    display inline-block
    height 20px
    vertical-align middle
    margin -4px 0 0 5px
    .inner
      width 16px
      height 16px
      float left
      img
        width 20px
        height 20px
        border-radius 50%
        border solid 2px #fff
  >>>.m_right
    .inner_tip
      font-size 15px
.chatCls
  .idotChat
    margin-right 3px
    font-size 12px
    color #fff
    padding 3.5px 5.5px
    bgc(#e61111)
    // bd_r(5px);
    border-radius 50%
.trainMemCls
  background linear-gradient(#ffffff, #ffefe1)
  position relative
  &:after
    content ''
    width 10px
    height 120%
    background rgba(255, 255, 255, 0.7)
    position absolute
    top -5%
    left -10%
    transform rotateZ(30deg)
    animation hightlight 1.8s 2s infinite
  >>>.m_right
    .inner_tip
      color #e71515 !important
>>>.cnameP
  width 80%
>>>.cnameC
  width 162px !important
  height 162px !important
.popBox
  >>>.cnameP
    width 80%
  >>>.cnameC
    width 162px !important
    height 162px !important
  >>>.popText
    margin 20px auto
    font-size 17px
    p
      text-align center
      margin-top 20px
      span
        color #ff8140
</style>
