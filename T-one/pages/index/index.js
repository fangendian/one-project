const app = getApp()
const config = require('../../utils/config.js')
Page({
  data:{
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    freeLoop:[],
    hiddenId: true,
    userInfo: {
      code: null,
      Encrypted: null,
      IV: null
    },
  },
  onLoad: function(){
    let that = this
    wx.login({
      success: function (res) {
        const code = res.code
        wx.getUserInfo({
          success: function (ress) {
            app.globalData.userInfo = ress.userInfo.avatarUrl
            that.setData({
              'userInfo.code': res.code,
              'userInfo.Encrypted': ress.encryptedData,
              'userInfo.IV': ress.iv
            })
          }
        })
      }
    });
    wx.getStorage({
      key: 'key',
      success: function(res) {
        if(res.data == 1){
          that.setData({
            hiddenId: (!that.data.hiddenId)
          })
        }
      }
    })
  },
  onShareAppMessage: function(opt){
    console.log(opt)
    if (opt.from === 'button'){
      console.log(opt.target)
    }
    return {
      title: '来！有你就是主场，给喜欢的球队疯狂打call',
      path: '/pages/index/index',
      // imageUrl: '../../img/share.jpg'
    }
  },
  onShow: function(){
    let that = this
    wx.request({
      url: config.apiUrl.indexPageInterface,
      success:function(res){
        let freeLoopGoods = res.data.data
        for (let i = 0; i < freeLoopGoods.length; i++){
          if (freeLoopGoods[i].id === null || freeLoopGoods[i].productionid === null || freeLoopGoods[i].name === null || freeLoopGoods[i].imageurl2 === null){
            that.setData({
              freeLoop: []
            })
          } else if (freeLoopGoods[i].id != null && freeLoopGoods[i].productionid != null && freeLoopGoods[i].name != null && freeLoopGoods[i].imageurl2 != null){
            that.setData({
              freeLoop: res.data.data
            })
          }else {
            that.setData({
              freeLoop: []
            })
          }
        }
      },
      fail:function(){
        console.log('fail')
      },
    })
  },
  jumpPage: function(e){
    let that = this
    if (e.detail && e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo.avatarUrl
      wx.request({
        url: config.apiUrl.login,
        header: {
          'content-type': 'application/json',
          'X-WX-Code': that.data.userInfo.code,
          'X-WX-Encrypted-Data': that.data.userInfo.Encrypted,
          'X-WX-IV': that.data.userInfo.IV
        },
        success: function (res) {
          console.log(res)
        },
        fail:function(err){
          console.log(err)
        }
      })
    }
    let id = e.target.id;
    if(id === 'add-face'){
      wx.navigateTo({
        url: '../selectedImg/selectedImg',
      })
    }else {
      wx.navigateTo({
        url: '../world-cup/world-cup',
      })
    }
  },
  clickHidden: function(){
    let that = this
    that.setData({
      hiddenId: (!that.data.hiddenId)
    })
    wx.setStorage({
      key: 'key',
      data: 1
    })
  },
  jumpMiniprogram: function(e){
    let id = e.currentTarget.id, productId = e.currentTarget.dataset.productionid
    wx.navigateToMiniProgram({
      appId: 'wxa064ddc7c17de7e2',
      path: 'pages/MFQ/today/today?fromMini=1&productid=' + productId,
      // extraData: {
      //   id: id,
      //   productId: productId
      // },
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log('---success---')
      }
    })
  }
})
