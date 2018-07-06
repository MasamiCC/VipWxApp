//logs.js
const util = require('../../utils/util.js')
var network = require("../../utils/network.js")
Page({
  data: {
    logs: [],
    userInfo: 'Hello World'
  },
  onLoad: function () {
    var that = this;
    network.requestLoading('search/searchKeywordsHint?keywords=江&city_id=109006', null, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      that.setData({
        userInfo:'sdffd'
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  }
})
