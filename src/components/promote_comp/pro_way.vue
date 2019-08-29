<template>
  <div>
    <header-com :title="title" @back="back" />
    <div class="banner">
      <img src="https://zfile.bxwh002.cn/img/default/pro_way_banner.png" />
    </div>
    <div class="intro">推广方式</div>
    <div class="intro_text">
      您可以通过转发小程序或者分享您自己的名片的方式，使其他人点入则一次性绑定成为您的下级，他们开通之后您将获得<span
        >20%的佣金和增加120天的会员时长。</span
      >
    </div>
    <div class="share">
      <div class="share_img">
        <img src="https://zfile.bxwh002.cn/img/default/pro_way_step1.png" />
      </div>
      <div class="share_text">
        <span>点击名片首页右上角的三个点, 选择转发给群和朋友圈。</span>
        <div @click="_gHome" class="goto_share">进入名片首页</div>
      </div>
    </div>
    <div class="share">
      <div class="share_img">
        <img src="https://zfile.bxwh002.cn/img/default/pro_way_step2.png" />
      </div>
      <div class="share_text">
        <span>选择喜欢的爆文转发朋友圈, 迅速传播推广。</span>
        <div @click="_gNews" class="goto_share">进入爆文页面</div>
      </div>
    </div>
    <div class="share">
      <div class="share_img">
        <img src="https://zfile.bxwh002.cn/img/default/pro_way_step3.png" />
      </div>
      <div class="share_text">
        <!-- <span class="shareother">或者</span> -->
        <span>您有更多客户资源 , 可以联系我们进行更深入的合作！</span>
        <div class="_gContact" @click="_gContact">去联系</div>
      </div>
    </div>
    <pop-img
      :popMainImg="popMainImg"
      v-if="isPopGzh"
      @closePopMask="_closePopGzh"
    />
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import popImg from 'base/pop_img/pop_img'
import base from 'request/api/base'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      title: '推广中心',
      popMainImg: 'https://zfile.bxwh002.cn/img/common/attention_gzh_bg.jpg', // 弹窗图片
      isPopGzh: false
    }
  },
  methods: {
    _closePopGzh() {
      this.isPopGzh = false
    },
    _gContact() {
      this.isPopGzh = true
    },
    _gHome() {
      this.goNext('/home')
    },
    _gNews() {
      // this.goNext('/news/all')
      window.location.href = `${base.h5_news}/route/article`
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    popImg
  }
}
</script>
<style lang="stylus" scoped>
.banner {
  margin-top: 44px;
  width: 100%;
  height: 150px;

  img {
    width: 100%;
    height: 100%;
  }
}

.intro {
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  font-size: 16px;
  color: #252525;
  padding-left: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.intro_text {
  background-color: #fff;
  padding: 6px;
  font-size: 14px;
  color: #666;
  line-height: 18px;

  span {
    color: #ff7200;
  }
}

.share {
  margin-top: 10px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.share .share_img {
  width: 150px;
  height: 150px;
}

.share .share_img img {
  width: 150px;
  height: 150px;
}

.share .share_text {
  width: 54%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  font-size: 15px;
  color: #000;
  position: relative;

  span {
    font-weight: bold;
  }
}

.share .share_text div {
  width: 52%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background: linear-gradient(to right, #ffc22f, #ff9d22);
  margin-top: 15px;
  color: #fff;
  font-size: 15px;
  margin-left: 5px;
}

.share .share_text .goto_share::after {
  border: none;
}

.share .share_text contact-button, .share .share_text button {
  width: 45%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background: linear-gradient(to right, #ffc22f, #ff9d22);
  margin-top: 15px;
  color: #fff;
  font-size: 15px;
  margin-left: 5px;
}

.share .share_text contact-button {
  color: #546ff7 !important;
  opacity: 0;
}

.goto_contact {
  position: absolute;
  width: 45%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background: linear-gradient(to right, #ffc22f, #ff9d22);
  top: 60%;
  color: #fff;
  font-size: 15px;
  left: 0;
}

.shareother {
  font-weight: bold;
  font-size: 23px;
}
</style>
