// pages/order/subOrder/subOrder.js
const app = getApp();
var wxSocket = require("../../../utils/wxSocket.js")
var network = require("../../../utils/network.js")
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
const contant = require("../../../utils/contant.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imageUrl,
    total: 0,
    shop: [],
    users: [],
    goodsCount: 0,
    userid: '',
    goodlist: [],
    foodid:'',
    shopId:'',
    orderNo:'', //订单编号
    pay: '',//订单价格
    orderMehod: contant.orderMehod, //生成订单的三种类别
    methodNum: 0, //生成订单的方式
    location: '',//堂食的地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //通过websocket得到购入的商品信息
    that._getCartData();

    //根据商家id得到商家信息
    network.request("shop/newGetShopDetail", {
      shopid: options.shopId,
    }, res => {
      if (res.result) {
        that.setData({
          foodid: options.foodid,
          shopId: options.shopId,
          shop: res.result,
        })
      }

    })
  },

  _getCartData: function () {
    var that = this;
    wxSocket.sendSocketMessage({ command: 2 }, that.shopCartFn)
  },

  /** 
   * 用户选择不同的购买方式
  */

  radioChange: function(event){
    //更改不同的方式
    this.setData({
      methodNum: event.detail.value
    })
  },

  /**
   *  位置输入内容
  */
  methodLocation: function(event){
    //设置堂食位置
    this.setData({
      location: event.detail.value
    })
  },

  /*
  * 扫描二维码获取位置信息
  */

  scanCode: function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },

  /**
   * 创建订单
   */
  _orderSubmit: function () {
    //先判断订单是否设置了堂食位置
    if(this.data.location == ''){
      wx.showToast({
        title: '请输入桌号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
      var that = this;
      console.log('_orderSubmit')
      var ajaxData = {};
      var foodid = this.data.foodid;
      ajaxData.mode = 5;
      var goodsorder = {};
      goodsorder.eatNum = 10;
      goodsorder.type = '0';//订单类型0.美食 order生成方式
      goodsorder.deskNo = '1';
      goodsorder.payType = '5';//支付类型5小程序
      var goodlist = [];
      var goodslist = this.data.goodlist;
      for (var i in goodslist) {
        var temp = {};
        console.log(goodslist[i])
        temp['shop_id'] = that.data.shopId;
        temp['goods_id'] = goodslist[i]['id'];
        temp['goods_name'] = goodslist[i]['name'];
        temp['spec_id'] = goodslist[i]['attr_id'];
        temp['spec_name'] = goodslist[i]['attr'];
        temp['goods_price'] = goodslist[i]['price'];
        temp['goods_num'] = goodslist[i]['num'];
        goodlist.push(temp);
      }
      goodsorder.goodlist = goodlist;
      goodsorder.shopId = that.data.shopId;
      goodsorder.userid = wx.getStorageSync('user')['id'];
      //设置用户选择的位置
      goodsorder.deskNo = that.data.location;
      ajaxData.goodsorder = JSON.stringify(goodsorder);
      network.requestInLogin(contant.data_url.submitOrder, ajaxData, res => {
        console.info(res)
        that.setData({
          orderNo: res.result.orderNo,
          pay: res.result.pay
        })

        //在跳转页面之前关闭websocket
        wx.sendSocketMessage({
          data: '{ "command": 3 }',
          success: function (res) {
            //把未点餐完成的用户设置为空
            wx.setStorageSync('UnFinishedNum', 0);
            //把连接状态置未false
            wx.setStorageSync('isSocket', false);
            //生成订单号成功跳转页面
            wx.navigateTo({
              url: '/pages/order/order-pay/order-pay?order_no=' + that.data.orderNo,
            })
          },
          fail: function (res) {
          }
        })
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
      // if (foodUser['type'] == 0) {
      //   userid = foodUser['id'];
      // }
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
})
