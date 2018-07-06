// pages/Components/item/item.js
const App = getApp();
const utils = require("../../../utils/util.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: ''
    },
    item:{
      type: Object,
      value: []
    },
    order_no:{
      type:String,
      value:''
    },
    orderid: {
        type: String,
        value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    template:'',
    imageUrl:App.globalData.imageUrl,
    time:"",
    order_no:'',
    orderid:''
    },

  /**
   * 组件的方法列表
   */
  methods: {
    go_comment: function (e) {
      console.log("评价")
      console.log(e)
      wx.navigateTo({
        url: "/pages/userCenter/comment/comment?order_no="+this.data.order_no
      })
    },
    look_comment:function(){
      wx.navigateTo({
        url: "/pages/userCenter/commentDetails/commentDetails?orderid=" + this.data.orderid
      })
    }
  },
  ready(){
    console.log("-----------------")
    console.log(this.data)
    console.log("-----------------")
    var item=this.data.item;
    item.order_create_time = utils.formatTime(new Date(item.order_create_time))
    console.log(item.orderid)
    var orderids=''
    if(item.orderid){
        orderids=item.orderid
    }    
    var that =this;
    that.setData({
      time: item.order_create_time,
      order_no:item.order_no,
      orderid:orderids
    })
  },
})

