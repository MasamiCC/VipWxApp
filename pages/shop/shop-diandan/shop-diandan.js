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
            shop: [],
            imgUrl: app.globalData.imageUrl,
            showCat: '',
            active: false,
            shopCart: [],
            carCount: 0,
            showAttr: false,
            cartTotal: 0
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var that = this;
            that.setData({
              shopid: options.shopid
            })
            // 获取商家信息
            this._getShop(options.shopid)
            // 获取商家商品
            this._getGoods(options.shopid);
            this._sendMsg({ command: 2 })
            WxNotificationCenter.addNotification("shopCart", that.shopCartFn, that);

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
            console.log('show')

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {
            console.log('hide')
      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {
            console.log('onUnload')
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
      /**
       * 获取商品列表
       */
      _getGoods: function (shopid) {
            var that = this;
            network.request("goods/getgoodlist", { shopid: shopid, type: 0 }, res => {
                  if (res.result) {
                        var goodstype = res.result.goodstype;
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
                        that.setData({
                              goods: goodstype,
                        })
                  }

            })
      },
      /**
       * 获取商家基本信息
       */
      _getShop: function (id) {
            var that = this;
            var location = wx.getStorageSync('location');
            network.request("shop/newGetShopDetail", { shopid: id, map_point: location.location }, res => {
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
      catClick: function (event) {

            this.setData({
                  showCat: event.currentTarget.dataset.catid,
            })
      },
      /**
       * 菜单控制点击事件
       */
      menuDefault: function () {
            this.setData({
                  showCat: 0,
            })
      },
      // 购物车变更事件，发送消息
      _sendMsg: function (obj) {
            console.log(obj)
            wx.sendSocketMessage({
                  data: JSON.stringify(obj),
                  success: function (res) {
                        console.log(res)
                  },
                  fail: function (res) {
                        console.log(res)
                  }
            })
      },
      // 购物车变更通知回掉
      shopCartFn: function (info) {
            var that = this;
            that.setData({
                  shopCart: info.response,
            })
            that.getcarCount()
      },
      // 购物车变更事件
      _cartChange: function (obj) {
            console.log(obj)
            this._sendMsg(obj.detail.socketMsg);
            this._sendMsg({ command: 2 })
            this.setData({
                  showAttr: false,
            })
      },
      // 重组购物车，获取数量以及金额
      getcarCount() {
            var goods = this.data.goods;
            var shopCart = this.data.shopCart;
            var count = 0;
            var cartTotal = 0;
            for (var i in shopCart) {
                  if (shopCart[i]['foodUser']['id'] == wx.getStorageSync('user').id) {
                        var cartgoods = shopCart[i].cartgoods;
                        for (var j in cartgoods) {
                              count += cartgoods[j]['num'];
                              cartTotal += cartgoods[j]['num'] * cartgoods[j]['price'];
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
      _chooseAttr: function (event) {
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
      reLoadGoods: function () {
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

      }
})