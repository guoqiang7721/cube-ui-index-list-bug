<template>
  <div class="m-brand-news" :style="isFontCls">
    <div class="m-news-first" @click="_gNewsDetail(Mine_News_F)">
      <img class="left" :src="Mine_News_F.cover" />
      <div class="right">
        <span class="right_title">{{ Mine_News_F.title }}</span>
        <div class="right_detail">
          <button>{{ Mine_News_F.catename }}</button>
          <img :src="Mine_Info.upic" alt="" />
          <span class="right_detail_name">{{ Mine_Info.name }}</span>
          <span class="right_detail_time"
            >更新于{{ Mine_News_F.add_time }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="m-news-container"
      @click="_gNewsDetail(item)"
      v-for="(item, index) in Mine_News_L"
      :key="index"
    >
      <i class="circle"></i>
      <div class="left_title ">
        <span>{{ item.title }}</span>
      </div>
      <button>{{ item.catename }}</button>
    </div>
  </div>
</template>
<script>
const GNewsDetail = 'gNewsDetail'
export default {
  methods: {
    _gNewsDetail(i) {
      this.$emit(GNewsDetail, i)
    }
  },
  props: {
    Mine_Info: {
      type: Object
    },
    Mine_News_F: {
      type: Object,
      default: null
    },
    Mine_News_L: {
      type: Array,
      default: null
    },
    isFontCls: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-brand-news {
  width: 89.3%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;

  // color: #fff;
  .m-news-first {
    width: 100%;
    display: flex;
    flex-direction: row;

    .left {
      width: 84px;
      height: 69px;
      margin-right: 2%;
      border-radius: 5px;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;

      .right_title {
        padding-top: 4px;
        font-size: 15px;
        // height: 30px;
        height: 36px;
        line-height: 19px;
        two_txt_cut();
      }

      .right_detail {
        font-size: 11px;
        color: #999;
        // margin-top: 12px;
        margin-top: 9px;
        display: flex;
        flex-direction: row;
        align-items: center;

        button {
          font-size: 11px;
          padding: 1px 2px;
          border-radius: 4px;
          float: left;
          border: 1px solid #ffa332;
          color: #ffa332;
          background: none;
        }

        img {
          width: 15px;
          height: 15px;
          margin: 0 5px 0 13px;
          border-radius: 50%;
        }

        .right_detail_name {
          width: 60px;
          one_txt_cut();
        }

        .right_detail_time {
          flex: 1;
          text-align: right;
        }
      }
    }
  }

  .m-news-container {
    margin: 0 auto;
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    z-index: 2;
    line-height: 20px;

    .circle {
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background-color: #999;
      margin-right: 2%;
    }

    .left_title {
      one_txt_cut();
      flex: 1;
      font-size: 13.5px;
    }

    button {
      font-size: 11px;
      padding: 1px 2px;
      border-radius: 2px;
      border: 1px solid #ffa332;
      color: #ffa332;
      background: none;
    }
  }
}
</style>
