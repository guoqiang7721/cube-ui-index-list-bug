<template>
  <div>
    <header-com title="品牌选择/公司" @back="back" />
    <div class="search">
      <i class="iconsousuo"></i>
      <input
        type="text"
        placeholder="填写品牌、公司"
        maxlength="12"
        v-model.trim="searchText"
      />
      <i class="iconguanbi1" v-if="searchText" @click="_close"></i>
    </div>
    <p class="tip">
      设置品牌或者公司简称，每天给你推送你品牌或公司的专属获客文章。
    </p>
    <cube-button class="brand_btn" :class="isFillCls" @click="_handleCreateDone"
      >完成</cube-button
    >
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import HeaderCom from 'base/header/header'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      searchText: '' // 搜索关键字
    }
  },
  computed: {
    isFillCls() {
      return this.searchText ? 'isfill' : 'nofill'
    }
  },
  activated() {
    this.searchText = this.industyName
  },
  created() {},
  methods: {
    _handleCreateDone() {
      if (this.searchText) {
        this.setIndustyName(this.searchText)
        this.goNext('/brand/create')
      }
    },
    _close() {
      this.searchText = ''
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
.search
  width 100%
  padding 0px 15px
  margin-top 46px
  position relative
  height 55px
  box-sizing border-box
  flex_row()
  bgc(#fff)
  align-items center
  input
    width 100%
    height 35px
    padding 10px 40px
    font-size 14px
    background #eceef4
    // padding:0 39px
    border-radius 4px
    box-sizing border-box
  i
    position absolute
    &:first-child
      color #ff9834
      font-size 20px
      left 25px
    &:last-child
      color #999
      font-size 16px
      right 25px
p.tip
  padding 17px 15px
  font-size 14px
  color #999999
  line-height 24px
.brand_btn
  width 82%
  margin 50px auto 0
  height 44px
  border-radius 5px
  &.isfill
    background linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1))
  &.nofill
    background rgba(192, 192, 192, 1)
</style>
