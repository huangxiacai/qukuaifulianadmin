export const userManage = {
  busercreate: '/v3/tobbase/busercreate', // 添加⽤⼾
  buseredit: '/v3/tobbase/buseredit', // 编辑用户
  buserdel: '/v3/tobbase/buserdel', // 删除用户
  buserlist: '/v3/tobbase/buserlist', // 获取用户列表
  login: 'manager/login/in', // 登录接口
  logout: '/v3/user/logout', // 退出登录
  profileget: '/manager/user/queryCurrentUser', // 获取用户信息
  queryUsers: 'manager/user/queryUsers', // 分页查询所有的用户
  updateUserStatus: 'manager/user/updateUserStatus', // 改变用户账号状态
  queryUserValues: 'manager/user/queryUserValues', // 分页查询用户福利值活跃度
  queryUserBeans: 'manager/user/queryUserBeans', // 分页查询用户的福豆数量
  insertUser: 'manager/user/insertUser'// 添加用户到管理
}
/**
 * 福利值活跃度管理
 * @type {{}}
 */
export const activeWelfareManage = {
  queryWelfareTools: 'manager/welfare/queryWelfareTools', // 查询福利值道具
  saveOrUpdateWelfareTool: 'manager/welfare/saveOrUpdateWelfareTool', // 添加或者修改福利值道具
  isSellWelfareTool: 'manager/welfare/isSellWelfareTool', // 上架/下架法师道具
  queryActiveRecords: 'manager/welfare/queryActiveRecords', // 分页查询活跃度记录
  queryWelfareRecords: 'manager/welfare/queryWelfareRecords'// 分页查询福利值记录
};
/**
 * 共用模块
 * @type {{upload: string, delete: string}}
 */
export const common={
  upload:'manager/file/upload',//上传文件
  delete:'manager/file/delete',//删除文件
};
/**
 * 商品管理
 * @type {{}}
 */
export const shopManage = {
  deleteProductTypeById: 'manager/shop/deleteProductTypeById', // 根据Id删除商品分类
  queryAllProductType: 'manager/shop/queryAllProductType', // 查询所有的商品分类
  queryProductTypes: 'manager/shop/queryProductTypes', // 分页查询产品分类
  saveOrUpdateProductTypes: 'manager/shop/saveOrUpdateProductTypes', // 添加或者修改产品分类
  queryProducts: 'manager/shop/queryProducts', // 分页查询商品
  saveProduct: 'manager/shop/saveProduct', // 添加商品
  updateProduct: 'manager/shop/updateProduct', // 修改商品
  isSelfProduct: 'manager/shop/isSelfProduct', // 上架或者下架商品
  queryShopImages: 'manager/shop/queryShopImages', // 查询所有的商城轮播图
  saveOrUpdateShopImage: 'manager/shop/saveOrUpdateShopImage', // 添加或者修改商城轮播图
  deleteShopImage: 'manager/shop/deleteShopImage', // 删除轮播图
  isHideShopImage: 'manager/shop/isHideShopImage', // 上架/下架轮播图
  queryOrders: 'manager/shop/queryOrders', // 分页查询订单
  updateOrderStatus: 'manager/shop/updateOrderStatus'// 修改订单状态
};
//福豆管理
export const fudouManage = {
  queryBeanProductRecords: 'manager/fobBean/queryBeanProductRecords',//分页查询每日产豆记录接口
  queryAccountTransferRecords: 'manager/fobBean/queryAccountTransferRecords',//分页查询转账记录
  queryBeanTransferRates: 'manager/fobBean/queryBeanTransferRates',//查询福袋转换汇率
  updateBeanTransferRate: 'manager/fobBean/updateBeanTransferRate',//修改福袋转换汇率
  queryBeanTransferRecords: 'manager/fobBean/queryBeanTransferRecords',//分页查询福袋转换记录
  queryBeanPrices: 'manager/fobBean/queryBeanPrices',//分页查询福豆价格
  saveOrUpdateBeanPrice: 'manager/fobBean/saveOrUpdateBeanPrice',//添加/修改福豆价格
  queryDistributeRecords: "manager/fobBean/queryDistributeRecords",//分页查询分销记录
  queryWithdrawLegals: 'manager/fobBean/queryWithdrawLegals',//分页查询法币提现记录
  updateWithdrawLegal: 'manager/fobBean/updateWithdrawLegal',//修改法币提现
  queryWithdrawSuishens: 'manager/fobBean/queryWithdrawSuishens',//分页查询IM钱包提现记录
  updateWithdrawSuishen: 'manager/fobBean/updateWithdrawSuishen',//修改IM提现
  queryBeanLocks: 'manager/fobBean/queryBeanLocks',//分页查询锁仓列表
  saveBeanLock: 'manager/fobBean/saveBeanLock',//添加锁仓记录
  cancelBeanLock: 'manager/fobBean/cancelBeanLock',//撤销锁仓
  queryAngelQuitRecords: 'manager/fobBean/queryAngelQuitRecords',//分页查询提前退出列表
  updateAngelQuitRecord: 'manager/fobBean/updateAngelQuitRecord',//更新提前退出审核状态
  operUserFobBean: 'manager/fobBean/operUserFobBean',//充值/扣款用户的福豆、活跃度、福利值
  querySystemFobBeanRecords: 'manager/fobBean/querySystemFobBeanRecords',//分页查询系统充值/扣款记录
  queryBusinessLists: 'manager/fobBean/queryBusinessLists',//分页查询交易市场列表
  queryBusinessDetails: 'manager/fobBean/queryBusinessDetails',//分页查询购入列表
  updateBusinessDetailStatus: 'manager/fobBean/updateBusinessDetailStatus',//更新购入订单详情状态
};
/**
 * 系统管理模块
 * @type {{}}
 */
export const systemManage={
  queryNotices:'manager/system/queryNotices',//分页查询公告
  saveOrUpdateNotice:'manager/system/saveOrUpdateNotice',//添加或者修改公告
  deleteNotice:'manager/system/deleteNotice',//删除公告
  queryMusics:'manager/system/queryMusics',//查询首页音乐
  saveOrUpdateMusic:'manager/system/saveOrUpdateMusic',//添加或者删除音乐
  deleteMusic:'manager/system/deleteMusic',//删除音乐
  queryRabbis:'manager/system/queryRabbis',//查询所有的法师
  saveOrUpdateRabbi:'manager/system/saveOrUpdateRabbi',//添加或者修改法师
  isSellRabbi:'manager/system/isSellRabbi',//上架/下架法师
  queryDictionarys:'manager/system/queryDictionarys',//分页查询常量
  updateDictionary:'manager/system/updateDictionary',//修改常量值
  queryPosts:'manager/system/queryPosts',//分页查询帖子
  isDeletePost:'manager/system/isDeletePost',//是否删除帖子
  isStickPost:'manager/system/isStickPost',//是否置顶帖子
  queryUserRabbis:'manager/system/queryUserRabbis',//分页查询用户购买的法师
  deleteUserRabbi:'manager/system/deleteUserRabbi',//删除用户法师
};
