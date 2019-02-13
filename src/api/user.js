import axios from '@/libs/api.request'
import { userManage } from './config'

/**
 * 登录
 * @param userName
 * @param password
 * @returns {*}
 */
export const login = (params) => {
  return axios.request({
    url: userManage.login,
    data: {
      ...params
    },
    method: 'post'
  })
}
/**
 * 获取用户基本信息
 * @param token
 * @returns {*}
 */
export const getUserInfo = (data) => {
  return axios.request({
    url: userManage.profileget,
    data: data,
    method: 'post'
  })
}

/**
 * 退出登录
 * @param token
 * @returns {*}
 */
export const logout = (token) => {
  let data = {
    access_token: token
  }
  return axios.request({
    url: userManage.logout,
    method: 'post',
    data
  })
}
/**
 * 用户修改密码
 * @param params
 * @returns {*}
 */
export const userEditPass = (params) => {
  let data = {
    ...params
  }
  return axios.request({
    url: user.changepass,
    method: 'post',
    data
  })
}
/**
 * 用户发送验证码
 * @param params
 * @returns {*}
 */
export const userSendVcode = (params) => {
  let data = {
    ...params
  }
  return axios.request({
    url: user.sendVcode,
    method: 'post',
    data
  })
}
/**
 * 找回密码
 * @param params
 * @returns {*}
 */
export const userRecoverPass = (params) => {
  let data = {
    ...params
  }
  return axios.request({
    url: user.recoverPass,
    method: 'post',
    data
  })
}
