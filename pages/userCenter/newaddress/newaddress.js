const app = getApp();

const network = require("../../../utils/network.js")
const config = require("../../../libs/config.js")
const amapFile = require("../../../libs/amap-wx.js")
// pages/userCenter/newaddress.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    addressid:'',
    userid:'',
    reciver: '',
    mobile: '',
    area:'',
    address: '',
    address_detail:'',
    flag: '0',
    name:'',
    speed: 0,//速度 
    accuracy: 16,//位置精准度 
    markers: [],
    covers: [], 
    mapFlg: false,
    map_point:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var addressid = e.addressId;
    var user = wx.getStorageSync("user");
    var userid = user.id;
    var that = this;
    if (addressid){
      that.setData({
        addressid: addressid,
      })
    }
    that.setData({
      title: addressid > 0 ? '编辑地址' : '新增地址',
      userid: userid,
    })
    wx.setNavigationBarTitle({
      title: this.data.title//页面标题为路由参数
    })
    if (addressid>0){
      that.getAddress(addressid);
    }   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // // 使用 wx.createMapContext 获取 map 上下文
    // this.mapCtx = wx.createMapContext('myMap')
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
  
  },
  getAddress: function (addressId){
    console.log(addressId)
    network.requestInLogin("address/getAddressById?addressId=" + addressId, null, res => {
      console.log(res)
      if (res.success) {
        this.setData({
          reciver: res.result.reciver,
          mobile: res.result.mobile,
          area: res.result.map_point,
          address: res.result.address,
          address_detail: res.result.address_detail,
          flag: res.result.flag,
        })
      } else {
        wx.showToast({
          title: '请求失败',
          duration: 2000
        })
      }
    }, res => {
      console.log(res)
    }, "加载中")
  },
  submitdata: function (e) {
    var id = this.data.addressid
    var that = this;
    var vipaddress = {
      reciver: e.detail.value.reciver,
      mobile: e.detail.value.mobile,
      area: this.data.area,
      address: e.detail.value.address,
      address_detail: e.detail.value.address_detail,
      flag: this.data.flag,
      map_point: this.data.map_point,
    }
    if (id){
      vipaddress.id=id;
      vipaddress.userid = this.data.userid;
      vipaddress.map_point = this.data.area;
      console.log(vipaddress)
      network.requestInLogin("address/updateAddress", vipaddress, res => {
        if (res.success) {
          console.log(2)
          wx.navigateTo({
            //传递参数方式向get请求拼接参数一样
            url: '../../userCenter/address/address'
          })
        } else {
          wx.showToast({
            title: '请求失败',
            duration: 2000
          })
        }
      }, res => {
      }, "加载中")
    }else{
      vipaddress.area = this.data.map_point;
      console.log(vipaddress)
      if (vipaddress.reciver != '' && vipaddress.mobile != '' && vipaddress.address != '' && vipaddress.address_detail != '' && vipaddress.flag != '' && vipaddress.map_point != '' && vipaddress.area != '') {
        network.requestInLogin("address/saveAddress", vipaddress, res => {
              if (res.success) {
                console.log(2)
                wx.navigateTo({
                  //传递参数方式向get请求拼接参数一样
                  url: '../../userCenter/address/address'
                })
              } else {
                wx.showToast({
                  title: '请求失败',
                  duration: 2000
                })
              }
            }, res => {
            }, "加载中")
          } else {
            wx.showToast({
              title: '输入内容有误，请重新输入，谢谢',
              icon: 'none',
              duration: 1000,
            })
          }
      }
  },
  checkTel: function(e) {
    var that = this;
    console.log(e)
    var Tel = e.detail.value;
    if (Tel.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        mobile : ''
      }); 
    }else{
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(Tel)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'none',
          duration: 1500
        })
        this.setData({
          mobile: ''
        });
      }     
    }
  },
  getAddress1: function (e) {
    this.setData({
      address_detail: e.detail.value
    })
  },
  switchChange:function(e) {
    var flagvalue = e.detail.value==true?0:1;
    console.log(flagvalue)
    this.setData({
        flag: flagvalue
    })
  },
  getlocation: function (e) {
    var that = this;
    console.log(e)
    that.setData({
      mapFlg: !this.data.mapFlg
    })
    if (e.type =='mapToggle'){
      that.setData({
        address: e.detail.district,
        address_detail: e.detail.address,
        area: e.detail.district,
        map_point: e.detail.location,
      })
    }
  },
})