export default [
  {
    path: '/mine/name_card',
    // component: () => import('components/mine_comp/name_card')
    component: resolve => require(['components/mine_comp/name_card'], resolve),
    meta: {
      title: '名片夹'
    }
  },
  {
    path: '/mine/demo',
    component: resolve => require(['components/mine_comp/demo'], resolve),
    meta: {
      title: '名片夹'
    }
  },
  {
    path: '/mine/vistor_data',
    component: resolve =>
      require(['components/mine_comp/vistor_data'], resolve),
    meta: {
      title: '访客数据'
    }
  },
  {
    path: '/mine/vistor_nocard',
    component: resolve =>
      require(['components/mine_comp/vistor_nocard'], resolve),
    meta: {
      title: '访客数据'
    }
  },
  {
    path: '/mine/card_manage',
    component: resolve =>
      require(['components/mine_comp/card_manage'], resolve),
    meta: {
      title: '名片管理'
    }
  },
  {
    path: '/mine/edit',
    component: resolve => require(['components/mine_comp/edit'], resolve),
    meta: {
      title: '修改资料'
    }
  },
  {
    path: '/mine/pro_manage',
    component: resolve => require(['components/mine_comp/pro_manage'], resolve),
    meta: {
      title: '推广设置'
    }
  },
  {
    path: '/mine/bg_music',
    component: resolve => require(['components/mine_comp/bg_music'], resolve),
    meta: {
      title: '背景音乐 '
    }
  },
  {
    path: '/mine/photo_manage',
    component: resolve =>
      require(['components/mine_comp/photo_manage'], resolve),
    meta: {
      title: '图片管理'
    }
  },
  {
    path: '/mine/pro_ewm',
    component: resolve => require(['components/mine_comp/pro_ewm'], resolve),
    meta: {
      title: '推广二维码'
    }
  },
  {
    path: '/mine/group_ewm',
    component: resolve => require(['components/mine_comp/group_ewm'], resolve),
    meta: {
      title: '群二维码'
    }
  },
  {
    path: '/mine/service',
    component: resolve => require(['components/mine_comp/service'], resolve),
    meta: {
      title: '专属客服'
    }
  },
  {
    path: '/mine/logo_manage',
    component: resolve =>
      require(['components/mine_comp/logo_manage'], resolve),
    meta: {
      title: 'LOGO设置'
    }
  },
  {
    path: '/mine/video_manage',
    component: resolve =>
      require(['components/mine_comp/video_manage'], resolve),
    meta: {
      title: '视频设置'
    }
  },
  {
    path: '/mine/honor_manage',
    component: resolve =>
      require(['components/mine_comp/honor_manage'], resolve),
    meta: {
      title: '荣誉设置'
    }
  }
]
