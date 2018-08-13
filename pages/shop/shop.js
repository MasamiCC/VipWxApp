// pages/shop.js
const app = getApp()
var network = require("../../utils/network.js")
var util = require("../../utils/util.js")
var wxSocket = require("../../utils/wxSocket.js")
var WxNotificationCenter = require("../../utils/WxNotificationCenter.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop:[],//商家信息
    imgUrl: app.globalData.imageUrl,//图片地址
    comments:[],//评价
    showWifi:false,//显示WiFi
    diandanFlg:false,
    commentForScores:[], 
    commentcount: '', 
    foodid:'',
    shopid: '',//店家id
    size:'',
    marWidth: '',
    showImg:[],
    
    show_404: false, //显示404
  },

  /** 
   * 加载商家
   * **/
  loadShop:function (id){
    var that=this;
    var location = wx.getStorageSync('location');
    var map_point = wx.getStorageSync('location').locationOther;
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#333',
    });
    network.request("shop/newGetShopDetail", { shopid: id, map: map_point }, res => {
      //判断商家有无内容
      if (res.result){
        var shopRoots = wx.getStorageSync('shopRoots') ? wx.getStorageSync('shopRoots') : [];
        for (var i in shopRoots) {
          if (shopRoots[i]['id'] == id) {
            shopRoots.splice(i, 1);
          }
        }
        shopRoots.unshift(res.result);
        wx.setStorageSync('shopRoots', shopRoots)

        var shopscore = res.result;
        var shopscorenum = parseFloat(shopscore.scores).toFixed(1);
        shopscore.scores = shopscorenum;
        that.setData({
          shop: shopscore,
          shopresult: res.result
        })  
        console.log(this.data.shop);
        if (res.map.comments) {
          var comments = res.map.comments;
          for (var i in comments) {
            comments[i]['createTime'] = util.formatTime(new Date(comments[i]['createTime']));
            var showimg = [];
            var imgUrl = this.data.imgUrl
            for (var i in comments) {
              comments[i]['createTime'] = util.formatTime(new Date(comments[i]['createTime']));
              showimg = showimg.concat(imgUrl + comments[i].img0, imgUrl + comments[i].img1, imgUrl + comments[i].img2, imgUrl + comments[i].img3)
              for (var i = 0; i < showimg.length; i++) {
                if (showimg[i] == "https://www.592vip.com:91/null") {
                  showimg.splice(i, 1);
                  i = i - 1;
                }
              }
            }

          }
          that.setData({
            comments: comments,
            commentcount: res.map.commentcount,
            commentForScores: res.map.commentForScores,
            showImg: showimg
          })
          that.reloadComments();
        }
      }else{
        //显示404页面
        that.setData({
          show_404: true,
        })
      }
    })

    
  },
    previewImg: function (e) {
        console.log(e)
        console.log(this.data.showImg)

        wx.previewImage({
            current: e.target.dataset.src, // 当前显示图片的http链接
            urls: this.data.showImg // 需要预览的图片http链接列表
        })
    },
    shop_discount: function () {
        var id = this.data.shopid;
        wx.navigateTo({
            url: '../../pages/shop/shop-discount/shop-discount?id=' + id
        })
        console.log(id)
    },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置未选完的用户为0
    wx.setStorageSync('UnFinishedNum', 0);

    var shopid = options.shopid
    var foodid = options.foodid ? options.foodid:''
    //获取商家详情
    let that = this;
    that.loadShop(shopid);
    that.setData({
      'foodid': foodid,
      'shopid': shopid,
      'diandanFlg':foodid==''?false:true
    });

    wx.showShareMenu({
      withShareTicket: true
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
    //关闭websocket
    wxSocket.closeWebSocket();
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
   * 用户点击邀请好友
   */
  onShareAppMessage: function (res) {
    //得到邀请人的foodid
    const foodid = this.data.shopid + ':' + wx.getStorageSync('user').id + ':1';
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '希望你们和我一起点餐哟',
      path: '/pages/shop/shop?foodid=' + foodid + '&shopid=' + this.data.shopid,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  //显示wifi
  // _toggleWifi:function(){
  //   this.setData({
  //     showWifi: !this.data.showWifi
  //   })
  // },
  //点餐按钮
  _diandan:function(){
    var that=this;
    //判断用户是否登录
    if (wx.getStorageSync('user') == ''){
      util.showError('请您先登陆！')
      return false;
    }
    //跳往点餐页面
    wx.navigateTo({
      url: '/pages/shop/shop-diandan/shop-diandan?shopid=' + that.data.shopid
    })
  },

  // 接受消息处理函数
  // socketMessage: function (event, data) {
  //   console.log(data)
  //   var that = event;
  //   var users = that.data.users;
  //   var result = JSON.parse(data.data, true);
  //   var response = result.response;//数据返回
  //   if (result.command == "0") {
  //     console.log('command')
  //     WxNotificationCenter.postNotificationName("shopCart", { response: result.response });
  //   }
  // },
  _inviate:function(){
    wx.showShareMenu({
      withShareTicket: true,
      success:function(res){
        console.log("success:",res)
      },
      fail: function (res){
        console.log("fail:" +res)
      }
    })
  },
  phonecall:function(){
    wx.makePhoneCall({
        phoneNumber: this.data.shop.mobile //仅为示例，并非真实的电话号码
      })
    },
  mapnav: function (e) {
    var mapPoint = this.data.shop.mapPoint;
    var str = mapPoint;
    var arr = str.split(",");
    console.log(arr);
    var latitude = parseFloat(arr[0]);
    var longitude = parseFloat(arr[1]);
    var address = this.data.shop.address;
    var name = this.data.shop.shopName;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        latitude = latitude
        longitude = longitude
        var speed = res.speed
        var accuracy = res.accuracy 
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: name,
          address: address,
          scale: 28,
        })  
      }
    })
  },
  // 重构评价统计数据
  reloadComments:function (){
    var commentForScores = this.data.commentForScores;
    var commentcount = this.data.commentcount;
    var newArr={};
    for (var i in commentForScores){
      newArr[commentForScores[i]['scores']] = parseInt((commentForScores[i]['count'] / commentcount) * 100) ;
    }
    this.setData({
      commentForScores: newArr,
    })
    console.log(newArr)
  },
  allcomments:function(){
    var id = this.data.shop.id;
    wx.navigateTo({
      url: '../../pages/userCenter/allcomments/allcomments?shopid='+id,
    })
  },
  //去优惠买单
  go_shopCheck: function(){
    //判断用户是否登录
    if (wx.getStorageSync('user') == '') {
      util.showError('请您先登陆！')
      return false;
    }
    wx.navigateTo({
      url: '/pages/shop/shop-check/shop-check?shopid=' + this.data.shopid
    })
  }
})