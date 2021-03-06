// pages/Components/comment-item/comment-item.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    imageUrl:{
      type: String,
      value: app.globalData.imageUrl,
    },
    commentStatus: {
      type: String,
      value: ''
    },
      showImg: {
          type: Array,
          value: []
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
      previewImg: function (e) {
          console.log(e.target.dataset.src)
          console.log(this.data.showImg)

          wx.previewImage({
              current: e.target.dataset.src, // 当前显示图片的http链接
              urls: this.data.showImg // 需要预览的图片http链接列表
          })
      }
  },
  ready() {
    console.log(this.data.item)
    var showImg = []
    var imgUrl = this.data.imageUrl  
    var comments = this.data.item
    //   for (var i in comments) {
        //   showimg = showimg.concat(imgUrl + comments[i].img0, imgUrl + comments[i].img1, imgUrl + comments[i].img2, imgUrl + comments[i].img3)
        //   for (var i = 0; i < showimg.length; i++) {
        //       if (showimg[i] == "https://www.592vip.com:91/null") {
        //           showimg.splice(i, 1);
        //           i = i - 1;
        //       }
        //   }
    //   }

    //   for (var i in comments) {
    //         showimg = showimg.concat(imgUrl + comments[i].img0, imgUrl + comments[i].img1, imgUrl + comments[i].img2, imgUrl + comments[i].img3)
          //   for (var i = 0; i < showimg.length; i++) {
          //       if (showimg[i] == "https://www.592vip.com:91/null") {
          //           showimg.splice(i, 1);
          //           i = i - 1;
          //       }
          //   }
    //   }

      showImg = showImg.concat(imgUrl + comments.img0, imgUrl + comments.img1, imgUrl + comments.img2, imgUrl + comments.img3)
    
      var that =this
      that.setData({
          showImg : showImg
      })  
    console.log(showImg)
  }
})