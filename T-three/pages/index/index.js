//index.js
//获取应用实例
const app = getApp()
var questions = require("../../utils/questions.js")
Page({
  data: {
  },
  onLoad: function (options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    var scene = decodeURIComponent(options.scene);
    //console.log(scene);
  },  

  onShow:function(){
    // if (app.globalData.hasTestResult){
    //   wx.navigateTo({
    //     url: '../testResult/testResult',
    //   })
    // }
  },
  gotoInformation: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    questions.initScore()//重置当前答题状态
    if (app.globalData.hasTestResult) {
      wx.navigateTo({
        url: '../testResult/testResult',
      })
    }else{
      wx.navigateTo({
        url: '../information/information',
      })
    }
  }
})
