<template>
  <div class="brand_container">
    <cube-scroll ref="scroll">
      <ul v-if="isSelectShow">
        <li v-for="item in searchList" :key="item.id" @click="select(item)">
          <span></span>
          {{ item.name }}
        </li>
      </ul>
      <div class="nofind" v-if="isSelectShow">
        <p>找不到品牌？换简短的词再搜索试试？</p>
        <p class="small">
          如果还找不到，点击<span @click="creatBrand">创建成我的品牌</span>
        </p>
      </div>
    </cube-scroll>
  </div>
</template>
<script>
const creatBrand = 'creatBrand'
const select = 'select'
export default {
  data() {
    return {}
  },
  activated() {},
  created() {},
  methods: {
    // 选择品牌
    select(item) {
      this.$emit(select, item)
    },
    creatBrand() {
      this.$emit(creatBrand)
    }
  },
  props: {
    searchList: {
      type: Array
    },
    isSelectShow: {
      type: Boolean
    }
  }
}
</script>
<style lang='stylus' scoped>
.brand_container
  width 100%
  position fixed
  top 101px
  background #f5f5f5
  z-index 2
  bottom 0
  ul
    padding 0 10px
    background #fff
    li
      border-bottom 1px solid #f5f5f5
      font-size 12px
      line-height 50px
      height 50px
      padding-left 32.5px
      position relative
      color #999999
      &:after
        content ''
        display block
        width 13px
        height 13px
        border 1px solid #6f6f6f
        position absolute
        margin auto
        top 0
        bottom 0
        left 5px
        border-radius 3px
      span
        font-size 15px
        margin-right 10px
        color #333333
  .nofind
    text-align center
    padding 15px 0 30px 0
    p
      font-size 15px
      color #999999
      line-height 25px
      span
        color #ff9c27
        font-size 15px
    .small
      font-size 15px
</style>
