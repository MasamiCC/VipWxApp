// pages/userCenter/allcomments.js

const network = require("../../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [// 1:全部；2：带图；3：好评；4：中评 ;5:差评
      { title: '全部', value: '1'   },
      { title: '带图', value: '2'  },
      { title: '差评', value: '3' },

    ],
    currentTab: '1',
    shopid: '',
    commentStatus:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
      this.setData({
        'shopid':e.shopid,
      })
      //this.getcomments();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '全部评价',
    })
    
     
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      'currentTab': e.detail.current,
    });
    console.log(e.detail.current);
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

   

})


