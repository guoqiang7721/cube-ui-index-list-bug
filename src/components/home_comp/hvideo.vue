<template>
  <div class="videoBox">
    <!-- :poster="Mine_Video.cover" -->
    <video
      :poster="Mine_Video.cover"
      controls="controls"
      x5-video-player-type="h5"
    >
      <source :src="Mine_Video.url" type="video/mp4" />
    </video>
  </div>
</template>
<script>
import vuexData from 'common/js/mixins/vuex_data'

export default {
  mixins: [vuexData],
  data() {
    return {}
  },
  props: {
    Mine_Video: {
      type: Object
    }
  }
}
</script>
<style lang="stylus" scoped>
.videoBox {
  margin: 0 auto;
  width: 89.3%;
  height: 221px;
  position: relative;
  z-index: 1;

  video {
    width: 100%;
    height: 100%;
  }
}
</style>
