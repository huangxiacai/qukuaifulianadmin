import axios from '@/libs/api.request'
import {homeIndex, userManage} from './config'

/**
 * 上传文件
 * @param userName
 * @param password
 * @returns {*}
 */
export const querySomeConstants = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: homeIndex.querySomeConstants,
    data,
    method: 'post'
  })
}
export const querySystemTotalBean = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: homeIndex.querySystemTotalBean,
    data,
    method: 'post'
  })
}
export const queryIMSuccessTotalBean = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: homeIndex.queryIMSuccessTotalBean,
    data,
    method: 'post'
  })
}
export const querySystemRecoryTotalBean = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: homeIndex.querySystemRecoryTotalBean,
    data,
    method: 'post'
  })
}
