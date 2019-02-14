import {
  queryNotices,
  saveOrUpdateNotice,
  deleteNotice,
  queryMusics,
  saveOrUpdateMusic,
  deleteMusic,
  queryRabbis,
  saveOrUpdateRabbi,
  isSellRabbi,
  queryDictionarys,
  updateDictionary,
  queryPosts,
  isDeletePost,
  isStickPost,
  queryUserRabbis,
  deleteUserRabbi} from '../../api/systemManage'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    /**
     * 分页查询公告
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryNotices ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryNotices({
          ...params,
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加或者修改公告
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveOrUpdateNotice ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveOrUpdateNotice({
          ...params,

        }).then(res => {
          commit("setproductTypeData",res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 删除公告
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handledeleteNotice ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        deleteNotice({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 查询首页音乐
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryMusics ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryMusics({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加或者删除音乐
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveOrUpdateMusic ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveOrUpdateMusic({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 删除音乐
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handledeleteMusic ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        deleteMusic({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 查询所有的法师
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryRabbis({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryRabbis({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加或者修改法师
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlesaveOrUpdateRabbi ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        saveOrUpdateRabbi({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 上架/下架法师
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleisSellRabbi ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        isSellRabbi({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询常量
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryDictionarys({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryDictionarys({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 修改常量值
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleupdateDictionary ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        updateDictionary({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询帖子
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryPosts ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryPosts({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 是否删除帖子
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleisDeletePost({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        isDeletePost({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 是否置顶帖子
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleisStickPost ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        isStickPost({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 分页查询用户购买的法师
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryUserRabbis ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryUserRabbis({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 删除用户法师
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handledeleteUserRabbi ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        deleteUserRabbi({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
