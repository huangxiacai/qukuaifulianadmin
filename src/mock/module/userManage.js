import { getParams } from '@/libs/util'

/**
 * 模拟数据
 * @type {{}}
 */
const USER_MAP = {
  add: {
    'user_id': 1
  },
  edit: {},
  del: {},
  getList: {
    'data': [{
      'userId': 1,
      'nickname': '福友29DK96', // 用户昵称
      'phone': '18819462476', // 手机号
      'loginPassword': null,
      'payPassword': null,
      'type': 2, // 1-后台。2-安卓。3-IOS
      'image': 'http%3A%2F%2Fwww.baidu.com%2FheadImage%2F2019%2F1%2F31%2F201901312001442965597.png', // 用户头像
      'status': 1, // 1-正常，2-冻结
      'oneCommendUserId': 0,
      'twoCommendUserId': 0,
      'inviteCode': '29DK96', // 邀请码
      'createDate': 1549938790000, // 创建时间
      'loginDate': 1549025298000, // 登录时间
      'ipAddress': '0:0:0:0:0:0:0:1', // IP地址
      'userAddress': {
        'addressId': 0,
        'userId': 1,
        'name': null, // 收货人姓名
        'phone': '18819462476', // 收货人姓名
        'basicAddress': null, // 收货基本地址
        'detailAddress': null, // 收货详细地址
        'extend': null
      },
      'userDetail': {
        'userId': 0,
        'alipayCode': '18819462476', // 支付宝地址
        'bankcardCode': '6666666', // 银行卡
        'bankcardName': '工商银行', //
        'bankcardPhone': null, //
        'birthday': null, // 出生年月
        'idcardCode': '11', // 身份证
        'idcardAddress': null, // 身份证地址
        'realName': null, // 身份证真实姓名
        'bankcardOwner': null, // 银行卡持有人
        'extend': null
      },
      'userToken': null,
      'oneCommendUser': {
        'nickname': '福友4KG5Q8', // 一级推荐人姓名
        'image': null,
        'phone': '18819462477'
      },
      'twoCommendUser': {
        'nickname': '福友123456', // 二级推荐人姓名
        'image': null,
        'phone': '18819462478'
      }
    }],
    'currentPage': 1,
    'length': 10,
    'totalCount': 1,
    'other': null
  },

  hasDeviceList: {
    'total': 5,
    'dids': [{
      'did': '1',
      'name': '已选中列表',
      'addr': '111',
      'longitude': 123456,
      'latitude': 123456,
      'owner_uid': 123456,
      'create_timesec': 123456,
      'region_id': 1
    },
    {
      'did': '2',
      'name': '已选中列表2',
      'addr': '111222',
      'longitude': 123456,
      'latitude': 123456,
      'owner_uid': 123456,
      'create_timesec': 123456,
      'region_id': 2
    }]
  }
}
// 基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ''
}

/**
 * 添加用户
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const insertUser = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['add']
  let temp = {
    body: { ...result },
    result: 0,
    errorMsg: ''
  }
  return temp
}
/**
 * 修改用户
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryUsers = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList']
  let temp = {
    data: { ...result },
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 改变用户账号状态
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateUserStatus = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList']
  let temp = {
    data: { ...result },
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询用户福利值活跃度
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryUserValues = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList']
  let temp = {
    data: { ...result },
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询用户的福豆数量
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryUserBeans = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList']
  let temp = {
    data: null,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 设置用户可访问设备授权
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const setBuserdeviceaclset = req => {
  req = JSON.parse(req.body)
  let temp = {
    body: {},
    result: 0,
    errorMsg: ''
  }
  return temp
}
