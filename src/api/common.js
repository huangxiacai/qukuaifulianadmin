import axios from '@/libs/api.request'
import { common } from './config'

/**
 * 上传文件
 * @param userName
 * @param password
 * @returns {*}
 */
export const upload = (params) => {
  return axios.request({
    url: common.upload,
    data: {
      ...params
    },
    method: 'post'
  })
}
/**
 * 删除 文件
 * @param token
 * @returns {*}
 */
export const del = (data) => {
  return axios.request({
    url: common.delete,
    data: data,
    method: 'post'
  })
}
