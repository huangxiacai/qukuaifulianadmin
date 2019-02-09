import {getProperty,editProperty,addProperty,delProperty,getVCode} from '../../api/propertyList'
import {getToken} from '@/libs/util'
export default {
  state: {
  },
  mutations: {

  },
  actions: {
    /**
     * 获取物业管理员列表
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleGetPropertyList({state, commit}, params){
      return new Promise((resolve, reject) => {
        getProperty({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    },
    /**
     * 添加业主信息
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleAddProperty({state, commit}, params){
      return new Promise((resolve, reject) => {
        addProperty({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    },
    /**
     * 修改业主信息
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleEditProperty({state, commit}, params){
      return new Promise((resolve, reject) => {
        editProperty({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    },
    /**
     * 删除小区信息管理
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleDelProperty({state, commit}, params){
      return new Promise((resolve, reject) => {
        delProperty({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    },
    /**
     * 获取添加管理员的验证码
     */
    handleGetVCode({state, commit}, params){
      return new Promise((resolve, reject) => {
        getVCode({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      });
    }
  }
}
