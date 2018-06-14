// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    type: '房东'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  toggle: function (e) {
    var that = this;
    var type = that.data.type === '用户' ? '房东' : '用户';
    that.setData({
      type: type
    });
  },
  showModal: function () {
    wx.showModal({
      showCancel: false,
      title: '收益须知',
      content: '每月15日为订单结算日，届时会将您的本月收益打至您的银行账户',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  showMyHouse:function(){
    wx.navigateTo({
      url: '../user/my-house/my-house',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 用户头像-个人资料
   */
  showPersonalData: function () {
    wx.navigateTo({
      url: '../user/information/information',
    })
  },
  /**
   * 实名认证——实名认证
   */
  showAuthentication: function() {
    wx.navigateTo({
      url: '../user/authentication/authentication',
    })
  },

  /**
   * 我的钱包-提现
   */
  showWallet: function () {
    wx.navigateTo({
      url: '../user/money/money',
    })
  },

  /**
   * 切换为房东——请先进行实名认证
   */
  nameDetection: function () {
    wx.navigateTo({
      url: '../user/landlord_entrance/landlord_entrance',
    })
  },

  // 切换为房东
  showLandlord:function(){
    wx.switchTab({
      url: '../landlord/landlord',
    })
  },
  
  /**
   * 公司简介-公司简介
   */
  showPresentation:function () {
    wx.navigateTo({
      url: '../user/company_presentation/company_presentation',
    })
  },

  /**
   * 用户反馈-用户反馈
   */
  showFeedback: function () {
    wx.navigateTo({
      url: '../user/feedback/feedback',
    })
  },

/**
 * 常见问题-常见问题
 */
  showFAQ: function () {
    wx.navigateTo({
      url: '../user/FAQ/FAQ',
    })
  },

  // 添加房源
  addHouse:function(){
    wx.navigateTo({
      url: '../recruit/release/release',
    })
  },

  // 房东收益明细
  showWallet2:function(){
    wx.navigateTo({
      url: '../user/money/wallet_detail/wallet_detail',
    })
  }
})