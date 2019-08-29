<template>
  <div>
    <!-- 文章内容 -->
    <div class="article_detail" :style="articleSty">
      <div v-html="htmlData.content" ref="article_detail"></div>
    </div>
    <!-- 文章展示点击收起全文 -->
    <div
      class="openFill"
      v-if="isFill"
      :style="isFoldSty"
      @click="_toggleArticle"
    >
      <div class="headline_up">
        <img
          src="https://zfile.bxwh002.cn/wmp/images/headline_down.png"
          v-if="isFold"
        />
        <img src="https://zfile.bxwh002.cn/wmp/images/headline_up.png" v-else />
      </div>
      <div class="text" v-if="isFold">点击全文</div>
      <div class="text" v-else>收起全文</div>
    </div>
  </div>
</template>
<script>
const ToggleArticle = 'toggleArticle'
export default {
  data() {
    return {
      isFill: true // 文章默认是否展示点击 收起全文 (文章高度小于700时)
    }
  },
  // activated () {
  //   if (this.htmlData.content) {
  //     this.$nextTick(() => {
  //       const Height = this.$refs.article_detail.offsetHeight
  //       // console.warn('activated', Height)
  //       this.isFill = !(Height < 700)
  //     })
  //   }
  // },
  // updated () {
  //   if (this.htmlData.content && !this.isFirstReady) {
  //     this.isFirstReady = true
  //     this.$nextTick(() => {
  //       const Height = this.$refs.article_detail.offsetHeight
  //       // console.warn('updated', Height)
  //       this.isFill = !(Height < 700)
  //     })
  //   }
  // },
  methods: {
    _toggleArticle() {
      this.$emit(ToggleArticle)
    }
  },
  props: {
    htmlData: {
      type: Object,
      default: null
    },
    articleSty: {
      type: String
    },
    isFoldSty: {
      type: String
    },
    isFold: {
      type: Boolean
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.article_detail {
  width: 100%;
  color: #333;
  min-height: 500px;
  user-select: text !important;
  // min-height: 500px;
  margin: 10px 0% 0% 0%;
  overflow-x: hidden !important;
  color: #555;

  >>>p {
    margin: 3% 5%;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 2px;

    // text-indent: 0 !important;
    strong {
      // width 120%
    }

    img {
      width: 110% !important;
      margin: 0 -5% !important;
    }
  }

  >>>h2 {
    margin: 3% 5% !important;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 2px;
  }
}

.openFill {
  flex_column();
  justify-content: center;
  align-items: center;
  margin: -15% 4% 0;

  .headline_up {
    width: 100%;
    height: 81px;
    bg_image('https://zfile.bxwh002.cn/img/default/news_fill_bg.png');
    flex_column();
    justify-content: center;
    align-items: center;
  }

  img {
    width: 24px;
    height: 19px;
  }

  .text {
    width: 340px;
    height: 34px;
    border-radius: 2px;
    border: solid 1px #ff8f2f;
    color: #ff8f2f;
    font-size: 15px;
    text-align: center;
    line-height: 34px;
    box-sizing: border-box;
  }
}
</style>
