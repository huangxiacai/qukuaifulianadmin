import {getDevice,editDevice,addDevice,delDevice,getVCode} from '../../api/deviceList'
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
    handleGetDeviceList({state, commit}, params){
      return new Promise((resolve, reject) => {
        getDevice({
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
    handleAddDevice({state, commit}, params){
      return new Promise((resolve, reject) => {
        addDevice({
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
    handleEditDevice({state, commit}, params){
      return new Promise((resolve, reject) => {
        editDevice({
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
    handleDelDevice({state, commit}, params){
      return new Promise((resolve, reject) => {
        delDevice({
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
