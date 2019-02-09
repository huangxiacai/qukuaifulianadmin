import {getParams} from '@/libs/util'

/**
 * 模拟数据
 * @type {{}}
 */
const USER_MAP = {
  add: {
    "user_id": 1
  },
  edit: {},
  del: {},
  getList: {
    "total": 123456,
    "devices": [{
      name:'1号设备',
      "cuid" : 123456,
      "org_code" : "xxxxxx",
      "building_guid" : "123142",
      "did" : "123",
      "direction" : 1,
      "site" : "西门",
      "last_timesec":123456
    },
      {
        name:'2号设备',
        "cuid" : 123456,
        "org_code" : "xxxxxx",
        "building_guid" : "123123sdf",
        "did" : "345",
        "direction" : 2,
        "site" : "2号门",
        "last_timesec":123456
      }]

  },
  getUserOperationDevice: {
    "uids": [
      {"user_id": 123456,
      "acl": [123, 456]}]
  }
};
//基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ""
}

/**
 * 添加设备
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const addDevice = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['add'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
/**
 * 修改设备
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const editDevice = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['edit'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
/**
 * 删除设备
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const delDevice = req => {
  debugger
  req = JSON.parse(req.body)
  let result = USER_MAP['del'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
/**
 * 获取设备列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getDevice = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
/**
 * 获取 可操作此设备 的用户
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getUserOperationDevice = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getUserOperationDevice'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
