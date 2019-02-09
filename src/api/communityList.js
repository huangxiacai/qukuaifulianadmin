import axios from '@/libs/api.request'
import {communityManage} from "./config";
/**
 * 获取小区列表
 * @param params
 * @returns {*}
 */
export const getCommunity =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: communityManage.getCommunity,
    data,
    method: 'post'
  })
};
/**
 * 添加小区列表
 * @param params
 * @returns {*}
 */
export const addCommunity =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: communityManage.addCommunity,
    data,
    method: 'post'
  })
};

/**
 * 编辑区域列表
 * @param params
 * @returns {*}
 */
export const editCommunity =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: communityManage.editCommunity,
    data,
    method: 'post'
  })
};
/**
 * 删除区域列表
 * @param params
 * @returns {*}
 */
export const delCommunity =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: communityManage.delCommunity,
    data,
    method: 'post'
  })
};
