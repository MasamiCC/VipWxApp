// pages/Components/map_poi.js
const app = getApp()

var amapFile = require('../../../libs/amap-wx.js');
var config = require('../../../libs/config.js');

var markersData = [];

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    tips:[],
    markeraddess:'',
    mapShow: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _map: function (item) {
      console.log(item)
      this.triggerEvent('mapToggle',item);
    },
    makertap: function (e) {
      var id = e.markerId;
      var that = this;
      that.showMarkerInfo(markersData, id);
      that.changeMarkerColor(markersData, id);
      
    },
    loadKeyWords: function (keywords){
      var that = this;
      var key = config.Config.key;
      var myAmapFun = new amapFile.AMapWX({ key: key });
      var params = {
        iconPathSelected: '/statics/imgs/marker_checked.png',
        iconPath: '/statics/imgs/marker.png',
        success: function (data) {
          console.log(data)
          that.setData({
            tips: [],
            markeraddess: data.markers[0].address,
          })
          markersData = data.markers;
          var poisData = data.poisData;
          var markers_new = [];
          markersData.forEach(function (item, index) {
            markers_new.push({
              id: item.id,
              latitude: item.latitude,
              longitude: item.longitude,
              iconPath: item.iconPath,
              width: item.width,
              height: item.height
            })
          })
          if (markersData.length > 0) {
            that.setData({
              markers: markers_new
            });
            that.setData({
              city: poisData[0].cityname || ''
            });
            that.setData({
              latitude: markersData[0].latitude
            });
            that.setData({
              longitude: markersData[0].longitude
            });
            that.showMarkerInfo(markersData, 0);
          } else {
            wx.getLocation({
              type: 'gcj02',
              success: function (res) {
                console.log(res)
                that.setData({
                  latitude: res.latitude
                });
                that.setData({
                  longitude: res.longitude
                });
                that.setData({
                  city: '北京市'
                });
              },
              fail: function () {
                that.setData({
                  latitude: 39.909729
                });
                that.setData({
                  longitude: 116.398419
                });
                that.setData({
                  city: '北京市'
                });
              }
            })

            that.setData({
              textData: {
                name: '抱歉，未找到结果',
                desc: ''
              }
            });
          }

        },
        fail: function (info) {
          // wx.showModal({title:info.errMsg})
        }
      }
      if (keywords) {
        params.querykeywords = keywords;
      }
      //console.log(1)
      myAmapFun.getPoiAround(params)
    },
    loads: function (e) {
      console.log(e.target.dataset.item)
      var keywords = e.target.dataset.keywords;
      this.loadKeyWords(keywords)
      this._map(e.target.dataset.item);
    },
    bindInput: function (e) {
      var that = this;
      var keywords = e.detail.value;
      var key = config.Config.key;
      var myAmapFun = new amapFile.AMapWX({ key: key });
      myAmapFun.getInputtips({
        keywords: keywords,
        location: wx.getStorageSync('location').locationOther,
        city: wx.getStorageSync('location').city,
        success: function (data) {
          if (data && data.tips) {
            that.setData({
              tips: data.tips,
              mapShow: false
            });
          }
          console.log(that.data)
        }
      })
    },
    bindSearch(e){
      this.loads(e,)
    },
    showMarkerInfo: function (data, i) {
      var that = this;
      that.setData({
        textData: {
          name: data[i].name,
          desc: data[i].address
        }
      });
    },
    changeMarkerColor: function (data, i) {
      var that = this;
      var markers = [];
      for (var j = 0; j < data.length; j++) {
        if (j == i) {
          data[j].iconPath = "/statics/imgs/marker_checked.png";
        } else {
          data[j].iconPath = "/statics/imgs/marker.png";
        }
        markers.push({
          id: data[j].id,
          latitude: data[j].latitude,
          longitude: data[j].longitude,
          iconPath: data[j].iconPath,
          width: data[j].width,
          height: data[j].height
        })
      }
      that.setData({
        markers: markers
      });
      console.log(this.data.markers)
    }
  },

  ready: function (e) {
    this.loadKeyWords(wx.getStorageSync('location').fotmatted_address)
  },
 
})
