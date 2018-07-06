                 // pages/userCenter/myOrder/orderDetail.js
const App = getApp();
const util = require("../../../utils/util.js");
const network = require("../../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: App.globalData.imageUrl,
    orderType: App.globalData.contant.pay_type,
    order:[],
    orderInvoice:[],
    goodlists: [],
    discount:'',
    angleright:'block',
    displayshow:'none',
    topaymsg: '',
    orderMsg: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.order_no);
  },
  getData: function (order_no) {
    var that = this;
    network.requestInLogin("order/getorderdetail?order_no=" + order_no, null, res => {
      console.info(res)
      res.result.createTime = util.formatTime(new Date(res.result.createTime))
      that.setData({
        order:res.result,
        orderInvoice: res.result.orderInvoice,
        goodlists: res.result.goodlist,
      })
      that.now_price();
    }, res => {

    }, "加载中")
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
  
  },
  now_price:function(){
    var goodlists = this.data.goodlists;
    var discount=0;
    for (var i in goodlists){
       discount += goodlists[i].dis_member;
    }
    console.log(discount);
    this.setData({
      discount: discount,
    })
  },
  changeangle1:function(){
    this.setData({
      displayshow:'block',
      angleright: 'none',
    })
  },
  changeangle2: function () {
    this.setData({
      displayshow: 'none',
      angleright: 'block',
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    countDown: function () {
      var timer;
      clearInterval(timer);
      var that = this;
      var item = that.data.item;
      var timepass = that.data.item.timepass;
      var count = 900 - timepass;
      timer = setInterval(function () {
        if (count <= 0) {
          clearInterval(timer)
          that.setData({
            orderMsg: '订单取消',
            clickFlg: false,
          })
        } else {
          var min = Math.floor(count / 60);
          var sec = Math.floor(count % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          count--;
          that.setData({
            topaymsg: '超时未支付，订单自动取消（' + min + '分' + sec + '秒）',
            color: '#f8a120',
            border: '1px solid #f8a120',
          })
        }
      }, 1000);
    },
  },
  ready() {
    var that = this;
    var item = that.data.item;
    var timepass = this.data.item.timepass;
    this.setData({
      count: timepass,
    })
    // console.log(timepass);
    // console.log(time);
    item['order_create_time'] = util.formatTime(new Date(item.order_create_time));
    var orderStatus = this.data.orderStatus
    this.setData({
      item: item,
      orderstatusitem: orderStatus[item.order_status],
    })
    that.countDown();
    console.log(item)
  },
})