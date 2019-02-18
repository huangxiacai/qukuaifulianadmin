import {
  deleteProductTypeById,
  queryAllProductType,
  queryProductTypes,
  saveOrUpdateProductTypes,
  queryProducts,
  saveProduct,
  updateProduct,
  isSelfProduct,
  queryShopImages,
  saveOrUpdateShopImage,
  deleteShopImage,
  isHideShopImage,
  queryOrders,
  updateOrderStatus } from '../../api/shopManage'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    productTypeData:[],
  },
  mutations: {
    setproductTypeData(state,data){
      if(data.code===20000){
        let arr=[];
        for(let i in data.data){
          let list=data.data[i];
          arr.push({
            label:list.typeName,
            value:list.productTypeId
          });
        }
        state.productTypeData=arr;
      }
    }
  },
  actions: {
    /**
     * 根据Id删除商品分类
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handledeleteProductTypeById ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        deleteProductTypeById({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 查询所有的商品分类
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryAllProductType ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryAllProductType({
          ...params,
        }).then(res => {
          commit("setproductTypeData",res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询商品分类
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryProductTypes ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryProductTypes({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加或者修改产品分类
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveOrUpdateProductTypes ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveOrUpdateProductTypes({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询商品
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryProducts ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryProducts({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加商品
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveProduct ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveProduct({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 修改商品
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateProduct ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateProduct({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 上架或者下架商品
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleisSelfProduct ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        isSelfProduct({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 查询所有的商城轮播图
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryShopImages ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryShopImages({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加或者修改商城轮播图
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveOrUpdateShopImage ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveOrUpdateShopImage({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 删除轮播图
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handledeleteShopImage ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        deleteShopImage({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 上架/下架轮播图
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleisHideShopImage ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        isHideShopImage({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询订单
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryOrders ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryOrders({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 修改订单状态
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateOrderStatus ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateOrderStatus({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
