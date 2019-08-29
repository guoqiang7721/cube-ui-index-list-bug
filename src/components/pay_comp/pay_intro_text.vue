<template>
  <div>
    <div class="member_title">
      <!-- <img src="https://zfile.bxwh002.cn/wmp/images/1.png" /> -->
      <i class="iconkaitong_icon_"></i>
      <span>会员特权</span>
      <!-- <img src="https://zfile.bxwh002.cn/wmp/images/2.png" /> -->
      <i class="iconkaitong_icon_"></i>
    </div>
    <div class="power_list" :style="isPayCls">
      <div class="power_text" v-for="item in powerText" :key="item.text">
        <!-- <img :src="item.img" alt="" /> -->
        <i :class="item.iconFont"></i>
        <div class="service">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      powerText: [
        {
          text: '开通服务后即可展示自己的联系方式, 访客能第一时间联系到您。',
          iconFont: 'iconkaitong_icon_4'
        },
        {
          text: '开通服务后, 可以展示您上传的照片, 丰富您的名片。',
          iconFont: 'iconkaitong_icon_3'
        },
        {
          text: '设置名片底部是否显示平台广告, 关闭广告页面更整洁。',
          iconFont: 'iconkaitong_icon_1'
        },
        {
          text:
            '开通服务后, 您可以管理您的访客信息, 查看有哪些访问以及停留时间。',
          iconFont: 'iconkaitong_icon_6'
        },
        {
          text: '解锁个人推广码和群码植入微信推广，市面独家。',
          iconFont: 'iconkaitong_icon_6'
        },
        {
          text:
            '解锁人脉市集全年最高+3650条人脉名额, 鹰眼功能, 无论对方是否会员都可极速查看。',
          iconFont: 'iconkaitong_icon_7'
        },
        {
          text: '解锁人脉市集全年最高+3650次展现。',
          iconFont: 'iconkaitong_icon_2'
        },
        {
          text: '解锁周围500公里高端行业人脉。',
          iconFont: 'iconkaitong_icon_8'
        },
        {
          text: '解锁鹰眼功能, 可不受限制的查看试用会员的联系方式。',
          iconFont: 'iconkaitong_icon_9'
        },
        {
          text:
            '专属编辑服务，天天帮你更新名片素材，您可以提供素材，我们免费帮您更新，一对一专属服务。',
          iconFont: 'iconkaitong_icon_5'
        }
      ]
    }
  },
  computed: {
    isPayCls() {
      return this.payId !== 0 ? 'padding-bottom: 60px' : ''
    }
  },
  props: {
    payId: {
      type: Number
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.member_title {
  bgc(#fff);
  color: #252525;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  padding-left: 10px;
  bd_bt(#e6e6e6);
  flex_row();
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  i {
    color: #ff9834;
    display: inline-block;

    &:last-child {
      transform: rotateY(180deg);
    }
  }

  img {
    width: 14px;
    height: 7px;
  }

  span {
    margin: 0 7.5px;
  }
}

.power_list {
  bgc(#fff);
  overflow: hidden;

  // &:last-child
  // margin-bottom: 56px;
  .power_text {
    bd_bt(#e6e6e6);
    flex_row();
    align-items: center;
    font-size: 13px;
    color: #999;
    margin: 12px 5px 0px 10px;
    padding-bottom: 10px;

    &:last-child {
      border-bottom: none;
    }

    i {
      color: #ff9834;
      font-size: 18px;
      margin-right: 8px;
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 7px;
    }

    .service {
      width: 90%;
      margin-right: 5px;
      line-height: 20px;
      letter-spacing: 1px;
    }
  }
}
</style>
