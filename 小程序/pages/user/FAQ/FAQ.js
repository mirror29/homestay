// pages/user/FAQ/FAQ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: [],
    content: [
      {
        id: '01',
        title: '顽家小程序里面的房源都是真实的吗？会不会出现图片和展示房源不符合的呢？~',
        contents: '请您放心，在所有展示的房源中，房源均是实景拍摄。',
        shows: false,
      },
      {
        id: '02',
        title: '支付后如何发出去？',
        contents: '发猜数包的人设置问题和答案，只有提交的答案和出题答案一致才可以得到红包',
        shows: false
      },
        {
          id: '03',
          title: '好友可以转发我的猜数红包吗？',
          contents: '发猜数包的人设置问题和答案，只有提交的答案和出题答案一致才可以得到红包',
          shows: false
      },
        {
          id: '04',
          title: '发猜数红包会收取服务费吗？',
          contents: '发猜数包的人设置问题和答案，只有提交的答案和出题答案一致才可以得到红包',
          shows: false
      },
        {
          id: '05',
          title: '顽家小程序里面的房源都是真实的吗？会不会出现图片和展示房源不符合的呢？~',
          contents: '请您放心，在所有展示的房源中，房源均是实景拍摄。',
          shows: false,
        },
        {
          id: '06',
          title: '支付后如何发出去？',
          contents: '发猜数包的人设置问题和答案，只有提交的答案和出题答案一致才可以得到红包',
          shows: false
        }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getdata();
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
   * 常见问题——问题展开/隐藏 
   */
  showHide(e) {
    var contentFor = this.data.content;
    for (var i = 0; i < contentFor.length; i++) {
      　　if (e.currentTarget.dataset.changeid == contentFor[i].id) {
        　　　　var printPrice = "content[" + i + "].shows";
        　　　　if (this.data.content[i].shows) {
          　　　　　　this.setData({
            　　　　　　　　[printPrice]: false
          　　　　　　});
        　　　　} else {
          　　　　　　this.setData({
            　　　　　　　　[printPrice]: true
          　　　　　　});
        　　　　}
      　　} else {
        　　　　　　var printPrice1 = "content[" + i + "].shows";
        　　　　　　this.setData({
          　　　　　　　　[printPrice1]: false
        　　　　　　});
      　　　　}
    　　}
  },
  getdata: function () {  //定义函数名称
    var that = this;    // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://wj.antyiz.xyz/api/getPlanPhone',   //请求地址
      data: {  //发送给后台的数据
        plannumber: ''
      },
      header: {  //请求头
        'content-type': 'application/json' // 默认值
      },
      method: "GET",   //get为默认方法/POST
      success: function (res) {
        console.log(res.data)  //res.data相当于ajax里面的data,为后台返回的数据
        that.setData({    //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数        
          phone: res.data
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
})