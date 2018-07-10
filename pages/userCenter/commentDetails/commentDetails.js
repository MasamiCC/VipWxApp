// pages/userCenter/commentDetails/commentDetails.js
const App = getApp();
var network = require("../../../utils/network.js")
const utils = require("../../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userPhone: "17601525654",
        userImg: "",
        imageUrl: App.globalData.imageUrl,
        starNum: "3.0",
        orderid: "",
        item: [],
        comment:"老板很热情,店里环境很不错,菜的味道也不错,就是分量太少"
    },
        
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (options.orderid) {
            that.setData({
                orderid: options.orderid
            })
        }
        console.log(this.data.orderid)
        network.requestInLogin("order/getordercomment", { order_no: '11531190565113237851' }, res => {
            var that = this;
            that.setData({
                item: res.result
            })
            console.log(res)
        }
        )
        // item.createtime = utils.formatTime(new Date(item.createtime))
    }
    ,

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

    }
})