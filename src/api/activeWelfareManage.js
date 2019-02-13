import axios from '@/libs/api.request'
import { activeWelfareManage } from './config'

/**
 * 查询福利值道具
 * @param params
 * @returns {*}
 */
export const queryWelfareTools = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: activeWelfareManage.queryWelfareTools,
    data,
    method: 'post'
  })
}
/**
 * 添加或者修改福利值道具
 * @param params
 * @returns {*}
 */
export const saveOrUpdateWelfareTool = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: activeWelfareManage.saveOrUpdateWelfareTool,
    data,
    method: 'post'
  })
}
/**
 * 上架/下架法师道具
 * @param params
 * @returns {*}
 */
export const isSellWelfareTool = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: activeWelfareManage.isSellWelfareTool,
    data,
    method: 'post'
  })
}
/**
 * 分页查询活跃度记录
 * @param params
 * @returns {*}
 */
export const queryActiveRecords = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: activeWelfareManage.queryActiveRecords,
    data,
    method: 'post'
  })
}
/**
 * 分页查询福利值记录
 * @param params
 * @returns {*}
 */
export const queryWelfareRecords = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: activeWelfareManage.queryWelfareRecords,
    data,
    method: 'post'
  })
}
