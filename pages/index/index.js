//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  toScore : function(){
    // 跳转到 score.wxml页面
    wx.navigateTo({
          url: '../score/score'
    })
  },
  toTimetable : function(){
    wx.navigateTo({
          url: '../timetable/timetable'
    })
  }
})
