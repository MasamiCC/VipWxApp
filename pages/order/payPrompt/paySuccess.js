// pages/order/payPrompt/paySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo: '', //订单编号
    pay: '',//订单价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置订单的编号和价格
    this.setData({
      orderNo: this.options.order_no,
      pay: this.options.pay
    })
  },

  //查看订单
  checkOrder: function(){
    wx.navigateTo({
      url: '/pages/userCenter/myOrder/orderDetail?order_no=' + this.data.orderNo
    })
  },

  //返回首页
  returnIndex: function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})