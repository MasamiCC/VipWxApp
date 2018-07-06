// pages/Components/my-scroll-view/my-scroll-view.js
const App = getApp();
const network = require("../../../utils/network.js")
const util = require("../../../utils/util.js")
const contant = require("../../../utils/contant.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
    list:{
      type:Object,
      value:{}
    },
    mode:{
      type:String,
      value:''
    },
    status:{
      type: String,
      value: ''
    },
    currentPage:{
      type: String,
      value: 1
    },
    shopid: {
      type: String,
      value: ''
    },
    commentType:{
      type: Array,
      value: [0,1]
    },
    commentStatus:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[],
    pageNum:1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _pullUp:function(){
      this.triggerEvent("pullUp")
    },
    _pullDown: function () {
      this.triggerEvent("pullDown")
    },
    _getDate:function(){
      var that=this;
      var mode=this.data.mode;
      var currentPage = this.data.currentPage;
      var commentType = this.data.commentType;
      var city_id=wx.getStorageSync('location').cityObj.city_id;
      var dataUrl = contant.data_url[mode] + "?currentPage=" + currentPage;
      var status=this.data.status;
      var commentStatus = this.data.commentStatus > 0 ? this.data.commentStatus:0;
      if (mode=='comment'){
        dataUrl += "&type=" + (commentStatus-1) + "&shopid=" + this.data.shopid;
      }

      if(status>0){
        dataUrl +="&orderStatus="+status;
      }
      if (city_id>0){
        dataUrl += "&cityid=" + city_id;
      }
      network.requestInLogin(dataUrl, null, res => {
        if (res.success) {
         that.setData({
           list: res.result.items
         }) 

        }
      }, res => {

      }, "处理中")
    }
  },
  ready(){
    if(this.data.mode!='root'){
      this._getDate()
    }
    
  }
})
