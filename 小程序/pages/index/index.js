//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/banner1.jpg',
      '/images/banner2.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1200,
    scrollTop: 100,
    houseList:[
      {
        topImg:'/images/banner2.png',
        name: '花果园半山小镇',
        collectImg:'/images/shoucang-2.png',
        collectImg2: '/images/shoucang-1.png',
        classifyImg:'/images/dianao.png',
        distance:'距我2.5公里',
        price:'¥ 329'
      },
      {
        topImg: '/images/banner2.png',
        name: '花果园半山小镇',
        collectImg: '/images/shoucang-2.png',
        collectImg2: '/images/shoucang-1.png',
        classifyImg: '/images/zhuoyou.png',
        distance: '距我2.5公里',
        price: '¥ 329'
      },
      {
        topImg: '/images/banner2.png',
        name: '花果园半山小镇',
        collectImg: '/images/shoucang-2.png',
        collectImg2: '/images/shoucang-1.png',
        classifyImg: '/images/KTV.png',
        distance: '距我2.5公里',
        price: '¥ 329'
      }
    ],
    colleceted:false
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }  

  },
  // 收藏切换
  onCollectionTap:function(){
    var that = this;
    var type = that.data.type === 'true' ? 'false' : 'true';
    that.setData({
      colleceted: type
    });
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  showHouse:function(){
    wx.navigateTo({
      url: '../index/house/house',
    })
  },
  showSearch: function () {
    wx.navigateTo({
      url: '../index/search/search',
    })
  },
  showQuick: function () {
    wx.navigateTo({
      url: '../index/quick/quick',
    })
  },
  showCollection: function () {
    wx.navigateTo({
      url: '../index/collection/collection',
    })
  },
  showDetail: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  showRecruit: function () {
    wx.navigateTo({
      url: '../recruit/recruit',
    })
  },
})
