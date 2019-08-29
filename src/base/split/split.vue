<template>
  <div class="split" :style="splitStyle"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    splitStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.split {
  margin: 0 auto;
}
</style>
