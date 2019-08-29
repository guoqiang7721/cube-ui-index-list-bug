<template>
  <div class="List">
    <div class="nav-scroll-list-wrap" ref="viewport">
      <cube-scroll
        direction="horizontal"
        ref="cubeScroll"
        id="cubeScroll"
        :current="current"
      >
        <ul class="nav-wrapper" ref="tabList">
          <li
            v-for="(item, index) in navList"
            :key="index"
            @click="handle_nav(item)"
            class="nav-item"
            :class="{ 'link-active': isCurrentTab(item.mid) }"
          >
            {{ item.name }}
          </li>
        </ul>
      </cube-scroll>
      <div
        v-if="isRightShow"
        class="right_container"
        :class="{ isRightCls: isRightDef }"
        @click="_toggleRight"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <li
          v-for="item in dataList"
          class="dataListOuter"
          :key="item.id"
          @click="_gArticleDetail(item)"
        >
          <list-base
            v-if="item.is_vido === '0'"
            :class="{ w_animate: !isNumber(item.id) }"
          >
            <div class="m_list_left" slot="left">
              <img
                :imgurl="item.cover"
                src="https://zfile.bxwh002.cn/img/common/cover_rectangle_def.jpg"
                alt=""
              />
            </div>
            <div slot="right" class="m_list_right">
              <p class="title">{{ item.title }}</p>
              <div class="zx">
                <div class="zx_left">
                  <div class="view_text" v-if="isNumber(item.id)">
                    {{ item.catename }}
                  </div>
                  <div class="view_text" v-else>爆客动画</div>
                  <p class="news_time">{{ item.add_time }}</p>
                </div>
                <div class="zx_right">
                  <img
                    src="https://zfile.bxwh002.cn/wmp/images/new_check.png"
                  />
                  <p class="news_name">{{ item.view }}</p>
                </div>
              </div>
            </div>
          </list-base>
          <!-- 音频 -->
          <div class="audioInner" v-else-if="item.vido_type === '3'">
            <img class="cover" v-lazy="item.cover" alt="" />
            <div class="audio_right">
              <p class="title">{{ item.title }}</p>
              <img
                class="audio_move"
                src="https://zfile.bxwh002.cn/img/default/audio_move.gif"
                alt=""
              />
              <ul>
                <li>
                  <i class="iconhome_btn_my"></i>
                  <span>爆客电台</span>
                </li>
                <li>
                  <i class="iconbofangliang"></i>
                  <span>{{ item.view }}</span>
                </li>
                <li>
                  {{ item.add_time }}
                </li>
              </ul>
            </div>
          </div>
          <!-- 视频 -->
          <div
            class="videoInner"
            v-else-if="item.vido_type === '1' || item.vido_type === '2' || item.vido_type === '4'"
          >
            <div class="video_top">
              <img v-lazy="item.cover" alt="" />
            </div>
            <p class="title">{{ item.title }}</p>
            <div class="video_bot">
              <div class="video_bot_l">
                <button>爆客视频</button>
                <span>{{ item.add_time }}</span>
              </div>
              <p class="video_bot_r">
                <i class="iconbofangliang"></i>
                <span>{{ item.view }}</span>
              </p>
            </div>
          </div>
        </li>
        <!-- <div v-if="noDataText" class="noDataCls">-- 暂无更多数据 --</div> -->
      </ul>
      <div v-if="noDataText" class="noDataCls">-- 暂无更多数据 --</div>
    </mescroll-vue>
    <!-- 分类选择 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <news-type
        v-if="isShowType"
        :vUserInfo="vUserInfo"
        :newAllCids="newAllCids"
        :selectMidList="selectMidList"
        :isChildShow="isChildShow"
        @gBrand="_gBrand"
        @confirm="_confirm"
      />
    </transition>
    <!-- loading加载 -->
    <div v-show="isLoading" class="loading-container">
      <loading />
    </div>
    <foot is_tab_act="2" />
    <!-- <foot /> -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated fadeInDown animation_time_mid_"
      leave-active-class="animated fadeOutUp animation_time_mid_"
    >
      <pop-img
        :popMainImg="popMainImg"
        v-if="isPopGzh"
        @closePopMask="_closePopGzh"
      />
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Foot from 'components/footer/footer'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import MescrollMixin from 'common/js/mixins/mescroll'
import ListBase from 'base/m_list_base/m_list_base'
import popImg from 'base/pop_img/pop_img'
import Loading from 'base/loading/loading'
import newsType from 'components/news_comp/news_type'
import attention from 'common/js/mixins/attention'
import base from 'request/api/base'
import { getAuthInfo } from 'common/js/getCommonInfo'
import { ISIOS, ISNODE_ENV } from 'api/config'
const PASE_SIZE = 20
export default {
  mixins: [vuexData, routings, MescrollMixin, attention],
  data() {
    return {
      isLoading: false, // 显示loading
      navList: [], // tab列表
      current: -1,
      mescroll: null,
      mescrollUp: {
        callback: null,
        htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>',
        empty: {
          warpId: 'dataList',
          icon: 'https://zfile.bxwh002.cn/img/common/name_card_icon.png',
          tip: '暂无相关数据~'
        },
        lazyLoad: {
          use: true
        }
      },
      noDataText: false, // 无更多数据text
      dataList: [], // 数据列表
      isRightDef: false, // 右上角默认不选中
      isRightShow: false, // 默认不显示
      cidNum: '', // 类别id
      newAllCids: [], // 所有类别computed
      selectMidList: [], // 选中mid (-1, -2, -3, -4, -5, "44", "45")格式
      isShowType: false, // 默认关注类别不展开
      isChildShow: -1 // 默认子分类不选中
    }
  },
  async created() {
    this.isLoading = true
    this.isShowType = false
    this.isRightDef = false
    await this.getAsyncData()
    this.$refs.cubeScroll.scrollTo(0, 0, 300)
  },
  methods: {
    async getAsyncData() {
      await getAuthInfo(this.token)
      const newCid = await this.newGetCids()
      if (!newCid) await this.getDefaultCids()
      const curr = await this.getTyCids(this.cidNum)
      this.mescrollUp.page.num = 1
      // this.mescroll.scrollTo(0, 300)
      await this.getNewsList(curr)
      this.mescrollUp.callback = this.getNewsList
      const brandName = this.vUserInfo.brand
      document.title = `${brandName}头条`
      this._getPopComp() // 获取弹窗
    },
    // 关闭公众号弹窗
    _closePopGzh() {
      this.isPopGzh = false
    },
    // go文章详情页面
    _gArticleDetail(i) {
      // 是否视频  是 1：, 不是 0， (is_vido)
      if (ISNODE_ENV === 'development') {
        this._isAndroidUrl(i)
      } else {
        this._isDevPhone(i)
      }
    },
    // dev模式下
    _isDevPhone(i) {
      if (ISIOS) {
        this._isIOsUrl(i)
      } else {
        this._isAndroidUrl(i)
      }
    },
    // ios跳转
    _isIOsUrl(i) {
      if (this.isNumber(i.id)) {
        location.href = `${location.origin}/news/index?nid=${i.id}&uid=${this.vid}&cid=${i.cid}`
      } else {
        location.href = `${base.h5_all}/News/index?nid=${i.id}&uid=${this.vid}&cid=${i.cid}`
      }
    },
    // android跳转
    _isAndroidUrl(i) {
      if (this.isNumber(i.id)) {
        this.goNext('/news/index', {
          nid: i.id,
          cid: i.cid,
          uid: this.vid
        })
      } else {
        location.href = `${base.h5_all}/News/index?nid=${i.id}&uid=${this.vid}&cid=${i.cid}`
      }
    },
    // 文章迭代新接口
    // 获取midList (1_-2_-3_-4_-5_44_45)
    newGetCids() {
      var _this = this
      return new Promise(resolve => {
        this.$api.article
          .newGetCids({
            vid: _this.vid,
            token: _this.token
          })
          .then(res => {
            if (this.vUserInfo.mid) {
              let data = res.data.data
              if (data) this.cidNum = data
              resolve(data)
            } else {
              location.href = `${base.h5_url}/login/create_card`
            }
          })
      })
    },
    // 如getCids 接口 返回null 请求getDefaultCids
    getDefaultCids() {
      var _this = this
      return new Promise(resolve => {
        this.$api.article
          .getDefaultCids({
            vid: _this.vid,
            token: _this.token,
            cate_id: _this.vUserInfo.cate_id
          })
          .then(res => {
            let data = res.data.data
            if (data) this.cidNum = data
            resolve(data)
          })
      })
    },
    // 获取tab列表内容
    getTyCids(newCid) {
      var _this = this
      return new Promise(resolve => {
        this.$api.article
          .getTyCids({
            vid: _this.vid,
            token: _this.token,
            cate_id: _this.vUserInfo.cate_id,
            cids: newCid
          })
          .then(res => {
            let data = res.data.data
            this.navList = data
            this.current = data[0].mid
            this.isRightShow = true
            resolve(this.current)
            let selectMidList = []
            let nav = []
            for (let i = 0; i < data.length; i++) {
              if (data[i].enable !== '0') {
                nav.push(data[i])
                selectMidList.push(data[i].mid) // 计算midList列表
              }
            }
            this.navList = nav
            this.navList[1].name = this.vUserInfo.brand
            if (this.vUserInfo.is_cu) {
              this.navList = this.navList.filter(v => v.name !== '行业资讯')
              console.log(this.navList)
              // this.navList.splice(2, 1)
            }
            this.selectMidList = selectMidList
          })
      })
    },
    // 获取所有类别(可选择的类别)
    getAllCids() {
      let _this = this
      this.$api.article
        .getAllCids({
          vid: _this.vid,
          token: _this.token,
          cate_id: _this.vUserInfo.cate_id
        })
        .then(res => {
          let data = res.data.data
          // 切割成一行4条数据
          let AllCids = []
          let i = 0
          let j = 0
          for (i = 0; i < data.length; i++) {
            let a = i % 4
            if (a === 0) {
              AllCids[j] = data.slice(i, i + 4)
              j++
            }
          }
          this.newAllCids = AllCids
          this.isLoading = false
        })
    },
    // 确认选择分类
    async _confirm() {
      this.isLoading = true
      let select_ = this.selectMidList.join('_')
      const errCode = await this.newSetCids(select_)
      if (errCode === 0) {
        this.cidNum = select_
        this.isChildShow = -1
        this.dataList = []
        await this.getTyCids(select_)
        await this.$refs.cubeScroll.refresh()
        await this.$refs.cubeScroll.scrollTo(0, 0, 300)
        await this.mescroll.resetUpScroll()
      }
      this.isLoading = false
      this.isRightDef = false
      this.isShowType = false
    },
    // 重新设置所选择tab
    newSetCids(select_) {
      var _this = this
      return new Promise(resolve => {
        this.$api.article
          .newSetCids({
            vid: _this.vid,
            token: _this.token,
            cids: select_
          })
          .then(res => {
            const errCode = res.data.errCode
            resolve(errCode)
          })
      })
    },
    // 获取列表页面
    getNewsList() {
      var _this = this
      let pageNum = _this.mescrollUp.page.num
      this.noDataText = false
      this.$api.article
        .getNewsList({
          vid: _this.vid,
          bid: _this.bid,
          token: _this.token,
          ccid: _this.current,
          ccids: _this.cidNum,
          cate_id: _this.vUserInfo.cate_id,
          page: pageNum || 1,
          pageSize: PASE_SIZE
        })
        .then(
          res => {
            let arr = res.data.data || []
            if (pageNum === 1) this.dataList = []
            if (arr.length > 0) {
              if (typeof arr[arr.length - 1].bpage !== 'undefined') {
                let Bpage = 0
                Bpage = arr[arr.length - 1].bpage
                delete arr[arr.length - 1]
                arr.length = arr.length - 1
                _this.mescrollUp.page.num += Bpage
              } else {
                if (arr.length < 20) {
                  this.$nextTick(() => {
                    this.mescroll.lockUpScroll(true)
                    this.mescroll.endUpScroll(false)
                    this.noDataText = true
                    this.$nextTick(() => {
                      const dataCls = document.getElementsByClassName(
                        'mescroll-upwarp'
                      )[0]
                      dataCls.style.display = 'none'
                    })
                    // this.mescroll.showNoMore()
                  })
                }
              }
              this.isLoading = false
              this.dataList = this.dataList.concat(arr)
              this.$nextTick(() => {
                this.mescroll.lockUpScroll(false)
                this.mescroll.endSuccess()
              })
            } else {
              this.$nextTick(() => {
                this.mescroll.lockUpScroll(true)
                this.mescroll.endUpScroll(false)
                this.noDataText = true
                this.$nextTick(() => {
                  const dataCls = document.getElementsByClassName(
                    'mescroll-upwarp'
                  )[0]
                  dataCls.style.display = 'none'
                })
                // this.mescroll.showNoMore()
              })
            }
          },
          err => {
            console.log(err, 'err')
            // 联网失败的回调,隐藏下拉刷新的状态
            this.mescroll.endErr()
          }
        )
    },
    // toggle品牌分类
    _toggleRight() {
      this.isRightDef = !this.isRightDef
      this.isShowType = !this.isShowType
      if (!this.isAllCids) {
        this.isLoading = true
        this.isAllCids = true
        this.getAllCids()
      }
    },
    _gBrand() {
      location.href = `${base.h5_url}/brand?scene=article`
    },
    isNumber(str) {
      return !!/^[0-9]+$/.test(str)
    },
    isCurrentTab(index) {
      return index === this.current
    },
    // 切换tab
    handle_nav(i) {
      if (this.current !== i.mid) {
        this.current = i.mid
        this._adjust(i.mid)
        this.dataList = []
        this.isRightDef = false
        if (this.isShowType) this.isShowType = false
        this.mescroll.resetUpScroll()
      }
    },
    _adjust(tabId) {
      const viewportWidth = this.$refs.viewport.clientWidth - 40
      const tabListWidth = this.$refs.tabList.clientWidth
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      const middleTranslate = viewportWidth / 2
      const items = this.$refs.tabList.children
      let width = 0
      this.navList.every((item, index) => {
        if (item.mid === tabId) {
          return false
        }
        width += items[index].clientWidth
        return true
      })
      let translate = middleTranslate - width
      translate = Math.max(minTranslate, Math.min(0, translate))
      this.$refs.cubeScroll.scrollTo(translate, 0, 300)
    }
  },
  components: {
    Foot,
    ListBase,
    popImg,
    Loading,
    newsType
  }
}
</script>
<style lang="stylus" scoped>
.cube-scroll-wrapper {
  text-align: left;
}
</style>
<style lang="stylus"  rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

>>>.empty-tip {
  color: #ff9125;
}

>>>.mescroll-empty {
  padding-top: 60px;

  >>>.empty-icon {
    width: 149px;
    height: 149px;
  }
}

.noDataCls {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 0 auto;
  font-size: 0.32rem;
  color: gray;
  // bottom 45px
}

.loading-container {
  position: absolute;
  width: 100%;
  top: 35%;
  transform: translateY(-50%);
  z-index: 4;
}

.cube-scroll-wrapper {
  line-height: 16px;
  min-height: 45px;
}

.cube-scroll-nav-bar-item {
  border-bottom: 1px solid $color-bd;
  font-size: 14px;
  padding: 15px 25px;
}

.cube-scroll-nav-bar-item_active {
  border-bottom: 1px solid $color-theme;
  color: $color-theme;
}

.w_animate {
  background: linear-gradient(to bottom, #fff5e5, #ffffff);
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    position: absolute;
    left: 18%;
    top: 50%;
    transform: translate(-15px, -15px);
    background: url('https://zfile.bxwh002.cn/Public/default/images/wdh_openbtn.png') no-repeat center center; // zfile.bxwh002.cn/Public/default/images/wdh_openbtn.png) no-repeat center center;
    background-size: cover;
    z-index: 2;
  }

  .view_text {
    background: linear-gradient(to bottom, #ff9e30, #ff231e);
    border: none;
    color: #fff !important;
  }
}

.List {
  // overflow hidden
  .content {
    margin: 0 !important;
    height: 100%;
    display: flex;
    flex-flow: column;

    footer {
      line-height: 0;

      img {
        width: 100%;
      }
    }
  }

  .nav-scroll-list-wrap {
    padding-right: 40px;
    bd_bt(#e6e6e6);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    position: relative;
    background-color: #fff;
    box-sizing: border-box;

    .cube-scroll-content {
      display: inline-block;

      .cube-scroll-list-wrapper, .nav-wrapper {
        display: inline-block;
        white-space: nowrap;
        line-height: 46px;
        box-sizing: border-box;
        flex_row();
        align-items: center;

        .nav-item {
          display: inline-block;
          padding: 0px 15px;
          color: #333;
          font-size: 13px;
        }
      }
    }

    .more-wrapper {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      background-color: #fff;
      opacity: 0.95;

      .more {
        display: inline-block;
        height: 1px;
        width: 20px;
        padding: 5px 0;
        border: 1px solid #000;
        border-right: transparent;
        border-left: transparent;
        background-color: #000;
        background-clip: content-box;
        margin: 11px;
      }
    }
  }

  .content-scroll-wrapper {
    flex: 1;
    position: relative;

    .content-scroll-list-wrap {
      height: 100%;
      transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
      position: absolute;
      top: 0;
      bottom: 0;
      overflow: hidden;
    }
  }

  .mescroll {
    position: fixed;
    top: 53px;
    bottom: 44px;
    height: auto;

    #dataList {
      width: 100%;
    }

    .dataListOuter {
      width: 100%;
      border-bottom: 1px solid #e6e6e6;

      &:last-child {
        border: none;
      }

      // 音频
      .audioInner {
        margin-top: 10px;
        padding: 1.5% 0;
        height: 91px;
        background-image: linear-gradient(bottom, #c1c4df, #848ac0 50%, #848ac0 75%, #c1c4df 90%, #c1c4df 100%);
        flex_row();
        align-items: center;

        .cover {
          margin: 0 5% 0 2%;
          width: 75px;
          height: 75px;
          box-sizing: border-box;
          border-radius: 50%;
        }

        .audio_right {
          flex: 1;
          margin-right: 2.7%;
          font-size: 16px;
          flex_column();

          .title {
            two_txt_cut();
            line-height: 22px;
            letter-spacing: 1px;
          }

          .audio_move {
            width: 256.5px;
            height: 24.5px;
          }

          ul {
            font-size: 11px;
            margin-top: 5px;
            flex_row();
            justify-content: space-between;

            li {
              flex_row();
              align-items: center;

              &:nth-child(2) {
                i {
                  font-size: 8px;
                  margin-top: 1.5px;
                }
              }

              i {
                font-size: 14px;
                margin-right: 3px;
              }
            }
          }
        }
      }

      // 视频
      .videoInner {
        margin-top: 10px;
        padding: 2%;
        font-size: 16px;
        color: #333;
        bgc(#fff);

        .video_top {
          width: 100%;
          height: 200px;
          position: relative;
          box-shadow: 0px 0px 8px rgba(148, 106, 16, 0.23);

          &::before {
            content: '';
            display: block;
            width: 30px;
            height: 30px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: url('https://zfile.bxwh002.cn/Public/default/images/wdh_openbtn.png') no-repeat center center; // zfile.bxwh002.cn/Public/default/images/wdh_openbtn.png) no-repeat center center;
            background-size: cover;
            z-index: 2;
          }

          img {
            width: 100%;
            height: 100%;
            bd_r(5px);
          }
        }

        .title {
          two_txt_cut();
          line-height: 22px;
          letter-spacing: 1px;
          margin: 14px 0 17px 0;
        }

        .video_bot {
          flex_row();
          justify-content: space-between;

          .video_bot_l {
            flex_row();
            align-items: center;
            justify-content: space-between;
            font-size: 11px;

            button {
              height: 18px;
              padding: 0 5px;
              font-size: 11px;
              margin-right: 30px;
              color: #fff;
              background-image: linear-gradient(
                0deg,
                #ff771c 0%,
                #ffcc31 100%
              );
              border-radius: 2px;
            }

            span {
              color: #999;
            }
          }

          .video_bot_r {
            font-size: 11px;
            flex_row();
            align-items: center;
            color: #999;

            i {
              font-size: 9px;
              color: #ffb125;
              margin: -2px 5px 0 0;
            }
          }
        }
      }

      // 文章
      .m_list_outer {
        font-size: 16px;
        color: #252525;
        height: auto;
        padding: 2% 0;
        border-bottom: 1px solid #e6e6e6;
        position: relative;
        z-index: 1;

        &:last-child {
          border: none;
        }

        .m_list_left {
          width: 117px;
          height: 74px;
          margin: 0 5% 0 2%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .m_list_right {
          flex: 1;
          margin-right: 2.7%;

          .title {
            two_txt_cut();
            line-height: 22px;
            letter-spacing: 1px;
          }

          .zx {
            font-size: 11px;
            color: #999;
            margin-top: 15px;
            flex_row();
            align-items: center;
            justify-content: space-between;

            .zx_left {
              flex_row();
              align-items: center;

              .view_text {
                color: #ffa332;
                padding: 2px 2.5px;
                border: 1px solid #ffa332;
                border-radius: 2px;
                float: left;
                margin-right: 5px;
              }
            }

            .zx_right {
              flex_row();
              align-items: center;

              img {
                width: 11px;
                height: 8px;
                margin-right: 3px;
              }
            }
          }
        }
      }
    }
  }
}

// 头部切换按钮
.right_container {
  position: absolute;
  width: 40px;
  // height 46px
  height: 100%;
  background: #fff;
  right: 0;
  top: 0;
  z-index: 1;
  // border-bottom 1px solid #e6e6e6
  box-sizing: border-box;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: url('https://zfile.bxwh002.cn/img/default/news_tab_line.png') no-repeat center center;
    background-size: auto 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  span {
    width: 19px;
    height: 2.5px;
    position: absolute;
    border-radius: 1px;
    background: #b6b6b6;
    margin: auto;
    left: 0;
    right: 0;
    top: 13px;
    transition: 0.3s;

    &:nth-child(2) {
      top: 19px;
    }

    &:nth-child(3) {
      top: 25.5px;
    }
  }
}

.isRightCls {
  span {
    left: 2.5px;

    &:first-child {
      transform: rotateZ(45deg);
      -webkit-transform-origin: left top;
      transform-origin: left top;
    }

    &:nth-child(2) {
      width: 0;
    }

    &:nth-child(3) {
      transform: rotateZ(-45deg);
      -webkit-transform-origin: left bottom;
      transform-origin: left bottom;
    }
  }
}
</style>
