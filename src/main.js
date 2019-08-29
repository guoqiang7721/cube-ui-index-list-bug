import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import storage from 'storejs'
import Cookies from 'js-cookie'
import wxShare from 'common/js/wxShare'
import wxLocation from 'common/js/wxLocation'
import wxHideShare from 'common/js/wxHideShare'
import VueClipboard from 'vue-clipboard2'
import 'amfe-flexible'
import 'animate.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'common/stylus/index.styl'
import api from './request/api' // 导入api接口
Vue.prototype.$api = api // 将api挂载到vue的原型上
Vue.prototype.$storage = storage
Vue.prototype.$cookie = Cookies
Vue.prototype.$wxShare = wxShare
Vue.prototype.$wxHideShare = wxHideShare
Vue.prototype.$wxLocation = wxLocation
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(VueLazyLoad, {
  loading: 'https://zfile.bxwh002.cn/img/common/cover_square_def.jpg'
})
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 进度条
  if (to.meta.title) document.title = to.meta.title // 写入标题
  next()
})
router.afterEach((to, from) => {
  document.documentElement.scrollTop = 0
  NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
