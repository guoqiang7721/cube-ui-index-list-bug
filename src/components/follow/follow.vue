<template>
  <div class="follow_container">
    <follow-top :totalCount="totalCount" @gCourse="_gCourse" />
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <list-base v-for="item in dataList" :key="item.vid" :class="blurCls">
          <div class="m_list_left" slot="left">
            <img
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/cover_square_def.jpg"
              alt=""
            />
          </div>
          <div slot="main" class="m_list_center">
            <div class="main_top">
              <div class="name_inner">
                <span class="name">{{ item.name }}</span>
                <i class="iconicon_tjzhuanhuan" @click="_copy(item.name)"></i>
              </div>
              <div class="course_right" @click="_gDetail(item.id)">
                <!-- <img src="https://zfile.bxwh002.cn/img/default/focus_icon_gps.png" alt=""> -->
                <i class="iconrenmai_renmaizhuizong_zhuizong"></i>
                <span>追踪</span>
              </div>
            </div>
            <p class="main_bottom">
              <span v-if="item.view_target === '1'">
                {{ item.category }} : {{ item.title }}
              </span>
              <span v-else> 微名片 : {{ vUserInfo.brand }}的微名片 </span>
            </p>
          </div>
        </list-base>
      </ul>
    </mescroll-vue>
    <follow-bot :isFoot="isFoot" :vUserInfo="vUserInfo" :noRoleId="noRoleId" />
    <follow-name-copy ref="copyComp" :copyData="copyData" />
    <div class="no_roleId" v-show="noRoleId">
      <p>
        您当前共有<b>{{ message }}次</b>跟进机会<br />有多少机会可以错过？
      </p>
      <div class="open_mem" @click="_gPay">开通会员立即跟进</div>
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import followTop from 'components/follow_comp/follow_index_top'
import followBot from 'components/follow_comp/follow_index_bot'
import followNameCopy from 'components/follow_comp/follow_name_copy'
import ListBase from 'base/m_list_base/m_list_base'
import MescrollMixin from 'common/js/mixins/mescroll'
export default {
  mixins: [routings, vuexData, MescrollMixin],
  data() {
    return {
      totalCount: {}, // 查看总数
      mescrollUp: {
        callback: this.getList,
        empty: {
          warpId: 'dataList',
          icon: 'https://zfile.bxwh002.cn/img/default/follow_icon_empty.png',
          tip: '暂无客户线索~'
        }
      },
      dataList: [],
      message: '', // 试用会员跟进机会
      isFoot: true, // 默认显示底部分享
      copyData: '' // 复制的name
    }
  },
  computed: {
    // 判断是否正式会员
    noRoleId() {
      return this.vUserInfo.roleId === '1'
    },
    // 试用会员高斯模糊效果
    blurCls() {
      return this.noRoleId ? 'blur' : ''
    }
  },
  activated() {
    this.$nextTick(() => {
      this.mescroll.lockDownScroll(true)
    })
    if (this.isGetList) this.getList()
    this.getAnalysis()
  },
  methods: {
    // 复制昵称
    _copy(wechatText) {
      this.copyData = wechatText
      this.$refs.copyComp.handleCopy(wechatText)
    },
    _gPay() {
      this.goNext('/pay')
    },
    // 人脉追踪详情
    _gDetail(id) {
      this.goNext('/follow/detail', { id: id })
    },
    // 追踪教程
    _gCourse() {
      this.goNext('/follow/course')
    },
    // 获取人脉条数
    getAnalysis() {
      var _this = this
      this.$api.follow
        .getAnalysis({
          token: _this.token
        })
        .then(
          res => {
            if (res) {
              const data = res.data.data
              this.totalCount = data
            }
          },
          err => {
            console.log(err)
          }
        )
    },
    // 人脉追踪列表
    getList() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      this.$api.follow
        .getList({
          token: _this.token,
          page: pageNum
        })
        .then(
          res => {
            this.isGetList = true
            this.message = res.data.message
            let arr = res.data.data || []
            if (pageNum === 1) this.dataList = []
            this.dataList = this.dataList.concat(arr)
            this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
          },
          err => {
            console.log(err, 'err')
            this.mescroll.endErr()
          }
        )
    }
  },
  components: {
    followTop,
    followBot,
    followNameCopy,
    ListBase
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
  top 70px
  bottom 56px
  height auto
  .m_list_outer
    height 70px
    border-bottom 1px solid #e6e6e6
    &:last-child
      border none
    .m_list_left
      margin 0 10px
      img
        width 100%
        height 100%
        border-radius 50%
    .m_list_center
      flex 1
      margin-right 10px
      .main_top
        flex_row()
        align-items center
        justify-content space-between
        .name_inner
          flex_row()
          align-items center
          .name
            font-size 16px
          .iconicon_tjzhuanhuan
            margin-left 8px
            color #ff9e22
            font-size 15px
        .course_right
          width 50px
          height 25px
          padding 0px 5px 0 2px
          bd_r(12px)
          bgc(#ffac5c)
          flex_row()
          align-items center
          color #fff
          font-size 13px
          i
            font-size 22px
            color #fff
      .main_bottom
        width 280px
        line-height 20px
        margin-top 5px
        color #999
        one_txt_cut()
.blur
  -webkit-filter blur(5px)
  filter blur(5px)
.no_roleId
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  background rgba(250, 250, 250, 0.8)
  padding-top 180px
  text-align center
  p
    font-size 19px
    color #333333
    line-height 37.5px
    b
      font-size 26px
      color #ff9625
      font-weight bold
  .open_mem
    width 210px
    font-size 19px
    line-height 45px
    color #ffb125
    border 2px solid #ffb125
    margin 22.5px auto 0 auto
    border-radius 22.5px
</style>
