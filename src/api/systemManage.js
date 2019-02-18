import axios from '@/libs/api.request'
import { systemManage } from './config'

/**
 * 分页查询公告
 * @param params
 * @returns {*}
 */
export const queryNotices = (params) => {
  const data = {
    ...params
  };
  return axios.request({
    url: systemManage.queryNotices,
    data,
    method: 'post'
  })
}
/**
 * 添加或者修改公告
 * @param params
 * @returns {*}
 */
export const saveOrUpdateNotice = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.saveOrUpdateNotice,
    data,
    method: 'post'
  })
}
/**
 * 删除公告
 * @param params
 * @returns {*}
 */
export const deleteNotice = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.deleteNotice,
    data,
    method: 'post'
  })
}
/**
 * 查询首页音乐
 * @param params
 * @returns {*}
 */
export const queryMusics = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.queryMusics,
    data,
    method: 'post'
  })
}
/**
 * 添加或者删除音乐
 * @param params
 * @returns {*}
 */
export const saveOrUpdateMusic = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.saveOrUpdateMusic,
    data,
    method: 'post'
  })
}
/**
 * 删除音乐
 * @param params
 * @returns {*}
 */
export const deleteMusic = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.deleteMusic,
    data,
    method: 'post'
  })
}
/**
 * 查询所有的法师
 * @param params
 * @returns {*}
 */
export const queryRabbis = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.queryRabbis,
    data,
    method: 'post'
  })
}
/**
 * 添加或者修改法师
 * @param params
 * @returns {*}
 */
export const saveOrUpdateRabbi = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.saveOrUpdateRabbi,
    data,
    method: 'post'
  })
}
/**
 * 上架/下架法师
 * @param params
 * @returns {*}
 */
export const isSellRabbi = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.isSellRabbi,
    data,
    method: 'post'
  })
}
/**
 * 分页查询常量
 * @param params
 * @returns {*}
 */
export const queryDictionarys = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.queryDictionarys,
    data,
    method: 'post'
  })
}
/**
 * 修改常量值
 * @param params
 * @returns {*}
 */
export const updateDictionary = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.updateDictionary,
    data,
    method: 'post'
  })
}
/**
 * 分页查询帖子
 * @param params
 * @returns {*}
 */
export const queryPosts = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.queryPosts,
    data,
    method: 'post'
  })
}
/**
 * 是否删除帖子
 * @param params
 * @returns {*}
 */
export const isDeletePost = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.isDeletePost,
    data,
    method: 'post'
  })
}
/**
 * 是否置顶帖子
 * @param params
 * @returns {*}
 */
export const isStickPost = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.isStickPost,
    data,
    method: 'post'
  })
};
/**
 * 分页查询用户购买的法师
 * @param params
 * @returns {*}
 */
export const queryUserRabbis = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.queryUserRabbis,
    data,
    method: 'post'
  })
};
/**
 * 删除用户法师
 * @param params
 * @returns {*}
 */
export const deleteUserRabbi = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: systemManage.deleteUserRabbi,
    data,
    method: 'post'
  })
};
