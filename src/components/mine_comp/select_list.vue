<template>
  <div class="list_box">
    <m-list :Data="Edit" @_handleList="_gEdit" />
    <m-list :Data="Card" @_handleList="_gCard" />
    <m-list :Data="Vistor" @_handleList="_gVisit" />
    <!-- <m-list :Data='Invite' @_handleList="_gProWay"   /> -->
    <m-list :Data="Promote" @_handleList="_gPromote" v-if="isRoleId" />
    <m-list :Data="CardManage" @_handleList="_gManage" />
    <m-list :Data="Contact" @_handleList="_gService" />
    <m-list :Data="FourG" @_handleList="_gFourG" v-if="isShowFourG" />
    <split />
  </div>
</template>
<script>
import mList from 'base/m_list/m_list'
import routings from 'common/js/mixins/routings'
import { popDiaglogAlert } from 'common/js/cubePop'
import Split from 'base/split/split'
export default {
  mixins: [routings],
  data() {
    return {
      Edit: {
        leftText: '编辑信息',
        leftFont: 'iconpersonal_icon_xiugaiziliao'
      },
      Card: {
        leftText: '名片夹',
        leftFont: 'iconpersonal_icon_mpjia'
      },
      Vistor: {
        leftText: '访客数据',
        leftFont: 'iconpersonal_icon_shuju'
      },
      // Invite: {
      //   leftText: '邀请赚钱',
      //   leftFont: 'iconpersonal_icon_shuju'
      // },
      Promote: {
        leftText: '我的钱包',
        leftFont: 'iconpersonal_icon_qianbao'
      },
      CardManage: {
        leftText: '名片管理',
        leftFont: 'iconpersonal_icon_mpguanli'
      },
      Contact: {
        leftText: '专属客服',
        leftFont: 'iconpersonal_icon_lxkefu',
        isTip: true,
        isTipText: '加我获享1对1服务'
      },
      FourG: {
        leftText: '4G电话',
        leftFont: 'iconpersonal_icon_gdh'
      }
    }
  },
  props: {
    vid: {
      type: String
    },
    token: {
      type: String,
      default: ''
    },
    vUserInfo: {
      type: Object
    },
    isShowFourG: {
      type: Boolean
    }
  },
  computed: {
    isRoleId() {
      return this.vUserInfo.roleId === '2'
    }
  },
  components: {
    mList,
    Split
  },
  activated() {
    this._getUcenter()
  },
  methods: {
    // 访客人数显示
    _getUcenter() {
      var _this = this
      this.$api.userComp
        .getUcenter({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          const socialInfo = data.socialInfo
          const errCode = res.data.errCode
          if (errCode === 0) {
            const unReader =
              socialInfo.unReader > 99 ? '99+' : socialInfo.unReader
            if (unReader > 0) {
              this.$set(this.Vistor, 'isNum', true)
              this.$set(this.Vistor, 'isNumText', unReader)
            } else {
              this.$set(this.Vistor, 'isNum', false)
            }
          }
        })
    },
    _checkReaderData() {
      var _this = this
      this.$api.connection
        .checkReaderData({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {})
    },
    _gEdit() {
      this.goNext('/mine/edit')
    },
    _gCard() {
      this.goNext('/mine/name_card')
    },
    _gVisit() {
      if (this.isRoleId) {
        this._checkReaderData()
        this.goNext('/mine/vistor_data')
      } else {
        const proEwmObj = {
          _this: this,
          content: '设置此功能需要开通会员服务.',
          maskClosable: true,
          confirmBtnText: '去开通'
        }
        popDiaglogAlert(proEwmObj)
        return false
      }
    },
    popDiaglogAlertConfirm() {
      this._openMem()
    },
    _openMem() {
      this.goNext('/pay')
    },
    _gProWay() {
      this.goNext('/pro_way')
    },
    _gPromote() {
      this.goNext('/promote')
    },
    _gManage() {
      this.goNext('/mine/card_manage')
    },
    _gService() {
      this.goNext('/mine/service')
    },
    _gFourG() {
      this.$emit('gFourG')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.split {
  height: 50px;
}

.list_box {
  width: 100%;
  overflow-x: hidden;
  margin: 14px auto;
  border-radius: 5px;
}

.m_list_common {
  width: 354px;
  margin: 0 auto;

  >>>.m_right {
    border-bottom: 1px solid #e6e6e6;
  }

  &:nth-child(2), &:nth-child(4), &:nth-last-child(2) {
    >>>.m_right {
      border: none;
    }
  }

  &:nth-child(3) {
    margin-top: 10px;
  }

  &:nth-child(5) {
    margin-top: 10px;
  }
}
</style>
