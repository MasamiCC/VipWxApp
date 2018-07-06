const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: app.globalData.imageUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _goType(event){
    //  绑定事件的当前组件的typeid
      var typeid = event.currentTarget.dataset.typeid; 
      console.log(typeid)
      wx.navigateTo({
        url: '/pages/shop/shop-list/shop-list?typeid=' + typeid 
      })
    }
  }
})
