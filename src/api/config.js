
export const userManage = {
  busercreate: '/v3/tobbase/busercreate',//添加⽤⼾
  buseredit: '/v3/tobbase/buseredit',//编辑用户
  buserdel: '/v3/tobbase/buserdel',//删除用户
  buserlist: '/v3/tobbase/buserlist',//获取用户列表
  login: '/v3/user/login',//登录接口
  logout: '/v3/user/logout',//退出登录
  profileget: '/v3/user/profileget',//获取用户信息
  queryUsers:'manager/user/queryUsers',//分页查询所有的用户
  updateUserStatus:'manager/user/updateUserStatus',//改变用户账号状态
  queryUserValues:'manager/user/queryUserValues',//分页查询用户福利值活跃度
  queryUserBeans:'manager/user/queryUserBeans',//分页查询用户的福豆数量
  insertUser:'manager/user/insertUser',//添加用户到管理
};
/**
 * 福利值活跃度管理
 * @type {{}}
 */
export const activeWelfareManage={
  queryWelfareTools:'manager/welfare/queryWelfareTools',//查询福利值道具
  saveOrUpdateWelfareTool:'manager/welfare/saveOrUpdateWelfareTool',//添加或者修改福利值道具
  isSellWelfareTool:'manager/welfare/isSellWelfareTool',//上架/下架法师道具
  queryActiveRecords:'manager/welfare/queryActiveRecords',//分页查询活跃度记录
  queryWelfareRecords:'manager/welfare/queryWelfareRecords',//分页查询福利值记录

};


