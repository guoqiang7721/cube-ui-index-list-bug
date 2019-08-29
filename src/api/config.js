export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

export const ERR_OK = 0

// ios判断
const u = navigator.userAgent
const iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

export const ISIOS = iOS

// 判断node环境
export const ISNODE_ENV = process.env.NODE_ENV
// 图片路径
export const imgPathUrl = 'https://zfile.bxwh002.cn/img'

// 内部人士手机号(开启调试工具)
export const phoneList = [
  '13812530591',
  '18626326159',
  '18936232970',
  '15250836698',
  '17368356698',
  '17715679451',
  '13093031850',
  '15604668681',
  '15861582384',
  '17600332672',
  '13771451773',
  '177123978453'
]
// 非品牌 非行业文章
export const isNorIndustryBrandList = [
  '1',
  '2',
  '3',
  '6',
  '10',
  '11',
  '12',
  '15',
  '16',
  '39',
  '40'
]
