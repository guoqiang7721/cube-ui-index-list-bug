<template>
  <div>
    <header-com :title="headerTitle"  @back="back" />
    <div class='goods'>
      <div class='swiper_container'>
        <swiper :data="goods.cover" v-if="isCoverFlag">
            <cube-slide-item v-for="(item,index) in goods.cover" :key="index">
              <a>
                <img :src="item"  alt="item.title" />
              </a>
            </cube-slide-item>
        </swiper>
        <div class='detail'>
          <span class='price'>¥{{goods.price}}</span>
          <span class='name'>{{goods.name}}</span>
          <span class='format'>{{goods.format}}</span>
        </div>
      </div>
    <div class='tab'>
      <div v-for="(item,index) in tablist"
          class="type-navbar-item"
          :key="index"
          :class="{'link-active': num == index}"
          @click="_tabClick(index)">
          {{item}}
      </div>
    </div>
    <div class='text_detail'
         :class="num === 1 ? '' :'hide'">
      <div v-html="goods.content"></div>
    </div>
    <div v-for="(item,index) in goods.detail" class='pics' :key="index">
      <img :src='item' class='pics' :class='num===0 ? "" :"hide"'>
    </div>
    </div>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import Swiper from 'base/swiper/swiper'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
export default {
  mixins: [vuexData, routings],
  data () {
    return {
      headerTitle: '商品详情',
      goods: [],
      isCoverFlag: false,
      tablist: [
        '图文详情',
        '文字描述'
      ],
      num: 0
    }
  },
  activated () {
    console.log('activated')
    this.getGood()
  },
  methods: {
    _tabClick (i) {
      this.num = i
    },
    getGood (cid) {
      var _this = this
      this.$api.shop.getGood({
        vid: _this.vid,
        bid: _this.bid,
        gid: _this.vGoodsId.id,
        token: _this.token
      }).then(res => {
        const data = res.data.data
        this.goods = data
        this.isCoverFlag = true
        document.title = data.name
        console.log(data)
      })
    },
    back () {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    Swiper
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.goods
  margin: 2%
  .slider-content
    margin-top 46px
    width: 100%;
    height:250px;
    img
      width 100%
  .detail
    background-color: #fff
    padding: 15px 0 10px 2%
    flex_column()
    justify-content: center
    font-size 17px
    color: #252525
  .price
    font-size: 22px
    color: #ff440b
    margin-bottom: 7.5px
  .format
    margin-top: 6.5px
    color: #999
    font-size: 13px
  .tab
    width: 100%;
    height: 44px;
    color #333
    flex_row()
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    bd_bt(#e6e6e6)
    margin-bottom:10px;
    bgc(#fff)
    div
      width:50%;
      box-sizing:border-box;
      font-size:13px;
      line-height:44px;
      text-align:center;
      display:inline-block;
  .pics
     width 100%
     margin: 0 auto;
  .text_detail
    font-size: 16px;
    color #333
    line-height 24px
    letter-spacing 1px
    background-color: #fff;
    padding: 2%
</style>
