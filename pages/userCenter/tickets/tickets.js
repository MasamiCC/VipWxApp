// pages/userCenter/tickets/tickets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tickets:[
      {
        id: 3,
        name: "全场9.5折",
        type: "1",
        sendMode: "1",
        vipLevel: 0,
        coupon_type: "0",
        coupon_condition: 0,
        coupon_value: 9.5,
        validateHours: 0,
        startTime: 1488356722000,
        endTime: 1496219126000,
        content: "9.5折",
        num: 10,
        sendNum: 1,
        flag: "1",
        cityId: 109006,
        shopid: "10012",
        createTime: 1490084754000,
        creator: 1,
      },
      {
        id: 2,
        name: "全场9折",
        type: "0",
        sendMode: "1",
        vipLevel: 0,
        coupon_type: "1",
        coupon_condition: 10,
        coupon_value: 9,
        validateHours: 0,
        startTime: 1488351505000,
        endTime: 1495695509000,
        content: "9折",
        num: 1,
        sendNum: 1,
        flag: "1",
        cityId: 109006,
        shopid: "10012",
        createTime: 1490079544000,
        creator: 1,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(1)
    
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
  
  },
  scroll:function(e){
    console.log(e)
  }
})