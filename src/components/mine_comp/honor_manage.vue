<template>
  <div>
    <header-com title="荣誉设置" @back="back" />
    <div class="honor_inner">
      <ul class="honor_list">
        <li v-for="(item, index) in addList" :key="index">
          {{ item.honor }}
          <i
            class="iconguanbi1"
            v-if="!item.is_choose"
            @click="_removeAddItem(item, index)"
          ></i>
        </li>
      </ul>
      <div class="textarea_box">
        <cube-textarea
          class="textarea"
          v-model="textAreaValue"
          :indicator="indicator"
          :autoExpand="autoExpand"
          :placeholder="area_holder"
        />
      </div>
      <cube-button class="add_btn" @click="_addTextAreaHonor"
        >确认添加</cube-button
      >
      <div class="tip">
        <p>
          如果想收录该品牌/公司，<a
            href="http://ha4zvtftq0g3b4x1.mikecrm.com/bgLBY6y"
            >也可填写本表</a
          >
        </p>
      </div>
    </div>
    <!-- 相关 -->
    <div class="about">
      <p class="tip">相关荣誉</p>
      <ul class="honor_list" v-if="honorList">
        <li
          v-for="(item, index) in honorList"
          :key="item.id"
          @click="_handleAddHonor(item, index)"
        >
          {{ item.honor }}
          <img
            class="act"
            v-if="item.is_choose"
            src="https://zfile.bxwh002.cn/img/default/general/icon_checked.png"
            alt=""
          />
        </li>
      </ul>
      <p class="no_data" v-else>暂无相关荣誉</p>
    </div>
    <div style="height:50px"></div>
    <cube-button class="save_btn" @click="_save">保存</cube-button>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import { popToast } from 'common/js/cubePop'
import { imgPathUrl } from 'api/config'
import { removeArray } from 'common/js/dom'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      // honorList: [
      //   { sort: '175', honor: '2016年荣膺最具影响力品牌企业桂冠' },
      //   { sort: '177', honor: '2016年荣获WTA十年“金牌”营养守护奖' }
      // ],
      honorList: [], // 相关荣誉列表
      addList: [], // 添加列表
      indicator: false,
      autoExpand: true,
      textAreaValue: '', // textarea 输入内容
      area_holder: '请添加下一条荣誉。'
    }
  },
  computed: {
    // 是否显示关闭已选模板
    isChooseAboutIcon() {
      return (
        this.isLogoImg !== `${imgPathUrl}/default/general/up_brand_logo.png`
      )
    }
  },
  activated() {
    this.isLogoImg = `${imgPathUrl}/default/general/up_brand_logo.png`
    this.addList = []
    this.getRelatedHonor()
  },
  created() {},
  methods: {
    // 添加荣誉
    _handleAddHonor(item, index) {
      this.honorList.map((v, i) => {
        if (index === i) {
          if (!v.is_choose) {
            this.$set(v, 'is_choose', true)
            this.addList.push(v)
          } else {
            this.$set(v, 'is_choose', false)
            removeArray(this.addList, v)
          }
        }
      })
    },
    // 删除荣誉
    _removeAddItem(item, index) {
      this.addList.splice(index, 1)
    },
    // 自己输入添加荣誉
    _addTextAreaHonor() {
      if (this.textAreaValue.trim()) {
        let sort = 1
        const obj = {
          honor: this.textAreaValue.trim(),
          sort: sort++
        }
        this.addList.push(obj)
        this.textAreaValue = ''
      }
    },
    // 保存
    _save() {
      if (this.addList.length > 0) {
        this.setHonor()
      } else {
        const popToastObj = {
          _this: this,
          txt: '请上传你的品牌荣誉!'
        }
        popToast(popToastObj)
      }
    },
    // 设置荣誉
    setHonor() {
      var _this = this
      this.$api.brand
        .setHonor({
          token: _this.token,
          bid: _this.vUserInfo.bid,
          data: JSON.stringify(_this.addList)
        })
        .then(res => {
          const msg = res.data.msg
          const errCode = res.data.errCode
          if (errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: '上传成功'
            }
            popToast(popToastObj)
            setTimeout(() => {
              this.back()
            }, 800)
          } else {
            const popToastObj = {
              _this: this,
              txt: msg
            }
            popToast(popToastObj)
          }
        })
    },
    // 获取相关荣誉
    getRelatedHonor() {
      var _this = this
      this.$api.brand
        .getRelatedHonor({
          token: _this.token,
          bid: _this.vUserInfo.bid
        })
        .then(res => {
          const data = res.data.data
          console.warn(data)
          const errCode = res.data.errCode
          if (errCode === 0) {
            this.honorList = data
          }
        })
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
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.honor_inner {
  width: 100%;
  padding: 14px 0;
  // flex_column();
  // align-items: center;
  margin-top: 46px;

  .textarea_box {
    margin: 14px 15px 0;
    // margin: 14px auto 0;
    border-radius: 10px;
    bgc(#fff);

    .textarea {
      width: 90%;
      margin: 10px;
      font-size: 14px;
      line-height: 20px;
      overflow: hidden;
      border: none;
    }
  }
}

.about {
  margin-top: 10px;
  width: 100%;
  padding: 20px 0;

  p.tip {
    color: #333;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 15px 15px;
  }

  .no_data {
    color: #999;
    font-size: 14px;
    margin: 20px auto;
    text-align: center;
  }
}

.honor_list {
  margin: 0 15px;

  li {
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
    }

    background-color: #fff;
    color: #333;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 5px;
    line-height: 25px;
    letter-spacing: 1.5px;
    position: relative;

    .act {
      width: 29px;
      height: 29px;
      position: absolute;
      right: 0;
      bottom: 0;
    }

    .iconguanbi1 {
      position: absolute;
      top: -6px;
      right: -6px;
      color: #FF9E22;
    }
  }
}

.tip {
  margin: 12px auto 0;

  p {
    font-size: 13px;
    color: #999999;
    line-height: 25px;
    text-align: center;

    a {
      color: #FF9E22;
    }
  }
}

.add_btn {
  width: 62%;
  margin: 15px auto 0;
  height: 44px;
  background: linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1));
  border-radius: 5px;
}

.save_btn {
  width: 100%;
  height: 44px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: linear-gradient(-90deg, rgba(255, 157, 34, 1), rgba(255, 194, 47, 1));
}
</style>
