<template>
  <div class="search_container">
    <header-com :title="headerTitle" @back="back" />
    <div class="search">
      <div class="search_item">
        <!-- <form enctype="text/plain" @submit="_submitForm">
            <input type="text" v-model="search_text" placeholder='请输入姓名、品牌等信息'>
          </form> -->
        <form action="javascript:return true">
          <input
            type="search"
            placeholder="请输入姓名、品牌等信息"
            @keyup.13="search"
            v-model="search_text"
          />
        </form>
        <div class="search_right" @click="search">
          <i class="iconsousuo"></i>
        </div>
      </div>
    </div>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <!-- <mescroll-vue ref="mescroll"  @init="mescrollInit"> -->
      <ul id="dataList">
        <list-base v-for="(item, index) in dataList" :key="item.vid">
          <div class="m_list_left" slot="left" @click="_gHome(item)">
            <img
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/def_upic.png"
              alt=""
            />
          </div>
          <div slot="main" class="m_list_center">
            <div class="main_top">
              <span>{{ item.name }}</span>
              <button v-if="item.title" class="btn">{{ item.title }}</button>
            </div>
            <p class="main_bottom">{{ item.brand }}</p>
          </div>
          <div
            slot="right"
            v-if="item.isAdd === 0"
            class="m_list_right"
            @click="_add(item.vid, index)"
          >
            <span>添加</span>
          </div>
          <div
            slot="right"
            v-else
            class="m_list_right_"
            @click="_cancel(item.vid, index)"
          >
            <span>已添加</span>
          </div>
        </list-base>
      </ul>
    </mescroll-vue>
    <!-- <div class="mescroll" v-if="isShowDrawer"> -->
    <div class="noUser" v-if="isShowDrawer"><p>-- 未搜索到该用户 --</p></div>
    <!-- </div> -->
    <!-- 人脉添加弹窗-->
    <transition
      name="popRm_transition"
      enter-active-class="animated fadeIn animation_time_mid_"
      leave-active-class="animated fadeOut animation_time_mid_"
    >
      <pop-img
        :popMainImg="popRmImg"
        v-if="isPopRm"
        @closePopMask="_closePopRm"
        :cnameP="cnameRm"
        :cnameC="cnameRm_C"
      >
        <div class="popText" slot="popText" v-if="!isRoleId">
          <button class="btn" @click="_gPay">去开通</button>
          <p @click="_closePopRm">返回</p>
        </div>
        <div class="popText" slot="popText" v-else>
          <button class="btn" @click="goNewsIsDev">扩大影响力</button>
        </div>
      </pop-img>
    </transition>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import MescrollMixin from 'common/js/mixins/mescroll'
import vuexData from 'common/js/mixins/vuex_data'
import addRm from 'common/js/mixins/add_rm'
import ListBase from 'base/m_list_base/m_list_base'
import popImg from 'base/pop_img/pop_img'
import base from 'request/api/base'
import { ISIOS } from 'api/config'
export default {
  mixins: [routings, MescrollMixin, vuexData, addRm],
  data() {
    return {
      headerTitle: '搜索人脉',
      search_text: '',
      mescrollUp: {
        // callback: this.getList,
        callback: null,
        htmlNodata: '<p class="upwarp-nodata">-- 暂无最新用户 --</p>'
      },
      isShowDrawer: false, // 显示未搜索到用户弹窗
      dataList: []
    }
  },
  mounted() {
    this.mescroll.lockDownScroll(true)
    this._getShareData()
  },
  activated() {
    this.mescrollUp.callback = null
    this.search_text = ''
    this.dataList = []
    this.isShowDrawer = false
  },
  methods: {
    // 跳转首页
    _gHome(item) {
      // if (item.isAdd === 1) this.goNext('/home', { uid: item.vid })
      if (item.isAdd === 1) {
        if (ISIOS) {
          location.href = `${base.h5_url}/home?uid=${item.vid}`
        } else {
          this.goNext('/home', { uid: item.vid })
        }
      }
    },
    _submitForm(e) {
      e.preventDefault()
      this.search()
    },
    // 获取列表
    getList() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      this.$api.connection
        .search({
          vid: _this.vid,
          token: _this.token,
          page: pageNum,
          keyword: _this.search_text
          // keyword: '1'
        })
        .then(
          res => {
            const data = res.data.data
            let arr = data || []
            if (pageNum === 1) this.dataList = []
            if (data === 0 && this.searchNum === 1) {
              this.isShowDrawer = true
            } else {
              this.isShowDrawer = false
            }
            this.dataList = this.dataList.concat(arr)
            this.isGetList = true
            this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
          },
          err => {
            console.log(err, 'err')
            this.mescroll.endErr()
          }
        )
    },
    // 获取分享数据
    _getShareData() {
      const brand = this.vUserInfo.brand
      const title = `人脉市集-人脉资源源源不断,${brand}品牌事业前景辉煌灿烂!`
      const desc = `你听说过${brand}品牌人脉市集吗?哇!这里想做事业的伙伴真多!!`
      const url = `${location.origin}`
      const imgUrl =
        'https://zfile.bxwh002.cn/Public/default/images/peoplepic.jpg'
      const uid = this.vid
      const bid = this.bid
      const shareUrl = `${url}/home?uid=${uid}&from_id=${uid}&proid=${uid}&bid=${bid}`
      this.$wxShare({
        title: title,
        desc: desc,
        imgUrl: imgUrl,
        shareUrl: shareUrl
      })
    },
    back() {
      this.goBack()
    },
    // 搜索
    search() {
      if (this.search_text.trim() === '') return
      this.mescrollUp.callback = this.getList
      this.dataList = []
      this.mescroll.resetUpScroll()
      this.searchNum = 1
    }
  },
  components: {
    HeaderCom,
    ListBase,
    popImg
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.popBox {
  >>>.popup-mask {
    background: rgba(0, 0, 0, 0.7);
  }

  >>>.cnameRm {
    top: 10%;
  }

  >>>.cnameRm_C {
    width: 331px !important;
    height: 193px !important;
  }

  >>>.popText {
    margin: 20px auto;
    font-size: 15px;

    .btn {
      position: relative;
      z-index: 1;
      font-size: 12px;
      color: $color-theme;
      btn(260px, 40px, 16px, $color-theme, $color-text, 5px);
      bg_linear_();
    }

    p {
      color: #ff8140;
      text-align: center;
      margin-top: 20px;
    }
  }
}

.mescroll {
  position: fixed;
  top: 101px;
  bottom: 0;
  height: auto;
}

.search {
  width: 100%;
  height: 55px;
  background-color: #ffffff;
  border-bottom: 1px solid #E6E6E6;
  overflow: hidden;
  position: fixed;
  top: 45px;
  z-index: 0;

  .search_item {
    width: 355px;
    height: 33px;
    line-height: 33px;
    margin: 11px auto;
    background-color: #e7e7e7;
    border-radius: 6px;
    flex_row();
    align-items: center;

    form {
      width: 84%;
      margin-left: 3%;
      height: 33px;
      line-height: 33px;
      overflow: hidden;
      position: relative;

      // background-color: #e7e7e7;
      input {
        width: 97%;
        position: absolute;
        left: 3%;
        top: 50%;
        text-indent: 5px;
        margin-top: -10px;
        font-size: 15px;
        // margin 0 auto
        height: 20px;
        // line-height 20px
        background-color: #e7e7e7;
      }
    }

    .search_right {
      width: 13%;
      height: 33px;
      flex_column();
      justify-content: center;
      align-items: center;

      .iconsousuo {
        color: #999;
        font-size: 20px;
      }
    }
  }
}

.m_list_outer {
  height: 70px;
  border-bottom: 1px solid #e6e6e6;

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

    .main_top {
      flex_row();

      span {
        color: #252525;
        font-size: 16px;
      }

      .btn {
        margin-left: 5px;
        btn(auto, auto, 12px, #fff, $color-theme, 3px);
        padding: 1px 2px;
        bd($color-theme);
      }
    }

    .main_bottom {
      margin-top: 10px;
      color: #999;
      font-size: 12px;
    }
  }

  .m_list_right, .m_list_right_ {
    margin-right: 10px;
  }

  .m_list_right {
    btn(65px, 26px, 14px, #fff, $color-theme, 13px);
    bd($color-theme);
  }

  .m_list_right_ {
    btn(65px, 26px, 14px, #dfdfdf, #fff, 13px);
  }
}

.noUser {
  margin-top: 151px;
  min-height: 0.8rem;
  text-align: center;

  p {
    display: inline-block;
    font-size: 0.32rem;
    color: gray;
    vertical-align: middle;
  }
}
</style>
