<template>
  <div class="mine">
    <m-header :userInfo="vUserInfo" />
    <!-- <mine-swiper :isXcxImg="isXcxImg" /> -->
    <swiper :data="swiperList" v-if="swiperFlag">
      <cube-slide-item v-for="(item, index) in swiperList" :key="item.title">
        <a @click="_gSwiper(item, index)">
          <img :src="item.src" />
        </a>
      </cube-slide-item>
    </swiper>
    <select-list
      :vid="vid"
      :token="token"
      :vUserInfo="vUserInfo"
      :isShowFourG="isShowFourG"
      @gFourG="_gFourG"
    />
    <foot is_tab_act="3" />
    <!-- <foot/> -->
    <!-- 公众号弹窗 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated rotateInDownLeft animation_time_mid_"
      leave-active-class="animated rotateOutUpRight animation_time_mid_"
    >
      <pop-img
        :popMainImg="popMainImg"
        v-if="isPopGzh"
        @closePopMask="_closePopGzh"
      />
    </transition>
    <!-- 家园网弹窗 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated rotateInDownLeft animation_time_mid"
      leave-active-class="animated rotateOutUpRight animation_time_mid"
    >
      <pop-img
        :popMainImg="popJywImg"
        v-if="isPopJyw"
        @closePopMask="_closePopJyw"
      />
    </transition>
    <!-- 保险弹窗 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated rotateInDownLeft animation_time_mid"
      leave-active-class="animated rotateOutUpRight animation_time_mid"
    >
      <pop-img
        :popMainImg="popBxImg"
        v-if="isPopBx"
        @closePopMask="_closePopBx"
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
        v-show="isPopXcx"
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
    <!-- 分配客服弹窗 -->
    <dia-log
      v-if="isDialogCustomerShow"
      :cnameDialogP="serviceP_Cls"
      :cnameDialogC="serviceC_Cls"
      :isIconClose="true"
      :isIconBotClose="false"
      :btnText="btnText"
      :isOneBtn="true"
      :popTitle="popTitle"
      @confirmOneBtn="_confirmOneBtn"
      @closePop="_closePop"
    >
      <template v-slot:main v-if="isRoleId">
        <img
          class="mem_img"
          src="https://zfile.bxwh002.cn/img/default/customer_ser_mem.png"
          alt=""
        />
        <p>
          恭喜您成为会员
        </p>
        <article>
          我们为你分配了一位专属客服，接下来将会为你服务！帮助你赚更多！仅限本次机会，赶快添加吧！
        </article>
      </template>
      <template v-slot:main v-else>
        <img
          class="com_img"
          src="https://zfile.bxwh002.cn/img/default/customer_ser_com.png"
          alt=""
        />
        <p>
          您真有眼光！选择了我们
        </p>
        <article>
          我们为你分配了一位专属指导老师，TA懂很多拓展人脉推广产品方面的知识，希望能够帮助你！
        </article>
      </template>
    </dia-log>
  </div>
</template>
<script>
import mHeader from 'components/mine_comp/m_header'
import SelectList from 'components/mine_comp/select_list'
import Foot from 'components/footer/footer'
import popImg from 'base/pop_img/pop_img'
import base from 'request/api/base'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import diaLog from 'base/dialog/dialog'
import attention from 'common/js/mixins/attention'
import { getAuthInfo, newGetXcxRole } from 'common/js/getCommonInfo'
// import mineSwiper from 'components/mine_comp/mine_swiper'
import Swiper from 'base/swiper/swiper'
export default {
  mixins: [vuexData, routings, attention],
  data() {
    return {
      isShowFourG: false,
      popJywImg: 'https://zfile.bxwh002.cn/img/common/attention_jyw_bg.png', // 家园网公众号弹窗图片
      popBxImg: 'https://zfile.bxwh002.cn/img/common/attention_bx_bg.png', // 保险公众号弹窗图片
      popXcxImg: 'https://zfile.bxwh002.cn/img/common/attention_ewm.png', // 弹窗小程序图片
      isPopXcxClose: true, // 小程序显示close按钮
      isPopJyw: false, // 家园网公众号弹窗默认关闭
      isPopBx: false, // 保险公众号弹窗默认关闭
      isPopXcx: false, // 小程序弹窗默认开启
      isDialogCustomerShow: false, // 客服推荐弹窗
      btnText: {}, // 客服弹窗button
      popTitle: '', // 客服弹窗标题
      serviceP_Cls: 'serviceP_Cls', // 分配客服类
      serviceC_Cls: 'serviceC_Cls', // 分配客服类
      cnameP: 'cnameP', // 小程序添加父类
      cnameC: 'cnameC', // 小程序添加类
      isXcxImg: '', // 小程序弹窗
      swiperFlag: false, // swiper
      swiperList: [
        {
          src: 'https://zfile.bxwh002.cn/img/common/banner_6.18_mine_.png',
          title: '开通会员'
        },
        {
          src: 'https://zfile.bxwh002.cn/img/common/banner_group_mine.png',
          title: '群二维码'
        },
        {
          src: 'https://zfile.bxwh002.cn/img/common/banner_ztc.png',
          title: '直通车'
        }
      ]
    }
  },
  computed: {
    isRoleId() {
      return this.vUserInfo.roleId === '2'
    }
  },
  activated() {
    this._getPopComp('mine') // 获取公众号弹窗
    this._rmEditAllData() // 移除编辑资料
  },
  async created() {
    document.title = '个人中心'
    await getAuthInfo(this.token)
    const isXcxRole = await newGetXcxRole(this.token, this.vid)
    this.isXcxImg =
      isXcxRole.data === '1'
        ? 'https://zfile.bxwh002.cn/img/common/toxcx_no.png'
        : 'https://zfile.bxwh002.cn/img/common/toxcx.png'
    this.swiperList.unshift({
      src: this.isXcxImg,
      title: '小程序'
    })
    this.swiperFlag = true
  },
  mounted() {
    this.isFourG()
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
        case '直通车':
          this._gVas()
          break
        default:
          break
      }
    },
    // 去授权
    _getOuthJywOrBx() {
      const url = encodeURIComponent(location.href)
      location.href = `${base.xcx}/NewVisitor/authJywOrBx?redirect_url=${url}&token=${this.token}`
    },
    // 不再弹出客服分配弹窗(正式会员)
    saveFirstvip() {
      var _this = this
      this.$api.userComp
        .saveFirstvip({
          token: _this.token,
          vid: _this.vid,
          mid: _this.mid
        })
        .then(res => {
          console.log(res)
        })
    },
    // 4G电话显示
    isFourG() {
      var _this = this
      this.$api.userComp
        .isFourG({
          token: _this.token
        })
        .then(res => {
          const errCode = res.data.errCode
          const data = res.data.data
          if (errCode === 0 && data.is4G === 1) this.isShowFourG = true
        })
    },
    // 4g跳转
    _gFourG() {
      window.location.href = `${base.h5}/FreeTel/freeTelHome`
    },
    // 多个弹窗判断(公众号 客服)
    _getBxOrJyw() {
      const userInfo = this.vUserInfo
      // console.log('未执行?', this.vUserInfo.firstvip)
      // 判断是否在24小时保险或者家园网弹窗
      const timeStampNow = new Date().getTime()
      const getGzhLocalTime = parseInt(this.$storage.get('gzhLocalTime')) || 0
      if (timeStampNow > getGzhLocalTime + 24 * 60 * 60 * 1000) {
        const isAuthJywOrBxOnce = this.$storage.get('isAuthJywOrBxOnce')
        if (isAuthJywOrBxOnce) {
          this._getBxOrJywPop(userInfo)
        } else {
          this.isAuthJywOrBx()
        }
        // 判断firstvip是否为1 if yes 会员弹窗弹出
        if (this.vUserInfo.firstvip === '1') {
          setTimeout(() => {
            this.dialogContent()
          }, 1200)
        }
        // 判断非会员 且is_sales === '0'
        if (!this.isRoleId && this.vUserInfo.is_sales === '0') {
          const getPopCustTimeCom =
            parseInt(this.$storage.get('popCustisCom')) || 0
          if (timeStampNow > getPopCustTimeCom + 24 * 60 * 60 * 1000) {
            if (this.vUserInfo.is_old === 1) {
              let isNum = this.$storage.get('isNumTime') || 0
              if (isNum < 3) {
                isNum++
                this.$storage.set('isNumTime', isNum)
                setTimeout(() => {
                  this.dialogContent()
                }, 1200)
              }
            } else {
              setTimeout(() => {
                this.dialogContent()
              }, 1200)
            }
          }
        }
      }
    },
    // 判断是否授权
    async isAuthJywOrBx() {
      var _this = this
      // 重新获取userInfo数据
      // const _getData = await getAuthInfo(this.token)
      this.$api.userComp
        .isAuthJywOrBx({
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          console.log('data.auth', data.isAuth)
          if (!data.isAuth) {
            this._getOuthJywOrBx() // 去授权
          } else {
            this.$storage.set('isAuthJywOrBxOnce', true)
            // this._getBxOrJywPop(_getData.userInfo)
            this._getBxOrJywPop(this.vUserInfo)
          }
        })
    },
    // 正式会员且未关注家园网或者保险品牌 subscribe == 0 未关注家园或者保险
    _getBxOrJywPop(userInfo) {
      if (this.isRoleId && userInfo.subscribe === '0') {
        if (userInfo.popup === '1') {
          this.isPopJyw = true
        } else if (userInfo.popup === '2') {
          this.isPopBx = true
        } else {
          console.error('不需要弹出')
        }
      }
    },
    // 客服弹窗显示内容
    dialogContent() {
      this.popTitle = '温馨提示'
      this.btnText = {
        c: '立即添加'
      }
      this.isDialogCustomerShow = true
    },
    // 确认按钮推荐客服
    _confirmOneBtn() {
      this.isDialogCustomerShow = false
      this.saveFirstvip()
      this.goNext('/mine/service')
    },
    // 关闭客服弹窗
    _closePop() {
      if (this.isRoleId) {
        this.saveFirstvip()
        /// / 不在弹窗客服推荐
      } else {
        this.$storage.set('popCustisCom', new Date().getTime())
      }
      this.isDialogCustomerShow = false
    },
    // 设置公众号关闭时间
    _setGzhLocalTime() {
      this.$storage.set('gzhLocalTime', new Date().getTime())
    },
    // 关闭微名片公众号弹窗
    _closePopGzh() {
      this.isPopGzh = false
      this._getBxOrJyw()
    },
    // 关闭家园网公众号弹窗
    _closePopJyw() {
      this.isPopJyw = false
      this._setGzhLocalTime()
    },
    // 关闭保险公众号弹窗
    _closePopBx() {
      this.isPopBx = false
      this._setGzhLocalTime()
    },
    // 关闭小程序弹窗
    _closePopXcx() {
      this.isPopXcx = false
    },
    // 展开公众号弹窗
    _openPopGzh() {
      this.isPopGzh = true
    },
    // 展开小程序弹窗
    _openPopXcx() {
      this.isPopXcx = true
    },
    // 去开通
    _gPay() {
      this.goNext('/pay')
    },
    // 去完善群二维码
    _gGroupEwm() {
      this.goNext('/mine/group_ewm')
    },
    // 去聊天
    _gChat() {
      this.goNext('/chat')
    },
    // 去直通车
    _gVas() {
      this.goNext('/train/index')
    },
    _rmEditAllData() {
      this.$storage.remove('editAllData')
    }
  },
  components: {
    mHeader,
    SelectList,
    // mineSwiper,
    Foot,
    popImg,
    diaLog,
    Swiper
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
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
// 小程序弹窗
.cnameXcxOuter
  >>>.popup-mask
    background rgba(0, 0, 0, 0.7)
>>>.m_left_img
  width 14px
  height 11px
>>>._iconfont
  color #ff9834
  font-size 22px
  margin 0 10px 0 6px
.slider-content
  width 100%
  height 84px
  min-height 84px
  margin-top 15px
>>>.serviceP_Cls
  top 20% !important
  .serviceC_Cls
    flex_column()
    justify-content center
    img
      display block
      margin 0 auto
    .com_img
      width 102px
      height 80.5px
    .mem_img
      width 125.5px
      height 78px
    p
      letter-spacing 1px
      color #c75a1e
      font-size 16px
      text-align center
      margin 5px auto
    article
      display block
      padding 5px 10px
      font-size 13px
      color #666
</style>
