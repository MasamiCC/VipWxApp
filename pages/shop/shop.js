// pages/shop.js
const app = getApp()
var network = require("../../utils/network.js")
var util = require("../../utils/util.js")
var wxSocket = require("../../utils/wxSocket.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop:[],//商家信息
    imgUrl: app.globalData.imageUrl,//图片地址
    comments:[],//评价
    showWifi:false,//显示WiFi
    diandanFlg:false,
    commentForScores:[], 
    commentcount: '', 
    foodid:''
  },

  /** 
   * 加载商家
   * **/
  loadShop:function (id){
    var that=this;
    var location = wx.getStorageSync('location');
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#333',
    });
    network.request("shop/newGetShopDetail", { shopid: id, map_point: location.location }, res => {
      console.log(res)
      if (res.result){
        var shopRoots = wx.getStorageSync('shopRoots') ? wx.getStorageSync('shopRoots') : [];
        for (var i in shopRoots) {
          if (shopRoots[i]['id'] == id) {
            shopRoots.splice(i, 1);
          }
        }
        shopRoots.unshift(res.result);
        wx.setStorageSync('shopRoots', shopRoots)

        var shopscore = res.result;
        var shopscorenum = parseFloat(shopscore.scores).toFixed(1);
        shopscore.scores = shopscorenum;
        that.setData({
          shop: shopscore,
        })  
        console.log(this.data.shop);
      }
      if(res.map.comments){
        var comments = res.map.comments;
        for(var i in comments){
          comments[i]['createTime'] = util.formatTime(new Date(comments[i]['createTime']));
        }
        that.setData({
          comments: comments,
          commentcount: res.map.commentcount,
          commentForScores: res.map.commentForScores
        })
        that.reloadComments();
      }
      
    })

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shopid = options.shopid
    var foodid = options.foodid ? options.foodid:''
    //获取商家详情
    let that = this;
    network.loginWx(
      res => {
        if (res == 0) {
          that.loadShop(shopid)
        } else if (res == 1) {
          //未绑定
          that.loadShop(shopid)
        } else {
          console.info('微信登录失败')
        }
      }
    ) 
    that.setData({
      'foodid': foodid,
      'diandanFlg':foodid==''?false:true
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
    wxSocket.socketClose()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  _toggleWifi:function(){
    this.setData({
      showWifi: !this.data.showWifi
    })
  },
  _diandan:function(){
    var that=this;
    this.setData({
      diandanFlg: !this.data.diandanFlg,
    })
  },
  _inviate:function(){
    wx.showShareMenu({
      withShareTicket: true,
      success:function(res){
        console.log("success:",res)
      },
      fail: function (res){
        console.log("fail:" +res)
      }
    })
  },
  phonecall:function(){
    wx.makePhoneCall({
        phoneNumber: this.data.shop.mobile //仅为示例，并非真实的电话号码
      })
    },
  mapnav: function (e) {
    var mapPoint = this.data.shop.mapPoint;
    var str = mapPoint;
    var arr = str.split(",");
    console.log(arr);
    var latitude = parseFloat(arr[0]);
    var longitude = parseFloat(arr[1]);
    var address = this.data.shop.address;
    var name = this.data.shop.shopName;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        latitude = latitude
        longitude = longitude
        var speed = res.speed
        var accuracy = res.accuracy 
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: name,
          address: address,
          scale: 28,
        })  
      }
    })
  },
  // 重构评价统计数据
  reloadComments:function (){
    var commentForScores = this.data.commentForScores;
    var commentcount = this.data.commentcount;
    var newArr={};
    for (var i in commentForScores){
      newArr[commentForScores[i]['scores']] = parseInt((commentForScores[i]['count'] / commentcount) * 100) ;
    }
    this.setData({
      commentForScores: newArr,
    })
    console.log(newArr)
  },
  allcomments:function(){
    var id = this.data.shop.id;
    wx.navigateTo({
      url: '../../pages/userCenter/allcomments/allcomments?shopid='+id,
    })
  },
})