const App = getApp();
var network = require("../../../utils/network.js")
const contant = require("../../../utils/contant.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comment_txt: "",
        textNum: "0",
        flag: true,
        item: [],
        imageUrl: App.globalData.imageUrl,
        showImg: [],
        img_length: true,
        order_no: '',
        shop_service_score: '5',
        index: 1,
        goodlist: [],
        goodlist_1_3: [],
        goodlist_3: [],
        list_3: false,
        showImgFiles: []
    },
    inputs: function(e) {
        var value = e.detail.value;
        var that = this;
        var len = parseInt(value.length)
        that.setData({
            textNum: len,
            comment_txt: value
        })
    },
    camera: function() {
        var that = this
        wx.chooseImage({
            count: 4, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                var tempFiles = res.tempFiles
                console.log(tempFilePaths)
                that.setData({
                    showImg: tempFilePaths,
                    showImgFiles: tempFiles
                })
                console.log(that.data.showImg.length)
                if (that.data.showImg.length >= 4) {
                    that.setData({
                        img_length: false
                    })
                }
            }
        })
    },
    sub_comment: function() {
        var goodlist = [];
        var goodlist_t = this.data.item.goodlist;
        var order_no = this.data.order_no;
        var shop_service_score = this.data.shop_service_score;
        var user_comment_content = this.data.comment_txt;
        for (var i in goodlist_t) {
            console.log(goodlist_t[i].goods_good)
            console.log(i)
            goodlist[i] = goodlist_t[i]

        }
        console.log(goodlist)
        var param = {};
        param["order_no"] = order_no;
        param["shop_service_score"] = shop_service_score;
        param["user_comment_content"] = user_comment_content;
        for(var i in goodlist){
            param["goodlist[" + i +"].goods_good"] = goodlist[i].goods_good;
            param["goodlist[" + i + "].order_goodsid"] = goodlist[i].order_goodsid;
            param["goodlist[" + i + "].comment"] = '';  
            param["goodlist[" + i + "].goods_id"] = goodlist[i].goods_id;                 
        }
        console.log(this.data.shop_service_score)
        
        network.requestInLogin("wxapp/addComment", {
            order_no: param.order_no,
            shop_service_score: param.shop_service_score,
            user_comment_content: param.user_comment_content
        }, res => {
            console.log(res)
            if (res.success) {
                var pics = this.data.showImg
                var showImgFiles = this.data.showImgFiles
                var commentid = res.result  
                for(var i in pics){
                    wx.uploadFile({
                        url: 'https://www.592vip.com/testapi/wxapp/addCommentImg', //接口地址
                        filePath: pics[i],
                        name: 'img',
                        formData: {
                            'commenid': commentid,
                            index: i
                        },
                        success: function (res) {
                            //do something
                            console.log(res)
                            console.log("上传"+[i]+"图片成功")
                        }
                    })
                }     
                    
                wx.navigateTo({
                    url: '/pages/userCenter/myComments/myComments',
                })   
            }
        }, res => {
            console.log(res)
        })
    },
    previewImg: function(e) {
        console.log(e)
        wx.previewImage({
            current: e.target.dataset.src, // 当前显示图片的http链接
            urls: this.data.showImg // 需要预览的图片http链接列表
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        if (options.order_no) {
            that.setData({
                order_no: options.order_no
            })
        }
        network.requestInLogin("order/getorderdetail", {
            order_no: options.order_no
        }, res => {
            console.log(res)
            var goodlist = res.result.goodlist;
            var newgoodlist = [];
            for (var i in goodlist) {
                goodlist[i]['goods_good'] = '';
                newgoodlist.push(goodlist[i]);
            }
            that.setData({
                item: res.result,
                goodlist: newgoodlist
            })
            console.log(that.data.item.goodlist)
            var goodlist_1_3 = []
            for (var i = 0; i < 3; i++) {
                if (goodlist[i]) {
                    goodlist_1_3.push(goodlist[i])
                }
            }

            var goodlist_3 = []
            for (var i = 0; i > 3; i++) {
                if (goodlist[i]) {
                    goodlist_3.push(goodlist_3)
                }
            }
            console.log(goodlist_1_3)
            that.setData({
                goodlist_1_3: goodlist_1_3,
                goodlist_3: goodlist_3
            })
            that.setData({
                goodlist_1_3: goodlist_1_3,
                goodlist_3: goodlist_3
            })
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

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

    //星星改变
    startChange: function (e){
      console.info(e.detail);
      this.setData({
          shop_service_score: e.detail,
          
      })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    _iconClick: function(event) {
        console.log(event)
        var good = event.target.dataset.good;
        var id = event.target.dataset.id;
        var goodlist = this.data.goodlist;
        var that = this;
        for (var i in goodlist) {
            if (goodlist[i]['goods_id'] == id) {
                goodlist[i]['goods_good'] = good;
            }
        }
        that.setData({
            goodlist: goodlist
        })
        console.log(that.data.goodlist)
    },
    more: function() {
        this.setData({
            list_3: true
        })
    },

})