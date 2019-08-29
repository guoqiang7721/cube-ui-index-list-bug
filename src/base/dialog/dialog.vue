<template>
  <div class="dialog">
    <div class="popup-mask" v-if="isMask" @click="closePop"></div>
    <div :class="[popup_content, cnameDialogP]">
      <i
        class="iconguanbi1 right_icon"
        @click="closePop"
        v-if="isIconClose"
      ></i>
      <i
        class="iconguanbi1 bot_icon"
        @click="closePop"
        v-if="isIconBotClose"
      ></i>
      <!-- <div class="dialog-title" ref="dialogTitle" :style="dialogTitleCls" v-if="popTitle"> -->
      <div class="dialog-title" ref="dialogTitle" v-if="popTitle">
        <span :class="cnameTitleCls" ref="dialogTitleSpan">
          {{ popTitle }}
        </span>
      </div>
      <div :class="[dialog_content, cnameDialogC]">
        {{ popContent }}
        <slot name="main"></slot>
      </div>
      <div class="dialog-btn-one" @click="confirmOneBtn" v-if="isOneBtn">
        {{ btnText.c }}
      </div>
      <div class="dialog-btns-two" v-else>
        <div class="btn_l" @click="closeLeft">
          {{ btnText.l }}
        </div>
        <div class="btn_r" ref="btnR" @click="confirmRight">
          <span :class="cnameBtnRCls" ref="dialogRightTextSpan">{{
            btnText.r
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const ConfirmRight = 'confirmRight'
const ConFirmOneBtn = 'confirmOneBtn'
const CloseLeft = 'closeLeft'
const ClosePop = 'closePop'
export default {
  data() {
    return {
      dialog_content: 'dialog-content',
      popup_content: 'popup-content',
      cnameTitleCls: '', // 添加title动画类
      cnameBtnRCls: '' // 添加右侧文字动画类
    }
  },
  computed: {
    // dialogTitleCls () {
    //   console.log('this.popTitleLen', this.popTitleLen)
    //   return this.popTitleLen > 10 ? 'fontSize:15px' : ''
    // }
  },
  mounted() {
    this.$nextTick(() => {
      // console.warn('mounted', this.popTitleLen)
      this.handleTitleText()
      this.handleRightBtnText()
    })
  },
  updated() {
    this.$nextTick(() => {
      // console.warn('updated', this.popTitleLen)
      this.handleTitleText()
      this.handleRightBtnText()
    })
  },
  methods: {
    // 处理title文字滚动
    handleTitleText() {
      const dialogTitleSpan = this.$refs.dialogTitleSpan
      const innerHtml = this.popTitle
      if (dialogTitleSpan) {
        if (this.popTitleLen > 10) {
          const dialogTitleLen = this.$refs.dialogTitle.offsetWidth
          let titleLen = dialogTitleSpan.offsetWidth
          if (dialogTitleLen && dialogTitleLen - titleLen < 100) {
            let inner = `${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}`
            this.$refs.dialogTitle.style.marginRight = '40px'
            this.$refs.dialogTitleSpan.innerHTML = inner
            this.cnameTitleCls = 'cname_title_animate'
          }
        } else {
          this.$refs.dialogTitleSpan.innerHTML = innerHtml
          this.$refs.dialogTitle.style.marginRight = '0'
          this.cnameTitleCls = ''
        }
      }
    },
    // 处理右侧文字按钮滚动
    handleRightBtnText() {
      const dialogRightTextSpan = this.$refs.dialogRightTextSpan
      const innerHtml = this.btnText.r
      if (dialogRightTextSpan) {
        if (this.cnameBtnRightLen > 4) {
          const btnR = this.$refs.btnR.offsetWidth
          if (
            dialogRightTextSpan.offsetWidth &&
            btnR - dialogRightTextSpan.offsetWidth < 10
          ) {
            let inner = `${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}&nbsp${innerHtml}`
            this.$refs.dialogRightTextSpan.innerHTML = inner
            this.cnameBtnRCls = 'cname_title_animate'
          }
        } else {
          this.$refs.dialogRightTextSpan.innerHTML = innerHtml
          this.cnameBtnRCls = ''
        }
      }
    },
    confirmRight() {
      this.$emit(ConfirmRight)
    },
    confirmOneBtn() {
      this.$emit(ConFirmOneBtn)
    },
    closeLeft() {
      this.$emit(CloseLeft)
    },
    closePop() {
      this.$emit(ClosePop)
    }
  },
  props: {
    isMask: {
      type: Boolean,
      default: true
    },
    isIconClose: {
      type: Boolean,
      default: true
    },
    isIconBotClose: {
      type: Boolean,
      default: false
    },
    popTitle: {
      type: String,
      default: null
    },
    cnameDialogP: {
      type: String
    },
    cnameDialogC: {
      type: String
    },
    popContent: {
      // content
      type: String,
      default: null
    },
    isOneBtn: {
      // 是否显示一个按钮
      type: Boolean,
      default: false
    },
    popTitleLen: {
      type: Number
    },
    cnameBtnRightLen: {
      type: Number
    },
    btnText: {
      // btnText
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 4;

  .popup-mask {
    z-index: 5;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .popup-content {
    width: 70%;
    border-radius: 5px;
    position: fixed;
    left: 15%;
    top: 25%;
    background: #fff;
    z-index: 6;

    .right_icon {
      color: #999;
      position: absolute;
      right: 5px;
      top: 8px;
    }

    .bot_icon {
      color: #999;
      position: absolute;
      bottom: -55px;
      left: 50%;
      transform: translate(-50%);
    }

    .dialog-title {
      text-align: center;
      font-size: 17px;
      height: 40px;
      line-height: 40px;
      color: #ffa532;
      border-bottom: 1px solid #E6E6E6;
      // width 70%
      // margin 0 auto
      // margin-right 40px
      // padding: 0 35px 0 15px;
      overflow: hidden;
      white-space: nowrap;
      // text-overflow: ellipsis;
    }

    .dialog-content {
      padding: 20px 10px 15px;
      border-bottom: 1px solid #ddd;
      color: #333;
      font-size: 15px;
      line-height: 25px;
      letter-spacing: 1px;
    }
  }

  .dialog-btn-one {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    bg_linear();
    // background-image: linear-gradient(90deg, #ffa532 0%, #ff6d38 100%);
    // color: #fff !important;
    border-radius: 0 0 5px 5px;
  }

  .dialog-btns-two {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    flex_row();
    font-size: 16px;
    overflow: hidden;

    .btn_l, .btn_r {
      flex: 1;
      height: 100%;
      bgc(#fff);
    }

    .btn_l {
      text-align: center;
      border-right: 1px solid #e6e6e6;
      box-sizing: border-box;
      color: #999;
      border-radius: 0 0 0px 5px;
      position: relative;
      z-index: 1;
    }

    .btn_r {
      color: #fff;
      bg_linear();
      // background-image: linear-gradient(90deg, #ffa532 0%, #ff6d38 100%);
      border-radius: 0 0 5px 0px;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
