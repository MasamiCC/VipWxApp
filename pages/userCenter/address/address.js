const app = getApp();

const network = require("../../../utils/network.js")

Page({
    /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    title: '管理收货地址',
  },
  onLoad: function (options) {
    this.getData();
    wx.setNavigationBarTitle({
      title: this.data.title//页面标题为路由参数
    })
  },
  getData: function () {  
    var that=this;
    network.requestInLogin("address/getAddressByUser",{type:0}, res => {
      console.log(res)
      if (res.success) {
        that.setData({
          datalist: res.result,
        })
      } else{
        wx.showToast({
          title: '请求失败',
          duration: 2000
        })   
      }  
    }, res => {

    }, "加载中")
  },
  checkboxChange:function(e){ 
    var that = this;
    var addressid = e.currentTarget.dataset.addressid;
    var flag = e.currentTarget.dataset.flag;
    var content=flag==0?'取消':'设置';
    var setflag=flag==0?'1':'0';
    network.requestInLogin("address/updateDefaultAddress?addressid=" + addressid + "&flag=" + setflag, null, res => {
      console.log(res)
      if (res.success) {
        that.getData();
        console.log(this)
        wx.showToast({
          title: content+"成功",
          duration: 2000
        })    
      }
    }, res => {
      that.getData();
      wx.showToast({
        title: content + "失败",
        duration: 2000
      }) 
    }, "处理中") 
  },
  // 删除
  deleteitem: function (e) {
    var that = this;
    var addressid = e.currentTarget.dataset.addressid;
      wx.showModal({
        title: '提示',
        content: '确认删除吗？',
        success: function (res) {
          if (res.confirm) {
            network.requestInLogin("address/delAddressById?addressId=" + addressid, null, res => {
              if (res.success) {
                that.getData();
              }
            }, res => {
            }, "处理中")
          }
        }
      })
  },
  navigateTo: function (e) {
    var that = this;
    var addressid = e.currentTarget.dataset.addressid;
    if (addressid){
      wx.navigateTo({
        //传递参数方式向get请求拼接参数一样
        url: '../../userCenter/newaddress/newaddress?addressId=' + addressid,
      })
      console.log(addressid)
    } else {
      wx.navigateTo({
        //传递参数方式向get请求拼接参数一样
        url: '../../userCenter/newaddress/newaddress' ,
      })
    }
    
  },
  
})