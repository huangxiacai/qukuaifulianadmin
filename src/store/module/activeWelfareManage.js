import {
  queryWelfareTools,
  saveOrUpdateWelfareTool,
  isSellWelfareTool,
  queryActiveRecords,
  queryWelfareRecords } from '../../api/activeWelfareManage'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    /**
     * 查询福利值道具
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleQueryWelfareTools ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryWelfareTools({
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
     * 添加或者修改福利值道具
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleSaveOrUpdateWelfareTool ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveOrUpdateWelfareTool({
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
     * 上架/下架法师道具
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleIsSellWelfareTool ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        isSellWelfareTool({
          ...params
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询活跃度记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleQueryActiveRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryActiveRecords({
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
     * 分页查询福利值记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleQueryWelfareRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryWelfareRecords({
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
