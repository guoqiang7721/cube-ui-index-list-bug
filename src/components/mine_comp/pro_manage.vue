<template>
  <div class="pro_container">
    <header-com :title="title" @back="back" />
    <main>
     <list-base :cname="ewmCls" @handleList="_gGrpupEwm">
        <div slot="left" class="m_list_tl">
          <span>群二维码</span>
        </div>
        <div
          slot="main"
          :class="groupEwmCls"
          class="m_list_main">
            <i class="iconxifen"></i>
            <span v-text="groupEwmText"></span>
        </div>
        <div slot="right" class="m_list_tr" >
          <i class="iconjiantou"></i>
        </div>
      </list-base>
      <list-base :cname="ewmCls"  @handleList="_gProEwm">
        <div slot="left" class="m_list_tl">
          <span>推广二维码</span>
        </div>
        <div slot="main"
              :class="proEwmCls"
              class="m_list_main"
              >
          <i class="icontuiguang"></i>
          <span v-text="proEwmText"></span>
        </div>
        <div slot="right" class="m_list_tr" >
          <i class="iconjiantou"></i>
        </div>
      </list-base>
    </main>
    <section class="listB">
      <list-base>
        <div slot="main"  class="m_list_center">
          <span class="left_text">允许在人脉市集展示</span>
          <span class="center_text">隐私设置</span>
          </div>
        <!-- <div slot="right" class="m_list_right"  @click.prevent="toggleSwitchCom" v-if="!isRoleId">
          <cube-switch v-model="ydSwitch"/>
        </div> -->
        <div slot="right" class="m_list_right">
          <cube-switch v-model="privacySwitch"/>
        </div>
      </list-base>
    </section>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import ListBase from 'base/m_list_base/m_list_base'
import { popDiaglogAlert } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData],
  data () {
    return {
      title: '推广设置',
      ewmCls: 'ewmCls',
      privacySwitch: ''
    }
  },
  computed: {
    // 推广二维码显示
    proEwmCls () {
      return this.vUserInfo.status === '1' ? 'icon_act' : ''
    },
    proEwmText () {
      return this.vUserInfo.status === '1' ? '推广中' : '停止推广'
    },
    // 群二维码显示
    groupEwmCls () {
      return this.vUserInfo.qr_status === '1' ? 'icon_act' : ''
    },
    groupEwmText () {
      return this.vUserInfo.qr_status === '1' ? '吸粉中' : '停止吸粉'
    }
  },
  created () {
    // this._getProAct()
  },
  activated () {
    this._getProAct()
  },
  methods: {
    // 获取推广设置状态
    _getProAct () {
      const privacy = this.vUserInfo.can_show
      privacy === '1' ? this.privacySwitch = true : this.privacySwitch = false
    },
    // 跳转推广二维码设置
    _gProEwm () {
      this.goNext('/mine/pro_ewm')
    },
    // 跳转群二维码设置
    _gGrpupEwm () {
      this.goNext('/mine/group_ewm')
    },
    changePrivacyStatus (val) {
      var _this = this
      console.log('changePrivacyStatus', val)
      const privacyCode = val ? 1 : 2
      this.$api.userComp.changePrivacyStatus({
        vid: _this.vid,
        token: _this.token,
        status: privacyCode
      }).then(res => {
        const errCode = res.data.errCode
        const data = res.data.data
        this.setVUserInfo(data)
        if (this.vUserInfo.privacy === '1') this.privacySwitch = true
        if (errCode === 0) {
          console.log(' res.data', res.data)
          console.log(' res.data', val)
          if (privacyCode === 2) {
            const proSetClose = {
              _this: this,
              content: '你的名片将无法展示在人脉市集，同时你也无法查看人脉市集，获取人脉。后期需要开启你可以通过【个人中心-推广设置】开启。',
              maskClosable: true,
              confirmBtnText: '知道了'
            }
            popDiaglogAlert(proSetClose)
          } else {
            const proSetShow = {
              _this: this,
              content: '你的名片将展示在人脉市集。后期需要关闭你也可以通过【个人中心-推广设置】关闭。',
              maskClosable: true,
              confirmBtnText: '知道了'
            }
            popDiaglogAlert(proSetShow)
          }
        } else {
          const proErr = {
            _this: this,
            content: res.msg,
            maskClosable: true
          }
          popDiaglogAlert(proErr)
        }
      })
    },
    // 弹窗确认操作
    popDiaglogAlertConfirm () {},
    back () {
      this.goBack()
    }
  },
  watch: {
    privacySwitch (val, bef) {
      console.log('privacySwitch', bef)
      if (bef !== '') this.changePrivacyStatus(val)
    }
  },
  components: {
    HeaderCom,
    ListBase
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.ewmCls
  .m_list_main
    flex_row()
    align-items center
    justify-content flex-end
  .icon_act
      color: #ffa123
    .m_list_main
      i
        font-size 20px
        margin-right 10px
      span
        font-size 13px
        // margin-right 10px
main
  margin-top 60px
  .m_list_outer
    height 44px
    border-bottom 1px solid #e6e6e6
    &:last-child
      border none
    .m_list_tl
      width 25%
      margin-left 3%
      color: #c00;
      >>>&:last-child
        width 60%
      span
        color #333
    .m_list_main
      width 70%
      // margin-right 10px
      .ewm_text
        font-size 12px
        color #999
      .sign_text
        font-size 14px
    .m_list_tr
      flex 1
.listB
  margin-top 10px
  .m_list_outer
    height 44px
    border-bottom 1px solid #e6e6e6
    &:last-child
      border-bottom none
    .m_list_left
      // width 18px
      // height 18px
      // margin: 0 10px 0 12px;
      // img
      //   width 100%
      //   height 100%
    .m_list_center
      flex 1
      flex_row()
      justify-content space-between
      margin 0  15px 0 12px
      .left_text
        font-size 15px
        color #333
      .center_text
        color #999
        font-size 13px
    .m_list_right
      margin-right 20px
</style>
