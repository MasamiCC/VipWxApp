//index.js
//获取应用实例
const app = getApp();

const network = require("../../../utils/network.js")

Page({
  data: {
    currentTab: 0, //预设当前项的值
   
    tabs: [// 1:全部；2：待付款；3：待确认；4：待评价 ;5:退款售后
      { title: '未使用', value: '1', dataUrl: 'coupon/getNotUsedCouponList', mode:'notUsed' },
      // { title: '未激活', value: '2', dataUrl: 'coupon/getNotActivateCouponList', mode: 'notActivate'},
      { title: '已使用', value: '2', dataUrl: 'coupon/getUsedCouponList', mode: 'used' },
      { title: '已过期', value: '3', dataUrl: 'coupon/getExpiredCouponList', mode: 'expired' },
    ],
    currentTab: '1',
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
      
    });
    var currentNum = e.detail.current
    console.log(e.detail.current)
    // if (currentNum==0){
    //   this.getNoUse();
    // } else if (currentNum == 1){
    //   this.getnoactive();
    // } else if (currentNum == 2) {
    //   this.getused();
    // } else if (currentNum == 3) {
    //   this.getoutdate();
    // }

    if (currentNum == 0) {
      this.getNoUse();
    } else if (currentNum == 1) {
      this.getused();
    } else if (currentNum == 2) {
      this.getoutdate();
    } 
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    // 高度自适应
    // this.getNoUse();
    // this.getnoactive();
    // this.getused();
    // this.getoutdate();
    
  },
  getNoUse: function (e) {
    var that = this;
    var currentPage = this.data.currentPage;
    var cityid = this.data.cityid;
    network.requestInLogin('coupon/getNotUsedCouponList', { currentPage: currentPage, cityid: cityid }, res => {
      if (res.success) {
        console.log(res);
        var items=that.data.items;
        items['noUse'] = res.result.items
        that.setData({
          items: items
        })
      }
    }, res => {
    }, "处理中")
  },
  getnoactive: function () {
    var that = this;
    var currentPage = this.data.currentPage;
    var cityid = this.data.cityid;
    network.requestInLogin('coupon/getNotActivateCouponList', { currentPage: currentPage, cityid: cityid }, res => {
      if (res.success) {
        console.log(res);
        var items = that.data.items;
        items['noActive'] = res.result.items
        that.setData({
          items: items
        })
      }
    }, res => {

    }, "处理中")
  }, 

  getused: function () {
    var that = this;
    var currentPage = this.data.currentPage;
    var cityid = this.data.cityid;
    network.requestInLogin('coupon/getUsedCouponList', { currentPage: currentPage, cityid: cityid }, res => {
      if (res.success) {
        console.log(res);
        var items = that.data.items;
        items['used'] = res.result.items
        that.setData({
          items: items
        })
      }
    }, res => {

    }, "处理中")
  },
  getoutdate: function (e) {
    var that = this;
    var currentPage = this.data.currentPage;
    var cityid = this.data.cityid;
    network.requestInLogin('coupon/getExpiredCouponList', { currentPage: currentPage, cityid: cityid }, res => {
      if (res.success) {
        console.log(res);
        var items = that.data.items;
        items['outdate'] = res.result.items
        that.setData({
          items: items
        })
      }
    }, res => {

    }, "处理中")
  },

})