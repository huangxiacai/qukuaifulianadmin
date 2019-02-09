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
        "user_type":11,
        "is_admin": 1,
        "org_code": "15011599752",
        "building_guid":"123123sdf",
        "nickname":"1栋五单元501",
        user_name:'22',
        mobile:'15011599752',
        id_number:'433130199002060477',
        states:1,
        cuid:"",
        last_timesec:'2018-01-03'
      },
      {
        "xcuid":2,
        "user_type":14,
        "is_Property": "黄小财",
        "org_code": "15011599752",
        "building_guid":"433130199902060145",
        "nickname":"1栋五单元501",
        user_name:'22',
        mobile:'15011599753',
        id_number:'123142',
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
    "users": [{
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
 * 获取小区出入记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getAccessList= req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
