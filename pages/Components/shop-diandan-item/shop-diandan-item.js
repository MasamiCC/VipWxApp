// pages/Components/shop-diandan-item/shop-diandan-item.js
const network = require("../../../utils/network.js")
const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: App.globalData.imageUrl,
    num:0,
    attrs:[],
    attrsid:'',
    attrs2:[],
    attrs2id:'',
    attrShow:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
    _cartChange:function(event){
      console.log(event)
      var flg = event.target.dataset.type;
      var num=this.data.num;
      var numn = num;
      
      if(flg=='plus'){
        numn=num+1;
      }else{
        if(num>0){
          numn=num-1;
        }
      }
      var obj = { type: event.target.dataset.type}
      var socketMsg = { command: (numn == 0) ? '1' : '0'} ;
      socketMsg.cartgoods={
        "id": event.target.dataset.item.id,
        "name": event.target.dataset.item.goodsName,
        "price": event.target.dataset.item.price,
        "num": numn,
        "attr": "", //规格中文名称
        "attr_id": ""  //规格id
      } 
      obj.socketMsg = socketMsg;
      this.setData({
        num:numn
      })
      this.triggerEvent('cartChange', obj)
    },
    _chooseAttr:function(event){
      var item = event.target.dataset.item;
      var that=this;
      console.log(item)
      this.triggerEvent('chooseAttr', item);
      
    },
    attrTap:function(e){
      var dataset=e.target.dataset;
      var that=this;
      
      if (dataset.attr){
        that.setData({
          attrs2: dataset.attr,
          attrsid: dataset.id,
          attrs2id: dataset.attr[0].id
        })
      }else{
        that.setData({
          attrs2id: dataset.id
        })
      }
    }
  },
  ready(){
    //console.log(this.data.item)
  }
})
