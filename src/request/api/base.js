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
// // dev
const server = 'http://server.axl188.com'
const h5 = 'http://h5.axl188.com'
// const h5 = 'http://h5.xyx001.cn'
// 投票跳转
const voteZx =
  'http://zx046.com/app/index.php?i=16&c=entry&do=RuningVote&m=zxjy_leader_vote'
const voteBx =
  'http://zx046.com/app/index.php?i=17&c=entry&do=RuningVote&m=bx_brand_vote'
const base = {
  h5:
    ISNODE_ENV === 'development'
      ? `${trunk3}/H5`
      : ISNODE_ENV === 'production'
        ? `${wmpv3}/H5`
        : `${server}/H5`,
  xcx:
    ISNODE_ENV === 'development'
      ? trunk3
      : ISNODE_ENV === 'production'
        ? `${wmpv3}/api`
        : `${server}/api`,
  h5_s:
    ISNODE_ENV === 'development'
      ? `${trunk3}/api`
      : ISNODE_ENV === 'production'
        ? `${wmpv3}/api`
        : `${server}/api`,
  // 支付
  pay:
    ISNODE_ENV === 'development'
      ? prod
      : ISNODE_ENV === 'production'
        ? pay
        : `${server}/pay`,
  // 正式跳转
  h5_url:
    ISNODE_ENV === 'development'
      ? staticUrl
      : ISNODE_ENV === 'production'
        ? prod
        : h5, //  tab 跳转
  // 跳转丶 授权丶 route
  h5_news:
    ISNODE_ENV === 'development'
      ? `${trunk3}/H5`
      : ISNODE_ENV === 'production'
        ? `${wmpv3}/H5`
        : `${server}/H5`, // tab news 跳转
  // 文章 列表页跳转
  h5_all:
    ISNODE_ENV === 'development'
      ? staticUrl
      : ISNODE_ENV === 'production'
        ? `${wmpv3}/H5`
        : `${server}/H5`, // 文章 列表页跳转
  api_x: api, // 文章列表新增
  voteZx: voteZx, // 投票zx跳转
  voteBx: voteBx // 投票bx跳转
}
export default base
