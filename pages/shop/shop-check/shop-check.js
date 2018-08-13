const app = getApp();
const network = require("../../../utils/network.js");
const util = require("../../../utils/util.js");
const contant = require("../../../utils/contant.js");


// pages/shop/shop-check/shop-check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {}, //商家信息
    imgUrl: app.globalData.imageUrl,//图片地址
    price: 0.00, //优惠价格
    discount: 0.00, //优惠价格
    isParticipate: false, //是否输入优惠金额
    participatePrice: 0.00, //不参与优惠的金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;

    //加载数据（小数点保留两位）
    that.setData({
      price: that.data.price.toFixed(2),
      discount: that.data.price.toFixed(2),
    })

    //根据商家id查找商家
    //请求
    network.requestInLogin("shop/getShopInfo", { shopid: options.shopid}, res => {
      if (res.success) {
        //获取该商家信息
        that.setData({
          shop: res.result
        })
      } else {
        util.showError('该商家无法优惠买单!');
      }
    }, res => {
      util.showError('该商家无法优惠买单!')
    })
  },

  /*输入消费金额*/
  consume_money: function(event){
    let price;
    //判断价格是否存在
    if (parseFloat(event.detail.value).toFixed(2) > 0){
      price = parseFloat(event.detail.value).toFixed(2)
    }else{
      price = 0.00.toFixed(2)
    }
    this.setData({
      price: price,
    })
  },

  /*不参与优惠金额*/
  switchChange: function(event){
    //显示
    this.setData({
      isParticipate: !this.data.isParticipate
    })
  },

  //输入不参与优惠买单的金额
  participate_money: function (event){
    let price;
    //判断价格是否存在
    if (parseFloat(event.detail.value).toFixed(2) > 0) {
      price = parseFloat(event.detail.value).toFixed(2)
    } else {
      price = 0.00.toFixed(2)
    }
    this.setData({
      participatePrice: price,
    })
  },
  //扫描二维码
  scanCode: function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  //确认买单
  _orderSubmit: function(){
    //判断金额不为0
    if(this.data.price == '0.00'){
      util.showError('请输入消费总额');
      return false;
    }

    //发送请求生成直接买单的订单

    let ajaxData = {};
    ajaxData.mode = 1; //微信端
    var directorder = {};
    directorder.eatNum = 10;
    directorder.type = '7';//订单类型0.美食 order生成方式
    directorder.payType = '5';//支付类型5小程序
    directorder.shopId = this.data.shop.id;//商家id
    directorder.userid = wx.getStorageSync('user')['id'];//用户id
    directorder.no_discount_amount = this.data.participatePrice;//不参与优惠的金额
    directorder.total = this.data.price; //消费总额
    directorder.cityid = wx.getStorageSync('location').cityObj.city_id; //地区id
    
    //对象转字符串
    ajaxData.directorder = JSON.stringify(directorder);

    network.requestInLogin('order/directPaymentOrder', ajaxData, res => {
      //生成订单成功
      var order_no = res.result.orderNo;
      wx.navigateTo({
        url: '/pages/order/order-pay/order-pay?order_no=' + order_no,
      })
    }, res => {
      console.log(res)
    }, "处理中")
  }
})