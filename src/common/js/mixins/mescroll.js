import MescrollVue from 'mescroll.js/mescroll.vue'
export default{
  data () {
    return {
      mescroll: null,
      mescrollUp: {
        // callback: this._getList,
        noMoreSize: 5,
        // htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        toTop: {
          src: 'https://zfile.bxwh002.cn/img/common/mescroll-totop.png',
          offset: 1000
        },
        lazyLoad: {
          use: true
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
    next()
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    }
  },
  components: {
    MescrollVue
  }
}
// mescrollUp: {
//   callback: this._getList,
//   noMoreSize: 5,
//   toTop: {
//     src: 'https://zfile.bxwh002.cn/img/common/mescroll-totop.png',
//     offset: 1000
//   },
//   empty: {
//     warpId: 'dataList',
//     icon: 'https://zfile.bxwh002.cn/img/common/mescroll-empty.png',
//     tip: '<e>当前您没有人脉~</e><br><br><span>快去人脉市集<span>免费添加人脉吧~</span></span>',
//     btntext: '去添加', // 按钮,默认""
//     btnClick: function () { // 点击按钮的回调,默认null
//       alert('点击了按钮,具体逻辑自行实现')
//     }
//   },
//   lazyLoad: {
//     use: true
//   }
// },
