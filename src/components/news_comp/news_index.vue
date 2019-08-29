<template>
  <div class="article_container">
    <div style="height:700px" v-if="isLoading"></div>
    <!--视频,  -->
    <news-video
      v-if="isVideoType"
      :htmlData="htmlData"
      :bgcover="bgcover"
      :audioTopCls="audioTopCls"
    />
    <!-- 音频 -->
    <news-audio
      v-if="isAudioType"
      :htmlData="htmlData"
      :isAudioPlayInfo="isAudioPlayInfo"
      :oUserInfo="oUserInfo"
      :bgcover="bgcover"
      :audioTopCls="audioTopCls"
      @prev="_prev"
      @next="_next"
    />
    <!--音频视频个人信息  -->
    <news-avi-info
      v-if="isAudioType"
      :htmlData="htmlData"
      :oUserInfo="oUserInfo"
      :isSelf="isSelf"
      @gChat="_gChat"
      @gHome="_gHome"
      @changeMine="_changeMine"
    />
    <!--  -->
    <!-- 文章头部header背景 -->
    <news-head
      v-if="isNews"
      :htmlData="htmlData"
      :getCover="getCover"
      :isVoteId="isVoteId"
      :isGeneralCard="isGeneralCard"
    />
    <!-- 个人信息头像 电话等 -->
    <news-infoTop
      v-if="isNews"
      :oUserInfo="oUserInfo"
      :htmlData="htmlData"
      :isSelf="isSelf"
      :isVoteId="isVoteId"
      :isGeneralCard="isGeneralCard"
      @gHome="_gHome"
      @changeMine="_changeMine"
      @call="_call"
      @copyWechat="_copyWechat"
    />
    <news-music
      v-if="htmlData.audio"
      :htmlData="htmlData"
      :oUserInfo="oUserInfo"
    />
    <!-- 文章内容 -->
    <news-main
      v-if="isNews"
      :htmlData="htmlData"
      :articleSty="articleSty"
      :isFoldSty="isFoldSty"
      :isFold="isFold"
      @toggleArticle="_toggleArticle"
    />
    <!--交流群  -->
    <news-group
      :oUserInfo="oUserInfo"
      :isSelf="isSelf"
      :isSelfChatShow="isSelfChatShow"
      :ewmImage="ewmImage"
      :isGeneralEwmImage="isGeneralEwmImage"
      :randomNum="randomNum"
      :isVoteId="isVoteId"
      :isGroupShow="isGroupShow"
      :isGeneralCard="isGeneralCard"
      @handleNoUpNoErImg="_handleNoUpNoErImg"
      @handleCommonHasQcUrl="_handleCommonHasQcUrl"
      @handleNoUpHasGetErImg="_handleNoUpHasGetErImg"
    />
    <div
      v-if="isNews"
      class="like_icon"
      :style="change_like"
      @click="_handleLikeIcon"
    >
      <p v-text="getLikes"></p>
      <!-- <p>{{Ups()}}</p> -->
    </div>
    <!-- 底部名片 -->
    <news-infoFoot
      v-if="!isGeneralCard && !isVoteId"
      :oUserInfo="oUserInfo"
      :wechatText="wechatText"
      :telText="telText"
      :add_sign="add_sign"
      :isFootEwmshow="isFootEwmshow"
      :infoLogo="infoLogo"
      @copyWechat="_copyWechat"
      @call="_call"
      @gHome="_gHome"
      @handleCommonFootLock="_handleCommonFootLock"
      @handleMemFootLock="_handleMemFootLock"
    />
    <!-- 热门分享轮播图 -->
    <news-hotShare
      v-if="swiperList && isNews"
      :swiperList="swiperList"
      :swiperFlag="swiperFlag"
      @gRelated="_gRelated"
    />
    <!-- 微名片底部tip -->
    <tip-bot />
    <!-- 悬浮窗 -->
    <!--  -->
    <news-floating
      :oUserInfo="oUserInfo"
      :isSelf="isSelf"
      :isVoteId="isVoteId"
      :noRoleId="noRoleId"
      :isAttentionGzh="isAttentionGzh"
      :traceNum="traceNum"
      :isGeneral="isGeneral"
      :isGeneralImg="isGeneralImg"
      @openPopGzh="_openPopGzh"
      @openMem="_openMem"
      @gMine="_gMine"
      @gFollow="_gFollow"
      @toggleChannel="_toggleChannel"
      @gChat="_gChat"
      @gVote="_gVote"
    />
    <!-- loading加载 -->
    <div v-if="isLoading" class="loading-container">
      <loading />
    </div>
    <div v-if="isLoadingAudio" class="loading-container">
      <loading />
    </div>
    <!-- 公众号弹窗 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated bounceInUp animation_time_mid"
      leave-active-class="animated bounceOutDown animation_time_mid"
    >
      <pop-img
        :popMainImg="popMainImg"
        v-if="isPopGzh"
        @closePopMask="_closePopGzh"
      />
    </transition>
    <!-- 试用会员 isSelf modal -->
    <dia-log
      v-if="isDialogComSelf && isSelf"
      :btnText="isSelfComBtnText"
      :popContent="popContent"
      :isOneBtn="true"
      :popTitle="popTitleCom"
      :popTitleLen="popTitleLen"
      @confirmOneBtn="_confirmComSelf"
      @closePop="_closePopComSelf"
    />
    <!-- 试用会员 分享之后 isSelf  modal -->
    <dia-log
      v-if="isDialogComSelfShare"
      :btnText="btnText"
      :popContent="popContent"
      :isIconClose="isIconCloseShow"
      @confirmRight="_confirmRightComSelfShare"
      @closeLeft="_closePopShareSelf"
      @closePop="_closePopShareSelf"
    />
    <!-- isnotSelf 看他人分享之后弹窗内容 modal -->
    <dia-log
      v-if="isDialogComnotSelfShare && !isSelf"
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
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import newsHead from 'components/news_comp/news_header'
import newsInfoTop from 'components/news_comp/news_infoTop'
import newsMain from 'components/news_comp/news_main'
import newsGroup from 'components/news_comp/news_group'
import newsInfoFoot from 'components/news_comp/news_infoFoot'
import newsHotShare from 'components/news_comp/news_hotShare'
import newsFloating from 'components/news_comp/news_floating'
import newsVideo from 'components/news_comp/news_video'
import newsAudio from 'components/news_comp/news_audio'
import newsAviInfo from 'components/news_comp/news_avi_info'
import newsMusic from 'components/news_comp/news_music'
import diaLog from 'base/dialog/dialog'
import tipBot from 'base/tip_bot/tip_bot'
import Loading from 'base/loading/loading'
import base from 'request/api/base'
import { getRandomNumber, urlParseDecode } from 'common/js/util'
import popImg from 'base/pop_img/pop_img'
import attention from 'common/js/mixins/attention'
import { popToast, popDiaglogAlert } from 'common/js/cubePop'
import { phoneList, isNorIndustryBrandList } from 'api/config'
import {
  getOtherInfo,
  getViewCode,
  exposure,
  getAuthInfo
} from 'common/js/getCommonInfo'
export default {
  mixins: [routings, vuexData, attention],
  data() {
    return {
      htmlData: {}, // 新闻详情
      isSelf: '', // 判断是否自己
      otherUid: '', // 当前文章拥有者的uid
      otherBid: '', // 当前文章拥有者的bid
      nid: '', // 文章nid,
      cid: '', // 文章cid
      voteId: '', // 投票id
      bgcover: '', // 页面header获取封面
      bgcover_def: 'https://zfile.bxwh002.cn/img/default/news_bgCover.png', // 页面header默认封面
      isFold: true, // 文章默认展示点击全文
      isSelfChatShow: true, // 交流群本人可见
      ewmImage: '', // 群二维码展示
      randomNum: 10, // 随机显示群剩余名额
      swiperFlag: false, //  底部分享默认不显示 && cube-ui swiper机制
      swiperList: [], // 底部热门分享轮播图
      isLike: false, // 默认是未点赞
      isLoading: false, // 显示loading
      isDialogComSelf: false, // 试用会员isSelf 弹窗
      isDialogComSelfShare: false, // 试用会员 share之后 弹窗
      isDialogComnotSelfShare: false, // isnotSelf 看他人分享之后弹窗
      cnameBtnRightLen: 0, // isnotSelf 右侧按钮
      isIconCloseShow: false, // 弹窗关闭按钮不显示
      btnText: {
        // 弹窗底部button显示
        c: '立即开通'
      },
      // 提示开通会员button文字
      isSelfComBtnText: {},
      popContent: '', // 弹窗content
      popTitleCom: '', // 弹窗title
      popTitleLen: 0, // 弹窗title长度
      traceNum: '0', // 人脉追踪显示人数
      isAttentionGzh: true, // 是否未关注公众号
      viewCode: '', // 查看人脉追踪
      isGeneralCard: false, // 头部是否显示内部人士名片
      isGeneralEwmImage: '', // 官方二维码
      isAudioPlayInfo: '',
      isLoaded: true,
      isLoadingAudio: false,
      isAuidoPlay: true,
      isBrandTypeNor: false // 非品牌文章
    }
  },
  computed: {
    // 视频类型
    isVideoType() {
      const isType =
        this.htmlData.vido_type === '1' ||
        this.htmlData.vido_type === '2' ||
        this.htmlData.vido_type === '4'
      return isType
    },
    isNews() {
      return this.htmlData.vido_type === '0'
    },
    // 音频类型
    isAudioType() {
      return this.htmlData.vido_type === '3'
    },
    // 计算点赞数
    getLikes() {
      const ups = this.htmlData.ups
      return ups > 100000 ? '10w+' : ups
    },
    // 获取文章是否展开
    articleSty() {
      return this.isFold
        ? 'height:700px;overflow:hidden'
        : 'height:auto;overflow:visible'
    },
    // 判断是否为内部人士
    isGeneral() {
      return this.oUserInfo.bwkg === '2' || this.oUserInfo.bwkg === '3'
    },
    // 是否内部人士显示图片
    isGeneralImg() {
      // 通用logo
      const generalImg =
        'https://zfile.bxwh002.cn/img/default/news_btn_general.png'
      // 频道logo
      const channelImg =
        'https://zfile.bxwh002.cn/img/default/news_btn_channel.png'
      return this.isGeneralCard ? generalImg : channelImg
    },
    // 判断是否会员
    noRoleId() {
      return this.oUserInfo.roleId === '1'
    },
    // 判断是否显示群二维码
    isGroupShow() {
      if (this.oUserInfo.qr_status === '1') {
        if (this.isSelf) {
          return true
        } else {
          if (this.isGeneralCard) {
            return true
          } else {
            return !!(!this.noRoleId && this.oUserInfo.qc_url)
          }
        }
      } else {
        return false
      }
    },
    // 文章底部二维码展示
    isFootEwmshow() {
      return this.oUserInfo.status === '1'
    },
    // 是否投票
    isVoteId() {
      return !!this.voteId
    },
    // 获取背景
    getCover() {
      return !this.isAttentionGzh && this.isSelf
        ? `background-image:url(${this.bgcover});margin-top:40px`
        : `background-image:url(${this.bgcover})`
    },
    audioTopCls() {
      return !this.isAttentionGzh && this.isSelf ? `margin-top:40px` : ``
    },
    // 文章底部推广二维码text
    add_sign() {
      return this.oUserInfo.ad_sign || '微信二维码'
    },
    // 微信text
    wechatText() {
      let wechat = this.oUserInfo.wechat
        ? this.oUserInfo.wechat
        : this.isSelf
          ? '未设置'
          : '该用户未设置'
      // return this.noRoleId ? '开通后显示' : wechat
      return wechat
    },
    // 电话text
    telText() {
      let tel = this.oUserInfo.show_tel || '未设置'
      // return this.noRoleId ? '开通后显示' : tel
      return tel
    },
    // 切换
    isFoldSty() {
      return this.isFold ? '' : `margin: -4% 4% 0`
    },
    // 点赞背景logo
    change_like() {
      const likeIcon =
        'https://zfile.bxwh002.cn/img/default/news_detail_like.png'
      const likeIconNor =
        'https://zfile.bxwh002.cn/img/default/news_detail_like_nor.png'
      const nid = this.nid
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.isLike = this.$storage.get(`articleId-${nid}`)
      return this.isLike
        ? `background-image:url(${likeIcon});color: #ff5826;`
        : `background-image:url(${likeIconNor});color: #666666`
    },
    // logo展示
    infoLogo() {
      // diy品牌 且审核(不通过或者审核中)的情况下
      let isCuLogoStatus =
        this.oUserInfo.is_cu && this.oUserInfo.cu_logo_status !== '1'
      if (isCuLogoStatus) {
        return 'https://zfile.bxwh002.cn/img/default/general/def_logo.png'
      } else {
        return this.oUserInfo.logo
      }
    }
  },
  activated() {
    this.removeOUserInfo()
    // 获取群名额随机数
    this.randomNum = getRandomNumber(20, 60)
    this.isLoading = true
    this.htmlData = {}
    this.bgcover = ''
    // 加载数据
    this.getAsyncData()
  },
  methods: {
    // 跳转客户追踪页面
    _gFollow() {
      location.href = `${base.h5_url}/follow`
    },
    // 用户尚未上传群营销二维码 且getErImages接口未返回
    _handleNoUpNoErImg() {
      // 跳转到添加二维码
      location.href = `${base.h5_url}/mine/group_ewm`
    },
    // 用户已经上传二维码(非会员)
    _handleCommonHasQcUrl() {
      if (!this.isSelf || !this.vUserInfo.mid) {
        const proEwmObj = {
          _this: this,
          content:
            '当前用户尚未开通此功能，您的联系请求已收集，稍后会通知到该用户!',
          maskClosable: true,
          i: 'HandleCommonHasQcUrl'
        }
        popDiaglogAlert(proEwmObj)
      } else {
        const proEwmObj = {
          _this: this,
          content: '由于您当前尚未开通服务未能展示联系方式!',
          confirmBtnText: '去开通',
          maskClosable: true,
          i: 'OpenMember'
        }
        popDiaglogAlert(proEwmObj)
      }
    },
    // 用户尚未上传群营销二维码 且getErImages接口有返回
    _handleNoUpHasGetErImg() {
      location.href = `${base.h5_url}/mine/group_ewm`
    },
    // 处理点赞
    _handleLikeIcon() {
      let nid = this.nid
      if (this.isLike) return
      this.$storage.set(`articleId-${nid}`, true)
      this.isLike = true
      this.ups()
    },
    // 底部foot非会员名点击开通后
    _handleCommonFootLock() {
      if (!this.vUserInfo.mid || !this.isSelf) {
        const proEwmObj = {
          _this: this,
          content:
            '当前用户尚未开通此功能，您的联系请求已收集，稍后会通知到该用户!',
          maskClosable: true,
          i: 'HandleCommonHasQcUrl'
        }
        popDiaglogAlert(proEwmObj)
      } else {
        const proEwmObj = {
          _this: this,
          content: '由于您当前尚未开通服务未能展示微信二维码!',
          confirmBtnText: '去开通',
          maskClosable: true,
          i: 'OpenMember'
        }
        popDiaglogAlert(proEwmObj)
      }
    },
    // 底部foot会员且未上传推广二维码
    _handleMemFootLock() {
      if (this.vUserInfo.mid && this.isSelf) {
        location.href = `${base.h5_url}/mine/pro_ewm`
      }
    },
    // 试用会员 开通会员
    _confirmComSelf() {
      location.href = `${base.h5_url}/pay`
    },
    // 试用会员 isSelf 关闭弹窗
    _closePopComSelf() {
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
    // 试用会员 isSelf 分享之后 确认弹窗
    _confirmRightComSelfShare() {
      location.href = `${base.h5_url}/pay`
    },
    //  isnotSelf 看他人分享之后确认按钮
    _confirmRightComnotSelfShare() {
      this.isDialogComnotSelfShare = false
      this._gMine()
    },
    // 试用会员isself 弹窗内容
    _showPopisSelfCom() {
      this.popContent =
        '您现在是试用会员，暂无法正常使用带有你联系方式的爆文，升级会员之后即可享用人脉等更多惊喜功能。'
      this.popTitleCom = `尊敬的${this.oUserInfo.brand}用户`
      this.popTitleLen = this.popTitleCom.length
      this.isSelfComBtnText = {
        c: '立即开通'
      }
      this.isDialogComSelf = true
    },
    // 试用会员isself share之后 弹窗内容
    _showPopisSelfNewsShare() {
      this.popContent =
        '亲，分享成功！为使你分享的爆文带上你的联系方式,方便顾客联系你,请及时升级会员！'
      this.btnText = {
        l: '关闭',
        r: '立即开通'
      }
      this.isDialogComSelfShare = true
    },
    // isnotSelf 看他人分享之后显示弹窗
    _showPopisnotSelfComShare() {
      setTimeout(() => {
        var _this = this
        const brand = this.oUserInfo.brand
        // console.warn(this.isBrandTypeNor)
        if (!this.isBrandTypeNor) {
          this.popContent = `亲，你可以点击【一键换成我的】按钮在此文章加上你的名片，让意向客户更容易找到你噢！`
          this.btnText = {
            l: '算了',
            r: `换成我的`
          }
        } else {
          this.popContent = `亲，您是${brand}伙伴吗？此文可带上你的业务名片，让更多客户找到你哦！`
          this.btnText = {
            l: '我不是',
            r: `我是${brand}伙伴`
          }
          this.cnameBtnRightLen = brand.length
        }
        _this.isDialogComnotSelfShare = true
      }, 5000)
    },
    // 切换点击全文
    _toggleArticle() {
      this.isFold = !this.isFold
      if (this.isFold) document.documentElement.scrollTop = 0
      // document.body.scrollTop || window.pageYOffset
      // window.scrollTo(0, 0)
    },
    // 切换频道显示
    _toggleChannel() {
      this.isGeneralCard = !this.isGeneralCard
      this._getShareData(this.htmlData)
    },
    // 复制微信
    _copyWechat() {
      let wechatText = this.oUserInfo.wechat
      if (this.isSelf) {
        if (this.noRoleId) {
          const proEwmObj = {
            _this: this,
            content: '设置此功能需要开通会员服务!',
            confirmBtnText: '去开通',
            maskClosable: true,
            i: 'OpenMember'
          }
          popDiaglogAlert(proEwmObj)
        } else {
          this.$copyText(wechatText).then(
            e => {
              const popToastObj = {
                _this: this,
                txt: '复制成功'
              }
              popToast(popToastObj)
            },
            e => {
              alert('Can not copy')
            }
          )
        }
      } else {
        if (!this.oUserInfo.wechat || this.oUserInfo.roleId === '1') {
          const proEwmObj = {
            _this: this,
            content:
              '当前用户尚未设置此功能，您的联系请求已收集，稍后会通知到该用户!',
            maskClosable: true,
            i: 'HandleCommonHasQcUrl'
          }
          popDiaglogAlert(proEwmObj)
        } else {
          this.$copyText(wechatText).then(
            e => {
              const popToastObj = {
                _this: this,
                txt: '复制成功'
              }
              popToast(popToastObj)
            },
            e => {
              // alert('Can not copy')
            }
          )
        }
      }
    },
    // 拨打电话
    _call() {
      if (this.isSelf) {
        let tel = this.oUserInfo.show_tel
        // if (this.noRoleId || tel.indexOf('*') >= 0) {
        if (this.noRoleId) {
          const proEwmObj = {
            _this: this,
            content: '设置此功能需要开通会员服务.',
            maskClosable: true,
            confirmBtnText: '去开通',
            i: 'OpenMember'
          }
          popDiaglogAlert(proEwmObj)
        } else {
          this.goTel(tel)
        }
      } else {
        let tel = this.oUserInfo.show_tel
        if (tel.indexOf('*') >= 0 || this.noRoleId) {
          const proEwmObj = {
            _this: this,
            content:
              '当前用户尚未开通此功能，您的联系请求已收集，稍后会通知到该用户!',
            maskClosable: true,
            i: 'HandleCommonHasQcUrl'
          }
          popDiaglogAlert(proEwmObj)
        } else {
          this.goTel(tel)
        }
      }
    },
    _openPopGzh() {
      this.isPopGzh = true
    },
    // 关闭公众号弹窗
    _closePopGzh() {
      this.isPopGzh = false
    },
    // 一键换成我的
    async _gMine() {
      if (!this.vUserInfo.mid) {
        const isCuNameStatus =
          this.oUserInfo.is_cu && this.oUserInfo.cu_name_status !== '1'
        // 非品牌非行业
        if (!this.isBrandTypeNor || isCuNameStatus) {
          location.href = `${base.h5_url}/login/create_card?nid=${this.nid}&proid=${this.otherUid}`
        } else {
          location.href = `${base.h5_url}/login/create_card?nid=${this.nid}&bid=${this.otherBid}&proid=${this.otherUid}`
        }
      } else {
        // 当为音频类型时
        if (this.isAudioType) {
          const url = `${location.origin}${location.pathname}`
          const urlParse = urlParseDecode()
          let arr = []
          Object.keys(urlParse).forEach(k => {
            if (k !== 'uid') {
              arr.push(k + '=' + urlParse[k])
            }
          })
          let newArr = arr.join('&')
          // alert(`bef${location.href}\nnewArr\n${newArr}&uid=${this.vid}`)
          location.href = `${url}?${newArr}&uid=${this.vid}`
        } else {
          await this.goNext('/news/index', {
            nid: this.nid,
            cid: this.cid,
            bid: this.vUserInfo.bid,
            uid: this.vid,
            isGeneralCard: false,
            voteId: false
          })
          this.isGeneralCard = false
          this.alreadyGetSubs = false
          this.voteId = false
          this.swiperFlag = false
          this.isAuidoPlay = true
          if (this.$storage.get('reloadNews') === 1) {
            await this.$storage.set('reloadNews', 2)
            await window.location.reload()
          }
          await this.getAsyncData()
        }
      }
    },
    // 聊天按钮
    _gChat() {
      if (this.isSelf) {
        location.href = `${base.h5_url}/chat`
      } else {
        location.href = `${base.h5_url}/chat/room?chatId=${this.otherUid}`
      }
    },
    _openMem() {
      location.href = `${base.h5_url}/pay`
    },
    // 投票
    _gVote() {
      const isZX = this.oUserInfo.is_zx
      // 判断是否直销品牌.如果是 type为0 否则type为4
      if (isZX === '1') {
        location.href = `${base.voteZx}&type=0&nid=${this.nid}&bid=${this.otherBid}`
      } else {
        location.href = `${base.voteBx}&bid=${this.otherBid}`
      }
    },
    // 换成我的
    _changeMine() {
      if (!this.vUserInfo.mid) {
        const isCuNameStatus =
          this.oUserInfo.is_cu && this.oUserInfo.cu_name_status !== '1'
        if (!this.isBrandTypeNor || isCuNameStatus) {
          location.href = `${base.h5_url}/login/create_card?nid=${this.nid}&proid=${this.otherUid}`
        } else {
          location.href = `${base.h5_url}/login/create_card?nid=${this.nid}&bid=${this.otherBid}&proid=${this.otherUid}`
        }
      } else {
        location.href = `${base.h5_url}/home?uid=${this.vid}`
      }
    },
    // 去首页
    _gHome() {
      if (this.viewCode) {
        location.href = `${base.h5_url}/home?uid=${this.otherUid}&from_id=${this.otherUid}&view=${this.viewCode}`
      } else {
        location.href = `${base.h5_url}/home?uid=${this.otherUid}&from_id=${this.otherUid}`
      }
    },
    // pop确认操作
    popDiaglogAlertConfirm(i) {
      if (i === 'HandleCommonHasQcUrl') {
        this.visitor()
      } else if (i === 'OpenMember') {
        location.href = `${base.h5_url}/pay`
      }
    },
    // 媒体相关事件
    // https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events
    // 判断是否有qc_url
    getQcUrlDef(_bid) {
      const qcUrl = this.oUserInfo.qc_url
      this.ewmImage = qcUrl || ''
      this.getErImages(_bid)
    },
    async getAsyncData() {
      const {
        uid,
        bid,
        nid,
        cid,
        isGeneralCard,
        view,
        voteId,
        from_id: fromId
      } = this.getParams()
      const _uid = uid || this.vid
      await getAuthInfo(this.token)
      const _bid = bid || this.vUserInfo.bid
      // 设置个人信息
      await getOtherInfo({
        token: this.token,
        vid: this.vid,
        uid: _uid,
        bid: _bid
      })
      this.isAudioPlayInfo = this.oUserInfo.music
      // 曝光量
      await exposure({
        token: this.token,
        vid: this.vid,
        view: view,
        type: 1, // type 1:文章,2:名片
        nid: nid,
        fromId: fromId || this.vid
      })
      // 获取当前页面的viewCode
      this.viewCode = await getViewCode(this.token)
      await this.getNews(_uid, _bid, nid, cid)
      // 获取文章详情
      this.otherUid = _uid
      this.otherBid = _bid
      this.nid = nid
      this.cid = cid
      this.voteId = !!(voteId && voteId === '1') // 投票跳转
      this.isGeneralCard = !!(isGeneralCard && isGeneralCard === 'true')
      // eslint-disable-next-line eqeqeq
      if (this.vid == _uid) {
        // 是否从投票跳转
        if (this.voteId) {
          this.isSelf = false
          await this._showPopisnotSelfComShare()
          await this.getRealted(_bid)
        } else {
          this.isSelf = true
        }
        // 人脉追踪显示人数
        await this.getViewTotal()
        // 获取公众号弹窗显示
        console.log('为自己的情况下', this.vid, _uid)
        await this._getPopComp('newsIndex')
        // this.isDialogComnotSelfShare = false // 不显示 (亲,您是***伙伴么)
      } else {
        console.log('不为自己的情况下', this.vUserInfo)
        this.isSelf = false
        if (!this.isDialogComSelf) await this._showPopisnotSelfComShare()
        // 显示底部swiper
        await this.getRealted(_bid)
      }
      // 判断是否有qc_url 交流群 用户自己上传
      await this.getQcUrlDef(_bid)
      // 内部人事显示调试工具
      const isUserControl = phoneList.some(i => i === this.vUserInfo.tel)
      if (isUserControl) this.$storage.set('isUserControl', true)
    },
    // 上一首
    _prev() {
      this.isLoadingAudio = true
      this.getNext(0)
    },
    // 下一首
    _next() {
      this.isLoadingAudio = true
      this.getNext(1)
    },
    // 获取上一首下一首
    getNext(isPrev) {
      var _this = this
      this.$api.article
        .getNext({
          token: _this.token,
          nid: _this.nid,
          bid: _this.otherBid,
          brand: _this.oUserInfo.brand,
          cid: _this.cid,
          is_prev: isPrev
        })
        .then(
          res => {
            const { data } = res.data
            if (data[0]) {
              this.nid = data[0].id
              // this.getNews(_this.otherUid, _this.otherBid, this.nid, _this.cid)
              const url = `${location.origin}${location.pathname}`
              const urlParse = urlParseDecode()
              let arr = []
              Object.keys(urlParse).forEach(k => {
                if (k !== 'nid') {
                  arr.push(k + '=' + urlParse[k])
                }
              })
              let newArr = arr.join('&')
              // alert(`bef${location.href}\nnewArr${newArr}&nid=${this.nid}`)
              location.href = `${url}?${newArr}&nid=${this.nid}`
            }
          },
          err => {
            console.log(err)
          }
        )
    },
    // 获取个人信息
    getNews(uid, _bid, nid, cid) {
      var _this = this
      this.$api.article
        .getNews({
          vid: _this.vid,
          uid: uid,
          bid: _bid,
          token: _this.token,
          cid: cid,
          nid: nid
        })
        .then(
          res => {
            this.isLoading = false
            this.isLoadingAudio = false
            let data = res.data.data
            document.title = data.title
            this.htmlData = data
            const cid = this.htmlData.cid
            // 过滤非品牌和非行业的通用文章
            this.isBrandTypeNor = isNorIndustryBrandList.some(i => i === cid)
            this._getShareData(data)
            this.bgcover = data.cover || this.bgcover_def
          },
          err => {
            console.log('err', err)
          }
        )
    },
    _getShareData(data) {
      const title = data.name
      const _descReady =
        '进入一个新的行业，都要从学习开始，对于刚进入的人来说，事业怎么做才能打好基础，迅速进入角色，快速实现成长呢?大咖微名片能够帮你突破局限，创造无限倍增的财富。'
      const desc = data.description || _descReady // 描述
      // const url = `${location.origin}${location.pathname}` // url
      // const url = `${base.h5_news}/route/articleDetail` // url
      const url = 'http://route.nqzy001.cn' // url
      const _imgUrlReady =
        'https://zfile.bxwh002.cn/Public/default/images/share_icon.jpg' // 备选图片
      const uid = this.otherUid
      const isGeneralCard = this.isGeneralCard || false
      const shareUrl = `${url}?uid=${uid}&from_id=${this.vUserInfo.vid}&proid=${uid}&bid=${this.otherBid}&view=${this.viewCode}&cid=${this.cid}&nid=${this.nid}&ubid=${this.otherBid}&isGeneralCard=${isGeneralCard}`
      this.$wxShare({
        title: title,
        desc: desc,
        imgUrl: data.cover || _imgUrlReady,
        shareUrl: shareUrl,
        article: 'newsShare'
      })
    },
    // 人脉追踪显示条数
    getViewTotal() {
      var _this = this
      this.$api.follow
        .getViewTotal({
          token: _this.token
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            this.isGetViewTotal = true
            const traceNum = res.data.data
            this.traceNum = traceNum
          }
        })
    },
    // 获取文章底部swiper
    getRealted(bid) {
      var _this = this
      this.$api.article
        .getRealted({
          vid: _this.vid,
          bid: bid,
          token: _this.token,
          cid: _this.cid,
          nid: _this.nid
        })
        .then(
          res => {
            const data = res.data.data.related
            if (data) {
              this.swiperList = data
              this.swiperFlag = true
            }
          },
          err => {
            console.log('err', err)
          }
        )
    },
    // 获取默认二维码图片
    getErImages(_bid) {
      this.$api.article
        .getErImages({
          bid: _bid
        })
        .then(
          res => {
            const data = res.data.data
            if (data) {
              if (!this.ewmImage) this.ewmImage = data[0].eimages
              // this.ewmImage = data[0].eimages
              this.isGeneralEwmImage = data[0].eimages
            }
          },
          err => {
            console.log('err', err)
          }
        )
    },
    // 跳转热门分享
    async _gRelated(i) {
      await this.goNext('/news/index', {
        nid: i.id,
        cid: i.cid,
        bid: this.otherBid,
        uid: this.otherUid,
        isGeneralCard: false
      })
      this.isGeneralCard = false
      this.alreadyGetSubs = false
      await this.getAsyncData()
    },
    // 通知用户 收集请求
    visitor() {
      var _this = this
      this.$api.article
        .visitor({
          token: _this.token,
          uid: _this.vid,
          name: _this.oUserInfo.name
        })
        .then(
          res => {
            const data = res.data.data
            const popToastObj = {
              _this: this,
              txt: data
            }
            popToast(popToastObj)
          },
          err => {
            console.log('err', err)
          }
        )
    },
    // 文章点赞
    ups() {
      var _this = this
      this.$api.article
        .ups({
          id: _this.nid
        })
        .then(
          res => {
            this.htmlData.ups++
          },
          err => {
            console.log(err.data, 'err')
          }
        )
    }
  },
  components: {
    newsHead,
    newsInfoTop,
    newsMain,
    newsGroup,
    newsInfoFoot,
    newsHotShare,
    newsFloating,
    newsMusic,
    newsVideo,
    newsAudio,
    newsAviInfo,
    tipBot,
    diaLog,
    Loading,
    popImg
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.article_container
  bgc(#fff)
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
  .like_icon
    width 61.5px
    height 61.5px
    margin 15px auto 0
    background-size 100% 100%
    position relative
    p
      width 100%
      position absolute
      bottom 10px // color: #666666;
      font-size 12px
      text-align center
</style>
