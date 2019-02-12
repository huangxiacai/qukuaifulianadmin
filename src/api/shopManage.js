import axios from '@/libs/api.request'
import {shopManage} from "./config";

/**
 * 根据Id删除商品分类
 * @param params
 * @returns {*}
 */
export const deleteProductTypeById=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.deleteProductTypeById,
    data,
    method: 'post'
  })
};
/**
 * 查询所有的商品分类
 * @param params
 * @returns {*}
 */
export const queryAllProductType=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.queryAllProductType,
    data,
    method: 'post'
  })
};
/**
 * 分页查询产品分类
 * @param params
 * @returns {*}
 */
export const queryProductTypes=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.queryProductTypes,
    data,
    method: 'post'
  })
};
/**
 * 添加或者修改产品分类
 * @param params
 * @returns {*}
 */
export const saveOrUpdateProductTypes=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.saveOrUpdateProductTypes,
    data,
    method: 'post'
  })
};
/**
 * 分页查询商品
 * @param params
 * @returns {*}
 */
export const queryProducts=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.queryProducts,
    data,
    method: 'post'
  })
};
/**
 * 添加商品
 * @param params
 * @returns {*}
 */
export const saveProduct=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.saveProduct,
    data,
    method: 'post'
  })
};
/**
 * 修改商品
 * @param params
 * @returns {*}
 */
export const updateProduct=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.updateProduct,
    data,
    method: 'post'
  })
};
/**
 * 上架或者下架商品
 * @param params
 * @returns {*}
 */
export const isSelfProduct=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.isSelfProduct,
    data,
    method: 'post'
  })
};
/**
 * 查询所有的商城轮播图
 * @param params
 * @returns {*}
 */
export const queryShopImages=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.queryShopImages,
    data,
    method: 'post'
  })
};
/**
 * 添加或者修改商城轮播图
 * @param params
 * @returns {*}
 */
export const saveOrUpdateShopImage=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.saveOrUpdateShopImage,
    data,
    method: 'post'
  })
};
/**
 * 删除轮播图
 * @param params
 * @returns {*}
 */
export const deleteShopImage=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.deleteShopImage,
    data,
    method: 'post'
  })
};
/**
 * 上架/下架轮播图
 * @param params
 * @returns {*}
 */
export const isHideShopImage=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.isHideShopImage,
    data,
    method: 'post'
  })
};
/**
 * 分页查询订单
 * @param params
 * @returns {*}
 */
export const queryOrders=(params)=>{
    const data = {
      ...params
    };
    return axios.request({
      url: shopManage.queryOrders,
      data,
      method: 'post'
    })
  };
/**
 * 修改订单状态
 * @param params
 * @returns {*}
 */
export const updateOrderStatus=(params)=>{
  const data = {
    ...params
  };
  return axios.request({
    url: shopManage.updateOrderStatus,
    data,
    method: 'post'
  })
};
