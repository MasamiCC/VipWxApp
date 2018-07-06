// pages/userCenter/bindMobile/unbindPhone.js
var network = require("../../../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    title:'',
    btn:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.loginWx(
      res => {
        if (res == 0) {
          network.requestInLogin("user/getuser?cityid=109006", null, res => {
            this.setData({
              phone: res.result.mobile,
              title:"已绑定手机号码",
              btn:"更换绑定"
            })
            console.info(res)
          }, res => {

          }, "已绑定")
        } else if (res == 1) {
          this.setData({
            phone: "快去绑定手机号",
            title: "你还没有绑定您的手机号",
            btn:"立即绑定"
          })
          //跳转绑定手机界面
          console.info('跳转绑定手机界面')
          // wx.navigateTo({
          //   url: '../bindPhone/bindPhone'
          // })
        } else {
          console.info('微信登录失败')
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})