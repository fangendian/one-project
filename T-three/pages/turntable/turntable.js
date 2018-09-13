//turntable.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userIdTrans:null
  },
  onLoad: function (options) {
    console.log(app.globalData.userId)
    this.setData({
      userIdTrans: app.globalData.userId
    })
  },

  onShow:function(){

  },


})
