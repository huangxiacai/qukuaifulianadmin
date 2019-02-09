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
    "community": [
      {
        "id":1,
        "name":"小区一号",
        "addr": "天府广场",
        "qrcode": "http://www.baidu.com",
        "status":1,
        "contract_expiration_date":"2018-01-02",
        create_timesec:'2018-01-02',
        cuid:11,
      },
      {
        "id":2,
        "name":"小区2号",
        "addr": "天府广场2",
        "qrcode": "http://www.baidu.com",
        "status":3,
        "contract_expiration_date":"2018-01-02",
        create_timesec:'2018-01-03',
        cuid:11,
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
export const addCommunity = req => {
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
export const editCommunity = req => {
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
export const delCommunity = req => {
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
export const getCommunity = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
