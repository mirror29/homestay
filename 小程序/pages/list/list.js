// pages/list/list.js
var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    listData:[
      { 
        name: '花果园半山小镇', 
        time: '2018年6月1日-2018年6月3日', 
        night: '(共2晚)', 
        price: '￥1158', 
        img:'/images/banner2.png',
        btn:'待付款',
        delImg:'/images/del.png'
      }
    ],
    listData1: [
      {
        name: '花果园半山小镇',
        time: '2018年6月1日-2018年6月3日',
        night: '(共2晚)',
        price: '￥1158',
        img: '/images/banner2.png',
        btn: '待入住',
        delImg: '/images/del.png'
      }
    ],
    listData2: [
      {
        name: '花果园半山小镇',
        time: '2018年6月1日-2018年6月3日',
        night: '(共2晚)',
        price: '￥1158',
        img: '/images/banner2.png',
        btn: '待评价',
        delImg: '/images/del.png'
      }
    ],
    listData3: [
      {
        name: '花果园半山小镇',
        time: '2018年6月1日-2018年6月3日',
        night: '(共2晚)',
        price: '￥1158',
        img: '/images/banner2.png',
        btn: '已完成',
        delImg: '/images/del.png'
      }
    ],
  },

  showDetails: function (e) {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  showPay: function () {
    wx.navigateTo({
      url: '../detail/pay/pay',
    })
  },

  showViewOrder:function(){
    wx.navigateTo({
      url: '../detail/viewOrder/viewOrder',
    })
  },

  showOrderCompletion: function () {
    wx.navigateTo({
      url: '../detail/orderCompletion/orderCompletion',
    })
  },
  showComment: function () {
    wx.navigateTo({
      url: '../list/comment/comment',
    })
  },
  delList:function(e){        //删除订单
    // console.log(e.currentTarget.dataset.index)
     var n = e.currentTarget.dataset.index;

     var list = this.data.listData;
     list.splice(n,1);

     this.setData({
       listData:list
     })
  },
  delList1: function (e) {        //删除订单
    // console.log(e.currentTarget.dataset.index)
    var n = e.currentTarget.dataset.index;

    var list = this.data.listData2;
    list.splice(n, 1);

    this.setData({
      listData2: list
    })
  },
  delList2: function (e) {        //删除订单
    // console.log(e.currentTarget.dataset.index)
    var n = e.currentTarget.dataset.index;

    var list = this.data.listData3;
    list.splice(n, 1);

    this.setData({
      listData3: list
    })
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 200
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap
})