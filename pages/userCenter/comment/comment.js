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
    order_no:'',
    shop_service_score:'5',
    star_num:'5',
    uo_o:"/statics/imgs/up_o@3x.png",
    uo_g: "/statics/imgs/up_g@3x.png",
    down_o: "/statics/imgs/down_o@3x.png",
    down_g: "/statics/imgs/down_g@3x.png",
    index:1,
    goodlist:[],
    goodlist_1_3:[],
    goodlist_3:[],
    list_3:false
  },
  inputs: function (e) {
    var value = e.detail.value;
    var that = this;
    var len = parseInt(value.length)
    that.setData({
      textNum: len,
      comment_txt: value
    })
  },
  camera: function () {
    var that = this
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          showImg: tempFilePaths
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
  sub_comment: function () {
    var comment={};
    comment.order_no = this.data.order_no;
    comment.shop_id=this.data.item.shopId;
    comment.shop_service_score = this.data.shop_service_score;
    comment.user_comment_content = this.data.comment_txt;
    comment.goodlist = this.data.goodlist;
    network.requestInLogin(contant.data_url.saveordercomment, { comment: JSON.stringify(comment), images: this.data.showImg }, res => {
      console.log(res)
      if(res.success){
        wx.navigateTo({
          url: '/pages/userCenter/myComments/myComments',
        })
      }
    },res=>{
      console.log(res)
    }
    )
  },
  previewImg:function(e){ 
    console.log(e)
    wx.previewImage({
      current:e.target.dataset.src, // 当前显示图片的http链接
      urls:this.data.showImg // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.order_no){
      that.setData({
        order_no: options.order_no
      })
    }
    network.requestInLogin("order/getorderdetail", { order_no: options.order_no }, res => {
      console.log(res)
      var goodlist = res.result.goodlist;
      var newgoodlist=[];
      for(var i in goodlist){
          goodlist[i]['goods_good']='';
          newgoodlist.push(goodlist[i]);
      }
      that.setData({
        item: res.result,
        goodlist: newgoodlist
      })
      console.log(that.data)
      var goodlist_1_3=[]
      for(var i=0;i<3;i++){
          if(goodlist[i]){
              goodlist_1_3.push(goodlist[i])
          }
      }
      var goodlist_3=[]
      for(var i=0;i>3;i++){
        if(goodlist[i]){
            goodlist_3.push(goodlist_3)
        }
      }
      console.log(goodlist_1_3)
      that.setData({
        goodlist_1_3:goodlist_1_3,
        goodlist_3: goodlist_3
      })
    }
    )
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

  },
  _iconClick:function(event){
      console.log(event)
      var good=event.target.dataset.good;
      var id = event.target.dataset.id;
      var goodlist = this.data.goodlist;
      var that=this;
      for(var i in goodlist){
        if (goodlist[i]['goods_id'] == id){
            goodlist[i]['goods_good'] = good;
        }
      }
      that.setData({
          goodlist: goodlist
      })
      console.log(that.data.goodlist)
  },
  more:function(){
    this.setData({
        list_3:true
    })
  }
})