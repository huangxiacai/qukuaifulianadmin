import {getOwner,editOwner,addOwner,delOwner} from '../../api/ownerList'
import {getToken} from '@/libs/util'
export default {
  state: {
  },
  mutations: {

  },
  actions: {
    /**
     * 获取业主信息
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleGetOwnerList({state, commit}, params){
      return new Promise((resolve, reject) => {
        getOwner({
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
    handleAddOwner({state, commit}, params){
      return new Promise((resolve, reject) => {
        addOwner({
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
    handleEditaddOwner({state, commit}, params){
      return new Promise((resolve, reject) => {
        editOwner({
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
    handleDelOwner({state, commit}, params){
      return new Promise((resolve, reject) => {
        delOwner({
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
