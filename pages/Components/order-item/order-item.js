// pages/Components/shop-item/shop-item.js
const App = getApp();
const contant = require("../../../utils/contant.js")
const util = require("../../../utils/util.js")
const network = require("../../../utils/network.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: App.globalData.imageUrl,
    orderStatus: App.globalData.contant.order_status,
    // orderMsg: '',
    min: '',
    sec: '',
    clickFlg: false,
    orderstatusitem: '',
    topaymsg:'',
    color:'',
    border:'',
    ndate:'',
    order_no:'',
    orderId: '',
    overtime: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _orderDetail(event) {
      var order_no = event.currentTarget.dataset.orderno;
      //商家电话
      var shop_phone = this.data.item.shop_phone;
      console.log(event)
      wx.navigateTo({
        url: '/pages/userCenter/myOrder/orderDetail?order_no=' + order_no + '&shop_phone=' + shop_phone,
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    },
    countDown: function () {
      var timer;
      clearInterval(timer);
      var that = this;
      var item = that.data.item;
      var timepass = that.data.item.timepass;
      var count = 900 - timepass;
      timer = setInterval(function () {
        //超过支付时间
        if (count <= 0) {
          clearInterval(timer)
          that.setData({
            orderstatusitem: '订单取消',
            clickFlg: false,
            overtime: true,//超过时间
          })
        }else{
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
            topaymsg: '去支付（还剩' + min + '分' + sec + '秒）',
            color:'#f8a120',
            border: '1px solid #f8a120',
          })
        } 
      }, 1000);
    },
    deleteOrder:function(){
      var order_no = this.data.order_no;
      wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            network.requestInLogin("order/userDeleteOrder?order_no=" + order_no, null, res => {
              console.log(res)
              if (res.success) {
                console.log(1)

                wx.reLaunch({
                  url: '/pages/userCenter/myOrder/myOrder'
                })
              } else {
                wx.showToast({
                  title: '请求失败',
                  duration: 2000
                })
              }
            }, res => {

            }, "加载中")
          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    //去支付
    toPay: function(){
      var order_no = this.data.order_no;
      wx.navigateTo({
        url: '/pages/order/order-pay/order-pay?order_no=' + order_no,
      })
    },
    //用户确认
    confirmOrder: function(){
      var that = this;
      network.requestInLogin("order/userConfirmGetGoods", { id: that.data.orderId }, res => {
        if (res.success) {
          wx.showModal({
            title: '提示',
            content: '您已经成功确认订单',
            showCancel: false,
            duration: 1500,
            success: function (res) {
              if (res.confirm) {
                //重新加载页面
                wx.reLaunch({
                  url: '/pages/userCenter/myOrder/myOrder',
                })
              }
            }
          })
        } else {
          util.showError('确认订单失败!');
        }
      }, res => {

      }, "加载中")
    },
    //用户评价
    go_comment: function(){
      const order_no = this.data.order_no;
      wx.navigateTo({
        url: "/pages/userCenter/comment/comment?order_no=" + order_no,
      }) //跳转到评价订单页面
    },
    //取消订单
    cancelOrder: function(){
      const order_no = this.data.order_no;
      wx.navigateTo({
        url: "../cancelOrder/cancelOrder?order_no=" + order_no
      }) //跳转到取消订单页面
    }
  },
  ready(){
    var that = this;
    var item = that.data.item;
    var timepass = this.data.item.timepass;
    this.setData({
      count: timepass,
    }) 
    // console.log(timepass);
    // console.log(time);
    // item['order_create_time'] = util.formatTime(new Date(item.order_create_time));
    var ndate = util.formatTime(new Date(item.order_create_time))
    var orderStatus = this.data.orderStatus;
    var order_no = item.order_no;
    // console.log(order_no);
    this.setData({
      item:item,
      orderstatusitem: orderStatus[item.order_status],
      ndate: ndate,
      order_no: order_no,
      orderId: item.order_id
    })
    var orderStatusNum = that.data.item.order_status;
    console.log(orderStatusNum)
    //如果是待付款订单，新增倒计时方法
    if ('0' == orderStatusNum) {
      that.countDown();
    }
    console.log(item);
  }, 
})
