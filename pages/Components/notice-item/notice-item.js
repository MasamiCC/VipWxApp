// pages/Components/notice-item/notice-item.js
const contant = require("../../../utils/contant.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    message_type: contant.message_type,// ['系统消息', '活动消息', '黑卡消息', '订单消息']
    message_logo: ['msg_type_system@3x.png', 'msg_type_system@3x.png', 'msg_type_blackCard@3x.png', 'msg_type_order@3x.png']
  },

  /**
   * 组件的方法列表
   */
  methods: {
     
  }
   
})
