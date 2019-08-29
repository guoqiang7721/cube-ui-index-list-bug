<template>
  <div>
    <p>清除本地数据</p>
    <cube-button class="brand_btn" @click="_remove">一键清除</cube-button>
  </div>
</template>
<script>
import { popToast } from 'common/js/cubePop'
import vuexData from 'common/js/mixins/vuex_data'
export default {
  mixins: [vuexData],
  data() {
    return {}
  },
  activated() {},
  created() {},
  methods: {
    _remove() {
      this.delSessionAndToken()
    },
    // 清除seesion
    delSessionAndToken() {
      var _this = this
      this.$api.userComp
        .delSessionAndToken({
          token: _this.token
        })
        .then(
          res => {
            const errCode = res.data.errCode
            if (errCode === 0) {
              const cookieObj = this.$cookie.get()
              Object.keys(cookieObj).forEach(e => {
                this.$cookie.remove(e)
              })
              window.localStorage.clear()
              const popToastObj = {
                _this: this,
                txt: '清除成功!'
              }
              popToast(popToastObj)
            }
          },
          err => {
            console.log(err.data, 'err')
          }
        )
    }
  }
}
</script>
<style lang='stylus' scoped>
p {
  text-align: center;
  margin: 100px auto 60px;
  color: #FF9E22;
  font-size: 30px;
}

.brand_btn {
  width: 82%;
  margin: 50px auto 0;
  height: 44px;
  background: linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1));
  border-radius: 5px;
}
</style>
