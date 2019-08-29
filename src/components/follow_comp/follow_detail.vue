<template>
  <div class="follow_container">
    <div class="follow_top" @touchmove.prevent>
      <div class="follow_main">
        <div class="follow_brand">
          <span v-if="view_target === '1'">
            {{ source.category }}
          </span>
          <span v-else>
            微名片
          </span>
        </div>
        <div class="follow_readmore" @click="_getDetail">
          查看详情 >
        </div>
      </div>
      <p class="follow_title" v-if="view_target === '1'">
        {{ source.title }}
      </p>
      <p class="follow_title" v-else>{{ vUserInfo.brand }}的微名片</p>
    </div>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <div class="follow_content" v-for="item in dataList" :key="item.vid">
          <div class="follow_time">
            {{ item.view_time }}
            <span>浏览了</span>
          </div>
          <div class="follow_record_text">
            <div class="read_btn" @click="_getViewLog(item.id)">浏览记录</div>
            <img :src="item.upic" />
            <span>{{ item.name }}</span>
            <i class="iconicon_tjzhuanhuan" @click="_copy(item.name)"></i>
          </div>
          <div class="follow_relation" v-if="is_active == item.id">
            <span class="tip"> 通过以下关系链可以找到{{ item.name }} </span>
            <div class="find_item">
              <img :src="vUserInfo.upic" />
              <span>{{ vUserInfo.name }}</span>
            </div>
            <div class="find_item_r" v-for="item in chainList" :key="item.id">
              <i class="iconrenmai_renmaizhuizong_guanlian"></i>
              <div class="find_item">
                <img :src="item.upic" />
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="get_btn" @click="_getBtn(item)">我知道了</div>
          </div>
          <div class="howFind" v-else>
            <div class="howFindbtn" @click="_find(item)">
              如何找到{{ item.name }}
            </div>
          </div>
        </div>
      </ul>
    </mescroll-vue>
    <follow-name-copy ref="copyComp" :copyData="copyData" />
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import MescrollMixin from 'common/js/mixins/mescroll'
import followNameCopy from 'components/follow_comp/follow_name_copy'
import base from 'request/api/base'
import { ISIOS } from 'api/config'
export default {
  mixins: [routings, vuexData, MescrollMixin],
  data() {
    return {
      dataTotal: {}, // total 数据
      mescrollUp: {
        callback: this.getClue,
        empty: null
      },
      id: '', // 从前一页面用户id
      dataList: [], // 数据列表
      is_active: -1, // 默认选中关系链
      chainList: [], // 关系链列表
      view_target: '', // 目标来源
      source: {}, // 目标信息
      copyData: '' // 复制的name
    }
  },
  activated() {
    this.$nextTick(() => {
      this.mescroll.lockDownScroll(true)
    })
    if (this.isGetClue) {
      const { id } = this.getParams()
      this.id = id
      this.getClue()
    }
  },
  created() {
    const { id } = this.getParams()
    this.id = id
  },
  methods: {
    // 复制昵称
    _copy(wechatText) {
      this.copyData = wechatText
      this.$refs.copyComp.handleCopy(wechatText)
    },
    // 查看详情
    _getDetail() {
      const viewNum = this.view_target
      const nid = this.source.id
      const cid = this.source.cid
      const uid = this.vUserInfo.vid
      if (viewNum === '1') {
        window.location.href = `${base.h5_news}/route/articleDetail?nid=${nid}&cid=${cid}&uid=${uid}`
      } else {
        // this.goNext('/home')
        if (ISIOS) {
          location.href = `${base.h5_url}/home`
        } else {
          this.goNext('/home')
        }
      }
    },
    // 获取浏览记录
    _getViewLog(id) {
      this.goNext('/follow/view_log', { id: id })
    },
    // 我知道了
    _getBtn(i) {
      this.is_active = !i.id
    },
    // 如何找到
    _find(i) {
      this.is_active = i.id
      this.getChain(i)
    },
    // 获取人脉条数
    getChain(i) {
      var _this = this
      this.$api.follow
        .getChain({
          token: _this.token,
          id: i.id
        })
        .then(
          res => {
            const data = res.data.data
            this.chainList = data
          },
          err => {
            console.log(err)
          }
        )
    },
    // 获取人脉追踪详情
    getClue() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      this.$api.follow
        .getClue({
          token: _this.token,
          id: _this.id,
          page: pageNum
        })
        .then(
          res => {
            this.isGetClue = true
            const data = res.data.data
            this.dataTotal = data
            this.view_target = data.view_target
            this.source = data.source
            data.follows_otr.unshift(data.follows_cur)
            let arr = data.follows_otr || []
            if (pageNum === 1) this.dataList = []
            this.dataList = this.dataList.concat(arr)
            this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
          },
          err => {
            this.mescroll.endErr()
            console.log(err)
          }
        )
    }
  },
  components: {
    followNameCopy
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.follow_container
  position fixed
  top 0
  bottom 0
  left 0
  right 0
.mescroll
  position fixed
  top 105px
  bottom 0px
  height auto
.follow_top
  width 100%
  position fixed
  top 0
  left 0
  padding 12.5px 0
  background #fff
  height 80px
  z-index 2
  box-shadow 0px 2px 8px 0px rgba(148, 106, 16, 0.23)
  .follow_main
    margin 0 3%
    height 30px
    flex_row()
    align-items center
    justify-content space-between
    .follow_brand
      width 80px
      height 25px
      line-height 25px
      background #ffe6b9
      text-align center
      border-radius 12.5px
      border 1px solid #ff8110
      font-size 15px
      color #ff871c
    .follow_readmore
      line-height 25px
      color #999999
      float right
      font-size 14px
  .follow_title
    font-size 16px
    margin 8px 3% 0
    color #333
    line-height 22px
.follow_content
  margin-top 12.5px
  .follow_time
    font-size 14px
    line-height 40px
    color #999
    padding 0 3%
    background #fff
    span
      color #ffb125
      margin-left 10px
  .follow_record_text
    background #f8f8f8
    padding 15px 3%
    img
      display inline-block
      width 40px
      height 40px
      margin-right 10px
      vertical-align top
      border-radius 40px
    span
      display inline-block
      font-size 15px
      color #333
      line-height 40px
    .iconicon_tjzhuanhuan
      margin-left 8px
      color #ff9e22
      font-size 15px
    .read_btn
      width 80px
      float right
      line-height 27px
      border-radius 13.5px
      font-size 15px
      border 1px solid #ff9125
      color #ff9125
      margin-top 6px
      text-align center
  .follow_relation
    background #fff
    padding 10px 3% 15px 3%
    .tip
      display block
      text-align center
      font-size 13px
      color #999
      line-height 2
      margin-bottom 15px
    .find_item_r
      display inline-block
      vertical-align top
    .find_item
      display inline-block
      width 40px
      vertical-align top
      img
        display block
        width 35px
        height 35px
        margin 0 auto
        border-radius 50%
      span
        display block
        text-align center
        font-size 12px
        color #999
        one_txt_cut()
        line-height 2
    .iconrenmai_renmaizhuizong_guanlian
      display inline-block
      font-size 26px
      height 25px
      margin-top 5px
      color #ff9834
    .get_btn
      width 230px
      line-height 35px
      border-radius 17.5px
      text-align center
      color #fff
      font-size 15px
      background #ffb125
      margin 25px auto 0 auto
  .howFind
    background #fff
    padding 15px 0
    .howFindbtn
      width 230px
      line-height 38px
      text-align center
      background #ffb125
      border-radius 19px
      color #fff
      font-size 15px
      margin 0 auto
</style>
