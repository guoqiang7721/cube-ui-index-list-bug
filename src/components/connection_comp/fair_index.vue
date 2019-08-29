<template>
  <div class="container">
    <header-com :title="headerTitle" @back="back">
      <s-city
        class="addcity"
        @cancelHandle="cancelHandle"
        @selectHandle="selectHandle"
      >
        <i class="icondizhi"></i>
        <span>{{ selectCityText }}</span>
        <i class="iconxialazhuanhuan"></i>
      </s-city>
    </header-com>
    <div class="fair_head">
      <div
        class="search_conatiner"
        v-if="isShowSearchContainer"
        @click="_gSearch"
      >
        <div>搜索人脉</div>
        <div>
          <i class="iconsousuo"></i>
        </div>
      </div>
    </div>
    <div class="head_bar">
      <!-- <div v-for="item in tab_list" :key="item.id" @click='tab_click(item.id)'  :class="activeId == item.id ? 'link-active' : ''"> -->
      <div
        v-for="item in tab_list"
        :key="item.id"
        @click="_getTabData(item.id)"
        :class="{ 'link-active': activeId == item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <div class="swiper-inner" v-if="activeId === '1' && famousList">
          <fair-swiper
            ref="mySwiper"
            :famousList="famousList"
            :swiperOption_="swiperOption_"
            @gHome="_gHome"
            @gPutUrl="_gPutUrl"
          />
        </div>
        <list-base v-for="(item, index) in dataList" :key="item.vid">
          <div class="m_list_left" slot="left" @click="_gHomeIsAdd(item)">
            <img
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/cover_square_def.jpg"
              alt=""
            />
          </div>
          <div slot="main" class="m_list_center" @click="_gHomeIsAdd(item)">
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
    <!-- 公众号弹窗 -->
    <transition
      name="popGzh_transition"
      enter-active-class="animated fadeInUp animation_time_mid_"
      leave-active-class="animated fadeOutDown animation_time_mid_"
    >
      <pop-img
        :popMainImg="popMainImg"
        v-if="isPopGzh"
        @closePopMask="_closePopGzh"
      />
    </transition>
    <!-- loading加载 -->
    <div v-show="isLoading" class="loading-container">
      <loading />
    </div>
  </div>
</template>
<script>
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import addRm from 'common/js/mixins/add_rm'
import HeaderCom from 'base/header/header'
import ListBase from 'base/m_list_base/m_list_base'
import MescrollMixin from 'common/js/mixins/mescroll'
import popImg from 'base/pop_img/pop_img'
import { popDialogBtn, popToast } from 'common/js/cubePop'
import fairSwiper from 'components/connection_comp/fair_swiper'
import attention from 'common/js/mixins/attention'
import base from 'request/api/base'
import sCity from 'base/city/city_all'
import { ISIOS } from 'api/config'
import Loading from 'base/loading/loading'
export default {
  mixins: [routings, vuexData, MescrollMixin, addRm, attention],
  data() {
    return {
      headerTitle: '人脉市集',
      tab_list: [
        {
          name: '推荐',
          id: '1'
        },
        {
          name: '同行',
          id: '2'
        },
        {
          name: '区块链',
          id: '5'
        },
        {
          name: '微商',
          id: '6'
        },
        {
          name: '直销',
          id: '3'
        },
        {
          name: '保险',
          id: '4'
        }
      ],
      activeId: '1',
      mescrollUp: {
        callback: this.getList,
        htmlNodata: '<p class="upwarp-nodata">-- 暂无最新用户 --</p>',
        empty: {
          warpId: 'dataList',
          icon: 'https://zfile.bxwh002.cn/img/common/name_card_icon.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      swiperOption_: {}, // swiper属性
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 20,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      swiperData: {}, // swiper数据
      famousList: [], // 大咖名人堂
      isShowSearchContainer: false, // 隐藏人脉搜索
      selectCityText: '', // 所选择城市
      isLoading: false // 显示loading
    }
  },
  mounted() {
    let { city } = this.$storage.get('connectionSelect') || {}
    if (city && city.length > 5) city = `${city.substring(0, 4)}..`
    this.getFamous()
    this._getShareData()
    this.selectCityText = city || this.vUserInfo.city || '全国'
  },
  updated() {
    if (this.famousList && this.famousList.length < 2) {
      this.$nextTick(() => {
        const Recommend = document.getElementsByClassName(
          'recommend_container'
        )[0]
        if (Recommend) this._getRecommend()
      })
    }
  },
  async activated() {
    this._isGetRecommend()
    this._getPopComp('fair_index') // 获取弹窗
    if (this.isGetList) this.getList()
  },
  methods: {
    // 选择城市
    selectHandle(val, index, cityText) {
      // city选择全国
      if (cityText) {
        if (cityText[0] === '全国') {
          this.selectCityText = '全国'
          this.$storage.set('connectionSelect', {
            city: '全国'
          })
        } else {
          this.$storage.set('connectionSelect', {
            province: cityText[0],
            city: cityText[1]
          })
          if (cityText[1].length > 5) {
            cityText[1] = `${cityText[1].substring(0, 4)}..`
          }
          this.selectCityText = cityText[1]
        }
        this.dataList = []
      }
      // this.isLoading = true
      this.mescroll.resetUpScroll()
    },
    // 取消选择
    cancelHandle() {},
    _getShareData() {
      const userInfo = this.vUserInfo
      const title = `人脉市集-人脉资源源源不断,${userInfo.brand}品牌事业前景辉煌灿烂!`
      const desc = `你听说过${userInfo.brand}品牌人脉市集吗?哇!这里想做事业的伙伴真多!!`
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
    // 跳转首页
    _gHome(i) {
      // this.goNext('/home', { uid: i.vid })
      if (ISIOS) {
        location.href = `${base.h5_url}/home?uid=${i.vid}`
      } else {
        this.goNext('/home', { uid: i.vid })
      }
    },
    _gHomeIsAdd(i) {
      if (i.isAdd === 1) this._gHome(i)
    },
    _closePopGzh() {
      this.isPopGzh = false
      this._isShowPrivacy()
    },
    // 跳转url
    _gPutUrl(url) {
      if (url.indexOf('https') !== '-1') {
        url = `https://${url}`
      } else if (url.indexOf('http') !== '-1') {
        url = `http://${url}`
      }
      this.goRoot(url)
    },
    // 切换tab
    _getTabData(id) {
      if (this.activeId !== id) {
        this.activeId = id
        this.dataList = []
        this.mescroll.resetUpScroll()
        if (id === '1') this.getFamous()
      }
    },
    // 判断是否显示隐私设置弹窗
    _isShowPrivacy() {
      const isProTip =
        this.vUserInfo.can_show === '0' && this.vUserInfo.isable === '0'
      if (isProTip || this.vUserInfo.isable === '1') this._getProActive()
    },
    // 隐私弹窗内容
    _getProActive() {
      const ProObj = {
        _this: this,
        content:
          '人脉市集功能将展示你的名片信息，为你带来更多人脉，通过个人中心可进行设置。',
        maskClosable: true
      }
      popDialogBtn(ProObj)
    },
    // 确定弹窗
    popDialogBtnConfirm() {
      this.changePrivacyStatus(1)
    },
    // 关闭弹窗
    popDialogBtnCancel() {
      this.changePrivacyStatus(2)
    },
    // 人脉隐私switch设置
    changePrivacyStatus(val) {
      var _this = this
      this.$api.userComp
        .changePrivacyStatus({
          vid: _this.vid,
          token: _this.token,
          status: val
        })
        .then(res => {
          const errCode = res.data.errCode
          const data = res.data.data
          this.setVUserInfo(data)
          if (errCode === 0) this.changeIsclose()
        })
    },
    // 人脉隐私市集设置
    changeIsclose() {
      var _this = this
      this.$api.userComp
        .changeIsclose({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const errCode = res.data.errCode
          const data = res.data.data
          if (errCode !== 0) {
            const popToastErr = {
              _this: this,
              txt: res.msg
            }
            popToast(popToastErr)
          } else {
            this.setVUserInfo(data)
          }
        })
    },
    // 大咖名人堂数据
    getFamous() {
      var _this = this
      this.$api.connection
        .getFamous({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          // const data = this.famousList
          this.famousList = data
          if (data) {
            this.$nextTick(() => {
              if (data.length === 1) {
                this._getRecommend()
              } else {
                // this.swiper.slideTo(1, 1000, false)
                this.swiperOption_ = this.swiperOption
              }
            })
          }
        })
    },
    // 判断swiper
    _isGetRecommend() {
      const Recommend = document.getElementsByClassName(
        'recommend_container'
      )[0]
      if (Recommend) this._getRecommend()
    },
    // 设置元素宽度
    _getRecommend() {
      const Recommend = document.getElementsByClassName(
        'recommend_container'
      )[0]
      Recommend.style.width = document.body.clientWidth + 'px'
      Recommend.style.left = 0
      Recommend.style.transform = 'scale(0.94)'
    },
    // 获取列表
    getList() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      let { city, province } = this.$storage.get('connectionSelect') || {
        city: _this.vUserInfo.city,
        province: _this.vUserInfo.province
      }
      if (city === '全国') {
        city = ''
        province = ''
      }
      let timestamp = new Date()
        .getTime()
        .toString()
        .substr(0, 10)
      this.$api.connection
        .fairTab({
          vid: _this.vid,
          bid: _this.bid,
          cat: _this.activeId,
          token: _this.token,
          page: pageNum || 1,
          timestamp: timestamp,
          province: province || '',
          city: city || ''
        })
        .then(
          res => {
            let arr = res.data.data || []
            if (pageNum === 1) this.dataList = []
            this.dataList = this.dataList.concat(arr)
            // this.isLoading = false
            this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
            this.isGetList = true
          },
          err => {
            console.log(err, 'err')
            this.mescroll.endErr()
          }
        )
    },
    _gSearch() {
      this.goNext('/connection/fair_search')
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    ListBase,
    popImg,
    fairSwiper,
    sCity,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

>>>.empty-tip {
  color: #ff9125;
}

>>>.mescroll-empty {
  padding-top: 60px;
}

>>>.empty-icon {
  width: 149px;
  height: 149px;
}

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

#dataList {
  overflow-x: hidden !important;
}

.loading-container {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 22%;
  transform: translateY(-50%);
}

.addcity {
  position: absolute;
  right: 15px;
  flex_row();
  align-items: center;
  font-size: 14px;
  color: #ff9834;

  span {
    margin-right: 4px;
  }

  i {
    font-size: 16px;

    &:first-child {
      margin-right: 5px;
    }

    &:last-child {
      color: #999;
      font-size: 10px;
    }
  }
}

.mescroll {
  position: fixed;
  top: 188px;
  bottom: 0;
  height: auto;
}

.fair_head {
  position: fixed;
  top: 44px;
  z-index: 2;
  width: 100%;
  height: 100px;
  flex_row();
  justify-content: center;
  align-items: center;
  bg_image('https://zfile.bxwh002.cn/img/default/connection/fair_rm_banner_.png');

  .search_conatiner {
    width: 254px;
    height: 33px;
    background-color: #fff;
    border-radius: 3px;
    flex_row();
    align-items: center;

    div {
      &:first-child {
        width: 84%;
        height: 33px;
        line-height: 33px;
        font-size: 14px;
        color: #b0b0b0;
        margin-left: 3%;
        text-align: left;
      }

      &:last-child {
        width: 13%;
        height: 33px;
        flex_row();
        align-items: center;
        justify-content: center;
      }

      .iconsousuo {
        color: #999;
        font-size: 20px;
      }
    }
  }
}

.head_bar {
  width: 100%;
  position: fixed;
  top: 144px;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e6e6e6;
  color: #666;

  >div {
    width: 25%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 13px;
    box-sizing: border-box;
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
      align-items: center;

      // overflow hidden
      // white-space:nowrap
      span {
        color: #252525;
        font-size: 16px;
      }

      .btn {
        margin-left: 5px;
        color: #fff;
        btn(auto, auto, 11px, #fff, $color-theme, 3px);
        padding: 0 1px;
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
</style>
