// transform兼容
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
/* 删除数组中的某一个对象
_arr:数组
_obj:需删除的对象
*/
export function removeArray(_arr, _obj) {
  var length = _arr.length
  for (var i = 0; i < length; i++) {
    if (_arr[i] === _obj) {
      if (i === 0) {
        _arr.shift() // 删除并返回数组的第一个元素
        return _arr
      } else if (i === length - 1) {
        _arr.pop() // 删除并返回数组的最后一个元素
        return _arr
      } else {
        _arr.splice(i, 1) // 删除下标为i的元素
        return _arr
      }
    }
  }
}
