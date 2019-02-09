import axios from '@/libs/api.request'
import {areaManage} from "./config";

/**
 * 获取区域列表
 * @param params
 * @returns {*}
 */
export const getBregionlist =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: areaManage.bregionlist,
    data,
    method: 'post'
  })
};
/**
 * 添加区域列表
 * @param params
 * @returns {*}
 */
export const getAddBregionItem =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: areaManage.bregioncreate,
    data,
    method: 'post'
  })
};
/**
 * 获取区域列表item
 * @param params
 * @returns {*}
 */
export const getBregionItem =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: areaManage.bregionedit,
    data,
    method: 'post'
  })
};
/**
 * 编辑区域列表
 * @param params
 * @returns {*}
 */
export const getEditBregionItem =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: areaManage.bregionedit,
    data,
    method: 'post'
  })
};
/**
 * 删除区域列表
 * @param params
 * @returns {*}
 */
export const getDelBregionItem =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: areaManage.bregiondel,
    data,
    method: 'post'
  })
};

/**
 * 获取区域下设备
 * @param params
 * @returns {*}
 */
export const getAreaDeviceList=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: areaManage.bregiongetdevice,
    data,
    method: 'post'
  })
}
/**
 * 获取区域下用户
 * @param params
 * @returns {*}
 */
export const getAreaUserList=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: areaManage.bregiongetuser,
    data,
    method: 'post'
  })
}
