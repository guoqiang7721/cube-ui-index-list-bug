<template>
  <div :class="isEmptyCls">
    <img :src="isEmptyImgSrc" v-if="isEmptyImg" alt="" />
    <p v-if="isEmptyTitle">{{ isEmptyTitleText }}</p>
    <slot name="mainBtn"></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  activated() {},
  created() {},
  methods: {},
  props: {
    isEmptyImg: {
      type: Boolean,
      default: true
    },
    isEmptyImgSrc: {
      type: String
    },
    isEmptyTitle: {
      type: Boolean,
      default: true
    },
    isEmptyTitleText: {
      type: String
    },
    isEmptyCls: {
      type: String
    }
  }
}
</script>
<style lang='stylus' scoped></style>
