<template>
  <div>
    <header-com :title="headerTitle" @back="back" />
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul class="ai_content" id="dataList">
        <li v-for="item in dataList" :key="item.id">
          <div class="time">{{ item.add_time }}</div>
          <div class="item">
            <img
              class="item-l"
              src="https://zfile.bxwh002.cn/img/common/msg_icon_upic.png"
              alt=""
            />
            <div class="item-r">
              <div class="top">{{ item.content }}</div>
              <div
                class="bot"
                @click="_gHome(item.fromid)"
                v-if="item.tid !== '0'"
              >
                <img class="icon-art" :src="item.img" alt="" />
                <span class="look-text">查看对方名片</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import MescrollMixin from 'common/js/mixins/mescroll'
import base from 'request/api/base'
import { ISIOS } from 'api/config'
export default {
  mixins: [routings, vuexData, MescrollMixin],
  data() {
    return {
      headerTitle: '消息',
      dataList: [], // ai列表
      mescrollUp: {
        callback: this.getList,
        empty: {
          warpId: 'dataList'
        }
      }
    }
  },
  methods: {
    // 去首页
    _gHome(id) {
      if (ISIOS) {
        location.href = `${base.h5_url}/home?uid=${id}`
      } else {
        this.goNext('/home', { uid: id })
      }
    },
    // ai列表详情
    getList() {
      var _this = this
      const pageNum = _this.mescrollUp.page.num
      this.$api.connection
        .getTrace({
          vid: _this.vid,
          token: _this.token,
          page: pageNum
        })
        .then(
          res => {
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
    HeaderCom
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.mescroll {
  position: fixed;
  top: 46px;
  bottom: 0px;
  height: auto;
}

.ai_content {
  // width: 100%;
  // margin-top: 56px;
  // padding-bottom: 45px;
  li {
    margin-bottom: 15px;

    .time {
      width: 137px;
      height: 21px;
      line-height: 21px;
      text-align: center;
      margin: 0 auto;
      background-color: #cecece;
      border-radius: 3px;
      font-size: 11px;
      color: #fff;
    }

    .item {
      margin-top: 17px;
      width: 100%;
      display: flex;

      .item-l {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin: 0 12px;
        position: relative;
      }

      .item-r {
        flex: 1;
        margin-right: 15px;
        position: relative;
        background: #fff;
        padding: 12.5px 10px 12.5px 10px;

        .top {
          font-size: 13px;
          letter-spacing: 2px;
          color: #333;
          line-height: 20px;
        }

        .bot {
          margin-top: 10px;
          background-color: #f5f5f5;
          padding: 6.5px;
          display: flex;
          align-items: center;
          color: #333;

          .icon-art {
            width: 50px;
            height: 39.5px;
            margin-right: 15px;
          }

          .look-text {
            font-size: 13px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>
