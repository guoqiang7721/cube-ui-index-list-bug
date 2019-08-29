<template>
  <div class="imgs-container">
    <img
      :src="item.url"
      v-for="(item, index) in Mine_Pic"
      :key="item.id"
      @click="handleImgsClick(index)"
    />
    <div class="m-elegant-modal" @click="gPay" v-if="noRoleId">
      <img src="https://zfile.bxwh002.cn/img/default/home_m_lock.png" alt="" />
      <p>开通VIP会员即可展示</p>
    </div>
  </div>
</template>
<script>
const gPay = 'gPay'
export default {
  data() {
    return {
      initialIndex: 0,
      previewList: []
    }
  },
  created() {
    if (this.Mine_Pic) this.previewList = this.Mine_Pic.map(i => i.url)
  },
  mounted() {
    window.onpopstate = () => {
      this.$createImagePreview().hide()
    }
  },
  methods: {
    gPay() {
      this.$emit(gPay)
    },
    handleImgsClick(index) {
      console.log(index)
      console.log(this.previewList)
      this.initialIndex = index
      const params = {
        $props: {
          imgs: this.previewList,
          initialIndex: 'initialIndex', // 响应式数据的key名
          loop: true
        },
        $events: {
          change: i => {
            // 必须更新 initialIndex
            this.initialIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
    }
  },
  props: {
    Mine_Pic: {
      type: Array,
      default: null
    },
    noRoleId: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.imgs-container {
  width: 89.3%;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 6px;
  }

  .m-elegant-modal {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #2b3042;
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 39.5px;
      height: 39.5px;
    }

    p {
      margin-top: 10px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
