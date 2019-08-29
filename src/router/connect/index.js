export default [
  // 人脉模块
  {
    path: '/connection/fair_index',
    // component: () => import('components/connection_comp/fair_index')
    component: resolve => require(['components/connection_comp/fair_index'], resolve),
    meta: {
      title: '人脉市集',
      allowShare: true
    }
  },
  {
    path: '/connection/fair_search',
    component: resolve => require(['components/connection_comp/fair_search'], resolve),
    meta: {
      title: '搜索人脉',
      allowShare: true
    }
  },
  // 直通车模块
  {
    path: '/train/index',
    component: resolve => require(['components/train/train'], resolve),
    meta: {
      title: '直通车'
    }
  },
  {
    path: '/train/city',
    component: resolve => require(['components/train_comp/train_city'], resolve),
    meta: {
      title: '直通车'
    }
  },
  {
    path: '/train/pay',
    component: resolve => require(['components/train_comp/train_pay'], resolve),
    meta: {
      title: '直通车'
    }
  },
  {
    path: '/train/aggrement',
    component: resolve => require(['components/train_comp/train_agreement'], resolve),
    meta: {
      title: '直通车'
    }
  },
  {
    path: '/train/pay_success',
    component: resolve => require(['components/train_comp/train_paySuccess'], resolve),
    meta: {
      title: '直通车'
    }
  },
  {
    path: '/train/pay_fail',
    component: resolve => require(['components/train_comp/train_payFail'], resolve),
    meta: {
      title: '直通车'
    }
  },
  // 即时通讯模块
  {
    path: '/chat',
    component: resolve => require(['components/connection_comp/chat_index'], resolve),
    meta: {
      title: '消息'
    }
  },
  {
    path: '/chat/ai',
    component: resolve => require(['components/connection_comp/chat_ai'], resolve),
    meta: {
      title: '消息'
    }
  },
  {
    path: '/chat/room',
    component: resolve => require(['components/connection_comp/chat_room'], resolve),
    meta: {
      title: '消息'
    }
  },
  // 人脉追踪模块
  {
    path: '/follow',
    component: resolve => require(['components/follow/follow'], resolve),
    meta: {
      title: '人脉追踪'
    }
  },
  {
    path: '/follow/course',
    component: resolve => require(['components/follow_comp/follow_course'], resolve),
    meta: {
      title: '追踪教程'
    }
  },
  {
    path: '/follow/detail',
    component: resolve => require(['components/follow_comp/follow_detail'], resolve),
    meta: {
      title: '人脉追踪'
    }
  },
  {
    path: '/follow/view_log',
    component: resolve => require(['components/follow_comp/follow_viewLog'], resolve),
    meta: {
      title: '人脉追踪'
    }
  },
  // 人脉探索
  {
    path: '/fairmatch',
    component: resolve => require(['components/fairmatch/fairmatch'], resolve),
    meta: {
      title: '人脉探索'
    }
  },
  {
    path: '/fairmatch/recommend',
    component: resolve => require(['components/fairmatch_comp/fairmatch_recommend'], resolve),
    meta: {
      title: '人脉推荐'
    }
  },
  // 附近的人
  {
    path: '/nearby',
    component: resolve => require(['components/connection_comp/nearby'], resolve),
    meta: {
      title: '附近的人',
      location: true
    }
  }
]
