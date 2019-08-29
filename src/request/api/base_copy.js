/**
 * 接口域名的管理
 */
import { ISNODE_ENV } from 'api/config'
// pro
const wmpv3 = 'https://wmpv3.bkbbx.cn'
const pay = 'http://pay.zj004.cn'
const prod = 'http://prod.zj004.cn'
const api = 'http://api.zj005.cn'
// test
const trunk3 = 'http://trunk3.zj004.cn'
const staticUrl = 'http://172.16.1.54'
// 投票跳转
const voteZx =
  'http://zx046.com/app/index.php?i=16&c=entry&do=RuningVote&m=zxjy_leader_vote'
const voteBx =
  'http://zx046.com/app/index.php?i=17&c=entry&do=RuningVote&m=bx_brand_vote'
// pro
// const base = {
//   h5: ISNODE_ENV ? `${trunk3}/H5` : `${wmpv3}/H5`,
//   xcx: ISNODE_ENV ? trunk3 : `${wmpv3}/api`,
//   h5_s: ISNODE_ENV ? `${trunk3}/api` : `${wmpv3}/api`,
//   pay: ISNODE_ENV ? prod : pay, // 支付
//   h5_url: ISNODE_ENV ? staticUrl : prod, // 正式跳转
//   h5_all: ISNODE_ENV ? staticUrl : `${wmpv3}/H5`, // 文章 列表页跳转
//   h5_news: ISNODE_ENV ? `${trunk3}/H5` : `${wmpv3}/H5`, // 跳转丶 授权丶 route
//   api_x: api, // 文章列表新增
//   voteZx: voteZx, // 投票zx跳转
//   voteBx: voteBx // 投票bx跳转
// }
// // dev
const server = 'http://server.axl188.com'
// const h5 = 'http://h5.axl188.com'
const h5 = 'http://h5.xyx001.cn'
// dev
const base = {
  h5: ISNODE_ENV ? `${trunk3}/H5` : `${server}/H5`,
  xcx: ISNODE_ENV ? trunk3 : `${server}/api`,
  h5_s: ISNODE_ENV ? `${trunk3}/api` : `${server}/api`,
  pay: ISNODE_ENV ? prod : `${server}/pay`, // 支付
  h5_url: ISNODE_ENV ? staticUrl : h5, //  tab 跳转
  h5_news: ISNODE_ENV ? `${trunk3}/H5` : `${server}/H5`, // tab news 跳转
  h5_all: ISNODE_ENV ? staticUrl : `${server}/H5`, // 文章 列表页跳转
  api_x: api, // 文章列表新增
  voteZx: voteZx, // 投票zx跳转
  voteBx: voteBx // 投票bx跳转
}
export default base
