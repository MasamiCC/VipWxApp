 const app = getApp();

const network = require("../../../utils/network.js")
const util = require("../../../utils/util.js")
var inputContent = {}
var timer = '';

// pages/abc/abc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnMsg:'获取验证码',
    mobileFlg:false,
    code:'',
    count:30,
    clickFlg:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  sendYzm: function () {
    var that = this;
    if (that.data.clickFlg){
      return;
    }else{
      that.setData({
        clickFlg: true,
      })
      var mobile = inputContent["mobile"];
      var mobileFlg = that.data.mobileFlg;
      if (!mobileFlg && mobile == '') {
        util.showError('请输入手机号码');
      } else if (!util.isMobile(mobile)) {
        util.showError('手机号格式不正确');
        that.setData({
          mobileFlg: false,
        })
        return;
      } else {
        network.request("lovefund/getyzm", { mobile: mobile }, res => {
          if (res.success) {
            that.countDown();
          } else {
            util.showError('验证码发送失败')
          }
        }, res => {
          util.showError('网络出现异常')
        })
      }
    }
  },
  countDown:function(){
    clearInterval(timer);
    var that=this;
    var count = that.data.count;
    that.setData({
      btnMsg:'30秒后重试'
    })
    timer = setInterval(function () {
      count--;
      that.setData({
        btnMsg: count + '秒后重试'
      })
      if (count <= 0) {
        clearInterval(timer)
        that.setData({
          btnMsg: '获取验证码',
          count: 10,
          clickFlg: false,
        })
      }
    }, 1000);
  },
 
  bindKeyInput:function(e){
    
    inputContent[e.currentTarget.id] = e.detail.value
    if (e.currentTarget.id == 'mobile'){
      var mobileFlg = util.isMobile(e.detail.value) ? true : false;
      this.setData({
        mobileFlg: mobileFlg,
      })
    }
  },

  bindBlur: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },
  
  registerTap: function () {
    var key = util.getSessionKey()
    var yzm = inputContent['yzm'];
    var mobile = inputContent['mobile'];
    var location = util.getLocation();
    console.info(yzm)
    if (mobile == '') {
      util.showError('请输入手机号码')  
      return
    }
    if (yzm == '') {
      util.showError('请输入验证码')
      return
    }
    if (!util.isMobile(mobile)) {
      util.showError('手机号格式不正确');
      return;
    }
    if(!util.isYzm(yzm)){
      util.showError('验证码格式不正确!')
      return
    }
    console.info(location)
    network.request("lovefund/loveFundBindMobile", { openid: key, type: 26, mobile: inputContent['mobile'], yzm: yzm, mode: 5,      city_id: location.cityObj.city_id }, res => {
      if(res.success){
        wx.showToast({
          title: '绑定成功',
          complete:function(){
            setTimeout(function () {
              network.wxAppLogin(network, res => {
                wx.navigateBack();
              })
            }, 1000) 
          }
        })
      }else{
        util.showError('绑定失败!')
      }
    })
  },
})