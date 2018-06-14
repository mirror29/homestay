
var server = require('./utils/server');
var md5 = require('./utils/md5.js');

// 授权登录
App({
	onLaunch: function () {
		// auto login via SDK
		var that = this;
		//AV.User.loginWithWeapp();


		// 设备信息
		wx.getSystemInfo({
			success: function (res) {
				that.screenWidth = res.windowWidth;
				that.pixelRatio = res.pixelRatio;
			}
		});
	},
	getOpenId: function (cb) {
		wx.login({
			success: function (res) {
				if (res.code) {
					//发起网络请求
          wx.request({
            url: 'https://wj.antyiz.xyz/sendappid?appid=wx33395ae3c08b6132&secret=2bb68ab8005322261b9facc9c9621284&js_code=' + res.code + '&grant_type=authorization_code',
						data: {
							code: res.code
						},
						success: function (response) {
							// 获取openId
							var openId = response.data.openid;
							// TODO 缓存 openId
							var app = getApp();
							var that = app;
							that.globalData.openid = openId;

							//验证是否关联openid

							typeof cb == "function" && cb()

						}
					})
				} else {
					console.log('获取用户登录态失败！' + res.errMsg)
				}
			}
		});
	},

  //多张图片上传
  chooseImg: function uploadimg(data){
    var that= this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },

	register:function(cb){
     var app = this;
       this.getUserInfo(function () {
         var openId = app.globalData.openid;
            var userInfo = app.globalData.userInfo;
            var country = userInfo.country;
            var city = userInfo.city;
            var gender = userInfo.gender;
            var nick_name =  userInfo.nickName;
            var province = userInfo.province;
            var avatarUrl = userInfo.avatarUrl;
            server.getJSON('/User/register?open_id=' + openId + "&country=" + country + "&gender=" + gender + "&nick_name=" + nick_name + "&province=" + province + "&city=" + city + "&head_pic=" + avatarUrl,function(res){
      app.globalData.userInfo = res.data.res

                typeof cb == "function" && cb()
						});

       })
  },
getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

	globalData: {
		'openid': null,
		'userInfo':null,
		'login':false
	}
})
