import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import {insertUser,queryUsers,updateUserStatus,queryUserValues,queryUserBeans} from './module/userManage'//用户管理
import {queryWelfareTools,saveOrUpdateWelfareTool,isSellWelfareTool,queryActiveRecords,queryWelfareRecords} from './module/activeWelfareManage'//用户管理

// 登录相关和获取用户信息
//Mock.mock(/\/login/, login)
Mock.mock(/\/v3\/user\/login/, login);
Mock.mock(/\/v3\/user\/profileget/, getUserInfo);//数据有些问题
//Mock.mock(/\/get_info/, getUserInfo)
//Mock.mock(/\/logout/, logout)
Mock.mock(/\/v3\/user\/logout/, logout);//logout
Mock.mock(/\/save_error_logger/, 'success');
//用户管理
Mock.mock(/\/manager\/user\/insertUser/, insertUser);//
Mock.mock(/\/manager\/user\/queryUsers/, queryUsers);//
Mock.mock(/\/manager\/user\/updateUserStatus/, updateUserStatus);//
Mock.mock(/\/manager\/user\/queryUserValues/, queryUserValues);//
Mock.mock(/\/manager\/user\/queryUserBeans/, queryUserBeans);//

//福利值活跃度管理
Mock.mock(/\/manager\/welfare\/queryWelfareTools/, queryWelfareTools);//
Mock.mock(/\/manager\/welfare\/saveOrUpdateWelfareTool/, saveOrUpdateWelfareTool);//
Mock.mock(/\/manager\/welfare\/isSellWelfareTool/, isSellWelfareTool);//
Mock.mock(/\/manager\/welfare\/queryActiveRecords/, queryActiveRecords);//
Mock.mock(/\/manager\/welfare\/queryWelfareRecords/, queryWelfareRecords);//
export default Mock
