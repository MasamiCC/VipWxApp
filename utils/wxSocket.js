const app = getApp()
var util = require("util.js")
var socketOpen = false
var socketMsgQueue = []

function socketConnect(user, event, Fn) {

  wx.connectSocket({
    url: app.globalData.socketUrl + util.arrToString(user),
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function(res) {
      console.log('Connect success')
    },
    fail: function(res) {
      console.log('connect fail')
    }
  })
  wx.onSocketOpen(function(res) {
    console.log('WebSocket连接已打开！');
    wx.setStorageSync('socketConect', true)
  })
  wx.onSocketMessage(function(res) {
    Fn(event, res);
  })
  wx.onSocketError(function(res) {
    console.log('WebSocket连接打开失败，请检查！')
  })
  wx.onSocketClose(function(res) {
    console.log('WebSocket已关闭！')
  })
}

function sendSocketMessage(obj, Fn) {
  var that = this;
  wx.sendSocketMessage({
    data: JSON.stringify(obj),
    success: function(res) {
      console.log(res)
    },
    fail: function(res) {
      console.log(res)
    }
  })
  wx.onSocketMessage(function(res) {
    Fn(JSON.parse(res.data));
  })

}

function getSocketOpen() {
  return wx.getStorageSync('socketConect')
}

function setOpenSocket(flag) {
  socketOpen = flag;
}

function socketClose() {
  if (wx.getStorageSync('socketConect')) {
    wx.closeSocket();
    wx.setStorageSync('socketConect', false)
  }
}

//开启websocket
const startWebSocket = function(user){
  wx.connectSocket({
    url: app.globalData.socketUrl + util.arrToString(user),
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {
      wx.onSocketOpen(function (res) {
        console.log('webSocke开启成功')
        wx.setStorageSync('isSocket', true)
      })
    },
    fail: function (res) {
      console.log('webSocke开启失败')
    }
  })
}


//关闭webspocket
const closeWebSocket = function(){
  //如果本地存储的isSocket不为空或为true
  if (wx.getStorageSync('isSocket') != '' || wx.getStorageSync('isSocket') == true){
    wx.closeSocket();
    console.log('webSocket关闭成功')
    wx.setStorageSync('isSocket', false)
  }
}

module.exports = {
  startWebSocket: startWebSocket, //开启websocket
  closeWebSocket: closeWebSocket, //关闭webSocket
  socketConnect: socketConnect,
  sendSocketMessage: sendSocketMessage,
  getSocketOpen: getSocketOpen,
  setOpenSocket: setOpenSocket,
  socketClose: socketClose
}