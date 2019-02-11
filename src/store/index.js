import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import userManage from './module/userManage'
import app from './module/app'
// import communityList from './module/communityList'//小区管理
// import ownerList from './module/ownerList'//业主管理
// import adminList from './module/adminList'//管理员管理
// import propertyList from './module/propertyList'//出入人员管理
// import deviceManage from './module/deviceManage'//设备管理
// import accessList from './module/accessList'//出入记录
// import roomManage from './module/roomManage'//房号管理

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //审核状态
    auditSatus: [
      {
        value: 1,
        label: '添加'
      },
      {
        value: 2,
        label: "提交审核",
      },
      {
        value: 3,
        label: "审核未通过"
      },
      {
        value: 4,
        label: '审核通过'
      }
    ],
    //用户类型
    userTypeObj: {
      1: '业主家人',
      2: '租客',
      3: '租客成员',
      11: "物业人员",
      12: "快递",
      13: "外卖",
      14: "其它",
      99: "黑名单"
    },
    communtiyListArr: [
      {
        label: '上东阳小区',
        value: '123142'
      },
      {
        label: '流星花园小区',
        value: '123123sdf'
      }
    ],
    //
    wh: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    },
    //合同状态
    contract: [
      {
        key: 1,
        value: "添加"
      },
      {
        key: 2,
        value: "提交审核"
      },
      {
        key: 3,
        value: "审核未通过"
      },
      {
        key: 4,
        value: "审核通过"
      },

    ]
  },
  mutations: {
    //
    windowResize(state, wh) {
      state.wh.innerWidth = wh.innerWidth;
      state.wh.innerHeight = wh.innerHeight;
    },
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    userManage
  }
})
