const app = getApp();
const network = require("../../../utils/network.js");
const util = require("../../../utils/util.js");
const contant = require("../../../utils/contant.js");
const wxSocket = require("../../../utils/wxSocket.js");

// pages/order/order-pay/order-pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}, //订单详情
    imgUrl: app.globalData.imageUrl,//图片地址
    topaymsg: '', //剩余支付时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    //根据订单编号查找订单详情
    //请求
    network.requestInLogin("order/getorderdetail", { order_no: options.order_no }, res => {
      if (res.success) {
        //获取订单信息
        that.setData({
          order: res.result
        })

        //调用倒计时方法
        that.countDown(res.result.timepass);
      } else {
         //订单不存在跳404页面
        wx.navigateTo({
          url: '/pages/404'
        })
      }
    }, res => {
      wx.navigateTo({
        url: '/pages/404'
      })
    })
  },

  //支付倒计时
  countDown: function (timepass){
    //剩余的时间
    const that = this;
    var timer;
    var count = 900 - timepass;
    timer = setInterval(function () {
      //超过支付时间
      if (count <= 0) {
        clearInterval(timer)
        that.setData({
          topaymsg: '订单取消',
        })
      } else {
        var min = Math.floor(count / 60);
        var sec = Math.floor(count % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        count--;
        that.setData({
          topaymsg: min+':'+sec,
        })
      }
    }, 1000);
  },

  //去支付
  go_pay: function(){
    this._wxAppPayAjax(this.data.order.orderNo);
  },

  //wx得到ajax
  _wxAppPayAjax: function (out_trade_no) {
    var that = this;
    network.requestInLogin(contant.data_url.wxAppPay, { key: wx.getStorageSync('3rd_session'), out_trade_no: out_trade_no, ordertype: 1 }, res => {
      console.info(res)
      that._wxAppPay(res.result)
    }, res => {
      console.log(res)
    }, "加载中")
  },

  //微信支付
  _wxAppPay: function (res) {
    var that = this;
    wx.requestPayment({
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonce_str,
      'package': res.data_package,
      'signType': res.signType,
      'paySign': res.sign,
      'success': function (res) {
        //支付成功
        wx.navigateTo({
          url: '../payPrompt/paySuccess?order_no=' + that.data.order.orderNo + '&pay=' + that.data.order.total
        })
        //关闭websocket
        wxSocket.closeWebSocket();
      },
      'fail': function (res) {
        console.log(2)
      }
    })
  }


})