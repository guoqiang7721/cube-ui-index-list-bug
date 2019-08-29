import { ISNODE_ENV } from 'api/config'
import base from 'request/api/base'
export default {
  methods: {
    goBack() {
      this.$router.back()
    },
    goNext(path, params) {
      this.$router.push({ path: path, query: params })
    },
    goTel(tel) {
      window.location.href = 'tel:' + tel
    },
    goRoot(path) {
      window.location.href = path
    },
    getParams() {
      return this.$route.query
    },
    //
    goNewsIsDev() {
      if (ISNODE_ENV === 'development') {
        this.goNext('/news/all')
      } else {
        location.href = `${base.h5_news}/route/article`
      }
    }
  }
}
