<template>
  <div class="container">
    <HeaderCom :title="title" @back="back" />
    <div class="info">
      <div class="uploadBox">
        <input type="file" id="change" accept="image/*" @change="_change" />
      </div>
      <img class="info_upic" :src="extraUserInfo.upic" />
      <div class="info_container">
        <div class="msg">
          *
          <cube-input
            v-model="extraUserInfo.name"
            :type="name_type"
            :placeholder="name_holder"
            :clearable="clearable"
            :maxlength="infoNameMaxlength"
          />
        </div>
        <div class="msg" v-if="isRoleId">
          *
          <div class="msg_phone" @click="_handlePhoneTip">
            <!-- <p> {{isBefTeltext}}</p> -->
            <p>{{ vUserInfo.show_tel }}</p>
            <!-- <h5>{{ isHideTelText }}</h5> -->
          </div>
          <img
            class="toggle_img"
            :src="isTelDefImg"
            @click="_toggleHideTel"
            alt=""
          />
        </div>
        <div class="msg" v-else>
          *
          <div class="msg_phone" @click="_handlePhoneTip">
            {{ extraUserInfo.tel }}
          </div>
        </div>
      </div>
    </div>
    <split />
    <list-base :cname="inputCls">
      <div slot="left" class="m_list_tl"><span>品牌</span>*</div>
      <div slot="main" class="m_list_main" @click="_chooseBrand">
        <span>{{ _getBrandName.brand }}</span>
        <div class="audit_inner">
          <cube-button
            class="cube-btn"
            :class="isAuditCls"
            v-if="isAuditText"
            >{{ isAuditText }}</cube-button
          >
        </div>
        <div class="right_part"></div>
      </div>
      <div slot="right" class="m_list_tr" @click="_chooseBrand">
        <i class="iconjiantou"></i>
      </div>
    </list-base>
    <list-base :cname="inputCls">
      <div slot="left" class="m_list_tl">
        <span>职位/称谓</span>
      </div>
      <div slot="main" class="m_list_main">
        <cube-input
          v-model="newTitle"
          :maxlength="positonMaxlength"
          :placeholder="positon_holder"
        ></cube-input>
      </div>
    </list-base>
    <list-base :cname="inputCls" :style="noBorder">
      <div slot="left" class="m_list_tl">
        <span>微信号</span>
      </div>
      <div slot="main" class="m_list_main">
        <cube-input
          v-model="extraUserInfo.wechat"
          :placeholder="wechat_holder"
          :maxlength="wechatMaxlength"
        ></cube-input>
      </div>
    </list-base>
    <split />
    <split />
    <list-base :cname="inputCls">
      <div slot="left" class="m_list_tl">
        <span>地址</span>
      </div>
      <div slot="main" class="m_list_main">
        <s-city @cancelHandle="_cancelHandle" @selectHandle="_selectHandle">
          <span v-if="getProvince">
            {{ getProvince }}&nbsp;&nbsp;&nbsp;{{ getCity }}
          </span>
          <span v-else>请选择地址</span>
        </s-city>
      </div>
    </list-base>
    <list-base :cname="textareaCls">
      <div slot="left" class="m_list_tl">
        <span>详细地址</span>
      </div>
      <div slot="main" class="m_list_main">
        <cube-textarea
          v-model="extraUserInfo.address"
          :maxlength="textareaMaxlength"
          :autoExpand="true"
          :placeholder="addressDetail_holder"
        />
      </div>
    </list-base>
    <list-base :cname="textareaCls" :style="noBorder">
      <div slot="left" class="m_list_tl">
        <span>事业签名</span>
      </div>
      <div slot="main" class="m_list_main">
        <cube-textarea
          v-model="extraUserInfo.sign"
          :maxlength="textareaMaxlength"
          :autoExpand="true"
          :placeholder="sign_holder"
        />
      </div>
    </list-base>
    <split />
    <list-base :style="noBorder" @handleList="_gProManage">
      <div slot="left" class="m_list_tl">
        <span>推广设置</span>
      </div>
      <div slot="main" class="m_list_main"></div>
      <div slot="right" class="m_list_tr">
        <i class="iconjiantou"></i>
      </div>
    </list-base>
    <up-load-crop
      v-show="isCropperShow"
      :option="option"
      :tipText="uPicTipText"
      @confirm="_confirm"
      @cancel="_cancel"
      @loaderr="_loaderr"
    >
    </up-load-crop>
    <cube-button class="btn" @click="_save" :primary="true">保存</cube-button>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import Split from 'base/split/split'
import ListBase from 'base/m_list_base/m_list_base'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import uploadData from 'common/js/mixins/upload_data'
import sCity from 'base/city/city'
import UpLoadCrop from 'base/upload_crop/upload_crop'
import { popToast, popDiaglogAlert } from 'common/js/cubePop'
import base from 'request/api/base'
import { imgPathUrl, ISIOS, ISNODE_ENV } from 'api/config'
// import { getAuthInfo } from 'common/js/getCommonInfo'
export default {
  mixins: [routings, vuexData, uploadData],
  data() {
    return {
      title: '修改资料',
      extraUserInfo: {}, // vuex赋值数据
      clearable: {
        // cube-ui 右侧close icon
        visible: true,
        blurHidden: true
      },
      uploadImg: '', // 上传头像
      newTitle: '', // 个人职位
      name_holder: '请输入您的姓名', // 个人名字holder
      positon_holder: '请输入您的职位', // 个人职位holder
      wechat_holder: '请输入您的微信号', // 个人微信号holder
      addressDetail_holder: '请输入您的详细地址', // 个人详细地址holder
      sign_holder: '请输入您的事业签名', // 个人事业签名holder
      name_type: 'text', // name type 类型
      textareaMaxlength: 24, // textarea 最大长度
      infoNameMaxlength: 12, // name 最大长度
      positonMaxlength: 12, // 职位 最大长度
      wechatMaxlength: 15, // 微信 最大长度
      textareaCls: 'textareaCls', // textarea 样式
      inputCls: 'inputCls', // input 样式
      s_province: '', // 省份
      s_city: '', // 城市
      isCropperShow: false, // 裁剪显示
      uPicTipText: '提示：上传你的真实头像更添信任！', // 裁剪提示文字
      newBrandData: {}, // 所选品牌
      isChangeBrand: false,
      isFrom: '',
      isHideTelImgDef: false, // 默认隐藏手机号
      isTelDefImg: '', // 默认隐藏手机号Img
      isTelNum: '', // 默认隐藏手机号 y 1 n 0
      brandStatus: '' // 品牌状态
      // isShowCuTip: true
    }
  },
  async activated() {
    this.newBrandData = {} // 默认newBrandData为空数据
    // const data = await getAuthInfo(this.token)
    // this.extraUserInfo = data.userInfo
    this.extraUserInfo = Object.assign({}, this.vUserInfo) // 深拷贝个人信息 以便更改
    this.newTitle = this.extraUserInfo.title
    this._getLocalInfo()
    this.getReviewStatus() // 获取品牌状态
  },
  computed: {
    // 判断正式会员
    isRoleId() {
      return this.vUserInfo.roleId === '2'
    },
    isShowCuTip() {
      if (this.newBrandData.brand) {
        return this.newBrandData.brand === this.industyName
      } else {
        return true
      }
    },
    // 隐藏手机号
    isHideTelText() {
      const extraTel = this.vUserInfo.tel
      let tel = ''
      if (this.isRoleId) {
        const substr1 = extraTel.substring(0, 3)
        const substr2 = extraTel.substring(7)
        tel = `${substr1}****${substr2}`
      }
      return this.isRoleId && `显示为${tel}`
    },
    // 计算brand
    _getBrandName() {
      return this.newBrandData.bid ? this.newBrandData : this.extraUserInfo
    },
    // 计算省份
    getProvince() {
      return this.s_province || this.extraUserInfo.province
    },
    // 计算城市
    getCity() {
      return this.s_city || this.extraUserInfo.city
    },
    // 无border显示
    noBorder() {
      return `border-bottom:none`
    },
    // 品牌审核text
    isAuditText() {
      return this.brandStatus === '1'
        ? 'DIY'
        : this.brandStatus === '2'
          ? '不通过'
          : this.brandStatus === '3'
            ? '审核中'
            : ''
    },
    // 品牌审核cls
    isAuditCls() {
      return this.brandStatus === '1'
        ? 'succ'
        : this.brandStatus === '2'
          ? 'err'
          : this.brandStatus === '3'
            ? 'act'
            : ''
    }
  },
  created() {
    this._showDefTelImg()
  },
  methods: {
    // 首次加载显示  //是否隐藏显示
    _showDefTelImg() {
      this.isTelDefImg =
        this.vUserInfo.hide_tel === '1'
          ? `${imgPathUrl}/default/edit/edit_button_hide.png`
          : `${imgPathUrl}/default/edit/edit_button_show.png`
    },
    // 切换手机号显示与隐藏
    _toggleHideTel() {
      const isDefNum = this.isTelDefImg.indexOf('hide') > 0
      this.isTelDefImg = isDefNum
        ? `${imgPathUrl}/default/edit/edit_button_show.png`
        : `${imgPathUrl}/default/edit/edit_button_hide.png`
    },
    _getPosition(e) {
      this.newPosition = e
    },
    getPos() {
      return this.extraUserInfo.title || this.extraUserInfo.brand
    },
    // 跳转推广设置
    _gProManage() {
      this._setLocalInfo()
      this.goNext('/mine/pro_manage')
    },
    // 电话操作提示
    _handlePhoneTip() {
      const proEwmObj = {
        _this: this,
        icon: 'cubeic-phone',
        content: '手机号不可更改，若要在本机更换手机,请联系客服：13205259397',
        maskClosable: true
      }
      popDiaglogAlert(proEwmObj)
    },
    // 电话操作确认按钮
    popDiaglogAlertConfirm() {},
    // 选择城市操作
    _selectHandle(val, index, cityText) {
      this.s_province = cityText[0]
      this.s_city = cityText[1]
    },
    // 取消城市选择
    _cancelHandle() {},
    // 确定裁剪
    _confirm(upic) {
      this.isCropperShow = false
      this.extraUserInfo.upic = upic
      this.upload(upic)
    },
    // 上传头像
    upload(upic) {
      var _this = this
      this.$api.edit
        .upload({
          vid: _this.vid,
          token: _this.token,
          upic: upic
        })
        .then(res => {
          const data = res.data.data
          this.uploadImg = data
          const msg = res.data.msg
          const errCode = res.data.errCode
          if (errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: '上传成功'
            }
            popToast(popToastObj)
          } else {
            const popToastObj = {
              _this: this,
              txt: msg
            }
            popToast(popToastObj)
          }
        })
    },
    // 保存信息
    _save() {
      if (!this.extraUserInfo.name.trim()) {
        const popToastObj = {
          _this: this,
          txt: '姓名不能为空'
        }
        popToast(popToastObj)
        return false
      }
      this.updateUserInfo()
    },
    // 更新个人信息
    updateUserInfo() {
      var _this = this
      this.$api.edit
        .updateUserInfo({
          vid: _this.vUserInfo.vid,
          token: _this.token,
          tel: _this.extraUserInfo.tel,
          name: _this.extraUserInfo.name.trim(),
          upic: _this.uploadImg || _this.extraUserInfo.upic,
          title: _this.newTitle.trim(),
          bid: _this._getBrandName.bid || '7',
          province: _this.getProvince,
          city: _this.getCity,
          address: _this.extraUserInfo.address.trim(),
          wechat: _this.extraUserInfo.wechat.trim(),
          sign: _this.extraUserInfo.sign.trim(),
          hide_tel: _this.isTelNum
        })
        .then(res => {
          const data = res.data.data
          this.setVUserInfo(data)
          this.setBid(data.bid)
          const popToastObj = {
            _this: this,
            txt: '保存成功',
            mask: true
          }
          this._rmEditAllData()
          popToast(popToastObj)
          setTimeout(() => {
            if (ISNODE_ENV === 'development') {
              this.goNext('/home')
            } else {
              if (ISIOS) {
                location.href = `${base.h5_url}/home`
              } else {
                this.goNext('/home')
              }
            }
          }, 800)
        })
    },
    // 获取品牌状态
    getReviewStatus() {
      var _this = this
      this.$api.brand
        .getReviewStatus({
          bid: _this.newBrandData.bid || _this.extraUserInfo.bid,
          token: _this.token
        })
        .then(
          res => {
            const data = res.data.data
            this.brandStatus = data
          },
          err => {
            console.log(err.data, 'err')
          }
        )
    },
    // 选择品牌
    _chooseBrand() {
      this._setLocalInfo()
      this.goNext('/brand', {
        brandName: this._getBrandName.brand,
        scene: true
      })
    },
    back() {
      this.isChangeBrand = false
      this.goBack()
    },
    // 设置保存本地
    _setLocalInfo() {
      let ibid = this.newBrandData.bid || this.extraUserInfo.bid
      let ibrand = this.newBrandData.brand || this.extraUserInfo.brand
      let editAllData = {
        localtel: this.extraUserInfo.tel,
        localname: this.extraUserInfo.name.trim(),
        localupic: this.uploadImg || this.extraUserInfo.upic,
        localnewTitle: this.newTitle.trim(),
        localbid: ibid,
        localbrand: ibrand,
        localProvince: this.getProvince,
        localgetCity: this.getCity,
        localaddress: this.extraUserInfo.address.trim(),
        localwechat: this.extraUserInfo.wechat.trim(),
        localsign: this.extraUserInfo.sign.trim(),
        localTelNum: this.isTelNum
      }
      let editAllDataString = JSON.stringify(editAllData)
      this.$storage.set('editAllData', editAllDataString)
    },
    // 获取本地数据
    _getLocalInfo() {
      let geteditAllData, editAllDataJson
      if (this.$storage.get('editAllData')) {
        geteditAllData = this.$storage.get('editAllData')
        editAllDataJson = JSON.parse(geteditAllData)
        this.newBrandData.bid = editAllDataJson.localbid
        this.newBrandData.brand = editAllDataJson.localbrand
        if (editAllDataJson.localtel) {
          this.extraUserInfo.tel = editAllDataJson.localtel
          this.extraUserInfo.name = editAllDataJson.localname
          this.extraUserInfo.upic = editAllDataJson.localupic
          this.newTitle = editAllDataJson.localnewTitle
          this.extraUserInfo.getProvince = editAllDataJson.localProvince
          this.extraUserInfo.getCity = editAllDataJson.localgetCity
          this.extraUserInfo.address = editAllDataJson.localaddress
          this.extraUserInfo.wechat = editAllDataJson.localwechat
          this.extraUserInfo.sign = editAllDataJson.localsign
          this.isTelNum = editAllDataJson.localTelNum
        }
      }
    },
    // 清除本地数据
    _rmEditAllData() {
      this.$storage.remove('editAllData')
    }
  },
  watch: {
    isTelDefImg(val, bef) {
      this.isTelNum = val.indexOf('hide') >= 0 ? 1 : 0
    },
    _getBrandName(val, bef) {
      if (bef !== '') {
        this.newTitle = this.newBrandData.brand || this.extraUserInfo.title
      }
    }
  },
  components: {
    HeaderCom,
    Split,
    ListBase,
    sCity,
    UpLoadCrop
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.cube-dialog-content
  font-size 24px !important
.info
  width 100%
  margin-top 60px
  background-color #fff
  height 90px
  display flex
  flex-direction row
  align-items center
  position relative
  .uploadBox
    position absolute
    width 60px
    height 100%
    left 3%
    top 0
    #change
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      opacity 0
  .info_upic
    width 60px
    height 60px
    border-radius 50%
    margin-left 3%
    margin-right 3%
    border 1px solid #fff
    box-sizing border-box
  .info_container
    flex 1
    font-size 16px
    .msg
      width 100%
      display flex
      flex-direction row
      align-items center
      color #cc0000
      height 45px
      border-bottom 1px solid #e6e6e6
      &:last-child
        border none
      .cube-input
        flex 1
        margin-left 14px
        // height 44px !important
        // line-height 44px !important
        // .cube-input-field
        // // height 100%
        // line-height 44px !important
      .msg_phone
        // height 100%
        // line-height 100%
        flex 1
        flex_column()
        justify-content center
        color #333
        box-sizing border-box
        margin-left 14px
        p
          color #666
          font-size 16px
        h5
          color #999
          font-size 12px
          margin-top 3px
      .toggle_img
        width 60px
        height 24px
        margin-right 10px
.split
  width 100%
  height 10px
.m_list_outer
  height 44px
  border-bottom 1px solid #e6e6e6
  .m_list_tl
    width 25%
    margin-left 3%
    color #c00
    >>>&:last-child
      width 60%
    span
      color #333
  .m_list_main
    width 60%
    margin-right 10px
    .cube-input
      // line-height 44px !important
    .cube-input-field
      width 80%
    .ewm_text
      font-size 12px
      color #999
    .sign_text
      font-size 14px
  .m_list_tr
    flex 1
    // margin 0 0px 0 10px
    .ewm_upload
      width 18px
      height 18px
.textareaCls
  height auto !important
  padding 5px 0
  .m_list_main
    // width 80%
.inputCls
  .m_list_main
    flex_row()
    align-items center
    .audit_inner
      position relative
    .cube-input
      width 100%
    .cube-btn
      width auto
      padding 2px 5px
      bgc(#fff)
      font-size 11px
      margin-left 8px
      // margin:-2px 0 0 8px;
      border-radius 3px
      &.succ
        color #FF9E22
        border 1px solid #FF9E22
      &.err
        color #F03921
        border 1px solid #F03921
      &.act
        color #479A33
        border 1px solid #479A33
    .right_part
      flex 1
      height 100%
.btn
  btn(338px, 40px, '', '', $color-text, 5px)
  margin 30px auto
  bg_linear()
</style>
