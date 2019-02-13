import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { insertUser, queryUsers, updateUserStatus, queryUserValues, queryUserBeans } from './module/userManage'// 用户管理
import { queryWelfareTools, saveOrUpdateWelfareTool, isSellWelfareTool, queryActiveRecords, queryWelfareRecords } from './module/activeWelfareManage'// 用户管理
import {
  deleteProductTypeById,
  queryAllProductType,
  queryProductTypes,
  saveOrUpdateProductTypes,
  queryProducts,
  saveProduct,
  updateProduct,
  isSelfProduct,
  queryShopImages,
  saveOrUpdateShopImage,
  deleteShopImage,
  isHideShopImage,
  queryOrders,
  updateOrderStatus } from './module/shopManage'
import {
  queryBeanProductRecords,
  queryAccountTransferRecords,
  queryBeanTransferRates,
  updateBeanTransferRate,
  queryBeanTransferRecords,
  queryBeanPrices,
  saveOrUpdateBeanPrice,
  queryDistributeRecords,
  queryWithdrawLegals,
  updateWithdrawLegal,
  queryWithdrawSuishens,
  updateWithdrawSuishen,
  queryBeanLocks,
  saveBeanLock,
  cancelBeanLock,
  queryAngelQuitRecords,
  updateAngelQuitRecord,
  operUserFobBean,
  querySystemFobBeanRecords,
  queryBusinessLists,
  queryBusinessDetails,
  updateBusinessDetailStatus} from './module/fudouManage'
// 登录相关和获取用户信息
// Mock.mock(/\/login/, login)
Mock.mock(/\/v3\/user\/login/, login)
Mock.mock(/\/v3\/user\/profileget/, getUserInfo)// 数据有些问题
// Mock.mock(/\/get_info/, getUserInfo)
// Mock.mock(/\/logout/, logout)
Mock.mock(/\/v3\/user\/logout/, logout)// logout
Mock.mock(/\/save_error_logger/, 'success')
// 用户管理
Mock.mock(/\/manager\/user\/insertUser/, insertUser)//
Mock.mock(/\/manager\/user\/queryUsers/, queryUsers)//
Mock.mock(/\/manager\/user\/updateUserStatus/, updateUserStatus)//
Mock.mock(/\/manager\/user\/queryUserValues/, queryUserValues)//
Mock.mock(/\/manager\/user\/queryUserBeans/, queryUserBeans)//

// 福利值活跃度管理
Mock.mock(/\/manager\/welfare\/queryWelfareTools/, queryWelfareTools)//
Mock.mock(/\/manager\/welfare\/saveOrUpdateWelfareTool/, saveOrUpdateWelfareTool)//
Mock.mock(/\/manager\/welfare\/isSellWelfareTool/, isSellWelfareTool)//
Mock.mock(/\/manager\/welfare\/queryActiveRecords/, queryActiveRecords)//
Mock.mock(/\/manager\/welfare\/queryWelfareRecords/, queryWelfareRecords)//
// 商城管理
Mock.mock(/\/manager\/shop\/deleteProductTypeById/, deleteProductTypeById)//
Mock.mock(/\/manager\/shop\/queryAllProductType/, queryAllProductType)//
Mock.mock(/\/manager\/shop\/queryProductTypes/, queryProductTypes)//
Mock.mock(/\/manager\/shop\/saveOrUpdateProductTypes/, saveOrUpdateProductTypes)//
Mock.mock(/\/manager\/shop\/queryProducts/, queryProducts)//
Mock.mock(/\/manager\/shop\/saveProduct/, saveProduct)//
Mock.mock(/\/manager\/shop\/updateProduct/, updateProduct)//
Mock.mock(/\/manager\/shop\/isSelfProduct/, isSelfProduct)//
Mock.mock(/\/manager\/shop\/queryShopImages/, queryShopImages)//
Mock.mock(/\/manager\/shop\/saveOrUpdateShopImage/, saveOrUpdateShopImage)//
Mock.mock(/\/manager\/shop\/deleteShopImage/, deleteShopImage)//
Mock.mock(/\/manager\/shop\/isHideShopImage/, isHideShopImage)//
Mock.mock(/\/manager\/shop\/queryOrders/, queryOrders)//
Mock.mock(/\/manager\/shop\/updateOrderStatus/, updateOrderStatus)//
//福豆管理
Mock.mock(/\/manager\/fobBean\/queryBeanProductRecords/, queryBeanProductRecords)//
Mock.mock(/\/manager\/fobBean\/queryAccountTransferRecords/, queryAccountTransferRecords)//
Mock.mock(/\/manager\/fobBean\/queryBeanTransferRates/, queryBeanTransferRates)//
Mock.mock(/\/manager\/fobBean\/updateBeanTransferRate/, updateBeanTransferRate)//
Mock.mock(/\/manager\/fobBean\/queryBeanTransferRecords/, queryBeanTransferRecords)//
Mock.mock(/\/manager\/fobBean\/queryBeanPrices/, queryBeanPrices)//
Mock.mock(/\/manager\/fobBean\/saveOrUpdateBeanPrice/, saveOrUpdateBeanPrice)//
Mock.mock(/\/manager\/fobBean\/queryDistributeRecords/, queryDistributeRecords)//
Mock.mock(/\/manager\/fobBean\/queryWithdrawLegals/, queryWithdrawLegals)//
Mock.mock(/\/manager\/fobBean\/updateWithdrawLegal/, updateWithdrawLegal)//
Mock.mock(/\/manager\/fobBean\/queryWithdrawSuishens/, queryWithdrawSuishens)//
Mock.mock(/\/manager\/fobBean\/updateWithdrawSuishen/, updateWithdrawSuishen)//
Mock.mock(/\/manager\/fobBean\/queryBeanLocks/, queryBeanLocks)//
Mock.mock(/\/manager\/fobBean\/saveBeanLock/, saveBeanLock)//
Mock.mock(/\/manager\/fobBean\/cancelBeanLock/, cancelBeanLock)//
Mock.mock(/\/manager\/fobBean\/queryAngelQuitRecords/, queryAngelQuitRecords)//
Mock.mock(/\/manager\/fobBean\/updateAngelQuitRecord/, updateAngelQuitRecord)//
Mock.mock(/\/manager\/fobBean\/operUserFobBean/, operUserFobBean)//
Mock.mock(/\/manager\/fobBean\/querySystemFobBeanRecords/, querySystemFobBeanRecords)//
Mock.mock(/\/manager\/fobBean\/queryBusinessLists/, queryBusinessLists)//
Mock.mock(/\/manager\/fobBean\/queryBusinessDetails/, queryBusinessDetails)//
Mock.mock(/\/manager\/fobBean\/updateBusinessDetailStatus/, updateBusinessDetailStatus)//

export default Mock
