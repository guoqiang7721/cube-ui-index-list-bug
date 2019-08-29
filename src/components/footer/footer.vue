<template>
  <!-- <div class="tab">
    <router-link tag="div"  class="tab-item" to="/home">
      <i class="iconhome_btn_mipian"></i>
      <span class="tab-link">名片</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/connection">
      <i class="iconhome_btn_renami"></i>
      <span class="tab-link">人脉</span>
    </router-link>
    <a :href="`${vShareUrl}/news/all`" class="tab-item">
      <i class="iconhome_btn_baowen"></i>
      <span class="tab-link">爆文</span>
    </a>
    <router-link tag="div" class="tab-item" to="/mine">
      <i class="iconhome_btn_my"></i>
      <span class="tab-link">我的</span>
    </router-link>
  </div> -->
  <div class="tab">
    <div
      v-for="(item, index) in tabList"
      :class="{ act: index == is_tab_act }"
      :key="index"
      @click="_gUrl(index)"
      class="tab-item"
    >
      <i :class="item.icon"></i>
      <span class="tab-link">{{ item.text }}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import vuexData from 'common/js/mixins/vuex_data'
import base from 'request/api/base'
import routings from 'common/js/mixins/routings'
import { ISNODE_ENV } from 'api/config'
export default {
  mixins: [vuexData, routings],
  data() {
    return {
      tabList: [
        {
          icon: 'iconhome_btn_mipian',
          text: '名片'
        },
        {
          icon: 'iconhome_btn_renami',
          text: '人脉'
        },
        {
          icon: 'iconhome_btn_baowen',
          text: '爆文'
        },
        {
          icon: 'iconhome_btn_my',
          text: '我的'
        }
      ]
    }
  },
  methods: {
    _gUrl(i) {
      ISNODE_ENV === 'development' ? this._isTestUrl(i) : this._isProUrl(i)
    },
    // test模式
    _isTestUrl(i) {
      switch (i) {
        case 0:
          this.goNext('/home')
          break
        case 1:
          this.goNext('/connection')
          break
        case 2:
          this.goNext('/news/all')
          break
        case 3:
          this.goNext('/mine')
          break
      }
    },
    // pro模式
    _isProUrl(i) {
      switch (i) {
        case 0:
          location.href = `${base.h5_url}/home`
          break
        case 1:
          location.href = `${base.h5_url}/connection`
          break
        case 2:
          // 传送门专用
          const isTransfer = this.$storage.get('isTransfer')
          const isTrans = isTransfer
            ? `${base.h5_url}/news/all`
            : `${base.h5_news}/route/article`
          location.href = isTrans
          break
        case 3:
          location.href = `${base.h5_url}/mine`
          break
      }
    }
  },
  props: {
    is_tab_act: {
      type: String
    }
  }
}
</script>

<style  lang="stylus" scoped>
@import '~common/stylus/variable'
.tab
  width 100%
  position fixed
  bottom 0px
  left 0
  right 0
  z-index 9
  display flex
  height 45px
  background-color #747a91
  color $color-text
  font-size $font-size-small
  .tab-item
    flex 1
    display flex
    flex-direction column
    justify-content center
    align-items center
    color $color-text
    &.act
      color $color-theme
    &.router-link-active
      color $color-theme
    .tab-link
      margin-top 2px
</style>
