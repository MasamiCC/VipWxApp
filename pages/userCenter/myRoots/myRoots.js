const app = getApp();

const network = require("../../../utils/network.js")

Page({
  /**
 * 页面的初始数据
 */
  data: {
    datalist: [],
    title: '我的足迹',
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: this.data.title//页面标题为路由参数
    })
    var shopRoots = wx.getStorageSync('shopRoots');

    if (shopRoots){
      this.setData({
        datalist: shopRoots,
      })
      console.log(this.data)
    }
    


    
  },
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  _pullUp:function(){
    console.log('_pullUp');
  },
  _pullDown: function () {
    console.log('_pullDown');
  },

  


})