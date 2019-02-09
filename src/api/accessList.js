import axios from '@/libs/api.request'
import {accessList} from "./config";
/**
 * 获取管理员
 * @returns {*}
 */
export const getAccessList =(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: accessList.getAccessList,
    data,
    method: 'post'
  })
};

