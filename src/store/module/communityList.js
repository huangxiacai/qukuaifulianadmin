import {getCommunity,editCommunity,addCommunity,delCommunity} from '../../api/communityList'
import {getToken} from '@/libs/util'
export default {
  state: {
  },
  mutations: {

  },
  actions: {
    /**
     * 获取小区信息管理
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleGetCommunityList({state, commit}, params){
      return new Promise((resolve, reject) => {
        getCommunity({
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
     * 添加小区信息
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleAddCommunity({state, commit}, params){
      return new Promise((resolve, reject) => {
        addCommunity({
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
     * 修改小区信息
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleEditCommunity({state, commit}, params){
      return new Promise((resolve, reject) => {
        editCommunity({
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
    handleDelCommunity({state, commit}, params){
      return new Promise((resolve, reject) => {
        delCommunity({
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
