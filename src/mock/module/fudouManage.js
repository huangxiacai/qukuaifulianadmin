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
  querySystemFobBeanRecords:{
    "data": [{
      "recordId": 9,
      "userId": 1,
      "amount": 200.7200, //数量
      "type": 3, //充值类型 1-随身福袋 2-福报福袋 3-社区福袋 4-法币福袋 5-可解锁福豆  6-福利值 7-活跃度
      "status": 1, // 1-充值 2-扣款
      "createDate": 1549433038000, // 操作时间
      "postUser": {
        "nickname": "福友29DK96", // 昵称
        "image": null,
        "phone": "18819462476" // 手机号
      }
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 1,
    "other": null
  },
  queryBeanProductRecords:{
    "data": [{
      "beanProductId": 27,
      "beanNum": 5806.8000, // 产豆数量
      "status": 0, // 领取状态 0-未领取 1-已领取
      "createDate": 1549382400000, //产豆时间
      "userId": 2,
      "finalBeanNum": 0.0000, // 最终领取的福豆数量
      "postUser": {
        "nickname": "福友4KG5Q8", // 用户昵称
        "image": null,
        "phone": "18819462477" // 用户手机号
      }
    }],
    "currentPage": 1, //当前分页索引
    "length": 10,//分页条数
    "totalCount": 1,//数据总记录数
    "other": null
  },
  queryBeanLocks:{
    "data": [{
      "beanLockId": 3,
      "userId": 1,
      "amount": 0.0000, // 正在锁仓的数量
      "freezeAmount": 0.0000, // 冻结的数量【一般为申请提前退出的数量】
      "finishAmount": 133.0000, // 已经释放的数量
      "createDate": 1541666392000, // 产生时间
      "ruleType": 2, //锁仓类型 0-到期一次释放,1-每个月释放,2-到期后每个月释放
      "ruleValue": "1,3", //如果ruleType = 1 ,那么这个值就是n天释放。如果ruleType=2，那么这个值就是n个月释放。如果ruleType=3，那么这个值就是n1天到期，n2个月释放完
      "type": 1, // 1 - 天使投资， 2-奖励福豆
      "status": 0, // 0-正常锁仓 1-被后台撤销
      "postUser": {
        "nickname": "福友29DK96", // 昵称
        "image": null,
        "phone": "18819462476" // 手机号
      }
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 1,
    "other": null

  },
  queryAngelQuitRecords:{
    "data": [{
      "recordId": 1,
      "beanLockId": 1,
      "amount": 1000.0000, // 申请提前退出的数量
      "createDate": 1548759327000, // 申请时间
      "status": 1, // 申请状态 0-审核中 1-审核完成 2-审核失败
      "beanLock": { //对应锁仓的详情
        "beanLockId": 1,
        "userId": 1,
        "amount": 1000.0000, // 锁仓的数量
        "freezeAmount": 0.0000, // 冻结的数量
        "finishAmount": 100.0000, // 完成锁仓的数量
        "createDate": 1548759327000, // 锁仓时间
        "ruleType": 0, //
        "ruleValue": "1",
        "type": 1,
        "status": 1,
        "postUser": {
          "nickname": "福友29DK96", // 用户昵称
          "image": null,
          "phone": "18819462476" // 用户手机号
        }
      }
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 1,
    "other": null

  }
};
// 基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ''
}

/**
 * 分页查询每日产豆记录接口
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryBeanProductRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryBeanProductRecords'];
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询转账记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryAccountTransferRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryAccountTransferRecords']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 查询福袋转换汇率
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryBeanTransferRates = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryBeanTransferRates']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 修改福袋转换汇率
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateBeanTransferRate = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['updateBeanTransferRate']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询福袋转换记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryBeanTransferRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryBeanTransferRecords']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询福豆价格
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryBeanPrices = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryBeanPrices']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 添加/修改福豆价格
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const saveOrUpdateBeanPrice = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['saveOrUpdateBeanPrice']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询分销记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryDistributeRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryDistributeRecords']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询法币提现记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryWithdrawLegals = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWithdrawLegals']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 修改法币提现
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateWithdrawLegal = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['updateWithdrawLegal']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询IM钱包提现记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryWithdrawSuishens = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWithdrawSuishens']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 修改IM提现
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateWithdrawSuishen = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['updateWithdrawSuishen']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询锁仓列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryBeanLocks = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryBeanLocks']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 添加锁仓记录
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const saveBeanLock = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['saveBeanLock']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 撤销锁仓
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const cancelBeanLock = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['cancelBeanLock']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 分页查询提前退出列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryAngelQuitRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryAngelQuitRecords']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 更新提前退出审核状态
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateAngelQuitRecord = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['updateAngelQuitRecord']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 充值/扣款用户的福豆、活跃度、福利值
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const operUserFobBean = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['operUserFobBean']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 分页查询系统充值
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const querySystemFobBeanRecords = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['querySystemFobBeanRecords']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 分页查询交易市场列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryBusinessLists = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryBusinessLists']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 分页查询购入列表
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryBusinessDetails = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryBusinessDetails']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
/**
 * 更新购入订单详情状态
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateBusinessDetailStatus = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['updateBusinessDetailStatus']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
};
