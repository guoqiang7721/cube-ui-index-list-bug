export default [
  {
    path: '/',
    redirect: '/brand'
  },
  {
    path: '/home',
    // component: () => import('components/home/home')
    component: resolve => require(['components/home/home'], resolve),
    meta: {
      requireAuth: true,
      allowShare: true
    }
  },
  {
    path: '/news/all',
    component: resolve => require(['components/news/all'], resolve),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/mine',
    component: resolve => require(['components/mine/mine'], resolve),
    meta: {
      requireAuth: true,
      title: '个人中心'
    }
  },
  {
    path: '/connection',
    component: resolve =>
      require(['components/connection/connection'], resolve),
    meta: {
      requireAuth: true,
      title: '人脉'
    }
  }
]
