import storage from 'storejs'
import store from '../../store'
import { ISIOS } from 'api/config'
// 获取区间随机数
export const getRandomNumber = function(n1, n2) {
  if (arguments.length === 2) {
    // randomNumber(5,10)
    // 返回5-10的随机整数，包括5，10
    return Math.round(n1 + Math.random() * (n2 - n1))
  } else if (arguments.length === 1) {
    // randomNumber(10)
    // 返回0-10的随机整数，包括0，10
    return Math.round(Math.random() * n1)
  } else {
    // randomNumber()
    // 返回0-255的随机整数，包括0，255
    return Math.round(Math.random() * 255)
  }
}
export function urlParseDecode(path) {
  let url =
    decodeURIComponent(window.location.search) || decodeURIComponent(path)
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach(item => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
export function parseQuery(path) {
  let o = {}
  let queryString = location.href.split('?')[1] || path
  if (queryString) {
    queryString.split('&').forEach(item => {
      let [key, val] = item.split('=')
      val = val ? decodeURI(val) : true
      //          转码         无值赋值true
      if (o.hasOwnProperty(key)) {
        //   已有属性转为数组
        o[key] = [].concat(o[key], val)
      } else {
        o[key] = val
      }
    })
  }
  return o
}
/*
 * 这个函数用来解析来自URL的查询串中的name=value参数对
 * 它将name=value对存储在一个对象的属性中，并返回该对象
 * 这样来使用它
 *
 * var args = urlArgs(); // 从URL中解析参数
 * var q = args.q || ""; // 如果参数定义了的话就使用参数；否则使用一个默认值
 * var n = args.n ? parseInt(args.n) : 10;
 */
export function urlArgs() {
  var args = {} // 定义一个空对象
  var query = location.search.substring(1) // 查找到查询串，并去掉'? '
  var pairs = query.split('&') // 根据"&"符号将查询字符串分隔开
  for (var i = 0; i < pairs.length; i++) {
    // 对于每个片段
    var pos = pairs[i].indexOf('=') // 查找"name=value"
    if (pos == -1) continue // 如果没有找到的话，就跳过
    var name = pairs[i].substring(0, pos) // 提取name
    var value = pairs[i].substring(pos + 1) // 提取value
    value = decodeURIComponent(value) // 对value进行解码
    args[name] = value // 存储为属性
  }
  return args // 返回解析后的参数
}
// ios刷新
export function refreshIsIos(isReload) {
  const reloadIsIos = storage.get(isReload)
  if (ISIOS && !reloadIsIos && store.state.mid) {
    storage.set(isReload, 1)
    // this.$router.go(0)
    window.location.reload()
  }
}
export function getUrlToken() {
  const urlParse = urlParseDecode()
  const { token } = urlParseDecode()
  if (token) {
    let arr = []
    Object.keys(urlParse).forEach(k => {
      if (k !== 'token') {
        arr.push(k + '=' + urlParse[k])
      }
    })
    let newArr = arr.join('&')
    if (newArr) {
      location.href = `${location.origin}${location.pathname}?${newArr}`
    } else {
      location.href = `${location.origin}${location.pathname}`
    }
  }
}
