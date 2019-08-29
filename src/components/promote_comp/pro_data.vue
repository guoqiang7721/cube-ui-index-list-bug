<template>
  <div class="spread" @click="_gProData">
    <div>
      <div class="spread_text">
        推广数据
      </div>
    </div>
    <div class="spread_total">
      <div class="spread_data">
        <p>
          <span>{{ proInfo.tempCnt }}</span
          >人
        </p>
        <span class="open">已创建</span>
      </div>
      <div class="line"></div>
      <div class="spread_data">
        <span
          ><span>{{ proInfo.openCnt }}</span
          >人</span
        >
        <span class="open">已开通</span>
      </div>
    </div>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
export default {
  mixins: [routings],
  data () {
    return {

    }
  },
  props: {
    proInfo: {
      type: Object,
      default: null
    }
  },
  methods: {
    _gProData () {
      this.goNext('/promote/pro_num')
    }
  }
}
</script>
<style lang="stylus" scoped>
.spread {
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.spread_text {
  width: 91px;
  height: 27px;
  text-align: center;
  line-height: 27px;
  color: #fff;
  background: linear-gradient(to right, #ff402c, #ff5910);
  border-bottom-left-radius: 13.5px;
  border-bottom-right-radius: 13.5px;
  font-size: 16px;
  margin: 0 auto;
}

.spread_total {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: #ff6445;
  font-size: 24px;
  text-align: center;
}

.spread .line {
  width: 1px;
  height: 25px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  background-color: #e4e4e4;
}

.spread .open {
  color: #666;
  font-size: 13px;
  margin-top: 5px;
}

.spread_total .spread_data {
  width: 50%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
