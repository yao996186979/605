// pages/controller/controller.js
 const LC  = require('../../utils/av-weapp-min.js');
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cookName:null,
    friutsName:null,
    actionName:null,
    cuteName:null,

    startDate: null,
    endDate: null,
    name: null,
    place: null,
    note: null,
    imgUrl: null,
    listData: null,
    items: [
      { name: '姚福建', value: 0},
      { name: '姚建全', value: 1},
      { name: '其它', value: 2 }
    ],
    itemss: [
      { name: '谝一谝', value: 0},
      { name: 'K歌', value: 1 },
      { name: '麻将', value: 2 },
      { name: '其它', value: 3 }
    ],
    itemsss: [
      { name: '六六', value: 0 },
      { name: '姐姐的儿子', value: 1 },
    ]
  },
  //为picker绑定方法： 其中获得的时间为2017-06-01格式的。
  bindDateChange: function (e) {
    var that = this;
    that.setData({
      date1: e.detail.value
    })
    this.startDate = that.data.date1;
    console.log(that.data.date1);
  },
  bindDateChangeTwo: function (e) {
    var that = this;
    that.setData({
      date2: e.detail.value
    })
    this.endDate = that.data.date2;
    console.log(that.data.date2);
  },
  noteChange:function(e){
    this.friutsName = e.detail.value
  },

  radioChange: function (e) {
    console.log(e.detail.value);
    if (e.currentTarget.id == "radioChange_01"){
      this.cookName = parseInt(e.detail.value);
    }
    else if (e.currentTarget.id == "radioChange_02")
    {
      this.actionName = e.detail.value;
    }
    else{
      this.cuteName = e.detail.value;
    }
  },
  submitTap:function(e){
    
    if (this.friutsName == null || this.cookName == null || this.actionName == null || this.cuteName == null){
     
      wx.showModal({
        content: "有内容没输入哦",
        showCancel: false
      });
    }
    else{
      var that = this;
      var User = LC.Object.extend('homeInfo');
      var user = new User();
      user.set('cookName', this.cookName);
      user.set('friutsName', this.friutsName);
      user.set('actionName', this.actionName);
      user.set('cuteName', this.cuteName);
      user.set('nickName', getApp().globalData.userInfo.nickName);
      user.save().then(function (todo) {
        // 成功保存之后，执行其他逻辑.
        console.log('New object created with objectId: ' + user.id);
        wx.showToast({
          icon: 'success',
          duration: 1000
        })
        wx.redirectTo({
          url: '../infoShow/infoShow'
        })
      }, function (error) {
        // 异常处理
      });
    }

  },
  submit:function(e){
     //先查询此用户是否有记录  暂时用昵称
    // console.log(getApp().globalData.userInfo);
    var that = this;
    var judgeQuery = new LC.Query('loginUser');
    judgeQuery.equalTo('nickName', getApp().globalData.userInfo.nickName);
    judgeQuery.find().then(function (results) {
      if (results.length!=0){
         //更新
        that.updateData(results[0].id);
       }
       else{
         //新增
        that.insertData();
       }
    }, function (error) {
    });
  },

  //增加用户
  insertData: function () {
    var that = this;
    var User = LC.Object.extend('loginUser');
    var user = new User();
    user.set('nickName', getApp().globalData.userInfo.nickName);
    user.set('imgUrl', getApp().globalData.userInfo.avatarUrl);
    user.set('startDate', this.startDate);
    user.set('endDate', this.endDate);
    user.set('place', this.place);
    user.set('note', this.note);
    user.save().then(function (todo) {
      // 成功保存之后，执行其他逻辑.
      console.log('New object created with objectId: ' + user.id);
      that.queryData();
    }, function (error) {
      // 异常处理
      console.error('Failed to create new object, with error message: ' + error.message);
    });
  },

//更新用户
updateData:function (id) {
    var that = this;
    var user = LC.Object.createWithoutData('loginUser', id);
    // 修改属性  证明是此人 名称/照片不用修改
    user.set('startDate', this.startDate);
    user.set('endDate', this.endDate);
    user.set('place', this.place);
    user.set('note', this.note);
    // 保存到云端
    user.save().then(function (todo) {
      // 成功保存之后，执行其他逻辑.
      console.log('更新成功');
      that.queryData();
    }, function (error) {
      // 异常处理
      console.error('Failed to create new object, with error message: ' + error.message);
    });
  },

  //查询列表
   queryData:function (){
    var that = this;
    var query = new LC.Query('loginUser');
    query.descending('createdAt');
    query.find().then(function (loginUsers) {
      // 查询到商品后，在前端展示到相应的位置中。
      var dataList = new Array;
      for (var i = 0; i < loginUsers.length; i++) {
        dataList.push(loginUsers[i].attributes)
      }
      that.setData({
        listData: dataList
      })
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



// //时间表单提交
// submitForm: function (e) {
//   //字符串转换为时间戳，单位毫秒
//   var date1 = new Date(Date.parse(that.data.date1.replace(/-/g, "/")));
//   var date_in = date1.getTime();
//   var date2 = new Date(Date.parse(that.data.date2.replace(/-/g, "/")));
//   var date_out = date2.getTime();
//   if (that.data.is_home == 1 && date1 >= date2) {

//     wx.showToast({

//       title: '放假时间必须大于上班时间!',

//       icon: 'loading',

//       duration: 1500

//     })

//     setTimeout(function () {

//       wx.hideToast()

//     }, 2000)
//   } else if (that.data.is_home == 1 && date1 < Date.parse(new Date()) - 86400000) {

//     wx.showToast({

//       title: '上班时间不能小于当前时间!',

//       icon: 'loading',

//       duration: 1500

//     })

//     setTimeout(function () {

//       wx.hideToast()

//     }, 2000)

//   } else {
//     //处理表单的code，自己来

//   }
// }
