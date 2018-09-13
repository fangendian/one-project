//turntable.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userIdTrans:null
  },
  onLoad: function (options) {
    this.setData({
      // userIdTrans: this.getStorageUserId("userId")
      userIdTrans: app.globalData.userId
    })
  },

  onShow:function(){

  },

  // getStorageUserId: function (user) {
  //   try {
  //     var value = wx.getStorageSync(user)
  //     if (value) {
  //       return value
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },




})
