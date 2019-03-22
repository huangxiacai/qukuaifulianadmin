import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    meta: {
      title: '用户管理',
      notCache: true,
      access:['admin','kefu','hqy','wz','my','manager'],
    },
    component: Main,
    children: [
      {
        path: 'accessManage',
        name: 'accessManage',
        meta: {
          title: '用户帐号管理',
          notCache: true
        },
        component: () => import('@/view/child-view/userManage/accessManage.vue')
      },
      {
        path: 'userActiveValue',
        name: 'userActiveValue',
        meta: {
          title: '用户活跃度福利值',
          notCache: true
        },
        component: () => import('@/view/child-view/userManage/userActiveValue.vue')
      },
      {
        path: 'userFudou',
        name: 'userFudou',
        meta: {
          title: '用户福豆',
          notCache: true
        },
        component: () => import('@/view/child-view/userManage/userFudou.vue')
      },
      {
        path: 'userAchievement',
        name: 'userAchievement',
        meta: {
          title: '用户业绩',
          notCache: true
        },
        component: () => import('@/view/child-view/userManage/userAchievement.vue')
      }
    ]
  },
  {
    path: '/fudouManage',
    name: 'fudouManage',
    meta: {
      title: '福豆管理',
      access:['admin','kefu','hqy','wz','my','manager'],
      notCache: true
    },
    component: Main,
    children: [
      {
        path: 'fudouRecharge',
        name: 'fudouRecharge',
        meta: {
          title: '福豆后台充值',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/fudouRecharge.vue')
      },
      {
        path: 'dailyDouRecord',
        name: 'dailyDouRecord',
        meta: {
          title: '用户每日产豆记录',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/dailyDouRecord.vue')
      },
      {
        path: 'angelInvestFudouManage',
        name: 'angelInvestFudouManage',
        meta: {
          title: '天使投资福豆管理',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/angelInvestFudouManage.vue')
      },
      {
        path: 'logoutListManage',
        name: 'logoutListManage',
        meta: {
          title: '申请提前退出列表管理',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/logoutListManage.vue')
      },
      {
        path: 'transferRecord',
        name: 'transferRecord',
        meta: {
          title: '用户转账记录',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/transferRecord.vue')
      },
      {
        path: 'fudouPriceManage',
        name: 'fudouPriceManage',
        meta: {
          title: '福豆价格管理',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/fudouPriceManage.vue')
      },
      {
        path: 'fudouConverRate',
        name: 'fudouConverRate',
        meta: {
          title: '福豆转换汇率',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/fudouConverRate.vue')
      },
      {
        path: 'fudouConverRecord',
        name: 'fudouConverRecord',
        meta: {
          title: '福豆转换记录',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/fudouConverRecord.vue')
      },
      {
        path: 'tradingMarketList',
        name: 'tradingMarketList',
        meta: {
          title: '交易市场列表',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/tradingMarketList.vue')
      },
      {
        path: 'purchaselist',
        name: 'purchaselist',
        meta: {
          title: '购入列表',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/purchaselist.vue')
      },
      {
        path: 'secondaryDistributionRecord',
        name: 'secondaryDistributionRecord',
        meta: {
          title: '二级分销记录',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/secondaryDistributionRecord.vue')
      },
      {
        path: 'fubagWithdrawalRecord',
        name: 'fubagWithdrawalRecord',
        meta: {
          title: '法币福袋提现记录',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/fubagWithdrawalRecord.vue')
      },
      {
        path: 'withdrawalIMRecord',
        name: 'withdrawalIMRecord',
        meta: {
          title: '随身福袋提到IM钱包记录',
          notCache: true
        },
        component: () => import('@/view/child-view/fudouManage/withdrawalIMRecord.vue')
      }
    ]
  },
  {
    path: '/activeWelfareManagement',
    name: 'activeWelfareManagement',
    meta: {
      title: '福利值活跃度管理',
      access:['admin','kefu','hqy','wz','my','manager'],
      notCache: true
    },
    component: Main,
    children: [
      {
        path: 'welfareRecord',
        name: 'welfareRecord',
        meta: {
          title: '福利值记录',
          access:['admin','kefu','hqy','wz','my','manager'],
          notCache: true
        },
        component: () => import('@/view/child-view/activeWelfareManagement/welfareRecord.vue')
      },
      // {
      //   path: 'rechargeItemRecord',
      //   name: 'rechargeItemRecord',
      //   meta: {
      //     title: '充值道具记录',
      //     notCache: true
      //   },
      //   component: () => import('@/view/child-view/activeWelfareManagement/rechargeItemRecord.vue')
      // },
      {
        path: 'activityRecord',
        name: 'activityRecord',
        meta: {
          title: '活跃度记录',
          access:['admin','kefu','hqy','wz','my','manager'],
          notCache: true
        },
        component: () => import('@/view/child-view/activeWelfareManagement/activityRecord.vue')
      },
      {
        path: 'welfareItemManage',
        name: 'welfareItemManage',
        meta: {
          title: '福利值道具管理',
          access:['admin','kefu','hqy','wz','my','manager'],
          notCache: true
        },
        component: () => import('@/view/child-view/activeWelfareManagement/welfareItemManage.vue')
      },
      {
        path: 'userAchievementList',
        name: 'userAchievementList',
        meta: {
          title: '充值列表',
          access:['admin','hqy','wz','my','manager'],
          notCache: true
        },
        component: () => import('@/view/child-view/activeWelfareManagement/userAchievementList.vue')
      }
    ]
  },
  {
    path: '/mallManage',
    name: 'mallManage',
    meta: {
      title: '商城管理',
      notCache: true,
      access:['shop','admin','hqy','wz','my','manager'],
    },
    component: Main,
    children: [
      {
        path: 'commodityClassManage',
        name: 'commodityClassManage',
        meta: {
          title: '商品分类管理',
          notCache: true
        },
        component: () => import('@/view/child-view/mallManage/CommodityClassManage.vue')
      },
      {
        path: 'commodyManage',
        name: 'commodyManage',
        meta: {
          title: '商品管理',
          notCache: true
        },
        component: () => import('@/view/child-view/mallManage/commodyManage.vue')
      },
      {
        path: 'orderManage',
        name: 'orderManage',
        meta: {
          title: '订单管理',
          notCache: true
        },
        component: () => import('@/view/child-view/mallManage/orderManage.vue')
      },
      {
        path: 'mallBannerManage',
        name: 'mallBannerManage',
        meta: {
          title: '商城轮播图管理',
          notCache: true
        },
        component: () => import('@/view/child-view/mallManage/mallBannerManage.vue')
      }
    ]
  },
  {
    path: '/systemManage',
    name: 'systemManage',
    meta: {
      title: '系统管理',
      access:['admin','hqy','wz','my','manager'],
      notCache: true
    },
    component: Main,
    children: [
      {
        path: 'postManage',
        name: 'postManage',
        meta: {
          title: '帖子管理',
          notCache: true
        },
        component: () => import('@/view/child-view/systemManage/postManage.vue')
      },
      {
        path: 'systemRuleManage',
        name: 'systemRuleManage',
        meta: {
          title: '系统规则管理',
          notCache: true
        },
        component: () => import('@/view/child-view/systemManage/systemRuleManage.vue')
      },
      {
        path: 'noticeManage',
        name: 'noticeManage',
        meta: {
          title: '公告管理',
          notCache: true
        },
        component: () => import('@/view/child-view/systemManage/noticeManage.vue')
      },
      {
        path: 'indexMusicManage',
        name: 'indexMusicManage',
        meta: {
          title: '首页音乐管理',
          notCache: true
        },
        component: () => import('@/view/child-view/systemManage/indexMusicManage.vue')
      },
      {
        path: 'mageManage',
        name: 'mageManage',
        meta: {
          title: '法师管理',
          notCache: true
        },
        component: () => import('@/view/child-view/systemManage/mageManage.vue')
      },
      {
        path: 'magePurchaseHistory',
        name: 'magePurchaseHistory',
        meta: {
          title: '法师购买记录',
          notCache: true
        },
        component: () => import('@/view/child-view/systemManage/magePurchaseHistory.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hide: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }

]
