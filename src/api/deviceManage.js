import axios from '@/libs/api.request'
import {deviceManage} from "./config";

/**
 * 获取设备列表
 * @param params
 * @returns {*}
 */
 export const getDeviceList=(params)=>{
   const data = {
     ...params
   };
   return axios.request({
     url: deviceManage.bdevicelist,
     data,
     method: 'post'
   })
 };
/**
 * 添加设备
 * @param params
 * @returns {*}
 */
export const addDevice=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceManage.bdeviceadd,
    data,
    method: 'post'
  })
};
/**
 * 编辑设备
 * @param params
 * @returns {*}
 */
export const editDevice=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceManage.bdeviceedit,
    data,
    method: 'post'
  })
};
/**
 * 删除 设备
 * @param params
 * @returns {*}
 */
export const delDevice=(params)=>{
  debugger
  const data = {
    ...params
  };
  return axios.request({
    url: deviceManage.bdevicedel,
    data,
    method: 'post'
  })
};
/**
 * 获取 可操作此设备 的用户
 * @param params
 * @returns {*}
 */
export const getOperationDeviceUser=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceManage.buserdeviceacllist,
    data,
    method: 'post'
  })
};
/**
 * 删除授权
 * @param params
 * @returns {*}
 */
export const delBuserdeviceaclset=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: deviceManage.buserdeviceacldel,
    data,
    method: 'post'
  })
}
