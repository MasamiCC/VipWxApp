const App = getApp();
var network = require("../../../utils/network.js")
// pages/abc/abc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    imageUrl: App.globalData.imageUrl,
    userWx: wx.getStorageSync('userWx'),
    isLogin: wx.getStorageSync('isLogin'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {

    this.setData({
      isLogin: wx.getStorageSync('isLogin')
    })

    //未登录返回false
    if (!this.data.isLogin) {
      return false;
    }
    
    this.setData({
      user: wx.getStorageSync('user')
    })
  },
  _mobileClick() {
    if (wx.getStorageSync('user').mobile) {
      wx.navigateTo({
        url: '/pages/userCenter/bindMobile/unbindPhone/unbindPhone',
      })
    } else {
      //跳转绑定页面
      wx.navigateTo({
        url: '/pages/userCenter/bindMobile/bindPhone/bindPhone',
      })
    }
  }
})