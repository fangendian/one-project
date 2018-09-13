//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
Page({
  data: {
    user1:null,
    user2:null,
    user1Img:null,
    matchList:null,
    matchList:[
      // { id: 1, avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo2ASQBFZPPUapO5SnFvnScibSHybhQ7NJHWhIic4gx6Al71BjBCSkN8FwSE0dmGCCNSzEzSFQw9JJw/0", nickName:"零点33分",matchValue:"85"},
      // { id: 2, avatarUrl: "http://img.zcool.cn/community/0107475a07b56aa801204a0ee4bfc9.jpg@1280w_1l_2o_100sh.jpg", nickName: "不甘心的翔入回家时电风扇交换机开发间",matchValue: "75"},
      // { id: 3, avatarUrl: "http://img.zcool.cn/community/01386d5a07b56ba801204a0e431724.jpg@1280w_1l_2o_100sh.jpg", nickName: "不甘心的翔入非非3",matchValue: "65"},
      // { id: 4, avatarUrl: "http://img.zcool.cn/community/01f27e5a05a49fa801204a0edcc83d.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非4",matchValue: "55"},
      // { id: 5, avatarUrl: "http://img.zcool.cn/community/01e8175a058ed5a80121985cde21bc.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非5",matchValue: "45"},
      // { id: 6, avatarUrl: "http://img.zcool.cn/community/01ff865a058ed5a801204a0e2c4223.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非6",matchValue: "35"},
      // { id: 7, avatarUrl: "http://img.zcool.cn/community/019a555a058ed5a80121985c51ad28.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非7",matchValue: "25"},
      // { id: 1, avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo2ASQBFZPPUapO5SnFvnScibSHybhQ7NJHWhIic4gx6Al71BjBCSkN8FwSE0dmGCCNSzEzSFQw9JJw/0", nickName: "零点33分", matchValue: "85" },
      // { id: 2, avatarUrl: "http://img.zcool.cn/community/0107475a07b56aa801204a0ee4bfc9.jpg@1280w_1l_2o_100sh.jpg", nickName: "不甘心的翔入回家时间", matchValue: "75" },
      // { id: 3, avatarUrl: "http://img.zcool.cn/community/01386d5a07b56ba801204a0e431724.jpg@1280w_1l_2o_100sh.jpg", nickName: "不甘心的翔入非非3", matchValue: "65" },
      // { id: 4, avatarUrl: "http://img.zcool.cn/community/01f27e5a05a49fa801204a0edcc83d.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非4", matchValue: "55" },
      // { id: 5, avatarUrl: "http://img.zcool.cn/community/01e8175a058ed5a80121985cde21bc.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非5", matchValue: "45" },
      // { id: 6, avatarUrl: "http://img.zcool.cn/community/01ff865a058ed5a801204a0e2c4223.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非6", matchValue: "35" },
      // { id: 7, avatarUrl: "http://img.zcool.cn/community/019a555a058ed5a80121985c51ad28.png@1280w_1l_2o_100sh.png", nickName: "不甘心的翔入非非7", matchValue: "25" },
      ],
    Width: null,
    marginTop2: null,
    fontSize: null,
    view:{
      marginTop:null,
      mode1: "aspectFit",
      paddingTop1:null,
      height1:null,
      width1:null,
      right1:null,
      buttom1:null,
      height2:null,
      height3:null,
      height4:null,
      freeLoop: []
    },
    isIphoneX:false,
    jumpInfor: null,
  },
  onLoad:function(){
    // console.log(app.globalData.countUser)
    // return
    this.setData({
      testNumbers: app.globalData.countUser,
      showRedenvelope: app.globalData.showRedenvelope,
      jumpInfor: app.globalData.jumpInfor
    })
    // wx.request({
    //   url: 'https://test.mp.koopoo.top/koopoo-AG/user/testResults', 
    //   data:{ 
    //     userId: 1419
    //   }, 
    //   method: "POST",  
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    // wx.showLoading({
    //   title: '匹配中...',
    // })
    //console.log("零点33分".length)
    var that = this;
    var userInfo = app.globalData.userInfo
    var matchResults = app.globalData.matchResults
    // setTimeout(function () {
    //console.log(matchResults)
    //var matchResults = that.data.matchList
    if(matchResults && matchResults[0]){
      that.setData({
        matchList: matchResults,
        Width: matchResults[0].matchValue,
        user1: userInfo.nickName,
        user1Img: userInfo.avatarUrl,
        user2: matchResults[0].nickName
      })
    }else{
      wx.showToast({
        title: '请求异常',
        icon:'loading'
      })
      return
      // wx.navigateBack({ })
    }
    var res = wx.getSystemInfoSync()
    that.data.screenWidth = res.screenWidth
    that.data.screenHeight = res.screenHeight
    that.data.windowWidth = res.windowWidth
    that.data.windowHeight = res.windowHeight
    if (that.data.windowWidth > 320 && that.data.windowWidth < 414) {
      if (that.data.user1.length > 10) {
        that.data.user1 = that.data.user1.substr(0, 10) + "..."
        //console.log(that.data.user1)
        that.setData({
          user1: that.data.user1,
        })
      } else {
        that.setData({
          user1: userInfo.nickName,
        })
      }
      for (var index in that.data.matchList) {
        if (that.data.matchList[index].nickName.length > 11) {
          that.data.matchList[index].nickName = that.data.matchList[index].nickName.substr(0, 11) + "..."
          that.setData({
            matchList: that.data.matchList
          })
        }
        else {
          that.setData({
            user2: that.data.matchList[0].nickName
          })
          console.log(that.data.matchList[0].nickName)
        }
      }
      if (that.data.user2.length > 10) {
        that.data.user2 = that.data.user2.substr(0, 10) + "..."
        //console.log(that.data.user1)
        that.setData({
          user2: that.data.user2,
        })
      } else {
        that.data.user2 = that.data.user2.substr(0, that.data.user2.length)
        that.setData({
          user2: that.data.user2,
        })
      }

      that.setData({
        view: {
          fontSize: "14px",
        }
      })
    }
    else if (that.data.windowWidth >= 414) {
      if (that.data.user1.length > 12) {
        that.data.user1 = that.data.user1.substr(0, 11) + "..."
        //console.log(that.data.user1)
        that.setData({
          user1: that.data.user1,
        })
      } else {
        that.setData({
          user1: userInfo.nickName,
        })
      }
      for (var index in that.data.matchList) {
        if (that.data.matchList[index].nickName.length > 12) {
          that.data.matchList[index].nickName = that.data.matchList[index].nickName.substr(0, 13) + "..."
          that.setData({
            matchList: that.data.matchList
          })
        }
        else {
          that.setData({
            user2: that.data.matchList[0].nickName
          })
        }
      }
      if (that.data.user2.length > 12) {
        that.data.user2 = that.data.user2.substr(0, 11) + "..."
        //console.log(that.data.user1)
        that.setData({
          user2: that.data.user2,
        })
      } else {
        that.data.user2 = that.data.user2.substr(0, that.data.user2.length)
        that.setData({
          user2: that.data.user2,
        })
      }



    }
    else {
      if (that.data.user1.length > 9) {
        that.data.user1 = that.data.user1.substr(0, 7) + "..."
        that.setData({
          user1: that.data.user1,
        })
      } else {
        that.setData({
          user1: userInfo.nickName,
        })
      }
      for (var index in that.data.matchList) {
        if (that.data.matchList[index].nickName.length > 10) {
          that.data.matchList[index].nickName = that.data.matchList[index].nickName.substr(0, 8) + "..."
          that.setData({
            matchList: that.data.matchList
          })
        }
        else {
          that.setData({
            user2: that.data.matchList[0].nickName
          })
        }
      }

      if (that.data.user2.length > 10) {
        that.data.user2 = that.data.user2.substr(0, 7) + "..."
        //console.log(that.data.user1)
        that.setData({
          user2: that.data.user2,
        })
      } else {
        that.data.user2 = that.data.user2.substr(0, that.data.user2.length)
        that.setData({
          user2: that.data.user2,
        })
      }



      that.setData({
        fontSize: "12px",
        marginTop2: "6vh"
      })
    }
    if (that.data.screenHeight >= 812) {
      if (that.data.user1.length > 13) {
        that.data.user1 = that.data.user1.substr(0, 7) + "..."
        console.log(that.data.user1)
        that.setData({
          user1: that.data.user1,
        })
      } else {
        that.setData({
          user1: userInfo.nickName,
        })
      }
      for (var index in that.data.matchList) {
        if (that.data.matchList[index].nickName.length > 13) {
          that.data.matchList[index].nickName = that.data.matchList[index].nickName.substr(0, 13) + "..."
          that.setData({
            matchList: that.data.matchList
          })
        }
        else {
          that.setData({
            user2: that.data.matchList[0].nickName
          })
        }
      }
      if (that.data.user2.length > 13) {
        that.data.user2 = that.data.user2.substr(0, 7) + "..."
        //console.log(that.data.user1)
        that.setData({
          user2: that.data.user2,
        })
      } else {
        that.data.user2 = that.data.user2.substr(0, that.data.user2.length)
        that.setData({
          user2: that.data.user2,
        })
      }


      that.setData({
        view: {
          marginTop: "-26px",
          height1: "33vh"
        }
      })
    }
    else if (that.data.screenHeight >= 450 && that.data.screenHeight <= 480) {
      if (that.data.user1.length > 9) {
        that.data.user1 = that.data.user1.substr(0, 6) + "..."
        console.log(that.data.user1)
        that.setData({
          user1: that.data.user1,
        })
      } else {
        that.setData({
          user1: userInfo.nickName,
        })
      }
      for (var index in that.data.matchList) {
        if (that.data.matchList[index].nickName.length > 10) {
          that.data.matchList[index].nickName = that.data.matchList[index].nickName.substr(0, 8) + "..."
          that.setData({
            matchList: that.data.matchList
          })
        }
        else {
          that.setData({
            user2: that.data.matchList[0].nickName
          })
        }
      }

      if (that.data.user2.length > 10) {
        that.data.user2 = that.data.user2.substr(0, 6) + "..."
        //console.log(that.data.user1)
        that.setData({
          user2: that.data.user2,
        })
      } else {
        that.data.user2 = that.data.user2.substr(0, that.data.user2.length)
        that.setData({
          user2: that.data.user2,
        })
      }

      that.setData({
        view: {
          mode1: "scaleToFill",
          paddingTop1: "5px;",
          height1: "39vh",
          width1: "34%",
          right1: "2%",
          bottom1: "-3px",
          height2: "8.8vh",
          height3: "10vh",
          height4: "59vh"
        }
      })
    }

    wx.showShareMenu({
      withShareTicket: true
    })
      //wx.hideLoading()

    // }, 500)


  },

  onReady: function(){
    let _this = this
    wx.getSystemInfo({
      success: function(res) {
        if (res.model.indexOf("iPhone X") != -1 || res.model.indexOf("iponex") != -1 || res.model.indexOf("iPhoneX") != -1) {
          _this.setData({ isIphoneX: true, marginTop2: "11vh", height4: "62vh"})
        }
      },
    })
  },

  sendRedenvelop: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    wx.navigateToMiniProgram({
      // appId: 'wxa064ddc7c17de7e2',
      // path: 'pages/today/today',
      appId: this.data.jumpInfor.appId,
      path: this.data.jumpInfor.appChainUrl,
    })
  },

  onShow: function () {
    let that = this
    wx.request({
      url: config.apiUrl.indexPageInterface,
      success: function (res) {
        console.log(res)
        that.setData({
          freeLoop: res.data.data
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res)
    }
    return {
      title: '看看你和群里谁是绝配',
      imageUrl: "http://static-1253586872.file.myqcloud.com/shop/2284/0874a59e-3d44-48f8-8e72-6ec759bf510c.jpg",
      path: '/pages/launching/launching',
      success: function (res) {
        // 转发成功
        const shareTicket = res.shareTickets[0]
        wx.getShareInfo({
          shareTicket: shareTicket,
          complete: function (res) {
            //console.log(res)
            var userId = app.globalData.userId
            var wxSessionKey = app.globalData.wxSessionKey
            //var header = getApp().globalData.header; //获取app.js中的请求头(李金梁)
            var sessionId = app.globalData.sessionId
            wx.request({
              url: config.apiUrl.userLottery,
              //header: header, //请求时带上这个请求头
              header: sessionId, //请求时带上这个请求头
              method: "POST",
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                userId: userId,
                wxSessionKey: wxSessionKey
              },
              success: function (res) {
                console.log(res)
              },
              fail: function () {

              }
            })
          },
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  shareSomething:function(event){
    var fid = event.detail.formId
    app.addFormId(fid)
  },
  jumpMiniprogram: function (e) {
    let id = e.currentTarget.id, productId = e.currentTarget.dataset.productionid
    wx.navigateToMiniProgram({
      appId: 'wxa064ddc7c17de7e2',
      path: 'pages/MFQ/today/today?fromMini=1&productid=' + productId,
      envVersion: 'release',
      success(res) {
        console.log('---success---')
      }
    })
  }
})
