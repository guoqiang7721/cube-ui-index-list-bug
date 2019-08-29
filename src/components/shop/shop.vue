<template>
  <div class="List">
    <header-com :title="headerTitle" @back="back" />
    <swiper :data="ydList" v-if="isSwiper">
      <cube-slide-item v-for="item in ydList" :key="item.id">
        <a>
          <img :src="item.pic" alt="item.title" />
        </a>
      </cube-slide-item>
    </swiper>
    <div class="info_bg">
      <img class="info_pic" @click="_gHome" :src="oUserInfo.upic" />
      <div class="info_center">
        <div class="info_center_top">
          <span class="name"
            >{{ oUserInfo.name }}的{{ oUserInfo.brand }}云店</span
          >
          <span class="ser">服务中</span>
        </div>
        <div class="info_center_bot" v-if="oUserInfo.address">
          <!-- <img src='https://zfile.bxwh002.cn/wmp/images/yundian_icon.png'> -->
          <i class="iconpersonal_icon_fujinren"></i>
          <span>{{ oUserInfo.address }}</span>
        </div>
      </div>
    </div>
    <div class="nav-scroll-list-wrap" ref="viewport">
      <cube-scroll direction="horizontal" ref="cubeScroll" :current="current">
        <ul class="nav-wrapper" ref="tabList">
          <li
            v-for="(item, index) in navTxts"
            :key="index"
            @click="handle_nav(item)"
            class="nav-item"
            :class="{ 'link-active': isCurrentTab(item.id) }"
          >
            {{ item.name }}
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="goods-container">
      <div
        class="goods-box"
        @click="_gDetal(item)"
        v-for="item in goods"
        :key="item.id"
      >
        <div class="img-box">
          <img v-lazy="item.cover" />
          <!-- <img v-lazy-container="{ selector: 'img' }" > -->
        </div>
        <div class="goods-title">{{ item.name }}</div>
        <div style="display:flex;">
          <div class="goods-price">¥ {{ item.price }}</div>
        </div>
      </div>
    </div>
    <div class="no-more-goods" v-if="noMoreText">没有更多啦</div>
    <cube-button
      class="cube_btn_update animated slideOutUp infinite slower"
      :primary="true"
      @click="_confirmOneBtn"
      v-if="!isSelf || !isSelfRoleId"
    >
      <span v-if="!mid">创建我的{{ oUserInfo.brand }}微名片</span>
      <span v-else-if="isSelf && !isSelfRoleId"
        >升级{{ oUserInfo.brand }}微名片 , 更多人脉</span
      >
      <span v-else>查看自己的名片</span>
    </cube-button>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderCom from 'base/header/header'
import Swiper from 'base/swiper/swiper'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import { getBanner, getOtherInfo } from 'common/js/getCommonInfo'
import { refreshIsIos } from 'common/js/util'
export default {
  mixins: [vuexData, routings],
  data() {
    return {
      headerTitle: '',
      navTxts: [], // navbar
      current: -1, // navbar active def
      goods: [], // 商品list
      noMoreText: false, // 没有更多 def
      isSwiper: false,
      otherUid: '', // 当前文章拥有者的uid
      otherBid: '', // 当前文章拥有者的bid
      isSelf: '', // 判断是否自己
      ydList: [] // 云店封面
    }
  },
  computed: {
    isRoleId() {
      return this.oUserInfo.roleId === '2'
    },
    isSelfRoleId() {
      return this.vUserInfo.roleId === '2'
    }
  },
  activated() {
    refreshIsIos('reloadShop') // ios刷新
    this.getAsyncData()
  },
  methods: {
    async getAsyncData() {
      const { uid, bid } = this.getParams()
      // const { guid, gvid, gbid } = await getUid(this.token, uid)
      const _uid = uid || this.vid
      // const _bid = bid || gbid
      const _bid = bid || this.vUserInfo.bid
      this.otherBid = _bid
      this.otherUid = _uid
      // eslint-disable-next-line eqeqeq
      if (this.vid == _uid) {
        this.isSelf = true
        this.setOUserInfo(this.vUserInfo)
      } else {
        console.log('---不为自己的情况下')
        this.isSelf = false
        getOtherInfo({
          token: this.token,
          vid: this.vid,
          uid: _uid,
          bid: _bid
        })
      }
      // 获取banner
      const data = await getBanner({
        vid: this.vid,
        token: this.token,
        uid: _uid,
        bid: _bid
      })
      if (data) {
        this.isSwiper = true
        this.ydList = data.banner
        console.warn(this.ydList)
      }
      // 获取tab
      const cid = await this.getShopTab({ uid: _uid, bid: _bid })
      await this.getGoodsDetail({ cid: cid, uid: _uid, bid: _bid })
      await this._getShareData(this.oUserInfo)
      // 设置title
      await this._setTitle()
    },
    // 获取share数据
    _getShareData(data) {
      const title = `${data.name}的${data.brand}云店请惠存!`
      const desc = `姓名:${data.name}\n 公司/品牌:${data.brand}`
      const url = `${location.origin}${location.pathname}`
      const imgUrl =
        'https://zfile.bxwh002.cn/Public/default/images/shopshare.png'
      const uid = this.otherUid
      const shareUrl = `${url}?uid=${uid}&from_id=${uid}&proid=${uid}&bid=${data.bid}`
      this.$wxShare({
        title: title,
        desc: desc,
        imgUrl: imgUrl,
        shareUrl: shareUrl
      })
    },
    // tab所属列表
    getGoodsDetail({ cid, uid, bid } = {}) {
      var _this = this
      this.$api.shop
        .getGoods({
          vid: _this.vid,
          uid: uid,
          bid: bid,
          cid: cid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          this.goods = data
          this.noMoreText = true
        })
    },
    // get Tab栏
    getShopTab({ uid, bid } = {}) {
      var _this = this
      return new Promise(resolve => {
        this.$api.shop
          .getShopTab({
            vid: _this.vid,
            uid: uid,
            bid: bid,
            token: _this.token
          })
          .then(res => {
            const data = res.data.data
            this.navTxts = data.cates
            this.current = data.cates[0].id
            resolve(data.cates[0].id)
          })
      })
    },
    // 试用会员 开通会员
    async _confirmOneBtn() {
      if (this.isSelf) {
        this.goNext('/pay')
      } else {
        if (!this.mid) {
          this._gCreateCard()
        } else {
          await this.goNext('/shop', { uid: this.vid }) //, {uid:this.vUser}
          await this.getAsyncData()
        }
      }
    },
    // 跳转到注册页面
    _gCreateCard() {
      this.goNext('/login/create_card', {
        proid: this.otherUid,
        bid: this.otherBid
      })
    },
    // go详情
    _gDetal(i) {
      this.setGoodsId(i)
      this.goNext('/shop/detail')
    },
    // 设置title
    _setTitle() {
      const vName = this.oUserInfo.name
      const vBrand = this.oUserInfo.brand
      this.headerTitle = `${vBrand}云店`
      document.title = `${vName}的${vBrand}云店`
    },
    isCurrentTab(index) {
      return index === this.current
    },
    handle_nav(i) {
      if (this.current !== i.id) {
        this.current = i.id
        this.goods = []
        this.noMoreText = false
        this._adjust(i.id)
        this.getGoodsDetail({
          cid: i.id,
          uid: this.otherUid,
          bid: this.otherBid
        })
      }
    },
    _adjust(tabId) {
      const viewportWidth = this.$refs.viewport.clientWidth
      const tabListWidth = this.$refs.tabList.clientWidth
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      const middleTranslate = viewportWidth / 2
      const items = this.$refs.tabList.children
      let width = 0
      this.navTxts.every((item, index) => {
        if (item.id === tabId) {
          return false
        }
        width += items[index].clientWidth
        return true
      })
      let translate = middleTranslate - width
      translate = Math.max(minTranslate, Math.min(0, translate))
      this.$refs.cubeScroll.scrollTo(translate, 0, 300)
    },
    _gHome() {
      this.goNext('/home')
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    Swiper
  }
}
</script>

<style lang="stylus"  scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.cube-scroll-wrapper
  text-align left
.cube-scroll-nav-bar-item
  border-bottom 1px solid $color-bd
  font-size 14px
  padding 15px 25px
.cube-scroll-nav-bar-item_active
  border-bottom 1px solid $color-theme
  color $color-theme
.cube_btn_update
  width 200px
  position fixed
  bottom 20%
  left 50%
  margin-left -100px
  font-size 14px
  padding 7px 0
  line-height 20px
  // height: 33px;
  z-index 3
  border-radius 5px
  animation-fill-mode both
  animation-direction alternate
  two_txt_cut()
.List
  .info_bg
    width 100%
    height 90px
    flex_row()
    align-items center
    font-size 16.5px
    color #fff
    bg_image('https://zfile.bxwh002.cn/wmp/images/yundian_mingpian_bg.png')
  .info_pic
    width 64px
    height 64px
    margin-left 3%
    border-radius 50%
    bd_bt(#e6e6e6)
  .info_center
    margin-left 16px
    flex_column()
    width 70%
    .info_center_top
      flex_row()
      align-items center
      .ser
        font-size 12px
        bg_linear()
        padding 2px 6px
        border-radius 4px
        margin-left 8px
    .info_center_bot
      flex_row()
      align-items center
      font-size 12.5px
      color #dedede
      margin-top 7px
      .iconpersonal_icon_fujinren
        color #ff9834
        margin 0 3px 0 -5px
      img
        width 8.5px
        height 12px
        margin-right 8px
  .slider-content
    margin-top 46px
    width 100%
    min-height 130px
    height 130px
    z-index 1
    img
      width 100%
      height 100%
.goods-container
  display flex
  justify-content space-between
  flex-wrap wrap
  box-sizing content-box
  padding 12px
  .goods-box
    width 169.5px
    height 236px
    background-color #fff
    overflow hidden
    margin-bottom 12px
    .img-box
      width 169.5px
      height 169.5px
      overflow hidden
      img
        width 169.5px
        height 169.5px
    .goods-title
      width 140px
      text-overflow ellipsis
      white-space nowrap
      overflow hidden
      font-size 12px
      padding 12px 0 0px 0
      color #000
      margin-left 12px
    .goods-price
      width 140px
      overflow hidden
      font-size 12px
      padding 12px 0
      color #e64340
      margin-left 12px
.no-more-goods
  text-align center
  font-size 12px
  padding-bottom 24px
  color #999
</style>
<style lang="stylus">
.nav-scroll-list-wrap
  transform rotate(0deg)
  position relative
  background-color #fff
  box-sizing border-box
  .cube-scroll-content
    display inline-block
    .nav-wrapper
      display inline-block
      white-space nowrap
      line-height 36px
      padding 0 5px
      border-bottom 1px solid #e6e6e6
      .nav-item
        display inline-block
        padding 3px 15px
        color #333
        font-size 15px
</style>
