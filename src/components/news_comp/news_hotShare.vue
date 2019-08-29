<template>
  <div v-if="swiperFlag">
    <p class="hot_share">最近热门分享</p>
    <swiper :data="swiperList">
      <cube-slide-item v-for="item in swiperList" :key="item.id">
        <a @click="_gRelated(item)">
          <img :src="item.cover" alt="" />
          <span>{{ item.name }}</span>
        </a>
      </cube-slide-item>
    </swiper>
  </div>
</template>
<script>
import Swiper from 'base/swiper/swiper'
const gRelated = 'gRelated'
export default {
  methods: {
    _gRelated(i) {
      this.$emit(gRelated, i)
    }
  },
  props: {
    swiperFlag: {
      type: Boolean
    },
    swiperList: {
      type: Array
    }
  },
  components: {
    Swiper
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.hot_share {
  width: 347.5px;
  height: 35px;
  line-height: 35px;
  font-size: 15px;
  margin: 0 auto;
  color: #333;
}

.slider-content {
  width: 347.5px;
  height: 79px;
  margin: 0 auto;
  bgc(#f5f5f5);
  overflow: hidden;

  a {
    flex_row();

    // align-items center
    img {
      width: 95px;
      height: 65px;
      border-radius: 4px;
      margin: 7px 0 0 7.5px;
    }

    span {
      color: #333;
      flex: 1;
      height: 40px;
      width: 155px;
      margin: 15.5px 60px 0 30px;
      font-size: 15px;
      two_txt_cut();
      line-height: 20px;
    }
  }

  >>>.cube-slide-dots {
    bottom: 10px;

    .dot {
      bgc(#a6a6a6);

      &.active {
        background: $color-theme;
      }
    }
  }
}
</style>
