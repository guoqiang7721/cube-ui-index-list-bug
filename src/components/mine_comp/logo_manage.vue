<template>
  <div>
    <header-com title="LOGO设置" @back="back" />
    <div class="logo_inner">
      <div class="brand_logo">
        <div class="uploadBox">
          <input type="file" id="change" accept="image/*" @change="_change" />
        </div>
        <img :src="isLogoImg" class="img" alt="" />
        <i
          class="iconguanbi1"
          v-if="isChooseAboutIcon"
          @click="_removeAboutLogo"
        ></i>
      </div>
      <div class="tip">
        <p>LOGO尺寸270 X 200像素，需为PNG格式</p>
        <p>
          若不会操作想让平台收录该品牌/公司，<a
            href="http://ha4zvtftq0g3b4x1.mikecrm.com/bgLBY6y"
            >也可填写本表</a
          >
        </p>
      </div>
    </div>
    <!-- 相关 -->
    <div class="about">
      <p class="tip">相关LOGO</p>
      <swiper :options="swiperOption" v-if="aboutLogoList">
        <swiper-slide v-for="(item, index) in aboutLogoList" :key="index">
          <div class="outer" @click="_handleUpic(item, index)">
            <img class="about_logo" :src="item.url" alt="" />
            <img
              class="act"
              v-if="item.is_choose"
              src="https://zfile.bxwh002.cn/img/default/general/icon_checked.png"
              alt=""
            />
          </div>
        </swiper-slide>
      </swiper>
      <p class="no_data" v-else>暂无相关LOGO</p>
    </div>
    <cube-button class="brand_btn" @click="_handleLogoDone">完成</cube-button>
    <up-load-crop
      v-show="isCropperShow"
      :option="option"
      :tipText="uPicTipText"
      @confirm="_confirm"
      @cancel="_cancel"
      @loaderr="_loaderr"
    >
    </up-load-crop>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import UpLoadCrop from 'base/upload_crop/upload_crop'
import uploadData from 'common/js/mixins/upload_data'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { popToast } from 'common/js/cubePop'
import { imgPathUrl } from 'api/config'
export default {
  mixins: [routings, vuexData, uploadData],
  data() {
    return {
      isLogoImg: '', // logo上传默认
      swiperOption: {
        slidesPerView: 2.5
      },
      isCropperShow: false, // 裁剪显示
      uPicTipText: '提示：上传你的品牌LOGO！', // 裁剪提示文字
      uploadImg: '', // 上传头像
      aboutLogoList: [] // 相关logo列表
    }
  },
  computed: {
    // 是否显示关闭已选模板
    isChooseAboutIcon() {
      return (
        this.isLogoImg !== `${imgPathUrl}/default/general/up_brand_logo.png`
      )
    }
  },
  activated() {
    this.isLogoImg = `${imgPathUrl}/default/general/up_brand_logo.png`
    this.getRelatedLogo()
  },
  methods: {
    // 选择模板
    _handleUpic(item, index) {
      this.isLogoImg = item.url
      this.aboutLogoList.map((v, i) => {
        this.$set(this.aboutLogoList[i], 'is_choose', false)
        if (index === i) {
          this.$set(this.aboutLogoList[index], 'is_choose', true)
        }
      })
    },
    // 确定裁剪
    _confirm(upic) {
      this.isCropperShow = false
      this.isLogoImg = upic
    },
    // 获取相关logo
    getRelatedLogo() {
      var _this = this
      this.$api.brand
        .getRelatedLogo({
          token: _this.token,
          bid: _this.vUserInfo.bid
        })
        .then(res => {
          const errCode = res.data.errCode
          const data = res.data.data
          if (errCode === 0) {
            this.aboutLogoList = data
          }
        })
    },
    // 上传logo
    upload({ type } = {}) {
      var _this = this
      this.$api.brand
        .setLogo({
          token: _this.token,
          upic: _this.isLogoImg,
          bid: _this.vUserInfo.bid,
          type: type
        })
        .then(res => {
          const msg = res.data.msg
          const errCode = res.data.errCode
          if (errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: '上传成功'
            }
            popToast(popToastObj)
            setTimeout(() => {
              this.back()
            }, 800)
          } else {
            const popToastObj = {
              _this: this,
              txt: msg
            }
            popToast(popToastObj)
          }
        })
    },
    // 完成logo设置
    _handleLogoDone() {
      if (this.isChooseAboutIcon) {
        // type 1 base64 2 url
        if (this.isLogoImg.indexOf('base64') >= 0) {
          this.upload({
            type: 1
          })
        } else {
          this.upload({
            type: 2
          })
        }
      } else {
        const popToastObj = {
          _this: this,
          txt: '请上传你的品牌LOGO!'
        }
        popToast(popToastObj)
      }
    },
    // 删除已选好模板
    _removeAboutLogo() {
      this.isLogoImg = `${imgPathUrl}/default/general/up_brand_logo.png`
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    swiper,
    swiperSlide,
    UpLoadCrop
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.logo_inner {
  padding: 14px 25px;
  bgc(#fff);
  flex_column();
  align-items: center;
  margin-top: 56px;

  .brand_logo {
    width: 130px;
    height: 100px;
    position: relative;

    .uploadBox {
      position: absolute;
      width: 130px;
      height: 100%;
      left: 0;
      top: 0;

      #change {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

    .img {
      width: 130px;
      height: 100px;
    }

    i {
      position: absolute;
      top: -6px;
      right: -6px;
      color: #FF9E22;
    }
  }

  .tip {
    margin-top: 12px;

    p {
      font-size: 13px;
      color: #999999;
      line-height: 25px;

      a {
        color: #FF9E22;
      }
    }
  }
}

.about {
  margin-top: 10px;
  width: 100%;
  padding: 20px 0;
  bgc(#fff);

  .tip {
    color: #333;
    font-size: 18px;
    font-weight: bold;
    margin-left: 15px;
  }

  .no_data {
    color: #999;
    font-size: 14px;
    margin: 20px auto;
    text-align: center;
  }

  .swiper-container {
    margin-top: 20px;

    .outer {
      width: 135px;
      height: 100px;
      margin-left: 15px;
      position: relative;

      .about_logo {
        width: 100%;
        height: 100%;
      }

      .act {
        width: 29px;
        height: 29px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}

.brand_btn {
  width: 82%;
  margin: 50px auto 0;
  height: 44px;
  background: linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1));
  border-radius: 5px;
}
</style>
