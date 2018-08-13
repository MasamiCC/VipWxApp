// pages/Components/lists/lists.js
const App = getApp();
const network = require("../../../utils/network.js")
const util = require("../../../utils/util.js")
const contant = require("../../../utils/contant.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    currentPage: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    endFlg: false,
    list_item: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _pullUp: function() {
      this._getData(this._getAjaxUrl(1), -1, 1);
    },
    _pullDown: function() {
      this._getData(this._getAjaxUrl(), 1);
    },
    _getData: function (url, flg,freshen) {
      var that = this;
      var list = that.data.list;
      var currentPage = that.data.currentPage;
      var totalRecords = that.data.totalRecords;
      //判断用户操作是否为上拉刷新
      if (freshen != 1){
        if (totalRecords > 0 && list.length >= totalRecords) {
          that.setData({
            endFlg: true,
          })
          return false;
        }
      }
      network.requestInLogin(url, null, res => {
        console.log(res)
        if (res.success) {
          //如果是上拉加载
          if (freshen == 1){
            currentPage = 1
            that.setData({
              list: res.result.items,
              list_item: res.result.items,
              currentPage: currentPage,
              totalPages: res.result.totalPages,
              totalRecords: res.result.totalRecords
            })
          }else{
            var items = res.result.items || res.result.records;
            for (var i in items) {
              if (flg > 0) {
                list.push(items[i])
              } else {
                list.unshift(items[i])
              }
            }
            currentPage++
            var list_item = list.reverse()
            that.setData({
              list: list,
              list_item: list_item,
              currentPage: currentPage,
              totalPages: res.result.totalPages,
              totalRecords: res.result.totalRecords
            })
          }
        }
        console.log(that.data.list)
        console.log(that.data.list_item)

      }, res => {
      }, "处理中")
    },
    _getAjaxUrl: function(a) {
      var dataUrl = this.data.url;
      var currentPage = this.data.currentPage;
      if (dataUrl.indexOf('?') > 0) {
        dataUrl += "&currentPage=" + currentPage;
      } else {
        dataUrl += "?currentPage=" + currentPage;
      }

      //如果是向上拖动
      if(a == 1){
        dataUrl = '';
        dataUrl = this.data.url;
        dataUrl += "&currentPage=" + 1;
      }
      return dataUrl;
    }
  },
  ready: function() {
    this._getData(this._getAjaxUrl());

  }
})