import {getRoom,editRoom,addRoom,delRoom} from '../../api/roomList'
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
    handleGetRoomList({state, commit}, params){
      return new Promise((resolve, reject) => {
        getRoom({
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
    handleAddRoom({state, commit}, params){
      return new Promise((resolve, reject) => {
        addRoom({
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
    handleEditRoom({state, commit}, params){
      return new Promise((resolve, reject) => {
        editRoom({
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
    handleDelRoom({state, commit}, params){
      return new Promise((resolve, reject) => {
        delRoom({
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
