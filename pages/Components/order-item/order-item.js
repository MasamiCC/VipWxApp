// pages/Components/shop-item/shop-item.js
const App = getApp();
const util = require("../../../utils/util.js")
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _orderDetail(event) {
      var order_no = event.currentTarget.dataset.orderno;
      console.log(event)
      wx.navigateTo({
        url: '/pages/userCenter/myOrder/orderDetail?order_no=' + order_no,
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
        if (count <= 0) {
          clearInterval(timer)
          that.setData({
            topaymsg: '订单取消',
            clickFlg: false,
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
    item['order_create_time'] = util.formatTime(new Date(item.order_create_time));
    var orderStatus = this.data.orderStatus
    this.setData({
      item:item,
      orderstatusitem: orderStatus[item.order_status],
    }) 
    that.countDown();
    console.log(item)
  },
  
  
})
