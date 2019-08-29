<template>
  <div class="container">
    <header-com title="选择行业" @back="back" />
    <ul class="outer">
      <li
        class="inner"
        v-for="(type, index) in inDustry"
        @click="_handleType(type, index)"
        :key="type.id"
      >
        <div class="inner_top">
          <!-- <i class="iconyoujiantou" :class="typeIcon"></i> -->
          <i :class="type.icon"></i>
          <span>{{ type.name }}</span>
        </div>
        <ul class="inner_bot" v-if="type.select">
          <li
            v-for="(item, i) in type.data"
            :key="item.id"
            @click="_handleTypeItem(item, i, type, index)"
          >
            <span>{{ item.name }}</span
            ><i class="iconicon_xzzhuanhuan" v-if="item.active"></i>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import HeaderCom from 'base/header/header'

export default {
  mixins: [routings, vuexData],
  data() {
    return {
      inDustry: {}, // 行业数据
      searchName: ''
    }
  },
  computed: {
    typeIcon() {
      return true
    }
  },
  async activated() {
    // const { searchName } = this.getParams()
    // this.searchName = searchName
    this.inDustry = []
    this.getIndustry(this.industyName)
  },
  methods: {
    // 选择行业
    _handleType(type, index) {
      this.inDustry.filter((v, i) => {
        if (index === i) {
          if (!v.select) {
            this.$set(v, 'icon', 'iconxialazhuanhuan')
            this.$set(v, 'select', true)
          } else {
            this.$set(v, 'icon', 'iconyoujiantou')
            this.$set(v, 'select', false)
          }
        } else {
          this.$set(v, 'select', false)
          this.$set(v, 'icon', 'iconyoujiantou')
        }
      })
    },
    // 选择行业类别
    _handleTypeItem(v, index, t, i) {
      this.$set(v, 'active', true)
      this.setIndustyChoice(v)
      this.back()
      // this.inDustry.filter((s, i) => {
      //   console.log(s.data)
      //   if (s.data) {
      //     s.data.filter((e, i) => {
      //       this.$set(e, 'active', false)
      //       this.$set(v, 'active', true)
      //     })
      //   }
      // })
      // this.goNext('/brand/create')
    },
    // 获取行业数据
    getIndustry(searchName) {
      var _this = this
      this.$api.brand
        .getIndustry({
          token: _this.token,
          name: searchName
        })
        .then(
          res => {
            const data = res.data.data
            this.inDustry = data
            this.inDustry.filter((v, i) => {
              this.$set(this.inDustry[i], 'icon', 'iconyoujiantou')
            })
          },
          err => {
            console.log(err.data, 'err')
          }
        )
    },
    back() {
      this.goBack()
    }
  },
  watch: {
    // searchName(val, bef) {
    //   if (val !== bef) {
    //     this.getIndustry(this.industyName)
    //   }
    // }
  },
  components: {
    HeaderCom
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.container {
  >.outer {
    width: 100%;
    margin-top: 50px;
    color: #333333;
    font-size: 17px;
    bgc(#fff);

    >.inner {
      width: 100%;

      &:last-child {
        .top {
          // border-bottom: none;
        }
      }

      .inner_top {
        width: 100%;
        height: 46px;
        flex_row();
        align-items: center;
        bd_bt(#e6e6e6);

        i {
          margin: 0 5px 0 15px;
          color: #999;
          font-size: 14px;

          &.iconxialazhuanhuan {
            font-size: 12px;
          }
        }

        span {
          font-weight: bold;
        }
      }

      .inner_bot {
        li {
          flex_row();
          align-items: center;
          justify-content: space-between;
          height: 34px;
          line-height: 34px;
          bd_bt(#e6e6e6);
          color: #666666;
          font-size: 15px;
          margin-left: 35px;

          i {
            margin-right: 15px;
            font-size: 14px;
            color: #FF9E22;
          }
        }
      }
    }
  }
}
</style>
