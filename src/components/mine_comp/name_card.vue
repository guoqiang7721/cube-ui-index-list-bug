<template>
  <div>
    <header-com :title="headerTitle" @back="back" />
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <list-base v-for="(item, index) in dataList" :key="item.vid">
          <div class="m_list_left" slot="left" @click="_gHome(item.vid)">
            <img
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/def_upic.png"
              alt=""
            />
          </div>
          <div slot="main" class="m_list_center" @click="_gHome(item.vid)">
            <p>{{ item.name }}</p>
            <div class="main_bottom">
              <button class="btn">{{ item.type }}</button>
              <span>{{ item.add_time }}</span>
            </div>
          </div>
          <div slot="right" class="m_list_right">
            <i class="iconrenmai_haoyou_icon_dianhua" @click="_call(item)"></i>
            <i class="iconrenmai_haoyou_icon_suliao" @click="_gChat(item)"></i>
            <i
              class="icondeletezhuanhuan"
              @click="_showPop(item.vid, index)"
            ></i>
          </div>
        </list-base>
      </ul>
    </mescroll-vue>
    <dia-log
      v-if="isDeletePop"
      :btnText="btnText"
      :popContent="popContent"
      :isIconClose="false"
      @confirmRight="_confirmDelete"
      @closeLeft="_closePop"
      @closePop="_closePop"
    />
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
// import EmptyCard from 'base/empty_card/empty_card'
import MescrollMixin from 'common/js/mixins/mescroll'
import ListBase from 'base/m_list_base/m_list_base'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import { popDiaglogAlert, popToast } from 'common/js/cubePop'
import base from 'request/api/base'
import { ISIOS } from 'api/config'
import diaLog from 'base/dialog/dialog'
import { remove } from 'common/js/getCommonInfo'

var _this_ = this
export default {
  mixins: [vuexData, routings, MescrollMixin],
  data() {
    return {
      headerTitle: '名片夹',
      hasCard: false,
      mescrollUp: {
        callback: this._getList,
        empty: {
          warpId: 'dataList',
          icon: 'https://zfile.bxwh002.cn/img/common/name_card_icon.png',
          tip:
            '<e>当前您没有人脉~</e><br><br><span>快去人脉市集<span>免费添加人脉吧~</span></span>',
          btntext: '去添加',
          btnClick() {
            _this_.goNext('/connection/fair_index')
            // window.location.href = '/connection'
          }
        }
      },
      dataList: [],
      isDeletePop: false, // 弹窗展示
      popContent: '', // 弹窗content内容
      btnText: '', // 弹窗button内容
      isDeleteIndex: '', // 删除者index
      isDeleteUid: '' // 删除者uid
    }
  },
  created() {
    _this_ = this
  },
  activated() {
    if (this.isList) this._getList()
  },
  methods: {
    // 关闭弹窗
    _closePop() {
      this.isDeletePop = false
    },
    // 弹窗内容
    _showDeletePop() {
      this.popContent = '确定删除该名片？不再收藏在名片夹里？'
      this.btnText = {
        l: '取消',
        r: '确认'
      }
      this.isDeletePop = true
    },
    // 删除收藏的人
    async _confirmDelete() {
      const isDone = await remove(this.token, this.vid, this.isDeleteUid)
      if (isDone.errCode === 0) {
        this.isDeletePop = false
        this.dataList.splice(this.isDeleteIndex, 1)
        const popToastObj = {
          _this: this,
          txt: isDone.data
        }
        popToast(popToastObj)
      }
    },
    // 显示弹窗
    _showPop(uid, i) {
      this.isDeleteUid = uid
      this.isDeleteIndex = i
      this._showDeletePop()
    },
    _gHome(vid) {
      if (ISIOS) {
        location.href = `${base.h5_url}/home?uid=${vid}`
      } else {
        this.goNext('/home', { uid: vid })
      }
    },
    // 拨打电话
    _call(i) {
      console.log(i)
      if (i.roleid === '1') {
        const proEwmObj = {
          _this: this,
          content:
            '当前用户尚未开通此功能, 您的联系请求已收集, 稍后会通知该用户.',
          maskClosable: true,
          confirmBtnText: '知道了'
        }
        popDiaglogAlert(proEwmObj)
      } else {
        this.goTel(i.show_tel)
      }
    },
    popDiaglogAlertConfirm() {},
    _gChat(i) {
      console.log(i)
      this.goNext('/chat/room', { chatId: i.vid })
    },
    // emptyBtn () {
    // },
    _getList() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      this.$api.userComp
        .getNameCard({
          vid: _this.vid,
          token: _this.token,
          page: pageNum
        })
        .then(
          res => {
            let arr = res.data.data || []
            if (pageNum === 1) this.dataList = []
            this.isList = true
            this.dataList = this.dataList.concat(arr)
            this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
          },
          err => {
            console.log(err, 'err')
            this.mescroll.endErr()
          }
        )
    },
    back() {
      this.goBack()
    }
  },
  components: {
    HeaderCom,
    // EmptyCard,
    ListBase,
    diaLog
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

>>>.empty-tip {
  color: #ff9125;
}

>>>.mescroll-empty {
  padding-top: 60px;

  >>>.empty-icon {
    width: 149px;
    height: 149px;
  }
}

>>>.empty-btn {
  font-size: 16px;
  width: 214px;
  height: 22px;
  line-height: 22px;
  border: none;
  color: #fff !important;
  bg_linear();
}

.mescroll {
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto;
}

.card {
  margin-top: 100px;

  .main_img {
    width: 150px;
    height: 150px;
    margin-bottom: 30px;
    p;
    color: #666;
    margin-bottom: 10px;
    font-size: 14px;

    span {
      color: #ff9125;
    }
  }

  .btn {
    btn(214px, 44px, '', '', $color-text, 5px);
    margin-top: 20px;
    bg_linear();
  }
}

// margin-top 54px
.m_list_outer {
  height: 70px;
  border-bottom: 1px solid #e6e6e6;

  &:last-child {
    border: none;
  }

  .m_list_left {
    margin-left: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .m_list_center {
    flex: 1;
    flex_column();
    // justify-content center
    margin: 0 20px 0 10px;

    p {
      color: #252525;
      font-size: 16px;
    }

    span {
      color: #999;
      font-size: 14px;
      margin-left: 8px;
    }

    .main_bottom {
      flex_row();
      margin-top: 12px;
      align-items: center;

      .btn {
        btn(46px, 18px, 12px, rgba(141, 162, 205, 0.69), $color-text, 2px);
      }

      span {
        font-size: 12px;
      }
    }
  }

  .m_list_right {
    margin-right: 10px;

    >>>i {
      margin-right: 10px;

      &.iconrenmai_haoyou_icon_dianhua {
        color: #ff9834;
      }

      &.iconrenmai_haoyou_icon_suliao {
        color: #80c420;
      }

      &:last-child {
        color: #f25252;
        margin-right: 0;
      }
    }
  }
}
</style>
