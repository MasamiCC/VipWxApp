// pages/userCenter/bindMobile/binding.js
const util = require("../../../../utils/util.js")
var network = require("../../../../utils/network.js")

var inputContent = {}
var timer = '';
Page({

      /**
       * 页面的初始数据
       */
      data: {
            btnMsg: '获取验证码', //倒计时 
            code: '',
            count: 30,
            mobileFlg: false,
            clickFlg: false,
            codeFlg: false
      },
      countDown: function () {//倒计时函数
            clearInterval(timer);
            var that = this;
            var count = that.data.count;
            that.setData({
                  btnMsg: '30秒后重试',
                  codeFlg: true
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
                              codeFlg: false
                        })
                  }
            }, 1000);
      },
      code: function () {//获取验证码点击事件
            console.log("获取验证码")
            var that = this;
            // if (that.data.clickFlg) {
            //   // that.countDown();
            //   return;
            // } else {
            //   that.setData({
            //     clickFlg: true,
            //   })

            var mobile = inputContent["mobile"];
            var mobileFlg = that.data.mobileFlg;
            if (!mobileFlg && mobile == '') {
                  util.showError('请输入手机号码');
            } else if (!util.isMobile(mobile)) {
                  util.showError('手机号格式不正确');
                  console.log("格式不正确")
                  that.setData({
                        mobileFlg: false,
                  })
            }
            else {
                  network.request("sendYzm/sendYzm", { mobile: mobile, mode: 5, type: 8 }, res => {
                        if (res.success) {
                              that.countDown();
                        } else {
                              util.showError('验证码发送失败')
                              console.log(res)

                        }
                  }, res => {
                        util.showError('网络出现异常')
                  })
            }
            // }
      },
      submit: function () {//立即绑定点击事件
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
            if (!util.isYzm(yzm)) {
                  util.showError('验证码格式不正确!')
                  return
            }
            network.request("/lovefund/loveFundBindMobile", { openid: key, type: 26, mobile: inputContent['mobile'], yzm: yzm, mode: 5, city_id: location.cityObj.city_id }, res => {
                  console.log(res)
                  if (res.success) {

                        wx.showModal({
                              title: '提示',
                              content: '您的手机号码已经成功绑定',
                              showCancel: false,
                              duration: 1500,
                              success: function (res) {
                                    if (res.confirm) {
                                          wx.redirectTo({
                                                url: "../unbindPhone/unbindPhone"
                                          })
                                    }
                              }
                        })
                  } else {
                        util.showError('绑定失败!')
                  }
            })

      },
      bindBlur: function (e) {
            inputContent[e.currentTarget.id] = e.detail.value
      },
      bindKeyInput: function (e) {

            inputContent[e.currentTarget.id] = e.detail.value
            if (e.currentTarget.id == 'mobile') {
                  var mobileFlg = util.isMobile(e.detail.value) ? true : false;
                  this.setData({
                        mobileFlg: mobileFlg,
                  })
            }
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {

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