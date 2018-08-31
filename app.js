//app.js
import Touches from './utils/Touches.js'

var network = require("/utils/network.js")
var contant = require("/utils/contant.js")

App({
  onLaunch: function(options) {
    //把连接状态置未false
    wx.setStorageSync('isSocket', false);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //查看用户是否授权登录
    wx.getSetting({
      success: function (res) {
        //如果用户未授权或者本地的user不存在
        if (res.authSetting['scope.userInfo'] && wx.getStorageSync('user')) {
          if (wx.getStorageSync('userWx')){

          }else{
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                wx.setStorageSync('userWx', res.userInfo);
              }
            })
          }
          wx.setStorageSync('isLogin', true);
        } else {
          wx.setStorageSync('isLogin', false);
        }
      }
    })
    
  },



  globalData: {
    userInfo: null,
    remoteUrl: 'https://www.592vip.com/api/', //正式接口
    //remoteUrl: 'https://www.592vip.com/testapi/',
    appid: 'wxf3f662cb05f349e1',
    secret: 'e99532876173f46f7c67200779032962',
    session_user: null,
    amapWxApi: '38f31561f8d66935361c6b11adc95d46',
    staticURL: 'https://www.592vip.com/app_static/',
    imageUrl: 'https://www.592vip.com:91/',
    contant: contant,
    socketUrl: 'wss://www.592vip.com/foodWebsocket'
  },
  Touches: new Touches()
})