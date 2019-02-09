import axios from '@/libs/api.request'
import {property} from "./config";
export const getPropertyList=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: property.getList,
    data,
    method: 'post'
  })
};
export const addProperty=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: property.add,
    data,
    method: 'post'
  })
};
export const editProperty=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: property.edit,
    data,
    method: 'post'
  })
};
export const delProperty=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: property.del,
    data,
    method: 'post'
  })
};
