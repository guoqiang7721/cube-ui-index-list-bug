import Vue from 'vue'
import Router from 'vue-router'
import footerConfig from './footer'
import loginConfig from './login'
import mineConfig from './mine'
import othersConfig from './others'
import promoteConfig from './promote'
import connectConfig from './connect'
Vue.use(Router)
const routes = [
  ...footerConfig,
  ...loginConfig,
  ...mineConfig,
  ...othersConfig,
  ...promoteConfig,
  ...connectConfig
]
export default new Router({
  mode: 'history',
  base: '/',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
