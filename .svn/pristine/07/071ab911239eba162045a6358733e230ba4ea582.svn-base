const contant = require("../../../utils/contant.js");

// pages/order/remark/remark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fontNum: 0, //备注的字数
    remark: '', //备注的内容
    active: 0,//默认的选择
    ordinaryType: contant.ordinaryType, //普通分类
    ordinary: '0', //默认是个人还是公司
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  /*切换 */
  change_invoice: function(e){
    const num = parseInt(e.target.dataset.index);
    this.setData({
      active: num
    })
  },
  /*个人公司切换*/
  radioChange: function(e){
    this.setData({
      ordinary: e.detail.value
    })
  },
  /* 保存按钮*/
  formSubmit: function (e) {
    //发票数据
    let orderInvoice = e.detail.value;

    //如果是增值税发票
    if (this.data.active ==1){
      orderInvoice.type = 2;
    }


    //关闭当前页面，返回上一页面
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      orderInvoice: orderInvoice,
    });
    wx.navigateBack({//返回
      delta: 1
    })
  },
})