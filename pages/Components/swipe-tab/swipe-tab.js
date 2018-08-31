// pages/Components/swipe-tab/swipe-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTab:{
      type:String,
      value:0
    },
    tabs:{
      type: Object,
      value: []
    },
    mode:{
      type: String,
      value: ''
    },
    shopid:{
      type: String,
      value: ''
    },
    top:{
        type:String,
        value:'80'
    },
 
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab:0,
    mode:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _swichNav(e){
      console.log(e)
      this.setData({
        currentTab: e.target.dataset.current
      });
      this._checkCor();
    },
    _checkCor () {
      if (this.data.currentTab > 3) {
        this.setData({
          scrollLeft: 300
        })
      } else {
        this.setData({
          scrollLeft: 0
        })
      }
    },
    // 滚动切换标签样式
    _switchTab (e) {
      console.log(e)
      this.setData({
        currentTab: e.detail.current+1
      });
      this._checkCor();
    },
  },
  created(e){
    console.log(this)
  }
})
