// pages/leftSwiperDel/index.js
const App = getApp();

const network = require("../../../utils/network.js")
const util = require("../../../utils/util.js")

Page({
  data: {
    itemData:[],
    imageUrl: App.globalData.imageUrl,
    title:'我的收藏',
    shopUrl:'http://www.baidu.com/'
  },
  touchS: function (e) {  // touchstart
    let startX = App.Touches.getClientX(e)
    
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let itemData = App.Touches.touchM(e, this.data.itemData, this.data.startX)

    itemData && this.setData({ itemData })

  },
  touchE: function (e) {  // touchend
    const width = 200  // 定义操作列表宽度
    let itemData = App.Touches.touchE(e, this.data.itemData, this.data.startX, width)
    itemData && this.setData({ itemData })
  },
  itemDelete: function (e) {  // itemDelete
    var that=this;
    var shopid = e.currentTarget.dataset.shopid;
    wx.showModal({
      title: '提示',
      content: '取消收藏该店铺',
      success: function (res) {
        if (res.confirm) {
          network.requestInLogin("favorites/delfavorites?shopid=" + shopid, null, res => {
            console.log(res)
            if(res.success){
              let itemData = App.Touches.deleteItem(e, that.data.itemData)
              itemData && that.setData({ itemData })

            }
          }, res => {

          }, "处理中")
          
        } 
      }
    })
    
  },
  goshop:function(event){
    var shopid = event.currentTarget.dataset.shopid;
    wx.navigateTo({
      url: '../../shop/shop?shopid=' + shopid,
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //请求数据
    this.getData();
    wx.setNavigationBarTitle({
      title:this.data.title//页面标题为路由参数
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getData:function(){
    var that=this;
    network.requestInLogin("favorites/getFavoritesShopList?map_point=31.921731,120.943123&city_id=109006", null, res => {
      console.info(res)
      that.setData({
        itemData:res.result.items
      })
    }, res => {

    }, "加载中")
  },
  
})
