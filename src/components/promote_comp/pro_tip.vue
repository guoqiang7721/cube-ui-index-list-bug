<template>
  <div class='tip'>
        <div class='txt'>温馨提示：</div>
        <div class='txt'>
          1.若您使用银行卡提现，可能需要1-3天的时间才能到账。为了您能够快速提现，建议您使用储蓄卡提现！
        </div>
        <div class='txt'>
          2.提现将于2-3个工作日内完成，冻结中为已经提现待审核金额。
        </div>
        <div class='txt'>
         3.每笔提现征收5%的个人所得税。
        </div>
        <div class='txt'>
          4.最低提现额为100元。
        </div>
        <div class="txt">
          5.试用有效期为1个月，正式有效期为3个月，请及时提取。
        </div>
        <div>
          6.如有提现问题，请联系客服
          <a href="tel:13205259397">13205259397</a>。
        </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
  .tip
    padding: 5%  5%;
    font-size: 14px
    color: #666;
    margin-bottom: 45px
    .txt
      margin-bottom:5px
      line-height 20px
      letter-spacing 1px
      &:first-child
        font-size:14px;
        color:#252525
</style>
