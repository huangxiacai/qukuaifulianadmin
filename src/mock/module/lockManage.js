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
    "pwd_lists": [
      {
        "pwd_idx": 123456,
        "pwd_type": 1,
        "pwd_role": 1,
        "pwd_name": "xxxxxx"
      }]

  },
  getUserOperationDevice: {
    "uids": [
      {
        "user_id": 123456,
        "acl": [123, 456]
      }]
  },
  UseRecords: {
    "total": 123456,
    "lists": [{
      "did": "1",
      "sdid": "xxxxxx",
      "pwd_name": "xxxxxx",
      "utc_timesec": 123456,
      "status": 1,
      "pwd_idx": 123456,
      "pwd_type": 1
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
 * 添加门锁密码
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const addLockPass = req => {
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
 * 修改门锁密码
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const editLockPass = req => {
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
 * 删除门锁密码
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const delLockPass = req => {
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
 * 获取门锁密码列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getLockPassList = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
export const getPassUseRecordsList = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['UseRecords'];
  let temp = {
    body: {...result},
    result: 0,
    errorMsg: ""
  };
  return temp;
};
