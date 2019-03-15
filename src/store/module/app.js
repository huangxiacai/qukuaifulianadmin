import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead,
  getAccess
} from '@/libs/util'
import beforeClose from '@/router/before-close'
import { saveErrorLogger } from '@/api/data'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
import { del } from '@/api/common'
import {operUserFobBean, queryBeanProductRecords} from "../../api/fudouManage";
import {querySomeConstants,querySystemTotalBean,queryIMSuccessTotalBean,querySystemRecoryTotalBean} from '../../api/homeIndex'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers, homeName),
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, getAccess()),
    errorCount: state => state.errorList.length
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      if (route.meta && route.meta.beforeCloseName && route.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[route.meta.beforeCloseName]).then(close => {
          if (close) {
            closePage(state, route)
          }
        })
      } else {
        closePage(state, route)
      }
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    /**
     * 删除 文件
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handledelFile ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        del({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page'))
        commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    },
    /**
     * 包括每日新增用户量、每日新增业绩
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequerySomeConstants({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        querySomeConstants({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 获取查询用户各个分类的总钱包福豆
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequerySystemTotalBean({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        querySystemTotalBean({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 获取查询所有提现的IMTOKEN钱包总数量
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequeryIMSuccessTotalBean({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        queryIMSuccessTotalBean({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 获取查询系统回收的总数量
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handlequerySystemRecoryTotalBean({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        querySystemRecoryTotalBean({
          ...params,

        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
  }
}
