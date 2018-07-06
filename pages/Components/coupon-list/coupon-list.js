// pages/Components/coupon-list/coupon-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode:{
      type:String,
      value:''
    },
    list: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready() {
    console.log(this.data)
    
  },
})
