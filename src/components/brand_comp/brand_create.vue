<template>
  <div class="container">
    <header-com title="品牌选择/公司" @back="back" />
    <div class="my_brand">
      <p>我的品牌 (简称)</p>
      <div class="b_inner">
        <cube-button>{{ industyName }}</cube-button>
        <i class="iconguanbi1" @click="_createBrand"></i>
      </div>
    </div>
    <div class="my_brand">
      <p>选择行业<span>*</span></p>
      <div class="b_inner" @click="_chooseBrand">
        <div class="choice">
          <!-- <p>{{ industyChoice.name }}</p> -->
          <p>{{ industyCName }}</p>
          <i class="iconyoujiantou"></i>
        </div>
      </div>
    </div>
    <cube-button class="brand_btn" @click="_handleBrandDone">完成</cube-button>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import HeaderCom from 'base/header/header'
import { popToast } from 'common/js/cubePop'
import { setTimeout } from 'timers'
export default {
  mixins: [routings, vuexData],
  data() {
    return {}
  },
  computed: {
    industyCName() {
      return this.industyChoice.name || '请选择行业'
    }
  },
  activated() {},
  created() {},
  methods: {
    // 创建品牌
    _createBrand() {
      this.goNext('/brand/recreate')
    },
    // 选择品牌(跳转选择行业类别)
    _chooseBrand() {
      this.goNext('/brand/industry')
    },
    // 完成创建品牌
    _handleBrandDone() {
      if (this.industyCName === '请选择行业') {
        const popToastObj = {
          _this: this,
          txt: '请选择行业'
        }
        popToast(popToastObj)
      } else {
        this.createBrand()
      }
    },
    // 创建品牌
    createBrand() {
      var _this = this
      this.$api.brand
        .createBrand({
          token: _this.token,
          cate_id: _this.industyChoice.cate_id,
          name: _this.industyName
        })
        .then(
          res => {
            const data = res.data
            const popToastObj = {
              _this: this,
              txt: data.msg
            }
            popToast(popToastObj)
            if (data.errCode === 0) {
              setTimeout(() => {
                if (!this.vUserInfo.mid) {
                  this.goNext('/login', {
                    newcreateBid: data.data,
                    newcreateName: this.industyName
                  })
                } else {
                  this.goNext('/home', { bid: data.data })
                }
              }, 800)
            }
          },
          err => {
            console.log(err.data, 'err')
          }
        )
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .my_brand
    bgc(#fff)
    padding 15px 14px
    &:nth-child(2)
      margin-top 46px
    &:last-child
      margin-top 10px
    p
      font-size 18px
      font-weight bold
      color #333
      span
        color #FF0000
    .cube-btn
      width auto
      padding 7px 10px
      bgc(#ECEEF4)
      color #333
      border-radius 15px
    .b_inner
      margin-top 15px
      flex_row()
      align-items center
      justify-content space-between
      i
        color #a1a3a8
      .choice
        width 100%
        padding 0 5px
        height 35px
        border 1px solid #999999
        border-radius 5px
        flex_row()
        align-items center
        justify-content space-between
        p
          color #666666
          font-size 16px
        i
          color #ccc
          font-size 14px
  .brand_btn
    width 82%
    margin 50px auto 0
    height 44px
    background linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1))
    border-radius 5px
</style>
