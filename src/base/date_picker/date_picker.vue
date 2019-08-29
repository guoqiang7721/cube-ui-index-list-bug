<template>
  <div :class="[date_container,cname]" @click="_showDatePicker">
    <slot name="datePicker"></slot>
  </div>
</template>

<script>
import { DateYear, DateMonth, DateDay } from 'common/js/dateData'
const SELECTHANDLE = 'selectHandle'
const CANCELHANDLE = 'cancelHandle'
export default {
  data () {
    return {
      date_container: 'date_container'
    }
  },
  props: {
    cname: {
      type: String
    }
  },
  methods: {
    _showDatePicker () {
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createPicker({
          title: '日期选择',
          data: [DateYear, DateMonth, DateDay],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.mutiPicker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      console.log(123)
      this.$emit(SELECTHANDLE, selectedVal, selectedIndex, selectedText)
      // this.$createDialog({
      //   type: 'warn',
      //   content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
      //   icon: 'cubeic-alert'
      // }).show()
    },
    cancelHandle () {
      this.$emit(CANCELHANDLE)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
