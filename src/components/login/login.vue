<template>
  <div class="container">
    <div class="header">
      <img
        class="logo_brand"
        v-if="extraProUserInfo.logo"
        :src="extraProUserInfo.logo"
      />
      <p>用一张名片</p>
      <p
        v-if="
          (extraProUserInfo && extraProUserInfo.bid !== '175') || industyName
        "
      >
        开启{{ newBrandName }}的无限可能
      </p>
      <p v-else>
        开启的无限可能
      </p>
      <img class="upic" :src="extraUserInfo.upic" />
    </div>
    <div class="wave_box">
      <img
        class="new_wave"
        src="https://zfile.bxwh002.cn/img/default/wave.gif"
        alt=""
      />
    </div>
    <div class="input_box">
      <div class="input_outer">
        <span class="left_text">姓名</span>
        <cube-input
          v-model="extraUserInfo.name"
          :placeholder="cName.holder"
          :type="cName.type"
          :maxlength="cName.maxlength"
        ></cube-input>
        <!-- <div class="input_cls">
              <input type="text" placeholder="请输入您的姓名." maxlength='11' >
            </div> -->
      </div>
      <div class="input_outer">
        <span class="left_text">手机</span>
        <cube-input
          v-model="extraUserInfo.tel"
          :placeholder="cTel.holder"
          :type="cTel.type"
          :maxlength="cTel.maxlength"
        ></cube-input>
      </div>
      <!-- 获取验证码 -->
      <div class="input_outer" v-show="extraUserInfo.tel.length == '11'">
        <span class="left_text">验证码</span>
        <div class="code_inner">
          <cube-input
            v-model="extraUserInfo.code"
            :placeholder="cCode.holder"
            :type="cCode.type"
            :maxlength="cCode.maxlength"
          >
          </cube-input>
          <div
            class="code_text"
            :class="showTime ? 'get' : 'time'"
            @click="_getCodeText"
          >
            {{ codeText }}
          </div>
        </div>
      </div>
      <div class="input_outer" v-if="!extraProUserInfo">
        <span class="left_text">品牌</span>
        <div class="code_inner" @click="_gBrand">
          <cube-input
            :disabled="cBrand.disabled"
            :placeholder="cBrand.holder"
            v-if="!vBrandInfo.name && !newcreateName"
          >
          </cube-input>
          <span v-else>
            {{ vBrandInfo.name || newcreateName }}
          </span>
          <i class="iconjiantou"></i>
        </div>
      </div>
      <button class="create_btn" @click="_createBtn">
        创建名片
      </button>
      <!-- <div class='rec_per'
               v-if="extraProUserInfo"
               >推荐人 :{{extraProUserInfo.name}}
          </div> -->
    </div>
    <div v-if="isLoading" class="loading-container">
      <loading />
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { popToast, popDiaglogAlert } from 'common/js/cubePop'
import Loading from 'base/loading/loading'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      extraUserInfo: {}, // 个人信息,
      extraProUserInfo: {}, // 上级信息
      cName: {
        holder: '请输入您的姓名',
        type: 'text',
        maxlength: 12
      },
      cTel: {
        holder: '请输入您的手机号',
        type: 'number',
        maxlength: 11
      },
      cCode: {
        holder: '请输入验证码',
        type: 'text',
        maxlength: 4
      },
      cBrand: {
        holder: '请选择品牌',
        disabled: true
      },
      showView: false, // 默认不显示手机号验证码
      showTime: true, // 默认不显示手机号验证码
      codeText: '获取验证码', // 默认显示获取验证码
      isLoading: false,
      newcreateName: '',
      newcreateBid: ''
    }
  },
  computed: {
    // 品牌名字
    newBrandName() {
      return this.extraProUserInfo.brand || this.industyName
    }
  },
  created() {
    this.extraUserInfo = Object.assign({}, this.vUserInfo)
    // this.extraProUserInfo = Object.assign({}, this.proUserInfo)
  },
  activated() {
    console.warn(this.vBrandInfo)
    this._getEditBid()
  },
  methods: {
    // 判断是否是创建品牌
    _getEditBid() {
      const { brandName, newcreateBid, newcreateName } = this.getParams()
      this.newcreateBid = newcreateBid
      this.newcreateName = newcreateName
      console.warn(this.newcreateBid, this.newcreateName)
      // newcreateBid 是创建品牌用户
      // if (!newcreateBid) {
      this.extraProUserInfo = brandName ? this.proUserInfo : ''
      // }else{

      // }
    },
    // 获取验证码
    _getCodeText() {
      if (!this.sendMsg) {
        this.sendMsg = true
        this.sendCommonVerifyCode()
      }
    },
    // 选择品牌
    _gBrand() {
      this.goNext('/brand', { brandName: this.vBrandInfo.name })
    },
    // 创建名片
    _createBtn() {
      const { brandId } = this.getParams()
      if (!this.extraUserInfo.name.trim()) {
        const popToastObj = {
          _this: this,
          txt: '姓名不能为空'
        }
        popToast(popToastObj)
        return false
      }
      if (!this.extraUserInfo.tel.trim()) {
        const popToastObj = {
          _this: this,
          txt: '手机号不能为空'
        }
        popToast(popToastObj)
        return false
      }
      if (!this.extraUserInfo.code || this.extraUserInfo.code.length !== 4) {
        const popToastObj = {
          _this: this,
          txt: '请输入正确的验证码'
        }
        popToast(popToastObj)
        return false
      }
      if (!this.vBrandInfo.name && !brandId && !this.newcreateBid) {
        const popToastObj = {
          _this: this,
          txt: '请选择品牌'
        }
        popToast(popToastObj)
        return false
      }
      this.create(brandId)
    },
    // 提交创建接口
    create(brandId) {
      this.isLoading = true
      var _this = this
      const { nid, newcreateBid } = this.getParams()
      this.$api.login
        .create({
          vid: _this.vid,
          token: _this.token,
          tel: _this.extraUserInfo.tel,
          name: _this.extraUserInfo.name.trim(),
          upic: _this.extraUserInfo.upic,
          bid: newcreateBid || brandId || _this.vBrandInfo.id,
          vcode: _this.extraUserInfo.code,
          newsid: nid || 0,
          fromarea: 2
        })
        .then(
          res => {
            const errCode = res.data.errCode
            const msg = res.data.msg
            const data = res.data.data
            if (errCode === 0) {
              const popToastObj = {
                _this: this,
                txt: '保存成功',
                mask: true
              }
              popToast(popToastObj)
              this.setVUserInfo(data)
              this.setVid(data.vid)
              this.setMid(data.mid)
              this.setBid(data.bid)
              setTimeout(() => {
                this.goNext('/home', { uid: data.vid })
              }, 1500)
            } else if (errCode === 1003) {
              this.isLoading = false
              const proEwmObj = {
                _this: this,
                icon: 'cubeic-phone',
                content:
                  '手机号不可更改，若要在本机更换手机,请联系客服：13205259397',
                maskClosable: true
              }
              popDiaglogAlert(proEwmObj)
            } else {
              this.isLoading = false
              const popToastObj = {
                _this: this,
                txt: msg
              }
              popToast(popToastObj)
            }
          },
          err => {
            const errMsg = err.data.msg
            const popToastObj = {
              _this: this,
              txt: errMsg
            }
            popToast(popToastObj)
          }
        )
    },
    // 发送短信
    sendCommonVerifyCode() {
      var _this = this
      this.$api.login
        .sendCommonVerifyCode({
          vid: _this.vid,
          token: _this.token,
          tel: _this.extraUserInfo.tel
        })
        .then(
          res => {
            const errCode = res.data.errCode
            const msg = res.data.msg
            const popToastObj = {
              _this: this,
              txt: msg
            }
            popToast(popToastObj)
            if (errCode === 0) {
              let countdown = 60
              const timer = setInterval(function() {
                countdown--
                if (countdown === 0) {
                  _this.sendMsg = false
                  _this.showTime = true
                  _this.codeText = '获取验证码'
                  countdown = 60
                  clearInterval(timer)
                } else {
                  _this.showTime = false
                  _this.codeText = countdown + 's'
                }
              }, 1000)
            } else {
              const popToastObj = {
                _this: this,
                txt: msg
              }
              popToast(popToastObj)
            }
          },
          err => {
            const errMsg = err.data.msg
            const popToastObj = {
              _this: this,
              txt: errMsg
            }
            popToast(popToastObj)
            this.sendMsg = false
          }
        )
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.container
  bgc(linear-gradient(-30deg, #ffb34f 50%, #ffb24f 100%, #ffb34f 100%))
.loading-container
  z-index 5
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.4)
  .loading
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    z-index 6
.get
  bg_linear()
.time
  bgc(#999)
  z-index 6
@keyframes breathe
  0%
    box-shadow 0 1px 1px rgba(255, 255, 255, 0.4)
  100%
    box-shadow 0 0px 40px rgba(255, 255, 255, 0.9)
@keyframes breathe
  0%
    box-shadow 0 1px 1px rgba(255, 255, 255, 0.4)
  100%
    box-shadow 0 0px 40px rgba(255, 255, 255, 0.9)
@keyframes sway
  0%
    transform translate3d(0, 10px, 0) rotate(-15deg)
  17%
    transform translate3d(0, 0px, 0) rotate(25deg)
  34%
    transform translate3d(0, -10px, 0) rotate(-20deg)
  50%
    transform translate3d(0, -5px, 0) rotate(15deg)
  67%
    transform translate3d(0, 5px, 0) rotate(-25deg)
  84%
    transform translate3d(0, 7.5px, 0) rotate(15deg)
  100%
    transform translate3d(0, 10px, 0) rotate(-15deg)
.header
  width 100%
  // height: 325px;
  height 240px
  background #fff
  display flex
  flex-direction column
  justify-content center
  align-items center
  color #ff822c
  position relative
  .logo_brand
    width 135px
    height 100px
  .upic
    width 78px
    height 78px
    border-radius 50%
    border solid 2px #ff822c
    animation sway 10s ease-in-out infinite
    opacity 0.9
    position absolute
    z-index 3
    bottom -60px
    left 50%
    margin-left -39px
  p
    width 90%
    margin 13px auto 0
    font-size 24px
    letter-spacing 2px
    text-align center
  span
    margin-top 5px
    font-size 22px
    letter-spacing 2px
.wave_box
  overflow hidden
  margin-top -12px
  position relative
  width 100%
  height 123px
  .new_wave
    width 100%
    height 100%
.input_box
  margin-top -45px
  bgc(linear-gradient(-30deg, #ffb34f 50%, #ffb24f 100%, #ffb34f 100%))
  padding-bottom 20px
  position relative
  z-index 5
  .rec_per
    text-align center
    font-size 12px
    margin 10px auto 0
    color #fff
    letter-spacing 2px
  .input_outer
    width 75%
    background #fff
    height 44px
    margin 15px auto 0
    // line-height: 44px;
    text-align center
    background-color #fff
    box-shadow 0px 2px 8px 0px rgba(249, 123, 55, 0.54)
    box-sizing border-box
    border-radius 22px
    // border: solid 1px #e1e1e1;
    font-size 15px
    color #333
    display flex
    flex-direction row
    align-items center
    // position: relative;
    // z-index: 40;
    .left_text
      height 44px
      line-height 44px
      letter-spacing 1px
      color #999
      text-align center
      font-size 15px
      width 25%
      margin-left 3%
    .input_cls
      width 100%
      height 100%
      line-height 100%
      flex 1
      input
        width 100%
        height 30px
    // >input
    // width: 75%;
    // text-align: left;
    .cube-input
      // height 44px !important
      // line-height 44px !important
      // >>>.cube-input-field
      // // height 44px !important
      // line-height 44px !important
    .code_inner
      width 73%
      height 100%
      display flex
      flex-direction row
      align-items center
      justify-content space-between
      .iconjiantou
        margin-right 2%
        color #999
        font-size 28px
      .cube-input
        width 62%
        // height: 100% !important;
        text-align left
      .code_text
        width 35%
        height 30px
        line-height 30px
        color #fff
        font-size 12px
        text-align center
        border-radius 5px
        margin-right 3%
    .brand_inner
      width 70%
      margin-right 3%
      height 100%
      display flex
      flex-direction row
      align-items center
      justify-content space-between
      color #666
      img
        width 6.5px
        height 11.5px
  .create_btn
    btn(274px, 44px, 16px, '', #fff, 22px)
    margin 33px auto 15px
    letter-spacing 2px
    bgc(linear-gradient(0deg, #ff493b 0%, #ff8330 99%), linear-gradient(#ff9f23, #ff9f23))
    animation breathe 1000ms linear alternate infinite
</style>
