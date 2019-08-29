<template>
  <div class="foot_share" ref="footContainer">
    <i
      v-show="!isFoot"
      @click="_showFootShare"
      class="iconarrow animated slideInDown infinite slower"
    >
    </i>
    <span class="tip" @click="_showFootShare">立即分享，马上获客</span>
    <div>
      <div class="foot_content" ref="foot">
        <div
          class="item"
          v-for="(item, index) in footList"
          :key="index"
          @click="_getFoot(index)"
        >
          <img class="icon" :src="item.pic" />
          <span>{{ item.text }}</span>
          <!-- <img v-if="index===2" class="hot" src="https://zfile.bxwh002.cn/img/common/icon_hot.png" alt=""> -->
          <i v-if="index === 2" class="iconhot"></i>
        </div>
      </div>
      <div class="close" @click="_hideFootShare">关闭</div>
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import { prefixStyle } from 'common/js/dom'
import base from 'request/api/base'
import { ISIOS } from 'api/config'
const transform = prefixStyle('transform')
export default {
  mixins: [routings],
  data() {
    return {
      footList: [
        {
          pic: 'https://zfile.bxwh002.cn/img/default/follow_icon_article.png',
          text: '获客爆文'
        },
        {
          pic: 'https://zfile.bxwh002.cn/img/default/follow_icon_card.png',
          text: '获客名片'
        },
        {
          pic: 'https://zfile.bxwh002.cn/img/default/follow_icon_customer.png',
          text: '精准获客'
        }
      ],
      isFoot: false
    }
  },
  mounted() {
    if (this.noRoleId) this.footList.splice(2, 1)
    // setTimeout(() => {
    //   this.isFoot = false
    //   this.$refs.footContainer.style[transform] = `translate3d(0,3.9rem,0)`
    // }, 1000)
  },
  methods: {
    // 跳转
    _getFoot(i) {
      switch (i) {
        case 0:
          window.location.href = `${base.h5_news}/route/article`
          break
        case 1:
          if (ISIOS) {
            location.href = `${base.h5_url}/home`
          } else {
            this.goNext('/home')
          }
          // this.goNext('/home')
          break
        case 2:
          this.goNext('/train/index')
          break
        default:
          break
      }
    },
    _showFootShare() {
      this.$refs.footContainer.style[transform] = `translate3d(0,0,0)`
      this.isFoot = true
    },
    _hideFootShare() {
      this.isFoot = false
      this.$refs.footContainer.style[transform] = `translate3d(0,3.9rem,0)`
    }
  },
  props: {
    // isFoot: {
    //   type: Boolean
    // },
    vUserInfo: {
      type: Object
    },
    noRoleId: {
      type: Boolean
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.foot_share {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 2;
  transition: all 1s;

  // height 5.5rem
  // transform-origin: 0 0;
  .tip {
    display: block;
    // line-height:55px;
    line-height: 1.4rem;
    font-size: 16px;
    text-align: center;
    border-top: 1px solid #d4d4d4;
    background: #fff;
    color: #333333;
    position: relative;
    z-index: 3;
  }

  .iconarrow {
    display: block;
    color: #ff9834;
    position: absolute;
    top: 0;
    left: 50%;
    // transform translate(-30%)
    margin-left: -12px;
    animation-direction: alternate;
    z-index: 2;
  }

  .foot_content {
    flex_row();
    justify-content: space-around;
    // height:100px;
    height: 2.7rem;

    .item {
      position: relative;
      flex: 1;
      flex_column();
      justify-content: center;
      padding-top: 7.5px;
      color: #333;

      .icon {
        margin: 0 auto;
        width: 50px;
        height: 50px;
      }

      .iconhot {
        font-size: 26px;
        position: absolute;
        color: #e61111;
        right: 16%;
        top: 2px;
      }

      span {
        display: block;
        font-size: 15px;
        text-align: center;
        line-height: 2.6;
      }
    }
  }

  .close {
    font-size: 16px;
    color: #ff3c3c;
    // line-height:45px;
    line-height: 1.2rem;
    text-align: center;
    border-top: 1px solid #dedede;
  }
}
</style>
