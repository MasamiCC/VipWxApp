// pages/shop/shop-cart/shop-cart.js
const app = getApp();
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
var util = require("../../../utils/util.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopCart:{
      type:Object,
      value:[],
    },
    carCount:{
      type:String,
      value:0,
    },
    cartTotal:{
      type: String,
      value: 0,
    },
    creatUser:{
      type: String,
      value: '0',
    },
    foodid:{
      type: String,
      value: '',
    },
    shopId: {
      type: String,
      value: '',
    },
    user: {
      type: Object,
      value: [],
    },
    //是否为发起者
    initiator:{
      type: Boolean,
      value: true,
    },
    //发起者userId
    initiatorId: {
      type: String,
      value: '',
    },
    //未选完的人数
    UnFinishedNum:{
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    imgUrl: app.globalData.imageUrl,
    shopCart:[],
    userid:wx.getStorageSync('user').id,
    isFinished: false, //是否选完
    userWx: wx.getStorageSync('userWx'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toggleShopCart(){
      this.setData({
        show:!this.data.show,
      })
      //this.getcarCount()
      
      console.log(this.data.shopCart)
    },
    //清空我的购物车
    emptyCart: function () {
      //清空购物车
      this.triggerEvent('emptyCart', true)
      this.setData({
        show: false,
      })
    },
    //商品加减事件
    _cartChange: function(event){

      //用户选择完成后无法选择商品
      if (this.data.isFinished){
        util.showError('您已选择完成了');
        return false;
      }
      var flg = event.target.dataset.type; //加减的类型
      var num = event.target.dataset.item.num; //商品的数量

      //对商品数量进行加减
      if (flg == 'plus') {
        num++;
      } else {
        if (num > 0) {
          num--;
        }
      }

      var obj = { type: flg };
      var socketMsg = { command: (num == 0) ? '1' : '0' };
      socketMsg.cartgoods = {
        "id": event.target.dataset.item.id,
        "name": event.target.dataset.item.name,
        "price": event.target.dataset.item.price,
        "num": num,
        "attr": "", //规格中文名称
        "attr_id": ""  //规格id
      } 

      obj.socketMsg = socketMsg;
      this.triggerEvent('cartChange', obj)
    },
    _cartSubmit:function (){
      var userid=wx.getStorageSync('user').id;

      //被参与者未选完不让他提交订单
      if (this.data.UnFinishedNum > 0) {
        //提示用户无法提交订单
        util.showError('请等待您的好友选完商品');
        return false;
      }

      //消费为0无法提交订单
      if (this.data.cartTotal <= 0){
        //提示用户无法提交订单
        util.showError('请至少选择一件商品');
        return false;
      }

      //跳转到提交订单页面
      var url = '/pages/order/subOrder/subOrder?foodid=' + this.data.shopId + ':' + userid + ':1&shopId=' + this.data.shopId;
      console.log(url)
      wx.navigateTo({
        url: url,
      })
  
    },
    _getShopCart:function(){
    },
    //邀请好友
    inviteFriend: function () {
      this.triggerEvent('invite', true)
    },
    //发起人踢出好友
    shotOff: function(e){
      const userId = e.target.dataset.userid;
      const that = this;
      //询问发起者是否确定删除
      wx.showModal({
        title: '提示',
        content: '确定要踢出该好友吗？',
        success: function (res) {
          if (res.confirm) {
            that.triggerEvent('shotOff', userId)
          } else if (res.cancel) {
          }
        }
      })

    },
    //被邀请者点击选完了
    finished: function () {
      const that = this;
      //给与用户提示
      wx.showModal({
        title: '提示',
        content: '点击选择完成后，无法继续选择商品',
        success: function (res) {
          if (res.confirm) {
            //用户点击选好了
            let obj = {};
            obj.command = 4;
            //发送已选好给后台
            wx.sendSocketMessage({
              data: JSON.stringify(obj),
              success: function (res) {
                that.setData({
                  isFinished: true
                })
                //将选择完成的用户传给父级
                that.triggerEvent('finished', true)
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }
      })
    }
    
  },
  ready:function(){
    var that = this;
  }
})
