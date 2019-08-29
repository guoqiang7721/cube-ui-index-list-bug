<template>
  <div class="pro_container">
    <header-com :title="title" @back="back" />
    <div class="head_bar">
      <div class="line"></div>
      <div class="item" @click="changeTab(0)">
        <!-- <div class="item" v-for="item in tab_list" :key="item.id" @click='changeTab(item.id)'  > -->
        <!-- <span :class="activeId == item.id ? 'link-active' : ''">
          {{item.name}}
        </span> -->
        <span :class="{ 'link-active': tabType == 0 }">待付款</span>
      </div>
      <div class="item" @click="changeTab(1)">
        <span :class="{ 'link-active': tabType == 1 }">已付款</span>
      </div>
    </div>
    <!-- 已创建 -->
    <mescroll-vue
      ref="mescroll0"
      v-show="tabType === 0"
      :down="getMescrollDown(0)"
      :up="getMescrollUp(0)"
      @init="mescrollInit0"
    >
      <ul id="dataList0">
        <list-base v-for="item in tab0.list" :key="item.vid">
          <div class="m_list_left" slot="left">
            <img
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/def_upic.png"
              alt=""
            />
          </div>
          <div slot="main" class="m_list_center">
            <p>{{ item.name }}</p>
            <div class="main_bottom">
              <span>注册时间: {{ item.add_time }}</span>
            </div>
          </div>
          <div slot="right" class="m_list_right">
            <i
              class="iconrenmai_haoyou_icon_dianhua"
              @click="_call(item.tel)"
            ></i>
            <i
              class="iconrenmai_haoyou_icon_suliao"
              @click="_gChat(item.vid)"
            ></i>
          </div>
        </list-base>
      </ul>
    </mescroll-vue>
    <!-- 已开通 -->
    <mescroll-vue
      ref="mescroll1"
      v-show="tabType === 1"
      :down="getMescrollDown(1)"
      :up="getMescrollUp(1)"
      @init="mescrollInit1"
    >
      <ul id="dataList1">
        <list-base v-for="item in tab1.list" :key="item.vid">
          <div class="m_list_left" slot="left">
            <img
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/def_upic.png"
              alt=""
            />
          </div>
          <div slot="main" class="m_list_center">
            <p>{{ item.name }}</p>
            <div class="main_bottom">
              <span>有效期至: {{ item.lock_time }}</span>
            </div>
          </div>
          <div slot="right" class="m_list_right">
            <i
              class="iconrenmai_haoyou_icon_dianhua"
              @click="_call(item.tel)"
            ></i>
            <i
              class="iconrenmai_haoyou_icon_suliao"
              @click="_gChat(item.vid)"
            ></i>
          </div>
        </list-base>
      </ul>
    </mescroll-vue>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
// import MescrollMixin from 'common/js/mixins/mescroll'
import ListBase from 'base/m_list_base/m_list_base'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { popDiaglogAlert } from 'common/js/cubePop'

export default {
  mixins: [routings, vuexData],
  data() {
    return {
      title: '订单中心',
      activeId: 1,
      tab_list: [
        {
          name: '待付款',
          id: '0'
        },
        {
          name: '已付款',
          id: '1'
        }
      ],
      tab0: { mescroll: null, list: [], isListInit: false }, // 已创建
      tab1: { mescroll: null, list: [], isListInit: false }, // 已开通
      tabType: 0 // 菜单类型
    }
  },
  methods: {
    // 拨打电话
    _call(tel) {
      if (tel.indexOf('*') >= 0) {
        const proEwmObj = {
          _this: this,
          content:
            '当前用户尚未开通此功能, 您的联系请求已收集, 稍后会通知该用户.',
          maskClosable: true
        }
        popDiaglogAlert(proEwmObj)
      } else {
        this.goTel(tel)
      }
    },
    // 聊天按钮
    _gChat(vid) {
      this.goNext('/chat/room', {
        chatId: vid
      })
    },
    mescrollInit0(mescroll) {
      mescroll.tabType = 0 // 加入标记,便于在回调中取到对应的list
      this.tab0.mescroll = mescroll
    },
    mescrollInit1(mescroll) {
      mescroll.tabType = 1
      this.tab1.mescroll = mescroll
    },
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown(tabType) {
      let isAuto = tabType === 0 // 第一个mescroll传入true,列表自动加载
      return {
        auto: isAuto,
        callback: this.downCallback
      }
    },
    /* 下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabType === 0) {
        // loadSwiper();
      } else if (mescroll.tabType === 1) {
        // ....
      } else if (mescroll.tabType === 2) {
        // ....
      } else if (mescroll.tabType === 3) {
        // ....
      }
      mescroll.resetUpScroll()
    },
    getMescrollUp(tabType) {
      let emptyWarpId = 'dataList' + tabType
      return {
        auto: false,
        callback: this.upCallback,
        noMoreSize: 4,
        empty: {
          warpId: emptyWarpId,
          icon: 'https://zfile.bxwh002.cn/wmp/images/no_picData@2x.png'
          // tip: tabType === 0 ? '您还没有推广出去呢!' : '尚未有开通的用户哦!',
          // btntext: '去推广',
          // btnClick () {
          //   // alert('点击了按钮,具体逻辑自行实现')
          // }
        },
        toTop: null
      }
    },
    upCallback(page, mescroll) {
      if (mescroll.tabType === 0) {
        // 全部
        this.tab0.isListInit = true // 标记列表已初始化,保证列表只初始化一次
        // 新增修改
        this.tab0.list = []
        this.getTempMembers(page, mescroll)
      } else {
        // 新增修改
        this.tab1.list = []
        this.getOpenedMembers(page, mescroll)
      }
    },
    // 未开通
    getTempMembers(page, mescroll) {
      var _this = this
      this.$api.promote
        .getTempMembers({
          vid: _this.vid,
          token: _this.token,
          page: page.num
        })
        .then(res => {
          let arr = res.data.data || []
          // if (page.num === 1) this.list = []
          if (page.num === 1) this.tab0.isListInit = false
          this.tab0.list = this.tab0.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        })
    },
    // 已开通
    getOpenedMembers(page, mescroll) {
      var _this = this
      this.$api.promote
        .getOpenedMembers({
          vid: _this.vid,
          token: _this.token,
          page: page.num
        })
        .then(res => {
          let arr = res.data.data || []
          // if (page.num === 1) this.dataList = []
          if (page.num === 1) this.tab1.isListInit = false
          this.tab1.list = this.tab1.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        })
    },
    changeTab(type) {
      let curTab = this.getTabData(this.tabType) // 当前列表
      let newTab = this.getTabData(type) // 新转换的列表
      curTab.mescroll.hideTopBtn() // 隐藏当前列表的回到顶部按钮
      this.tabType = type // 切换菜单
      if (!newTab.isListInit) {
        newTab.mescroll.triggerDownScroll() // 加载列表
      } else {
        setTimeout(() => {
          // 检查新转换的列表是否需要显示回到到顶按钮
          var curScrollTop = newTab.mescroll.getScrollTop()
          if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
            newTab.mescroll.showTopBtn()
          } else {
            newTab.mescroll.hideTopBtn()
          }
        }, 30)
      }
    },
    getTabData(tabType) {
      if (tabType == null) tabType = this.tabType
      if (tabType === 0) {
        return this.tab0
      } else if (tabType === 1) {
        return this.tab1
      }
    },
    back() {
      this.goBack()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let curMescroll = vm.$refs['mescroll' + vm.tabType]
      curMescroll && curMescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave(to, from, next) {
    let curMescroll = this.$refs['mescroll' + this.tabType]
    curMescroll && curMescroll.beforeRouteLeave()
    next()
  },
  components: {
    HeaderCom,
    ListBase,
    MescrollVue
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.mescroll {
  position: fixed;
  top: 88px;
  bottom: 0;
  height: auto;
}

>>>.empty-tip {
  color: #ff9125;
  margin: 40px 0 30px 0;
}

>>>.mescroll-empty {
  padding-top: 60px;
}

>>>.empty-icon {
  width: 132px;
  height: 102.5px;
}

>>>.empty-btn {
  font-size: 16px;
  width: 214px;
  height: 22px;
  line-height: 22px;
  border: none;
  color: #fff;
  bg_linear();
}

.m_list_outer {
  height: 70px;
  border-bottom: 1px solid #e6e6e6;

  &:first-child {
    margin-top: 10px;
  }

  &:last-child {
    border: none;
  }

  .m_list_left {
    margin-left: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .m_list_center {
    flex: 1;
    flex_column();
    // justify-content center
    margin: 0 20px 0 10px;

    p {
      color: #252525;
      font-size: 18px;
    }

    .main_bottom {
      flex_row();
      margin-top: 12px;
      align-items: center;

      span {
        font-size: 13px;
        color: #999;
      }
    }
  }

  .m_list_right {
    margin-right: 10px;

    >>>i {
      &:first-child {
        color: #ff9834;
        margin-right: 10px;
      }

      &:last-child {
        color: #80c420;
      }
    }
  }
}

.head_bar {
  width: 100%;
  position: fixed;
  top: 46px;
  z-index: 10;
  flex_row();
  align-items: center;
  height: 44px;
  background-color: #fff;
  color: #666;

  .line {
    height: 60%;
    position: absolute;
    width: 2px;
    background-color: #dbdbdb;
    left: 50%;
    transform: translate(-50%);
  }

  >.item {
    flex: 1;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    box-sizing: border-box;

    span {
      display: inline-block;
      height: 100%;
    }
  }
}
</style>
