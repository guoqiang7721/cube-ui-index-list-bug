<template>
  <div class="plusBottom">
    <img src="https://zfile.bxwh002.cn/wmp/images/touxiang_icon.png" />
    <div>
      <span>大咖微名片Plus</span>
      <span class="sail">- 让销售人更厉害的名片 ! -</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.plusBottom
  flex_row()
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding-bottom: 20px;
  color: #666;
  margin-top: 40px
  img
    width: 31px
    height: 31px
  div
    flex_column()
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  .sail
    font-size: 10px
    color: #999;
    margin-top 5px
</style>
