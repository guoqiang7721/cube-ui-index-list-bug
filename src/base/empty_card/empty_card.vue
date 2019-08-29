<template>
  <div class="empty_card">
    <slot/>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {

  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
  .empty_card
    width 100%
    margin 0 auto
    display flex
    flex-direction column
    align-items center

</style>
