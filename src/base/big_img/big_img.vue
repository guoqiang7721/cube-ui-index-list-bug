<template>
  <div class="img-view">
    <!-- 遮罩层 -->
    <div class="img-layer" @click="hideViewImg"></div>
    <div class="img">
      <img :src="imgSrc" />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    hideViewImg() {
      this.$emit('hideViewImg')
    }
  },
  props: {
    imgSrc: {
      type: String
    }
  }
}
</script>
<style scoped>
.img-view {
  /* position: relative; */
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/*遮罩层样式*/
.img-view .img-layer {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/*不限制图片大小，实现居中*/
.img-view .img img {
  max-width: 100%;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1000;
}
</style>
