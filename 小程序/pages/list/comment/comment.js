var app = getApp();
Page({
  data: {
    pics: []
  },

  backList: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  choose: function () {//这里是选取图片的方法
    var that = this,
    pics = this.data.pics;

    wx.chooseImage({
      count: 6 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        console.log(pics);
        that.setData({
          pics: pics
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },

  uploadimg: function () {//这里触发图片上传的方法
    var pics = this.data.pics;
    this.uploadimg({
      url: 'https://........',//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    });
  },
  onLoad: function (options) {

  }

})