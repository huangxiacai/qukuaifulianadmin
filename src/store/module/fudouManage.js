import {
  queryBeanProductRecords,
  queryAccountTransferRecords,
  queryBeanTransferRates,
  updateBeanTransferRate,
  queryBeanTransferRecords,
  queryBeanPrices,
  saveOrUpdateBeanPrice,
  queryDistributeRecords,
  queryWithdrawLegals,
  updateWithdrawLegal,
  queryWithdrawSuishens,
  updateWithdrawSuishen,
  queryBeanLocks,
  saveBeanLock,
  cancelBeanLock,
  queryAngelQuitRecords,
  updateAngelQuitRecord,
  operUserFobBean,
  querySystemFobBeanRecords,
  queryBusinessLists,
  queryBusinessDetails,
  updateBusinessDetailStatus} from '../../api/fudouManage'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
  },
  mutations: {

  },
  actions: {
    /**
     * 分页查询每日产豆记录接口
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryBeanProductRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryBeanProductRecords({
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
     * 分页查询转账记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryAccountTransferRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryAccountTransferRecords({
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
     * 查询福袋转换汇率
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryBeanTransferRates ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryBeanTransferRates({
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
     * 修改福袋转换汇率
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateBeanTransferRate ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateBeanTransferRate({
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
     * 分页查询福袋转换记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryBeanTransferRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryBeanTransferRecords({
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
     * 分页查询福豆价格
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryBeanPrices ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryBeanPrices({
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
     * 添加/修改福豆价格
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveOrUpdateBeanPrice ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveOrUpdateBeanPrice({
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
     * 添加/修改福豆价格
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryDistributeRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryDistributeRecords({
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
     * 分页查询分销记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryDistributeRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryDistributeRecords({
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
     * 分页查询法币提现记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryWithdrawLegals ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryWithdrawLegals({
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
     * 修改法币提现
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateWithdrawLegal ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateWithdrawLegal({
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
     * 分页查询IM钱包提现记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryWithdrawSuishens ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryWithdrawSuishens({
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
     * 修改IM提现
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateWithdrawSuishen({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateWithdrawSuishen({
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
     * 分页查询锁仓列表
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryBeanLocks ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryBeanLocks({
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
     * 添加锁仓记录
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveBeanLock ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveBeanLock({
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
     * 撤销锁仓
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlecancelBeanLock ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        cancelBeanLock({
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
     * 分页查询提前退出列表
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryAngelQuitRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryAngelQuitRecords({
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
     * 更新提前退出审核状态
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateAngelQuitRecord ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateAngelQuitRecord({
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
     * 充值/扣款用户的福豆、活跃度、福利值
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleoperUserFobBean ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        operUserFobBean({
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
     * 分页查询系统充值
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequerySystemFobBeanRecords ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        querySystemFobBeanRecords({
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
     * 分页查询交易市场列表
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryBusinessLists ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryBusinessLists({
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
     * 分页查询购入列表
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryBusinessDetails ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryBusinessDetails({
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
     * 更新购入订单详情状态
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateBusinessDetailStatus ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateBusinessDetailStatus({
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
