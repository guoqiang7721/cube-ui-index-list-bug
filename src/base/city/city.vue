<template>
  <div class="cityPicker" @click="showAddressPicker">
    <slot />
  </div>
</template>
<script>
// import { provinceList, cityList, areaList } from 'common/js/areaData'
import { provinceList, cityList } from 'common/js/areaData'
const addressData = provinceList
addressData.forEach(province => {
  province.children = cityList[province.value]
  // province.children.forEach(city => {
  //   city.children = areaList[city.value]
  // })
})
const SELECTHANDLE = 'selectHandle'
const CANCELHANDLE = 'cancelHandle'
export default {
  mounted() {
    this.addressPicker = this.$createCascadePicker({
      title: '请选择城市',
      data: addressData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    })
  },
  methods: {
    showAddressPicker() {
      this.addressPicker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.$emit(SELECTHANDLE, selectedVal, selectedIndex, selectedText)
    },
    cancelHandle() {
      this.$emit(CANCELHANDLE)
    }
  }
}
</script>
