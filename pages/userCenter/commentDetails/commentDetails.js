// pages/userCenter/commentDetails/commentDetails.js
const App = getApp();
var network = require("../../../utils/network.js")
const utils = require("../../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userImg: "",
        imageUrl: App.globalData.imageUrl,
        starNum: "3.0",
        orderid: "",
        item: [],
        user:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        that.setData({
            user: wx.getStorageSync('user')
        })
        console.log(that.data.user)        
        if (options.orderid) {
            that.setData({
                orderid: options.orderid
            })
        }
        console.log(this.data.orderid)
        network.request("comment/getCommentDetailsVo", {
            orderid: this.data.orderid
        }, res => {
            var that = this;
            that.setData({
                item: res.result
            })
            console.log(res)
        })
        // item.createtime = utils.formatTime(new Date(item.createtime))
    },
    previewImg: function (e) {
        console.log(e)
        var imgs=[]
        imgs = imgs.concat(e.target.dataset.src)
        console.log(imgs)
        wx.previewImage({
            current: e.target.dataset.src, // 当前显示图片的http链接
            urls: imgs // 需要预览的图片http链接列表
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})