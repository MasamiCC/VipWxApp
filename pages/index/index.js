//index.js
//获取应用实例
const app = getApp()
var network = require("../../utils/network.js")
var amapFile = require('../../libs/amap-wx.js')
var inputContent = {}
Page({
  data: {
    motto: '',
    address: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    greateShop:[],
    tuijianList:[],
    hotType:[]
  },
  //事件处理函数
  goShop: function(e) {
    wx.navigateTo({
      url: '../shop/shop?shopid=10007'
    })
  },
  goSearch:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  onLoad: function () {
    var that = this;
    that.getGreateShop();
    //that.socket()
    that._getIndexData();
    //定位成功回调
    app.locationSuccess = res => {
      var location = wx.getStorageSync('location')
      that.setData({
        motto: location.formatted_address
      })
      network.loginWx(
        res => {
          console.log(res)
          if (res == 0) {
            network.requestInLogin("user/getuser?cityid=109006", null, res => {
              console.info(res)
            }, res => {

            }, "加载中")
          } else if (res == 1) {
            //跳转绑定手机界面
            console.info('跳转绑定手机界面')
            wx.navigateTo({
                  url: '/pages/userCenter/bindMobile/bindPhone/bindPhone',
            })
          } else {
            console.info('微信登录失败')
          }
        }
      )
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  sendYzm:function(){
    var mobile = inputContent['mobile'];
    console.info(mobile)
    network.request("lovefund/getyzm", { mobile: mobile }, res => {
        console.info(res)
    })
  },
  registerTap:function(){
    var key = wx.getStorageSync("3rd_session")
    var yzm = inputContent['yzm'];
    var location = wx.getStorageSync('location');
    console.info(location)
    network.request("lovefund/loveFundBindMobile", { openid: key,type:26, mobile: inputContent['mobile'], yzm: yzm, mode: 5,  city_id: location.cityObj.city_id }, res => {
      console.info(res)
    })
  },
  bindBlur:function(e){
    inputContent[e.currentTarget.id] = e.detail.value
  },
  getGreateShop:function(){
    var that=this
    var location=wx.getStorageSync('location');
    console.log(location)
    network.requestLoading('search/shop', { city_id: location.cityObj.city_id, map_point: location.locationOther,sort:10}, res => {
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
  socket:function(){
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
      success:function(res){
        console.log('success',res)
      },
      fail: function (res){
        console.log(res)
      }
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data)
    })
  },
  scanDian:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  _search:function(){
    wx.navigateTo({
      url: "/pages/search/search",
    })
  },
  _getIndexData:function(){
    var that=this;
    var cityid=wx.getStorageSync('location').cityObj.city_id;
    network.request('firstpage/getNewAdvertisementList?mode=4&cityid=109006&position=0',null, res => {
      if (res.success) {
        var result=res.result;
        var tjArr=[];
        var lbArr=[];
        for (var i in result){
          if (result[i]['positionSub']==1){
            tjArr.push(result[i])
          } else if (result[i]['positionSub'] == 2){
            lbArr.push(result[i])
          }
        }
        that.setData({
          tuijianList:tjArr,
          hotType: lbArr
        })
      }
    }, res => {

    }, "处理中")
  }
})
