// pages/shop/shop-wifi/shop-wifi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toggleWifi:function(){
      this.triggerEvent('toggleWifi')
    },
    _copyWifi:function(e){
      wx.setClipboardData({
        data: e.target.dataset.password,
        success: function (res) {
          wx.showToast({
            title: '密码复制成功',
            icon:'none'
          })
        }
      })
    }
  }
})
