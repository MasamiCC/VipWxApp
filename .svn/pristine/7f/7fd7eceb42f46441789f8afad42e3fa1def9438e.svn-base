// pages/order/subOrder/subOrder.js
var wxSocket = require("../../../utils/wxSocket.js")
var network = require("../../../utils/network.js")
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
const contant = require("../../../utils/contant.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    users: [],
    goodsCount: 0,
    userid: '',
    goodlist: [],
    foodid:'',
    shopId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that._getCartData();
    that.setData({
      foodid: options.foodid,
      shopId: options.shopId,
    })

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
  _getCartData: function () {
    var that = this;
    wxSocket.sendSocketMessage({ command: 2 }, that.shopCartFn)
  },
  /**
   * 创建订单
   */
  _orderSubmit: function () {
    var that=this;
    console.log('_orderSubmit')
    var ajaxData = {};
    var foodid = this.data.foodid;
    ajaxData.mode = 5;
    var goodsorder = {};
    goodsorder.eatNum = 10;
    goodsorder.type = '0';//订单类型0.美食
    goodsorder.deskNo ='1';
    goodsorder.payType = '5';//支付类型5小程序
    var goodlist = [];
    var goodslist = this.data.goodlist;
    for(var i in goodslist){
      var temp={};
      console.log(goodslist[i])
      temp['shop_id'] = that.data.shopId;
      temp['goods_id']=goodslist[i]['id'];
      temp['goods_name'] = goodslist[i]['name'];
      temp['spec_id'] = goodslist[i]['attr_id'];
      temp['spec_name'] = goodslist[i]['attr'];
      temp['goods_price'] = goodslist[i]['price'];
      temp['goods_num'] = goodslist[i]['num'];
      goodlist.push(temp);
    }
    goodsorder.goodlist = goodlist;
    goodsorder.shopId = that.data.shopId;
    goodsorder.userid=wx.getStorageSync('user')['id'];
    ajaxData.goodsorder = JSON.stringify(goodsorder)
    network.requestInLogin(contant.data_url.submitOrder, ajaxData, res => {
      console.info(res)
      that._wxAppPayAjax(res.result.orderNo)
    }, res => {
      console.log(res)
    }, "加载中")
  },

  shopCartFn: function (msg) {
    console.log(msg)
    this._loadCartData(msg.response);
  },
  _loadCartData: function (data) {
    console.log(data)
    var that = this;
    var total = 0, users = [], goodsCount = 0, userid, goodlist = [];
    for (var i in data) {
      var cartgoods = data[i].cartgoods;
      var foodUser = data[i].foodUser
      users.push(foodUser);
      if (foodUser['type'] == 0) {
        userid = foodUser['id'];
      }
      if (cartgoods.length > 0) {
        for (var j in cartgoods) {
          goodlist.push(cartgoods[j]);
          goodsCount += cartgoods[j]['num'];
          total += cartgoods[j]['num'] * cartgoods[j]['price']
        }
      }

    }
    that.setData({
      total: total,
      users: users,
      goodsCount: goodsCount,
      userid: userid,
      goodlist: goodlist

    })
    console.log(that.data)
  },
  _wxAppPayAjax: function (out_trade_no){
    var that=this;
    network.requestInLogin(contant.data_url.wxAppPay, { key: wx.getStorageSync('3rd_session'), out_trade_no: out_trade_no, ordertype:1}, res => {
      console.info(res)
      that._wxAppPay(res.result)
    }, res => {
      console.log(res)
    }, "加载中")
  },
  _wxAppPay:function(res){
    wx.requestPayment({
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonce_str,
      'package': res.data_package,
      'signType': res.signType,
      'paySign': res.sign,
      'success': function (res) {
        console.log(1)
      },
      'fail': function (res) {
        console.log(2)
      }
    })
  }
})
