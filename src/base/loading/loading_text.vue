<template>
  <!-- <div> -->
    <cube-popup type="my-popup" ref="loading" v-show="isLoading">
        <img src="./loading.gif" class="icon_loading" alt="">
        <span>{{loadingText}}</span>
    </cube-popup>
  <!-- </div> -->
</template>
<script>
export default {
  data () {
    return {
      // isLaoding: true
    }
  },
  mounted () {
    // this.showLoading()
  },
  methods: {
    showLoading () {
      const component = this.$refs.loading
      component.show()
      // this.$emit('showLoading')
    },
    hideLoading () {
      const component = this.$refs.loading
      component.hide()
    }
  },
  props: {
    loadingText: {
      type: String,
      default: '加载中...'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.cube-popup_mask
  >>>.cube-popup-content
        display flex
        flex-direction row
        align-items center
        font-size 16px
  >>>.icon_loading
        width 30px
        height 30px
        margin-right 10px
// >>>.cube-popup
//       left 50%
// >>>.cube-popup_mask
//       left 50%
//       >>>.cube-popup-content
//             >>>.icon_loading
//               width 40px
//               height 40px

</style>
