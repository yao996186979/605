// pages/infoShow/infoShow.js
const LC = require('../../utils/av-weapp-min.js');
const wxCharts = require('../../utils/wxcharts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peoples:null,
    listData:[]
  },
  //主厨图
  cookArt:function(){
    var count1 =0;
    var count2 =0;
    var count3 =0;
 
    for (var i = 0; i < this.data.listData.length; i++) {
      var obj = this.data.listData[i];
 
      if (obj.cookName === 0){
        count1++;
      }
      else if (obj.cookName === 1) {
        count2++;
      }
      else{
        count3++;
      }
    }
    new wxCharts({
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '姚福建',
        data: count1,
      }, {
        name: '姚建全',
        data: count2,
      }, {
        name: '其它',
        data: count3,
      }],
      width: wx.getSystemInfoSync().windowWidth,
      height: 250,
      dataLabel: true
    });
  },


  //活动图
  actionArt:function(){
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    for (var i = 0; i < this.data.listData.length; i++) {
      var obj = this.data.listData[i];
      if (obj.actionName == 0) {
        count1++;
      }
      else if (obj.actionName == 1) {
        count2++;
      }
      else if (obj.actionName == 2) {
        count3++;
      }
      else {
        count4++;
      }
    }
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['谝一谝', 'K歌', '麻将', '其它'],
      series: [{
        name: '活动统计图',
        data: [count1, count2, count3,count4]
      }],
      width: wx.getSystemInfoSync().windowWidth,
      height: 200
    });
  },
  //最期待人图
  cuteArt:function(){
    var count1 = 0;
    var count2 = 0;
    for (var i = 0; i < this.data.listData.length; i++) {
      var obj = this.data.listData[i];
      if (obj.cuteName == 0) {
        count1++;
      }
      else  {
        count2++;
      }
    } 
    new wxCharts({
      canvasId: 'ringCanvas',
      type: 'ring',
      series: [{
        name: '六六',
        data: count1,
      }, {
        name: '姐姐的儿子',
        data: count2,
      }],
      width: wx.getSystemInfoSync().windowWidth,
      height: 200,
      dataLabel: true
    });
  },
  friutsArt:function(){
    var dataArr = [];
    var nameArr = [];
    for (var i = 0; i < this.data.listData.length; i++) {
      var obj = this.data.listData[i];
      dataArr.push(1);
    
      nameArr.push(obj.friutsName);
      
    } 
    new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: nameArr,
      series: [{
        name: '菜名统计图',
        data: dataArr
      }],
      width: wx.getSystemInfoSync().windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 150
        }
      }
    });

  },


  //查询列表
  queryData: function () {
    var that = this;
    console.log(this+'ddd');
    var query = new LC.Query('homeInfo');
    query.descending('createdAt');
    query.find().then(function (loginUsers) {
      // 查询到商品后，在前端展示到相应的位置中。
      var dataList = [];
      var str = "已参与的亲人有：";
      for (var i = 0; i < loginUsers.length; i++) {
        dataList.push(loginUsers[i].attributes)
        str = str + loginUsers[i].attributes.nickName+',';
      }
      that.setData({
        listData: dataList,
        peoples:str

      })
      
      //绘图
      that.cookArt(); that.cuteArt(); that.actionArt(); that.friutsArt();

    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryData();
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
  
  }
})