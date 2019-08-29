export default [
  {
    path: '/promote',
    component: resolve => require(['components/promote/pro_index'], resolve),
    meta: {
      title: '我的钱包'
    }
    // children: [
    //   {
    //     path: 'pro_add',
    //     component: () => import('components/promote_comp/pro_add')
    //   }
    // ]
  },
  {
    path: '/promote/pro_edit',
    component: resolve => require(['components/promote_comp/pro_edit'], resolve),
    meta: {
      title: '银行卡'
    }
  },
  {
    path: '/promote/pro_num',
    component: resolve => require(['components/promote_comp/pro_num'], resolve),
    meta: {
      title: '订单中心'
    }
  },
  {
    path: '/pro_way',
    component: resolve => require(['components/promote_comp/pro_way'], resolve)
  }
]
