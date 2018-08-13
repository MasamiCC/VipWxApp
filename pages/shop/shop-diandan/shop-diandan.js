// pages/shop/shop-diandan/shop-diandan.js
const app = getApp()
var network = require("../../../utils/network.js")
var util = require("../../../utils/util.js")
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
var wxSocket = require("../../../utils/wxSocket.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid: '',
    goods: [],
    goodsNum: 0, //商品的个数
    shop: [],
    imgUrl: app.globalData.imageUrl,
    showCat: '',
    active: false,
    shopCart: [],
    carCount: 0,
    showAttr: false,
    cartTotal: 0,
    user: {},
    userNum: 1, //点餐人数默认为1
    initiator: true, //是否为发起人
    initiatorId: '', //发起人的Id
    isFinished: false, //是否选完
    UnFinishedNum: 0, //未选完的人数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    //判断用户进入的时候有无foodid
    if (options.foodid) {
      that.setData({
        foodid: options.foodid,
        initiator: false,
        shopid: options.shopid,
      })
      //得到发起者的id
      const initiatorId = that.data.foodid.match(/:(\S*):/)[1];
      that.setData({
        initiatorId: initiatorId
      })

    }else{
      that.setData({
        shopid: options.shopid,
      })
    }

  

    // 获取商家信息
    this._getShop(options.shopid)
    // 获取商家商品
    this._getGoods(options.shopid);
    //获取个人信息
    const userInfo = wx.getStorageSync('user');
    that.setData({
      user: userInfo
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    //得到未选完用户的数量
    wx.getStorageSync('UnFinishedNum');
    that.setData({
      UnFinishedNum: wx.getStorageSync('UnFinishedNum')
    })

    //先判断websocket是否连接中
    if (! wx.getStorageSync('isSocket') || wx.getStorageSync('isSocket') == '') {

      //新建一个foodid
      let foodid;

      //判断用户是否为发起人
      if (that.data.initiator) {
        foodid = that.data.shopid + ':' + wx.getStorageSync('user').id + ':1';
        that.setData({
          foodid: foodid,
          initiatorId: wx.getStorageSync('user').id
        })
      }

      //开启webSocket
      //建立wxSocket链接
      var user = {
        foodid: that.data.foodid,
        userid: wx.getStorageSync('user').id,
        pic: app.globalData.imageUrl + wx.getStorageSync('user').headpic || wx.getStorageSync('user').headpic_wx,
        name: wx.getStorageSync('user').pickName
      }
      wxSocket.startWebSocket(user);
    } else {
      //重新发送请求获取所有购物车
      that._sendMsg({
        command: 2
      })
    }

    //监听开启的websocket事件
    wx.onSocketMessage(function (res) {
      //购物车发生变化回调
      that.shopCartFn(res)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('hide')
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
  onShareAppMessage: function(res) {
    return {
      title: '希望你们和我一起点餐哟',
      path: '/pages/shop-diandan/shop-diandan?foodid=' + this.data.foodid + '&shopid=' + this.data.shopid,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  /**
   * 获取商品列表
   */
  _getGoods: function(shopid) {
    var that = this;
    network.request("goods/getgoodlist", {
      shopid: shopid
    }, res => {
      if (res.result) {
        var goodstype = res.result.goodstype;

        //当goodstype为1时
        if (goodstype.length <=1){
          goodstype[0]['cartNum'] = 0
        }else{
          for (var i in goodstype) {
            if (i == 0) {
              goodstype[i]['nextType'] = goodstype[parseInt(i) + 1]['typename']
            } else if (i == goodstype.length - 1) {
              goodstype[i]['prevType'] = goodstype[parseInt(i) - 1]['typename']
            } else {
              goodstype[i]['nextType'] = goodstype[parseInt(i) + 1]['typename']
              goodstype[i]['prevType'] = goodstype[parseInt(i) - 1]['typename']
            }
            goodstype[i]['cartNum'] = 0
          }
        }
        that.setData({
          goods: goodstype,
        })
      }

    })
  },
  /**
   * 获取商家基本信息
   */
  _getShop: function(id) {
    var that = this;
    var location = wx.getStorageSync('location');
    var map_point = wx.getStorageSync('location').locationOther;
    network.request("shop/newGetShopDetail", {
      shopid: id,
      map_point: map_point
    }, res => {
      if (res.result) {
        that.setData({
          shop: res.result,
        })
      }

    })
  },
  /**
   * 菜单分类点击事件
   */
  catClick: function(event) {
    this.setData({
      showCat: event.currentTarget.dataset.catid,
    })
  },
  /**
   * 菜单控制点击事件
   */
  menuDefault: function() {
    this.setData({
      showCat: 0,
    })
  },
  /**
   * 上一个菜单
   */
  prev: function(event) {
    //得到是第几个数
    const index = event.currentTarget.dataset.index;
    const showCat = this.data.goods[index-1].typeid;
    this.setData({
      showCat: showCat,
    })
  },
  /**
   * 下一个菜单
   */
  next: function(event) {
    //得到是第几个数
    const index = event.currentTarget.dataset.index;
    const showCat = this.data.goods[index + 1].typeid;
    this.setData({
      showCat: showCat,
    })
  },
  // 购物车变更事件，发送消息
  _sendMsg: function(obj) {
    wx.sendSocketMessage({
      data: JSON.stringify(obj),
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  //购物车变更通知回掉
  shopCartFn: function(res) {
    //模拟一个清除购物车的功能
    // this._sendMsg({
    //   command: 3
    // })
    const info = JSON.parse(res.data, true);
    //当自己购物车改变时
    if (info.command == 0) {
      //插入对象
      this.setData({
        shopCart: info.response,
      })
    }

    //当别人购物车改变时
    if (info.command == 1) {
      //获取购物车改变的userid
      var id = info.response.foodUser.id;
      var shopCart = this.data.shopCart;
      //需要改变的购物人num
      let num;

      //遍历购物车得到改变的购物车对象
      for (var i in shopCart){
        //如果id相同
        if (shopCart[i].foodUser.id == id){
          num = i;
          break;
        }
      }      
      shopCart[num] = info.response;

      //插入对象
      this.setData({
        shopCart: shopCart,
      })
    }

    //发起人链接成功
    if (info.command == 3) {
      //插入对象
      this.setData({
        shopCart: info.response,
      })

      // //把购物车baoc本地
      // wx.setStorageSync('shopCart', this.data.shopCart);
    }
    // 有新用户加入
    if (info.command ==4){
      //添加该用户进入shopCart
      var shopCart = this.data.shopCart;

      //定义一个变量repeat
      var repeat = false;

      //先判断用户是不是重复进入
      for (var i in shopCart){
        if (info.response.foodUser.id == shopCart[i].foodUser.id){
          repeat = true;
          break;
        }
      }

      //如果不是重复进入而用户
      if(!repeat){
        shopCart.push(info.response);
        this.setData({
          shopCart: shopCart,
          UnFinishedNum: this.data.UnFinishedNum + 1
        })

        //把未点餐完的用户增加的localStorage中
        wx.setStorageSync('UnFinishedNum', this.data.UnFinishedNum);
      }
    }

    // 参与者点击选完了按钮
    if (info.command == 7) {
      let UnFinishedNum = wx.getStorageSync('UnFinishedNum');
      UnFinishedNum = UnFinishedNum-1;
      wx.setStorageSync('UnFinishedNum', UnFinishedNum);
      this.setData({
        UnFinishedNum: this.data.UnFinishedNum - 1
      })
      return;
    }

    this.getcarCount()
  },
  //购物车变更事件
  _cartChange: function(obj) {
    console.log(obj)
    this._sendMsg(obj.detail.socketMsg);
    this._sendMsg({
      command: 2
    })
    this.setData({
      showAttr: false,
    })
  },
  //清空购物车
  emptyCart: function(){
    //替换购物车为空
    this._sendMsg({
      command: 5
    })
    //在获取所有的订单
    this._sendMsg({
      command: 2
    })
    //把组件的值清空
    // this.selectComponent("#shop-diandan-item").empty();
  },

  //邀请者删除被邀请人的订单
  shotOff: function(e){
    //根据用户id把购物车里的用户删掉
    const offUserId = e.detail;
    let shopCart = this.data.shopCart;
    let num;
    for (var i in shopCart){
      //如果offUserId等于foodUsed的id
      if (offUserId == this.data.shopCart[i].foodUser.id){
        num = i;
        break;
      }
    }
    //删掉该元素
    shopCart.splice(num, 1);
    this.setData({
      shopCart: shopCart
    })

  },
  // 重组购物车，获取数量以及金额
  getcarCount() {
    var goods = this.data.goods;
    var shopCart = this.data.shopCart;
    var count = 0;
    var cartTotal = 0;

    //如果用户是发起者将得到所有的价格
    if (this.data.initiator){
      for (var i in shopCart) {
        //得到所有人的价格
        for (var j in shopCart[i].cartgoods){
          cartTotal += shopCart[i].cartgoods[j]['num'] * shopCart[i].cartgoods[j]['price'];
        }
        //得到自己的数量
        if (shopCart[i]['foodUser']['id'] == wx.getStorageSync('user').id) {
          var cartgoods = shopCart[i].cartgoods;
          for (var j in cartgoods) {
            count += cartgoods[j]['num'];
          }
        }
      }
    }else{
      for (var i in shopCart) {
        if (shopCart[i]['foodUser']['id'] == wx.getStorageSync('user').id) {
          var cartgoods = shopCart[i].cartgoods;
          for (var j in cartgoods) {
            count += cartgoods[j]['num'];
            cartTotal += cartgoods[j]['num'] * cartgoods[j]['price'];
          }
        }
      }
    }
    this.setData({
      carCount: count,
      cartTotal: parseFloat(cartTotal).toFixed(2),
    })
    this.reLoadGoods();
  },

  // 多规格--获取数据
  _chooseAttr: function(event) {
    console.log(event)
    var goodsid = event.detail.id;
    var that = this;
    var obj = {
      goodsName: event.detail.goodsName,
      goodsid: goodsid,
    };
    network.request("goods/getgoodspecs?goodsid=" + goodsid, null, res => {
      obj.attrData = res.result;
      that.setData({
        showAttr: true,
        attrData: obj,
      })
    }, res => {
      console.log(res)
    }, "加载中")
  },
  reLoadGoods: function() {
    var goods = this.data.goods;
    var shopCart = this.data.shopCart;
    for (var i in goods) {
      var goodsC = goods[i]['goods'];
      var cartNum = 0;
      if (goodsC.length > 0) {
        for (var j in goodsC) {
          for (var m in shopCart) {
            //console.log(shopCart[m])
            var cartgoods = shopCart[m]['cartgoods'];
            for (var n in cartgoods) {
              if (goodsC[j]['id'] == cartgoods[n]['id']) {
                cartNum += cartgoods[n]['num'];
              }
            }
          }
        }
      }
      goods[i]['cartNum'] = cartNum;
    }
    this.setData({
      goods: goods,
    })

  },
  //邀请好友
  invite: function(e){
    this.onShareAppMessage(e)
  },
  //被邀请用户点击选好了按钮
  finished: function(){
    this.setData({
      isFinished: true
    })
  }
})