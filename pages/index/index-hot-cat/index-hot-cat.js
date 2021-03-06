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
    //前往指定商家
    _goType(event) {
      //  绑定事件的当前组件的typeid
      var typeid = event.currentTarget.dataset.typeid;
      var type_name = event.currentTarget.dataset.type_name;
      console.log(typeid)
      console.log(type_name)
      // var query = { typeid: typeid, type_name: type_name,}
      wx.navigateTo({
        url: '/pages/shop/shop-list/shop-list?typeid=' + typeid + '&type_name=' + type_name, 
        // url: '/pages/shop/shop-list/shop-list?query=' + query
      })
    },
  }
})
