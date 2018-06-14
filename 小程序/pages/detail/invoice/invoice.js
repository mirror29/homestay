// pages/detail/invoice/invoice.js
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    region: ['广东省', '广州市', '海珠区'],
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  bindChange2: function (e) {

    var that = this;
    that.setData({ currentTab2: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  swichNav2: function (e) {

    var that = this;

    if (this.data.currentTab2 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab2: e.target.dataset.current
      })
    }
  },
  showInvoice2:function(){
    wx.navigateTo({
      url: '../invoice-2/invoice-2',
    })
  }
})  