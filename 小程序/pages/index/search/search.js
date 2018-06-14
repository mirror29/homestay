// pages/index/search/search.js
const app = getApp()

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cityType: options.cityType
    })
    if (this.data.cityResults == null) {
      this.setData({
        cityResults: this.data.citys
      })
    }
  },
  bindAZ: function (e) {
    var currentCityName = e.currentTarget.dataset.id
    var that = this;
    //放入A-Z的scrollTop参数
    if (that.data.scrollAZ == null) {
      wx.createSelectorQuery().selectAll('.city-item-A-Z').fields({
        dataset: true,
        size: true,
        rect: true
      }, function (res) {
        res.forEach(function (re) {
          if (currentCityName == re.dataset.cityname) {
            wx.pageScrollTo({
              scrollTop: re.top + that.data.scrollNow - 55.5,
              duration: 0
            })
          }
        })
      }).exec();
    } else {
      this.data.scrollAZ.forEach(function (re) {
        if (currentCityName == re.dataset.cityname) {
          wx.pageScrollTo({
            scrollTop: re.top + that.data.scrollNow - 55.5,
            duration: 0
          })
        }
      })
    }


  },
  onPageScroll: function (e) { // 获取滚动条当前位置
    this.setData({
      scrollNow: e.scrollTop
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  citySelected: function (e) {
    var cityNameTemp = e.currentTarget.dataset.cityname

    if (this.data.cityType == 'begin') {
      app.globalData.trainBeginCity = cityNameTemp
    }

    if (this.data.cityType == "end") {
      app.globalData.trainEndCity = cityNameTemp
    }
    wx.navigateTo({
      url: '../house/house',
    })
  },
  bindSarchInput: function (e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })

    var inputVal = e.detail.value;
    var cityResultsTemp = new Array()
    var citys = this.data.citys;

    if (inputVal == null || inputVal.trim() == '') {
      this.setData({
        cityResults: citys
      })
      return;
    }

    for (var i = 0; i < citys.length; i++) {
      if (citys[i].cityName.indexOf(inputVal) == 0 || citys[i].cityPY.indexOf(inputVal.toLowerCase()) == 0 || citys[i].cityPinYin.indexOf(inputVal.toLowerCase()) == 0) {
        //去除热门城市
        if (citys[i].cityPY.indexOf("#") != -1) {
          continue;
        }
        var ifHas = false;
        for (var j = 0; j < cityResultsTemp.length; j++) {
          if (cityResultsTemp[j] == citys[i]) {
            ifHas = true;
            break;
          }
        }
        if (!ifHas) {
          cityResultsTemp.push(citys[i]);
        }
      }
    }
    this.setData({
      cityResults: cityResultsTemp
    })
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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000)

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

  }, /**
   * 页面的初始数据
   */
  data: {
    scrollAZ: null,
    scrollNow: 0,
    cityType: 'begin',
    cityResults: null,
    cityAZ: [{ cityName: '热门' }, { cityName: 'A' }, { cityName: 'B' }, { cityName: 'C' }, { cityName: 'D' }, { cityName: 'E' }, { cityName: 'F' }, { cityName: 'G' }, { cityName: 'H' }, { cityName: 'J' }, { cityName: 'K' }, { cityName: 'L' }, { cityName: 'M' }, { cityName: 'N' }, { cityName: 'P' }, { cityName: 'Q' }, { cityName: 'R' }, { cityName: 'S' }, { cityName: 'T' }, { cityName: 'W' }, { cityName: 'X' }, { cityName: 'Y' }, { cityName: 'Z' },],
    citys: [{ cityName: '热门', cityPinYin: '', cityPY: '' }, { cityName: '上海', cityPinYin: '##', cityPY: '##' }, { cityName: '北京', cityPinYin: '##', cityPY: '##' }, { cityName: '广州', cityPinYin: '##', cityPY: '##' }, { cityName: '深圳', cityPinYin: '##', cityPY: '##' }, { cityName: '杭州', cityPinYin: '##', cityPY: '##' }, { cityName: 'A', cityPinYin: 'a', cityPY: 'a' }, { cityName: '阿克苏', cityPinYin: 'akesu', cityPY: 'aks' }, { cityName: '安康', cityPinYin: 'ankang', cityPY: 'ak' }, { cityName: '安陆', cityPinYin: 'anlu', cityPY: 'al' }, { cityName: '安庆', cityPinYin: 'anqing', cityPY: 'aq' }, { cityName: '鞍山', cityPinYin: 'anshan', cityPY: 'as' }, { cityName: '安顺', cityPinYin: 'anshun', cityPY: 'as' }, { cityName: '安阳', cityPinYin: 'anyang', cityPY: 'ay' }, { cityName: 'B', cityPinYin: 'b', cityPY: 'b' }, { cityName: '白城', cityPinYin: 'baicheng', cityPY: 'bc' }, { cityName: '蚌埠', cityPinYin: 'bangbu', cityPY: 'bb' }, { cityName: '保定', cityPinYin: 'baoding', cityPY: 'bd' }, { cityName: '宝鸡', cityPinYin: 'baoji', cityPY: 'bj' }, { cityName: '包头', cityPinYin: 'baotou', cityPY: 'bt' }, { cityName: '鲅鱼圈', cityPinYin: 'bayuquan', cityPY: 'byq' }, { cityName: '巴中', cityPinYin: 'bazhong', cityPY: 'bz' }, { cityName: '北戴河', cityPinYin: 'beidaihe', cityPY: 'bdh' }, { cityName: '北海', cityPinYin: 'beihai', cityPY: 'bh' }, { cityName: '北京', cityPinYin: 'beijing', cityPY: 'bj' }, { cityName: '博乐', cityPinYin: 'bole', cityPY: 'bl' }, { cityName: 'C', cityPinYin: 'c', cityPY: 'c' }, { cityName: '苍南', cityPinYin: 'cangnan', cityPY: 'cn' }, { cityName: '沧州', cityPinYin: 'cangzhou', cityPY: 'cz' }, { cityName: '常德', cityPinYin: 'changde', cityPY: 'cd' }, { cityName: '常州', cityPinYin: 'changzhou', cityPY: 'cz' }, { cityName: '巢湖', cityPinYin: 'chaohu', cityPY: 'ch' }, { cityName: '潮州', cityPinYin: 'chaozhou', cityPY: 'cz' }, { cityName: '承德', cityPinYin: 'chengde', cityPY: 'cd' }, { cityName: '成都', cityPinYin: 'chengdou', cityPY: 'cd' }, { cityName: '郴州', cityPinYin: 'chenzhou', cityPY: 'cz' }, { cityName: '赤壁', cityPinYin: 'chibi', cityPY: 'cb' }, { cityName: '赤峰', cityPinYin: 'chifeng', cityPY: 'cf' }, { cityName: '滁州', cityPinYin: 'chuzhou', cityPY: 'cz' }, { cityName: 'D', cityPinYin: 'd', cityPY: 'd' }, { cityName: '大理', cityPinYin: 'dali', cityPY: 'dl' }, { cityName: '大连', cityPinYin: 'dalian', cityPY: 'dl' }, { cityName: '丹东', cityPinYin: 'dandong', cityPY: 'dd' }, { cityName: '大庆', cityPinYin: 'daqing', cityPY: 'dq' }, { cityName: '大同', cityPinYin: 'datong', cityPY: 'dt' }, { cityName: '达州', cityPinYin: 'dazhou', cityPY: 'dz' }, { cityName: '德令哈', cityPinYin: 'delingha', cityPY: 'dlh' }, { cityName: '德清', cityPinYin: 'deqing', cityPY: 'dq' }, { cityName: '德阳', cityPinYin: 'deyang', cityPY: 'dy' }, { cityName: '德州', cityPinYin: 'dezhou', cityPY: 'dz' }, { cityName: '定远', cityPinYin: 'dingyuan', cityPY: 'dy' }, { cityName: '东莞', cityPinYin: 'dongguan', cityPY: 'dg' }, { cityName: '东海县', cityPinYin: 'donghaixian', cityPY: 'dhx' }, { cityName: '东胜', cityPinYin: 'dongsheng', cityPY: 'ds' }, { cityName: '东营', cityPinYin: 'dongying', cityPY: 'dy' }, { cityName: '都江堰', cityPinYin: 'doujiangyan', cityPY: 'djy' }, { cityName: '敦煌', cityPinYin: 'dunhuang', cityPY: 'dh' }, { cityName: 'E', cityPinYin: 'e', cityPY: 'e' }, { cityName: '额济纳', cityPinYin: 'ejina', cityPY: 'ejn' }, { cityName: '峨眉', cityPinYin: 'emei', cityPY: 'em' }, { cityName: '恩施', cityPinYin: 'enshi', cityPY: 'es' }, { cityName: '鄂州', cityPinYin: 'ezhou', cityPY: 'ez' }, { cityName: 'F', cityPinYin: 'f', cityPY: 'f' }, { cityName: '佛山', cityPinYin: 'foshan', cityPY: 'fs' }, { cityName: '福安', cityPinYin: 'fuan', cityPY: 'fa' }, { cityName: '福鼎', cityPinYin: 'fuding', cityPY: 'fd' }, { cityName: '涪陵', cityPinYin: 'fuling', cityPY: 'fl' }, { cityName: '福清', cityPinYin: 'fuqing', cityPY: 'fq' }, { cityName: '抚顺', cityPinYin: 'fushun', cityPY: 'fs' }, { cityName: '阜新', cityPinYin: 'fuxin', cityPY: 'fx' }, { cityName: '阜阳', cityPinYin: 'fuyang', cityPY: 'fy' }, { cityName: '抚州', cityPinYin: 'fuzhou', cityPY: 'fz' }, { cityName: '福州', cityPinYin: 'fuzhou', cityPY: 'fz' }, { cityName: 'G', cityPinYin: 'g', cityPY: 'g' }, { cityName: '赣州', cityPinYin: 'ganzhou', cityPY: 'gz' }, { cityName: '高密', cityPinYin: 'gaomi', cityPY: 'gm' }, { cityName: '格尔木', cityPinYin: 'geermu', cityPY: 'gem' }, { cityName: '广安', cityPinYin: 'guangan', cityPY: 'ga' }, { cityName: '广元', cityPinYin: 'guangyuan', cityPY: 'gy' }, { cityName: '广州', cityPinYin: 'guangzhou', cityPY: 'gz' }, { cityName: '桂林', cityPinYin: 'guilin', cityPY: 'gl' }, { cityName: '贵阳', cityPinYin: 'guiyang', cityPY: 'gy' }, { cityName: 'H', cityPinYin: 'h', cityPY: 'h' }, { cityName: '哈尔滨', cityPinYin: 'haerbin', cityPY: 'heb' }, { cityName: '海城', cityPinYin: 'haicheng', cityPY: 'hc' }, { cityName: '海口', cityPinYin: 'haikou', cityPY: 'hk' }, { cityName: '海拉尔', cityPinYin: 'hailaer', cityPY: 'hle' }, { cityName: '海宁', cityPinYin: 'haining', cityPY: 'hn' }, { cityName: '哈密', cityPinYin: 'hami', cityPY: 'hm' }, { cityName: '邯郸', cityPinYin: 'handan', cityPY: 'hd' }, { cityName: '杭州', cityPinYin: 'hangzhou', cityPY: 'hz' }, { cityName: '涵江', cityPinYin: 'hanjiang', cityPY: 'hj' }, { cityName: '汉中', cityPinYin: 'hanzhong', cityPY: 'hz' }, { cityName: '鹤壁', cityPinYin: 'hebi', cityPY: 'hb' }, { cityName: '合川', cityPinYin: 'hechuan', cityPY: 'hc' }, { cityName: '合肥', cityPinYin: 'hefei', cityPY: 'hf' }, { cityName: '鹤岗', cityPinYin: 'hegang', cityPY: 'hg' }, { cityName: '黑河', cityPinYin: 'heihe', cityPY: 'hh' }, { cityName: '衡山', cityPinYin: 'hengshan', cityPY: 'hs' }, { cityName: '衡水', cityPinYin: 'hengshui', cityPY: 'hs' }, { cityName: '衡阳', cityPinYin: 'hengyang', cityPY: 'hy' }, { cityName: '菏泽', cityPinYin: 'heze', cityPY: 'hz' }, { cityName: '淮安', cityPinYin: 'huaian', cityPY: 'ha' }, { cityName: '淮北', cityPinYin: 'huaibei', cityPY: 'hb' }, { cityName: '怀化', cityPinYin: 'huaihua', cityPY: 'hh' }, { cityName: '淮南', cityPinYin: 'huainan', cityPY: 'hn' }, { cityName: '黄山', cityPinYin: 'huangshan', cityPY: 'hs' }, { cityName: '黄石', cityPinYin: 'huangshi', cityPY: 'hs' }, { cityName: '呼和浩特', cityPinYin: 'huhehaote', cityPY: 'hhht' }, { cityName: '惠州', cityPinYin: 'huizhou', cityPY: 'hz' }, { cityName: '葫芦岛', cityPinYin: 'huludao', cityPY: 'hld' }, { cityName: '湖州', cityPinYin: 'huzhou', cityPY: 'hz' }, { cityName: 'J', cityPinYin: 'j', cityPY: 'j' }, { cityName: '佳木斯', cityPinYin: 'jiamusi', cityPY: 'jms' }, { cityName: '吉安', cityPinYin: 'jian', cityPY: 'ja' }, { cityName: '江门', cityPinYin: 'jiangmen', cityPY: 'jm' }, { cityName: '江山', cityPinYin: 'jiangshan', cityPY: 'js' }, { cityName: '胶州', cityPinYin: 'jiaozhou', cityPY: 'jz' }, { cityName: '嘉善', cityPinYin: 'jiashan', cityPY: 'js' }, { cityName: '嘉兴', cityPinYin: 'jiaxing', cityPY: 'jx' }, { cityName: '嘉峪关', cityPinYin: 'jiayuguan', cityPY: 'jyg' }, { cityName: '揭阳', cityPinYin: 'jieyang', cityPY: 'jy' }, { cityName: '吉林', cityPinYin: 'jilin', cityPY: 'jl' }, { cityName: '济南', cityPinYin: 'jinan', cityPY: 'jn' }, { cityName: '晋城', cityPinYin: 'jincheng', cityPY: 'jc' }, { cityName: '景德镇', cityPinYin: 'jingdezhen', cityPY: 'jdz' }, { cityName: '荆门', cityPinYin: 'jingmen', cityPY: 'jm' }, { cityName: '荆州', cityPinYin: 'jingzhou', cityPY: 'jz' }, { cityName: '金华', cityPinYin: 'jinhua', cityPY: 'jh' }, { cityName: '集宁', cityPinYin: 'jining', cityPY: 'jn' }, { cityName: '济宁', cityPinYin: 'jining', cityPY: 'jn' }, { cityName: '晋江', cityPinYin: 'jinjiang', cityPY: 'jj' }, { cityName: '锦州', cityPinYin: 'jinzhou', cityPY: 'jz' }, { cityName: '吉首', cityPinYin: 'jishou', cityPY: 'js' }, { cityName: '九江', cityPinYin: 'jiujiang', cityPY: 'jj' }, { cityName: '酒泉', cityPinYin: 'jiuquan', cityPY: 'jq' }, { cityName: '鸡西', cityPinYin: 'jixi', cityPY: 'jx' }, { cityName: 'K', cityPinYin: 'k', cityPY: 'k' }, { cityName: '开封', cityPinYin: 'kaifeng', cityPY: 'kf' }, { cityName: '凯里', cityPinYin: 'kaili', cityPY: 'kl' }, { cityName: '喀什', cityPinYin: 'kashen', cityPY: 'ks' }, { cityName: '库尔勒', cityPinYin: 'kuerle', cityPY: 'kel' }, { cityName: '昆明', cityPinYin: 'kunming', cityPY: 'km' }, { cityName: '昆山', cityPinYin: 'kunshan', cityPY: 'ks' }, { cityName: 'L', cityPinYin: 'l', cityPY: 'l' }, { cityName: '廊坊', cityPinYin: 'langfang', cityPY: 'lf' }, { cityName: '兰州', cityPinYin: 'lanzhou', cityPY: 'lz' }, { cityName: '拉萨', cityPinYin: 'lasa', cityPY: 'ls' }, { cityName: '耒阳', cityPinYin: 'leiyang', cityPY: 'ly' }, { cityName: '乐清', cityPinYin: 'leqing', cityPY: 'lq' }, { cityName: '梁平', cityPinYin: 'liangping', cityPY: 'lp' }, { cityName: '连江', cityPinYin: 'lianjiang', cityPY: 'lj' }, { cityName: '连云港', cityPinYin: 'lianyungang', cityPY: 'lyg' }, { cityName: '聊城', cityPinYin: 'liaocheng', cityPY: 'lc' }, { cityName: '辽阳', cityPinYin: 'liaoyang', cityPY: 'ly' }, { cityName: '辽源', cityPinYin: 'liaoyuan', cityPY: 'ly' }, { cityName: '丽江', cityPinYin: 'lijiang', cityPY: 'lj' }, { cityName: '临汾', cityPinYin: 'linfen', cityPY: 'lf' }, { cityName: '陵水', cityPinYin: 'lingshui', cityPY: 'ls' }, { cityName: '临海', cityPinYin: 'linhai', cityPY: 'lh' }, { cityName: '临河', cityPinYin: 'linhe', cityPY: 'lh' }, { cityName: '临沂', cityPinYin: 'linyi', cityPY: 'ly' }, { cityName: '六安', cityPinYin: 'liuan', cityPY: 'la' }, { cityName: '六盘水', cityPinYin: 'liupanshui', cityPY: 'lps' }, { cityName: '柳州', cityPinYin: 'liuzhou', cityPY: 'lz' }, { cityName: '溧阳', cityPinYin: 'liyang', cityPY: 'ly' }, { cityName: '龙岩', cityPinYin: 'longyan', cityPY: 'ly' }, { cityName: '龙游', cityPinYin: 'longyou', cityPY: 'ly' }, { cityName: '娄底', cityPinYin: 'loudi', cityPY: 'ld' }, { cityName: '吕梁', cityPinYin: 'lu:liang', cityPY: 'll' }, { cityName: '漯河', cityPinYin: 'luohe', cityPY: 'lh' }, { cityName: '洛阳', cityPinYin: 'luoyang', cityPY: 'ly' }, { cityName: '罗源', cityPinYin: 'luoyuan', cityPY: 'ly' }, { cityName: '庐山', cityPinYin: 'lushan', cityPY: 'ls' }, { cityName: 'M', cityPinYin: 'm', cityPY: 'm' }, { cityName: '马鞍山', cityPinYin: 'maanshan', cityPY: 'mas' }, { cityName: '满洲里', cityPinYin: 'manzhouli', cityPY: 'mzl' }, { cityName: '美兰', cityPinYin: 'meilan', cityPY: 'ml' }, { cityName: '梅州', cityPinYin: 'meizhou', cityPY: 'mz' }, { cityName: '绵阳', cityPinYin: 'mianyang', cityPY: 'my' }, { cityName: '汨罗', cityPinYin: 'miluo', cityPY: 'ml' }, { cityName: '漠河', cityPinYin: 'mohe', cityPY: 'mh' }, { cityName: '牡丹江', cityPinYin: 'mudanjiang', cityPY: 'mdj' }, { cityName: 'N', cityPinYin: 'n', cityPY: 'n' }, { cityName: '南昌', cityPinYin: 'nanchang', cityPY: 'nc' }, { cityName: '南城', cityPinYin: 'nancheng', cityPY: 'nc' }, { cityName: '南充', cityPinYin: 'nanchong', cityPY: 'nc' }, { cityName: '南丰', cityPinYin: 'nanfeng', cityPY: 'nf' }, { cityName: '南京', cityPinYin: 'nanjing', cityPY: 'nj' }, { cityName: '南宁', cityPinYin: 'nanning', cityPY: 'nn' }, { cityName: '南通', cityPinYin: 'nantong', cityPY: 'nt' }, { cityName: '南阳', cityPinYin: 'nanyang', cityPY: 'ny' }, { cityName: '内江', cityPinYin: 'neijiang', cityPY: 'nj' }, { cityName: '宁波', cityPinYin: 'ningbo', cityPY: 'nb' }, { cityName: '宁德', cityPinYin: 'ningde', cityPY: 'nd' }, { cityName: '宁海', cityPinYin: 'ninghai', cityPY: 'nh' }, { cityName: 'P', cityPinYin: 'p', cityPY: 'p' }, { cityName: '盘锦', cityPinYin: 'panjin', cityPY: 'pj' }, { cityName: '攀枝花', cityPinYin: 'panzhihua', cityPY: 'pzh' }, { cityName: '平顶山', cityPinYin: 'pingdingshan', cityPY: 'pds' }, { cityName: '萍乡', cityPinYin: 'pingxiang', cityPY: 'px' }, { cityName: '平遥', cityPinYin: 'pingyao', cityPY: 'py' }, { cityName: '莆田', cityPinYin: 'putian', cityPY: 'pt' }, { cityName: 'Q', cityPinYin: 'q', cityPY: 'q' }, { cityName: '迁安', cityPinYin: 'qianan', cityPY: 'qa' }, { cityName: '黔江', cityPinYin: 'qianjiang', cityPY: 'qj' }, { cityName: '潜江', cityPinYin: 'qianjiang', cityPY: 'qj' }, { cityName: '蕲春', cityPinYin: 'qichun', cityPY: 'qc' }, { cityName: '青岛', cityPinYin: 'qingdao', cityPY: 'qd' }, { cityName: '清远', cityPinYin: 'qingyuan', cityPY: 'qy' }, { cityName: '青州市', cityPinYin: 'qingzhoushi', cityPY: 'qzs' }, { cityName: '秦皇岛', cityPinYin: 'qinhuangdao', cityPY: 'qhd' }, { cityName: '琼海', cityPinYin: 'qionghai', cityPY: 'qh' }, { cityName: '齐齐哈尔', cityPinYin: 'qiqihaer', cityPY: 'qqhe' }, { cityName: '七台河', cityPinYin: 'qitaihe', cityPY: 'qth' }, { cityName: '泉州', cityPinYin: 'quanzhou', cityPY: 'qz' }, { cityName: '曲阜', cityPinYin: 'qufu', cityPY: 'qf' }, { cityName: '曲靖', cityPinYin: 'qujing', cityPY: 'qj' }, { cityName: '渠县', cityPinYin: 'quxian', cityPY: 'qx' }, { cityName: '衢州', cityPinYin: 'quzhou', cityPY: 'qz' }, { cityName: 'R', cityPinYin: 'r', cityPY: 'r' }, { cityName: '任丘', cityPinYin: 'renqiu', cityPY: 'rq' }, { cityName: '日照', cityPinYin: 'rizhao', cityPY: 'rz' }, { cityName: '如皋', cityPinYin: 'rugao', cityPY: 'rg' }, { cityName: '瑞安', cityPinYin: 'ruian', cityPY: 'ra' }, { cityName: '乳山', cityPinYin: 'rushan', cityPY: 'rs' }, { cityName: 'S', cityPinYin: 's', cityPY: 's' }, { cityName: '三门峡', cityPinYin: 'sanmenxia', cityPY: 'smx' }, { cityName: '三门县', cityPinYin: 'sanmenxian', cityPY: 'smx' }, { cityName: '三明', cityPinYin: 'sanming', cityPY: 'sm' }, { cityName: '三亚', cityPinYin: 'sanya', cityPY: 'sy' }, { cityName: '厦门', cityPinYin: 'shamen', cityPY: 'sm' }, { cityName: '上海', cityPinYin: 'shanghai', cityPY: 'sh' }, { cityName: '商丘', cityPinYin: 'shangqiu', cityPY: 'sq' }, { cityName: '上饶', cityPinYin: 'shangrao', cityPY: 'sr' }, { cityName: '上虞', cityPinYin: 'shangyu', cityPY: 'sy' }, { cityName: '山海关', cityPinYin: 'shanhaiguan', cityPY: 'shg' }, { cityName: '汕头', cityPinYin: 'shantou', cityPY: 'st' }, { cityName: '韶关', cityPinYin: 'shaoguan', cityPY: 'sg' }, { cityName: '绍兴', cityPinYin: 'shaoxing', cityPY: 'sx' }, { cityName: '邵阳', cityPinYin: 'shaoyang', cityPY: 'sy' }, { cityName: '神木', cityPinYin: 'shenmu', cityPY: 'sm' }, { cityName: '沈阳', cityPinYin: 'shenyang', cityPY: 'sy' }, { cityName: '深圳', cityPinYin: 'shenzhen', cityPY: 'sz' }, { cityName: '石家庄', cityPinYin: 'shijiazhuang', cityPY: 'sjz' }, { cityName: '十堰', cityPinYin: 'shiyan', cityPY: 'sy' }, { cityName: '双鸭山', cityPinYin: 'shuangyashan', cityPY: 'sys' }, { cityName: '四平', cityPinYin: 'siping', cityPY: 'sp' }, { cityName: '松江', cityPinYin: 'songjiang', cityPY: 'sj' }, { cityName: '松原', cityPinYin: 'songyuan', cityPY: 'sy' }, { cityName: '松滋', cityPinYin: 'songzi', cityPY: 'sz' }, { cityName: '绥德', cityPinYin: 'suide', cityPY: 'sd' }, { cityName: '绥芬河', cityPinYin: 'suifenhe', cityPY: 'sfh' }, { cityName: '遂宁', cityPinYin: 'suining', cityPY: 'sn' }, { cityName: '随州', cityPinYin: 'suizhou', cityPY: 'sz' }, { cityName: '苏州', cityPinYin: 'suzhou', cityPY: 'sz' }, { cityName: '宿州', cityPinYin: 'suzhou', cityPY: 'sz' }, { cityName: 'T', cityPinYin: 't', cityPY: 't' }, { cityName: '泰安', cityPinYin: 'taian', cityPY: 'ta' }, { cityName: '台安', cityPinYin: 'taian', cityPY: 'ta' }, { cityName: '泰宁', cityPinYin: 'taining', cityPY: 'tn' }, { cityName: '太原', cityPinYin: 'taiyuan', cityPY: 'ty' }, { cityName: '台州', cityPinYin: 'taizhou', cityPY: 'tz' }, { cityName: '泰州', cityPinYin: 'taizhou', cityPY: 'tz' }, { cityName: '唐山', cityPinYin: 'tangshan', cityPY: 'ts' }, { cityName: '滕州', cityPinYin: 'tengzhou', cityPY: 'tz' }, { cityName: '天津', cityPinYin: 'tianjin', cityPY: 'tj' }, { cityName: '天门', cityPinYin: 'tianmen', cityPY: 'tm' }, { cityName: '天水', cityPinYin: 'tianshui', cityPY: 'ts' }, { cityName: '铁岭', cityPinYin: 'tieling', cityPY: 'tl' }, { cityName: '桐城', cityPinYin: 'tongcheng', cityPY: 'tc' }, { cityName: '通化', cityPinYin: 'tonghua', cityPY: 'th' }, { cityName: '通辽', cityPinYin: 'tongliao', cityPY: 'tl' }, { cityName: '铜陵', cityPinYin: 'tongling', cityPY: 'tl' }, { cityName: '铜仁', cityPinYin: 'tongren', cityPY: 'tr' }, { cityName: '桐乡', cityPinYin: 'tongxiang', cityPY: 'tx' }, { cityName: '吐鲁番', cityPinYin: 'tulufan', cityPY: 'tlf' }, { cityName: 'W', cityPinYin: 'w', cityPY: 'w' }, { cityName: '瓦房店', cityPinYin: 'wafangdian', cityPY: 'wfd' }, { cityName: '万宁', cityPinYin: 'wanning', cityPY: 'wn' }, { cityName: '万源', cityPinYin: 'wanyuan', cityPY: 'wy' }, { cityName: '万州', cityPinYin: 'wanzhou', cityPY: 'wz' }, { cityName: '潍坊', cityPinYin: 'weifang', cityPY: 'wf' }, { cityName: '威海', cityPinYin: 'weihai', cityPY: 'wh' }, { cityName: '渭南', cityPinYin: 'weinan', cityPY: 'wn' }, { cityName: '文昌', cityPinYin: 'wenchang', cityPY: 'wc' }, { cityName: '温岭', cityPinYin: 'wenling', cityPY: 'wl' }, { cityName: '温州', cityPinYin: 'wenzhou', cityPY: 'wz' }, { cityName: '乌海', cityPinYin: 'wuhai', cityPY: 'wh' }, { cityName: '武汉', cityPinYin: 'wuhan', cityPY: 'wh' }, { cityName: '芜湖', cityPinYin: 'wuhu', cityPY: 'wh' }, { cityName: '乌兰浩特', cityPinYin: 'wulanhaote', cityPY: 'wlht' }, { cityName: '武隆', cityPinYin: 'wulong', cityPY: 'wl' }, { cityName: '乌鲁木齐', cityPinYin: 'wulumuqi', cityPY: 'wlmq' }, { cityName: '武清', cityPinYin: 'wuqing', cityPY: 'wq' }, { cityName: '武威', cityPinYin: 'wuwei', cityPY: 'ww' }, { cityName: '无锡', cityPinYin: 'wuxi', cityPY: 'wx' }, { cityName: '武夷山', cityPinYin: 'wuyishan', cityPY: 'wys' }, { cityName: '婺源', cityPinYin: 'wuyuan', cityPY: 'wy' }, { cityName: 'X', cityPinYin: 'x', cityPY: 'x' }, { cityName: '西安', cityPinYin: 'xian', cityPY: 'xa' }, { cityName: '襄阳', cityPinYin: 'xiangyang', cityPY: 'xy' }, { cityName: '咸宁', cityPinYin: 'xianning', cityPY: 'xn' }, { cityName: '孝感', cityPinYin: 'xiaogan', cityPY: 'xg' }, { cityName: '霞浦', cityPinYin: 'xiapu', cityPY: 'xp' }, { cityName: '西昌', cityPinYin: 'xichang', cityPY: 'xc' }, { cityName: '锡林浩特', cityPinYin: 'xilinhaote', cityPY: 'xlht' }, { cityName: '邢台', cityPinYin: 'xingtai', cityPY: 'xt' }, { cityName: '西宁', cityPinYin: 'xining', cityPY: 'xn' }, { cityName: '新乡', cityPinYin: 'xinxiang', cityPY: 'xx' }, { cityName: '信阳', cityPinYin: 'xinyang', cityPY: 'xy' }, { cityName: '新余', cityPinYin: 'xinyu', cityPY: 'xy' }, { cityName: '忻州', cityPinYin: 'xinzhou', cityPY: 'xz' }, { cityName: '许昌', cityPinYin: 'xuchang', cityPY: 'xc' }, { cityName: '徐州', cityPinYin: 'xuzhou', cityPY: 'xz' }, { cityName: 'Y', cityPinYin: 'y', cityPY: 'y' }, { cityName: '延安', cityPinYin: 'yanan', cityPY: 'ya' }, { cityName: '盐城', cityPinYin: 'yancheng', cityPY: 'yc' }, { cityName: '阳泉', cityPinYin: 'yangquan', cityPY: 'yq' }, { cityName: '扬州', cityPinYin: 'yangzhou', cityPY: 'yz' }, { cityName: '延吉', cityPinYin: 'yanji', cityPY: 'yj' }, { cityName: '烟台', cityPinYin: 'yantai', cityPY: 'yt' }, { cityName: '宜宾', cityPinYin: 'yibin', cityPY: 'yb' }, { cityName: '宜昌', cityPinYin: 'yichang', cityPY: 'yc' }, { cityName: '宜春', cityPinYin: 'yichun', cityPY: 'yc' }, { cityName: '银川', cityPinYin: 'yinchuan', cityPY: 'yc' }, { cityName: '英德', cityPinYin: 'yingde', cityPY: 'yd' }, { cityName: '营口', cityPinYin: 'yingkou', cityPY: 'yk' }, { cityName: '营山', cityPinYin: 'yingshan', cityPY: 'ys' }, { cityName: '鹰潭', cityPinYin: 'yingtan', cityPY: 'yt' }, { cityName: '义乌', cityPinYin: 'yiwu', cityPY: 'yw' }, { cityName: '宜兴', cityPinYin: 'yixing', cityPY: 'yx' }, { cityName: '益阳', cityPinYin: 'yiyang', cityPY: 'yy' }, { cityName: '永嘉', cityPinYin: 'yongjia', cityPY: 'yj' }, { cityName: '永州', cityPinYin: 'yongzhou', cityPY: 'yz' }, { cityName: '尤溪', cityPinYin: 'youxi', cityPY: 'yx' }, { cityName: '岳阳', cityPinYin: 'yueyang', cityPY: 'yy' }, { cityName: '余杭', cityPinYin: 'yuhang', cityPY: 'yh' }, { cityName: '榆林', cityPinYin: 'yulin', cityPY: 'yl' }, { cityName: '运城', cityPinYin: 'yuncheng', cityPY: 'yc' }, { cityName: '余姚', cityPinYin: 'yuyao', cityPY: 'yy' }, { cityName: 'Z', cityPinYin: 'z', cityPY: 'z' }, { cityName: '枣阳', cityPinYin: 'zaoyang', cityPY: 'zy' }, { cityName: '枣庄', cityPinYin: 'zaozhuang', cityPY: 'zz' }, { cityName: '长春', cityPinYin: 'zhangchun', cityPY: 'zc' }, { cityName: '张家界', cityPinYin: 'zhangjiajie', cityPY: 'zjj' }, { cityName: '张家口', cityPinYin: 'zhangjiakou', cityPY: 'zjk' }, { cityName: '章丘', cityPinYin: 'zhangqiu', cityPY: 'zq' }, { cityName: '长沙', cityPinYin: 'zhangsha', cityPY: 'zs' }, { cityName: '张掖', cityPinYin: 'zhangye', cityPY: 'zy' }, { cityName: '长治', cityPinYin: 'zhangzhi', cityPY: 'zz' }, { cityName: '漳州', cityPinYin: 'zhangzhou', cityPY: 'zz' }, { cityName: '湛江', cityPinYin: 'zhanjiang', cityPY: 'zj' }, { cityName: '昭通', cityPinYin: 'zhaotong', cityPY: 'zt' }, { cityName: '郑州', cityPinYin: 'zhengzhou', cityPY: 'zz' }, { cityName: '镇江', cityPinYin: 'zhenjiang', cityPY: 'zj' }, { cityName: '镇远', cityPinYin: 'zhenyuan', cityPY: 'zy' }, { cityName: '织金', cityPinYin: 'zhijin', cityPY: 'zj' }, { cityName: '重庆', cityPinYin: 'zhongqing', cityPY: 'zq' }, { cityName: '中山', cityPinYin: 'zhongshan', cityPY: 'zs' }, { cityName: '中卫', cityPinYin: 'zhongwei', cityPY: 'zw' }, { cityName: '钟祥', cityPinYin: 'zhongxiang', cityPY: 'zx' }, { cityName: '周口', cityPinYin: 'zhoukou', cityPY: 'zk' }, { cityName: '珠海', cityPinYin: 'zhuhai', cityPY: 'zh' }, { cityName: '诸暨', cityPinYin: 'zhuji', cityPY: 'zj' }, { cityName: '驻马店', cityPinYin: 'zhumadian', cityPY: 'zmd' }, { cityName: '株洲', cityPinYin: 'zhuzhou', cityPY: 'zz' }, { cityName: '淄博', cityPinYin: 'zibo', cityPY: 'zb' }, { cityName: '遵义', cityPinYin: 'zunyi', cityPY: 'zy' }]
  }
})