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
    fontNum: 0, //限制的字数
  },

  //textarea正在输入
  bindInput: function(e){
    const length = parseInt(e.detail.value.length);
    this.setData({
      fontNum: length
    })
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
                //重新加载页面
                wx.reLaunch({
                  url: '/pages/userCenter/myOrder/myOrder',
                })
              }
            }
          })
        }else{
          utils.showError('取消订单失败!');
        }
      }, res => {
        console.info(res);
        utils.showError('取消订单失败!')
      })
    }
  }
})