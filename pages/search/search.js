//sesrch.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var aa="<div><span style='color:red'>江南</span>厨房</div>";
    WxParse.wxParse('aa', 'html', aa, that);
  }
})