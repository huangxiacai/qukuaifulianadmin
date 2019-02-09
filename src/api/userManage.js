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
}

