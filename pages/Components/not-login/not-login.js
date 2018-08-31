var network = require("../../../utils/network.js")

// pages/Components/not-login/not-login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //登录按钮
    login:function(e){
      //用户同意登录
      if (e.detail.errMsg == 'getUserInfo:ok'){
        wx.setStorageSync('userWx', e.detail.userInfo);
        //等待提示
        wx.showLoading({
          title: '登陆中',
        })
        //实现用户登录
        network.loginWx(
          res => {
            if (res == 0) {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              //跳转到首页
              wx.switchTab({
                url: '/pages/index/index',
              })
            } else if (res == 1) {
              //跳转绑定手机界面
              console.info('跳转绑定手机界面')
              wx.navigateTo({
                url: '/pages/userCenter/bindMobile/bindPhone/bindPhone',
              })
            } else {
              console.info('微信登录失败')
            }
          }
        )
      }
    }
  }
})
