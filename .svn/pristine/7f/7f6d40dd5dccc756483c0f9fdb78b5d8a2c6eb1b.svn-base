// pages/Components/shop-diandan-list/shop-diandan-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cat:{
      type:Object,
      value:[]
    },
    active:{
      type:Boolean,
      value:false
    },
    showCat:{
      type:String,
      value:''
    },
    count:{
      type: String,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _catClick:function(e){
      this.triggerEvent('catClick', this.data.cat.typeid)
    },
    _cartChange:function(obj){
      console.log(obj)
      var count=this.data.count;
      count = (obj.detail.type=='mins')?--count:++count;
      console.log(count)
      this.setData({
        count: count
      })
      this.triggerEvent('cartChange', obj.detail.socketMsg);
    },
    type_click() {
      this.setData({
        active: true
      })
    }
  },
  ready(){
    // console.log(this.data.cat)
  },
  
})
