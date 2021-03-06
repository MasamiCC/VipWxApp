// pages/shop/shop-image.js
const app = getApp()
var network = require("../../utils/network.js")
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopid:"",
      item:{},
      imgUrl: app.globalData.imageUrl,//图片地址
      shopImg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      console.log(options)
      if (options.shopid) {
          that.setData({
              shopid: options.shopid
          })
          console.log(this.data.shopid)
          network.request("/shop/getShopDetail", {
              shopid: this.data.shopid
          }, res => {
              var that = this;
              that.setData({
                  item: res.result
              })
              console.log(res.result)
              var shopImg = []
              var shop_img = res.result.url
              var imgUrl = this.data.imgUrl
              for (var i in shop_img) {
                  shopImg = shopImg.concat(imgUrl + shop_img[i])
              }
              that.setData({
                  shopImg: shopImg
              })
              console.log(shopImg)
          })

          
      }
     
  },
    show_simg: function (e) {
      console.log(e)
      console.log(this.data.shopImg)
      wx.previewImage({
          current: e.target.dataset.src, // 当前显示图片的http链接
          urls: this.data.shopImg // 需要预览的图片http链接列表
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