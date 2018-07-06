// pages/Components/shop-item/shop-item.js
const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      value: {}
    },
    item:{
      type: Object,
      value: {}
    },
    mode:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: App.globalData.imageUrl,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _goShop(event){
      var shopid = event.currentTarget.dataset.shopid;
      console.log(shopid)
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
    //console.log(this.data.item)
  }
})
