export const getPreview = function({ previewList, index, _this } = {}) {
  _this.initialIndex = index
  console.log(_this)
  const params = {
    $props: {
      imgs: previewList,
      initialIndex: 'initialIndex', // 响应式数据的key名
      loop: true
    },
    $events: {
      change: i => {
        // 必须更新 initialIndex
        _this.initialIndex = i
      }
    }
  }
  _this.$createImagePreview({ ...params }).show()
}
