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
    "data": [{
      "userId": 1,
      "nickname": "福友29DK96", // 用户昵称
      "phone": "18819462476", // 手机号
      "loginPassword": null,
      "payPassword": null,
      "type": 2, // 1-后台。2-安卓。3-IOS
      "image": "http%3A%2F%2Fwww.baidu.com%2FheadImage%2F2019%2F1%2F31%2F201901312001442965597.png", // 用户头像
      "status": 1, // 1-正常，2-冻结
      "oneCommendUserId": 0,
      "twoCommendUserId": 0,
      "inviteCode": "29DK96", // 邀请码
      "createDate": 1549938790000, // 创建时间
      "loginDate": 1549025298000, // 登录时间
      "ipAddress": "0:0:0:0:0:0:0:1", // IP地址
      "userAddress": {
        "addressId": 0,
        "userId": 1,
        "name": null, //收货人姓名
        "phone": "18819462476", // 收货人姓名
        "basicAddress": null, // 收货基本地址
        "detailAddress": null, // 收货详细地址
        "extend": null
      },
      "userDetail": {
        "userId": 0,
        "alipayCode": "18819462476", // 支付宝地址
        "bankcardCode": "6666666", // 银行卡
        "bankcardName": "工商银行", //
        "bankcardPhone": null, //
        "birthday": null, // 出生年月
        "idcardCode": "11", // 身份证
        "idcardAddress": null, //身份证地址
        "realName": null, // 身份证真实姓名
        "bankcardOwner": null, // 银行卡持有人
        "extend": null
      },
      "userToken": null,
      "oneCommendUser": {
        "nickname": "福友4KG5Q8", // 一级推荐人姓名
        "image": null,
        "phone": "18819462477"
      },
      "twoCommendUser": {
        "nickname": "福友123456", //二级推荐人姓名
        "image": null,
        "phone": "18819462478"
      }
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 1,
    "other": null
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
  },
  queryUserValues: {
    "data": [{
      "userId": 2,
      "welfareValue": 902.5892, // 有效的福利值
      "activeValue": 15, // 有效的活跃度
      "freezeWelfareValue": 0.0000, // 被系统冻结的福利值
      "freezeActive": 0, // 被系统冻结的活跃度
      "postUser": {
        "nickname": "福友4KG5Q8", // 昵称
        "image": null,
        "phone": "18819462477" // 手机号
      }
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 1,
    "other": null
  },
  queryWelfareRecords: {
    "data": [{
      "welfareId": 1,
      "userId": 2,
      "welfareValue": 40.4892, //  福利值
      "type": 3, // 对应上面的type
      "createDate": 1548298395000, //？、 时间
      "desc": "6a014023731f41bc88b1766d5dd5c8f3",
      "postUser": {
        "nickname": "福友4KG5Q8", // 昵称
        "image": null,
        "phone": "18819462477" // 手机号
      }
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 3,
    "other": null

  },
  queryActiveRecords:{
    "data": [{
      "activeId": 1,
      "userId": 1,
      "activeValue": 10, // 活跃度
      "createDate": 1548300816000,
      "type": 1, // 对应上面的type
      "recordDesc": null,
      "postUser": {
        "nickname": "福友29DK96", //用户昵称
        "image": "http%3A%2F%2Fwww.baidu.com%2FheadImage%2F2019%2F1%2F31%2F201901312001442965597.png",
        "phone": "18819462476" // 用户手机号
      }
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount":1,
    "other": null

  },
  queryWelfareTools: [{
    "toolId": 1,
    "addWelfare": 10.0000, // 添加的福利值
    "price": 1.00, // 价格 RMB
    "toolName": "青砖", // 道具名称
    "createDate": 1548314535000,
    "isSell": 1,// 是否上架 0 -是 1-否
    "extend": null
  }, {
    "toolId": 2,
    "addWelfare": 108.0000,
    "price": 9.90,
    "toolName": "油漆",
    "createDate": 1548314593000,
    "isSell": 0,
    "extend": null
  }, {
    "toolId": 3,
    "addWelfare": 1288.0000,
    "price": 99.00,
    "toolName": "木材",
    "createDate": 1548314607000,
    "isSell": 1,
    "extend": null
  }, {
    "toolId": 4,
    "addWelfare": 1388.0000,
    "price": 999.00,
    "toolName": "钢材",
    "createDate": 1548314625000,
    "isSell": 0,
    "extend": null
  }, {
    "toolId": 5,
    "addWelfare": 140888.0000,
    "price": 9999.00,
    "toolName": "金碧彩漆",
    "createDate": 1548314652000,
    "isSell": 1,
    "extend": null
  }]

};
//基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ""
}

/**
 * 查询福利值道具
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryWelfareTools = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools'];
  let temp = {
    data: result,
    code: 20000,
    msg: ""
  };
  return temp;
};
/**
 * 添加或者修改福利值道具
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const saveOrUpdateWelfareTool = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    data: {...result},
    code: 20000,
    msg: ""
  };
  return temp;
};
/**
 * 上架/下架法师道具
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const isSellWelfareTool = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['getList'];
  let temp = {
    data: {...result},
    code: 20000,
    msg: ""
  };
  return temp;
};
/**
 * 分页查询活跃度记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryActiveRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryActiveRecords'];
  let temp = {
    data: {...result},
    code: 20000,
    msg: ""
  };
  return temp;
};
/**
 * 分页查询福利值记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryWelfareRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareRecords'];
  let temp = {
    data: {...result},
    code: 20000,
    msg: ""
  };
  return temp;
};
