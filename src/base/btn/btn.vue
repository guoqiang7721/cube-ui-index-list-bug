<template>
  <cube-button :primary="true" :outline="true" :style="colorStyle">
    {{ msg }}
    <slot />
  </cube-button>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    colorStyle: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.cube-btn {
  margin: 0 auto;
  padding: 0;
}
</style>
