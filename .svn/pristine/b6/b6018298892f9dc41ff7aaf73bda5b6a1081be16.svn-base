const App = getApp();
var network = require("../../../utils/network.js")
// pages/abc/abc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        user:[],
        imageUrl: App.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('user'))
    this.setData({
          user: wx.getStorageSync('user')
    })
  },
  _mobileClick(){
        console.log(1)
        if(wx.getStorageSync('user').mobile){
            wx.navigateTo({
              url: '/pages/userCenter/bindMobile/unbindPhone/unbindPhone',
            })
        }else{
              wx.navigateTo({
                url: '/pages/userCenter/bindMobile/unbindPhone/unbindPhone',
              })
        }
  }
})