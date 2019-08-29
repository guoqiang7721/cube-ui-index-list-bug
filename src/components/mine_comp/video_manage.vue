<template>
  <div class="container">
    <header-com title="视频设置" @back="back" />
    <div class="logo_inner">
      <div class="brand_logo">
        <img
          v-if="isUpLoadDef"
          @click="_uploadVideo"
          :src="isLogoVideo"
          class="img"
          alt=""
        />
        <video
          v-else
          class="img"
          :poster="isLogoCover"
          x5-video-player-type="h5"
          autoplay
        >
          <source :src="isLogoVideo" type="video/mp4" />
        </video>
        <i
          class="iconguanbi1"
          v-if="isChooseAboutIcon"
          @click="_removeAboutLogo"
        ></i>
      </div>
      <div class="tip">
        <p>
          若不会操作想让平台收录该品牌/公司，<a
            href="http://ha4zvtftq0g3b4x1.mikecrm.com/bgLBY6y"
            >也可填写本表</a
          >
        </p>
      </div>
    </div>
    <div class="logo_inner" v-if="isHide">
      <div class="brand_logo">
        <div class="uploadBox">
          <input type="file" id="change" accept="image/*" @change="_change" />
        </div>
        <img :src="isLogoCover" class="img" alt="" />
        <i
          class="iconguanbi1"
          v-if="isChooseAboutIcon"
          @click="_removeAboutLogo"
        ></i>
      </div>
      <p>封面尺寸714x472像素，需为jpg格式</p>
    </div>
    <!-- 相关 -->
    <div class="about" v-if="isHide">
      <p>相关视频</p>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in aboutLogoList" :key="index">
          <div class="inner" @click="_handleUpic(item, index)">
            <video
              id="video"
              class="about_logo"
              :poster="item.cover"
              x5-video-player-type="h5"
              :controls="item.controls"
              :autoplay="item.autoplay"
            >
              <source :src="item.url" type="video/mp4" />
            </video>
            <img
              class="act"
              v-if="item.is_choose"
              src="https://zfile.bxwh002.cn/img/default/general/icon_checked.png"
              alt=""
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- <cube-button class="brand_btn" @click="_handleLogoDone">完成</cube-button> -->
    <!-- 上传 -->
    <up-load-crop
      v-show="isCropperShow"
      :option="option"
      :tipText="uPicTipText"
      @confirm="_confirm"
      @cancel="_cancel"
      @loaderr="_loaderr"
    >
    </up-load-crop>
    <!-- 视频链接弹窗 -->
    <dialog-img
      :cname="videoCls"
      :cnameOuter="cnameVideoOuter"
      v-if="isShowVideoPop"
      @closePop="_closePop"
    >
      <template v-slot:mainImg>
        <p class="tip">*仅支持腾讯、优酷视频链接</p>
        <div class="textarea_box">
          <!-- <cube-textarea
            v-model="textAreaValue"
            :indicator="indicator"
            :maxlength="maxlength"
            :autoExpand="autoExpand"
            :placeholder="area_holder"
            :autofocus="autofocus"
            @blur="blur"
          /> -->
          <textarea
            class="textarea_inner"
            v-model="textAreaValue"
            @blur="blur"
            :maxlength="maxlength"
            :autofocus="autofocus"
            :placeholder="area_holder"
          ></textarea>
        </div>
        <div style="height:70px;margin:5px 0" @click="_closePop"></div>
        <cube-button class="btn" @click="_uploadVideoUrl">
          确定
        </cube-button>
        <div style="height:100px;margin:5px 0" @click="_closePop"></div>
        <div class="attention">
          <p>注意：</p>
          <p>
            若不会操作想让平台收录该品牌/公司，<a
              href="http://ha4zvtftq0g3b4x1.mikecrm.com/bgLBY6y"
              >也可填写本表</a
            >
          </p>
        </div>
      </template>
    </dialog-img>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import UpLoadCrop from 'base/upload_crop/upload_crop'
import dialogImg from 'base/dialog/dialogImg'
import uploadData from 'common/js/mixins/upload_data'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { popToast } from 'common/js/cubePop'
import { imgPathUrl } from 'api/config'
export default {
  mixins: [routings, vuexData, uploadData],
  data() {
    return {
      isHide: false,
      isLogoVideo: '', // logo上传默认
      isLogoCover: '', // logo封面
      isUpLoadDef: true, // 默认未上传
      autoplay: false,
      swiperOption: {
        slidesPerView: 2.3
      },
      isCropperShow: false, // 裁剪显示
      uPicTipText: '提示：上传你的品牌LOGO！', // 裁剪提示文字
      uploadImg: '', // 上传头像
      aboutLogoList: [
        {
          url: 'https://zfile.bxwh002.cn/wmp/mp4/anhui.mp4',
          cover: ''
        },
        {
          url: 'https://zfile.bxwh002.cn/wmp/mp4/baoyin2.mp4',
          cover:
            'https://zfile.bxwh002.cn/wmp_upload_cover_201801_5a5f1688a852f.jpg'
        },
        {
          url: 'https://zfile.bxwh002.cn/wmp/mp4/anhui.mp4',
          cover:
            'https://zfile.bxwh002.cn/wmp_upload_cover_201801_5a5f17c2d8f92.jpg'
        },
        {
          url: 'https://zfile.bxwh002.cn/wmp/mp4/baoyin2.mp4',
          cover:
            'https://zfile.bxwh002.cn/wmp_upload_cover_201801_5a5f1688a852f.jpg'
        }
      ],
      maxlength: 200,
      area_holder:
        '在此粘贴需要上传的视频链接，不得上传与与所选品牌/公司无关的视频，否则将不允许通过！',
      isShowVideoPop: false, // 视频弹窗显示
      videoCls: 'videoCls', // 上传视频弹窗
      cnameVideoOuter: 'videoOuterCls',
      autofocus: true,
      indicator: false,
      autoExpand: true,
      textAreaValue: '' // textarea 输入内容
    }
  },
  computed: {
    // 是否显示关闭已选模板
    isChooseAboutIcon() {
      return this.isLogoVideo !== `${imgPathUrl}/default/general/up_video.png`
    }
  },
  activated() {
    this.isLogoVideo = `${imgPathUrl}/default/general/up_video.png`
    this.isLogoCover = `${imgPathUrl}/default/general/up_cover.png`
  },
  created() {},
  methods: {
    blur() {
      window.scrollTo(0, 0)
    },
    // 上传视频
    _uploadVideo() {
      // 上传视频链接
      this.isShowVideoPop = true
    },
    // 上传视频链接
    _uploadVideoUrl() {
      if (this.textAreaValue) {
        const html = this.textAreaValue.indexOf('.html') >= 0
        const isTx =
          this.textAreaValue.indexOf('https://v.qq.com/') >= 0 && html
        const isYk = this.textAreaValue.indexOf('youku.com/') >= 0 && html
        if (isTx || isYk) {
          this.setVideo()
        } else {
          const popToastObj = {
            _this: this,
            txt: '请添加正确的视频链接!'
          }
          popToast(popToastObj)
        }
      } else {
        const popToastObj = {
          _this: this,
          txt: '请添加视频链接!'
        }
        popToast(popToastObj)
      }
      console.warn(this.textAreaValue)
    },
    // 关闭弹窗
    _closePop() {
      this.isShowVideoPop = false
      window.scrollTo(0, 0)
    },
    // 选择模板
    _handleUpic(item, index) {
      this.aboutLogoList.map((v, i) => {
        this.$set(this.aboutLogoList[i], 'is_choose', false)
        this.$set(this.aboutLogoList[i], 'autoplay', false)
        this.$set(this.aboutLogoList[i], 'controls', false)
        if (index === i) {
          console.log(item)
          this.isUpLoadDef = false
          // this.isLogoVideo = item.url
          this.isLogoCover = item.cover
          // this.autoplay = true
          this.$set(this.aboutLogoList[index], 'autoplay', true)
          this.$set(this.aboutLogoList[index], 'is_choose', true)
          this.$set(this.aboutLogoList[index], 'controls', true)
        }
      })
    },
    // 确定上传
    _confirm(upic) {
      this.isCropperShow = false
      this.isLogoVideo = upic
    },
    // 完成logo设置
    _handleLogoDone() {
      // if (this.isChooseAboutIcon) {
      //   if (this.isLogoVideo.indexOf('base64') >= 0) {
      //     this.upload(0)
      //   } else {
      //     this.upload(1)
      //   }
      // } else {
      const popToastObj = {
        _this: this,
        txt: '请点击上方上传品牌!'
      }
      popToast(popToastObj)
      // }
    },
    // 删除已选好模板
    _removeAboutLogo() {
      this.isLogoVideo = `${imgPathUrl}/default/general/up_video.png`
    },
    // 设置上传url
    setVideo() {
      var _this = this
      this.$api.brand
        .setVideo({
          token: _this.token,
          url: _this.textAreaValue,
          bid: _this.vUserInfo.bid
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
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    swiper,
    swiperSlide,
    UpLoadCrop,
    dialogImg
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.container {
  .logo_inner {
    padding: 14px 25px;
    bgc(#fff);
    flex_column();
    align-items: center;
    margin-top: 56px;

    &:nth-child(3) {
      margin-top: 10px;
    }

    .brand_logo {
      width: 151px;
      height: 100px;
      position: relative;

      .uploadBox {
        position: absolute;
        width: 100%;
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
        width: 151px;
        height: 100px;
      }

      i {
        position: absolute;
        top: -6px;
        right: -6px;
        color: #FF9E22;
      }
    }

    p {
      margin-top: 12px;
      font-size: 13px;
      color: #999999;
      line-height: 25px;

      a {
        color: #FF9E22;
      }
    }
  }

  .about {
    margin-top: 10px;
    width: 100%;
    padding: 20px 0;
    bgc(#fff);

    p {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      margin-left: 15px;
    }

    .swiper-container {
      margin-top: 20px;

      .inner {
        width: 151px;
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

  >>>.videoOuterCls {
    .popup-mask {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  >>>.videoCls {
    width: 308px;
    overflow: hidden;
    padding: 10px 0 18px 0;
    left: 50%;
    top: 25%;
    margin-left: -154px;
    bd_r(3px);
    flex_column();

    // align-items: center;
    // justify-content: center;
    .tip {
      font-size: 12px;
      color: #fff;
    }

    .textarea_box {
      width: 100%;
      margin: 14px auto 0;
      border-radius: 5px;
      bgc(#fff);

      .textarea {
        width: 90%;
        margin: 10px;
        font-size: 14px;
        line-height: 20px;
        overflow: hidden;
        border: none;
      }

      .textarea_inner {
        width: 90%;
        margin: 10px;
        font-size: 14px;
        line-height: 20px;
        overflow: hidden;
        border: none;
        height: 60px;
      }
    }

    .cube-textarea-wrapper {
      width: 97%;
      margin: 5px 10px;
    }

    p {
      color: #999;
      font-size: 13px;
    }

    .btn {
      width: 100%;
      margin: 0px auto;
      height: 44px;
      background: linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1));
      border-radius: 5px;
    }

    .attention {
      font-size: 13px;

      p {
        color: #fff;
        line-height: 25px;

        a {
          color: #FF9E22;
        }
      }
    }
  }
}
</style>
