//app.js
App({
  onLaunch: function (options) {
    //  this.globalData.scene = options.scene
    //  if (options.scene == 1044) {
    //    this.globalData.shareTicket = options.shareTicket
    //  }
    
    // try {
    //   var value = wx.getStorageSync('kp_buildNumber')
    //   console.log("kp_buildNumber :" + value);
    //   if (value != 116) {
    //     console.log("clear storage sync")
    //     try {
    //       wx.removeStorageSync('userId')
    //     } catch (e) {
    //       console.log("remove userId failed!")
    //     }
    //     wx.clearStorageSync()
    //     wx.setStorageSync('kp_buildNumber', 116)
    //   }
    // } catch (e) {
    //   // Do something when catch error
    // }
  },
  isString: function(target, isEmpty) {
    if(target == null || typeof (target) == "undefined") {
      return false;
    }

  var isString = (Object.prototype.toString.call(target) == "[object String]");
    if(isString) {
      if (isEmpty) {
        if (target != "") {
          return true;
        }
        return false;
      }
      return true;
    }
  return false;
  },
  // 搜集formId
  addFormId: function (id) {
    if (!this.isString(id)) return
    var list = this.globalData.formIds
    if (!list) list = []
    var timestamp = (new Date().getTime())
    var item = { 'formTime': timestamp, 'formId': id }
    list.push(item)
    this.globalData.formIds = list
    console.log(this.globalData.formIds)
  },

  onShow: function (options) {
    console.log(options)
    this.globalData.scene = options.scene
    if (options.scene == 1044) {
      this.globalData.shareTicket = options.shareTicket
    }
  },

  globalData: {
    userInfo: null,
    age:null,
    constellation:null,
    testResults:null,
    scene: null,
    shareTicket: null,
    countUser:null,

    questionType: null,
    questionData: null,
    questionLoading: true,
    hasTestResult: false,
    formIds:[],
    miniprogramVersion:'v1.3.1',
    jumpInfor: {
      appId: 'wxa064ddc7c17de7e2',
      appSynopsis: '免费去抢好东西',
      appLogoUrl: 'http://static-1253586872.file.myqcloud.com/shop/2284/0874a59e-3d44-48f8-8e72-6ec759bf510c.jpg',
      appChainUrl: '/pages/today/today'
    }
  }
})
