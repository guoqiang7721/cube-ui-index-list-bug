<template>
  <div>
    <div class="intro_outer">
      <div class="intro_container ">
        <div
          class="intro_view"
          v-for="item in intro_list_normal"
          :key="item.pic"
        >
          <img class="pic" :src="item.pic" />
          <img class="hot" v-if="item.hot" :src="item.hot" />
          <img class="hd" v-if="item.hd" :src="item.hd" />
          <p class="price">{{ item.price }}</p>
          <p>{{ item.title }}</p>
          <span>{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      intro_list_normal: [
        {
          pic:
            'https://zfile.bxwh002.cn/Public/default/images/pay_icon_fjrm.png',
          price: '',
          title: '附近人脉解锁',
          content: '周围高端人脉一网打尽'
        },
        {
          pic:
            'https://zfile.bxwh002.cn/Public/default/images/pay_icon_rmsj.png',
          price: '',
          title: '人脉市集展示',
          content: '人脉市集，邀请得人脉不限量',
          url: '/mine/pages/index/fair/fair'
        },
        {
          pic: 'https://zfile.bxwh002.cn/Public/default/images/pay_icon_yy.png',
          price: '',
          title: '试用会员人脉解锁',
          content: '不受限制查看试用会员联系方式'
        },
        {
          pic:
            'https://zfile.bxwh002.cn/Public/default/images/pay_icon_fksj.png',
          price: '',
          title: '访客数据解锁',
          content: '可查看名片访客的所有数据'
        },
        {
          pic:
            'https://zfile.bxwh002.cn/Public/default/images/pay_icon_wzmp.png',
          price: '',
          title: '文章名片解锁',
          content: '每日海量热门行业文章，带名片，易传播'
        },
        {
          pic: 'https://zfile.bxwh002.cn/Public/default/images/pay_icon_gx.png',
          hot:
            'https://zfile.bxwh002.cn/Public/default/images/pay_icon_fjrm_hot.png',
          price: '',
          title: '1对1素材更新',
          content: '素材及时更新，专属上传素材更新服务'
        },
        {
          pic: 'https://zfile.bxwh002.cn/Public/default/images/pay_icon_AI.png',
          price: '',
          title: 'AI追踪解锁',
          content: '24小时不间断追踪动态名片'
        },
        {
          pic:
            'https://zfile.bxwh002.cn/Public/default/images/pay_icon_ewm.png',
          price: '',
          title: '双码推广',
          content: '个人微信和群码文章植入推广'
        },
        {
          pic: 'https://zfile.bxwh002.cn/Public/default/images/pay_icon_hf.png',
          hd: 'https://zfile.bxwh002.cn/Public/default/images/pay_icon_hd.png',
          price: '',
          title: '赠送200元话费',
          content: '每天前50名赠送200元话费'
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.intro_outer {
  width: 100%;
  bgc(#fff);

  .intro_container {
    width: 360px;
    margin: 0px auto;
    background-color: #fff;
    flex_row();
    flex-wrap: wrap;
    justify-content: space-around;
    border-radius: 5px;
    position: relative;

    .intro_view {
      width: 28%;
      flex_column();
      justify-content: center;
      align-items: center;
      color: #999;
      font-size: 10px;
      padding: 5px 0;
      position: relative;

      .pic {
        width: 40px;
        height: 40px;
      }

      .hot {
        width: 14px;
        height: 14px;
        position: absolute;
        right: 20%;
        top: 3px;
      }

      .hd {
        width: 26px;
        height: 12px;
        position: absolute;
        right: 10%;
        top: 3px;
      }

      p {
        color: #974b29;
        font-size: 12px;
        margin: 5px auto;
        text-align: center;
      }

      .price {
        font-size: 15px;
        color: #ff7538;
      }

      span {
        line-height: 14px;
      }
    }
  }
}
</style>
