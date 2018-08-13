// pages/Components/shop-star/shop-star.js
const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scores:{
      type:String,
      value:'2'
    },
    marWidth: {
      type: String,
      value: ''
    },
    total:{
      type: String,
      value: '5'
    },
    edit:{
      type:Boolean,
      value:false,
    },
    size:{
      type: String,
      value: '30'
    },
    alignFlg:{
      type: String,
      value: 'left'
    },
    margin_lr:{
        type:String,
        value:'10'
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    arr:[],
    imageUrl: App.globalData.imageUrl,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _starClick:function(options){
      var that=this;
      if (that.data.edit){
        var index = options.target.dataset.index+1;
        that.setData({
          scores: index,
        })
      }
      this.triggerEvent('startChange', index);
    }
  },
  ready:function(){
    var total = this.data.total;
    var arr=[];
    for (var i = 0; i < total;i++){
      arr.push(i);
    }
    this.setData({
      arr:arr,
    })
  }
})
