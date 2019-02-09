import axios from '@/libs/api.request'
import {adminList} from "./config";
/**
 * 获取管理员
 * @returns {*}
 */
export const getAdmin =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: adminList.getAdmin,
    data,
    method: 'post'
  })
};
/**
 * 添加管理员
 * @param params
 * @returns {*}
 */
export const addAdmin =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: adminList.addAdmin,
    data,
    method: 'post'
  })
};

/**
 * 编辑管理员
 * @param params
 * @returns {*}
 */
export const editAdmin =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: adminList.editAdmin,
    data,
    method: 'post'
  })
};
/**
 * 删除管理员
 * @param params
 * @returns {*}
 */
export const delAdmin =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: adminList.delAdmin,
    data,
    method: 'post'
  })
};
/**
 * 设置管理员状态
 * @param params
 * @returns {*}
 */
export const setAdminStatus=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: adminList.orgbuildingadminset,
    data,
    method: 'post'
  })
}
