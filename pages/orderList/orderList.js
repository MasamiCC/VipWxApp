const contant = require("../../utils/contant.js");
const utils = require("../../utils/util.js");
var network = require("../../utils/network.js");

// pages/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRefresh: false, //是否在下拉刷新
    isLoad: false, //是否在上拉加载
    orderList: contant.orderList, //订单列表的构成
    currentTab: 0, //选中的区域
    scrollLeft: 0, //顶部切换区域距离左侧的距离 
    orderListData: [
      [],
      [],
      [],
      []
    ], //每个区域订单的数据
    currentPage: [1, 1, 1, 1], //当前页数
    totalPages: [0, 0, 0, 0], //总页数
    isEnd: [false, false, false, false], //是否到最后一页
    isRequest: false, //请求中
    isLogin: wx.getStorageSync('isLogin'), //是否登录
    scrollTop: 50, //距离顶部的高度
    prompt: '加载中。。。' //提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    const that = this;

    this.setData({
      isLogin: wx.getStorageSync('isLogin')
    })

    //未登录返回false
    if (!this.data.isLogin){
      return false;
    }

    //进入页面默认获取全部订单的数量
    that.getOrderListDate().then(res => {
      //加载返回的数据到data中
      let orderList = that.data.orderListData;
      orderList[that.data.currentTab] = res.result.items;
      //没有数据则显示暂无数据
      if (orderList[that.data.currentTab].length == 0) {
        that.setData({
          prompt: '暂无数据'
        })
        return false;
      }
      //加载返回的总页数
      let totalPages = that.data.totalPages;
      totalPages[that.data.currentTab] = res.result.totalPages;
      that.setData({
        orderListData: orderList,
        totalPages: totalPages
      })
      
    }).catch(err => {

    }); 
  },

  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    //判断是否在当前页切换
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      //调整确定的页码和当前页数
      this.setData({
        currentTab: cur,
      })
    }
    //调用方法
    this.switchMethod();
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    //超出显示时切换顶部的距离
    this._checkCor();
    //调用方法
    this.switchMethod();
  },
  //超出显示时切换顶部的距离
  _checkCor: function() {
    if (this.data.currentTab >= 3) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //获取订单列表
  getOrderListDate: function() {
   
    return new Promise((resovle, reject) => {
      //发送请求获取订单列表
      network.requestInLogin("order/getOrderListByShopType", {
        currentPage: this.data.currentPage[this.data.currentTab],
        orderFlag: this.data.currentTab,
        type: 0, //美食类订单
      }, res => {
        //成功
        if (res.success) {
          resovle(res);
        } else {
          reject(res);
        }
      }, res => {
        reject(res);
      }, '加载中')
    })
  },

  //切换时调用的方法
  switchMethod: function() {
    //判断当前页有无数据
    if (this.data.orderListData[this.data.currentTab] == '') {
      //调用加载数据的方法
      this.getOrderListDate().then(res => {
        //加载返回的数据到data中
        let orderList = this.data.orderListData;
        orderList[this.data.currentTab] = res.result.items;
        //没有数据则返回暂无数据
        if (res.result.items.length == 0) {
          this.setData({
            prompt: '暂无数据'
          })
          return false;
        }
        this.setData({
          orderListData: orderList
        })
      }).catch(err => {

      });
    }
  },
  //上滑到顶部
  onTop: function() {
    //判断是否正在请求
    if (this.data.isRequest){
      return false;
    }
    //下拉刷新
    const that = this;
    //把当前页的currentPage设置为1
    let currentPage = that.data.currentPage;
    currentPage[this.data.currentTab] = 1;
    that.setData({
      isRefresh: true,
      currentPage: currentPage,
      isRequest: true, //正在请求
    })
    //调用获取数据的方法
    that.getOrderListDate().then(res => {
      let orderList = that.data.orderListData;
      orderList[that.data.currentTab] = res.result.items;
      that.setData({
        orderListData: orderList,
        isRefresh: false,
        isRequest: false, 
      })
    })
  },
  //下滑到底部
  onBottom: function() {
    //判断是否正在请求
    if (this.data.isRequest) {
      return false;
    }
    //上拉加载
    const that = this;
    //把当前页的currentPage加一
    let currentPage = that.data.currentPage;
    currentPage[this.data.currentTab] = currentPage[this.data.currentTab] + 1;
    //先判断增加的页数有无超过总页数
    if (currentPage[this.data.currentTab] >= this.data.totalPages[this.data.currentTab]) {
      let isEnd = this.data.isEnd;
      isEnd[this.data.currentTab] = true;
      that.setData({
        isEnd: isEnd
      })
      return false;
    }

    that.setData({
      isRefresh: true,
      currentPage: currentPage,
      isRequest: true, 
    })
    //调用获取数据的方法
    that.getOrderListDate().then(res => {
      let orderList = that.data.orderListData;
      orderList[that.data.currentTab] = res.result.items;
      that.setData({
        orderListData: orderList,
        isRefresh: false,
        isRequest: false, 
      })
    })
  }
})