import axios from '@/libs/api.request'
import {userManage} from "./config";

/**
 * 添加用户
 * @param params
 * @returns {*}
 */
export const addUser=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.busercreate,
    data,
    method: 'post'
  })
};
/**
 * 编辑用户
 * @param params
 * @returns {*}
 */
export const editUser=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.buseredit,
    data,
    method: 'post'
  })
};
/**
 * 删除用户
 * @param params
 * @returns {*}
 */
export const delUser=(params)=>{
  debugger
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.buserdel,
    data,
    method: 'post'
  })
};

/**
 * 删除用户
 * @param params
 * @returns {*}
 */
export const getUserList=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.buserlist,
    data,
    method: 'post'
  })
};
/**
 * 获取用户指定角色时 已选中设备
 * @param params
 */
export const getHasSelctDeviceList=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.bdevicelistbyuser,
    data,
    method: 'post'
  })
}
/**
 * 设置⽤⼾可访问设备授权
 * @param params
 * @returns {*}
 */
export const setBuserdeviceaclset=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.buserdeviceaclset,
    data,
    method: 'post'
  })
}

/**
 * 获取用户的基本信息
 * @param params
 * @returns {*}
 */
export const getUserMessageBase=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.profileget,
    data,
    method: 'post'
  })
};
/**
 * 分页查询所有的用户
 * @param params
 * @returns {*}
 */
export const getqueryUsers=(params)=>{
  const data = {
    ...params
  };
  debugger
  console.log(userManage.queryUsers);
  return axios.request({
    url: userManage.queryUsers,
    data,
    method: 'post'
  })
};
/**
 * 改变用户账号状态
 * @param params
 * @returns {*}
 */
export const updateUserStatus=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.updateUserStatus,
    data,
    method: 'post'
  })
};
/**
 * 分页查询用户福利值活跃度
 * @param params
 * @returns {*}
 */
export const queryUserValues=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.queryUserValues,
    data,
    method: 'post'
  })
};
/**
 * 分页查询用户的福豆数量
 * @param params
 * @returns {*}
 */
export const queryUserBeans=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.queryUserBeans,
    data,
    method: 'post'
  })
};
/**
 * 分页查询用户的福豆数量
 * @param params
 * @returns {*}
 */
export const insertUser=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.insertUser,
    data,
    method: 'post'
  })
};
export const querySales=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: userManage.querySales,
    data,
    method: 'post'
  })
};
