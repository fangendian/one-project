const app = getApp();
Page({
  data: {
    src:'',
    countryName: '伊朗',
  },
  onShow: function(){
    this.setData({
      countryName: app.globalData.selectedCountryName,
      src: app.globalData.userInfo,
    })
  },
  onLoad: function(opt){
    
  },
  onShareAppMessage: function (opt) {
    console.log(opt)
    if (opt.from === 'button') {
      console.log(opt.target)
    }
    return {
      title: '来！有你就是主场，给喜欢的球队疯狂打call',
      path: '/pages/index/index',
      // imageUrl: '../../img/share.jpg'
    }
  },
  jumpDifferentPage: function (e) {
    wx.navigateTo({
      url: '../poster/poster',
    })
  },
  shareFriends: function (e) {
    console.log(e)
    var fid = e.detail.formId
    app.addFormId(fid)
  }
})