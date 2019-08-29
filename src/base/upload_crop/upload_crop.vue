<template>
  <div>
    <div class="btnList">
      <p class="tip">{{ tipText }}</p>
      <div>
        <cube-button
          class="btn"
          @click="cancel"
          :primary="true"
          :outline="true"
        >
          取消
        </cube-button>
        <cube-button
          class="btn"
          @click="confirm('base64')"
          :primary="true"
          :outline="true"
        >
          确定裁剪
        </cube-button>
      </div>
    </div>
    <div class="cropperBox">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :center-box="option.centerBox"
        @real-time="realTime"
        :high="option.high"
        @img-load="imgLoad"
      >
      </vue-cropper>
    </div>
    <!-- <div class="show-preview"
          :style="{'width': previews.w + 'px',
                'height': previews.h + 'px',
                'overflow': 'hidden', 'margin': '5px'}"
          >
        <div :style="previews.div">
          <img :src="previews.url" :style="previews.img">
        </div>
      </div> -->
    <div :style="previewStyle" class="show-preview">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img" />
      </div>
    </div>
    <div class="pop"></div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
const Cancel = 'cancel'
const Confirm = 'confirm'
const LoadErr = 'loaderr'
export default {
  data() {
    return {
      previews: {}, // 预览图
      previewStyle: {},
      isUpLoadBox: true
    }
  },
  methods: {
    // 取消
    cancel() {
      this.$emit(Cancel)
    },
    // 确认
    confirm(type) {
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          console.log('type === blog', data)
          var img = window.URL.createObjectURL(data)
          console.log('type === blog', img)
          this.$emit(Confirm, img)
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          // console.log('type === base64',data)
          this.$emit(Confirm, data)
        })
      }
    },
    // 实时预览函数
    realTime(data) {
      // console.log(data)
      // if (data.w < 100) return
      this.previews = data
      this.previewStyle = {
        width: data.w + 'px',
        height: data.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: 100 / data.w
      }
    },
    imgLoad(msg) {
      // console.log(msg)
      // 上传为非图片时
      if (msg === 'error') {
        // alert('请上传正确的图片!')
        this.$emit(LoadErr)
      }
    }
  },
  props: {
    option: {
      type: Object
    },
    tipText: {
      type: String,
      default: '注意：可展示你的微信二维码和推广码'
    }
  },
  components: {
    VueCropper
  }
}
</script>
<style lang="stylus" scoped>
.btnList {
  width: 100%;
  position: absolute;
  z-index: 11;
  top: 30px;

  .tip {
    text-align: center;
    width: 100%;
    font-size: 15px;
    color: #fff;
    margin-bottom: 20px;
  }

  >div {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .btn {
      width: 40%;
      padding: 10px 0;
    }
  }
}

.cropperBox {
  width: 100%;
  height: 300px;
  position: absolute;
  top: 120px;
  z-index: 11;
}

.show-preview {
  top: 430px;
  background-color: #fff;
  position: absolute;
  z-index: 11;
}

.pop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
}
</style>
