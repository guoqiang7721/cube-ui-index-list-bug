<template>
  <div class="auth_container">
    <img class="shareBg" src="https://zfile.bxwh002.cn/img/default/author_shareBg.png" alt="">
    <img class="logo" src="https://zfile.bxwh002.cn/img/default/author_logo.png" alt="">
    <section class="btm">
      <img src="https://zfile.bxwh002.cn/img/default/author_icon_tengxun.png" alt="">
      <span>腾讯云提供计算服务</span>
    </section>
  </div>
</template>

<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { urlParseDecode } from 'common/js/util'
import base from 'request/api/base'
export default {
  mixins: [routings, vuexData],
  created () {
    console.log('---author location.href----', (location.href))
    console.log('---author urlParseDecode', urlParseDecode())
    const { token, uid, cid, nid } = urlParseDecode()
    console.log('----授权 拿到 getParams token, uid---', token, uid)
    if (!token) { // this.token不存在且location中存在token
      this.isLogin(uid, cid, nid)
    } else {
      if (!this.token) this.setToken(token)
      this.getData(uid)
      console.log('----author 有token情况下', token)
    }
  },
  methods: {
    isLogin (uid, cid, nid) {
      const url = encodeURI(location.href)
      // const url = encodeURI(`${location.href}&uid=${uid}&proid=${uid}&cid=${cid}&nid=${nid}`)
      location.href = `${base.h5}/NewWeixin/isLogin?redirect_url=${url}&uid=${uid}&proid=${uid}`
      console.warn('----授权---', location.href)
    },
    async getData (uid) {
      const dataIds = await this.getIds(uid)
      await this.getAuthInfo(dataIds, uid)
    },
    getIds (uid) {
      var _this = this
      return new Promise(resolve => {
        this.$api.login.getIds({
          token: _this.token,
          uid: uid
        }).then(res => {
          console.log('---res--getIds', res)
          const data = res.data.data
          resolve(data)
          this.setIds(data)
        })
      })
    },
    getAuthInfo (dataIds) {
      var _this = this
      this.$api.login.getAuthInfo({
        token: _this.token
      }).then(res => {
        const data = res.data.data
        const { userInfo, token } = data
        console.log('---getAuthInfo---', res.data.data)
        this.setVid(data.vid)
        this.setVUserInfo(userInfo)
        this.setToken(token)
        this.setBid(userInfo.bid)
        this.setMid(userInfo.mid)
        this.setVBrandInfo({
          id: userInfo.bid,
          name: userInfo.brand
        })
        const { gvid, guid } = dataIds
        // eslint-disable-next-line eqeqeq
        if (gvid == guid) { // 自己看自己的情况下
        // if (data.vid === uid) { // 自己看自己的情况下
          console.log('---看自己名片时')
          if (!userInfo.mid) {
            this.goNext('/login/create_card')
          } else {
            console.warn('this.$storage.getfullPath', this.$storage.get('fullPath'))
            console.log('---redirect ---看自己名片时', this.$route.query.redirect)
            this.$storage.remove('reloadHome')
            this.$storage.remove('reloadNews')
            // this.$router.push(this.$route.query.redirect)
            const fullPathUrl = this.$storage.get('fullPath')
            const redirectUrl = this.$route.query.redirect
            if (fullPathUrl) {
              this.$router.push(fullPathUrl)
            } else {
              this.$router.push(redirectUrl)
            }
          }
        } else {
          console.log('---redirect ---非自己名片时', this.$route.query)
          console.log('---redirect ---非自己名片时', this.$route.query.redirect)
          // const redirectUrl = this.$route.query.redirect
          // this.$router.push(redirectUrl)
          const fullPathUrl = this.$storage.get('fullPath')
          const redirectUrl = this.$route.query.redirect
          if (fullPathUrl) {
            this.$router.push(fullPathUrl)
          } else {
            this.$router.push(redirectUrl)
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
  .shareBg
    width 100%
    height 450px
  .logo
    display block
    margin 20px auto
    width 276px
    height 24.5px
  .btm
    margin-top 50px
    flex_row()
    justify-content center
    img
      width 19px
      height 13.5px
      margin-right 10px
    span
      font-size 13px
      color #999
</style>
