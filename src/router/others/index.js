export default [
  // 404页面
  {
    path: '*',
    component: resolve => require(['base/NotFound/not_found'], resolve)
  },
  // 品牌模块
  {
    path: '/brand',
    component: resolve => require(['components/brand/brand'], resolve),
    meta: {
      title: '品牌选择'
    }
  },
  // 创建品牌/公司
  {
    path: '/brand/create',
    component: resolve =>
      require(['components/brand_comp/brand_create'], resolve),
    meta: {
      title: '品牌选择/公司'
    }
  },
  // 创建品牌/公司
  {
    path: '/brand/recreate',
    component: resolve =>
      require(['components/brand_comp/brand_recreate'], resolve),
    meta: {
      title: '品牌选择/公司'
    }
  },
  // 创建品牌/公司
  {
    path: '/brand/industry',
    component: resolve =>
      require(['components/brand_comp/brand_industry'], resolve),
    meta: {
      title: '选择行业'
    }
  },
  // 支付模块
  {
    path: '/pay',
    component: resolve => require(['components/pay/pay'], resolve),
    meta: {
      title: '开通会员'
    }
  },
  // 云店模块
  {
    path: '/shop',
    component: resolve => require(['components/shop/shop'], resolve),
    meta: {
      requireAuth: true,
      allowShare: true
    }
  },
  {
    path: '/shop/detail',
    component: resolve =>
      require(['components/shop_comp/goods_detail'], resolve)
  },
  // 文章详情
  {
    path: '/news/index',
    component: resolve => require(['components/news_comp/news_index'], resolve),
    meta: {
      allowShare: true
    }
  },
  // 清楚本地数据
  {
    path: '/removeLocal',
    component: resolve =>
      require(['base/remove_localdata/remove_localdata'], resolve)
  }
]
