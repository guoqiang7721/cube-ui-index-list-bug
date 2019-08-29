<template>
  <no-card
    class="container"
    isEmptyImgSrc="https://zfile.bxwh002.cn/img/common/no_vistor_def.png"
    isEmptyTitleText="当前用户尚未创建名片"
  >
    <template v-slot:mainBtn>
      <cube-button @click="back">返回</cube-button>
    </template>
  </no-card>
</template>
<script>
import NoCard from 'base/no_card/no_card'
import routings from 'common/js/mixins/routings'
export default {
  mixins: [routings],
  data() {
    return {}
  },
  activated() {},
  created() {},
  methods: {
    back() {
      this.goBack()
    }
  },
  components: {
    NoCard
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.container {
  margin-top: 80px;
  flex_column();
  justify-content: center;
  align-items: center;

  >>>img {
    width: 135px;
    height: 85px;
  }

  >>>p {
    font-size: 14px;
    color: #777;
    margin: 44px auto 30px;
  }

  .cube-btn {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    font-size: 15px;
    letter-spacing: 1px;
    padding: 0;
    background: linear-gradient(to right, #ffc22f, #ff9d22);
    color: #fff;
  }
}
</style>
