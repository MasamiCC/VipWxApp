
const app = getApp()
var network = require("../../../utils/network.js")
Component({
  properties: {
    items:{
      type:Object,
      value:[]
    }
  },
  data: {
    items:[],
    imgUrls: app.globalData.imageUrl,
    swiperCurrent: 0
  },
  methods: {
    //轮播图的切换事件  
    swiperChange: function (e) {
      //只要把切换后当前的index传给<swiper>组件的current属性即可  
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
    _getTuijian(){
      var that=this;
      var city_id=wx.getStorageSync('location').cityObj.city_id;
      var map_point = wx.getStorageSync('location').locationOther;
      network.requestInLogin("search/shop?city_id=" + city_id + "&map_point=" + map_point +"&sort=4", null, res => {
        that.setData({
          items:res.result.items
        })
      }, res => {

      }, "加载中")
    },
    _goShop(event) {
      var shopid = event.currentTarget.dataset.shopid;
      wx.navigateTo({
        url: '/pages/shop/shop?shopid=' + shopid,
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
  ready(){
  }
})
