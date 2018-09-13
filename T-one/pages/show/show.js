// pages/show/show.js
Page({
  data: {},
  onShow: function () {
    wx.showLoading({
      title: '',
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '../index/index',
      })
    },500)
  }
})