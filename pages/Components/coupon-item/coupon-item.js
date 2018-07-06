// pages/Components/coupon-item/coupon-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    mode:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    endtime:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    endTime:function() {
      var etime = new Date(this.data.endtime);
      // console.log(etime)
      var y = etime.getFullYear();
      var m = etime.getMonth() + 1;
        m=m<10?'0'+m:m;
      var d = etime.getDate();
        d = d < 10 ? '0' + d : d;
      var show_day = new Array('周日','周一', '周二', '周三', '周四', '周五', '周六' );
      var w = show_day[etime.getDay()];
      // console.log(y)
      // console.log(m)
      // console.log(d)
      // console.log(w)
      // console.log(etime.getDay())
      var entime = y + '-' + m + '-' + d+ ' (' + w + ')';
      this.setData({
        endtime: entime,
      })
      // console.log(entime)
    }
  },
  ready(){
    console.log(this.data)
    // console.log(this.data.item.end_time)
    this.setData({
      endtime: this.data.item.end_time,
    })
    this.endTime();
  },
  
})
