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
  queryOrders: {
    'data': [{
      'orderId': '6a014023731f41bc88b1766d5dd5c8f3', // 订单号
      'userId': 2,
      'postUser': {
        'nickname': '福友4KG5Q8', // 用户昵称
        'image': null,
        'phone': '18819462477' // 用户手机号
      },
      'payType': 1, // 支付类型 1：福豆 2:微信
      'orderAmmount': 2820, // 订单总价格
      'expressNo': null, // 快递单号
      'status': 3, // 状态 1：代发货 2：待收货 3：已发货
      'deliveryAddress': '广东省深圳市龙岗区坂田街道', // 收货地址
      'deliveryDate': null, // 收货时间
      'createDate': 1548297600000, // 订单创建时间
      'freightAmmount': 20.00, // 快递费
      'product': null,
      'num': 2, // 购买的商品数量
      'name': '邓柯', // 收货人姓名
      'phone': '18819462477', // 收货人手机 号
      'productName': '苹果6s', // 商品名称
      'logo': null, // 商品Logo
      'addWelfare': 20.2446, // 购买商品添加的福利值
      'productAmount': 1400.0000 // 单个商品价格
    }],
    'currentPage': 1,
    'length': 10,
    'totalCount': 1,
    'other': null

  },
  queryShopImages:[
    {
      "shopImageId": 2,
      "shopImage": "图片11", //轮播图图片地址
      "sort": 0, // 排序地址
      "createDate": 1548919018000,
      "status": 0,  // 0-上架 1-下架'
      "type": 0, // 0-跳转 1-不跳转
      "desc": null, // 一般存跳转标识
      "updateDate": 1548919018000
    },
    {
      "shopImageId":3,
      "shopImage": "图片2", //轮播图图片地址
      "sort": 1, // 排序地址
      "createDate": 1548919018000,
      "status": 1,  // 0-上架 1-下架'
      "type": 1, // 0-跳转 1-不跳转
      "desc": 'www.baidu.com', // 一般存跳转标识
      "updateDate": 1548919018000
    }

  ],
  queryProductTypes:{
    "data": [{
      "productTypeId": 2, // 产品分类Id
      "typeName": "数码产品", // 分类名称
      "createDate": 1548232287000,
      "sort": 0,
      "updateDate": 1548839738000
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 1,
    "other": null

  },
  queryProducts:{
    "data": [{
      "productId": 4,
      "productTypeId": 2,
      "productName": "VIVO1", // 商品名称
      "amount": 40.5556, // 福豆价格
      "addWelfare": 20.5556, // 购买商品添加的福利值
      "productDetail": "VIVO1修改详情", //商品详情
      "extend": null,
      "logo": "VIVOLOGO",// 商品LOGO图地址
      "createDate": 1548914609000, // 创建时间
      "image": "VIVO1图片", // 商品图片，多个图片通过逗号隔开
      "freight": 4.56, //商品运费
      "isSelf": 1, // 是否商家 0-否 1-是
      "productTypeName": "数码产品" // 商品分类名称
    }],
    "currentPage": 1,
    "length": 10,
    "totalCount": 4,
    "other": null

  },
  queryAllProductType:[
    {
      "productTypeId": 2, // 分类Id
      "typeName": "数码产品", // 分类名称
      "createDate": 1548232287000,
      "sort": 0,
      "updateDate": 1548839738000
    }
  ]
};
// 基本数据结构
const result = {
  body: {},
  result: 0,
  errorMsg: ''
}

/**
 * 根据Id删除商品分类
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const deleteProductTypeById = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 查询所有的商品分类
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryAllProductType = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryAllProductType']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询商品分类
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryProductTypes = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryProductTypes']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 添加或者修改产品分类
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const saveOrUpdateProductTypes = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询商品
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryProducts = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryProducts']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 添加商品
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const saveProduct = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 修改商品
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateProduct = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 上架或者下架商品
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const isSelfProduct = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 查询所有的商城轮播图
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryShopImages = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryShopImages']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 添加或者修改商城轮播图
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const saveOrUpdateShopImage = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 删除轮播图
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const deleteShopImage = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 上架/下架轮播图
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const isHideShopImage = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 分页查询订单
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const queryOrders = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryOrders']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
/**
 * 修改订单状态
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const updateOrderStatus = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['queryWelfareTools']
  let temp = {
    data: result,
    code: 20000,
    msg: ''
  }
  return temp
}
