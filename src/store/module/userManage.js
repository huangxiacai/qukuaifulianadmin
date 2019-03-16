import { insertUser,queryUserRecords, getqueryUsers, querySales, updateUserStatus, queryUserValues, queryUserBeans ,saveBankCard,saveIdCard} from '../../api/userManage'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    /**
     * 添加用户到管理
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleInsertUser ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        insertUser({
          ...params

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询所有的用户
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleGetqueryUsers ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        getqueryUsers({
          ...params
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 改变用户账号状态
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleUpdateUserStatus ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateUserStatus({
          ...params

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询用户福利值活跃度
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleQueryUserValues ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryUserValues({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询用户的福豆数量
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleQueryUserBeans ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryUserBeans({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 用户业绩
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleQuerySales ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        querySales({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 用户业绩
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryUserRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryUserRecords({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 保存idcard
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveIdCard ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveIdCard({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handlesaveBankCard ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveBankCard({
          ...params,
          access_token: getToken()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
