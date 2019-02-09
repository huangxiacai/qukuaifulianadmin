import axios from '@/libs/api.request'
import {deviceList} from "./config";
/**
 * 获取管理员
 * @returns {*}
 */
export const getDevice =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceList.getDevice,
    data,
    method: 'post'
  })
};
/**
 * 添加管理员
 * @param params
 * @returns {*}
 */
export const addDevice =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceList.addDevice,
    data,
    method: 'post'
  })
};

/**
 * 编辑管理员
 * @param params
 * @returns {*}
 */
export const editDevice =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceList.editDevice,
    data,
    method: 'post'
  })
};
/**
 * 删除管理员
 * @param params
 * @returns {*}
 */
export const delDevice =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceList.delDevice,
    data,
    method: 'post'
  })
};
/**
 * 获取验证码
 * @param params
 * @returns {*}
 */
export const getVCode =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceList.getVCode,
    data,
    method: 'post'
  })
};
