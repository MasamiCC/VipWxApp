const contant = require("../../../utils/contant.js")
const App = getApp();
const network = require("../../../utils/network.js")


Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [// 1:全部；2：带图；3：好评；4：中评 ;5:差评
            { title: '待评价', value: '1', mode: 'unComments', url: contant.data_url.orderlistUnComments,num1:""},
            { title: '已评价', value: '2', mode: 'mycomments', url: contant.data_url.mycomments ,num1:""},
        ],
        top:"130",
        currentTab: '1',
        imageUrl: App.globalData.imageUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        network.requestInLogin("comment/getmycomments", {
            currentPage: "1", currentPage:"0"
        }, res => {
            console.log(res)
            console.log("已评价列表")
            var num1 = res.result.items.length
            var that = this
            that.setData({
                'tabs[1].num1':num1
            })
        })

        network.requestInLogin("order/getOrderListByShopType", {
            currentPage: "1", type: "0", orderFlag: "3"
        }, res => {
            console.log(res)
            console.log( "待评价列表")
            var num2 = res.result.items.length
            var that = this
            that.setData({
                'tabs[0].num1': num2
            })
        })

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