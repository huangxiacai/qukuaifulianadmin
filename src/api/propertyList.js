import axios from '@/libs/api.request'
import {propertyList} from "./config";
/**
 * 获取管理员
 * @returns {*}
 */
export const getProperty =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: propertyList.getProperty,
    data,
    method: 'post'
  })
};
/**
 * 添加管理员
 * @param params
 * @returns {*}
 */
export const addProperty =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: propertyList.addProperty,
    data,
    method: 'post'
  })
};

/**
 * 编辑管理员
 * @param params
 * @returns {*}
 */
export const editProperty =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: propertyList.editProperty,
    data,
    method: 'post'
  })
};
/**
 * 删除管理员
 * @param params
 * @returns {*}
 */
export const delProperty =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: propertyList.delProperty,
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
    url: propertyList.getVCode,
    data,
    method: 'post'
  })
};
