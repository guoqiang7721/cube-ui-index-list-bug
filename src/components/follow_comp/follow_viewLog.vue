<template>
  <div class="log_Box">
    <!-- 访客信息 -->
    <div class="vistor_container">
      <div class="vistor_info">
        <img :src="source.upic" alt="个人头像" />
        <div class="main">
          <div class="name_inner">
            <h5>{{ source.name }}</h5>
            <i class="iconicon_tjzhuanhuan" @click="_copy(source.name)"></i>
          </div>
          <span>{{ source.city }}</span>
        </div>
        <div class="right">
          <p>{{ dataTotal.totalView }}次数</p>
          <span>累计阅读/分享</span>
        </div>
      </div>
      <div class="follow_relation" v-if="is_active">
        <span class="tip"> 通过以下关系链可以找到{{ source.name }} </span>
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
        <div class="get_btn" @click="_getBtn">我知道了</div>
      </div>
      <div class="howFind" v-else>
        <div class="howFindbtn" @click="_find">如何找到{{ source.name }}</div>
      </div>
    </div>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <div class="record" v-for="item in dataList" :key="item.id">
          <p class="title">{{ item.view_time }} 浏览记录</p>
          <div class="container">
            <i class=""></i>
            <div class="item">
              <p class="top">
                {{ item.view_time }}
                <span>浏览了</span>
              </p>
              <p class="center one-txt-cut" v-if="item.view_target == 1">
                {{ item.title }}
              </p>
              <p class="center one-txt-cut" v-if="item.view_target == 2">
                微名片 : {{ item.name }}微名片
              </p>
              <div class="bot">
                <p>
                  共 <span>{{ item.view_total }}</span> 位 阅读/分享者
                </p>
                <i class="icongengduomore12" @click="_readMore(item.id)"></i>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </mescroll-vue>
    <date-picker
      @selectHandle="_selectHandleDate"
      @cancelHandle="_cancelHandleDate"
    >
      <template v-slot:datePicker>
        <div class="date_picker">选择日期</div>
      </template>
    </date-picker>
    <follow-name-copy ref="copyComp" :copyData="copyData" />
  </div>
</template>

<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import MescrollMixin from 'common/js/mixins/mescroll'
import datePicker from 'base/date_picker/date_picker'
import followNameCopy from 'components/follow_comp/follow_name_copy'
export default {
  mixins: [routings, vuexData, MescrollMixin],
  data() {
    return {
      dataTotal: {}, // total 数据
      mescrollUp: {
        callback: this.getViewLog,
        empty: {
          warpId: 'dataList',
          icon: 'https://zfile.bxwh002.cn/img/default/follow_icon_empty.png',
          tip: '暂无相关线索~'
        }
      },
      source: {}, // 目标信息
      is_active: false, // 默认收起
      chainList: [], // 关系链列表
      id: '', // 从前一页面用户id
      dataList: [], // 浏览记录列表
      dateText: '', // 已选择日期
      copyData: '' // 复制的name
    }
  },
  activated() {
    if (this.isGetViewLog) {
      const { id } = this.getParams()
      this.id = id
      this.getViewLog()
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
    // 查看更多
    _readMore(id) {
      this.goNext('/follow/detail', { id: id })
    },
    // 我知道了
    _getBtn() {
      this.is_active = false
    },
    // 如何找到
    _find() {
      this.is_active = true
      this.getChain()
    },
    // 选择日期
    _selectHandleDate(val) {
      this.dateText = val.join('-')
      console.log('val', val)
      console.log('dateText', this.dateText)
      this.getViewLog()
    },
    // 取消选择日期
    _cancelHandleDate() {},
    // 获取人脉条数
    getChain() {
      var _this = this
      this.$api.follow
        .getChain({
          token: _this.token,
          id: _this.id
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
    // 获取人脉条数
    getViewLog() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      this.$api.follow
        .getViewLog({
          token: _this.token,
          id: _this.id,
          page: pageNum,
          date: this.dateText || ''
        })
        .then(
          res => {
            const data = res.data.data
            this.dataTotal = data
            this.source = data.source
            this.isGetViewLog = true
            let arr = data.logs || []
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
    datePicker,
    followNameCopy
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.log_Box
  bgc(#fff)
>>>.mescroll-empty
  bgc(#f5f5f5)
  padding 60px 0
.vistor_container
  padding 16.5px 0
  .vistor_info
    width 100%
    font-size 13px
    color #999
    flex_row()
    align-items center
    justify-content space-between
    img
      width 41px
      height 41px
      border-radius 50%
      margin 0 9px 0 15px
    .main
      flex_column()
      flex 1
      .name_inner
        flex_row()
        align-items center
        margin-top 5px
        h5
          color #333333
          font-size 15px
        .iconicon_tjzhuanhuan
          margin-left 8px
          color #ff9e22
          font-size 15px
      span
        margin-top 5px
    .right
      text-align center
      margin-right 16.5px
      p
        font-size 14px
        color #ffb125
      span
        display inline-block
        margin-top 5px
  .btn
    display block
    margin 10px auto 5px
    width 230px
    height 36px
    line-height 36px
    background-color #ffb125
    border-radius 18px
    font-size 15px
    line-height 24px
    letter-spacing 0px
    color #fff
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
.record
  margin-top 16px
  padding-bottom 20px
  .title
    font-size 15px
    color #333333
    font-family PingFang-SC-Bold
    margin-left 20px
    line-height 20px
  .container
    margin 5px 16px 0 20px
    flex_row()
    .img
      width 13px
      height 13px
      margin-right 11.5px
      .idot
        width 13px
        height 13px
    .item
      border-radius 5px
      background-color #f8f8f8
      font-size 13px
      color #333
      padding 10px 0 10px 10px
      width 90%
      .top
        font-size 12px
        color #999
        span
          color #ffb125
      .center
        margin 10px 10px 10px 0
      .bot
        flex_row()
        align-items center
        justify-content space-between
        font-size 12px
        color #999
        span
          color #ffb125
        .icongengduomore12
          font-size 20px
          margin-right 8px
.date_picker
  btn(100%, 44px, 18px, '', #fff, '')
  position fixed
  bottom 0
  left 0
  z-index 2
  bg_linear()
</style>
