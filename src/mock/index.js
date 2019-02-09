import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData, getDragList } from './data'
import {addUser,editUser,delUser,getUserList,getDevicelistbyuser,setBuserdeviceaclset} from './module/userManage'//用户管理
import {getDevice,addDevice,editDevice,delDevice} from './module/deviceManage'//设备管理
import {getAreaList,getAddAreaList,getDelAreaList,getEditAreaList,getAreaUserList,getAreaDeviceList} from './module/areaManage'//区域管理
import {addLockPass,editLockPass,delLockPass,getLockPassList,getPassUseRecordsList} from './module/lockManage';
import {getCommunity,addCommunity,editCommunity,delCommunity} from './module/community'//小区管理
import {getOwner,addOwner,editOwner,delOwner} from './module/ownerManage'//业主管理
import {getAdmin,addAdmin,editAdmin,delAdmin,setAdminStatus} from './module/adminManage'//管理员管理
import {getProperty,addProperty,editProperty,delProperty} from './module/propertyList'//管理员管理
import {getRoom,addRoom,editRoom,delRoom} from './module/roomManage'//管理员管理
import {getAccessList} from './module/accessList'//管理员管理
// 登录相关和获取用户信息
//Mock.mock(/\/login/, login)
Mock.mock(/\/v3\/user\/login/, login);
Mock.mock(/\/v3\/user\/profileget/, getUserInfo);//数据有些问题
//Mock.mock(/\/get_info/, getUserInfo)
//Mock.mock(/\/logout/, logout)
Mock.mock(/\/v3\/user\/logout/, logout);//logout
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success');
//用户管理
Mock.mock(/\/v3\/tobbase\/busercreate/, addUser);//
Mock.mock(/\/v3\/tobbase\/buseredit/, editUser);//
Mock.mock(/\/v3\/tobbase\/buserdel/, delUser);//
Mock.mock(/\/v3\/tobbase\/buserlist/, getUserList);//
Mock.mock(/\/v3\/tobbase\/bdevicelistbyuser/, getDevicelistbyuser);//获取授权给用户的设备列表
Mock.mock(/\/v3\/tobbase\/buserdeviceaclset/, setBuserdeviceaclset);//设置用户可访问设备授权

//区域管理
Mock.mock(/\/v3\/tobbase\/bregionlist/, getAreaList);//获取区域
Mock.mock(/\/v3\/tobbase\/bregioncreate/, getAddAreaList);//add获取区域
Mock.mock(/\/v3\/tobbase\/bregiondel/, getDelAreaList);//del获取区域
Mock.mock(/\/v3\/tobbase\/bregionedit/, getEditAreaList);//edit获取区域
Mock.mock(/\/v3\/tobbase\/bregiongetuser/, getAreaUserList);//获取区域用户类型
Mock.mock(/\/v3\/tobbase\/bregiongetdevice/, getAreaDeviceList);//获取区域设备
//门锁管理
Mock.mock(/\/v3\/smartlock\/slpwdadd/, addLockPass);//
Mock.mock(/\/v3\/smartlock\/slpwdedit/, editLockPass);//
Mock.mock(/\/v3\/smartlock\/slpwddel/, delLockPass);//
Mock.mock(/\/v3\/smartlock\/slconfigget/, getLockPassList);//
Mock.mock(/\/v3\/smartlock\/slunlocklist/, getPassUseRecordsList);
//小区信息
Mock.mock(/\/v3\/building\/buildinglist/, getCommunity);//
Mock.mock(/\/v3\/building\/buildingcreate/, editCommunity);//
Mock.mock(/\/v3\/building\/buildingedit/, addCommunity);//
Mock.mock(/\/v3\/building\/buildingdelete/, delCommunity);//
//业主管理信息
Mock.mock(/\/v3\/faceacadm\/buildingownerlist/, getOwner);//
Mock.mock(/\/v3\/faceacadm\/buildingowneredit/, editOwner);//
Mock.mock(/\/v3\/faceacadm\/buildingowneradd/, addOwner);//
Mock.mock(/\/v3\/faceacadm\/buildingownerdel/, delOwner);//
//物业管理员信息
Mock.mock(/\/v3\/faceacadm\/buildinguserlist/, getAdmin);//
Mock.mock(/\/v3\/faceacadm\/buildinguseredit/, editAdmin);//
Mock.mock(/\/v3\/faceacadm\/buildinguseradd/, addAdmin);//
Mock.mock(/\/v3\/faceacadm\/buildinguserdel/, delAdmin);//
Mock.mock(/\/v3\/faceacadm\/orgbuildingadminset/, setAdminStatus);//
//出入人员管理
Mock.mock(/\/v3\/faceacadm\/buildinguserlist/, getProperty);//
Mock.mock(/\/v3\/faceacadm\/buildinguseredit/, editProperty);//
Mock.mock(/\/v3\/faceacadm\/buildinguseradd/, addProperty);//
Mock.mock(/\/v3\/faceacadm\/buildinguserdel/, delProperty);//
//设备管理
Mock.mock(/\/v3\/faceacadm\/orgbuildingdevicelist/, getDevice);//
Mock.mock(/\/v3\/faceacadm\/orgbuildingdeviceedit/, editDevice);//
Mock.mock(/\/v3\/faceacadm\/orgbuildingdeviceadd/, addDevice);//
Mock.mock(/\/v3\/faceacadm\/orgbuildingdevicedel/, delDevice);//
//出入记录
Mock.mock(/\/v3\/faceacadm\/admfacelog/, getAccessList);//
//房号管理
Mock.mock(/\/v3\/building\/buildingroomlist/, getRoom);//
Mock.mock(/\/v3\/building\/buildingroomedit/, editRoom);//
Mock.mock(/\/v3\/building\/buildingroomcreate/, addRoom);//
Mock.mock(/\/v3\/building\/buildingroomdelete/, delRoom);//
export default Mock
