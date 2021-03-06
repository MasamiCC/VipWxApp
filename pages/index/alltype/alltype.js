// pages/index/alltype/alltype.js
const network = require("../../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotType:[],
    typeid:'',
    type_name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //前往指定商家

    this.getalltypeData();
    
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
  getalltypeData(){
    var that = this;
    //确定位置
    var cityid = wx.getStorageSync('location').cityObj.city_id;
    var map_point = wx.getStorageSync('location').locationOther;
    //调用广告位接口
    network.request('search/shoptype?typeid=10001', null, res => {
      if (res.success) {
        console.log(res)
        var hotType = res.result;
        that.setData({
          hotType: hotType,
        })
      }

    }, res => {

    }, "处理中")
  },
  _goType(event) {
    //  绑定事件的当前组件的typeid
    var typeid = event.currentTarget.dataset.typeid;
    var type_name = event.currentTarget.dataset.type_name;
    // var query = { typeid: typeid, type_name: type_name,}
    wx.navigateTo({
      url: '/pages/shop/shop-list/shop-list?typeid=' + typeid + '&type_name=' + type_name,
      // url: '/pages/shop/shop-list/shop-list?query=' + query
    })
  },
})