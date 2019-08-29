import { popToast } from 'common/js/cubePop'
export default {
  data() {
    return {
      option: {
        // 裁剪object
        img: '',
        size: 0.6, // 裁剪生成图片质量
        full: false,
        outputType: 'png', // 裁剪生成图片格式
        canMove: true, // 能否拖动图片
        fixedBox: false, // 固定截图框大小 不允许改变
        original: false, // 上传图片按原始比例渲染
        canMoveBox: true, // 截图框能否拖动
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 只有自动截图开启 宽度高度才生效
        autoCropHeight: 150,
        centerBox: true, // 截图框限制在图片里
        high: true // 是否根据dpr生成适合屏幕的高清图片
      }
    }
  },
  methods: {
    // 取消裁剪
    _cancel() {
      this.isCropperShow = false
    },
    // 弹起cropper裁剪框
    _change(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.isCropperShow = true
      // console.log(this.getObjectURL(files[0]))
      this.option.img = this.getObjectURL(files[0])
    },
    // 当选择为非图片时
    _loaderr(err) {
      console.log(err)
      if (!err) {
        const popToastObj = {
          _this: this,
          txt: '请上传正确的图片!',
          time: 2000
        }
        popToast(popToastObj)
        this.isCropperShow = false
      }
    },
    // 转换图片url
    getObjectURL(file) {
      var url = null
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    }
  }
}
