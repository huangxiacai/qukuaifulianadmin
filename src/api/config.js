export const areaManage = {
  bregioncreate: '/v3/tobbase/bregioncreate',//添加区域
  bregionedit: '/v3/tobbase/bregionedit',//编辑区域
  bregiondel: '/v3/tobbase/bregiondel',//删除区域
  bregionlist: '/v3/tobbase/bregionlist',//获取区域
  bregiongetuser: '/v3/tobbase/bregiongetuser',//获取该区域的管理用户⽤⼾
  bregiongetdevice: '/v3/tobbase/bregiongetdevice',//获取该区域下的设备
};
export const deviceManage = {
  bdeviceadd: '/v3/tobbase/bdeviceadd',//添加设备
  bdevicedel: '/v3/tobbase/bdevicedel',//删除设备
  bdeviceedit: '/v3/tobbase/bdeviceedit',//编辑设备
  bdevicelist: '/v3/tobbase/bdevicelist',//获取设备
  buserdeviceacllist: '/v3/tobbase/buserdeviceacllist',//获取可操作该设备的用户⼾
  buserdeviceacldel: '/v3/tobbase/buserdeviceacldel',//删除授权

};
export const userManage = {
  busercreate: '/v3/tobbase/busercreate',//添加⽤⼾
  buseredit: '/v3/tobbase/buseredit',//编辑用户
  buserdel: '/v3/tobbase/buserdel',//删除用户
  buserlist: '/v3/tobbase/buserlist',//获取用户列表
  login: '/v3/user/login',//登录接口
  logout: '/v3/user/logout',//退出登录
  profileget: '/v3/user/profileget',//获取用户信息
  bdevicelistbyuser:'/v3/tobbase/bdevicelistbyuser',//获取授权给用户的设备列表
  buserdeviceaclset:'/v3/tobbase/buserdeviceaclset',//设置用户可访问设备授权

};
export const lockMange = {
  slpwdadd:'/v3/smartlock/slpwdadd',//添加密码
  slpwdedit:'/v3/smartlock/slpwdedit',//编辑密码
  slpwddel:'/v3/smartlock/slpwddel',//删除密码
  slconfigget:'/v3/smartlock/slconfigget',//有效密码列表 获取锁的配置信息
  slunlocklist:'/v3/smartlock/slunlocklist',//使用记录
  getdeveventlist:'/v3/iotcmd/getdeveventlist',//获取设备的事件列表
  sendDevicesecCode:'/v3/userdevice/senddeviceseccode',//发送安全码到设备
  slsendsms:'/v3/smartlock/slsendsms',//发送密码短信通知
};
export const user={
  changepass:'/v3/user/changepass',//修改密码
  sendVcode:'/v3/user/sendvcode',//发送验证码
  recoverPass:'/v3/user/recoverpass',//找回密码
};
export const property={
  getList:'/v3/tobbase/bdeviceadd',
  add:'',
  edit:'',
  del:''
};
/**
 * 小区信息管理
 * @type {{getCommunity: string, addCommunity: string, editCommunity: string, delCommunity: string}}
 */
export const communityManage={
  getCommunity:"/v3/building/buildinglist",
  addCommunity:"/v3/building/buildingcreate",
  editCommunity:"/v3/building/buildingedit",
  delCommunity:"/v3/building/buildingdelete"
};
/**
 * 业主信息
 * @type {{getOwner: string, addOwner: string, editOwner: string, delOwner: string}}
 */
export const owner={
  getOwner:"/v3/faceacadm/buildingownerlist",
  addOwner:"/v3/faceacadm/buildingowneradd",
  editOwner:"/v3/faceacadm/buildingowneredit",
  delOwner:"/v3/faceacadm/buildingownerdel"
};
//adminList物业管理员 社区工作人员
export const adminList={
  getAdmin:'/v3/faceacadm/buildinguserlist',
  addAdmin:"/v3/faceacadm/buildinguseradd",
  editAdmin:"/v3/faceacadm/buildinguseredit",
  delAdmin:"/v3/faceacadm/buildinguserdel",
  orgbuildingadminset:'/v3/faceacadm/orgbuildingadminset'
};
//出入人员管理
export const propertyList={
  getProperty:'/v3/faceacadm/buildinguserlist',
  addProperty:"/v3/faceacadm/buildinguseradd",
  editProperty:"/v3/faceacadm/buildinguseredit",
  delProperty:"/v3/faceacadm/buildinguserdel",
  getVCode:"",//获取验证码
};
//设备管理列表
export const deviceList={
  getDevice:'/v3/faceacadm/orgbuildingdevicelist',
  addDevice:"/v3/faceacadm/orgbuildingdeviceadd",
  editDevice:"/v3/faceacadm/orgbuildingdeviceedit",
  delDevice:"/v3/faceacadm/orgbuildingdevicedel",
};
//出入记录
export const accessList={
  getAccessList:'/v3/faceacadm/admfacelog'
};
//房号管理
export const roomManage={
  addRoom:'/v3/building/buildingroomcreate',
  editRoom:"/v3/building/buildingroomedit",
  delrRoom:"/v3/building/buildingroomdelete",
  getRoom:"/v3/building/buildingroomlist"
}

