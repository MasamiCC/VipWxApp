// pages/userCenter/myOrder/orderDetail.js
const App = getApp();
const util = require("../../../utils/util.js");
const network = require("../../../utils/network.js");
const contant = require("../../../utils/contant.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: App.globalData.imageUrl,
    orderType: App.globalData.contant.pay_type,
    order: [],
    orderInvoice: [],
    goodlists: [],
    discount: '',
    angleright: 'block',
    displayshow: 'none',
    topaymsg: '',
    orderMsg: '',
    orderId: '',
    shopPhone: '',
    list: '', //优惠券
    showInvoice: false, //显示发票
    cancelReason: contant.cancelReason,//取消原因
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.shop_phone) {
      this.setData({
        shopPhone: options.shop_phone
      })
    }
    this.getData(options.order_no);
  },
  getData: function(order_no) {
    var that = this;
    network.requestInLogin("order/getorderdetail?order_no=" + order_no, null, res => {
      console.info(res)
      res.result.createTime = util.formatTime(new Date(res.result.createTime));
      //进行判断用户是直接优惠买单的还是点餐的
      if (res.result.goodlist) {
        that.setData({
          order: res.result,
          orderInvoice: res.result.orderInvoice,
          goodlists: res.result.goodlist,
          orderId: res.result.id,
        })
      } else {
        that.setData({
          order: res.result,
          orderInvoice: res.result.orderInvoice,
          orderId: res.result.id,
        })
      }
      that.now_price();
      //如果订状态为等待支付，则调用倒计时方法
      if (res.result.flag == '0'){
        that.countDown(res.result.timepass);
      }
    }, res => {

    }, "加载中")
  },

  now_price: function() {
    var goodlists = this.data.goodlists;
    var discount = 0;
    for (var i in goodlists) {
      discount += goodlists[i].dis_member;
    }
    console.log(discount);
    this.setData({
      discount: discount,
    })
  },
  changeangle1: function() {
    this.setData({
      displayshow: 'block',
      angleright: 'none',
    })
  },
  changeangle2: function() {
    this.setData({
      displayshow: 'none',
      angleright: 'block',
    })
  },
  //取消订单
  cancel_order: function() {
    const order_no = this.options.order_no;
    wx.navigateTo({
      url: "../cancelOrder/cancelOrder?order_no=" + order_no
    }) //跳转到取消订单页面
  },
  //去支付
  go_pay: function() {
    //跳转到支付页面
    const order_no = this.options.order_no;
    wx.navigateTo({
      url: '/pages/order/order-pay/order-pay?order_no=' + order_no,
    }) //跳转到取消订单页面
  },
  //评价订单
  go_comment: function() {
    const order_no = this.options.order_no;
    wx.navigateTo({
      url: "/pages/userCenter/comment/comment?order_no=" + order_no,
    }) //跳转到评价订单页面
  },
  //去我的评价页面
  go_myComment: function() {
    const order_no = this.options.order_no;
    wx.navigateTo({
      url: "/pages/userCenter/comment/comment?order_no=" + order_no,
    }) //跳转到评价订单页面
  },
  //查看评价
  check_comment: function(){
    const orderid = this.data.orderId;  
    wx.navigateTo({
      url: "/pages/userCenter/commentDetails/commentDetails?orderid=" + orderid,
    }) 
  },
  //用户确认订单
  go_confirm: function() {
    var that = this;
    network.requestInLogin("order/userConfirmGetGoods", {
      id: that.data.orderId
    }, res => {
      if (res.success) {
        wx.showModal({
          title: '提示',
          content: '您已经成功确认订单',
          showCancel: false,
          duration: 1500,
          success: function(res) {
            if (res.confirm) {
              //重新加载页面
              wx.reLaunch({
                url: '/pages/userCenter/myOrder/myOrder',
              })
            }
          }
        })
      } else {
        util.showError('确认订单失败!');
      }
    }, res => {

    }, "加载中")
  },
  //去商家
  go_shop: function() {
    wx.navigateTo({
      url: '/pages/shop/shop?shopid=' + this.data.order.shopId,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  //联系商家
  call_business: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.shopPhone
    })
  },
  //显示隐藏发票信息
  showInvoice: function() {
    this.setData({
      showInvoice: !this.data.showInvoice
    })
  },
  //支付倒计时
  countDown: function(timepass) {
    //剩余的时间
    const that = this;
    var timer;
    var count = 900 - timepass;
    that.setData({
      topaymsg: Math.floor(count / 60) + ':' + Math.floor(count % 60),
    })
    timer = setInterval(function() {
      //超过支付时间
      if (count <= 0) {
        clearInterval(timer);
        that.setData({
          topaymsg: '订单取消',
        })
      } else {
        count--;
        var min = Math.floor(count / 60);
        var sec = Math.floor(count % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        that.setData({
          topaymsg: min + ':' + sec,
        })
      }
    }, 1000);
  },
})