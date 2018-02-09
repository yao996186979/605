//index.js
//获取应用实例
const LC = require('../../utils/av-weapp-min.js');
const app = getApp()

Page({
  data: {
    motto: '欢迎回家',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //进入605
  goNext: function(){
    //  此处判断有没有提交过，没有的话进提交页，提交过的直接查看结果集
    var that = this;
    var judgeQuery = new LC.Query('homeInfo');
    judgeQuery.equalTo('nickName', getApp().globalData.userInfo.nickName);
    judgeQuery.find().then(function (results) {
      if (results.length != 0) {
        //已经提交过了 直接查看
        wx.navigateTo({
          url: '../infoShow/infoShow'
        })
        
      }
      else {
        wx.navigateTo({
          url: '../controller/controller'
        })
      }
    }, function (error) {
    });
   
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})