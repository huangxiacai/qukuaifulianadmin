import axios from '@/libs/api.request'
import {roomManage} from "./config";
/**
 * 获取小区列表
 * @param params
 * @returns {*}
 */
export const getRoom =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: roomManage.getRoom,
    data,
    method: 'post'
  })
};
/**
 * 添加小区列表
 * @param params
 * @returns {*}
 */
export const addRoom =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: roomManage.addRoom,
    data,
    method: 'post'
  })
};

/**
 * 编辑区域列表
 * @param params
 * @returns {*}
 */
export const editRoom =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: roomManage.editRoom,
    data,
    method: 'post'
  })
};
/**
 * 删除区域列表
 * @param params
 * @returns {*}
 */
export const delRoom =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: roomManage.delRoom,
    data,
    method: 'post'
  })
};
