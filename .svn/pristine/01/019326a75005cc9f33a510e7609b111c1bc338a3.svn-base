// pages/shop/shop-discount/shop-discount.js
const app = getApp();
var network = require("../../../utils/network.js")
const utils = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pay:[
          '在线支付',
          '黑钻支付'
      ],
      index:0,
      shop:[],
      shopid:'',
      imgUrl:app.globalData.imageUrl,
      money:'0.00',
      disMoney:'0.00'
  },
    listenerPickerSelected: function (e) {
        //改变index值，通过setData()方法重绘界面
        this.setData({
            index: e.detail.value
        });
    }, 
    bindmoney:function(e){
        var that =this
        that.setData({
            money: e.detail.value
        })
        console.log(e)
    },

  /**
   * 生命周期函数--监听页面加载
   */
 

  onLoad: function (options) {
      var that = this;
      if (options.id) {
          that.setData({
              shopid: options.id
          })
      }  
      console.log(this.data.shopid)
      network.request("shop/getShopInfo", {
          shopid: this.data.shopid
      }, res => {
          var that = this;
          that.setData({
              shop: res.result
          })
          console.log(res)
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
  
  }
})