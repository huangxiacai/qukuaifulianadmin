import { login, logout, getUserInfo, userEditPass, userSendVcode, userRecoverPass } from '../../api/user'
import { setToken, getToken } from '@/libs/util'
import md5 from 'js-md5'
import config from '../../config/index'
import adminIcon from '@/assets/images/logo-min.png'
import { setUserNameCookie } from '../../libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
      setUserNameCookie(name)
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      return new Promise((resolve, reject) => {
        debugger
        login({
          username: userName,
          password: password
        }).then(res => {
          if (res.code === 20000) {
            resolve(res)
          } else {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setUserName', '')
          localStorage.clear()
          sessionStorage.clear()
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(res => {
            const data = res.data
            // 状态机缓存用户基本信息
            commit('setAvator', adminIcon)
            commit('setToken', data.username)
            commit('setUserName', data.username)
            commit('setUserId', data.userId)// 保存user id
            commit('setAccess', 'admin')
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * 用户修改密码
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleUserEditPass ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        userEditPass({
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
     * 发送验证码
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleSendVcode ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        let getCurrTime = Math.round(new Date().getTime() / 1000)// 获取当前时间 秒
        let access_secret = config.client.ClientSeckey// ClientSeckey
        userSendVcode({
          'client_id': config.client.client_id,
          'req_time': getCurrTime,
          'client_signkey': md5(access_secret + '' + getCurrTime),
          new_pass: params.new_pass,
          ...params
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 找回密码
     * @param state
     * @param commit
     * @param params
     * @returns {Promise<any>}
     */
    handleRecoverPass ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        let getCurrTime = Math.round(new Date().getTime() / 1000)// 获取当前时间 秒
        let access_secret = config.client.ClientSeckey// ClientSeckey

        userRecoverPass({
          'client_id': config.client.client_id,
          'req_time': getCurrTime,
          country_code: 'china',
          'client_signkey': md5(access_secret + '' + getCurrTime),
          ...params,
          new_pass: md5(params.new_pass)
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
