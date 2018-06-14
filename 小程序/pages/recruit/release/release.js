// pages/release/release.js
var server = require('../../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    isChecked: false,
    array2: ['毛坯', '简装', '精装'],
    id: 0,             //进入页面时，默认选择第0个，如果不需要默认选中，注释掉就可以了  
  },
  choseTxtColor: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      id: id
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  showSubmission: function () {
    wx.navigateTo({
      url: '../submission/submission',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    server.getJSON("getPlanPhone", function (json) {
      //console.log(json.msg);
      var issuccess = json.data.success;
      if (issuccess == true){
        var phone = json.data.data[0].plannumber;
        console.log(phone);
      }
    });

    // wx.request({
    //   url: 'https://wj.antyiz.xyz/api/landlordApply', //仅为示例，并非真实的接口地址
    //   data: {},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
  },
})