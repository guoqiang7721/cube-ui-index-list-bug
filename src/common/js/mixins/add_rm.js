import { add, addTrace, remove } from 'common/js/getCommonInfo'
import { popToast } from 'common/js/cubePop'
export default {
  data() {
    return {
      isPopRm: false,
      cnameRm: 'cnameRm',
      cnameRm_C: 'cnameRm_C'
    }
  },
  computed: {
    isRoleId() {
      return this.vUserInfo.roleId === '2'
    },
    popRmImg() {
      return !this.isRoleId
        ? 'https://zfile.bxwh002.cn/img/default/fair_sharetip_com.png'
        : 'https://zfile.bxwh002.cn/img/default/fair_sharetip_role2.png'
    }
  },
  methods: {
    _add(vid, index) {
      add(this.token, this.vid, vid)
        .then(res => {
          if (res.errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: res.data
            }
            popToast(popToastObj)
            this.$set(this.dataList[index], 'isAdd', 1)
            // 通知对方
            addTrace(this.token, this.vid, vid)
          } else if (res.errCode === 1004) {
            this.isPopRm = true
          } else if (res.errCode === 1005) {
            const popToastObj = {
              _this: this,
              // txt: '该用户人脉展现次数已满。正式会员人脉展现次数高达5条，更多事业展现机会！'
              txt: '该用户人脉展现次数已满。正式会员更多事业展现机会！'
            }
            popToast(popToastObj)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    _cancel(vid, index) {
      remove(this.token, this.vid, vid)
        .then(res => {
          if (res.errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: res.data
            }
            popToast(popToastObj)
            console.log(this)
            // this.dataList[index].isAdd = 0
            // this.dataList = this.dataList
            this.$set(this.dataList[index], 'isAdd', 0)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 关闭人脉关注
    _closePopRm() {
      this.isPopRm = false
    },
    _gPay() {
      this.goNext('/pay')
    }
  }
}
