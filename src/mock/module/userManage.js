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
    "total": 2,
    "users": [
      {
        "user_id": 123456,
        "mobile": "15011599752",
        "full_name": "老板娘",
        "region_id": 1,
        "status": 1
      },
      {
        "user_id": 123456,
        "mobile": "15011599752",
        "full_name": "伙计",
        "region_id": 1,
        "status": 3
      },
      {
        "user_id": 123456,
        "mobile": "16653214568",
        "full_name": "店小二",
        "region_id": 2,
        "status": 2
      }
    ]
  },
  hasDeviceList: {
    "total": 5,
    "dids": [{
      "did": "1",
      "name": "已选中列表",
      "addr": "111",
      "longitude": 123456,
      "latitude": 123456,
      "owner_uid": 123456,
      "create_timesec": 123456,
      "region_id": 1
    },
      {
        "did": "2",
        "name": "已选中列表2",
        "addr": "111222",
        "longitude": 123456,
        "latitude": 123456,
        "owner_uid": 123456,
        "create_timesec": 123456,
        "region_id": 2
      }]
  }
  };
//基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ""
}

/**
 * 添加用户
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const addUser = req => {
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
 * 修改用户
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const editUser = req => {
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
 * 删除用户
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const delUser = req => {
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
 * 获取用户列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getUserList = req => {
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
 * 获取授权给用户的设备列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getDevicelistbyuser = req => {
  req = JSON.parse(req.body);
  let result = USER_MAP['hasDeviceList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
/**
 * 设置用户可访问设备授权
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const setBuserdeviceaclset=req=>{
  req = JSON.parse(req.body);
  let temp = {
    body: {},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
