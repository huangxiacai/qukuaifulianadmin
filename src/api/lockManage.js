import axios from '@/libs/api.request'
import {lockMange} from "./config";

/**
 * 获取门锁密码
 * @param params
 * @returns {*}
 */
export const addLockPass=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: lockMange.slpwdadd,
    data,
    method: 'post'
  })
};
/**
 * 编辑密码
 * @param params
 * @returns {*}
 */
export const editLockPass=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: lockMange.slpwdedit,
    data,
    method: 'post'
  })
};
/**
 * 删除密码
 * @param params
 * @returns {*}
 */
export const delLockPass=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: lockMange.slpwddel,
    data,
    method: 'post'
  })
};
/**
 * 有效密码列表
 * @param params
 * @returns {*}
 */
export const getLockPass=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: lockMange.slconfigget,
    data,
    method: 'post'
  })
};
/**
 * 获取使用记录
 * @param params
 * @returns {*}
 */
export const getUserRecordsList=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: lockMange.slunlocklist,
    data,
    method: 'post'
  })
};
/**
 * 获取设备的事件列表
 * @returns {*}
 */
export const getDevEventList=(params)=>{
  const data={
    ...params
  };
  return axios.request({
    url: lockMange.getdeveventlist,
    data,
    method: 'post'
  });
};
/**
 * 发送安全码到设备
 * @param params
 * @returns {*}
 */
export const sendDevicesecCode=(params)=>{
  const data={
    ...params
  };
  return axios.request({
    url: lockMange.sendDevicesecCode,
    data,
    method: 'post'
  });
};
/**
 * 发送密码短信通知
 * @param params
 * @returns {*}
 */
export const sendPassSMSNotice=(params)=>{
  const data={
    ...params
  };
  return axios.request({
    url: lockMange.slsendsms,
    data,
    method: 'post'
  });
};
