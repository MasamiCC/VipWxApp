//导入公共模块
import network from '../../utils/network.js'

// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankData: {},//排名数据
    pageIndex: 1,//分页
    isLoading: false,//是否正在加载
    hasData: true,//下拉刷新有无更多数据
    city_id: '',
    map_point: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const that = this;
    that.setData({
      city_id: wx.getStorageSync('location').cityObj.city_id,
      map_point: wx.getStorageSync('location').locationOther
    })
    //获取所有的排名数据
    network.request("search/shop", { city_id: this.data.city_id, map_point: this.data.map_point, type: 0, sort: 10, page: this.data.pageIndex, pageSize: 10},res => {
      that.setData({
        rankData: res.result.items
      })
    }, res => {

    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

   const that = this; 
   //判断是否还有数据可以加载
    if (this.data.hasData){
     //显示正在加载
     this.setData({
       isLoading: true
     })

     //增加一页数据
     this.data.pageIndex++;

     //获取所有的排名数据
     network.request("search/shop", { city_id: this.data.city_id, map_point: this.data.map_point, type: 0, sort: 10, page: this.data.pageIndex, pageSize: 10 }, res => {
       //判断有无数据了
       if (res.result.items.length > 0) {
         //合并数组
         const rankData = that.data.rankData.concat(res.result.items);
         that.setData({
           rankData: rankData,
           isLoading: false
         })
       } else {
         that.setData({
           hasData: false,
           isLoading: false,
         })
       }
     }, res => {

     })
   }

  }

})