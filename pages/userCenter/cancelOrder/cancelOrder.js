const contant = require("../../../utils/contant.js");
const utils = require("../../../utils/util.js");
var network = require("../../../utils/network.js");

// pages/userCenter/cancelOrder/cancelOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancelReason: contant.cancelReason, //取消原因
    reasonType: '', //被选中的原因
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
  //radio按钮被点击事件
  radioChange: function (e) {
    this.setData({
      reasonType: e.detail.value
    })
  },
  //确定取消按钮被点击
  formSubmit: function (e) {
    if (this.data.reasonType ===''){
      utils.showError('请选择一个原因！');
    }else{
      //如果用户有填写原因
      const resonContent = e.detail.value.resonContent;
      //用户的订单号
      const order_no = this.options.order_no;
      //用户选择的原因
      const reasonType = this.data.reasonType;
      //请求
      network.requestInLogin("order/cancelorder", { order_no: order_no, reason_type: reasonType, reson_content: resonContent, mode: 5 }, res => {
        console.log(res);
        if(res.success){
          wx.showModal({
            title: '提示',
            content: '您已经成功取消订单',
            showCancel: false,
            duration: 1500,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: "../myOrder/myOrder",
                  success: function (e) {
                    //成功后刷新页面
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  } 
                })
              }
            }
          })
        }else{
          util.showError('取消订单失败!');
        }
      }, res => {
        console.info(res);
        util.showError('取消订单失败!')
      })
    }
  }
})