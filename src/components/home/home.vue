<template>
  <div class="home" :style="midCls" id="home">
    <cube-scroll ref="scroll" class="home_content">
      <div class="m_bg">
        <img :src="isdNightBgImg" alt="" />
      </div>
      <info-upic
        :Mine_Info="Mine_Info"
        :socialInfo="socialInfo"
        :visitorInfo="visitorInfo"
        :isLogoAudit="isLogoAudit"
        :isCuBrand="isCuBrand"
        :isSelf="isSelf"
        :isOtherHideLogo="isOtherHideLogo"
        :isAuditText="isAuditText('logo')"
        :isAuditCls="isAuditCls('logo')"
        @gMine="_gMine"
        @gUploadLogo="_gUploadLogo"
        :isdNightHeadImg="isdNightHeadImg"
      />
      <split />
      <info-tel
        :Mine_Info="Mine_Info"
        :isFontCls="isFontCls"
        :transmitText="transmitText"
        :exactAddress="exactAddress"
        @transmit="_transmit"
        @call="_call"
      />
      <!-- <input type="file" style="position:relative;z-index:4" @change="_video(e)" accept="video/example" name="take video and upload video"> -->
      <!-- 云店 -->
      <section v-if="isShowYd" class="ydNewsCls">
        <home-side
          :isFontCls="isFontCls"
          :isFontBrandTipCls="isFontBrandTipCls"
          :BRAND_S="sideYd_T"
          :BRAND_A="sideYd_B"
        />
        <swiper :data="ydList" v-if="ydFlag">
          <cube-slide-item v-for="item in ydList" :key="item.id">
            <a @click="_gYdMore">
              <img :src="item.pic" @load="loadImage" alt="item.title" />
            </a>
          </cube-slide-item>
        </swiper>
        <cube-button class="cube_btn_more" @click="_gYdMore" :primary="true">
          <!-- :outline="true" -->
          查看更多
        </cube-button>
      </section>
      <section v-show="isShowNews" class="ydNewsCls">
        <!-- 头条 -->
        <home-side
          :BRAND_S="sideNews_T"
          :BRAND_A="sideNews_B"
          :isFontCls="isFontCls"
          :isFontBrandTipCls="isFontBrandTipCls"
        />
        <top-news
          :Mine_News_F="Mine_News_F"
          :Mine_News_L="Mine_News_L"
          :Mine_Info="Mine_Info"
          :isFontCls="isFontCls"
          @gNewsDetail="_gNewsDetail"
        />
        <cube-button class="cube_btn_more" @click="_gNews" :primary="true">
          查看更多
        </cube-button>
      </section>
      <!-- 介绍 -->
      <home-side
        v-if="!isOtherHideVideo && Mine_Video"
        :BRAND_S="sideIntro_T"
        :BRAND_A="sideIntro_B"
        :isFontCls="isFontCls"
        :isFontBrandTipCls="isFontBrandTipCls"
      />
      <!-- <hvideo v-if="Mine_Video && !isOtherHideVideo" :Mine_Video="Mine_Video" /> -->
      <hvideo v-if="Mine_Video && !isCuBrand" :Mine_Video="Mine_Video" />
      <!-- 创建品牌 且 1当前是diy品牌 且不是审核通过的状态  -->
      <div
        class="videoIframBox"
        v-if="Mine_Video && isCuBrand && !isOtherHideVideo"
      >
        <cube-button :class="isAuditCls('video')" v-if="isAuditCls('video')">
          {{ isAuditText('video') }}
        </cube-button>
        <iframe
          class="videoIframCls"
          frameborder="0"
          :src="Mine_Video.url"
          allowFullScreen="true"
        >
        </iframe>
      </div>
      <!-- <img
        v-else-if="isVideoAudit"
        class="video_audit"
        src="https://zfile.bxwh002.cn/img/default/general/video_audit.jpg"
        alt=""
      /> -->
      <!-- 荣誉 -->
      <home-side
        v-if="Mine_Honor.length > 0 && !isOtherHideHonor"
        :BRAND_S="sideHonor_T"
        :BRAND_A="sideHonor_B"
        :isFontBrandTipCls="isFontBrandTipCls"
        :isFontCls="isFontCls"
        :isCuBrand="isCuBrand"
      />
      <!-- <cube-button
        @click="delToken"
        style="width:200px;padding:10px 0;margin:10px 0"
      >
        清除token 误点击
    </cube-button> -->
      <honor
        v-if="Mine_Honor.length > 0 && !isOtherHideHonor"
        :Mine_Honor="Mine_Honor"
        :isFontCls="isFontCls"
        :isHonorAudit="isHonorAudit"
        :isAuditText="isAuditText('honor')"
        :isAuditCls="isAuditCls('honor')"
        :isCuBrand="isCuBrand"
      />
      <!-- 风采 -->
      <home-side
        v-if="Mine_Pic"
        :BRAND_S="sideElegant_T"
        :BRAND_A="sideElegant_B"
        :isFontCls="isFontCls"
        :isFontBrandTipCls="isFontBrandTipCls"
      />
      <elegant
        v-if="isMinePicShow && Mine_Pic"
        :Mine_Pic="Mine_Pic"
        :noRoleId="noRoleId"
        @gPay="_confirmOneBtn"
      />
    </cube-scroll>
    <img
      class="icon_chat animated swing infinite slower"
      @click="_gChat"
      src="https://zfile.bxwh002.cn/img/common/icon_chat.png"
      alt=""
    />
    <div @click="_gChat" class="icon_chat hide" v-if="vChatDetail.IdotMsgShow">
      {{ vChatDetail.IdotNum }}
    </div>
    <!-- 音乐icon -->
    <!-- <i class="iconhome_music"></i> -->
    <img
      v-if="isMusicShow"
      @click="_toggleMusic"
      :class="isMusicCls"
      src="https://zfile.bxwh002.cn/img/common/icon_music.png"
      class="iconhome_music"
      alt=""
    />
    <cube-button
      class="cube_btn_update animated bounceInUp infinite"
      id="cube_btn_update"
      :primary="true"
      ref="cube_btn_outer"
      @click="_confirmOneBtn"
      v-if="!isSelf || !isSelfRoleId"
    >
      <span v-if="!mid" ref="cube_btn_span" :class="cnameBtnCls"
        >创建我的{{ oUserInfo.brand }}微名片</span
      >
      <span
        v-else-if="isSelf && !isSelfRoleId"
        :class="cnameBtnCls"
        ref="cube_btn_span"
        >升级{{ oUserInfo.brand }}微名片 , 更多人脉</span
      >
      <span v-else>查看自己的名片</span>
    </cube-button>
    <audio ref="audio" autoplay loop id="audio" />
    <!-- loading加载 -->
    <div v-if="isLoading" class="loading-container">
      <loading />
    </div>
    <foot v-if="mid" is_tab_act="0" />
    <!-- <foot v-if="mid"/> -->
    <!-- 关注公众号弹窗 -->
    <transition
      class="dialog_transition"
      name="popGzh_transition"
      enter-active-class="animated bounceInLeft animation_time_mid_"
      leave-active-class="animated bounceOutLeft animation_time_mid_"
    >
      <pop-img
        :popMainImg="popMainImg"
        v-if="isPopGzh"
        @closePopMask="_closePopGzh"
      />
    </transition>
    <!-- 试用会员modal -->
    <dia-log
      v-if="isDialogComSelf"
      :btnText="isSelfComBtnText"
      :popContent="popContent"
      :isOneBtn="true"
      :popTitle="popTitleCom"
      :popTitleLen="popTitleLen"
      @confirmOneBtn="_confirmOneBtn"
      @closePop="_closePopComUser"
    />
    <!-- 试用会员 分享之后 isSelf  modal -->
    <dia-log
      v-if="isDialogComSelfShare"
      :btnText="btnText"
      :popContent="popContent"
      :isIconClose="isIconCloseShow"
      @confirmRight="_confirmOneBtn"
      @closeLeft="_closePopShareSelf"
      @closePop="_closePopShareSelf"
    />
    <!-- isnotSelf 看他人分享之后弹窗内容 modal -->
    <dia-log
      v-if="isDialogComnotSelfShare"
      :btnText="btnText"
      :popContent="popContent"
      :isIconClose="isIconCloseShow"
      :cnameBtnRightLen="cnameBtnRightLen"
      @confirmRight="_confirmRightComnotSelfShare"
      @closeLeft="_closePopSharenotSelf"
      @closePop="_closePopSharenotSelf"
    />
  </div>
</template>
<script>
import Split from 'base/split/split'
import HomeSide from 'base/home_side/home_side'
import Swiper from 'base/swiper/swiper'
import TopNews from 'components/home_comp/top_news'
import Hvideo from 'components/home_comp/hvideo'
import Honor from 'components/home_comp/honor'
import InfoUpic from 'components/home_comp/info_upic'
import InfoTel from 'components/home_comp/info_tel'
import Elegant from 'components/home_comp/elegant'
import { getRecommend } from 'request/api/json_list'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import attention from 'common/js/mixins/attention'
import popImg from 'base/pop_img/pop_img'
import diaLog from 'base/dialog/dialog'
import Foot from 'components/footer/footer'
import Loading from 'base/loading/loading'
import base from 'request/api/base'
import { ISIOS, ISNODE_ENV, phoneList, ERR_OK } from 'api/config'
import { popDiaglogAlert, popToast } from 'common/js/cubePop'
import {
  getOtherInfo,
  getAuthInfo,
  getViewCode,
  exposure,
  deleteToken
} from 'common/js/getCommonInfo'
export default {
  mixins: [routings, vuexData, attention],
  data() {
    return {
      Mine: {}, // 个人数据
      Mine_Info: {}, // userInfo
      socialInfo: {}, // 点赞数据
      Mine_News_F: {}, // newsInfo
      Mine_News_L: [], // newsInfo
      Mine_Video: null, // videoInfo
      Mine_Honor: [], // honorInfo
      Mine_Pic: null, // picInfo
      visitorInfo: {}, // 回传点赞等信息
      isMinePicShow: false, // 风采以便获取Mine_Pic
      // isShowYd: false,
      sideYd_T: '',
      sideNews_T: '',
      sideIntro_T: '',
      sideHonor_T: '',
      sideElegant_T: '',
      sideYd_B: 'BRAND SHOPPING',
      sideNews_B: 'BRAND NEWS',
      sideIntro_B: 'BRAND VIDEO',
      sideHonor_B: 'BRAND HONOR',
      sideElegant_B: 'BRAND PICS',
      isDialogComSelf: false, // 试用会员弹窗
      isDialogComSelfShare: false, // 试用会员 share之后 弹窗
      isIconCloseShow: false, // 弹窗关闭按钮不显示
      isDialogComnotSelfShare: false, // 未创建名片者看别人名片
      cnameBtnRightLen: 0, // 未创建名片者右侧按钮
      btnText: {
        // 弹窗底部button显示
        c: '立即开通'
      },
      // 提示开通会员button文字
      isSelfComBtnText: {},
      popContent: '', // 弹窗content
      popTitleCom: '', // 弹窗title
      popTitleLen: 0,
      msg: '查看更多',
      isRotate: true, // 默认music icon 旋转
      isMusicShow: false, // 默认不显示music icon
      ydList: [], // 云店封面
      ydFlag: false, // 云店以便获取swiperList  def
      idotMsg: false,
      isSelf: '', // 判断是否自己
      viewCode: '', // 获取人脉追踪参数
      otherUid: '', // 分享者uid
      otherBid: '', // 分享者bid
      isLoading: false, // 显示loading
      cnameBtnCls: '',
      isOtherHideLogo: false, // 对被分享者隐藏Logo审核状态
      isOtherHideHonor: false, // 对被分享者隐藏荣誉审核状态
      isOtherHideVideo: false // 对被分享者隐藏视频审核状态
      // isPlayMusic: ''
    }
  },
  computed: {
    // 判断是否会员
    isRoleId() {
      return this.oUserInfo.roleId === '2'
    },
    noRoleId() {
      return this.oUserInfo.roleId === '1'
    },
    isSelfRoleId() {
      return this.vUserInfo.roleId === '2'
    },
    // 音乐图标
    isMusicCls() {
      return this.isRotate ? 'music-rotate' : 'music-pause'
    },
    // 日夜主题背景
    isdNightBgImg() {
      return this.oUserInfo.bg_url
    },
    // 日夜主题head
    isdNightHeadImg() {
      return this.oUserInfo.h_url
    },
    // 日夜主题font颜色
    isFontCls() {
      const isColor = this.oUserInfo.color
      return `color:${isColor} !important`
    },
    // 日月主题font
    isFontBrandTipCls() {
      const isColor = this.oUserInfo.color
      if (isColor === '#2B3042') {
        return `color:${isColor}; opacity:0.8 !important`
      } else {
        return ''
      }
    },
    // 日月主题font
    midCls() {
      const Color = this.oUserInfo.color
      const def = '#2b3042'
      const white = '#fff'
      const bgColor = Color === '#fff' ? `${def}` : `${white}`
      if (this.isSelf) {
        return this.oUserInfo.mid
          ? `background-color:${bgColor}`
          : `bottom: 0 !important;background-color:${bgColor}`
      } else {
        if (!this.mid) {
          return `bottom: 0 !important;background-color:${bgColor}`
        } else {
          return `background-color:${bgColor}`
        }
      }
    },
    // 判断是否是diy品牌
    isCuBrand() {
      return this.oUserInfo.is_cu
    },
    // Logo审核中
    isLogoAudit() {
      // const logoStatus = this.oUserInfo.cu_logo_status === '3'
      return this.oUserInfo.cu_logo_status
    },
    // 荣誉审核中
    isHonorAudit() {
      return this.oUserInfo.cu_honor_status
    },
    // 视频审核中
    isVideoAudit() {
      return this.oUserInfo.cu_video_status
    },
    // 判断是否显示云店
    isShowYd() {
      const isShow =
        this.oUserInfo.is_zx === '0' ||
        this.oUserInfo.hide_shop === '1' ||
        this.Mine.hasShop !== '1'
      return !isShow
    },
    // 判断是否显示头条列表
    isShowNews() {
      return this.oUserInfo.hide_news !== '1'
    },
    // 计算地址
    exactAddress() {
      return this.oUserInfo.city || this.oUserInfo.address
        ? `${this.oUserInfo.province}${this.oUserInfo.city}${this.oUserInfo.address}`
        : '尚未完善'
    },
    isVideoSource() {
      let tx = 1
      return tx
        ? `https://v.qq.com/txp/iframe/player.html?vid=${this.htmlData.vcode}`
        : `http://player.youku.com/embed/${this.htmlData.vcode}`
    },
    // 视频展示side
    isVideoSide() {
      // isCuBrand (diy品牌)  isVideoAudit  视频审核状态 (3 审核中) isOtherHideVideo (对被分享者隐藏视频审核状态)
      return !this.isOtherHideVideo
    },
    // 计算是否回传
    transmitText() {
      return this.visitorInfo.send ? '已回传' : '回传名片'
    }
  },
  activated() {
    this.isLoading = true
    // this.removeOUserInfo()
    this.Mine_Info = {}
    this.getAsyncData()
  },
  created() {
    // _this_ = this
  },
  methods: {
    // _video(e) {
    //   console.warn(e)
    // },
    // 清除token
    delToken() {
      deleteToken(this.token, this.vid)
    },
    async getAsyncData() {
      const { uid, bid, view, from_id: fromId } = this.getParams()
      const _uid = uid || this.vid
      const _bid = bid || this.vUserInfo.bid
      this.otherUid = _uid
      this.otherBid = _bid
      // eslint-disable-next-line eqeqeq
      if (this.vid == _uid) {
        this.isSelf = true
        const data = await getAuthInfo(this.token)
        console.log('--为自己的情况下userInfo', data.userInfo)
        this.setOUserInfo(data.userInfo)
      } else {
        this.isSelf = false
        // 获取分享
        const OtherInfoData = await getOtherInfo({
          token: this.token,
          vid: this.vid,
          uid: _uid
        })
        console.log('--为他人的情况下userInfo', OtherInfoData)
        const { bid } = OtherInfoData.userInfo
        this.otherBid = bid
        if (!this.mid) await this._showPopisnotSelfComShare()
      }
      // 曝光量
      await exposure({
        token: this.token,
        vid: this.vid,
        view: view,
        type: 2, // type 1:文章,2:名片
        fromId: fromId || this.vid
      })
      this.viewCode = await getViewCode(this.token)
      await this.newGetHome(_uid)
      await this.getTopNews(_uid, this.otherBid)
      await this.getBanner_(_uid, this.otherBid)
      await this._getPopComp('home', this.isSelf) // 获取公众号弹窗显示
      this.$nextTick(() => {
        this._handleBtnText()
      })
      await this.loadImage()
      // 内部人事显示调试工具
      const isUserControl = phoneList.some(i => i === this.vUserInfo.tel)
      if (isUserControl) this.$storage.set('isUserControl', true)
      // 判断他人查看分享者审核状态时
      this.isOtherShowLogo()
      // let mock = await this.$api.home.getVistor({
      //   token: this.token
      // })
      // console.log('mock', mock)
    },
    // 审核状态
    isAuditText(isType) {
      let logoStatus = ''
      if (isType === 'logo') {
        logoStatus = this.isLogoAudit
      } else if (isType === 'video') {
        logoStatus = this.isVideoAudit
      } else if (isType === 'honor') {
        logoStatus = this.isHonorAudit
      }
      return logoStatus === '1'
        ? ''
        : logoStatus === '2'
          ? '审核失败'
          : logoStatus === '3'
            ? '审核中'
            : ''
    },
    // 审核class
    isAuditCls(isType) {
      let logoStatus = ''
      if (isType === 'logo') {
        logoStatus = this.isLogoAudit
      } else if (isType === 'video') {
        logoStatus = this.isVideoAudit
      } else if (isType === 'honor') {
        logoStatus = this.isHonorAudit
      }
      return logoStatus === '1'
        ? ''
        : logoStatus === '2'
          ? 'err'
          : logoStatus === '3'
            ? 'act'
            : ''
    },
    // android加载音乐
    _isMusicLoad() {
      if (!ISIOS) {
        this._getMusicPlay()
      }
    },
    // 判断他人看时 当审核状态为正在进行时或者审核失败 隐藏分享者的审核元素
    isOtherShowLogo() {
      if (!this.isSelf && this.isCuBrand) {
        if (this.isLogoAudit !== '1') {
          this.isOtherHideLogo = true
        }
        if (this.isHonorAudit !== '1') {
          this.isOtherHideHonor = true
        }
        if (this.isVideoAudit !== '1') {
          this.isOtherHideVideo = true
        }
      } else {
        this.isOtherHideLogo = false
        this.isOtherHideHonor = false
        this.isOtherHideVideo = false
      }
    },
    // 获取音乐播放状态
    _getMusicPlay() {
      // const audio = this.$refs.audio
      const audio = document.getElementById('audio')
      if (this.oUserInfo.play === '1') {
        // eslint-disable-next-line eqeqeq
        if (this.oUserInfo.autoplay == '1') {
          this.$nextTick(() => {
            this.isMusicShow = true
            this.isRotate = true
            audio.src = this.oUserInfo.music
            audio.play()
          })
        } else {
          this.isMusicShow = true
          audio.autoplay = false
          this.isRotate = false
        }
      } else {
        this.isMusicShow = false
      }
    },
    // 切换音乐
    _toggleMusic() {
      const audio = this.$refs.audio
      this.isRotate = !this.isRotate
      this.isRotate ? audio.play() : audio.pause()
    },
    // 处理文字
    _handleBtnText() {
      const dialogTitleSpan = this.oUserInfo.brand
      // this.$nextTick(() => {
      let innerHtml = ''
      if (!this.isRoleId) {
        if (!this.mid) {
          innerHtml = `创建我的${dialogTitleSpan}微名片`
        } else {
          innerHtml = `升级${dialogTitleSpan}微名片 , 更多人脉`
        }
        let cubeBtnSpan = this.$refs.cube_btn_span
        // console.log(cubeBtnSpan)
        if (cubeBtnSpan) {
          let cubeBtnOuter = document.getElementById('cube_btn_update')
          const diff = cubeBtnOuter.offsetWidth - cubeBtnSpan.offsetWidth
          if (dialogTitleSpan.length > 4 && diff < 6) {
            let inner = `${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}`
            this.$refs.cube_btn_span.innerHTML = inner
            this.cnameBtnCls = 'cname_title_animate'
          } else {
            this.$refs.cube_btn_span.innerHTML = innerHtml
            this.cnameBtnCls = ''
          }
        }
      }
      // })
    },
    // 跳转到聊天页面
    _gChat() {
      if (this.isSelf) {
        this.setVchatDetail({
          IdotMsgShow: false,
          IdotNum: 0
        })
        this.goNext('/chat')
      } else {
        this.goNext('/chat/room', {
          chatId: this.otherUid
        })
      }
    },
    // 回传名片
    _transmit() {
      console.log(this.oUserInfo.mid)
      // 当已回传成功之后
      if (this.visitorInfo.send) {
        const proEwmObj = {
          _this: this,
          content: '您已经给对方回传过名片了，对方已收到您的名片.',
          maskClosable: true,
          i: 'HandleTransmitConfirm'
        }
        popDiaglogAlert(proEwmObj)
        return false
      }
      if (this.isSelf) {
        const proEwmObj = {
          _this: this,
          content: '不能回传给自己,您可以转发本名片,对方回传名片您可以收到.',
          maskClosable: true,
          i: 'HandleTransmitConfirm'
        }
        popDiaglogAlert(proEwmObj)
      } else if (!this.mid) {
        const proEwmObj = {
          _this: this,
          content: '当前您还未创建名片,请先去创建名片.',
          maskClosable: true,
          i: 'HandleTransmitCreateCard'
        }
        popDiaglogAlert(proEwmObj)
      } else {
        this.sendCard()
      }
    },
    // 拨打电话
    _call() {
      const roleId = this.oUserInfo.roleId
      const tel = this.oUserInfo.show_tel
      if (this.isSelf) {
        if (roleId === '2') {
          this.goTel(tel)
        } else {
          const proEwmObj = {
            _this: this,
            content: '设置此功能需要开通会员服务.',
            maskClosable: true,
            confirmBtnText: '去开通',
            i: 'openMember'
          }
          popDiaglogAlert(proEwmObj)
        }
      } else {
        if (roleId === '1') {
          const proEwmObj = {
            _this: this,
            content:
              '当前用户尚未开通此功能, 您的联系请求已收集, 稍后会通知该用户.',
            maskClosable: true,
            i: ''
          }
          popDiaglogAlert(proEwmObj)
        } else {
          this.goTel(tel)
        }
      }
    },
    // pop确认操作
    popDiaglogAlertConfirm(i) {
      switch (i) {
        case 'HandleTransmitCreateCard': // 回传 未创建用户 mid为null
          this._gCreateCard()
          break
        case 'openMember': // 去开通会员
          this.goNext('/pay')
          break
        default:
          // i === 'HandleTransmitConfirm'
          break
      }
    },
    // 回传名片
    sendCard() {
      var _this = this
      this.$api.home
        .sendCard({
          vid: _this.vid,
          token: _this.token,
          uid: _this.otherUid
        })
        .then(
          res => {
            this.$set(this.visitorInfo, 'send', true)
            const data = res.data.data
            const popToastObj = {
              _this: this,
              txt: data
            }
            popToast(popToastObj)
          },
          err => {
            console.log(err)
          }
        )
    },
    // 个人信息
    newGetHome(uid) {
      var _this = this
      this.$api.home
        .newGetHome({
          vid: _this.vid,
          token: _this.token,
          uid: uid
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            this.isLoading = false
            const data = res.data.data
            // this.isLoaded = true
            this.Mine = data
            this.Mine_Info = data.userInfo
            this.socialInfo = data.socialInfo
            // if (data.videoInfo) this.Mine_Video = data.videoInfo
            this.Mine_Video = data.videoInfo
            if (data.honorInfo) this.Mine_Honor = data.honorInfo
            this.Mine_Pic = data.picInfo
            this.visitorInfo = data.visitorInfo
            this.isMinePicShow = true
            this.getBrandText(data)
            this.setOUserInfo(data.userInfo)
            this._getShareData(data.userInfo)
            this._isMusicLoad()
          }
        })
    },
    // 获取share数据
    _getShareData(data) {
      const title = `${data.name}的${data.brand}微名片请惠存!`
      const desc = `姓名:${data.name}\n公司/品牌:${data.brand}`
      const url = `${location.origin}${location.pathname}`
      // const path = this.$route.path
      const uid = this.otherUid
      const shareUrl = `${url}?uid=${uid}&from_id=${this.vUserInfo.vid}&proid=${uid}&bid=${data.bid}&view=${this.viewCode}`
      this.$wxShare({
        title: title,
        desc: desc,
        imgUrl: data.upic,
        shareUrl: shareUrl,
        article: 'homeShare'
      })
    },
    // 获取品牌banner
    getBanner_(uid, _bid) {
      var _this = this
      this.$api.home
        .getBanner({
          vid: _this.vid,
          token: _this.token,
          uid: uid,
          bid: _bid
        })
        .then(res => {
          const data = res.data.data
          if (data) {
            this.ydList = data.banner
            this.ydFlag = true
          }
        })
    },
    // 获取新闻展示
    getTopNews(uid, _bid) {
      var _this = this
      this.$api.home
        .getTopNews({
          vid: _this.vid,
          token: _this.token,
          uid: uid,
          bid: _bid
        })
        .then(res => {
          const data = res.data.data
          this.Mine_News_F = data[0]
          this.Mine_News_L = data.slice(1, 4)
        })
    },
    // 获取品牌name
    getBrandText(data) {
      const brandText = data.userInfo.brand
      const brandName = data.userInfo.name
      document.title = `${brandName}的${brandText}微名片`
      this.sideYd_T = `${brandText}云店`
      this.sideNews_T = `${brandText}头条`
      this.sideIntro_T = `${brandText}介绍`
      this.sideHonor_T = `${brandText}荣誉`
      this.sideElegant_T = `${brandText}风采`
    },
    // 试用会员 开通会员
    async _confirmOneBtn() {
      this.isDialogComSelfShare = false
      if (this.isSelf) {
        this.goNext('/pay')
      } else {
        if (!this.mid) {
          this._gCreateCard()
        } else {
          await this.goNext('/home', { uid: this.vid }) //, {uid:this.vUser}
          await this.getAsyncData()
        }
      }
    },
    // 试用会员 关闭弹窗
    _closePopComUser() {
      this.isDialogComSelf = false
    },
    // 试用会员 isSelf 分享之后关闭弹窗
    _closePopShareSelf() {
      this.isDialogComSelfShare = false
    },
    // isnotSelf 看他人分享之后关闭弹窗
    _closePopSharenotSelf() {
      this.isDialogComnotSelfShare = false
    },
    //  isnotSelf 看他人分享之后确认按钮
    _confirmRightComnotSelfShare() {
      this.isDialogComnotSelfShare = false
      this._gCreateCard()
    },
    // isnotSelf 未创建名片者 看他人分享之后显示弹窗
    _showPopisnotSelfComShare() {
      var _this = this
      const brand = this.oUserInfo.brand
      this.popContent = `亲，您是${brand}伙伴吗？一键换成你的微名片，让更多客户找到你哦！`
      this.btnText = {
        l: '我不是',
        r: `我是${brand}伙伴`
      }
      this.cnameBtnRightLen = brand.length
      setTimeout(() => {
        _this.isDialogComnotSelfShare = true
      }, 5000)
    },
    // 试用会员 弹窗内容
    _showPopisSelfCom() {
      this.popContent =
        '你现在是试用会员，暂无法正常使用微名片，升级会员之后即可享用人脉等更多惊喜功能。'
      this.popTitleCom = `尊敬的${this.oUserInfo.brand}用户`
      // this.popTitleCom = `尊敬的PlusToken智能狗搬砖用户`
      this.popTitleLen = this.popTitleCom.length
      this.isSelfComBtnText = {
        c: '立即开通'
      }
      this.isDialogComSelf = true
    },
    // 试用会员isself share之后 弹窗内容
    _showPopisSelfHomeShare() {
      // l: '关闭',
      // r: '立即开通'
      this.popContent =
        '亲，分享成功！为使你分享的名片带上你的联系方式,方便顾客联系你,请及时升级会员！'
      this.btnText = {
        l: '关闭',
        r: '立即开通'
      }
      this.isDialogComSelfShare = true
    },
    // 关闭公众号弹窗
    _closePopGzh() {
      this.isPopGzh = false
      if (this.oUserInfo.roleId === '1') {
        setTimeout(() => {
          this._showPopisSelfCom()
        }, 500)
      }
    },
    _gYdMore() {
      if (!this.mid) {
        this._gCreateCard()
      } else {
        this.goNext('/shop', { uid: this.otherUid, bid: this.oUserInfo.bid })
      }
    },
    // 上传logo
    _gUploadLogo() {
      if (
        this.isSelf &&
        this.vUserInfo.is_cu &&
        this.vUserInfo.cu_logo_status !== '3'
      ) {
        this.goNext('/mine/logo_manage')
      }
    },
    _gMine() {
      if (this.mid) {
        this.goNext('/mine')
      } else {
        this._gCreateCard()
      }
    },
    // 获取文章详情
    _gNewsDetail(item) {
      if (!this.mid) {
        this._gCreateCard()
      } else {
        if (ISNODE_ENV === 'development') {
          this.goNext('/news/index', {
            uid: this.otherUid,
            nid: item.id,
            cid: item.cid,
            proid: this.otherUid
          })
        } else {
          location.href = `${base.h5_news}/route/articleDetail?nid=${item.id}&cid=${item.cid}&uid=${this.otherUid}&proid=${this.otherUid}`
        }
      }
    },
    _gNews() {
      if (!this.mid) {
        this._gCreateCard()
      } else {
        if (ISNODE_ENV === 'development') {
          this.goNext('/news/all', { uid: this.otherUid })
        } else {
          location.href = `${base.h5_news}/route/article?uid=${this.otherUid}`
        }
      }
    },
    // 跳转到注册页面
    _gCreateCard() {
      const isCuNameStatus =
        this.oUserInfo.is_cu && this.oUserInfo.cu_name_status !== '1'
      if (isCuNameStatus) {
        this.goNext('/login/create_card', {
          proid: this.otherUid
        })
      } else {
        this.goNext('/login/create_card', {
          proid: this.otherUid,
          bid: this.otherBid
        })
      }
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
        }
      })
    },
    // 获取image完成后加载scroll的refresh
    loadImage() {
      this.isLoadImg = true
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 1000)
    }
  },
  props: {
    swiperSlot: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Split,
    HomeSide,
    Swiper,
    TopNews,
    Hvideo,
    Honor,
    InfoUpic,
    InfoTel,
    Elegant,
    diaLog,
    Foot,
    popImg,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.music-rotate
  animation _rotate_ 2.8s linear infinite
.music_pause
  animation-play-state paused !important
.slider-content
  width 89.3%
  height 130px
  margin 0 auto
  position relative
  z-index 1
  img
    border-radius 8px
body, html
  .ydNewsCls
    position relative
    z-index 2
  .btns
    position relative
    z-index 1
    font-size 12px
    color $color-theme
    btn(200px, 40px, 16px, $color-theme, $color-text, 2px)
    bg_linear()
  .cube-btn
    margin 0 auto
    padding 0
    border 0
  .home
    position fixed
    width 100%
    top 0
    bottom 45px
    // background-color: #2b3042;
    z-index 3
    .home_content
      // height: 100%;
      overflow hidden
    .m_bg
      position absolute
      top 0
      left 0
      width 100%
      height 672px
      z-index 1
      // -webkit-filter: blur(10px)
      // filter: blur(10px)
      img
        width 100%
        height 672px
    .iconhome_music
      position fixed
      top 20px
      right 15.5px
      z-index 3
      width 28px
      height 28px
      // font-size: 34px;
      z-index 5
      color #fff
      // color: #2B3042;
      // transform-origin: 0 0;
      -webkit-transform-origin center center
      transform-origin center center
    .icon_chat
      position fixed
      right 10px
      bottom 20%
      width 35px
      height 35px
      z-index 3
    .split
      width 89.3%
      height 16px
      position relative
      z-index 1
      background-color #fff
    .cube_btn_more
      margin 30px auto 2px
      position relative
      width 140px
      font-size 12px
      // height: 34px;
      line-height 33px
      z-index 1
      bgc(transparent)
      color #ff9834
      bd(#ff9834)
      // border 1px solid #ff9834
      box-sizing border-box
    .cube_btn_update
      width 210px
      position fixed
      bottom 15%
      left 50%
      margin-left -105px
      font-size 14px
      padding 7px 0
      line-height 20px
      // height: 33px;
      z-index 3
      border-radius 5px
      overflow hidden
      // animation:9s bounceInUp  alternate  infinite !important
      animation-duration 9s
      animation-direction alternate
      // two_txt_cut()
      span
        // display: inline-block;
        padding 0 3px
    .loading-container
      position absolute
      z-index 10
      width 100%
      top 50%
      transform translateY(-50%)
    .video_audit
      width 89.3%
      height 221px
      margin 0 auto
      display block
    // video
    .videoIframBox
      margin 0 auto
      width 89.3%
      height 221px
      position relative
      z-index 1
      box-shadow 0px 0px 8px rgba(148, 106, 16, 0.23)
      .videoIframCls
        width 100%
        height 100%
      img
        width 100%
        height 100%
        bd_r(5px)
      .cube-btn
        position absolute
        right 0
        bottom 0
        width auto
        display inline-block
        padding 3px 5px
        font-size 10px
        color #fff
        border-radius 12px
        &.act
          background linear-gradient(90deg, rgba(255, 194, 47, 1) 0%, rgba(255, 157, 34, 1) 100%)
        &.err
          background linear-gradient(-90deg, rgba(215, 55, 40, 1) 0%, rgba(254, 85, 69, 1) 100%)
</style>
