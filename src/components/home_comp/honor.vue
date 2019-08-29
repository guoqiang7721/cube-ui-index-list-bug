<template>
  <div class="m-honor-list" :style="isFontCls">
    <div class="intro" v-for="(item, index) in Mine_Honor" :key="index">
      <img
        src="https://zfile.bxwh002.cn/img/default/home_honor_icon.png"
        alt="荣誉图标"
      />
      <p>{{ item.honor }}</p>
      <!-- <cube-button class="cube-btn" v-if="isHonorAudit === '3' && isCuBrand"
        >审核中</cube-button
      > -->
      <!--  -->
      <cube-button v-if="isAuditCls" :class="isAuditCls">{{
        isAuditText
      }}</cube-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Mine_Honor: {
      type: Array
    },
    isFontCls: {
      type: String
    },
    isHonorAudit: {
      type: String
    },
    isCuBrand: {
      type: Boolean
    },
    isAuditText: {
      type: String
    },
    isAuditCls: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>
.m-honor-list {
  margin: 0 auto;
  width: 89.3%;
  position: relative;
  z-index: 1;

  .intro {
    margin-top: 12px;
    display: flex;
    align-items: center;

    img {
      width: 21px;
      height: 21px;
      margin-right: 13px;
    }

    p {
      flex: 1;
      font-size: 12px;
      letter-spacing: 1.5px;
      line-height: 18px;
    }

    .cube-btn {
      width: auto;
      display: inline-block;
      padding: 3px 5px;
      font-size: 11px;
      color: #fff;
      margin-left: 8px;
      border-radius: 9px;

      &.act {
        background: linear-gradient(90deg, rgba(255, 194, 47, 1) 0%, rgba(255, 157, 34, 1) 100%);
      }

      &.err {
        background: linear-gradient(-90deg, rgba(215, 55, 40, 1) 0%, rgba(254, 85, 69, 1) 100%);
      }
    }
  }
}
</style>
