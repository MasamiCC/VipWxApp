// pages/userCenter/bindMobile/bingUnbind.js
var network = require("../../../../utils/network.js")
const util = require("../../../../utils/util.js")
var interval = null 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    code:"",
    disabled:false
  },
 
  getCode: function (options) {//验证码倒计时
    var that = this;
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })

      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  codemsg: function (e) {
    var val = e.detail.value;
    this.setData({
      code: val
    });    
  },
  bindBtn: function () {//提示
  var that = this;
  var phone = that.data.phone;  
  var code = that.data.code;
  var key = wx.getStorageSync("3rd_session");
    if (code==""){
      util.showError('验证码不能为空!')
    } else if (!util.isYzm(code)){
      util.showError('验证码格式不正确!')
    }else{
      network.request("/wxapp/unBindMobile", { key: key,mobile:phone, yzm: code,type:7}, res => {
        console.log(res)
        if (res.success) {

          wx.showModal({
            title: '提示',
            content: '您的手机号码已经解除绑定',
            showCancel: false,
            duration: 1500,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: "../bindPhone/bindPhone"
                })
              }
            }
          })
        } else {
          util.showError('绑定失败!')
        }
      })

    }
  },

  countDown:function(){//调用验证码倒计时
    var that = this;
    var phone = that.data.phone;  
    network.request("sendYzm/sendYzm", { mobile: phone, mode:5,type:7 }, res => {
      if (res.success) {
        this.getCode();  
        that.setData({
          disabled: true
        })      
        console.log(res)
      } else {
        util.showError('验证码发送失败')
      }
    }, res => {
      util.showError('网络出现异常')
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.loginWx(
      res => {
        if (res == 0) {
          network.requestInLogin("user/getuser?cityid=109006", null, res => {
            this.setData({
              phone: res.result.mobile
            })
            console.info(res)
          }, res => {

          }, "已绑定")
        } else if (res == 1) {
          //跳转绑定手机界面
          console.info('跳转绑定手机界面')
          wx.redirectTo({
            url: '../bindPhone/bindPhone'
          })
        } else {
          console.info('微信登录失败')
        }
      }
    )
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

  }
})