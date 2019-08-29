<template>
  <!-- <div id="app" @touchmove.prevent> -->
  <div id="app">
    <keep-alive>
      <router-view></router-view>
      <!-- 比如新增和编辑，路由不同，组件一样，参数不同 vue默认缓存了 很bug -->
      <!-- <router-view :key="key"></router-view> -->
    </keep-alive>
  </div>
</template>
<script>
import vuexData from 'common/js/mixins/vuex_data'
export default {
  mixins: [vuexData],
  data() {
    return {}
  },
  computed: {
    // 解决方案也贼简单
    // key() {
    //   return this.$route.name !== undefined
    //     ? this.$route.name + +new Date()
    //     : this.$route + +new Date()
    // }
  },
  mounted() {
    const script = document.createElement('script')
    script.src =
      'https://s96.cnzz.com/z_stat.php?id=1277811859&web_id=1277811859'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    $route(to, from) {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        let isRoleId = this.vUserInfo.roleId === '2' ? '是' : '否'
        window._czc.push(['_setAccount', '1277811859'])
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
        window._czc.push(['_setCustomVar', '是否会员', isRoleId])
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import 'common/stylus/variable';

#app {
  background-color: $color-background;
}

#nprogress .bar {
  background: yellow;
}
</style>
