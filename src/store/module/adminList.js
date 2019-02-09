import {getAdmin,editAdmin,addAdmin,delAdmin,setAdminStatus} from '../../api/adminList'
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
    handleGetAdminList({state, commit}, params){
      return new Promise((resolve, reject) => {
        getAdmin({
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
    handleAddAdmin({state, commit}, params){
      return new Promise((resolve, reject) => {
        addAdmin({
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
    handleEditAdmin({state, commit}, params){
      return new Promise((resolve, reject) => {
        editAdmin({
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
    handleDelAdmin({state, commit}, params){
      return new Promise((resolve, reject) => {
        delAdmin({
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
     * 设备管理 员状态
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleSetAdminStatus({state, commit}, params){
      return new Promise((resolve, reject) => {
        setAdminStatus({
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
