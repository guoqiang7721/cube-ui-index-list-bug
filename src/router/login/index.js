export default [
  {
    path: '/login/create_card',
    // path: '/create_card',
    // component: () => import('components/login_comp/create_card')
    component: resolve => require(['components/login_comp/create_card'], resolve),
    meta: {
      requireAuth: true,
      title: '创建名片'
    }
  },
  {
    path: '/login/aggrement',
    component: resolve => require(['components/login_comp/aggrement'], resolve),
    meta: {
      title: '注册协议'
    }
  },
  {
    path: '/login',
    component: resolve => require(['components/login/login'], resolve),
    meta: {
      requireAuth: true,
      title: '创建名片'
    }
  },
  {
    path: '/author',
    component: resolve => require(['components/login_comp/author'], resolve),
    meta: {
      requireAuth: true,
      title: '授权'
    }
  }
]
