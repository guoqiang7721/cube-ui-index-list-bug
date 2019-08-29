<template>
  <!--附近的人  -->
  <div class="nearby" @click="_gNearBy">
    <div class="nearby_left">
      <p>
        附近的
        <span>人脉</span>
      </p>
      <div>
        <span>随时随地查看身边人脉</span>
        <span>GO></span>
      </div>
    </div>
    <div class="nearby_right">
      <img
        class="rm_kilo"
        src="https://zfile.bxwh002.cn/wmp/images/rm_kilo.png"
      />
      <span>500公里内人脉</span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    _gNearBy() {
      this.$emit('gNearBy')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

// 附近的人
.nearby {
  width: 100%;
  margin: 10px 0;
  background: #fff;
  height: 84px;
  font-size: 14px;
  color: #999;
  letter-spacing: 1px;

  .nearby_left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    float: left;
    margin-left: 5%;
    height: 100%;

    p {
      font-size: 19px;
      letter-spacing: 1px;
      color: #333;

      span {
        color: #ff7e2b;
      }
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;

      span:last-child {
        font-size: 13px;
        padding: 0px 2px;
        background-color: #ff5656;
        margin-left: 5px;
        color: #fff;
      }
    }
  }

  .nearby_right {
    height: 100%;
    float: right;
    margin-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }

    img {
      width: 53px;
      height: 53px;
      animation: _rotate_reverse_ 2.8s linear infinite;
    }
  }
}
</style>
