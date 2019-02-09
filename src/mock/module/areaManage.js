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
    "regions": [
      {
        "region_id": 1,
        "parent_id": 0,
        "region_name": "一级"
      },
      {
        "region_id": 2,
        "parent_id": 1,
        "region_name": "二2级"
      },
      {
        "region_id": 3,
        "parent_id": 1,
        "region_name": "二3级"
      },
      {
        "region_id": 4,
        "parent_id": 1,
        "region_name": "二4级"
      },
      {
        "region_id": 5,
        "parent_id": 2,
        "region_name": "三级"
      },
    ]
  },
  getUserList: {
    "total": 123456,
    "user_ids": [123, 456]
  },
  getDeviceList: {
    "total": 123456,
    "dids": [{
      "did": "xxxxxx",
      "name": "xxxxxx",
      "addr": "xxxxxx",
      "longitude": 123456,
      "latitude": 123456,
      "owner_uid": 123456,
      "create_timesec": 123456
    }]
  },
};
//基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ""
}
/**
 * 添加区域列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getAddAreaList = req => {
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
 * edit 区域列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getEditAreaList = req => {
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
 * del 区域列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getDelAreaList = req => {
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
 * 获取区域列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getAreaList = req => {
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
 * 获取区域下的用户
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getAreaUserList = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getUserList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
/**
 * 获取区域下的设备
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getAreaDeviceList = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getDeviceList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
