import {getAccessList} from '../../api/accessList'
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
    handleGetAccessList({state, commit}, params){
      return new Promise((resolve, reject) => {
        getAccessList({
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
