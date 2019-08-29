<template>
  <div>
    <img src="https://zfile.bxwh002.cn/img/default/train_index_chat.png" @click="ask" class="online_service" alt="">
    <img src="https://zfile.bxwh002.cn/img/default/train_open_btn.png" @click='openTrain' class="open_train" alt="">
  </div>
</template>
<script>
const ASK = 'ask'
const openTrain = 'openTrain'
export default {
  data () {
    return {

    }
  },
  methods: {
    ask () {
      this.$emit(ASK)
    },
    openTrain () {
      this.$emit(openTrain)
    }
  }
}
</script>
<style lang="stylus" scoped>
.online_service
  width 60px
  height 60px
  position fixed
  bottom 20%
  left 3%
  z-index 1
.open_train
  width 100%
  height 72px
  position fixed
  bottom 0
  left 0
  z-index 1
</style>
