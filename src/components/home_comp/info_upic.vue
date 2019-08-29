<template>
  <section>
    <div class="m-header" :style="isHeaderStyle">
      <!-- v-lazy="isLogoPic"  -->
      <img
        :src="isLogoPic"
        class="m-header-brand"
        alt="品牌logo"
        @click="gUploadLogo"
      />
      <div class="logo_audit" v-if="isAuditShowLogo" @click="gUploadLogo">
        <cube-button class="btn" :class="isAuditCls">{{
          isAuditText
        }}</cube-button>
      </div>
      <!-- v-lazy="Mine_Info.upic" -->
      <img
        :src="Mine_Info.upic"
        class="m-info-upic"
        alt="个人头像"
        @click="gMine"
      />
      <div
        class="m-info-bg"
        v-if="Mine_Info.show_icon === '1'"
        @click="gMine"
      ></div>
      <!-- 收藏点赞等 -->
      <ul class="iconList">
        <li>
          <p :style="isPvCls">
            <i class="iconchakan"></i>
            <span>{{ socialInfo.pv }}</span>
          </p>
          <span>人气</span>
        </li>
        <li @click="_handleLikes">
          <p :style="isLikeCls">
            <i class="iconicon_zanzhuanhuan"></i>
            <span>{{ socialInfo.ups }}</span>
          </p>
          <span>{{ isLikeText }}</span>
        </li>
        <li @click="_handleCollect">
          <p :style="isCollectCls">
            <i class="iconicon_sczhuanhuan"></i>
            <span>{{ socialInfo.likes }}</span>
          </p>
          <span>{{ isCollectText }}</span>
        </li>
      </ul>
    </div>
    <div class="m-info-intro">
      <p>{{ Mine_Info.name }}</p>
      <button v-if="Mine_Info.title">{{ Mine_Info.title }}</button>
      <div class="m-info-sign" v-if="Mine_Info.sign">
        <i class="iconhome_icon_shqianmin"></i>
        <p>{{ Mine_Info.sign }}</p>
      </div>
    </div>
  </section>
</template>
<script>
import vuexData from 'common/js/mixins/vuex_data'
import { popToast } from 'common/js/cubePop'
const gUploadLogo = 'gUploadLogo'
export default {
  mixins: [vuexData],
  data() {
    return {
      // isHeaderStyle: ''
    }
  },
  computed: {
    isAuditShowLogo() {
      if (this.isSelf) {
        const status = this.isLogoAudit === '2' || this.isLogoAudit === '3'
        return status && this.isCuBrand
      } else {
        return false
      }
    },
    // logo显示
    isLogoPic() {
      if (this.isOtherHideLogo) {
        return 'https://zfile.bxwh002.cn/img/default/general/def_logo.png'
      } else {
        return this.Mine_Info.logo
      }
    },
    // Ups=1 是点赞 like收藏
    isLikeCls() {
      return this.visitorInfo.ups ? 'color:#FF7031' : 'color:#999'
    },
    isLikeText() {
      return this.visitorInfo.ups ? '已赞' : '点赞'
    },
    isCollectCls() {
      return this.visitorInfo.likes ? 'color:#F75E5E' : 'color:#999'
    },
    isCollectText() {
      return this.visitorInfo.likes ? '已收藏' : '收藏'
    },
    isPvCls() {
      return this.socialInfo.pv > 0 ? 'color:#FF9A40;' : 'color:#999'
    },
    isHeaderStyle() {
      return `background-image:url(${this.isdNightHeadImg})`
    }
  },
  methods: {
    gUploadLogo() {
      this.$emit(gUploadLogo)
    },
    gMine() {
      this.$emit('gMine')
    },
    // 收藏操作
    _handleCollect() {
      if (this.isSelf) {
        const popToastObj = {
          _this: this,
          txt: '亲,无法收藏自己的名片哦!'
        }
        popToast(popToastObj)
        return false
      } else {
        const likes = this.visitorInfo.likes
        // 1 收藏 2取消
        likes ? this.updateLikes(2) : this.updateLikes(1)
      }
    },
    // 点赞操作
    _handleLikes() {
      console.warn(this.isSelf)
      if (this.isSelf) {
        const popToastObj = {
          _this: this,
          txt: '亲,无法点赞自己的名片哦!'
        }
        popToast(popToastObj)
        return false
      } else {
        const ups = this.visitorInfo.ups
        // 1 点赞 2取消
        ups ? this.updateUps(2) : this.updateUps(1)
      }
    },
    // 更新收藏
    updateLikes(isLike) {
      var _this = this
      this.$api.userComp
        .updateLikes({
          token: _this.token,
          vid: _this.vid,
          uid: _this.Mine_Info.vid,
          Likes: isLike
        })
        .then(
          res => {
            const popToastObj = {
              _this: this,
              txt: '收藏成功'
            }
            popToast(popToastObj)
            if (res.data.errCode === 0) {
              const num = Number(this.socialInfo.likes)
              if (isLike === 2) {
                this.$set(this.visitorInfo, 'likes', false)
                this.$set(this.socialInfo, 'likes', num - 1)
              } else {
                this.$set(this.visitorInfo, 'likes', true)
                this.$set(this.socialInfo, 'likes', num + 1)
              }
            }
          },
          err => {
            console.log(err, 'err')
          }
        )
    },
    // 更新点赞
    updateUps(isUps) {
      var _this = this
      this.$api.userComp
        .updateUps({
          token: _this.token,
          vid: _this.vid,
          uid: _this.Mine_Info.vid,
          Ups: isUps
        })
        .then(
          res => {
            const popToastObj = {
              _this: this,
              txt: '点赞成功'
            }
            popToast(popToastObj)
            if (res.data.errCode === 0) {
              const num = Number(this.socialInfo.ups)
              if (isUps === 2) {
                this.$set(this.visitorInfo, 'ups', false)
                this.$set(this.socialInfo, 'ups', num - 1)
              } else {
                this.$set(this.visitorInfo, 'ups', true)
                this.$set(this.socialInfo, 'ups', num + 1)
              }
            }
          },
          err => {
            console.log(err, 'err')
          }
        )
    }
  },
  props: {
    Mine_Info: {
      type: Object,
      default: null
    },
    socialInfo: {
      type: Object,
      default: null
    },
    isdNightHeadImg: {
      type: String
    },
    visitorInfo: {
      type: Object
    },
    isSelf: {
      type: Boolean
    },
    isLogoAudit: {
      type: String
      // default: false
    },
    isCuBrand: {
      type: Boolean,
      default: false
    },
    isOtherHideLogo: {
      type: Boolean
    },
    isAuditText: {
      type: String
    },
    isAuditCls: {
      type: String
    }
  },
  watch: {
    // Mine_Info(val, bef) {
    //   this.isHeaderStyle = `background-image:url(${val.h_url})`
    // }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.m-header
  position relative
  width 89.3%
  z-index 2
  height 264.5px
  margin 25.5px auto 0
  border-radius 3px 3px 0px 0px
  background-size 100% 100%
  .m-header-brand
    width 135px
    height 100px
    position absolute
    left 28px
    top 30px
    border-radius 4px
  .logo_audit
    width 135px
    height 100px
    position absolute
    left 28px
    top 30px
    .btn
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
  .m-info-upic
    width 83.5px
    height 83.5px
    border 2px solid $color-text
    border-radius 50%
    box-sizing border-box
    position absolute
    left 50%
    transform translate(-50%)
    bottom 12px
  .m-info-bg
    width 102.5px
    height 102.5px
    // bg_image('https://zfile.bxwh002.cn/img/default/headBg_1.2.png');
    bg_image('https://zfile.bxwh002.cn/img/common/info_active_border.png')
    position absolute
    left 50%
    margin-left -51.5px
    // transform: translate(-50%);
    bottom 2px
    z-index 3
    animation _rotate_ 2.8s linear infinite
  //
  .iconList
    width 125px
    flex_row()
    // align-items: center;
    justify-content space-around
    color #666
    position absolute
    right 0
    bottom 20px
    li
      padding 0 5px
      flex_column()
      align-items center
      // margin-right: 10px;
      >span
        font-size 10px
        margin-top 5px
      p
        flex_row()
        align-items center
        font-size 12px
        i
          font-size 10px
          margin-right 1px
.m-info-intro
  width 89.3%
  margin -1px auto
  background-color $color-text
  position relative
  z-index 3
  display flex
  flex-direction column
  align-items center
  color #252525
  overflow hidden
  >p
    font-size 19px
    // font-family '全新硬笔行书简' !important
    // text-shadow 2px 2px 2px #ff9834
    // font-style oblique
  button
    height 22.5px
    font-size 12px
    margin 8px 0 12.5px 0
    padding 0 8px
    background-color #ffead5
    border-radius 3px
    color #ff8125
  .m-info-sign
    width 100%
    display flex
    align-items center
    line-height 20px
    .iconhome_icon_shqianmin
      color #ff9834
      font-size 20px
      margin 0 5px 0 7px
    p
      flex 1
      font-size 12px
      color #999
      one_txt_cut()
</style>
