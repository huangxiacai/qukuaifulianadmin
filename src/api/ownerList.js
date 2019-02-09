import axios from '@/libs/api.request'
import {owner} from "./config";
/**
 * 获取小区列表
 * @param params
 * @returns {*}
 */
export const getOwner =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: owner.getOwner,
    data,
    method: 'post'
  })
};
/**
 * 添加小区列表
 * @param params
 * @returns {*}
 */
export const addOwner =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: owner.addOwner,
    data,
    method: 'post'
  })
};

/**
 * 编辑区域列表
 * @param params
 * @returns {*}
 */
export const editOwner =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: owner.editOwner,
    data,
    method: 'post'
  })
};
/**
 * 删除区域列表
 * @param params
 * @returns {*}
 */
export const delOwner =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: owner.delOwner,
    data,
    method: 'post'
  })
};
