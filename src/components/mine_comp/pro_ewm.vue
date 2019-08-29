<template>
  <div>
    <HeaderCom :title="title" @back="back" />
    <div class="list_container">
      <list-base>
        <div slot="left" class="m_list_left">
          <span>允许文章底部带推广码</span>
        </div>
        <div slot="right" class="m_list_right">
          <cube-switch v-model="proEwmSwitch" />
        </div>
      </list-base>
      <list-base v-show="istextareaClsShow">
        <div slot="left" class="m_list_tl">
          <span>推广二维码</span>
        </div>
        <div slot="main" class="m_list_center">
          <span class="ewm_text">(将会在你的每篇H5文章的底部显示)</span>
        </div>
        <div slot="right" class="m_list_tr">
          <img class="ewm_upload" :src="proEwmUpLoad" alt="" />
        </div>
        <div slot="addCont" class="uploadBox">
          <input type="file" id="change" accept="image/*" @change="_change" />
        </div>
      </list-base>
      <up-load-crop
        v-show="isCropperShow"
        @confirm="_confirm"
        @cancel="_cancel"
        :option="option"
        @loaderr="_loaderr"
      >
      </up-load-crop>
      <list-base :cname="textareaCls" v-show="istextareaClsShow">
        <div slot="left" class="m_list_tl">
          <span>推广签名</span>
        </div>
        <div slot="main" class="m_list_center">
          <cube-textarea
            v-model="extraUserInfo.ad_sign"
            :maxlength="maxlength"
            :autoExpand="true"
            :placeholder="ad_sign_holder"
          />
        </div>
      </list-base>
    </div>
    <cube-button class="btn" @click="_save" :primary="true">保存</cube-button>
    <div class="example_tip"><span>示例</span></div>
    <div class="example_img">
      <img :src="proEwmFootImg" alt="" />
    </div>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import uploadData from 'common/js/mixins/upload_data'
import ListBase from 'base/m_list_base/m_list_base'
import UpLoadCrop from 'base/upload_crop/upload_crop'
import { popToast, popDialogBtn } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData, uploadData],
  data() {
    return {
      title: '推广二维码',
      extraUserInfo: {}, // vuex赋值数据
      proEwmSwitch: '', // 推广码switch
      ad_sign_holder: '请输入您的推广签名.', // 推广签名holder
      maxlength: 24,
      textareaCls: 'textareaCls', // textarea 样式
      proEwmFootImg: '', // 底部二维码图片显示
      istextareaClsShow: '', // 是否显示推广二维码(base proEwmSwitch)
      isCropperShow: false, // 裁剪显示
      proEwmUpLoad: '' // 推广二维码icon
    }
  },
  created() {
    // 深拷贝个人信息 以便更改
    this.extraUserInfo = Object.assign({}, this.vUserInfo)
    // 推广二维码icon
    this.proEwmUpLoad =
      this.extraUserInfo.ad_pic ||
      'https://zfile.bxwh002.cn/img/common/icon_ewm_upload.png'
    this._getPro_Active()
  },
  methods: {
    // 确认裁剪
    _confirm(upic) {
      this.isCropperShow = false
      this.proEwmUpLoad = upic
      this.setAdPhoto(upic)
    },
    // 获取推广二维码显示状态
    _getPro_Active() {
      const status = this.vUserInfo.status
      status === '1' ? (this.proEwmSwitch = true) : (this.proEwmSwitch = false)
    },
    // 上传推广二维码
    setAdPhoto(upic) {
      var _this = this
      this.$api.edit
        .setAdPhoto({
          vid: _this.vid,
          token: _this.token,
          upic: upic
        })
        .then(res => {
          const data = res.data.data
          this.setVUserInfo(data)
          const msg = res.data.msg
          const errCode = res.data.errCode
          if (errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: '上传成功'
            }
            popToast(popToastObj)
          } else {
            const popToastObj = {
              _this: this,
              txt: msg
            }
            popToast(popToastObj)
          }
        })
    },
    // 保存信息
    _save() {
      var _this = this
      this.$api.edit
        .updateAdInfo({
          vid: _this.vUserInfo.vid,
          token: _this.token,
          ad_sign: _this.extraUserInfo.ad_sign,
          qr_status: _this.proEwmSwitch ? 1 : 2 // switch
        })
        .then(
          res => {
            console.log('res', res)
            const data = res.data.data
            this.setVUserInfo(data)
            const popToastObj = {
              _this: this,
              txt: '保存成功',
              mask: true
            }
            popToast(popToastObj)
            const timer = setTimeout(() => {
              this.goBack()
            }, 800)
            this.$once('hook:beforeDestroy', () => {
              clearTimeout(timer)
            })
          },
          err => {
            console.log('err', err)
          }
        )
    },
    // 确定弹窗
    popDialogBtnConfirm() {},
    // 关闭弹窗
    popDialogBtnCancel() {
      this.proEwmSwitch = true
    },
    back() {
      this.goBack()
    }
  },
  watch: {
    // 底部二维码切换
    proEwmSwitch(val, bef) {
      if (!val && bef !== '') {
        const proEwmObj = {
          _this: this,
          content:
            '关闭后，别人将无法从文章底部看到您的推广二维码，建议保持开启。',
          confirmBtnText: '继续关闭',
          maskClosable: true
        }
        popDialogBtn(proEwmObj)
      }
      this.istextareaClsShow = !!val
      this.proEwmFootImg = val
        ? 'https://zfile.bxwh002.cn/wmp/images/bc_example2.png'
        : 'https://zfile.bxwh002.cn/wmp/images/bc_example1.png'
    }
  },
  components: {
    HeaderCom,
    ListBase,
    UpLoadCrop
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.cube-switch {
  >>>.cube-switch-ui {
    background-color: #ffc22f !important;
    border-color: #ccc !important;
  }
}

.list_container {
  margin-top: 56px;

  .m_list_outer {
    height: 44px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;

    &:nth-child(2) {
      margin-top: 15px;
    }

    &:last-child, &:first-child {
      border-bottom: none;
    }

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
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

    .m_list_tl {
      width: 38%;
      margin-left: 3%;
      color: #c00;

      span {
        color: #333;
      }
    }

    .m_list_center {
      width: 43%;
      margin-right: 10px;

      .cube-input-field {
        width: 80%;
      }

      .ewm_text {
        font-size: 12px;
        color: #999;
      }
    }

    .m_list_tr {
      flex: 1;

      // margin 0 0px 0 10px
      .ewm_upload {
        width: 18px;
        height: 18px;
      }
    }

    .m_list_left {
      width: 50%;
      height: 46px;
      line-height: 46px;
      margin: 0 10px 0 12px;
    }

    .m_list_right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
    }
  }

  .textareaCls {
    height: auto;
    padding: 5px 0;

    .m_list_center {
      flex: 1;
      margin-right: 10px;
    }
  }
}

.example_tip {
  position: relative;
  width: 90%;
  margin: 0 auto 30px;
  text-align: center;
  padding: 0 auto 27.5px;

  &::after {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    height: 1px;
    background: #dcdcdc;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
  }

  span {
    font-size: 14px;
    color: #666666;
    padding: 0 27.5px;
    line-height: 2;
    background: #f5f5f5;
    position: relative;
    z-index: 3;
  }
}

.example_img {
  width: 260px;
  margin: 0 auto 30px;

  img {
    width: 100%;
  }
}

.btn {
  btn(338px, 40px, '', '', $color-text, 5px);
  margin: 30px auto;
  bg_linear();
}
</style>
