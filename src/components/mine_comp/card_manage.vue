<template>
  <div class="container">
    <header-com :title="title" @back="back" />
    <split />
    <div class="list_dnight">
      <img :src="isDayNightPic" class="daynight_pic" alt="" />
      <list-base>
        <i slot="left" class="iconyueliangsvg"></i>
        <div slot="main" class="m_list_center">
          <p>日夜主题</p>
          <span>开启日夜主题</span>
        </div>
        <div slot="right" class="m_list_right">
          <cube-switch v-model="dNightSwitch" />
        </div>
      </list-base>
    </div>
    <!-- 新增个人品牌编辑 -->
    <div class="listA">
      <m-list :Data="LogoManage" @_handleList="_gLogoManage">
        <span class="audit_text" :class="logoAuditCls">{{
          logoAuditText
        }}</span>
      </m-list>
      <m-list :Data="videoManage" @_handleList="_gVideoManage">
        <span class="audit_text" :class="videoAuditCls">{{
          videoAuditText
        }}</span>
      </m-list>
      <m-list :Data="honorManage" @_handleList="_gHonorManage">
        <span class="audit_text" :class="honorAuditCls">{{
          honorAuditText
        }}</span>
      </m-list>
    </div>
    <!--  -->
    <!-- <split /> -->
    <div class="listA">
      <m-list :Data="PicManage" @_handleList="_gPicManage" />
      <m-list :Data="BgMusic" @_handleList="_gBgM" />
    </div>
    <div class="listB">
      <list-base>
        <!-- <div slot="left" class="m_list_left"> -->
        <i slot="left" class="iconpersonal_icon_toutiao"></i>
        <!-- </div> -->
        <div slot="main" class="m_list_center">
          <p>头条设置</p>
          <span>开启大咖头条</span>
        </div>
        <div
          slot="right"
          class="m_list_right"
          @click.prevent="toggleSwitchCom"
          v-if="!isRoleId"
        >
          <cube-switch v-model="newsSwitch" />
        </div>
        <div slot="right" class="m_list_right" v-else>
          <cube-switch v-model="newsSwitch" />
        </div>
      </list-base>
      <list-base v-if="!vUserInfo.is_cu">
        <i slot="left" class="iconpersonal_icon_bgmusic"></i>
        <div slot="main" class="m_list_center">
          <p>云店设置</p>
          <span>开启云店首页</span>
        </div>
        <div
          slot="right"
          class="m_list_right"
          @click.prevent="toggleSwitchCom"
          v-if="!isRoleId"
        >
          <cube-switch v-model="ydSwitch" />
        </div>
        <div slot="right" class="m_list_right" v-else>
          <cube-switch v-model="ydSwitch" />
        </div>
      </list-base>
    </div>
    <!-- 日夜主题弹窗 -->
    <!-- <transition name="slide"> -->
    <dialog-img
      :cname="dayNightCls"
      v-if="isShowDnightPop"
      @closePop="_closePop"
    >
      <template v-slot:mainImg>
        <img class="day_night_img" :src="DnightObj.headerImg" alt="" />
        <h3>{{ DnightObj.mode_text }}</h3>
        <p>{{ DnightObj.tip_text }}</p>
        <cube-button class="btn" @click="_closePop" :primary="true">
          知道了
        </cube-button>
      </template>
    </dialog-img>
    <!-- </transition> -->
    <!--  -->
  </div>
</template>
<script>
import mList from 'base/m_list/m_list'
import ListBase from 'base/m_list_base/m_list_base'
import HeaderCom from 'base/header/header'
import Split from 'base/split/split'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { imgPathUrl } from 'api/config'
import { popToast, popDiaglogAlert } from 'common/js/cubePop'
import dialogImg from 'base/dialog/dialogImg'
import { getAuthInfo } from 'common/js/getCommonInfo'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      title: '名片管理',
      LogoManage: {
        leftText: 'LOGO设置',
        leftFont: 'iconicon_logozhuanhuan'
      },
      videoManage: {
        leftText: '视频设置',
        leftFont: 'iconicon_spzhuanhuan'
      },
      honorManage: {
        leftText: '荣誉设置',
        leftFont: 'iconicon_ryzhuanhuan-fuben'
      },
      PicManage: {
        leftText: '图片管理',
        leftFont: 'iconpersonal_icon_picshezhi'
      },
      BgMusic: {
        leftText: '背景音乐',
        leftFont: 'iconpersonal_icon_bgmusic'
      },
      newsSwitch: '', // 头条设置
      ydSwitch: '', // 云店
      dNightSwitch: '', // 日夜主题
      isShowDnightPop: false, // 日月弹窗显示
      dayNightCls: 'dayNightCls',
      isDayNightPic: '', // 默认head pic
      DnightObj: {} // 弹窗内容
    }
  },
  computed: {
    // 判断日夜主题背景
    isRoleId() {
      return this.vUserInfo.roleId === '2'
    },
    // logo审核
    logoAuditText() {
      const logoStatus = this.vUserInfo.cu_logo_status
      return logoStatus === '1'
        ? '审核通过'
        : logoStatus === '2'
          ? '审核失败'
          : logoStatus === '3'
            ? '审核中'
            : ''
    },
    logoAuditCls() {
      const logoStatus = this.vUserInfo.cu_logo_status
      return logoStatus === '1'
        ? 'succ'
        : logoStatus === '2'
          ? 'err'
          : logoStatus === '3'
            ? 'act'
            : ''
    },
    // 视频审核
    videoAuditText() {
      const videoStatus = this.vUserInfo.cu_video_status
      return videoStatus === '1'
        ? '审核通过'
        : videoStatus === '2'
          ? '审核失败'
          : videoStatus === '3'
            ? '审核中'
            : ''
    },
    videoAuditCls() {
      const videoStatus = this.vUserInfo.cu_video_status
      return videoStatus === '1'
        ? 'succ'
        : videoStatus === '2'
          ? 'err'
          : videoStatus === '3'
            ? 'act'
            : ''
    },
    // 荣誉审核
    honorAuditText() {
      const honorStatus = this.vUserInfo.cu_honor_status
      return honorStatus === '1'
        ? '审核通过'
        : honorStatus === '2'
          ? '审核失败'
          : honorStatus === '3'
            ? '审核中'
            : ''
    },
    honorAuditCls() {
      const honorStatus = this.vUserInfo.cu_honor_status
      return honorStatus === '1'
        ? 'succ'
        : honorStatus === '2'
          ? 'err'
          : honorStatus === '3'
            ? 'act'
            : ''
    }
  },
  created() {
    this._getPlay_Active()
  },
  async activated() {
    await getAuthInfo(this.token)
  },
  methods: {
    // 跳转logo设置
    _gLogoManage() {
      if (this.vUserInfo.cu_name) {
        if (this.vUserInfo.cu_logo_status === '3') {
          const popToastObj = {
            _this: this,
            txt: 'LOGO审核中！'
          }
          popToast(popToastObj)
        } else {
          this.goNext('/mine/logo_manage')
        }
      } else {
        const proEwmObj = {
          _this: this,
          content: '新创建品牌才可进行编辑!',
          maskClosable: true,
          confirmBtnText: '去创建',
          i: 'HandleCreateBrandName'
        }
        popDiaglogAlert(proEwmObj)
      }
    },
    // 跳转视频设置
    _gVideoManage() {
      if (this.vUserInfo.cu_name) {
        if (this.vUserInfo.cu_video_status === '3') {
          const popToastObj = {
            _this: this,
            txt: '视频审核中！'
          }
          popToast(popToastObj)
        } else {
          this.goNext('/mine/video_manage')
        }
      } else {
        const proEwmObj = {
          _this: this,
          content: '新创建品牌才可进行编辑!',
          maskClosable: true,
          confirmBtnText: '去创建',
          i: 'HandleCreateBrandName'
        }
        popDiaglogAlert(proEwmObj)
      }
    },
    // 跳转荣誉设置
    _gHonorManage() {
      if (this.vUserInfo.cu_name) {
        if (this.vUserInfo.cu_honor_status === '3') {
          const popToastObj = {
            _this: this,
            txt: '荣誉审核中！'
          }
          popToast(popToastObj)
        } else {
          this.goNext('/mine/honor_manage')
        }
      } else {
        const proEwmObj = {
          _this: this,
          content: '新创建品牌才可进行编辑!',
          maskClosable: true,
          confirmBtnText: '去创建',
          i: 'HandleCreateBrandName'
        }
        popDiaglogAlert(proEwmObj)
      }
    },
    // 创建品牌
    _gRecreate() {
      this.goNext('/brand/recreate')
    },
    // 关闭弹窗
    _closePop() {
      this.isShowDnightPop = false
    },
    // 获取名片开关状态
    _getPlay_Active() {
      const hideNews = this.vUserInfo.hide_news
      const hideShop = this.vUserInfo.hide_shop
      const hideNight = this.vUserInfo.is_theme
      hideNews === '0' ? (this.newsSwitch = true) : (this.newsSwitch = false)
      hideShop === '0' ? (this.ydSwitch = true) : (this.ydSwitch = false)
      // 判断日夜主题背景
      hideNight === '0'
        ? (this.dNightSwitch = false)
        : (this.dNightSwitch = true)
      this.isDayNightPic =
        hideNight === '0'
          ? `${imgPathUrl}/default/day_night/manage_day.png`
          : `${imgPathUrl}/default/day_night/manage_night.png`
    },
    // 非会员切换switch
    toggleSwitchCom() {
      const proEwmObj = {
        _this: this,
        content: '设置此功能需要开通会员服务.',
        maskClosable: true,
        confirmBtnText: '去开通',
        i: 'goMember'
      }
      popDiaglogAlert(proEwmObj)
      return false
    },
    popDiaglogAlertConfirm(i) {
      switch (i) {
        case 'HandleCreateBrandName': // 回传 未创建用户 mid为null
          this._gRecreate()
          break
        case 'goMember':
          this._openMem()
          break
      }
    },
    // 关闭头条设置
    updateTheme(val) {
      var _this = this
      const status = val ? 1 : 0
      this.$api.userComp
        .updateTheme({
          vid: _this.vid,
          token: _this.token,
          status: status
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            this.setV(res)
            this.isShowDnightPop = true
          }
        })
    },
    // 关闭头条设置
    setHideNews(val) {
      var _this = this
      const hideNews = val ? 0 : 1
      this.$api.userComp
        .setHideNews({
          vid: _this.vid,
          token: _this.token,
          hideNews: hideNews
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            this.setV(res)
            const popToastObj = {
              _this: this,
              txt: '保存成功',
              mask: true
            }
            popToast(popToastObj)
          }
        })
    },
    // 关闭云店
    setHideShop(val) {
      var _this = this
      const hideShop = val ? 0 : 1
      this.$api.userComp
        .setHideShop({
          vid: _this.vid,
          token: _this.token,
          hideShop: hideShop
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            this.setV(res)
            const popToastObj = {
              _this: this,
              txt: '保存成功',
              mask: true
            }
            popToast(popToastObj)
          }
        })
    },
    setV(res) {
      const data = res.data.data
      this.setVUserInfo(data)
    },
    _openMem() {
      this.goNext('/pay')
    },
    back() {
      this.goBack()
    },
    _gPicManage() {
      this.goNext('/mine/photo_manage')
    },
    _gBgM() {
      this.goNext('/mine/bg_music')
    }
  },
  watch: {
    newsSwitch(val, bef) {
      if (bef !== '') this.setHideNews(val)
    },
    ydSwitch(val, bef) {
      if (bef !== '') this.setHideShop(val)
    },
    // 日间夜间模式切换
    dNightSwitch(val, bef) {
      if (bef !== '') this.updateTheme(val)
    },
    vUserInfo(val, bef) {
      const { is_theme: isTheme } = val
      if (isTheme === '0') {
        this.isDayNightPic = `${imgPathUrl}/default/day_night/manage_day.png`
        this.DnightObj = {
          headerImg: `${imgPathUrl}/default/day_night/card_day.png`,
          mode_text: '已开启默认主题',
          tip_text: '更加清晰  更加护眼'
        }
      } else {
        this.isDayNightPic = `${imgPathUrl}/default/day_night/manage_night.png`
        this.DnightObj = {
          headerImg: `${imgPathUrl}/default/day_night/card_night.png`,
          mode_text: '已开启日夜主题模式',
          tip_text: '根据太阳高度决定名片背景'
        }
      }
    }
  },
  components: {
    HeaderCom,
    mList,
    ListBase,
    Split,
    dialogImg
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

>>>.inner_right {
  .audit_text {
    color: #FF0000;
    font-size: 12px;

    &.succ {
      color: #218be4;
    }

    &.err {
      color: #e43321;
    }

    &.act {
      color: #888;
    }
  }
}

// 日月切换弹窗
>>>.dayNightCls {
  width: 249px;
  overflow: hidden;
  padding: 10px 0 18px 0;
  left: 50%;
  top: 25%;
  margin-left: -124.5px;
  bd_r(3px);
  bgc(#fff);
  flex_column();
  align-items: center;
  justify-content: center;

  .day_night_img {
    width: 222.5px;
    height: 120px;
  }

  h3 {
    color: #252525;
    font-size: 15px;
    margin: 20px auto 12.5px;
    font-weight: bold;
  }

  p {
    color: #999;
    font-size: 13px;
  }

  .btn {
    width: 151px;
    height: 38.5px;
    margin-top: 30px;
    background: linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1));
    border-radius: 3px;
    font-size: 15px;
    padding: 0;
  }
}

//
.cube-switch {
  >>>.cube-switch-ui {
    background-color: #ff9834 !important;
    border-color: #ccc !important;
  }
}

>>>._iconfont {
  color: #ff9834;
  margin: 0 10px 0 6px;
}

.container {
  .split {
    width: 100%;
    height: 10px;
    margin-top: 45px;
  }

  .list_dnight {
    .m_list_outer {
      // border-bottom: 1px solid #e6e6e6 !important;
    }

    .iconyueliangsvg {
      font-size: 20px;
    }

    .daynight_pic {
      display: block;
      margin: 0 auto 5px;
      border-radius: 6px;
      width: 360px;
      height: 93px;
    }
  }

  .listA {
    margin-top: 10px;

    .m_list_common {
      height: 44px;
      border-bottom: 1px solid #e6e6e6;

      &:last-child {
        border-bottom: none;
      }

      >>>.m_left_img {
        width: 18px;
        height: 18px;
      }

      >>>i {
        &.iconicon_logozhuanhuan, &.iconicon_spzhuanhuan, &.iconicon_ryzhuanhuan-fuben {
          font-size: 18px;
          margin: 0 12px 0 10px;
        }
      }
    }
  }

  .listB {
    margin-top: 10px;
  }

  .m_list_outer {
    height: 44px;
    border-bottom: 1px solid #e6e6e6;

    &:last-child {
      border-bottom: none;
    }

    i {
      color: #ff9834;
      margin: 0 10px 0 6px;
    }

    .m_list_center {
      flex: 1;
      flex_row();
      justify-content: space-between;
      margin-right: 15px;

      p {
        font-size: 15px;
      }

      span {
        color: #999;
        font-size: 12px;
      }
    }

    .m_list_right {
      margin-right: 20px;
    }
  }
}
</style>
