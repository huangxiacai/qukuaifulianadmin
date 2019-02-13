import axios from '@/libs/api.request'
import { fudouManage } from './config'

/**
 * 分页查询每日产豆记录接口
 * @param params
 * @returns {*}
 */
export const queryBeanProductRecords = (params) => {
  const data = {
    ...params
  };
  return axios.request({
    url: fudouManage.queryBeanProductRecords,
    data,
    method: 'post'
  })
}
/**
 * 分页查询转账记录
 * @param params
 * @returns {*}
 */
export const queryAccountTransferRecords = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryAccountTransferRecords,
    data,
    method: 'post'
  })
}
/**
 * 查询福袋转换汇率
 * @param params
 * @returns {*}
 */
export const queryBeanTransferRates = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryBeanTransferRates,
    data,
    method: 'post'
  })
}
/**
 * 修改福袋转换汇率
 * @param params
 * @returns {*}
 */
export const updateBeanTransferRate = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.updateBeanTransferRate,
    data,
    method: 'post'
  })
};
/**
 * 分页查询福袋转换记录
 * @param params
 * @returns {*}
 */
export const queryBeanTransferRecords = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryBeanTransferRecords,
    data,
    method: 'post'
  })
}
/**
 * 分页查询福豆价格
 * @param params
 * @returns {*}
 */
export const queryBeanPrices = (params) => {
  const data = {
    ...params
  };
  return axios.request({
    url: fudouManage.queryBeanPrices,
    data,
    method: 'post'
  })
}
/**
 * 添加/修改福豆价格
 * @param params
 * @returns {*}
 */
export const saveOrUpdateBeanPrice = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.saveOrUpdateBeanPrice,
    data,
    method: 'post'
  })
}
/**
 * 分页查询分销记录
 * @param params
 * @returns {*}
 */
export const queryDistributeRecords = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryDistributeRecords,
    data,
    method: 'post'
  })
}
/**
 * 分页查询法币提现记录
 * @param params
 * @returns {*}
 */
export const queryWithdrawLegals = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryWithdrawLegals,
    data,
    method: 'post'
  })
}
/**
 * 修改法币提现
 * @param params
 * @returns {*}
 */
export const updateWithdrawLegal = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.updateWithdrawLegal,
    data,
    method: 'post'
  })
}
/**
 * 分页查询IM钱包提现记录
 * @param params
 * @returns {*}
 */
export const queryWithdrawSuishens = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryWithdrawSuishens,
    data,
    method: 'post'
  })
}
/**
 * 修改IM提现
 * @param params
 * @returns {*}
 */
export const updateWithdrawSuishen = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.updateWithdrawSuishen,
    data,
    method: 'post'
  })
}
/**
 * 分页查询锁仓列表
 * @param params
 * @returns {*}
 */
export const queryBeanLocks = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryBeanLocks,
    data,
    method: 'post'
  })
}
/**
 * 添加锁仓记录
 * @param params
 * @returns {*}
 */
export const saveBeanLock = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.saveBeanLock,
    data,
    method: 'post'
  })
}
/**
 * 撤销锁仓
 * @param params
 * @returns {*}
 */
export const cancelBeanLock = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.cancelBeanLock,
    data,
    method: 'post'
  })
};
/**
 * 分页查询提前退出列表
 * @param params
 * @returns {*}
 */
export const queryAngelQuitRecords = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryAngelQuitRecords,
    data,
    method: 'post'
  })
};
/**
 * 更新提前退出审核状态
 * @param params
 * @returns {*}
 */
export const updateAngelQuitRecord = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.updateAngelQuitRecord,
    data,
    method: 'post'
  })
};
/**
 * 充值/扣款用户的福豆、活跃度、福利值
 * @param params
 * @returns {*}
 */
export const operUserFobBean = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.operUserFobBean,
    data,
    method: 'post'
  })
};
/**
 * 分页查询系统充值
 * @param params
 * @returns {*}
 */
export const querySystemFobBeanRecords = (params) => {
    const data = {
      ...params
    }
    return axios.request({
      url: fudouManage.querySystemFobBeanRecords,
      data,
      method: 'post'
    })
  };
/**
 * 分页查询交易市场列表
 * @param params
 * @returns {*}
 */
export const queryBusinessLists = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryBusinessLists,
    data,
    method: 'post'
  })
};
/**
 * 分页查询购入列表
 * @param params
 * @returns {*}
 */
export const queryBusinessDetails = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.queryBusinessDetails,
    data,
    method: 'post'
  })
};

/**
 * 更新购入订单详情状态
 * @param params
 * @returns {*}
 */
export const updateBusinessDetailStatus = (params) => {
  const data = {
    ...params
  }
  return axios.request({
    url: fudouManage.updateBusinessDetailStatus,
    data,
    method: 'post'
  })
};
