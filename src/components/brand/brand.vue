<template>
  <div class="container">
    <header-com :title="headerTitle" />
    <div class="search">
      <i class="iconsousuo"></i>
      <input
        ref="search_input"
        type="text"
        placeholder="填写品牌、公司简称搜索"
        v-model.trim="search_text"
        maxlength="12"
      />
      <i class="iconguanbi1" v-if="search_text"></i>
    </div>
    <h1 class="titleText">{{ title }}</h1>
    <div class="brand">
      <cube-index-list :data="allList" ref="list">
        <cube-index-list-group
          v-for="(group, index) in allList"
          :key="index"
          :group="group"
          class="list-group"
        >
          <cube-index-list-item
            v-for="(item, index) in group.data"
            :key="index"
            :item="item"
            class="list-group-item"
          >
            <div class="g_left">
              <span class="name">{{ item.name }}</span>
              <cube-button v-if="item.cu_status" :class="isAuditCls(item)">{{
                isAuditText(item)
              }}</cube-button>
            </div>
          </cube-index-list-item>
        </cube-index-list-group>
      </cube-index-list>
    </div>
    <!-- 搜索框 -->
    <brand-search v-if="isSearch" :searchList="searchList" />
    <div v-if="isLoading" class="loading-container">
      <loading />
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import HeaderCom from 'base/header/header'
import brandSearch from 'components/brand_comp/brand_search'
const HOT_NAME = '热门品牌'
const OWN_NAME = '✩ 我的品牌'

export default {
  mixins: [routings, vuexData],
  data() {
    return {
      headerTitle: '品牌选择',
      allList: [],
      title: '',
      scene: '', // from 其他页面 (如是从文章页跳转过来,将不回退,将跳转到编辑资料页面)
      search_text: '', // 搜索关键字
      isSearch: false, //  默认不搜索
      searchList: [], // 搜索列表
      isLoading: false,
      isSelectShow: false, // 搜索样内容显示
      searchNotFoundBName: '' // 暂未搜索到的品牌
    }
  },
  activated() {
    this.$refs.list.refresh()
    this.title = `当前暂未选择品牌`
    this.getBrand()
  },
  methods: {
    // 自创建品牌审核类
    isAuditCls(data) {
      const logoStatus = data.cu_status
      return logoStatus === '1'
        ? 'succ'
        : logoStatus === '2'
          ? 'err'
          : logoStatus === '3'
            ? 'act'
            : ''
    },
    // 自创建品牌审核文字
    isAuditText(data) {
      const logoStatus = data.cu_status
      return logoStatus === '1'
        ? '审核成功'
        : logoStatus === '2'
          ? '审核失败'
          : logoStatus === '3'
            ? '审核中'
            : ''
    },
    // easy -fock  获取品牌
    async getBrand() {
      let res = await this.$api.brand.getBrand()
      const data = res.data.data
      this.allList = data.all
      this.hotList = data.hot
      this.ownList = data.own
      let hot = {
        name: HOT_NAME,
        data: []
      }
      this.allList.map(i => {
        i.name = i.chr
      })
      hot.data.push(...this.hotList)
      if (data.own.length > 0) {
        let own = {
          name: OWN_NAME,
          data: []
        }
        own.data.push(...this.ownList)
        this.allList.unshift(own, hot)
      } else {
        this.allList.unshift(hot)
      }
    }
  },
  components: {
    HeaderCom,
    brandSearch
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
>>>.cube-index-list-nav
  li
    padding 0.07rem 0.426667rem 0 0.426667rem !important
>>>.cube-index-list-nav-item
  font-size 11px !important
.container
  bgc(#fff)
>>>.cube-index-list-title
  color #ff9834
.cube-index-list-item_active
  background #fff
.titleText
  width 100%
  padding 0 15px
  font-size 14px
  color #ff9834
  position fixed
  // top 45px
  top 90px
  line-height 40px
  background-color #fff
.search
  width 100%
  padding 0px 15px
  position fixed
  height 55px
  // padding: 0 10px
  box-sizing border-box
  top 45px
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
.brand
  position fixed
  top 130px
  bottom 0
  width 100%
  .cube-index-list-anchor
    padding 8px 0 8px 20px
    background-color #e6e6e6
  .list-group
    .list-group-item
      display flex
      align-items center
      justify-content space-between
      // padding: 20px 0 20px 5px;
      padding 0px 0 0px 5px
      .avatar
        width 50px
        height 50px
        border-radius 50%
      .g_left
        flex 1
        display flex
        align-items center
        padding 20px 0
        .name
          margin-left 20px
          color #333
          font-size 14px
        .cube-btn
          width auto
          display inline-block
          margin-left 5px
          padding 2px 5px
          font-size 11px
          border-radius 3px
          bgc(#ff)
          &.succ
            border 1px solid #FF9E22
            color #FF9E22
          &.act
            border 1px solid #479A33
            color #479A33
          &.err
            border 1px solid #F03921
            color #F03921
      .iconguanbi
        color #999
        font-size 13px
        margin-right 55px
        padding 15px
        // extend_click();
</style>
