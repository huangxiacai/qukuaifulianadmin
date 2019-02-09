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
    "total":5,
    "users": [
      {
        "xcuid":1,
        "user_type":"123142",
        "is_admin": "黄小财",
        "org_code": "15011599752",
        "building_guid":"433130199902060145",
        "nickname":"1栋五单元501",
        user_name:'22',
        mobile:'2018-01-03',
        id_number:'433130199002060477',
        states:1,
        cuid:"",
        last_timesec:'2018-01-03'
      },
      {
        "xcuid":2,
        "user_type":"123142",
        "is_admin": "黄小财",
        "org_code": "15011599752",
        "building_guid":"433130199902060145",
        "nickname":"1栋五单元501",
        user_name:'22',
        mobile:'2018-01-03',
        id_number:'433130199002060477',
        states:2,
        cuid:"",
        last_timesec:'2018-01-03'
      }
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
 * 添加小区
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const addAdmin = req => {
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
 * edit 小区
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const editAdmin = req => {
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
 * del 小区
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const delAdmin = req => {
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
 * 获取小区
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getAdmin= req => {
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
 * 设置管理 员 状态
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const setAdminStatus = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['del'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};

