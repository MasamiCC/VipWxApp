var MD5 = require("md5.js")
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, params, success, fail, message) {
  
  if(message&&message!=undefined){
    console.info(message)
    wx.showLoading({
      title: message
    })
  }
  
  wx.request({
    url: getApp().globalData.remoteUrl + url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionid")
    },
    method: 'post',
    success: function (res) {
      if (message && message != undefined) {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data, res)
      } else {
        if(fail){
          fail()
        }
      }

    },
    fail: function (res) {
      if (message && message != undefined) {
         wx.hideLoading()
      }
      if (fail) {
        fail()
      }
    },
    complete: function (res) {

    },
  })
}

//不显示对话框的请求
function request(url, params, success, fail) {
  this.requestLoading(url, params, success, fail)
}

function requestInLogin(url, param, success, fail,msg){
  var token = wx.getStorageSync("token");
  if(!token){
    //跳转至绑定手机界面
    
  }
  var md5;
  var tokenString;
  if (url.indexOf('?')>0){
    tokenString = "/" + url.substr(0, url.indexOf('?')) + "&token=" + token;
  }else{
    tokenString = "/" + url + "&token=" + token;
  }
  md5 = MD5.hex_md5(tokenString)
  if(param){
    param.token = md5
  }else{
    param = { token: md5}
  }
  var that = this
  that.requestLoading(url, param,  res=>{
    if(success&&res.success){
      success(res)
      return
    }
    if (res.status == '001' || res.status == '002' || res.status == '003'){
      that.loginWxForSession(that,res=>{
        if(res == 0){
          that.requestInLogin(url, param, success, fail)
        }else if(res == 1){
          wx.showToast({
            title: '还未绑定手机',
            duration: 2000
          })
          //跳往绑定手机界面
        } else if (res == 1) {
          wx.showToast({
            title: '微信登录出错',
            duration: 2000
          })
        }
        
      })
    }else{
      fail(res)
    }

  }, fail, msg)
}


function loginWx(callback) {
  var that = this;
  wx.checkSession({
    success: function () {
      console.info("未过期")
      //session 未过期，并且在本生命周期一直有效
      //检查接口服务器是否存在openId
      var key = wx.getStorageSync("3rd_session")
      console.info("key---" + key)
      if (key) {
        that.request("wxapp/checkSession", { key: key }, result => {
          console.info(result)
          if (!result.success) {
            console.info("接口session已过期");
            loginWxForSession(that, callback)
          } else {
            console.info("接口session未过期");
            //登录状态
            if(result.result){
              callback(0)
            }else{
              loginWxForSession(that, callback)
            }
          }
        });
      } else {
        loginWxForSession(that, callback)
      }
    },
    fail: function () {
      //登录态过期
      console.info("登录态过期")
      loginWxForSession(that, callback)//重新登录
    }
  })
}

function loginWxForSession(that,callback) {
  wx.removeStorageSync('3rd_session')
  wx.removeStorageSync('sessionid')
  // 登录
  wx.login({
    success: res => {
      console.log(res);
      // 发送 res.code 到后台换取 openId, sessionKey, unionId，将返回3rd_session存入storage
      if (res.code) {
        that.request("wxapp/jscode2session", { code: res.code }, (result, res) => {
          console.info("登录")
          console.info(result)
          wx.setStorageSync('3rd_session', result.result)
          wx.setStorageSync("sessionid", res.header["Set-Cookie"])
          //通过openid自动登录
          wxAppLogin(that, callback)
        });
      }else{
        if(callback){
          callback(2)
        }
      }
    },
    fail:res => {
      callback(2)
    }
  })
}

//通过openid登录平台
function wxAppLogin(that, callback) {
  var key = wx.getStorageSync("3rd_session")
  that.request("wxapp/wxAppLogin", { key: key }, (result, res) => {
    console.info("wxAppLogin登录")
    
    //用户已经注册绑定手机
    if (result.result) {
      wx.setStorageSync("token", result.result)
      wx.setStorageSync("user", result.map.user)
      if(callback){
        callback(0)
      }
      console.info(result)
    } else {
      wx.removeStorageSync('token')
      wx.removeStorageSync('user')
      callback(1)
    }
  });
}


module.exports = {
  request: request,
  requestLoading: requestLoading,
  loginWx: loginWx,
  requestInLogin: requestInLogin,
  loginWxForSession: loginWxForSession,
  wxAppLogin: wxAppLogin
}