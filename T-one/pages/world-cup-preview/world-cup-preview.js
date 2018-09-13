const app = getApp();
Page({
  data: {
    src: '',
    userSelecedFlagImg: '',
    selectedFlagId: ''
  },
  onLoad: function(){
    console.log(app.globalData.userInfo)
    this.setData({
      src: app.globalData.userInfo,
      userSelecedFlagImg: app.globalData.worldCup,
      selectedFlagId: app.globalData.selectedFlagId
    })
    if (app.globalData.worldCup === '../../img/selected.png' || app.globalData.selectedFlagId === '') {
      this.setData({
        userSelecedFlagImg: '../../img/selected.png',
        selectedFlagId: '33'
      })
    }
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
  onShow: function(){
    
  },
  jumpDifferentPage: function (e) {
    wx.navigateTo({
      url: '../world-cup-poster/world-cup-poster',
    })
  },
  shareFriends: function(e){
    var fid = e.detail.formId
    app.addFormId(fid)
  }
})