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
    "rooms": [
      {
        "building_guid" : "123142",
        "room_guid" : "12",
        "room_name" : "1栋1单元205"
      },
      {
        "building_guid" : "123123sdf",
        "room_guid" : "14",
        "room_name" : "1栋4单元505"
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
export const addRoom = req => {
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
export const editRoom = req => {
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
export const delRoom = req => {
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
export const getRoom = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
