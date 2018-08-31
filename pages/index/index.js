//index.js
//获取应用实例
const app = getApp()
var network = require("../../utils/network.js")
var util = require("../../utils/util.js")
var amapFile = require('../../libs/amap-wx.js')
var inputContent = {}
Page({
  data: {
    motto: '',
    address: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    greateShop: [],
    tuijianList: [],
    hotType: []
  },
  //事件处理函数
  goShop: function(e) {
    wx.navigateTo({
      url: '../shop/shop?shopid=10007'
    })
  },
  goSearch: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  onLoad: function() {
    var that = this;
    //判断本地有无存储位置
    if (wx.getStorageSync('location') == '') {
      //如果本地没有位置信息
      util.firstGetLocation().then(res => {
        that.getGreateShop();
        //that.socket()
        that._getIndexData();
        that.setData({
          motto: wx.getStorageSync('location').formatted_address
        })
      }).catch(err => {
        util.showError('获取位置失败')
      });
    }else{
      that.setData({
        motto: wx.getStorageSync('location').formatted_address
      })
      that.getGreateShop();
      //that.socket()
      that._getIndexData();
    }

  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  sendYzm: function() {
    var mobile = inputContent['mobile'];
    console.info(mobile)
    network.request("lovefund/getyzm", {
      mobile: mobile
    }, res => {
      console.info(res)
    })
  },
  registerTap: function() {
    var key = wx.getStorageSync("3rd_session")
    var yzm = inputContent['yzm'];
    var location = wx.getStorageSync('location');
    console.info(location)
    network.request("lovefund/loveFundBindMobile", {
      openid: key,
      type: 26,
      mobile: inputContent['mobile'],
      yzm: yzm,
      mode: 5,
      city_id: location.cityObj.city_id
    }, res => {
      console.info(res)
    })
  },
  bindBlur: function(e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },
  alltype:function(){
    wx.navigateTo({
      url: 'alltype/alltype',
    })
  },
  getGreateShop: function() {
    var that = this
    var location = wx.getStorageSync('location');
    console.log(location)
    network.requestLoading('search/shop', {
      city_id: location.cityObj.city_id,
      map_point: location.locationOther,
      sort: 10,
      type: 0
    }, res => {
      if (res.success) {
        console.log(res)
        var list = res.result.items;
        that.setData({
          greateShop: list,
        })
      }
    }, res => {

    }, "处理中")
  },
  socket: function() {
    wx.connectSocket({
      url: 'wss://www.592vip.com/foodWebsocket?foodid=10007:66&userid=66&pic=thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoSibI5icXW0c7qhU2LQaupeOGAJ9tXl0JZokSZP96UBRF799jgM9OlpibZk3155tn03kPZgbgkiaspWQ/132&name=aa',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function(res) {
        console.log('success', res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
    wx.onSocketOpen(function(res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function(res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function(res) {
      console.log('收到服务器内容：' + res.data)
    })
  },
  scanDian: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  _search: function() {
    wx.navigateTo({
      url: "/pages/search/search",
    })
  },
  //今日推荐
  _getIndexData: function() {
    var that = this;
    //确定位置
    var cityid = wx.getStorageSync('location').cityObj.city_id;
    var map_point = wx.getStorageSync('location').locationOther;
    //调用广告位接口
    network.request('firstpage/getNewAdvertisementList', {
      mode: 4,
      cityid: cityid,
      position: 0,
      map_point: map_point,
    }, res => {
      if (res.success) {
        var result = res.result;
        var tjArr = [];
        var lbArr = [];
        for (var i in result) {
          if (result[i]['positionSub'] == 1) {
            tjArr.push(result[i])
          } else if (result[i]['positionSub'] == 2) {
            lbArr.push(result[i])
          }
        }
        that.setData({
          tuijianList: tjArr,
          hotType: lbArr
        })
      }
    }, res => {

    }, "处理中")
  },
  //查看排名
  checkRank: function() {
    wx.navigateTo({
      url: "/pages/rank/rank",
    })
  }
})