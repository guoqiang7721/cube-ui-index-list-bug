<template>
  <!-- 分类选择 -->
  <div class="type_container">
    <cube-scroll ref="scroll" id="scrollBrand">
      <div class="type_header">
        <p class="change_text" @click="_gBrand">修改 ></p>
        <span class="title">公司/品牌</span>
        <div class="brand_container">
          <p><i>!</i>品牌一年只能修改<em>3</em>次哦</p>
          <span>{{ vUserInfo.brand }}</span>
        </div>
      </div>
      <div class="type_main">
        <span class="title">关注的类别</span>
        <div v-for="(cidItem, index) in newAllCids" :key="index">
          <ul class="title">
            <li
              v-for="(item, index) in cidItem"
              :key="item.mid"
              :class="_isSelectCls(item)"
              @click="_toggleChooseType(item, index)"
            >
              {{ item.name }}
            </li>
          </ul>
          <ul class="childCls" :class="isChildShow == index ? 'show' : ''">
            <li
              v-for="(item, index) in childList"
              @click="_toggleChooseTypeChild(item)"
              :class="_isSelectCls(item)"
              :key="index"
            >
              <i></i>
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="btnCls" @click="_confirm">
        <span>确定</span>
      </div>
    </cube-scroll>
  </div>
</template>
<script>
const confirm = 'confirm'
const gBrand = 'gBrand'
export default {
  data() {
    return {
      childList: [] // 子元素List
    }
  },
  activated() {},
  created() {},
  methods: {
    _gBrand() {
      this.$emit(gBrand)
    },
    // 选择子类别
    _toggleChooseTypeChild(e) {
      let selectNum = this.selectMidList
      if (!selectNum) {
        this.selectMidList = e.mid
      } else {
        let index = selectNum.indexOf(e.mid)
        if (index > -1) {
          selectNum.splice(index, 1)
          this.selectMidList = selectNum
        } else {
          selectNum.push(e.mid)
          this.selectMidList = selectNum
        }
      }
    },
    // 切换选中item
    _toggleChooseType(e, index) {
      let selectNum = this.selectMidList
      if (typeof e.sub !== 'undefined') {
        this.childList = e.sub
        // eslint-disable-next-line eqeqeq
        if (this.isChildShow == index) {
          this.isChildShow = -1
        } else {
          this.isChildShow = index
        }
      } else {
        this.isChildShow = -1
        if (!selectNum) {
          this.selectMidList = e.mid
        } else {
          let index = selectNum.indexOf(e.mid)
          if (e.is_lock) {
            // eslint-disable-next-line eqeqeq
            if (e.is_lock == 1) {
              // eslint-disable-next-line eqeqeq
              if (index == -1) {
                selectNum.push(e.mid)
                this.selectMidList = selectNum
              }
            }
          } else {
            if (index > -1) {
              selectNum.splice(index, 1)
              this.selectMidList = selectNum
            } else {
              selectNum.push(e.mid)
              this.selectMidList = selectNum
            }
          }
        }
      }
    },
    // 确定选择
    _confirm() {
      this.$emit(confirm)
    },
    // 判断是否需选中类别(计算类)
    _isSelectCls(e) {
      let selectMidList = this.selectMidList
      if (typeof e.is_lock !== 'undefined') {
        // eslint-disable-next-line eqeqeq
        if (e.is_lock == 1) {
          let index = selectMidList.indexOf(e.mid)
          // eslint-disable-next-line eqeqeq
          if (index == -1) {
            selectMidList.push(e.mid)
            this.selectMidList = selectMidList
          }
          return 'lock'
        }
      } else {
        if (typeof e.sub === 'undefined') {
          if (selectMidList.indexOf(e.mid) > -1) {
            return 'active'
          }
        } else {
          let catesub = e.sub
          for (var i = 0; i < catesub.length; i++) {
            if (typeof catesub[i].is_lock !== 'undefined') {
              // eslint-disable-next-line eqeqeq
              if (catesub[i].is_lock == 1) {
                // eslint-disable-next-line eqeqeq
                if (selectMidList.indexOf(catesub[i].mid) == -1) {
                  selectMidList.push(catesub[i].mid)
                  this.selectMidList = selectMidList
                }
                return 'lock'
              }
            } else {
              if (selectMidList.indexOf(catesub[i].mid) > -1) {
                return 'active'
              }
            }
          }
        }
      }
    }
  },
  props: {
    vUserInfo: {
      type: Object
    },
    newAllCids: {
      type: Array
    },
    selectMidList: {
      type: Array
    },
    isChildShow: {
      type: Number
    }
  }
}
</script>
<style lang='stylus' scoped>
#scrollBrand {
  margin-right: 0;
}

.type_container {
  background: #fff;
  position: fixed;
  top: 52px;
  width: 100%;
  overflow-y: auto;
  bottom: 45px;
  z-index: 3;

  .title {
    line-height: 22.5px;
    font-size: 14px;
    color: #666666;
  }

  .type_header {
    padding: 11px 3%;
    border-bottom: 8.5px solid #f5f5f5;

    .change_text {
      width: 47.5px;
      line-height: 22.5px;
      font-size: 14px;
      color: #999;
      border-radius: 11px;
      text-align: center;
      float: right;
    }

    .brand_container {
      margin-top: 10px;

      p {
        float: right;
        font-size: 12px;
        color: #999999;
        line-height: 15px;
        margin-top: 20px;

        i {
          display: inline-block;
          width: 11px;
          height: 11px;
          line-height: 11px;
          text-align: center;
          color: #fff;
          background: #ffb125;
          margin-right: 6.5px;
          font-size: 12px;
          border-radius: 50%;
        }

        em {
          color: #ffb125;
        }
      }

      span {
        display: inline-block;
        font-size: 14px;
        color: #ff9c27;
        border: 1px solid #ff9c27;
        border-radius: 3px;
        // width:155px;
        padding: 0 10px;
        line-height: 34px;
        text-align: center;
      }
    }
  }

  .type_main {
    padding: 11px 3%;

    .title {
      margin-top: 10px;

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      li {
        width: 22%;
        float: left;
        margin: 0 4% 13px 0;
        background: #eceef4;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        color: #999;
        line-height: 35px;
        box-sizing: border-box;
        border: 1px solid #eceef4;

        &:nth-child(4n) {
          margin-right: 0;
        }
      }

      li.active {
        border: 1px solid #ff9c27;
        color: #fe981f;
        background: #fff;
      }

      li.lock {
        border: 1px solid #ff9c27;
        color: #fe981f;
        background: url('https://zfile.bxwh002.cn/img/default/news_tab_lock.png') no-repeat right top;
        background-size: 21px 21px;
      }
    }

    .childCls {
      display: none;
      background: #f5f6f9;
      margin-bottom: 13px;
      padding: 17.5px 0 0 15px;

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      li {
        float: left;
        margin: 0 30px 17.5px 0;
        font-size: 13px;
        color: #666666;
        line-height: 14px;

        i {
          display: inline-block;
          width: 13px;
          height: 13px;
          margin-right: 9px;
          background: #fff;
          border: 1px solid #6f6f6f;
          border-radius: 2px;
          vertical-align: top;
        }
      }

      li.active, li.lock {
        border-bottom: none;

        i {
          background: #ff9c27;
          border: 1px solid #ff9c27;
          position: relative;

          &:after {
            content: '';
            display: block;
            width: 13px;
            height: 13px;
            background: url('https://zfile.bxwh002.cn/img/default/news_tab_check.png') no-repeat center center;
            background-size: 100% 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }

      li.lock {
        i {
          background: #cccccc;
          border: 1px solid #cccccc;
        }
      }
    }
  }

  .btnCls {
    // width:92%;
    margin: 0 auto;
    height: 40px;
    background: #f5f5f5;
    padding: 12.5px 0;
    // background:linear-gradient(to right,#ffc22f,#ff9d22);
    font-size: 16px;
    letter-spacing: 2px;
    color: #fff;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;

    span {
      display: block;
      width: 92%;
      margin: 0 auto;
      background: linear-gradient(to right, #ffc22f, #ff9d22);
      font-size: 16px;
      letter-spacing: 2px;
      color: #fff;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
