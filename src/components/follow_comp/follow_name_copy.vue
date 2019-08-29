<template>
  <div class="follow_copy_bg" v-if="isPop">
    <div class="pop" @click="_closePop"></div>
    <div class="follow_name_copy">
      <div class="followtit">
        <span>大咖微名片温馨提示</span>
        <img
          src="https://zfile.bxwh002.cn/img/common/follow_close.png"
          alt=""
          @click="_closePop"
        />
      </div>
      <div class="followcont">
        <p class="followtxt">
          <span>{{ copyData }}</span
          >可能是您的微信好友或者微信群好友。
        </p>
        <p class="followconttxt">
          (如果TA不在您的好友列表中，您可以尝试在您分享文章的微信群中查找好友，并添加TA)
        </p>
        <img
          src="https://zfile.bxwh002.cn/img/common/follow_jc.png"
          alt=""
          class="imgtxt"
        />
        <p class="followtxt"><span>第一步：</span>点击按钮复制昵称</p>
        <div class="follow_copy_btn_wrap">
          <div class="follow_copy_btn" @click="copyName(copyData)"></div>
          <img
            src="https://zfile.bxwh002.cn/img/common/follow_ab.png"
            alt=""
            class="imgtxt"
          />
        </div>
        <p class="followtxt"><span>第二步：</span>在微信群中查找</p>
        <img
          src="https://zfile.bxwh002.cn/img/common/follow_cz.png"
          alt=""
          class="imgtxt"
        />
        <div class="followCopyBot" @click="_toggleChecked">
          <p><i :class="isCheckedCls"></i>以后不出现这个弹窗</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { popToast } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      isPop: false, // 是否展示弹窗
      isPopChecked: false // 是否选择不再弹出弹窗
    }
  },
  activated() {},
  computed: {
    isCheckedCls() {
      return this.isPopChecked ? 'active' : ''
    }
  },
  methods: {
    // 是否弹出 为0时弹出
    handleCopy(name) {
      if (this.vUserInfo.is_fzzd === '0') {
        this.isPop = true
      }
      this.copyName(name)
    },
    // 关闭弹窗 //判断是否永久关闭
    _closePop() {
      var _this = this
      this.isPop = false
      if (this.isPopChecked) {
        this.$api.follow
          .copyPopShow({
            token: _this.token
          })
          .then(
            res => {
              const result = res.data
              if (result.errCode === 0) {
                this.setVUserInfo(result.data)
              }
            },
            err => {
              console.log(err)
            }
          )
      }
    },
    // 复制微信
    copyName(name) {
      this.$copyText(name).then(
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
    },
    _toggleChecked() {
      this.isPopChecked = !this.isPopChecked
    }
  },
  props: {
    copyData: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
.follow_copy_bg
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 2
  .pop
    position fixed
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.65)
    z-index 2
  .follow_name_copy
    background #ffffff
    position fixed
    bottom 0
    left 0
    z-index 3
    .followtit
      padding 12px 15px
      border-bottom 1px solid #E6E6E6
      span
        font-size 15px
        color #333333
        line-height 18px
        height 18px
      img
        width 18px
        height 18px
        float right
  .followcont
    padding 15px
    .followtxt
      font-size 18px
      color #333333
      line-height 25px
      span
        color #FF9E22
    .follow_copy_btn_wrap
      position relative
      .follow_copy_btn
        position absolute
        width 40px
        height 40px
        top 20px
        left 40%
    .followconttxt
      font-size 16px
      color #999999
      line-height 24px
      margin 10px 0 0 0
    .imgtxt
      display black
      width 100%
      margin 10px 0
    .followCopyBot
      p
        text-align center
        color #999999
        font-size 15px
        line-height 15px
        i
          display inline-block
          width 15px
          height 15px
          margin-right 10px
          border 1px solid #999999
          border-radius 2px
          vertical-align top
          position relative
          box-sizing border-box
        .active:after
          content ''
          display block
          width 80%
          height 80%
          background #FE9734
          position absolute
          margin auto
          top 0
          left 0
          bottom 0
          right 0
</style>
