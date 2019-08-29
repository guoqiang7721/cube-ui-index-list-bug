<template>
  <div>
    <header-com :title="title" @back="back" />
    <vistor-num :vistorData="vistorData" />
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul id="dataList">
        <list-base
          v-for="(item, index) in dataList"
          :key="index"
          @handleList="_gHome(item)"
        >
          <div slot="left" class="m_list_left">
            <img
              :imgurl="item.upic"
              src="https://zfile.bxwh002.cn/img/common/def_upic.png"
              alt=""
            />
          </div>
          <div slot="main" class="m_list_center">
            <p>{{ item.name }}</p>
            <span>{{ item.add_time }}</span>
          </div>
          <i class="iconjiantou" slot="right"></i>
        </list-base>
      </ul>
    </mescroll-vue>
  </div>
</template>
<script>
import ListBase from 'base/m_list_base/m_list_base'
import VistorNum from 'components/mine_comp/vistor_num'
import HeaderCom from 'base/header/header'
import vuexData from 'common/js/mixins/vuex_data'
import routings from 'common/js/mixins/routings'
import MescrollMixin from 'common/js/mixins/mescroll'
var _this_ = this
export default {
  mixins: [vuexData, routings, MescrollMixin],
  data() {
    return {
      title: '访客数据',
      vistorData: {}, // 曝光量等数据
      mescrollUp: {
        callback: this._getList,
        empty: {
          warpId: 'dataList',
          icon: 'https://zfile.bxwh002.cn/img/common/no_vistor_def.png',
          tip: '咦？推广力度不够？',
          btntext: '去推广',
          btnClick() {
            _this_.goNext('/home')
            // window.location.href = '/connection'
          }
        }
      },
      dataList: []
    }
  },
  created() {
    _this_ = this
  },
  activated() {
    this.getSummary()
    if (this.isGetList) this._getList()
  },
  methods: {
    _gHome(item) {
      if (item.mid) {
        this.goNext('/home', { uid: item.vid })
      } else {
        this.goNext('/mine/vistor_nocard')
      }
    },
    getSummary() {
      var _this = this
      this.$api.userComp
        .getSummary({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          this.vistorData = res.data.data
        })
    },
    _getList() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      this.$api.userComp
        .getReaders({
          vid: _this.vid,
          token: _this.token,
          page: pageNum
        })
        .then(
          res => {
            this.isGetList = true
            let arr = res.data.data || []
            if (pageNum === 1) this.dataList = []
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
    VistorNum,
    ListBase
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
}

>>>.empty-icon {
  width: 135px;
  height: 85.5px;
}

>>>.empty-btn {
  font-size: 16px;
  width: 214px;
  height: 22px;
  line-height: 22px;
  border: none;
  color: #fff;
  bg_linear();
}

.mescroll {
  position: fixed;
  top: 123px;
  bottom: 0;
  height: auto;
}

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 20px 0 10px;

    p {
      color: #252525;
      font-size: 16px;
    }

    span {
      color: #999;
      font-size: 14px;
      margin-top: 12px;
    }
  }
}
</style>
