import {getParams} from '@/libs/util'

const USER_MAP = {
  super_admin: {


    user_id: 123456,
    "access_token": "5901c8b3b5c5fed02c6557e212b0d67d528f05393a4a5922853c4745f7665910",
    "refresh_token": "5901c8b3b5c5fed02c6557e212b0d67d528f05393a4a5922853c4745f7665910",
    "expires_in": 123456,
    "profile": ''
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  },
  uerInfo:{
    user_id: 123456,
    name: 'super_admin',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  let result = USER_MAP['super_admin'];
  let temp = {
    "data":
      {
        ...result
      },
    "code": 20000,
    "msg": ""
  };
  return temp;
};

/**
 * 获取用户信息
 * @param req
 * @returns {{body: {}, result: number, errorMsg: string}}
 */
export const getUserInfo = req => {
  //const params = getParams(req.url)
  let temp = {
    "data":
      {
        ...USER_MAP.uerInfo
      },
    "code": 20000,
    "msg": ""
  };
  return temp
}

export const logout = req => {
  let temp = {
    "body":
      {
      },
    "result": 0,
    "errorMsg": ""
  };
  return temp
}
