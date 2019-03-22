export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    tempDev: 'http://test.fuliantianxia.com',
    dev: '/', // http://test.fuliantianxia.com
    //pro: 'http://manager.fuliantianxia.cn',
    pro: 'http://manager.fuliantianxia.com'
  },
  /**
   * 图片路线地址
   */
  imgUrl: {
    dev: 'http://image.fuliantianxia.com/test', // http://image.fuliantianxia.com/prod
    pro: 'http://image.fuliantianxia.com/prod'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  /**
   * client 配置
   */
  client: {
    ClientSeckey: 'JUVxAqRrb7Db6ih3Yt2MzuaoR',
    client_id: 'cmcc_1_cid'
  }

}
